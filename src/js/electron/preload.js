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
  "open-glasstron-api-demo",
  "display_file_properties",
  "change_local_dir",
  "get_cur_local_dir",
  "get_cur_remote_dir",
  "get_remote_dir_list",
  "download_remote_files",
  "upload_local_files",
  "copy_local_files",
  "cut_local_files",
  "copy_remote_files",
  "cut_remote_files",
  "paste_local_files",
  "paste_remote_files",
  "make_local_dir",
  "make_remote_dir",
  "openSFTP"
]; if (validChannels.includes(channel)) {ipcRenderer.send(channel, data);}}});

delete process.env.ELECTRON_ENABLE_SECURITY_WARNINGS;
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = true;