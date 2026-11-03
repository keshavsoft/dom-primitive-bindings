const validateArray = (bindings) => {
  if (!Array.isArray(bindings)) return [];

  return bindings.filter((binding) => (
    binding && typeof binding === "object" && typeof binding.event === "string" && typeof binding.selector === "string"
  ));
};

export default validateArray;

