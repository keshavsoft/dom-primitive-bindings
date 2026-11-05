# Binding Specification — DOM Primitive Bindings

This document defines the normative schema and runtime behavior for declarative `bindings.json` files.

---

## 1. Schema Overview

A bindings file is an array of binding specification objects:

```json
[
  {
    "event": "click",
    "selector": ".ks-btn-show",
    "root": "element",
    "clientData": {
      "context": "tableRow"
    }
  }
]
```

---

## 2. Property Definitions

### `event` (Required)
- **Type**: `string`
- **Description**: The standard browser DOM event name to listen for on the container (e.g. `"click"`, `"keydown"`, `"input"`, `"change"`, `"submit"`).
- **Behavior**: The engine groups all bindings with the same `event` name under a single native event listener on the container element.

### `selector` (Required)
- **Type**: `string`
- **Description**: Standard CSS selector used by `event.target.closest(selector)` to identify whether the bubbling event originated from or within a target element.
- **Examples**:
  - `".ks-btn-show"`
  - `"input[type='search'], input"`
  - `".btn-action"`
  - `".product-card"`

### `root` (Optional)
- **Type**: `string` (`"element"` | `"event"`)
- **Default**: `"element"` (automatically defaults to `"event"` for key events such as `keydown`, `keyup`, `keypress`).
- **Description**: Determines what is passed as the first argument to the runner function:
  - `"element"`: passes the matched DOM element (`matchElement`).
  - `"event"`: passes the native browser `Event` object.

### `clientData` (Optional)
- **Type**: `object`
- **Description**: Arbitrary user-defined context passed along into the dispatch pipeline. The engine merges this into the client context object alongside `event` and `targetElement`.

### `instructions` (Optional)
- **Type**: `array`
- **Description**: Declarative extraction instructions intended for handoff to `dom-primitive-engine`.

---

## 3. Runtime Dispatch Lifecycle

When an event fires inside the container:

```text
Browser Event Fires
       │
       ▼
Container Listener Intercepts (listeners/attachListener.js)
       │
       ▼
Find Matching Element: event.target.closest(binding.selector)
       │
       ├── No match / not inside container ──> Discard (continue)
       │
       ▼
Resolve Start Input (dispatch/getStartInput.js)
       │
       ├── Key event or root === "event" ──> Pass event
       └── Otherwise ──> Pass matchElement
       │
       ▼
Execute Runner (dispatch/executeBinding.js)
       │
       ▼
Forward to onExtract(result, event, matchElement)
```

