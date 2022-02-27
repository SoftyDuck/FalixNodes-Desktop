const { contextBridge, ipcRenderer} = require("electron");
const { Titlebar, Color } = require('custom-electron-titlebar');
const path = require('path');

let titlebar;

window.addEventListener('DOMContentLoaded', () => {
  titlebar = new Titlebar({
    backgroundColor: Color.fromHex("#388e3c"),
    itemBackgroundColor: Color.fromHex("#121212"),
    svgColor: Color.WHITE,
    icon: path.join(__dirname, '/assets/images', '/icon.svg'),
    //menu: null // = do not automatically use Menu.applicationMenu
  })
})

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
  "open-release-notes"
]; if (validChannels.includes(channel)) {ipcRenderer.send(channel, data);}}});

delete process.env.ELECTRON_ENABLE_SECURITY_WARNINGS;
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = true;