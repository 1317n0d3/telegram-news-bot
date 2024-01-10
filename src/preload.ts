// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("api", {
  // sendMessage: () => {
  //   ipcRenderer.send("send-message");
  // },
  getChat: () => {
    return ipcRenderer.invoke("get-chat");
  },
});

window.addEventListener("DOMContentLoaded", () => {
  ipcRenderer.send("main-window-ready");
});
