const { app, BrowserWindow, ipcMain, ipcRenderer } = require('electron')
const glasstron = require('glasstron')
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

      `)
      }
      else{
        console.log('Resetting Host File');
        exec(`
        PASSWD="$(zenity --password --title=Authentication Required)\n"
        echo -e $PASSWD | sudo -S \
        sudo cp /etc/hosts ~/Documents/hosts_backup
        cd /etc/
        sudo rm hosts
        
        (sudo wget https://raw.githubusercontent.com/FalixNodes-Software/FalixNodes-Desktop/directive-rewrite-of-v4/src/base/etc/hosts) | zenity --progress --title="FalixNodes Desktop - Troubleshooting" --text="Downloading default hosts file..." --pulsate --width="500"
        
        zenity --info --text="Original hosts file was backed up to your Documents."
        `)
      }
}

app.on('ready', createMainWindow);