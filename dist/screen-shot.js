const I = (s, t = {}, c = "") => {
  const i = document.createElement(s);
  for (let a in t)
    i.setAttribute(a, t[a]);
  return i.innerHTML = c, i;
}, A = (s, t) => (document.getElementById(s) || document.getElementsByTagName("head")[0].prepend(I("STYLE", { type: "text/css" }, t)), !0), D = function(s = {}) {
  let t, c, i, a;
  A("geocam-screenshot-button", `
  .geocam-screenshot-button {
       background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTQgNGgzbDItMmg2bDIgMmgzYTIgMiAwIDAgMSAyIDJ2MTJhMiAyIDAgMCAxLTIgMkg0YTIgMiAwIDAgMS0yLTJWNmEyIDIgMCAwIDEgMi0ybTggM2E1IDUgMCAwIDAtNSA1YTUgNSAwIDAgMCA1IDVhNSA1IDAgMCAwIDUtNWE1IDUgMCAwIDAtNS01bTAgMmEzIDMgMCAwIDEgMyAzYTMgMyAwIDAgMS0zIDNhMyAzIDAgMCAxLTMtM2EzIDMgMCAwIDEgMy0zIi8+PC9zdmc+');
    }
  .geocam-viewshot-button {
       background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTQgNWgzbDItMmg2bDIgMmgzYTIgMiAwIDAgMSAyIDJ2MTJhMiAyIDAgMCAxLTIgMkg0YTIgMiAwIDAgMS0yLTJWN2EyIDIgMCAwIDEgMi0ybTkuMDkgNC40NWwtMi4wNCAyLjczbDEuNTUgMi4wN2wtLjg3LjY2bC0yLjQ2LTMuMjdMNiAxNmgxMnoiLz48L3N2Zz4=');
    }
  `);
  const h = async (g) => {
    const r = t.renderer.domElement;
    r.style.filter = "invert(1)";
    const o = await new Promise((e) => r.toBlob(e)), n = [new ClipboardItem({ [o.type]: o })];
    await navigator.clipboard.write(n), r.style.removeProperty("filter");
  }, b = async (g) => {
    document.body.style.filter = "invert(1)";
    const r = t.renderer.domElement, o = r.getBoundingClientRect(), n = a.container.getBoundingClientRect(), e = {
      top: Math.min(o.top, n.top),
      left: Math.min(o.left, n.left),
      bottom: Math.max(o.bottom, n.bottom),
      right: Math.max(o.right, n.right)
    };
    e.width = e.right - e.left, e.height = e.bottom - e.top;
    const l = document.createElement("canvas");
    l.width = e.width, l.height = e.height;
    const d = l.getContext("2d"), p = await a.takeScreenshot(), m = new Image();
    m.src = p.dataUrl, await new Promise((w) => {
      m.onload = w;
    }), o.witdh > n.width || o.height > n.height ? (d.drawImage(
      r,
      o.left - e.left,
      o.top - e.top
    ), d.drawImage(
      m,
      n.left - e.left,
      n.top - e.top
    )) : (d.drawImage(
      m,
      n.left - e.left,
      n.top - e.top
    ), d.drawImage(
      r,
      o.left - e.left,
      o.top - e.top
    ));
    const M = await new Promise((w) => l.toBlob(w)), u = [new ClipboardItem({ [M.type]: M })];
    await navigator.clipboard.write(u), document.body.style.removeProperty("filter");
  };
  this.init = function(g) {
    t = g, c = I("DIV", {
      class: "geocam-screenshot-button geocam-viewer-control-button",
      title: "Copy a screenshot of the current viewer image to the clipboard"
    }), t.addControl(c, "left-top"), c.addEventListener("click", h, !1);
  }, this.arcgisView = function(g) {
    console.log("screen shot add view", g), a || (a = g, i = I("DIV", {
      class: "geocam-viewshot-button geocam-viewer-control-button",
      title: "Copy a screenshot of the current viewer image and map to the clipboard"
    }), t.addControl(i, "left-top", { after: c }), i.addEventListener("click", b, !1));
  }, this.destroy = function() {
    i && t.wrapper.removeChild(i), t.wrapper.removeChild(c);
  };
};
class y extends HTMLElement {
  constructor() {
    super(), this.plugin = null, console.log("screen-shot init");
  }
  connectedCallback() {
    console.log("screen-shot connected");
    const t = this.parentNode;
    t.viewer && t.viewer.plugin ? (this.plugin = new D(), t.viewer.plugin(this.plugin)) : console.error("GeocamViewerScreenShot must be a child of GeocamViewer");
  }
  disconnectedCallback() {
    this.plugin = null, console.log("screen-shot disconnected");
  }
}
window.customElements.define(
  "geocam-viewer-screen-shot",
  y
);
export {
  y as GeocamViewerScreenShot
};
