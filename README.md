# DOM Primitive Bindings

> Modern, lightweight, single-listener delegated event engine for browser DOMs. Driven by declarative `bindings.json` configurations with zero DOM manipulation and zero schema extraction.

[![npm version](https://img.shields.io/npm/v/dom-primitive-bindings.svg?style=flat-square)](https://www.npmjs.com/package/dom-primitive-bindings)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Single Source of Truth](https://img.shields.io/badge/Version-v3-blue.svg?style=flat-square)]()
[![Documentation](https://img.shields.io/badge/Docs-Architecture%20%26%20Stories-green.svg?style=flat-square)](./docs/index.html)

---

## 📖 The 4-Part Event Delegation Story

Explore the interactive interactive story chapters in [`docs/stories/`](./docs/index.html):

1. **[Chapter 1: The Everyday Habit & The Listener Trap](./docs/stories/01-the-listener-trap.html)**  
   Why attaching listeners to individual elements causes memory leaks, double-trigger cascades, and dead-zones on dynamic elements.
2. **[Chapter 2: The Delegation Epiphany](./docs/stories/02-the-delegation-epiphany.html)**  
   Harnessing browser event bubbling: 1 container listener catching bubbling events forever.
3. **[Chapter 3: The Staged Pipeline Architecture](./docs/stories/03-the-staged-pipeline.html)**  
   Inside the decoupled 4-stage pipeline: `guards` $\to$ `prepare` $\to$ `listeners` $\to$ `dispatch`.
4. **[Chapter 4: The Joy of Declarative JSON](./docs/stories/04-declarative-json-bindings.html)**  
   Moving from imperative JavaScript arrays to clean, serializable `bindings.json` specifications with a live interactive demo.

---

## 🎯 The Philosophy: The Wiring Layer

A common mistake in UI architecture is conflating **event wiring** with **DOM manipulation** or **data extraction**:

- **`dom-primitive-bindings` (This Repository):**  
  Pure **Wiring Layer**. Attaches one container listener per event type, matches bubbling targets via `closest(selector)`, and delivers `{ event, targetElement }`. It does **not** manipulate DOM elements and does **not** extract table schemas into objects.
- **`dom-primitive-engine` (Sibling Repository):**  
  Pure **Extraction Layer**. Receives the matched target element and executes declarative instruction pipelines (e.g. `closest("tr")`, `querySelectorAll("td")`, column mapping) to produce clean JSON.

```text
[ User Action in Browser ]
            │
            ▼
┌───────────────────────────────┐
│    dom-primitive-bindings     │ ◄── Wiring Layer: Catches event & matches target
│  (guards → prepare → dispatch)│
└──────────────┬────────────────┘
               │ delivers { event, targetElement }
               ▼
┌───────────────────────────────┐
│     Consumer / App Logic      │ ◄── Extraction (dom-primitive-engine) or App Handler
└───────────────────────────────┘
```

---

## 🏗️ Staged Architecture (`src/v3/`)

The engine enforces a staged pipeline where every directory contains an `index.js` and all files export a single function as `default`:

```text
src/v3/
├── guards/               # Validates container & bindings array
│   ├── container/        # Resolves 1st input (container ID or DOM element)
│   ├── bindings/         # Filters and validates 2nd input (bindings array)
│   └── index.js
├── prepare/              # Groups bindings by event type into Map
│   ├── groupBindings.js
│   └── index.js
├── listeners/            # Attaches single container listener per event type
│   ├── attachListener.js
│   └── index.js
├── dispatch/             # Handles event bubbling, target matching & execution
│   ├── getStartInput.js
│   ├── getClientData.js
│   ├── executeBinding.js
│   └── index.js
├── register/             # Exposes module onto window.ks.domPrimitiveBindings
│   ├── meta.js
│   └── index.js
└── index.js              # Orchestrator
```

### Key Design Disciplines
1. **Zero Comments:** The folder hierarchy and descriptive file names convey the full narrative without inline code comments.
2. **Folder Discipline:** Every folder contains an `index.js` public gateway.
3. **Single Function Default Export:** No default export objects; every file exports a single function.
4. **Declarative JSON:** Bindings are defined in serializable `bindings.json` files.

---

## 🚀 Interactive Browser Samples (`samples/v3/`)

Start the Vite development server to view and interact with real browser DOM events:

```bash
npm install
npm run dev
```

Open in Chrome or Edge:
- **`samples/v3/tableWithSearch/`** — Declarative table row clicks and live Enter-key search input loaded from `bindings.json`.
- **`samples/v3/cardGrid/`** — Declarative card button and card body click bindings loaded from `bindings.json`.
- **`samples/v3/formEvents/`** — Declarative input, change, and button click bindings loaded from `bindings.json`.

---

## 📦 Usage

### 1. Declare `bindings.json`

```json
[
  {
    "event": "click",
    "selector": ".btn-action"
  },
  {
    "event": "keydown",
    "selector": "input[type='search']"
  }
]
```

### 2. Run with `bindEvents`

```javascript
import bindings from "./bindings.json" with { type: "json" };
import { bindEvents } from "dom-primitive-bindings";

bindEvents("container-id", bindings);
```

Or via global browser script:

```html
<script type="module" src="./docs/dist/v3/min.js"></script>
<script type="module">
  import bindings from "./bindings.json" with { type: "json" };
  window.ks.domPrimitiveBindings.bindEvents("container-id", bindings);
</script>
```

---

## 📚 Technical Specifications

- **[Architecture & Design Story](./docs/architecture.md)**: Deep dive into the 4 internal stages and data flow.
- **[Binding Specification Schema](./docs/binding-spec.md)**: Complete property reference for `bindings.json`.

---

## 🧪 Testing & Build

```bash
# Run unit tests
npm test

# Build production bundle to docs/dist/v3/min.js
npm run build
```

---

## 📄 License

MIT © KeshavSoft
