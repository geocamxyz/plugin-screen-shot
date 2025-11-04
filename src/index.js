import { screenShot } from "./lib/screen-shot.js";

export class GeocamViewerScreenShot extends HTMLElement {
  constructor() {
    super();
    this.plugin = null;
    // this.yaw = this.getAttribute('yaw') || 0;
    console.log("screen-shot init");
  }

  connectedCallback() {
    console.log("screen-shot connected");
    const host = this.closest("geocam-viewer");
    if (!host) {
      console.error("GeocamViewerScreenShot must be a child of GeocamViewer");
      return;
    }

    const attach = () => {
      const viewer = host.viewer;
      if (viewer && typeof viewer.plugin === "function") {
        this.plugin = new screenShot({
          channel: this.getAttribute("channel"),
          maxWidth: this.getAttribute("max-width"),
        });
        viewer.plugin(this.plugin);
      } else {
        setTimeout(attach, 50);
      }
    };

    attach();
  }

  disconnectedCallback() {
    this.plugin = null;
    console.log("screen-shot disconnected");
    // Clean up the viewer
  }
}

window.customElements.define(
  "geocam-viewer-screen-shot",
  GeocamViewerScreenShot
);
