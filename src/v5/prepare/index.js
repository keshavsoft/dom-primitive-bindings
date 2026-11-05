import groupBindings from "./groupBindings.js";

const prepareBindings = (bindings, actions = {}) => {
  const hasActions = actions && typeof actions === "object" && Object.keys(actions).length > 0;

  const configuredBindings = hasActions
    ? bindings.map((binding) => {
        if (binding.action && typeof actions[binding.action] === "function" && typeof binding.onExtract !== "function") {
          return {
            ...binding,
            onExtract: (result, event, matchElement) => {
              actions[binding.action](event, matchElement, result);
            }
          };
        }
        return binding;
      })
    : bindings;

  return groupBindings(configuredBindings);
};

export default prepareBindings;
