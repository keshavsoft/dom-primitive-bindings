const logBox = document.getElementById("log-box");

const bindings = [
  {
    event: "click",
    selector: ".btn-action",
    runner: (btn) => {
      const action = btn.dataset.action;
      const card = btn.closest(".product-card");
      const name = card?.querySelector(".card-title")?.textContent.trim();

      if (action === "delete") {
        card?.remove();
        return { action: "deleted", name };
      }

      return {
        action: "added_to_cart",
        name: btn.dataset.name || name,
        price: btn.dataset.price
      };
    },
    onExtract: (data) => {
      console.log("Card Event:", data);
      logBox.innerHTML = `Action Handled: <span class="text-warning">${JSON.stringify(data)}</span>`;
    }
  }
];

window.ks.domPrimitiveBindings?.bindEvents("card-container", bindings);

let cardCounter = 3;
document.getElementById("btn-add-card")?.addEventListener("click", () => {
  const container = document.getElementById("card-container");
  const newCard = document.createElement("div");
  newCard.className = "col-md-4 product-card";
  newCard.innerHTML = `
    <div class="card h-100 shadow-sm border p-3 border-success">
      <h5 class="card-title fw-bold text-success">Dynamic Product #${cardCounter}</h5>
      <p class="card-text text-muted small">Auto-generated · ₹${cardCounter * 400}</p>
      <div class="mt-auto d-flex gap-2">
        <button class="btn btn-primary btn-sm btn-action" data-action="cart" data-name="Dynamic Product #${cardCounter}" data-price="${cardCounter * 400}">
          <i class="bi bi-cart-plus me-1"></i> Add to Cart
        </button>
        <button class="btn btn-outline-danger btn-sm btn-action" data-action="delete">
          <i class="bi bi-trash"></i>
        </button>
      </div>
    </div>
  `;
  container.appendChild(newCard);
  cardCounter++;
  logBox.innerHTML = `<span class="text-success">New card dynamically added to DOM! Notice its buttons work immediately with ZERO re-hooking.</span>`;
});

