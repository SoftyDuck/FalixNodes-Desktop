const {app, BrowserView, BrowserWindow, contextBridge, protocol, ipcMain, ipcRenderer, globalShortcut, Menu, Notification, session, shell, webContents} = require('electron')
const { setupTitlebar, attachTitlebarToWindow } = require('custom-electron-titlebar/main');
const contextMenu = require('electron-context-menu')
const { autoUpdater } = require("electron-updater")
const glasstron = require('glasstron')
const electron = require('electron')
const log = require('electron-log')
const path = require('path')
const url = require('url')
const os = require("os")

setupTitlebar();

const isMac = process.platform === 'darwin'
autoUpdater.logger = log
let mainWindow;
let dialogUpdateAvailable;

if (process.windowsStore) {
  global.update = console.log('The built-in auto updater is not supported on Microsoft Store, please use the Microsoft Store to update FalixNodes Desktop.');
}
else if(process.platform == 'win32'){
  global.update = autoUpdater.checkForUpdates();
}

global.devMode = true
if (process.platform == 'darwin') {
    app.whenReady().then(() => {
      global.blur = "vibrancy"
      global.frame = false
      global.titleBarStyle = 'hiddenInset'
      global.update = console.log('Auto update not supported on this platform.');
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
      global.update = autoUpdater.checkForUpdates();
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
  global.update;
  autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
    setTimeout(() => {
      newDialogUpdateAvailable();
      mainWindow.webContents.insertCSS('button#up_downloading {display: none !important;}')
    }, 6000)
  })

  const template = [
    ...(isMac ? [{
      label: app.name,
      submenu: [
        { role: 'about' },
        { role: 'quit' }
      ]
    }] : []),
    {
      label: 'File',
      submenu: [
        {
            label: 'About',
            accelerator: 'Alt+.',
            click: () => {mainWindow.webContents.executeJavaScript(`openPage('settings', this, 'var(--accent)'); openStPage('st-id-about', this, 'var(--accent)');`)}
        },
        isMac ? { role: 'close' } : { role: 'quit' },
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        ...(isMac ? [
          { role: 'pasteAndMatchStyle' },
          { role: 'delete' },
          { role: 'selectAll' },
          { type: 'separator' },
          {
            label: 'Speech',
            submenu: [
              { role: 'startSpeaking' },
              { role: 'stopSpeaking' }
            ]
          }
        ] : [
          { role: 'delete' },
          { type: 'separator' },
          { role: 'selectAll' }
        ])
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        // { type: 'separator' },
        // {
        //   label: 'Blog Posts',
        //   click: () => {mainWindow.webContents.executeJavaScript(`openPage('news', this, 'var(--accent)')`)}
        // },
        // {
        //   label: 'Client Panel',
        //   click: () => {mainWindow.webContents.executeJavaScript(`openPage('client_panel', this, 'var(--accent)')`)}
        // },
        // {
        //   label: 'Game Panel',
        //   click: () => {mainWindow.webContents.executeJavaScript(`openPage('game_panel', this, 'var(--accent)')`)}
        // },
        // {
        //   label: 'phpMyAdmin',
        //   click: () => {mainWindow.webContents.executeJavaScript(`openPage('phpmyadmin', this, 'var(--accent)')`)}
        // },
        // {
        //   label: 'Help Center',
        //   click: () => {mainWindow.webContents.executeJavaScript(`openPage('help_center', this, 'var(--accent)')`)}
        // },
        // {
        //   label: 'Settings',
        //   click: () => {mainWindow.webContents.executeJavaScript(`openPage('settings', this, 'var(--accent)')`)}
        // },
      ]
    },
    {
      label: 'Window',
      submenu: [
        { role: 'minimize' },
        { role: 'zoom' },
        ...(isMac ? [
          { type: 'separator' },
          { role: 'front' },
          { type: 'separator' },
          { role: 'window' }
        ] : [
          { role: 'close' }
        ])
      ]
    },
    {
      role: 'help',
      submenu: [
          // {
          //   label: 'Getting Started',
          //   click: async () => {
          //       const { shell } = require('electron')
          //       await console.log('Demo')
          //   }
          // },
          {
            label: 'Release Note',
            click: async () => {shell.openExternal('https://desktop.falixnodes.net/release-notes/')}
          },
          {
            label: 'View License',
            click: async () => {shell.openExternal('https://desktop.falixnodes.net/LICENSE')}
          },
          { type: 'separator' },
          // {
          //   label: 'View Keyboard Shortcuts',
          //   click: async () => {
          //       const { shell } = require('electron')
          //       await console.log('Demo')
          //   }
          // },
          { type: 'separator' },
          {
              label: 'Help Center',
              accelerator: 'Alt+/',
              click: () => {mainWindow.webContents.executeJavaScript(`openPage('help_center', this, 'var(--accent)')`)}
          },
          {
              label: 'Report Bug',
              click: () => {newDialogReportBug()}
          },
          {
            label: 'Troubleshooting',
            'submenu': [
                {
                  'label': 'Open Logs',
                  click: async () => {shell.openExternal('file:///tmp/falixnodes-desktop.log')}
                },
                {
                  'label': 'Reset Cache',
                  click: async () => {mainWindow.webContents.session.clearStorageData()}
                }
              ]
          }
      ],
    }
  ]
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
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
    width: 575,
    height: 305,
    frame: false,
    resizable: true,
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

  ipcMain.on('open-release-notes',    () => {shell.openExternal('https://desktop.falixnodes.net/release-notes/')})
  ipcMain.on('update',    () => {autoUpdater.quitAndInstall()})
}

function newDialogUpdateFailed() {
  const dialogUpdateFailed = new BrowserWindow({
    width: 575,
    height: 400,
    frame: false,
    resizable: true,
    maximizable: false,
    autoHideMenuBar: true,
    transparent: true,
    webPreferences: {
      devTools: global.devMode,
      preload: path.join(__dirname, "../../js/electron/preload.js"),
    }
  })
  dialogUpdateFailed.loadFile('./src/html/dialogs/update-failed.html')

  ipcMain.on('minimize',  () => {dialogUpdateFailed.minimize()})
  ipcMain.on('maximize',  () => {dialogUpdateFailed.maximize()})
  ipcMain.on('restore',   () => {dialogUpdateFailed.restore()})
  ipcMain.on('close',     () => {dialogUpdateFailed.close()})
}

function newDialogReportBug() {
  const dialogUpdateReportBug = new BrowserWindow({
    width: 414,
    height: 475,
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
  dialogUpdateReportBug.loadFile('./src/html/dialogs/report-bug.html')

  ipcMain.on('minimize',  () => {dialogUpdateReportBug.minimize()})
  ipcMain.on('maximize',  () => {dialogUpdateReportBug.maximize()})
  ipcMain.on('restore',   () => {dialogUpdateReportBug.restore()})
  ipcMain.on('close',     () => {dialogUpdateReportBug.close()})
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
setInterval(() => {
  global.updateLoop
}, 300000);
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