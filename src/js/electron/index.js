const {app, BrowserWindow, Menu, protocol, ipcMain, ipcRenderer, globalShortcut, Notification, remote} = require('electron');
const { autoUpdater } = require("electron-updater");
const glasstron = require('glasstron');
const electron = require('electron');
const pty = require("node-pty");
const os = require("os");
const Pushy = require('pushy-electron');
const path = require('path');
const url = require('url');
const log = require('electron-log');

electron.app.commandLine.appendSwitch("enable-transparent-visuals"); // For Linux, not required for Windows or macOS. If removed, please remove "--enable-transparent-visuals" from start command in package.json file.

var shell = os.platform() === "win32" ? "powershell.exe" : "bash"; // Windows - Use Powershell instead of Command Prompt
var macshell = os.platform() === "win32" ? "powershell.exe" : "zsh"; // macOS - Use ZSH instead of Bash
var osvar = process.platform; // For OS Detections, also look at https://github.com/KorbsStudio/electron-titlebar-os-detection

if (osvar == 'darwin') { // macOS
  app.whenReady().then(() => {
    global.blur = "blurbehind";
    global.frame = false;
    global.titleBarStyle = 'hiddenInset'; // Use native titlebar buttons in the software

    global.terminal = macshell;

    console.log('OS: macOS');
})}
else if(osvar == 'win32'){ // Windows
  app.whenReady().then(() => {
    global.blur = "blurbehind";
    global.frame = false;
    global.titleBarStyle = 'hidden';

    global.terminal = shell;

    console.log('OS: Windows');
})}
else{ //Linux
  app.whenReady().then(() => {
    global.blur = "blurbehind";
    global.frame = true; // Use native titlebar instead
    global.titleBarStyle = 'hidden';

    global.terminal = shell;

    console.log('OS: Linux');
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
    webPreferences: {
        preload: path.join(__dirname, "../../js/electron/preload.js"),
        nodeIntegration: true,
        webviewTag: true,
        devTools: false,
        enableRemoteModule: true,
        contextIsolation: false
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
        devTools: false
    }
  })

  splashWindow.loadFile('src/html/splash/index.html')
  mainWindow.loadFile('src/index.html');

  setTimeout(() => {
   splashWindow.close();
  }, 7500);
  setTimeout(() => {
    mainWindow.show();
   }, 8000);

  // Terminal (aka XTerm)
  var ptyProcess = pty.spawn(global.terminal, [], {
      name: "xterm-color",
      cwd: process.env.HOME,
      env: process.env
  });
  ptyProcess.on('data', function(data) {  
      mainWindow.webContents.send("terminal.incomingData", data);
  });
  ipcMain.on("terminal.keystroke", (event, key) => {
      ptyProcess.write(key);
  });

  // Pushy - Push Notifcations
  mainWindow.webContents.on('did-finish-load', () => {
      Pushy.listen();
  });
    
  Pushy.register({ appId: '60c3b90e8abb33b02f642ccf' }).then((deviceToken) => {}).catch((err) => {});
    
  Pushy.setNotificationListener((data) => {
      notification = new Notification ({
          title: `${data.title}`,
          body: `${data.message}`
      });
      notification.show();
      notification.on('click', (event, arg)=>{
      const notiWindow = new BrowserWindow({
          show: false,
          webPreferences: {
              nodeIntegration: true,
              enableRemoteModule: true,
              contextIsolation: false
          }
      })
      notiWindow.loadURL(`${data.url}`)})
  });

  if (Pushy.isRegistered()) {
  Pushy.subscribe('push').then(() => {}).catch((err) => {console.error(err);});}

  // Auto Updater
  autoUpdater.checkForUpdatesAndNotify();
}

app.whenReady().then(() => {setTimeout(() => {createWindow()}, 1200)}) // The "setTimeout" function is used due to a transparency bug with Electron on Linux