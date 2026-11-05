// src/v5/register/meta.js
var e = {
	name: "dom-primitive-bindings",
	version: "5.0.0"
}, t = (t, n = e) => {
	if (t && typeof globalThis < "u") return globalThis.ks ??= {}, globalThis.ks.domPrimitiveBindings = {
		meta: n,
		bindEvents: t
	}, globalThis.ks.bindEvents ??= t, globalThis.ks.domPrimitiveBindings;
}, n = (e) => typeof e == "string" ? document.getElementById(e) || document.querySelector(e) : e && typeof e == "object" && "addEventListener" in e ? e : null, r = (e) => e && n(e) || null, i = (e) => Array.isArray(e) ? e.filter((e) => e && typeof e == "object" && typeof e.event == "string" && typeof e.selector == "string") : [], a = (e) => {
	let t = i(e);
	return t.length === 0 ? null : t;
}, o = (e, t) => {
	let n = r(e);
	if (!n) return null;
	let i = a(t);
	return i ? {
		container: n,
		bindings: i
	} : null;
}, s = (e, t = {}) => {
	let n = t && typeof t === "object" && Object.keys(t).length > 0;
	let r = n ? e.map((e) => {
		if (e.action && typeof t[e.action] === "function" && typeof e.onExtract !== "function") {
			return {
				...e,
				onExtract: (n, r, i) => {
					t[e.action](r, i, n);
				}
			};
		}
		return e;
	}) : e;
	let i = /* @__PURE__ */ new Map();
	for (let e of r) {
		let n = i.get(e.event) ?? [];
		n.push(e), i.set(e.event, n);
	}
	return i;
}, c = (e, t) => s(e, t), l = (e, t, n) => e.root === "event" || t?.type?.startsWith("key") ? t : n, u = (e, t, n) => ({
	...e.clientData,
	event: t,
	targetElement: n
}), d = ({ binding: e, event: t, matchElement: n }) => {
	let r = l(e, t, n), i = u(e, t, n), a = e.runner, o = typeof a == "function" ? a(r, e.instructions, i) : r;
	return o != null && typeof e.onExtract == "function" && e.onExtract(o, t, n), o;
}, f = ({ bindings: e, event: t, container: n }) => {
	for (let r of e) {
		let e = t.target?.closest?.(r.selector);
		e && n.contains(e) && d({
			binding: r,
			event: t,
			matchElement: e
		});
	}
}, p = (e, t, n) => {
	e.addEventListener(t, (t) => {
		f({
			bindings: n,
			event: t,
			container: e
		});
	});
}, m = (e, t) => {
	for (let [n, r] of t.entries()) p(e, n, r);
	return e;
}, h = (e, t = [], n = {}) => {
	let r = o(e, t);
	if (!r) return null;
	let { container: i, bindings: a } = r;
	return m(i, c(a, n)), i;
};
t(h);
export { h as bindEvents, h as default };

