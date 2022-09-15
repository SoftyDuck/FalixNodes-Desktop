const { app, BrowserWindow, ipcMain, ipcRenderer } = require('electron')
const glasstron = require('glasstron')
const PowerShell = require("powershell");
const { exec } = require("child_process");
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
    global.blur = "acrylic"
})}
else{
  app.whenReady().then(() => {
    global.frame = true;
    global.titleBarStyle = 'default';
    global.blur = "blurbehind"
})}

const createMainWindow = () => {
  let primaryWindow = new glasstron.BrowserWindow({
    width: 1200,
    height: 800,
    frame: global.frame,
    autoHideMenuBar: true,
    darkTheme: true,
    vibrancy: "dark",
    fullscreenWindowTitle: true,
    blur: true,
    blurType: global.blur,
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
      sandbox: true,
    }
  })
  primaryWindow.loadFile('./src/index.html')
  ipcMain.on('restartApp',  () => {appRestart()})

  ipcMain.on('resetSystemHostFile',  () => {resetSystemHostFile()})

  ipcMain.on("blurOn", async (e, value) => {if(primaryWindow !== null){e.sender.send("blurStatus", await primaryWindow.setBlur(true))}});
  ipcMain.on("blurOff", async (e, value) => {if(primaryWindow !== null){e.sender.send("blurStatus", await primaryWindow.setBlur(false))}});
  ipcMain.on("blurTransparent", () => {primaryWindow.blurType = 'transparent';});
  ipcMain.on("enableBlur", () => {primaryWindow.blurType = global.blur;});
}

function resetSystemHostFile() {
  if (process.platform == 'darwin') {
    console.log('Resetting Host File');
  }
  else if(process.platform == 'win32'){
    console.log('Resetting Host File');
    let ps = new PowerShell(`
      cp C:\Windows\System32\drivers\etc\hosts C:\Windows\System32\drivers\etc\hosts_backup
      Invoke-WebRequest -Uri "https://raw.githubusercontent.com/FalixNodes-Software/FalixNodes-Desktop/directive-rewrite-of-v4/src/base/etc/hosts" -OutFile "C:\Windows\System32\drivers\etc\hosts"
      powershell (New-Object -ComObject Wscript.Shell).Popup("Host file has been resetted.",0,"FalixNodes Desktop - Troubleshooting",0x0)
      powershell (New-Object -ComObject Wscript.Shell).Popup("Original hosts file was backed up to your Documents.",0,"FalixNodes Desktop - Troubleshooting",0x0)
  `)
  }
  else{
    console.log('Resetting Host File');
    exec(`
      PASSWD="$(zenity --password --title=Authentication Required)\n"
      echo -e $PASSWD | sudo -S \
      sudo cp /etc/hosts /etc/hosts_backup
      cd /etc/
      sudo rm hosts
      
      (sudo wget https://raw.githubusercontent.com/FalixNodes-Software/FalixNodes-Desktop/directive-rewrite-of-v4/src/base/etc/hosts) | zenity --progress --title="FalixNodes Desktop - Troubleshooting" --text="Downloading default hosts file..." --pulsate --width="500"
      
      zenity --info --text="Original hosts file was backed up to your Documents."
    `)
  }
}

function appRestart() {
  app.relaunch({ args: process.argv.slice(1).concat(['--relaunch']) })
  app.exit(0)
}

app.on('ready', () => {setTimeout(() => {createMainWindow()}, 0)}) // Global variables work if used in a `setTimeout` function, it's weird
