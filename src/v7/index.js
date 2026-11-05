import registerGlobal from "./register/index.js";
import runGuards from "./guards/index.js";
import prepareBindings from "./prepare/index.js";
import attachListeners from "./listeners/index.js";
import sample, {
  sampleContainer,
  sampleBindings,
  sampleActions
} from "./sample/index.js";

const check = (containerOrId, bindings = [], actions = {}) =>
  runGuards(containerOrId, bindings, actions);

const bindEvents = (containerOrId, bindings = [], actions = {}) => {
  const guarded = check(containerOrId, bindings, actions);
  if (!guarded) return null;

  const { container, bindings: validBindings } = guarded;
  const eventGroups = prepareBindings(validBindings, guarded.actions);

  attachListeners(container, eventGroups);

  return container;
};

export {
  bindEvents,
  check,
  sample,
  sampleContainer,
  sampleBindings,
  sampleActions
};
export default bindEvents;

registerGlobal({
  bindEvents,
  check,
  sample,
  sampleContainer,
  sampleBindings,
  sampleActions
});
