const remote = require('electron').remote;
const mainWindow = remote.getCurrentWindow();
window.addEventListener("DOMContentLoaded", () => {handleWindowControls();});
window.onbeforeunload = (event) => {mainWindow.removeAllListeners();}
function handleWindowControls() {
    document.getElementById('min-button').addEventListener("click", event => {mainWindow.minimize();});
    document.getElementById('max-button').addEventListener("click", event => {mainWindow.maximize();});
    document.getElementById('restore-button').addEventListener("click", event => {mainWindow.unmaximize();});
    document.getElementById('close-button').addEventListener("click", event => {mainWindow.close();});
}
delete process.env.ELECTRON_ENABLE_SECURITY_WARNINGS;
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = true;