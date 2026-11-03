const formLog = document.getElementById("form-log");

const bindings = [
  {
    event: "input",
    selector: ".form-field",
    runner: (field, instructions, clientData) => ({
      eventType: clientData.event.type,
      selector: ".form-field",
      field: field.name,
      value: field.value
    }),
    onExtract: (data) => {
      console.log("Delegated Form Input:", data);
      formLog.innerHTML = `Field Input Event: <span class="text-warning">${JSON.stringify(data)}</span>`;
    }
  },
  {
    event: "change",
    selector: ".form-field",
    runner: (field, instructions, clientData) => ({
      eventType: clientData.event.type,
      selector: ".form-field",
      field: field.name,
      value: field.value
    }),
    onExtract: (data) => {
      console.log("Delegated Form Change:", data);
      formLog.innerHTML = `Field Change Event: <span class="text-warning">${JSON.stringify(data)}</span>`;
    }
  },
  {
    event: "click",
    selector: ".btn-form-action",
    runner: (btn, instructions, clientData) => ({
      eventType: clientData.event.type,
      selector: ".btn-form-action",
      action: btn.dataset.action,
      targetElement: btn.tagName
    }),
    onExtract: (data) => {
      console.log("Delegated Button Click:", data);
      formLog.innerHTML = `Form Button Click: <span class="text-info">${JSON.stringify(data)}</span>`;
    }
  }
];

window.ks.domPrimitiveBindings?.bindEvents("form-container", bindings);
