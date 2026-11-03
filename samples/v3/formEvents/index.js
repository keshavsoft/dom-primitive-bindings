import bindings from "./bindings.json" with { type: "json" };

const formLog = document.getElementById("form-log");

const configuredBindings = bindings.map((binding) => ({
  ...binding,
  onExtract: (result, event, matchElement) => {
    const detail = {
      event: event.type,
      selector: binding.selector,
      field: matchElement.name || matchElement.dataset.action,
      value: matchElement.value,
      targetTag: matchElement.tagName
    };
    console.log("Form Event from bindings.json:", detail);
    if (formLog) {
      formLog.innerHTML = `Form Event from <span class="text-info">bindings.json</span>: <span class="text-warning">${JSON.stringify(detail)}</span>`;
    }
  }
}));

window.ks.domPrimitiveBindings?.bindEvents("form-container", configuredBindings);
