# DOM Primitive Bindings

> Browser-native, single-listener container event delegation driven by declarative JSON instructions.

[![npm version](https://img.shields.io/npm/v/dom-primitive-bindings.svg?style=flat-square)](https://www.npmjs.com/package/dom-primitive-bindings)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![GitHub Pages](https://img.shields.io/badge/Docs-GitHub%20Pages-success.svg?style=flat-square)](https://keshavsoft.github.io/dom-primitive-bindings/)

---

## 🌐 Live Documentation & Interactive Story

Explore the complete interactive story and live samples on **[GitHub Pages](https://keshavsoft.github.io/dom-primitive-bindings/)**:

1. **[Chapter 1: The Problem (Why?)](https://keshavsoft.github.io/dom-primitive-bindings/why/)** ([local](./docs/why/index.html))  
   Why attaching listeners to individual elements causes memory leaks, double-trigger cascades, and re-render dead zones.
2. **[Chapter 2: How We Achieved It](https://keshavsoft.github.io/dom-primitive-bindings/how/)** ([local](./docs/how/index.html))  
   The delegation epiphany: leveraging browser event bubbling across a decoupled 4-stage pipeline (`guards` $\to$ `prepare` $\to$ `listeners` $\to$ `dispatch`).
3. **[Chapter 3: Declarative JSON](https://keshavsoft.github.io/dom-primitive-bindings/declarative/)** ([local](./docs/declarative/index.html))  
   Separating intent from execution: why JSON instructions make UI code human-readable, statically guardable, and self-documenting.
4. **[Usage & Available Builds](https://keshavsoft.github.io/dom-primitive-bindings/usage/)** ([local](./docs/usage/index.html))  
   Available builds hosted on GitHub Pages CDN with one-click copyable script tags and ES Module imports.

---

## 🎯 The Philosophy: The Wiring Layer

A common mistake in UI architecture is conflating **event wiring** with **DOM manipulation** or **data extraction**:

- **`dom-primitive-bindings` (This Repository):**  
  Pure **Wiring Layer**. Attaches one container listener per event type, matches bubbling targets via `closest(selector)`, and delivers `{ event, targetElement }`. It does **not** manipulate DOM elements and does **not** extract schemas.
- **`dom-primitive-engine` (Sibling Repository):**  
  Pure **Extraction Layer**. Receives the matched target element and executes declarative instruction pipelines (e.g. `closest("tr")`, `querySelectorAll("td")`) to produce clean JSON.

```text
[ User Action in Browser ]
            │
            ▼
┌───────────────────────────────┐
│    dom-primitive-bindings     │ ◄── Wiring Layer: Catches bubbling event & matches target
│  (guards → prepare → dispatch)│
└──────────────┬────────────────┘
               │ delivers { event, targetElement }
               ▼
┌───────────────────────────────┐
│     Consumer / App Logic      │ ◄── Extraction (dom-primitive-engine) or Action Handler
└───────────────────────────────┘
```

---

## ⚡ Quick Start & Distribution

### 1. Direct Script Tag (Zero Install via GitHub Pages CDN)

```html
<script type="module" src="https://keshavsoft.github.io/dom-primitive-bindings/dist/v4/min.js"></script>
```

Or always use the latest build:

```html
<script type="module" src="https://keshavsoft.github.io/dom-primitive-bindings/dist/min.js"></script>
```

### 2. ES Module Import in JavaScript

```javascript
import { bindEvents } from "https://keshavsoft.github.io/dom-primitive-bindings/dist/v4/min.js";
```

### 3. NPM Package

```bash
npm install dom-primitive-bindings
```

---

## 📦 Usage Example

### 1. Declare `bindings.json`

```json
[
  {
    "event": "click",
    "selector": "#rakaBtn",
    "narration": "Load and populate Raka columns JSON into editor"
  },
  {
    "event": "click",
    "selector": "#templateBtn",
    "narration": "Load and populate template JSON into editor"
  },
  {
    "event": "click",
    "selector": "#buildBtn",
    "narration": "Transform columns with template and display output in editor"
  }
]
```

### 2. Delegate with `bindEvents`

```javascript
import { bindEvents } from "https://keshavsoft.github.io/dom-primitive-bindings/dist/v4/min.js";
import bindings from "./bindings.json" with { type: "json" };

bindEvents("app-container", bindings);
```

---

## 🏗️ Staged Pipeline Architecture

The engine enforces a decoupled pipeline where every directory contains an `index.js` public gateway:

```text
src/v4/
├── guards/               # Validates container & bindings array before execution
├── prepare/              # Groups bindings by event type into Map
├── listeners/            # Attaches single container listener per event type
├── dispatch/             # Handles event bubbling, target matching (closest) & execution
├── register/             # Exposes module onto window.ks.domPrimitiveBindings
└── index.js              # Orchestrator
```

---

## 🧪 Testing & Build

```bash
# Run unit tests
npm test

# Build production bundle using build-cli
npx @keshavsoft/build-cli build
```

---

## 🔗 Useful Links

- **Live Documentation**: [https://keshavsoft.github.io/dom-primitive-bindings/](https://keshavsoft.github.io/dom-primitive-bindings/)
- **Copyable Script Links**: [https://keshavsoft.github.io/dom-primitive-bindings/usage/](https://keshavsoft.github.io/dom-primitive-bindings/usage/)
- **NPM Package**: [https://www.npmjs.com/package/dom-primitive-bindings](https://www.npmjs.com/package/dom-primitive-bindings)

---

## 📄 License

MIT © KeshavSoft
