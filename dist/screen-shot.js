const r = (n, e = {}, t = "") => {
  const o = document.createElement(n);
  for (let i in e)
    o.setAttribute(i, e[i]);
  return o.innerHTML = t, o;
}, g = (n, e) => (document.getElementById(n) || document.getElementsByTagName("head")[0].prepend(r("STYLE", { type: "text/css" }, e)), !0), d = function(n = {}) {
  let e, t;
  g("geocam-screenshot-button", `
  .geocam-screenshot-button {
       background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxnIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMS41Ij48cGF0aCBkPSJNMTAgMjEuNHYtNy4wMDZhLjYuNiAwIDAgMSAuNi0uNmgxLjE3M2EuNi42IDAgMCAwIC41MDQtLjI3NWwxLjQ0Ni0yLjI0NGEuNi42IDAgMCAxIC41MDQtLjI3NWgzLjU0NmEuNi42IDAgMCAxIC41MDQuMjc1bDEuNDQ2IDIuMjQ0YS42LjYgMCAwIDAgLjUwNC4yNzVIMjEuNGEuNi42IDAgMCAxIC42LjZWMjEuNGEuNi42IDAgMCAxLS42LjZIMTAuNmEuNi42IDAgMCAxLS42LS42Ii8+PHBhdGggZD0iTTE2IDE5YTIgMiAwIDEgMCAwLTRhMiAyIDAgMCAwIDAgNE0zIDE4djNoMi41TTMgOS41djVNMyA2VjNoM20zLjUgMGg1TTE4IDNoM3YyLjVtMCA0LjVWOC41Ii8+PC9nPjwvc3ZnPg==');
    }
  `);
  const i = async (c) => {
    const a = e.renderer.domElement, s = await new Promise((u) => a.toBlob(u)), l = [new ClipboardItem({ [s.type]: s })];
    await navigator.clipboard.write(l);
  };
  this.init = function(c) {
    e = c, t = r("DIV", {
      class: "geocam-screenshot-button geocam-viewer-control-button",
      title: "Copy current view to the clipboard"
    }), e.addControl(t, "left-top"), t.addEventListener("click", i, !1);
  }, this.destroy = function() {
    e.wrapper.removeChild(t);
  };
};
class m extends HTMLElement {
  constructor() {
    super(), this.plugin = null, console.log("screen-shot init");
  }
  connectedCallback() {
    console.log("screen-shot connected");
    const e = this.parentNode;
    e.viewer && e.viewer.plugin ? (this.plugin = new d(), e.viewer.plugin(this.plugin)) : console.error(
      "GeocamViewerScreenShot must be a child of GeocamViewer"
    );
  }
  disconnectedCallback() {
    this.plugin = null, console.log("screen-shot disconnected");
  }
}
window.customElements.define(
  "geocam-viewer-screen-shot",
  m
);
export {
  m as GeocamViewerScreenShot
};
