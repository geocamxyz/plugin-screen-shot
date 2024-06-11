const I = (g, t = {}, r = "") => {
  const c = document.createElement(g);
  for (let s in t)
    c.setAttribute(s, t[s]);
  return c.innerHTML = r, c;
}, y = (g, t) => (document.getElementById(g) || document.getElementsByTagName("head")[0].prepend(I("STYLE", { type: "text/css" }, t)), !0), f = function(g = {}) {
  let t, r, c, s, w;
  y("geocam-screenshot-button", `
  .geocam-screenshot-button {
       background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTQgNGgzbDItMmg2bDIgMmgzYTIgMiAwIDAgMSAyIDJ2MTJhMiAyIDAgMCAxLTIgMkg0YTIgMiAwIDAgMS0yLTJWNmEyIDIgMCAwIDEgMi0ybTggM2E1IDUgMCAwIDAtNSA1YTUgNSAwIDAgMCA1IDVhNSA1IDAgMCAwIDUtNWE1IDUgMCAwIDAtNS01bTAgMmEzIDMgMCAwIDEgMyAzYTMgMyAwIDAgMS0zIDNhMyAzIDAgMCAxLTMtM2EzIDMgMCAwIDEgMy0zIi8+PC9zdmc+');
    }
  .geocam-viewshot-button {
       background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTQgNWgzbDItMmg2bDIgMmgzYTIgMiAwIDAgMSAyIDJ2MTJhMiAyIDAgMCAxLTIgMkg0YTIgMiAwIDAgMS0yLTJWN2EyIDIgMCAwIDEgMi0ybTkuMDkgNC40NWwtMi4wNCAyLjczbDEuNTUgMi4wN2wtLjg3LjY2bC0yLjQ2LTMuMjdMNiAxNmgxMnoiLz48L3N2Zz4=');
    }
  `);
  const b = (a) => {
    if (w) {
      const n = {
        action: "screenshot",
        payload: {
          img: a,
          url: document.location.href
        }
      };
      w.postMessage(n);
    }
  }, p = async (a) => {
    const n = t.renderer.domElement;
    n.style.filter = "invert(1)";
    const o = await new Promise((e) => n.toBlob(e)), i = [new ClipboardItem({ [o.type]: o })];
    await navigator.clipboard.write(i), b(o), n.style.removeProperty("filter");
  }, u = async (a) => {
    document.body.style.filter = "invert(1)";
    const n = t.renderer.domElement, o = n.getBoundingClientRect(), i = s.container.getBoundingClientRect(), e = {
      top: Math.min(o.top, i.top),
      left: Math.min(o.left, i.left),
      bottom: Math.max(o.bottom, i.bottom),
      right: Math.max(o.right, i.right)
    };
    e.width = e.right - e.left, e.height = e.bottom - e.top;
    const l = document.createElement("canvas");
    l.width = e.width, l.height = e.height;
    const d = l.getContext("2d"), A = await s.takeScreenshot(), m = new Image();
    m.src = A.dataUrl, await new Promise((M) => {
      m.onload = M;
    }), o.witdh > i.width || o.height > i.height ? (d.drawImage(
      n,
      o.left - e.left,
      o.top - e.top
    ), d.drawImage(
      m,
      i.left - e.left,
      i.top - e.top
    )) : (d.drawImage(
      m,
      i.left - e.left,
      i.top - e.top
    ), d.drawImage(
      n,
      o.left - e.left,
      o.top - e.top
    ));
    const h = await new Promise((M) => l.toBlob(M)), D = [new ClipboardItem({ [h.type]: h })];
    await navigator.clipboard.write(D), b(h), document.body.style.removeProperty("filter");
  };
  this.init = function(a) {
    t = a, r = I("DIV", {
      class: "geocam-screenshot-button geocam-viewer-control-button",
      title: "Copy a screenshot of the current viewer image to the clipboard"
    }), t.addControl(r, "left-top"), r.addEventListener("click", p, !1);
    const n = g.channel;
    n && "BroadcastChannel" in window && (w = new BroadcastChannel(n), console.log("broadcasting on channel", n));
  }, this.arcgisView = function(a) {
    console.log("screen shot add view", a), s || (s = a, c = I("DIV", {
      class: "geocam-viewshot-button geocam-viewer-control-button",
      title: "Copy a screenshot of the current viewer image and map to the clipboard"
    }), t.addControl(c, "left-top", { after: r }), c.addEventListener("click", u, !1));
  }, this.destroy = function() {
    c && t.wrapper.removeChild(c), t.wrapper.removeChild(r);
  };
};
class v extends HTMLElement {
  constructor() {
    super(), this.plugin = null, console.log("screen-shot init");
  }
  connectedCallback() {
    console.log("screen-shot connected");
    const t = this.parentNode;
    t.viewer && t.viewer.plugin ? (this.plugin = new f({ channel: this.getAttribute("channel") }), t.viewer.plugin(this.plugin)) : console.error("GeocamViewerScreenShot must be a child of GeocamViewer");
  }
  disconnectedCallback() {
    this.plugin = null, console.log("screen-shot disconnected");
  }
}
window.customElements.define(
  "geocam-viewer-screen-shot",
  v
);
export {
  v as GeocamViewerScreenShot
};
