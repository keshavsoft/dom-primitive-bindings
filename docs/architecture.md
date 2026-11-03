# Architecture & Design Story — DOM Primitive Bindings

This document details the architectural philosophy, data flow, and design trade-offs behind **DOM Primitive Bindings**.

---

## 1. The Core Architectural Philosophy

### Separation of Concerns: The Wiring Layer vs. The Extraction Layer

Modern frontend architectures fail when they blur the boundary between **how events are wired** and **how data is extracted or mutated**:

```text
┌─────────────────────────────────┐
│           Browser DOM           │  <-- Stateful View (Table, Form, Cards)
└────────────────┬────────────────┘
                 │ user interaction (click, input, keydown)
                 ▼
┌─────────────────────────────────┐
│     dom-primitive-bindings      │  <-- Responsibility: The Wiring Layer
│  (guards → prepare → dispatch)  │      • Single listener on container
└────────────────┬────────────────┘      • Matches closest(selector)
                 │ passes { event, targetElement }
                 ▼
┌─────────────────────────────────┐
│      dom-primitive-engine       │  <-- Responsibility: The Extraction Layer
│    (declarative instructions)   │      • Traverses DOM (tr, td)
└────────────────┬────────────────┘      • Produces clean JSON object
                 │ outputs clean Plain Data
                 ▼
┌─────────────────────────────────┐
│    Business Logic / API Call    │  <-- Consumes Plain Data
└─────────────────────────────────┘
```

By strictly separating event wiring into `dom-primitive-bindings`:
1. **Zero DOM manipulation**: Bindings never alter, insert, or delete DOM elements.
2. **Zero schema extraction**: Bindings never parse table cells or form schemas into business models.
3. **Pure delegation**: Exactly **one listener per event type** is attached to the parent container. Bubbling handles target matching.

---

## 2. Why Delegated Bindings over Element Listeners?

| Approach | Memory Usage | Dynamic Element Support | Duplicate Fire Risk |
| :--- | :--- | :--- | :--- |
| **Direct Listeners** (`element.addEventListener`) | High ($O(N)$ listeners) | Fails on newly added DOM elements | High (re-attaching duplicates listeners) |
| **DOM Primitive Bindings** (Container Delegation) | Minimal ($O(1)$ listener per event type) | Works instantly on dynamic elements | Zero (single stable container listener) |

---

## 3. The 4-Stage Internal Pipeline (`src/v3/`)

The engine operates on a strictly staged, functional pipeline where every folder contains an `index.js` and exports a single function as `default`:

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

### Stage Details

1. **`guards/`**: Validates inputs before any DOM mutation occurs.
   - `container/`: Resolves string IDs via `document.getElementById` or verifies existing element.
   - `bindings/`: Filters invalid items and ensures at least one valid binding exists.
2. **`prepare/`**: Groups bindings into a `Map<eventType, bindings[]>`.
   - If 10 separate selectors listen for `click`, they are aggregated under the single `"click"` event group.
3. **`listeners/`**: Attaches exactly one native event listener to the container per event type.
4. **`dispatch/`**:
   - Intercepts the bubbling event.
   - Resolves matching element via `event.target.closest(binding.selector)`.
   - Resolves starting input (`event` for keyboard events, `matchElement` for clicks).
   - Invokes runner and forwards data to `onExtract`.

---

## 4. Responsibility Boundaries

| Actor | What It Does | What It NEVER Does |
| :--- | :--- | :--- |
| **Container Element** | Acts as the stable anchor for bubbling events | Does not know about inner button schemas |
| **`bindings.json`** | Declares `event` and `selector` | Does not execute imperative logic |
| **`dom-primitive-bindings`** | Resolves target, manages delegation pipeline | Does not extract table rows or mutate markup |
| **`dom-primitive-engine`** | Extracts clean JSON data from the matched target | Does not manage event listeners |

---

## 5. Version Evolution (`v3` as Single Source of Truth)

- **v1**: Staged architecture established with zero code comments and single-function default exports.
- **v2**: Removed accidental DOM manipulation and cell extraction from samples, solidifying the pure delegation boundary.
- **v3**: Declarative JSON transformation. Replaced imperative `.js` event arrays with pure, serializable `bindings.json` configurations.
