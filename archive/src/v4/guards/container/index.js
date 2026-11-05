import resolveElement from "./resolveElement.js";

const checkContainer = (containerOrId) => {
  if (!containerOrId) return null;

  const element = resolveElement(containerOrId);
  if (!element) return null;

  return element;
};

export default checkContainer;

