const { app, BrowserWindow, dialog, ipcMain, ipcRenderer, nativeTheme, protocol, powerMonitor, session, webContents } = require('electron')
const { exec} = require('child_process');
const glasstron = require('glasstron');
const log = require('electron-log')
const path = require('path');
var commandExistsSync = require('command-exists').sync;

function execute(command) {
  exec(command);
};

const createMainWindow = () => {
    primaryWindow = new glasstron.BrowserWindow({
      width: 1200,
      height: 800,
      minHeight: 590,
      minWidth: 720,
      autoHideMenuBar: true,
      frame: true,
      titleBarStyle: 'hidden',
      titleBarOverlay: {
        color: '#121212',
        symbolColor: 'white'
      },
      blur: true,
      blurType: 'blurbehind',
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        webviewTag: true,
        contextIsolation: true,
        nodeIntegration: false,
      }
    })
    primaryWindow.loadFile('src/index.html')
    ipcMain.on('logout', () => {(logout())})
    ipcMain.on('relaunch', () => {(relaunch())})

    // NordVPN - Linux ONLY
    ipcMain.on('loginVPN', () => {
      exec("sh src/assets/scripts/shell/linux/mullvad/login.sh");
      primaryWindow.webContents.executeJavaScript('document.querySelector(".sContainer#MULLVAD-FAILED").style.display = "none";')
    })
    
    ipcMain.on('enableVPN', () => {
      console.log('enableVPN')
      exec("sh src/assets/scripts/shell/linux/mullvad/connect.sh");
    })

    ipcMain.on('disableVPN', () => {
      console.log('disableVPN')
      exec("sh src/assets/scripts/shell/linux/mullvad/disconnect.sh");
    })

    ipcMain.on('ukVPN', () => {exec("sh src/assets/scripts/shell/linux/mullvad/connect/uk.sh");})
    ipcMain.on('usVPN', () => {exec("sh src/assets/scripts/shell/linux/mullvad/connect/us.sh");})
    ipcMain.on('deVPN', () => {exec("sh src/assets/scripts/shell/linux/mullvad/connect/de.sh");})
    ipcMain.on('auVPN', () => {exec("sh src/assets/scripts/shell/linux/mullvad/connect/au.sh");})

    if (nativeTheme.shouldUseDarkColors) {
      console.log('Yes')
    } else {
      console.log('No')
    }

    if (__dirname.includes('\\WindowsApps\\')) {
      console.log('The built-in auto updater is not supported on Microsoft Store, please use the Microsoft Store to update FalixNodes Desktop.');
    }
    else {
      // global.update = autoUpdater.checkForUpdates();
    }
    const ses = primaryWindow.webContents.session
    function logout() {ses.clearCache(); console.log('LOGGING OUT');}
    if (commandExistsSync('mullvad')) {
    } else {
      setTimeout(() => {
        console.log('Mullvad was not detected.')
        primaryWindow.webContents.executeJavaScript('document.querySelector(".sContainer#MULLVAD-NOT-FOUND").style.display = "grid"; document.querySelector(".sContainer#mullvad-install").style.display = "inherit"; document.querySelector("vpn .vpn-connection").style.backgroundColor = "rgb(255 0 0 / 30%)";  document.querySelector("vpn .vpn-connection").style.boxShadow = "0px 0px 0px 20px rgb(255 0 0 / 10%)"')
      }, 10000); // Element doesn't load instantly
    }
}

function relaunch() {
  app.relaunch
  console.log('RESTARTING')
}
app.on('ready', createMainWindow);