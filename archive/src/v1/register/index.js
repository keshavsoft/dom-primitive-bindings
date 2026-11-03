import meta from "./meta.js";

const registerGlobal = (bindEvents, metadata = meta) => {
  if (!bindEvents || typeof globalThis === "undefined") return;

  globalThis.ks ??= {};

  globalThis.ks.domPrimitiveBindings = {
    meta: metadata,
    bindEvents
  };

  return globalThis.ks.domPrimitiveBindings;
};

export default registerGlobal;

