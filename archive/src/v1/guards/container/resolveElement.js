const resolveElement = (containerOrId) => {
  if (typeof containerOrId === "string") {
    return document.getElementById(containerOrId) || document.querySelector(containerOrId);
  }

  if (containerOrId && typeof containerOrId === "object" && "addEventListener" in containerOrId) {
    return containerOrId;
  }

  return null;
};

export default resolveElement;

