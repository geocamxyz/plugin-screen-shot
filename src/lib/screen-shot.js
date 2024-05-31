const node = (name, attrs = {}, content = "") => {
  const node = document.createElement(name);
  for (let i in attrs) {
    node.setAttribute(i, attrs[i]);
  }
  node.innerHTML = content;
  return node;
};

const injectStyle = (id, rules) => {
  if (!document.getElementById(id)) {
    document
      .getElementsByTagName("head")[0]
      .prepend(node("STYLE", { type: "text/css" }, rules));
  }
  return true;
};

export const screenShot = function (config = {}) {
  let viewer, shotBtn, viewShotBtn, arcgisView;

  const STYLES = `
  .geocam-screenshot-button {
       background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTQgNGgzbDItMmg2bDIgMmgzYTIgMiAwIDAgMSAyIDJ2MTJhMiAyIDAgMCAxLTIgMkg0YTIgMiAwIDAgMS0yLTJWNmEyIDIgMCAwIDEgMi0ybTggM2E1IDUgMCAwIDAtNSA1YTUgNSAwIDAgMCA1IDVhNSA1IDAgMCAwIDUtNWE1IDUgMCAwIDAtNS01bTAgMmEzIDMgMCAwIDEgMyAzYTMgMyAwIDAgMS0zIDNhMyAzIDAgMCAxLTMtM2EzIDMgMCAwIDEgMy0zIi8+PC9zdmc+');
    }
  .geocam-viewshot-button {
       background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTQgNWgzbDItMmg2bDIgMmgzYTIgMiAwIDAgMSAyIDJ2MTJhMiAyIDAgMCAxLTIgMkg0YTIgMiAwIDAgMS0yLTJWN2EyIDIgMCAwIDEgMi0ybTkuMDkgNC40NWwtMi4wNCAyLjczbDEuNTUgMi4wN2wtLjg3LjY2bC0yLjQ2LTMuMjdMNiAxNmgxMnoiLz48L3N2Zz4=');
    }
  `;

  injectStyle("geocam-screenshot-button", STYLES);

  const flash = (el) => {
    if (el) {
      el.style.filter = "invert(1)";
      setTimeout(() => {
        el.style.removeProperty("filter");
      }, 100);
    }
  };

  const copyPanoToClipboard = async (e) => {
    const canvas = viewer.renderer.domElement;
    canvas.style.filter = "invert(1)";
    const blob = await new Promise((resolve) => canvas.toBlob(resolve));
    // Create ClipboardItem with blob and it's type, and add to an array
    const data = [new ClipboardItem({ [blob.type]: blob })];
    // Write the data to the clipboard
    await navigator.clipboard.write(data);
    canvas.style.removeProperty("filter");
  };

  const copyViewToClipboard = async (e) => {
    document.body.style.filter = "invert(1)";
    const canvas = viewer.renderer.domElement;
    // get coords of both items
    const viewerRect = canvas.getBoundingClientRect();
    const arcgisRect = arcgisView.container.getBoundingClientRect();
    const bounds = {
      top: Math.min(viewerRect.top, arcgisRect.top),
      left: Math.min(viewerRect.left, arcgisRect.left),
      bottom: Math.max(viewerRect.bottom, arcgisRect.bottom),
      right: Math.max(viewerRect.right, arcgisRect.right),
    };
    bounds.width = bounds.right - bounds.left;
    bounds.height = bounds.bottom - bounds.top;
    // create a canvas to combine the two images
    const combinedCanvas = document.createElement("canvas");
    combinedCanvas.width = bounds.width;
    combinedCanvas.height = bounds.height;
    const ctx = combinedCanvas.getContext("2d");

    // draw the arcgis image
    const viewShot = await arcgisView.takeScreenshot();
    const img = new Image();
    img.src = viewShot.dataUrl;
    await new Promise((resolve) => {
      img.onload = resolve;
    });
    // draw the viewer image
    if (
      viewerRect.witdh > arcgisRect.width ||
      viewerRect.height > arcgisRect.height
      // the smaller image is likely to be sitting on top so draw bigger one first
    ) {
      ctx.drawImage(
        canvas,
        viewerRect.left - bounds.left,
        viewerRect.top - bounds.top
      );
      ctx.drawImage(
        img,
        arcgisRect.left - bounds.left,
        arcgisRect.top - bounds.top
      );
    } else {
      ctx.drawImage(
        img,
        arcgisRect.left - bounds.left,
        arcgisRect.top - bounds.top
      );
      ctx.drawImage(
        canvas,
        viewerRect.left - bounds.left,
        viewerRect.top - bounds.top
      );
    }
    const blob = await new Promise((resolve) => combinedCanvas.toBlob(resolve));
    // Create ClipboardItem with blob and it's type, and add to an array
    const data = [new ClipboardItem({ [blob.type]: blob })];
    // Write the data to the clipboard
    await navigator.clipboard.write(data);
    document.body.style.removeProperty("filter");
  };

  this.init = function (geocamViewer) {
    viewer = geocamViewer;
    shotBtn = node("DIV", {
      class: "geocam-screenshot-button geocam-viewer-control-button",
      title: "Copy a screenshot of the current viewer image to the clipboard",
    });
    viewer.addControl(shotBtn, "left-top");
    shotBtn.addEventListener("click", copyPanoToClipboard, false);
  };

  this.arcgisView = function (view) {
    console.log("screen shot add view", view);
    if (!arcgisView) {
      arcgisView = view;
      viewShotBtn = node("DIV", {
        class: "geocam-viewshot-button geocam-viewer-control-button",
        title:
          "Copy a screenshot of the current viewer image and map to the clipboard",
      });
      viewer.addControl(viewShotBtn, "left-top", { after: shotBtn });
      viewShotBtn.addEventListener("click", copyViewToClipboard, false);
    }
  };

  this.destroy = function () {
    if (viewShotBtn) viewer.wrapper.removeChild(viewShotBtn);
    viewer.wrapper.removeChild(shotBtn);
  };
};
