(function(t,n){typeof exports=="object"&&typeof module<"u"?n(exports):typeof define=="function"&&define.amd?define(["exports"],n):(t=typeof globalThis<"u"?globalThis:t||self,n(t.screenShot={}))})(this,function(t){"use strict";const n=(i,e={},o="")=>{const c=document.createElement(i);for(let s in e)c.setAttribute(s,e[s]);return c.innerHTML=o,c},a=(i,e)=>(document.getElementById(i)||document.getElementsByTagName("head")[0].prepend(n("STYLE",{type:"text/css"},e)),!0),d=function(i={}){let e,o;a("geocam-screenshot-button",`
  .geocam-screenshot-button {
       background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxnIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMS41Ij48cGF0aCBkPSJNMTAgMjEuNHYtNy4wMDZhLjYuNiAwIDAgMSAuNi0uNmgxLjE3M2EuNi42IDAgMCAwIC41MDQtLjI3NWwxLjQ0Ni0yLjI0NGEuNi42IDAgMCAxIC41MDQtLjI3NWgzLjU0NmEuNi42IDAgMCAxIC41MDQuMjc1bDEuNDQ2IDIuMjQ0YS42LjYgMCAwIDAgLjUwNC4yNzVIMjEuNGEuNi42IDAgMCAxIC42LjZWMjEuNGEuNi42IDAgMCAxLS42LjZIMTAuNmEuNi42IDAgMCAxLS42LS42Ii8+PHBhdGggZD0iTTE2IDE5YTIgMiAwIDEgMCAwLTRhMiAyIDAgMCAwIDAgNE0zIDE4djNoMi41TTMgOS41djVNMyA2VjNoM20zLjUgMGg1TTE4IDNoM3YyLjVtMCA0LjVWOC41Ii8+PC9nPjwvc3ZnPg==');
    }
  `);const s=async l=>{const g=e.renderer.domElement,u=await new Promise(I=>g.toBlob(I)),m=[new ClipboardItem({[u.type]:u})];await navigator.clipboard.write(m)};this.init=function(l){e=l,o=n("DIV",{class:"geocam-screenshot-button geocam-viewer-control-button",title:"Copy current view to the clipboard"}),e.addControl(o,"left-top"),o.addEventListener("click",s,!1)},this.destroy=function(){e.wrapper.removeChild(o)}};class r extends HTMLElement{constructor(){super(),this.plugin=null,console.log("screen-shot init")}connectedCallback(){console.log("screen-shot connected");const e=this.parentNode;e.viewer&&e.viewer.plugin?(this.plugin=new d,e.viewer.plugin(this.plugin)):console.error("GeocamViewerScreenShot must be a child of GeocamViewer")}disconnectedCallback(){this.plugin=null,console.log("screen-shot disconnected")}}window.customElements.define("geocam-viewer-screen-shot",r),t.GeocamViewerScreenShot=r,Object.defineProperty(t,Symbol.toStringTag,{value:"Module"})});