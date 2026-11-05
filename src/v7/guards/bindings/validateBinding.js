const bindingKeys = ["event", "selector", "action"];

const isPlainObject = (value) => {
  if (value === null || typeof value !== "object" || Array.isArray(value)) return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
};

const validateBinding = (binding) => {
  if (!isPlainObject(binding)) return false;

  const keys = Object.keys(binding);
  if (keys.length !== bindingKeys.length) return false;
  if (!bindingKeys.every((key) => Object.hasOwn(binding, key))) return false;

  return bindingKeys.every((key) => (
    typeof binding[key] === "string" && binding[key].trim().length > 0
  ));
};

export { bindingKeys, isPlainObject };
export default validateBinding;
