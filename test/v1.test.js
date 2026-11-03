import test from "node:test";
import assert from "node:assert/strict";
import checkContainer from "../src/v1/guards/container/index.js";
import checkBindings from "../src/v1/guards/bindings/index.js";
import runGuards from "../src/v1/guards/index.js";
import prepareBindings from "../src/v1/prepare/index.js";
import bindEvents from "../src/v1/index.js";

test("guards/container: resolves element or returns null", () => {
  const mockContainer = { addEventListener: () => {} };
  assert.equal(checkContainer(mockContainer), mockContainer);
  assert.equal(checkContainer(null), null);
});

test("guards/bindings: filters invalid items and returns null if empty", () => {
  assert.equal(checkBindings([]), null);
  assert.equal(checkBindings(null), null);

  const valid = checkBindings([
    { event: "click", selector: ".btn" },
    { invalid: true }
  ]);
  assert.equal(valid.length, 1);
  assert.equal(valid[0].event, "click");
});

test("guards: runGuards orchestrates container and bindings guards", () => {
  const mockContainer = { addEventListener: () => {} };
  const bindings = [{ event: "click", selector: ".btn" }];

  const res = runGuards(mockContainer, bindings);
  assert.equal(res.container, mockContainer);
  assert.equal(res.bindings.length, 1);

  assert.equal(runGuards(null, bindings), null);
  assert.equal(runGuards(mockContainer, []), null);
});

test("prepare: groups bindings by event type", () => {
  const bindings = [
    { event: "click", selector: ".btn-1" },
    { event: "click", selector: ".btn-2" },
    { event: "keydown", selector: "input" }
  ];

  const groups = prepareBindings(bindings);
  assert.equal(groups.get("click").length, 2);
  assert.equal(groups.get("keydown").length, 1);
});

test("v1: bindEvents attaches container listener and delegates event", () => {
  const listeners = {};
  const mockContainer = {
    addEventListener: (type, handler) => {
      listeners[type] = handler;
    },
    contains: () => true
  };

  const mockButton = {
    className: "btn-submit",
    value: "Send",
    closest: (sel) => (sel === ".btn-submit" ? mockButton : null)
  };

  let output = null;

  bindEvents(mockContainer, [
    {
      event: "click",
      selector: ".btn-submit",
      runner: (target) => ({ clickedValue: target.value }),
      onExtract: (data) => {
        output = data;
      }
    }
  ]);

  listeners["click"]({
    type: "click",
    target: mockButton
  });

  assert.deepEqual(output, { clickedValue: "Send" });
});

