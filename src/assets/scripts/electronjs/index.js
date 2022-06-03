const { app, BrowserWindow, dialog, ipcMain, ipcRenderer, nativeTheme, protocol, powerMonitor, session, webContents } = require('electron')
const { exec} = require('child_process');
const glasstron = require('glasstron');
const log = require('electron-log')
const path = require('path');
var commandExistsSync = require('command-exists').sync;

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

    // NordVPN - Linux ONLY
    ipcMain.on('loginVPN', () => {
      exec("sh src/assets/scripts/shell/linux/nordvpn/login.sh");
      primaryWindow.webContents.executeJavaScript('document.querySelector(".sContainer#NORDVPN-FAILED").style.display = "none";')
    })
    
    ipcMain.on('enableVPN-UKLN', () => {
      exec("sh src/assets/scripts/shell/linux/nordvpn/connect/UK_LN.sh");
      exec("nordvpn connect", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            primaryWindow.webContents.executeJavaScript('document.querySelector(".sContainer#NORDVPN-FAILED").style.display = "grid";')
            primaryWindow.webContents.executeJavaScript('document.querySelector("vpn .vpn-connection").style.backgroundColor = "rgb(255 0 0 / 30%)";  document.querySelector("vpn .vpn-connection").style.boxShadow = "0px 0px 0px 20px rgb(255 0 0 / 10%)";')
            exec("nordvpn-login.sh")
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
      });
    })
    
    ipcMain.on('enableVPN-USLA', () => {
      exec("sh src/assets/scripts/shell/linux/nordvpn/connect/US_LA.sh");
      exec("nordvpn connect", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            primaryWindow.webContents.executeJavaScript('document.querySelector(".sContainer#NORDVPN-FAILED").style.display = "grid";')
            primaryWindow.webContents.executeJavaScript('document.querySelector("vpn .vpn-connection").style.backgroundColor = "rgb(255 0 0 / 30%)";  document.querySelector("vpn .vpn-connection").style.boxShadow = "0px 0px 0px 20px rgb(255 0 0 / 10%)";')
            exec("nordvpn-login.sh")
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
      });
    })
    
    ipcMain.on('enableVPN-USNY', () => {
      exec("sh src/assets/scripts/shell/linux/nordvpn/connect/US_NY.sh");
      exec("nordvpn connect", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            primaryWindow.webContents.executeJavaScript('document.querySelector(".sContainer#NORDVPN-FAILED").style.display = "grid";')
            primaryWindow.webContents.executeJavaScript('document.querySelector("vpn .vpn-connection").style.backgroundColor = "rgb(255 0 0 / 30%)";  document.querySelector("vpn .vpn-connection").style.boxShadow = "0px 0px 0px 20px rgb(255 0 0 / 10%)";')
            exec("nordvpn-login.sh")
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
      });
    })
    
    ipcMain.on('enableVPN-GRBR', () => {
      exec("sh src/assets/scripts/shell/linux/nordvpn/connect/GR_BR.sh");
      exec("nordvpn connect", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            primaryWindow.webContents.executeJavaScript('document.querySelector(".sContainer#NORDVPN-FAILED").style.display = "grid";')
            primaryWindow.webContents.executeJavaScript('document.querySelector("vpn .vpn-connection").style.backgroundColor = "rgb(255 0 0 / 30%)";  document.querySelector("vpn .vpn-connection").style.boxShadow = "0px 0px 0px 20px rgb(255 0 0 / 10%)";')
            exec("nordvpn-login.sh")
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
      });
    })
    
    ipcMain.on('enableVPN-AUSY', () => {
      exec("sh src/assets/scripts/shell/linux/nordvpn/connect/AUSY.sh");
      exec("nordvpn connect", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            primaryWindow.webContents.executeJavaScript('document.querySelector(".sContainer#NORDVPN-FAILED").style.display = "grid";')
            primaryWindow.webContents.executeJavaScript('document.querySelector("vpn .vpn-connection").style.backgroundColor = "rgb(255 0 0 / 30%)";  document.querySelector("vpn .vpn-connection").style.boxShadow = "0px 0px 0px 20px rgb(255 0 0 / 10%)";')
            exec("nordvpn-login.sh")
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
      });
    })

    ipcMain.on('disableVPN', () => {
      console.log('disableVPN')
      exec("sh src/assets/scripts/shell/linux/nordvpn/disconnect.sh");
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
    if (commandExistsSync('nordvpn')) {
    } else {
      setTimeout(() => {
        console.log('NordVPN was not detected.')
        primaryWindow.webContents.executeJavaScript('document.querySelector(".sContainer#NORDVPN-NOT-FOUND").style.display = "grid"; document.querySelector("vpn .vpn-connection").style.backgroundColor = "rgb(255 0 0 / 30%)";  document.querySelector("vpn .vpn-connection").style.boxShadow = "0px 0px 0px 20px rgb(255 0 0 / 10%)"')
      }, 10000); // Element doesn't load instantly
    }
}

function relaunch() {
  app.relaunch
  console.log('RESTARTING')
}
app.on('ready', createMainWindow);