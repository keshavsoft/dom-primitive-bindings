const formLog = document.getElementById("form-log");
const formElement = document.getElementById("form-container");

const bindings = [
  {
    event: "input",
    selector: ".form-field",
    runner: (field) => ({
      field: field.name,
      value: field.value,
      type: field.type
    }),
    onExtract: (data) => {
      formLog.innerHTML = `Field Input Event: <span class="text-warning">${JSON.stringify(data)}</span>`;
    }
  },
  {
    event: "change",
    selector: ".form-field",
    runner: (field) => ({
      field: field.name,
      value: field.value,
      type: field.type
    }),
    onExtract: (data) => {
      formLog.innerHTML = `Field Change Event: <span class="text-warning">${JSON.stringify(data)}</span>`;
    }
  },
  {
    event: "click",
    selector: ".btn-form-action",
    runner: (btn) => {
      const action = btn.dataset.action;
      if (action === "clear") {
        formElement.reset();
        return { action: "cleared" };
      }
      const formData = Object.fromEntries(new FormData(formElement).entries());
      return { action: "saved", formData };
    },
    onExtract: (data) => {
      formLog.innerHTML = `Form Button Click: <span class="text-warning">${JSON.stringify(data)}</span>`;
    }
  }
];

window.ks.domPrimitiveBindings?.bindEvents("form-container", bindings);

