const { contextBridge, ipcRenderer} = require("electron");

contextBridge.exposeInMainWorld( "api", { send: (channel, data) => {let validChannels = [
  "launch",
  "minimize",
  "maximize",
  "restore",
  "close",
  "update",
  "open-update-dialog",
  "open-failed-dialog",
  "open-sample-dialog",
  "blurToggleOff",
  "blurToggleOn",
  "btBH",
  "btTP",
  "btAY",
  "btVB",
  "open-glasstron-api-demo"
]; if (validChannels.includes(channel)) {ipcRenderer.send(channel, data);}}});

delete process.env.ELECTRON_ENABLE_SECURITY_WARNINGS;
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = true;