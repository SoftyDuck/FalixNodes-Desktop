const { app, BrowserWindow, ipcMain, ipcRenderer } = require('electron')
const glasstron = require('glasstron')
const PowerShell = require("powershell");
const { exec } = require("child_process");
const path = require('path');

const createMainWindow = () => {
  let primaryWindow = new glasstron.BrowserWindow({
    width: 1200,
    height: 800,
    frame: true,
    autoHideMenuBar: true,
    blur: true,
    blurType: 'blurbehind',
    webPreferences: {
      preload: path.join(__dirname, "./preload.js"),
      webviewTag: true
    }
  })
  primaryWindow.loadFile('./src/index.html')
  ipcMain.on('resetSystemHostFile',  () => {resetSystemHostFile()})
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

app.on('ready', createMainWindow);