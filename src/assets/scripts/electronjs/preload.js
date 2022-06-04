const { contextBridge, ipcRenderer} = require("electron");
contextBridge.exposeInMainWorld( "api", { send: (channel, data) => {let validChannels = [
"sftpOpen",
"sftpClose",
"logout",
"relaunch",
"enableVPN",
"disableVPN",
"loginVPN",
"ukVPN",
"usVPN",
"deVPN",
"auVPN"
]; if (validChannels.includes(channel)) {ipcRenderer.send(channel, data);}}});
delete process.env.ELECTRON_ENABLE_SECURITY_WARNINGS;
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = true;