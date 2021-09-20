const {app, BrowserWindow, dialog, Menu, protocol, ipcMain, ipcRenderer, globalShortcut, Notification, remote, session} = require('electron');
const { autoUpdater } = require("electron-updater");
const glasstron = require('glasstron');
const electron = require('electron');
const os = require("os");
const path = require('path');
const url = require('url');
const log = require('electron-log');
const appV = app.getVersion();
autoUpdater.logger = log;
const { fork } = require('child_process')
const ps = fork(`${__dirname}/server.js`)
const { menubar } = require('menubar');

global.devMode = true;

const mb = menubar({
  browserWindow: {
    transparent: true,
    width: 395,
    resizable: false,
    webPreferences: {
      webviewTag: true,
      contextIsolation: false,
      nodeIntegration: true,
      devTools: global.devMode,
      nativeWindowOpen: true
    }
  },
  tooltip: 'Falix Software Quick Access',
  index: path.join('file://', __dirname, '../../tray.html'),
  icon: path.join(`${__dirname}../../../images/icons/app/256x256.png`)
});

mb.on('ready', () => {console.log('Tray is ready');});

electron.app.commandLine.appendSwitch("enable-transparent-visuals"); // For Linux, not required for Windows or macOS. If removed, please remove "--enable-transparent-visuals" from start command in package.json file.

var osvar = process.platform; // For OS Detections, also look at https://github.com/KorbsStudio/electron-titlebar-os-detection

if (osvar == 'darwin') { // macOS
  app.whenReady().then(() => {
    global.blur = "blurbehind";
    global.frame = false;
    global.titleBarStyle = 'hiddenInset'; // Use native titlebar buttons instead
})}
else if(osvar == 'win32'){ // Windows
  app.whenReady().then(() => {
    global.blur = "blurbehind";
    global.frame = false; // Use custom titlebar
    global.titleBarStyle = 'hidden';
})}
else{ //Linux
  app.whenReady().then(() => {
    global.blur = "blurbehind";
    global.frame = true; // Use native titlebar instead
    global.titleBarStyle = 'hidden';
    app.disableHardwareAcceleration
    app.commandLine.appendSwitch
})}

function createWindow() {
  const mainWindow = new glasstron.BrowserWindow({
    width: 1250,
    height: 800,
    minWidth: 430,
    minHeight: 520,
    frame: global.frame,
    transparent: true,
    show: false,
    autoHideMenuBar: true,
    titleBarStyle: global.titleBarStyle,
    blur: true,
    blurType: global.blur,
    nativeWindowOpen: true,
    webPreferences: {
      preload: path.join(__dirname, "../../js/electron/preload.js"),
      nodeIntegration: true,
      nodeIntegrationInSubFrames: true,
      webviewTag: true,
      devTools: global.devMode,
      enableRemoteModule: false,
      contextIsolation: false,
      nativeWindowOpen: true
    }
  })

  const splashWindow = new glasstron.BrowserWindow({
    frame: false,
    minimizable: false,
    maximizable: false,
    transparent: true,
    skipTaskbar: true,
    center: true,
    width: 382,
    height: 382,
    resizable: false,
    blur: true,
    blurType: global.blur,
    webPreferences: {
        devTools: global.devMode,
        nativeWindowOpen: true
    }
  })

  splashWindow.loadFile('src/html/splash/index.html')
  mainWindow.loadFile('src/index.html');

  ipcMain.on('minimize', () => {mainWindow.minimize()})
  ipcMain.on('maximize', () => {mainWindow.maximize()})
  ipcMain.on('restore', () => {mainWindow.restore()})
  ipcMain.on('close', () => {mainWindow.close()})
  ipcMain.on('openCP', () => {newCP()})
  ipcMain.on('openGP', () => {newGP()})
  ipcMain.on('updateChecker', () => {autoUpdater.checkForUpdates()})
  ipcMain.on('quit', () => {quitApp()})

  mainWindow.once('ready-to-show', () => {
    splashWindow.destroy();
    mainWindow.show();
  });

  // Auto Updater
  autoUpdater.on('update-available', (info) => {
    showNotification();
  })
  autoUpdater.on('error', (err) => {
    showNotificationFailed();
  })
  autoUpdater.checkForUpdates()

  function showNotification() {
    new Notification({ title: "Falix Software", body: 'A new updating is downloading in the background...' }).show()
  }
  function showNotificationFailed() {
    new Notification({ title: "Falix Software", body: 'Update failed to download.' }).show()
  }

  autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
    setTimeout(() => {
      const dialogOpts = {
        type: 'question',
        buttons: ['Restart Now', 'Later'],
        title: 'Falix Software Updater',
        message: process.platform === 'win32' ? releaseNotes : releaseName,
        detail: 'A new update is ready!'
      }
      dialog.showMessageBox(dialogOpts).then((returnValue) => {if (returnValue.response === 0) autoUpdater.quitAndInstall(false)})
    }, 4000)
  })

  // Extra information, mostly for debugging purposes
  console.log('OS Type: ' + os.type());
  console.log('OS Version: ' + os.release());
  console.log('OS Platform: ' + os.platform());
  console.log('Application Version: ' + appV)
  console.log('Electron Version: ' + process.versions.electron);
  console.log('Node Version: ' + process.versions.node);
  console.log('Chromium Version: ' + process.versions.chrome);
}

function newCP() {
  const newCP = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 400,
    minHeight: 320,
    frame: global.frame,
    transparent: true,
    autoHideMenuBar: true,
    titleBarStyle: global.titleBarStyle,
    webPreferences: {
      preload: path.join(__dirname, "../../js/electron/preload.js"),
      nodeIntegration: true,
      nodeIntegrationInSubFrames: true,
      webviewTag: true,
      devTools: global.devMode,
      contextIsolation: false,
      nativeWindowOpen: true
    }
  })
  newCP.loadFile('./src/html/new-window/client.html')
}

function newGP() {
  const newCP = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 400,
    minHeight: 320,
    frame: global.frame,
    transparent: true,
    autoHideMenuBar: true,
    titleBarStyle: global.titleBarStyle,
    webPreferences: {
      preload: path.join(__dirname, "../../js/electron/preload.js"),
      nodeIntegration: true,
      nodeIntegrationInSubFrames: true,
      webviewTag: true,
      devTools: global.devMode,
      contextIsolation: false,
      nativeWindowOpen: true
    }
  })
  newCP.loadFile('./src/html/new-window/panel.html')
}

function quitApp() {
  dialog.showMessageBox({
    title: 'Falix Software',
    message: 'Trying to quit?',
    detail: 'Press Ctrl + Q to quit the app entirely.',
  }).then(box => {
    console.log('Button Clicked Index - ', box.response);
    }).catch(err => {
    console.log(err)
  })
}

app.whenReady().then(() => {setTimeout(() => {createWindow()}, 1200)})