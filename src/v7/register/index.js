import meta from "./meta.js";

const registerGlobal = (api, metadata = meta) => {
  if (!api || typeof globalThis === "undefined") return;

  globalThis.ks ??= {};

  globalThis.ks.domPrimitiveBindings = {
    meta: metadata,
    ...api
  };

  globalThis.ks.bindEvents ??= api.bindEvents;

  return globalThis.ks.domPrimitiveBindings;
};

export default registerGlobal;
