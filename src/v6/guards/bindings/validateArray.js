import validateBinding from "./validateBinding.js";

const validateArray = (bindings) => {
  if (!Array.isArray(bindings)) {
    throw new TypeError("bindings must be an array.");
  }

  if (bindings.length === 0) {
    throw new TypeError("bindings must contain at least one binding.");
  }

  bindings.forEach((binding, index) => {
    if (!validateBinding(binding)) {
      throw new TypeError(
        `bindings[${index}] must be an object with exactly three non-empty string properties: event, selector, and action.`
      );
    }
  });

  return bindings;
};

export default validateArray;
