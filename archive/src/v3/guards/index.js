import checkContainer from "./container/index.js";
import checkBindings from "./bindings/index.js";

const runGuards = (containerOrId, bindings) => {
  const container = checkContainer(containerOrId);
  if (!container) return null;

  const validBindings = checkBindings(bindings);
  if (!validBindings) return null;

  return { container, bindings: validBindings };
};

export default runGuards;

