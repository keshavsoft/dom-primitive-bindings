import executeBinding from "./executeBinding.js";

const dispatchEvent = ({ bindings, event, container }) => {
  for (const binding of bindings) {
    const matchElement = event.target?.closest?.(binding.selector);
    if (!matchElement || !container.contains(matchElement)) {
      continue;
    }

    executeBinding({ binding, event, matchElement });
  }
};

export default dispatchEvent;

