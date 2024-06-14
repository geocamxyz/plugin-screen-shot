const b = (s, o = {}, g = "") => {
  const r = document.createElement(s);
  for (let l in o)
    r.setAttribute(l, o[l]);
  return r.innerHTML = g, r;
}, v = (s, o) => (document.getElementById(s) || document.getElementsByTagName("head")[0].prepend(b("STYLE", { type: "text/css" }, o)), !0), C = function(s = {}) {
  let o, g, r, l, I, m;
  v("geocam-screenshot-button", `
  .geocam-screenshot-button {
       background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTQgNGgzbDItMmg2bDIgMmgzYTIgMiAwIDAgMSAyIDJ2MTJhMiAyIDAgMCAxLTIgMkg0YTIgMiAwIDAgMS0yLTJWNmEyIDIgMCAwIDEgMi0ybTggM2E1IDUgMCAwIDAtNSA1YTUgNSAwIDAgMCA1IDVhNSA1IDAgMCAwIDUtNWE1IDUgMCAwIDAtNS01bTAgMmEzIDMgMCAwIDEgMyAzYTMgMyAwIDAgMS0zIDNhMyAzIDAgMCAxLTMtM2EzIDMgMCAwIDEgMy0zIi8+PC9zdmc+');
    }
  .geocam-viewshot-button {
       background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTQgNWgzbDItMmg2bDIgMmgzYTIgMiAwIDAgMSAyIDJ2MTJhMiAyIDAgMCAxLTIgMkg0YTIgMiAwIDAgMS0yLTJWN2EyIDIgMCAwIDEgMi0ybTkuMDkgNC40NWwtMi4wNCAyLjczbDEuNTUgMi4wN2wtLjg3LjY2bC0yLjQ2LTMuMjdMNiAxNmgxMnoiLz48L3N2Zz4=');
    }
  `);
  const p = (a) => {
    if (I) {
      const n = {
        action: "screenshot",
        payload: {
          img: a,
          url: document.location.href
        }
      };
      I.postMessage(n);
    }
  }, u = function(a, n, t) {
    return new Promise((i) => {
      const e = new Image();
      e.onload = function() {
        const c = document.createElement("canvas"), d = c.getContext("2d");
        c.width = Math.min(n, e.width), c.height = n * e.height / e.width, d.drawImage(e, 0, 0, c.width, c.height), c.toBlob(i, a.type, t);
      }, e.src = URL.createObjectURL(a);
    });
  }, A = async (a) => {
    const n = o.renderer.domElement;
    n.style.filter = "invert(1)";
    let t = await new Promise((e) => n.toBlob(e));
    m && (t = await u(t, m, 0.9));
    const i = [new ClipboardItem({ [t.type]: t })];
    await navigator.clipboard.write(i), p(t), n.style.removeProperty("filter");
  }, y = async (a) => {
    document.body.style.filter = "invert(1)";
    const n = o.renderer.domElement, t = n.getBoundingClientRect(), i = l.container.getBoundingClientRect(), e = {
      top: Math.min(t.top, i.top),
      left: Math.min(t.left, i.left),
      bottom: Math.max(t.bottom, i.bottom),
      right: Math.max(t.right, i.right)
    };
    e.width = e.right - e.left, e.height = e.bottom - e.top;
    const c = document.createElement("canvas");
    c.width = e.width, c.height = e.height;
    const d = c.getContext("2d"), D = await l.takeScreenshot(), w = new Image();
    w.src = D.dataUrl, await new Promise((M) => {
      w.onload = M;
    }), t.witdh > i.width || t.height > i.height ? (d.drawImage(
      n,
      t.left - e.left,
      t.top - e.top
    ), d.drawImage(
      w,
      i.left - e.left,
      i.top - e.top
    )) : (d.drawImage(
      w,
      i.left - e.left,
      i.top - e.top
    ), d.drawImage(
      n,
      t.left - e.left,
      t.top - e.top
    ));
    let h = await new Promise((M) => c.toBlob(M));
    m && (h = await u(h, m, 0.9));
    const f = [new ClipboardItem({ [h.type]: h })];
    await navigator.clipboard.write(f), p(h), document.body.style.removeProperty("filter");
  };
  this.init = function(a) {
    o = a, g = b("DIV", {
      class: "geocam-screenshot-button geocam-viewer-control-button",
      title: "Copy a screenshot of the current viewer image to the clipboard"
    }), o.addControl(g, "left-top"), g.addEventListener("click", A, !1);
    const n = s.channel;
    n && "BroadcastChannel" in window && (I = new BroadcastChannel(n), console.log("broadcasting on channel", n)), m = parseInt(s.maxWidth);
  }, this.arcgisView = function(a) {
    console.log("screen shot add view", a), l || (l = a, r = b("DIV", {
      class: "geocam-viewshot-button geocam-viewer-control-button",
      title: "Copy a screenshot of the current viewer image and map to the clipboard"
    }), o.addControl(r, "left-top", { after: g }), r.addEventListener("click", y, !1));
  }, this.destroy = function() {
    r && o.wrapper.removeChild(r), o.wrapper.removeChild(g);
  };
};
class T extends HTMLElement {
  constructor() {
    super(), this.plugin = null, console.log("screen-shot init");
  }
  connectedCallback() {
    console.log("screen-shot connected");
    const o = this.parentNode;
    o.viewer && o.viewer.plugin ? (this.plugin = new C({ channel: this.getAttribute("channel"), maxWidth: this.getAttribute("max-width") }), o.viewer.plugin(this.plugin)) : console.error("GeocamViewerScreenShot must be a child of GeocamViewer");
  }
  disconnectedCallback() {
    this.plugin = null, console.log("screen-shot disconnected");
  }
}
window.customElements.define(
  "geocam-viewer-screen-shot",
  T
);
export {
  T as GeocamViewerScreenShot
};
