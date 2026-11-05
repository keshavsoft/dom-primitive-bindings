import validateArray from "./validateArray.js";

const checkBindings = (bindings) => {
  const valid = validateArray(bindings);
  if (valid.length === 0) return null;

  return valid;
};

export default checkBindings;

