import dispatchEvent from "../dispatch/index.js";

const attachListener = (container, eventType, bindings) => {
  container.addEventListener(eventType, (event) => {
    dispatchEvent({ bindings, event, container });
  });
};

export default attachListener;

