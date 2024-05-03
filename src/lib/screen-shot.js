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
  let viewer, shotBtn;

  const STYLES = `
  .geocam-screenshot-button {
       background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxnIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMS41Ij48cGF0aCBkPSJNMTAgMjEuNHYtNy4wMDZhLjYuNiAwIDAgMSAuNi0uNmgxLjE3M2EuNi42IDAgMCAwIC41MDQtLjI3NWwxLjQ0Ni0yLjI0NGEuNi42IDAgMCAxIC41MDQtLjI3NWgzLjU0NmEuNi42IDAgMCAxIC41MDQuMjc1bDEuNDQ2IDIuMjQ0YS42LjYgMCAwIDAgLjUwNC4yNzVIMjEuNGEuNi42IDAgMCAxIC42LjZWMjEuNGEuNi42IDAgMCAxLS42LjZIMTAuNmEuNi42IDAgMCAxLS42LS42Ii8+PHBhdGggZD0iTTE2IDE5YTIgMiAwIDEgMCAwLTRhMiAyIDAgMCAwIDAgNE0zIDE4djNoMi41TTMgOS41djVNMyA2VjNoM20zLjUgMGg1TTE4IDNoM3YyLjVtMCA0LjVWOC41Ii8+PC9nPjwvc3ZnPg==');
    }
  `;

  injectStyle("geocam-screenshot-button", STYLES);

  const copyViewToClipboard = async (e) => {
    const canvas = viewer.renderer.domElement;
    const blob = await new Promise(resolve => canvas.toBlob(resolve));
    // Create ClipboardItem with blob and it's type, and add to an array
    const data = [new ClipboardItem({ [blob.type]: blob })];
    // Write the data to the clipboard
    await navigator.clipboard.write(data);
  };

  this.init = function (geocamViewer) {
    viewer = geocamViewer;
    shotBtn = node("DIV", {
      class: "geocam-screenshot-button geocam-viewer-control-button",
      title: "Copy current view to the clipboard",
    });
    viewer.addControl(shotBtn, "left-top");
    shotBtn.addEventListener("click", copyViewToClipboard, false);
  };

  this.destroy = function () {
    viewer.wrapper.removeChild(shotBtn);
  };
};
