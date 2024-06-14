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
    const node = this;
    const parent = this.parentNode;
    if (parent.viewer && parent.viewer.plugin) {
      // Call a method on the parent
      this.plugin = new screenShot({channel: this.getAttribute("channel"), maxWidth: this.getAttribute("max-width")});
      parent.viewer.plugin(this.plugin);
    } else {
      console.error("GeocamViewerScreenShot must be a child of GeocamViewer");
    }
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
