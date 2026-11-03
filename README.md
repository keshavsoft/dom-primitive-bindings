# DOM Primitive Bindings

> Modern, lightweight, delegated event engine for browser DOMs. Attach exactly one listener per event type to any container; let bubbling handle matching, runners, and extraction with zero re-binding overhead.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Tests](https://img.shields.io/badge/tests-passing-brightgreen.svg)]()
[![Single Source of Truth](https://img.shields.io/badge/Version-v1-blue.svg)]()

---

## 🎯 The Core Concept

Traditional client-side code attaches listeners to every button, link, and input. When tables are refreshed, cards are added, or modals render dynamic markup, those listeners break or leak memory unless manually re-attached.

**DOM Primitive Bindings** inverts the architecture:
- Attach **one listener** per event type to the parent container (`table`, `form`, `card-grid`).
- As events bubble up, `closest(selector)` identifies target elements.
- The associated `runner` executes and forwards data cleanly to `onExtract`.
- Dynamically created DOM elements are supported immediately with **zero re-binding**.

---

## 🏗️ Staged Architecture (`src/v1/`)

The repository strictly enforces a staged pipeline where every directory contains an `index.js` and all files export a single function as `default`:

```text
src/
└── v1/
    ├── guards/               # Validates container and bindings array
    │   ├── container/        # Validates and resolves 1st input (container / ID)
    │   ├── bindings/         # Validates 2nd input (bindings array)
    │   └── index.js
    ├── prepare/              # Groups bindings by event type into Map
    │   ├── groupBindings.js
    │   └── index.js
    ├── listeners/            # Attaches single listener per event type to container
    │   ├── attachListener.js
    │   └── index.js
    ├── dispatch/             # Handles event bubbling, runner execution & extraction
    │   ├── getStartInput.js
    │   ├── getClientData.js
    │   ├── executeBinding.js
    │   └── index.js
    ├── register/             # Exposes module onto window.ks.domPrimitiveBindings
    │   ├── meta.js
    │   └── index.js
    └── index.js              # Orchestrator exporting bindEvents
```

### Key Design Disciplines
1. **Zero Comments:** The folder hierarchy and descriptive file names convey the full narrative without inline code comments.
2. **Folder Discipline:** Every folder contains an `index.js` public gateway.
3. **Single Function Default Export:** No default export objects; every file exports a single function.

---

## 🚀 Interactive Browser Samples (`samples/v1/`)

Start the Vite development server to view and interact with real browser DOM events:

```bash
npm install
npm run dev
```

Open in Chrome or Edge:
- **`samples/v1/tableWithSearch/`** — Delegated table row clicks and live Enter-key search input.
- **`samples/v1/cardGrid/`** — Dynamic card insertion into DOM with instant delegated action buttons.
- **`samples/v1/formEvents/`** — Live form field inputs, dropdown selection changes, and submit/clear buttons.

---

## 📦 Usage

### Browser (ES Module / Script)

```html
<script type="module" src="./docs/dist/v1/min.js"></script>
<script type="module">
  const bindings = [
    {
      event: "click",
      selector: ".btn-cart",
      runner: (target) => ({ productId: target.dataset.id }),
      onExtract: (data) => console.log("Added to cart:", data)
    }
  ];

  window.ks.domPrimitiveBindings.bindEvents("products-container", bindings);
</script>
```

### Module Import

```javascript
import { bindEvents } from "dom-primitive-bindings";

bindEvents(containerElement, [
  {
    event: "click",
    selector: ".action-btn",
    runner: (btn) => btn.dataset.action,
    onExtract: (action) => console.log("Action:", action)
  }
]);
```

---

## 🧪 Testing & Build

```bash
# Run unit tests
npm test

# Build production bundle to docs/dist/v1/min.js
npm run build
```

---

## 📄 License

MIT © KeshavSoft

