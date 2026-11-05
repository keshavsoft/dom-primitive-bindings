import registerGlobal from "./register/index.js";
import runGuards from "./guards/index.js";
import prepareBindings from "./prepare/index.js";
import attachListeners from "./listeners/index.js";

const bindEvents = (containerOrId, bindings = [], actions = {}) => {
  const guarded = runGuards(containerOrId, bindings, actions);
  if (!guarded) return null;

  const { container, bindings: validBindings } = guarded;
  const eventGroups = prepareBindings(validBindings, guarded.actions);

  attachListeners(container, eventGroups);

  return container;
};

export { bindEvents };
export default bindEvents;

registerGlobal(bindEvents);
