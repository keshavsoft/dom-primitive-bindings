import bindings from "./bindings.json" with { type: "json" };

const logBox = document.getElementById("log-box");

const configuredBindings = bindings.map((binding) => ({
  ...binding,
  onExtract: (result, event, matchElement) => {
    const detail = {
      event: event.type,
      selector: binding.selector,
      targetTag: matchElement.tagName,
      targetClass: matchElement.className,
      action: matchElement.dataset.action
    };
    console.log("Card Event from bindings.json:", detail);
    if (logBox) {
      logBox.innerHTML = `Card Event from <span class="text-info">bindings.json</span>: <span class="text-warning">${JSON.stringify(detail)}</span>`;
    }
  }
}));

window.ks.domPrimitiveBindings?.bindEvents("card-container", configuredBindings);
