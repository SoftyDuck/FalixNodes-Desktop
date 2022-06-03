const { app, BrowserWindow, dialog, ipcMain, ipcRenderer, nativeTheme, protocol, powerMonitor, session } = require('electron')
const { exec} = require('child_process');
const glasstron = require('glasstron');
const path = require('path');

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
    
    ipcMain.on('enableVPN', () => {
      console.log('enableVPN')
      execute('nordvpn connect')
    })
    ipcMain.on('disableVPN', () => {
      console.log('disableVPN')
      execute('nordvpn disconnect')
    })

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
}

function relaunch() {
  app.relaunch
  console.log('RESTARTING')
}
app.on('ready', createMainWindow);