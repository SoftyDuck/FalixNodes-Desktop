const glasstron = require('glasstron');
const electron = require('electron');
const {app, BrowserWindow, Menu, protocol, ipcMain, ipcRenderer, globalShortcut} = require('electron');
const isMac = process.platform === 'darwin' // Not required
const path = require('path');
const url = require('url');
const { remote } = require('electron');
const pty = require("node-pty");
const osUI = require('os-utils');
const os = require("os");
var shell = os.platform() === "win32" ? "powershell.exe" : "bash"; // Use Powershell instead of Command Prompt
var macshell = os.platform() === "win32" ? "powershell.exe" : "zsh";
electron.app.commandLine.appendSwitch("enable-transparent-visuals"); // For Linux, not required for Windows or macOS. If removed, please remove "--enable-transparent-visuals" from start command in package.json file.

var osvar = process.platform; /* Detecting OS */
if (osvar == 'darwin') {app.whenReady().then(() => {createWindowMac()})
}else if(osvar == 'win32'){app.whenReady().then(() => {createWindowWin()})
}else{app.whenReady().then(() => {setTimeout(() => {createWindowLinux()}, 400)})}
 // Delay for Linux, Electron has a bug where the background stays black instead of transparent on Linux.
 // Issue here: https://github.com/electron/electron/issues/28834
 // Old issue here: https://github.com/electron/electron/issues/15947

function createWindowWin () { /* Windows */
  const mainWindow = new glasstron.BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 1000,
    minHeight: 520,
    frame: false,
    show: false,
    transparent: true,
    closable: true,
    maximizable: true,
    minimizable: true,
    nativeWindowOpen: true,
		blur: true,
		blurType: "acrylic", // Usually Acrylic, but mouse lag issue as of now, use Blur Behind for now
    webPreferences: {
      preload: path.join(__dirname, "../../js/electron/preload.js"),
			nodeIntegration: true,
			webviewTag: true,
			devTools: true,
      enableRemoteModule: true,
      contextIsolation: false
    }
  })
  const loadWindow = new BrowserWindow({
    frame: false,
    minimizable: false,
    maximizable: false,
    closable: true,
    transparent: true,
    skipTaskbar: true, // Don't show splash on taskbar
    center: true,
    width: 382,
    height: 382,
    minWidth: 382,
    minHeight: 382,
    resizable: false,
    webPreferences: {
      devTools: false
    }
  })
  mainWindow.setIcon(path.join(__dirname, '../../images/icons/app/256x256.ico'));
  loadWindow.loadFile('src/html/splash/index.html');
  mainWindow.loadFile('src/index.html');
  setTimeout(() => { // Show splash for 5 seconds (fixed time) then the main window
    mainWindow.show();
   }, 5000); 
   setTimeout(() => {
    loadWindow.close();
   }, 4000);
  setInterval(() => {
    osUI.cpuUsage(function(v){
     mainWindow.webContents.send('cpu',v*100);
     mainWindow.webContents.send('gpu',v*100);
   });
  },1000);
  var ptyProcess = pty.spawn(shell, [], {
      name: "xterm-color",
      cols: 80,
      rows: 30,
      cwd: process.env.HOME,
      env: process.env
  });
  ptyProcess.on('data', function(data) {
      mainWindow.webContents.send("terminal.incomingData", data);
      console.log("");
  });
  ipcMain.on("terminal.keystroke", (event, key) => {
      ptyProcess.write(key);
  });
  mainWindow.webContents.on('new-window', function(e, url) {
   e.preventDefault();
   require('electron').shell.openExternal(url);
  });
}

function createWindowMac () { /* Linux */
  const mainWindow = new BrowserWindow({
    backgroundColor: '#162230',
    width: 1200,
    height: 800,
    minWidth: 1000,
    minHeight: 520,
    frame: false,
    show: false,
    transparent: false,
    closable: true,
    maximizable: true,
    minimizable: true,
    autoHideMenuBar: true,
    titleBarStyle: 'hiddenInset', // Set the titlebar controls(known as Traffic light buttons on macOS) into app
    webPreferences: {
      nativeWindowOpen: true,
      preload: path.join(__dirname, "preload.js"),
			nodeIntegration: true,
			webviewTag: true,
      devTools: false,
      enableRemoteModule: true,
      contextIsolation: false
    }
  })
  const loadWindow = new BrowserWindow({
    frame: false,
    minimizable: false,
    maximizable: false,
    closable: true,
    transparent: true,
    center: true,
    width: 382,
    height: 382,
    minWidth: 382,
    minHeight: 382,
    resizable: false,
    webPreferences: {
      devTools: false
    }
  })
  loadWindow.loadFile('src/html/splash/index.html');
  mainWindow.loadFile('src/index.html');
  mainWindow.setIcon(path.join(__dirname, '../../images/icons/app/256x256.png'));
  mainWindow.webContents.on('did-finish-load', function() {
    mainWindow.webContents.insertCSS('#titlebar{display: none !important;}') /* Remove Windows Titlebar if OS is Linux */
 })
 setInterval(() => {
   osUI.cpuUsage(function(v){
    mainWindow.webContents.send('cpu',v*100);
  });
 },1000);
 setTimeout(() => {
  mainWindow.show();
 }, 5000);
 setTimeout(() => {
  loadWindow.close();
 }, 4900);
var ptyProcess = pty.spawn(macshell, [], {
	name: "xterm-color",
     cols: 80,
     rows: 30,
     cwd: process.env.HOME,
     env: process.env
 });
 ptyProcess.on('data', function(data) {
     mainWindow.webContents.send("terminal.incomingData", data);
     console.log("");
 });
 ipcMain.on("terminal.keystroke", (event, key) => {
     ptyProcess.write(key);
 });
 mainWindow.webContents.on('new-window', function(e, url) {
	e.preventDefault();
	require('electron').shell.openExternal(url);
 });
}
function createWindowLinux () { /* Linux */
  const mainWindow = new BrowserWindow({
    backgroundColor: '#162230',
    width: 1200,
    height: 800,
    minWidth: 1000,
    minHeight: 520,
    frame: true,
    show: false,
    transparent: false,
    closable: true,
    maximizable: true,
    minimizable: true,
    autoHideMenuBar: true,
    webPreferences: {
      nativeWindowOpen: true,
      preload: path.join(__dirname, "preload.js"),
			nodeIntegration: true,
			webviewTag: true,
      devTools: false,
      enableRemoteModule: true,
      contextIsolation: false
    }
  })
  const loadWindow = new BrowserWindow({
    frame: false,
    minimizable: false,
    maximizable: false,
    closable: true,
    transparent: true,
    center: true,
    width: 382,
    height: 382,
    minWidth: 382,
    minHeight: 382,
    resizable: false,
    webPreferences: {
      devTools: false
    }
  })
  loadWindow.loadFile('src/html/splash/index.html');
  mainWindow.loadFile('src/index.html');
  mainWindow.setIcon(path.join(__dirname, '../../images/icons/app/256x256.png'));
  mainWindow.webContents.on('did-finish-load', function() {
    mainWindow.webContents.insertCSS('#titlebar{display: none !important;}') /* Remove Windows Titlebar if OS is Linux */
 })
 setInterval(() => {
   osUI.cpuUsage(function(v){
    mainWindow.webContents.send('cpu',v*100);
  });
 },1000);
 setTimeout(() => {
  mainWindow.show();
 }, 5000);
 setTimeout(() => {
  loadWindow.close();
 }, 4900);
 var ptyProcess = pty.spawn(shell, [], {
     name: "xterm-color",
     cols: 80,
     rows: 30,
     cwd: process.env.HOME,
     env: process.env
 });
 ptyProcess.on('data', function(data) {
     mainWindow.webContents.send("terminal.incomingData", data);
     console.log("");
 });
 ipcMain.on("terminal.keystroke", (event, key) => {
     ptyProcess.write(key);
 });
 mainWindow.webContents.on('new-window', function(e, url) {
	e.preventDefault();
	require('electron').shell.openExternal(url);
 });
}
app.on("ready", () => {
  globalShortcut.register("CommandOrControl+W", () => { // Disable Ctrl W hotkey
      
  });
});
