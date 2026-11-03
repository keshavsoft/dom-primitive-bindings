import bindings from "./bindings.json" with { type: "json" };
import data from "../common/data.json" with { type: "json" };
import columns from "../common/columns.json" with { type: "json" };

const start = () => {
  try {
    window.ks.jsonRenderers.render({
      type: "table.simple",
      data,
      columns,
      options: {
        showSerial: true,
        showSearch: true,
        showOptions: true
      },
      targetHtmlId: "dom-render-container",
      classToApply: "",
      appendPosition: "replace"
    });

    const logBox = document.getElementById("binding-log");

    const configuredBindings = bindings.map((binding) => ({
      ...binding,
      onExtract: (result, event, matchElement) => {
        const detail = {
          event: event.type,
          selector: binding.selector,
          targetTag: matchElement.tagName,
          key: event.key,
          value: matchElement.value
        };
        console.log("Delegated event from bindings.json:", detail);
        if (logBox) {
          logBox.innerHTML = `Delegated Event from <span class="text-info">bindings.json</span>: <span class="text-warning">${JSON.stringify(detail)}</span>`;
        }
      }
    }));

    window.ks.domPrimitiveBindings?.bindEvents("dom-render-container", configuredBindings);

  } catch (err) {
    console.error("Render error:", err);
    const container = document.getElementById("dom-render-container");
    if (container) {
      container.innerHTML = `<div class="alert alert-danger font-monospace small">${err.message}</div>`;
    }
  }
};

start();
