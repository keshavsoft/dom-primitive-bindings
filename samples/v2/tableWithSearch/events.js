export const rowBinding = {
  event: "click",
  selector: ".ks-btn-show",
  runner: (target, instructions, clientData) => ({
    eventType: clientData.event.type,
    selector: ".ks-btn-show",
    targetTag: target.tagName,
    targetClass: target.className
  }),
  onExtract: (data) => {
    console.log("Delegated Row Click:", data);
    const logBox = document.getElementById("binding-log");
    if (logBox) {
      logBox.innerHTML = `Delegated Row Click: <span class="text-warning">${JSON.stringify(data)}</span>`;
    }
  }
};

export const searchBinding = {
  event: "keydown",
  selector: "input[type='search'], input",
  runner: (event) => {
    if (event.key !== "Enter") return null;

    return {
      eventType: event.type,
      key: event.key,
      targetTag: event.target.tagName,
      value: event.target.value
    };
  },
  onExtract: (data) => {
    console.log("Delegated Keydown Event:", data);
    const logBox = document.getElementById("binding-log");
    if (logBox) {
      logBox.innerHTML = `Delegated Keydown: <span class="text-info">${JSON.stringify(data)}</span>`;
    }
  }
};

export const bindings = [rowBinding, searchBinding];

export default bindings;
