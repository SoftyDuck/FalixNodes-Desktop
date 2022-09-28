const { app, BrowserWindow, ipcMain, ipcRenderer } = require('electron')
const glasstron = require('glasstron-clarity')
const path = require('path');

if (process.platform == 'darwin') {
  app.whenReady().then(() => {
    global.frame = false;
    global.titleBarStyle = 'hiddenInset';
})}
else if(process.platform == 'win32'){
  app.whenReady().then(() => {
    global.frame = false;
    global.titleBarStyle = 'hidden';
})}
else{
  app.whenReady().then(() => {
    global.frame = true;
    global.titleBarStyle = 'default';
})}

const createMainWindow = () => {
  let splashWindow = new glasstron.BrowserWindow({
    width: 700,
    height: 200,
    maxWidth: 700,
    maxHeight: 200,
    minWidth: 700,
    minHeight: 200,
    frame: false,
    minimizable: false,
    blur: true
  })
  splashWindow.loadFile('./src/components/splash/index.html')

  let primaryWindow = new glasstron.BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 430,
    minHeight: 520,
    frame: global.frame,
    autoHideMenuBar: true,
    darkTheme: true,
    vibrancy: "dark",
    fullscreenWindowTitle: true,
    blur: true,
    show: false,
    titleBarStyle: global.titleBarStyle,
    titleBarOverlay: true,
    titleBarOverlay: {
      color: '#232323',
      symbolColor: 'white',
      height: 40,
    },
    trafficLightPosition: {
      x: 20,
      y: 13,
    },
    webPreferences: {
      preload: path.join(__dirname, "./preload.js"),
      webviewTag: true,
      sandbox: false,
    }
  })
  primaryWindow.loadFile('./src/index.html')

  setTimeout(() => {
    splashWindow.hide();
    primaryWindow.show();
    primaryWindow.maximize();
  }, 5000);

  ipcMain.on('restartApp',  () => {appRestart()})

  ipcMain.on('resetSystemHostFile',  () => {resetSystemHostFile()})

  ipcMain.on("blurOn", async (e, value) => {if(primaryWindow !== null){e.sender.send("blurStatus", await primaryWindow.setBlur(true))}});
  ipcMain.on("blurOff", async (e, value) => {if(primaryWindow !== null){e.sender.send("blurStatus", await primaryWindow.setBlur(false))}});
  ipcMain.on("blurTransparent", () => {primaryWindow.blurType = 'transparent';});
  ipcMain.on("enableBlur", () => {primaryWindow.blurType = global.blur;});
}

function appRestart() {
  app.relaunch({ args: process.argv.slice(1).concat(['--relaunch']) })
  app.exit(0)
}

app.on('ready', () => {setTimeout(() => {createMainWindow()}, 0)}) // Global variables work if used in a `setTimeout` function, it's weird
