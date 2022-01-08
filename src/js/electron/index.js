const {app, BrowserView, BrowserWindow, contextBridge, protocol, ipcMain, ipcRenderer, globalShortcut, Notification, session, shell, webContents} = require('electron')
const contextMenu = require('electron-context-menu')
const { autoUpdater } = require("electron-updater")
const glasstron = require('glasstron')
const electron = require('electron')
const log = require('electron-log')
const path = require('path')
const url = require('url')
const os = require("os")

autoUpdater.logger = log
let mainWindow;
let dialogUpdateAvailable;

global.devMode = false
if (process.platform == 'darwin') {
    app.whenReady().then(() => {
      global.blur = "vibrancy"
      global.frame = false
      global.titleBarStyle = 'hiddenInset'
    }
  )
}
  else if(process.platform == 'win32'){
    app.whenReady().then(() => {
      global.blur = "acrylic"
      global.frame = false
    }
  )
}
  else{ 
    app.whenReady().then(() => {
      global.blur = "blurbehind"
      global.frame = true
    }
  )
}

function createWindow() {
  const mainWindow = new glasstron.BrowserWindow({
    width: 1250,
    height: 800,
    minWidth: 430,
    minHeight: 520,
    frame: global.frame,
    show: false,
    autoHideMenuBar: true,
    titleBarStyle: global.titleBarStyle,
    trafficLightPosition: {
      x: 20,
      y: 13,
    },
    blur: true,
    blurType: global.blur,
    webPreferences: {
      preload: path.join(__dirname, "../../js/electron/preload.js"),
      webviewTag: true,
      devTools: global.devMode
    }
  })

  const splashWindow = new glasstron.BrowserWindow({
    frame: false,
    minimizable: false,
    maximizable: false,
    skipTaskbar: true,
    center: true,
    width: 700,
    height: 184,
    resizable: true,
    blur: true,
    blurType: global.blur,
    webPreferences: {
      preload: path.join(__dirname, "../../js/electron/preload.js"),
      devTools: global.devMode
    }
  })

  mainWindow.loadFile('src/index.html')
  splashWindow.loadFile('src/html/splash/index.html')

  ipcMain.on('minimize',  () => {mainWindow.minimize()})
  ipcMain.on('maximize',  () => {mainWindow.maximize()})
  ipcMain.on('restore',   () => {mainWindow.restore()})
  ipcMain.on('close',     () => {mainWindow.close()})
  
  ipcMain.on("blurToggleOn", async (e, value) => {if(mainWindow !== null){e.sender.send("blurStatus", await mainWindow.setBlur(true))}});
  ipcMain.on("blurToggleOff", async (e, value) => {if(mainWindow !== null){e.sender.send("blurStatus", await mainWindow.setBlur(false))}});

  ipcMain.on("btBH", () => {mainWindow.blurType = 'blurbehind';});
  ipcMain.on("btTP", () => {mainWindow.blurType = 'transparent';});
  ipcMain.on("btAY", () => {mainWindow.blurType = 'acrylic';});
  ipcMain.on("btVB", () => {mainWindow.blurType = 'vibrancy';});
  
  ipcMain.on('open-sample-dialog',      () => {(newDialogSample())})
  ipcMain.on('open-update-dialog',      () => {(newDialogUpdateAvailable())})
  ipcMain.on('open-failed-dialog',      () => {(newDialogUpdateFailed())})

  ipcMain.on('open-glasstron-api-demo', () => {(glasstronAPIDemo())})

  ipcMain.on('launch', () => {splashWindow.close(); mainWindow.show()})

  autoUpdater.on('update-available', (info) => {mainWindow.webContents.insertCSS('button#up_downloading {display: inherit !important;}')})
  autoUpdater.on('error', (err) => {mainWindow.webContents.insertCSS('button#up_failed {display: inherit !important;}')})
  autoUpdater.checkForUpdates()
  autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
    setTimeout(() => {
      newDialogUpdateAvailable();
      mainWindow.webContents.insertCSS('button#up_downloading {display: none !important;}')
    }, 6000)
  })
}

function newDialogSample() {
  const dialogSample = new BrowserWindow({
    width: 600,
    height: 250,
    frame: false,
    resizable: false,
    maximizable: false,
    autoHideMenuBar: true,
    transparent: true,
    webPreferences: {
      devTools: global.devMode,
      preload: path.join(__dirname, "../../js/electron/preload.js"),
    }
  })
  dialogSample.loadFile('./src/html/dialogs/sample.html')

  ipcMain.on('minimize',  () => {dialogSample.minimize()})
  ipcMain.on('maximize',  () => {dialogSample.maximize()})
  ipcMain.on('restore',   () => {dialogSample.restore()})
  ipcMain.on('close',     () => {dialogSample.close()})

  ipcMain.on('dismiss',   () => {dialogSample.close();})
}

function newDialogUpdateAvailable() {
  const dialogUpdateAvailable = new BrowserWindow({
    width: 600,
    height: 250,
    frame: false,
    resizable: false,
    maximizable: false,
    autoHideMenuBar: true,
    transparent: true,
    webPreferences: {
      devTools: global.devMode,
      preload: path.join(__dirname, "../../js/electron/preload.js"),
    }
  })
  dialogUpdateAvailable.loadFile('./src/html/dialogs/update-available.html')

  ipcMain.on('minimize',  () => {dialogUpdateAvailable.minimize()})
  ipcMain.on('maximize',  () => {dialogUpdateAvailable.maximize()})
  ipcMain.on('restore',   () => {dialogUpdateAvailable.restore()})
  ipcMain.on('close',     () => {dialogUpdateAvailable.close()})

  ipcMain.on('update',    () => {autoUpdater.quitAndInstall()})
}

function newDialogUpdateFailed() {
  const dialogUpdateAvailable = new BrowserWindow({
    width: 600,
    height: 300,
    frame: false,
    resizable: false,
    maximizable: false,
    autoHideMenuBar: true,
    transparent: true,
    webPreferences: {
      devTools: global.devMode,
      preload: path.join(__dirname, "../../js/electron/preload.js"),
    }
  })
  dialogUpdateAvailable.loadFile('./src/html/dialogs/update-failed.html')

  ipcMain.on('minimize',  () => {dialogUpdateAvailable.minimize()})
  ipcMain.on('maximize',  () => {dialogUpdateAvailable.maximize()})
  ipcMain.on('restore',   () => {dialogUpdateAvailable.restore()})
  ipcMain.on('close',     () => {dialogUpdateAvailable.close()})
}

function newCP() {
  const newCP = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 400,
    minHeight: 320,
    frame: global.frame,
    autoHideMenuBar: true,
    titleBarStyle: global.titleBarStyle,
    webPreferences: {
      preload: path.join(__dirname, "../../js/electron/preload.js"),
      webviewTag: true,
      devTools: global.devMode
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
    autoHideMenuBar: true,
    titleBarStyle: global.titleBarStyle,
    webPreferences: {
      preload: path.join(__dirname, "../../js/electron/preload.js"),
      webviewTag: true,
      devTools: global.devMode
    }
  })
  newCP.loadFile('./src/html/new-window/panel.html')
}

function demoCache() {session.clearCache()}

app.whenReady().then(() => {createWindow();})
app.allowRendererProcessReuse = true
setInterval(() => {autoUpdater.checkForUpdates();}, 300000);
app.on("web-contents-created", (e, contents) => {
  contextMenu({
     window: contents,
     showSaveImageAs: false,
     showCopyImageAddress: false,
     showCopyImage: false,
     copyLink: true,
     searchWithGoogle: false,
     showSearchWithGoogle: false,
     showInspectElement: false
  });
})
