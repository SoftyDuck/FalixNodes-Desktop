const remote = require('electron').remote;
const mainWindow = remote.getCurrentWindow();

window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})

setTimeout(function(){
    document.getElementById("version").innerHTML = process.env.npm_package_version;
    document.getElementById("electron-version").innerHTML = process.versions.electron;
    document.getElementById("electron-p-version").innerHTML = process.versions.electron;
    document.getElementById("node-version").innerHTML = process.versions.node;
    document.getElementById("chrome-version").innerHTML = process.versions.chrome;
}, 2500);

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
console.log('%c Note from Developer of Falix Software: About the "The remote module is deprecated." error. The remote module used in Falix Software is deprecated by Electron, although it will continue to function but will leave a warning. This remote feature will be removed by Electron in the future. Learn more here: https://www.electronjs.org/docs/breaking-changes', 'background: #222; color: #bada55')
console.log('%c Note from Developer of Falix Software: About "Update failed to download." notification. The update feature in Falix Software does not work while in developer mode, aka "npm start". The update feature will work just fine in production mode. So this is nothing to worry about.', 'background: #222; color: #bada55')