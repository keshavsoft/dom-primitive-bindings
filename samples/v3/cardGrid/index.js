const logBox = document.getElementById("log-box");

const bindings = [
  {
    event: "click",
    selector: ".btn-action",
    runner: (btn, instructions, clientData) => ({
      eventType: clientData.event.type,
      selector: ".btn-action",
      action: btn.dataset.action,
      targetElement: btn.tagName,
      targetClass: btn.className
    }),
    onExtract: (data) => {
      console.log("Card Button Click Delegated:", data);
      logBox.innerHTML = `Button Click Delegated: <span class="text-warning">${JSON.stringify(data)}</span>`;
    }
  },
  {
    event: "click",
    selector: ".product-card",
    runner: (card, instructions, clientData) => ({
      eventType: clientData.event.type,
      selector: ".product-card",
      cardTitle: card.querySelector(".card-title")?.textContent.trim()
    }),
    onExtract: (data) => {
      console.log("Card Body Click Delegated:", data);
      logBox.innerHTML = `Card Body Click Delegated: <span class="text-info">${JSON.stringify(data)}</span>`;
    }
  }
];

window.ks.domPrimitiveBindings?.bindEvents("card-container", bindings);
