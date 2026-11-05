import checkContainer from "./container/index.js";
import checkBindings from "./bindings/index.js";
import checkActions from "./actions/index.js";

const runGuards = (containerOrId, bindings, actions = {}) => {
  const container = checkContainer(containerOrId);
  if (!container) return null;

  const validBindings = checkBindings(bindings);
  const validActions = checkActions(actions);

  return {
    container,
    bindings: validBindings,
    actions: validActions
  };
};

export default runGuards;
