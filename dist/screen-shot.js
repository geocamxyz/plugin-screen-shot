const b = (g, n = {}, r = "") => {
  const a = document.createElement(g);
  for (let l in n)
    a.setAttribute(l, n[l]);
  return a.innerHTML = r, a;
}, v = (g, n) => (document.getElementById(g) || document.getElementsByTagName("head")[0].prepend(b("STYLE", { type: "text/css" }, n)), !0), C = function(g = {}) {
  let n, r, a, l, I, m;
  v("geocam-screenshot-button", `
  .geocam-screenshot-button {
       background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTQgNGgzbDItMmg2bDIgMmgzYTIgMiAwIDAgMSAyIDJ2MTJhMiAyIDAgMCAxLTIgMkg0YTIgMiAwIDAgMS0yLTJWNmEyIDIgMCAwIDEgMi0ybTggM2E1IDUgMCAwIDAtNSA1YTUgNSAwIDAgMCA1IDVhNSA1IDAgMCAwIDUtNWE1IDUgMCAwIDAtNS01bTAgMmEzIDMgMCAwIDEgMyAzYTMgMyAwIDAgMS0zIDNhMyAzIDAgMCAxLTMtM2EzIDMgMCAwIDEgMy0zIi8+PC9zdmc+');
    }
  .geocam-viewshot-button {
       background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTQgNWgzbDItMmg2bDIgMmgzYTIgMiAwIDAgMSAyIDJ2MTJhMiAyIDAgMCAxLTIgMkg0YTIgMiAwIDAgMS0yLTJWN2EyIDIgMCAwIDEgMi0ybTkuMDkgNC40NWwtMi4wNCAyLjczbDEuNTUgMi4wN2wtLjg3LjY2bC0yLjQ2LTMuMjdMNiAxNmgxMnoiLz48L3N2Zz4=');
    }
  `);
  const u = (c) => {
    if (I) {
      const o = {
        action: "screenshot",
        payload: {
          img: c,
          url: document.location.href
        }
      };
      I.postMessage(o);
    }
  }, p = function(c, o, e) {
    return new Promise((i) => {
      const t = new Image();
      t.onload = function() {
        const s = document.createElement("canvas"), d = s.getContext("2d");
        s.width = Math.min(o, t.width), s.height = o * t.height / t.width, d.drawImage(t, 0, 0, s.width, s.height), s.toBlob(i, c.type, e);
      }, t.src = URL.createObjectURL(c);
    });
  }, A = async (c) => {
    const o = n.renderer.domElement;
    o.style.filter = "invert(1)";
    let e = await new Promise((t) => o.toBlob(t));
    m && (e = await p(e, m, 0.9));
    const i = [new ClipboardItem({ [e.type]: e })];
    await navigator.clipboard.write(i), u(e), o.style.removeProperty("filter");
  }, y = async (c) => {
    document.body.style.filter = "invert(1)";
    const o = n.renderer.domElement, e = o.getBoundingClientRect(), i = l.container.getBoundingClientRect(), t = {
      top: Math.min(e.top, i.top),
      left: Math.min(e.left, i.left),
      bottom: Math.max(e.bottom, i.bottom),
      right: Math.max(e.right, i.right)
    };
    t.width = t.right - t.left, t.height = t.bottom - t.top;
    const s = document.createElement("canvas");
    s.width = t.width, s.height = t.height;
    const d = s.getContext("2d"), D = await l.takeScreenshot(), w = new Image();
    w.src = D.dataUrl, await new Promise((M) => {
      w.onload = M;
    }), e.witdh > i.width || e.height > i.height ? (d.drawImage(
      o,
      e.left - t.left,
      e.top - t.top
    ), d.drawImage(
      w,
      i.left - t.left,
      i.top - t.top
    )) : (d.drawImage(
      w,
      i.left - t.left,
      i.top - t.top
    ), d.drawImage(
      o,
      e.left - t.left,
      e.top - t.top
    ));
    let h = await new Promise((M) => s.toBlob(M));
    m && (h = await p(h, m, 0.9));
    const f = [new ClipboardItem({ [h.type]: h })];
    await navigator.clipboard.write(f), u(h), document.body.style.removeProperty("filter");
  };
  this.init = function(c) {
    n = c, r = b("DIV", {
      class: "geocam-screenshot-button geocam-viewer-control-button",
      title: "Copy a screenshot of the current viewer image to the clipboard"
    }), n.addControl(r, "left-top"), r.addEventListener("click", A, !1);
    const o = g.channel;
    o && "BroadcastChannel" in window && (I = new BroadcastChannel(o), console.log("broadcasting on channel", o)), m = parseInt(g.maxWidth);
  }, this.arcgisView = function(c) {
    console.log("screen shot add view", c), l || (l = c, a = b("DIV", {
      class: "geocam-viewshot-button geocam-viewer-control-button",
      title: "Copy a screenshot of the current viewer image and map to the clipboard"
    }), n.addControl(a, "left-top", { after: r }), a.addEventListener("click", y, !1));
  }, this.destroy = function() {
    a && n.wrapper.removeChild(a), n.wrapper.removeChild(r);
  };
};
class T extends HTMLElement {
  constructor() {
    super(), this.plugin = null, console.log("screen-shot init");
  }
  connectedCallback() {
    console.log("screen-shot connected");
    const n = this.closest("geocam-viewer");
    if (!n) {
      console.error("GeocamViewerScreenShot must be a child of GeocamViewer");
      return;
    }
    const r = () => {
      const a = n.viewer;
      a && typeof a.plugin == "function" ? (this.plugin = new C({
        channel: this.getAttribute("channel"),
        maxWidth: this.getAttribute("max-width")
      }), a.plugin(this.plugin)) : setTimeout(r, 50);
    };
    r();
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
