# DOM Primitive Bindings

> Modern, lightweight, delegated event engine for browser DOMs. Attach exactly one listener per event type to any container; let bubbling handle matching, runners, and dispatch with zero DOM manipulation and zero schema extraction.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Tests](https://img.shields.io/badge/tests-passing-brightgreen.svg)]()
[![Single Source of Truth](https://img.shields.io/badge/Version-v2-blue.svg)]()

---

## 🎯 The Philosophy (v2 Revision)

A common mistake in UI architecture is conflating **event wiring** with **DOM manipulation** or **data extraction**.

- **`dom-primitive-bindings` (This Repository):**
  Pure **Wiring Layer**. It attaches one container listener per event type, matches bubbling targets via `closest(selector)`, and delivers `{ event, targetElement }`. It does **not** manipulate DOM elements (no deleting/appending elements) and does **not** extract table schemas into objects.
- **`dom-primitive-engine` (Sibling Repository):**
  Pure **Extraction Layer**. It receives the target element and executes declarative instruction pipelines (e.g. `closest("tr")`, `querySelectorAll("td")`, column mapping) to produce clean data.

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

## 🏗️ Staged Architecture (`src/v2/`)

The repository strictly enforces a staged pipeline where every directory contains an `index.js` and all files export a single function as `default`:

```text
src/
└── v2/
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
    ├── dispatch/             # Handles event bubbling, runner execution & dispatch
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
4. **Pure Delegation:** Focuses strictly on event dispatching and target element matching.

---

## 🚀 Interactive Browser Samples (`samples/v2/`)

Start the Vite development server to view and interact with real browser DOM events:

```bash
npm install
npm run dev
```

Open in Chrome or Edge:
- **`samples/v2/tableWithSearch/`** — Delegated table row clicks and live Enter-key search input (pure event target logging).
- **`samples/v2/cardGrid/`** — Delegated card buttons and card body clicks with zero DOM mutation.
- **`samples/v2/formEvents/`** — Delegated live field inputs, dropdown selection changes, and button clicks with zero form resets.

---

## 📦 Usage

### Browser (ES Module / Script)

```html
<script type="module" src="./docs/dist/v2/min.js"></script>
<script type="module">
  const bindings = [
    {
      event: "click",
      selector: ".btn-action",
      runner: (target, instructions, clientData) => ({
        eventType: clientData.event.type,
        targetTag: target.tagName,
        action: target.dataset.action
      }),
      onExtract: (data) => console.log("Delegated click captured:", data)
    }
  ];

  window.ks.domPrimitiveBindings.bindEvents("container-id", bindings);
</script>
```

---

## 🧪 Testing & Build

```bash
# Run unit tests
npm test

# Build production bundle to docs/dist/v2/min.js
npm run build
```

---

## 📄 License

MIT © KeshavSoft
