import { check } from "../../docs/dist/v7/min.js";

import bindings from "./bindings.json" with { type: "json" };
import actions from "./actions.js";

const result = check("app", bindings, actions);

console.log("result : ", result);