import attachListener from "./attachListener.js";

const attachListeners = (container, eventGroups) => {
  for (const [eventType, bindings] of eventGroups.entries()) {
    attachListener(container, eventType, bindings);
  }

  return container;
};

export default attachListeners;

