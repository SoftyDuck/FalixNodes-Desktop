const {
    app, BrowserWindow, dialog, ipcMain, ipcRenderer, nativeTheme, protocol, powerMonitor, session, webContents, shell
} = require('electron');
const Pushy = require('pushy-electron');
const {exec} = require('child_process');
const PowerShell = require('powershell');
const glasstron = require('glasstron');
const log = require('electron-log');
const path = require('path');
const {info} = require("electron-log");
const fs = require("fs");
let commandExistsSync = require('command-exists').sync;

const execute = command => exec(command);

const launcherEventManager = () => {
    const eventFiles = fs
        .readdirSync(`${__dirname}/ipcMain_Events/launcherEvents`)
        .filter((file) => file.endsWith(".js"));
    for (const file of eventFiles) {
        const event = require(`${__dirname}/ipcMain_Events/launcherEvents${file}`);
        event.once ?
            ipcMain.once(event.name, (...args) => event.execute(...args)) :
            ipcMain.on(event.name, (...args) => event.execute(...args));
    }
}

const vpnEventManager = () => {
    const eventFiles = fs
        .readdirSync(`${__dirname}/ipcMain_Events/vpnEvents`)
        .filter((file) => file.endsWith(".js"));
    for (const file of eventFiles) {
        const event = require(`${__dirname}/ipcMain_Events/vpnEvents${file}`);
        event.once ?
            ipcMain.once(event.name, (...args) => event.execute(...args)) :
            ipcMain.on(event.name, (...args) => event.execute(...args));
    }
}

const electronEventManager = (ses) => {
    const eventFiles = fs
        .readdirSync(`${__dirname}/ipcMain_Events/electronEvents`)
        .filter((file) => file.endsWith(".js"));
    for (const file of eventFiles) {
        const event = require(`${__dirname}/ipcMain_Events/electronEvents${file}`);
        event.once ?
            ipcMain.once(event.name, (...args) => event.execute(...args, ses, app)) :
            ipcMain.on(event.name, (...args) => event.execute(...args, ses, app));
    }
}


/*
# Overwrite 'console.log' with 'log`
*/

console.log = log.info
console.error = log.error
Object.assign(console, log.functions)

/*
# Platform Check
*/

switch (process.platform) {
    case "win32":
        global.blur = 'acrylic'
        break
    case "darwin":
        global.blur = 'vibrancy'
        global.update = log.error('Auto update not supported on this platform.')
        break
    case "linux":
        global.blur = 'blurbehind'
        break
}

/*
# Main app function
*/

const createMainWindow = () => {
    let primaryWindow = new glasstron.BrowserWindow({
        minHeight: 720,
        minWidth: 1200,
        autoHideMenuBar: true,
        frame: true,
        blur: true,
        blurType: global.blur,
        titleBarStyle: 'hidden',
        trafficLightPosition: {
            x: 20, y: 28,
        },
        titleBarOverlay: {
            color: '#161616', symbolColor: 'white'
        },
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            webviewTag: true,
            contextIsolation: true,
            nodeIntegration: false,
        }
    })
    primaryWindow.loadFile('src/index.html').then(r => log.info("Loaded index.html"));

    electronEventManager(primaryWindow.webContents.session);

    // Mullvad VPN - Windows and Linux are supported. macOS support will come later.
    ipcMain.on('loginVPN', () => {
        switch (process.platform) {
            case "linux":
                exec(`
      MULLID=$( zenity --entry --text="Type in your Mullvad Account Number" )

      if [ $? = 0 ]
      then
          mullvad account set $MULLID
      else
          echo "Mullvad login was cancelled."
      fi
      `);
                break
            case "win32":
                let ps = new PowerShell(`
      Add-Type -AssemblyName Microsoft.VisualBasic; [Microsoft.VisualBasic.Interaction]::InputBox('Your Mullvad Account Number:', 'FalixNodes Desktop - External Mullvad Login') > mull-id.tmp
      $MULLVADID = Get-Content -Path mull-id.tmp -RAW

      mullvad.exe account set $MULLVADID > mullvad-login.txt
      $MULLVADMSG1 = Get-Content -Path mullvad-login.txt -RAW

      Add-Type -AssemblyName PresentationFramework;[System.Windows.MessageBox]::($MULLVADMSG1)
      `)
                break
        }
        primaryWindow.webContents.executeJavaScript('document.querySelector(".sContainer#MULLVAD-FAILED").style.display = "none";').then(r => {
            log.info("Successfully changed #mullvad-failed container style to none");
        })
    })

    vpnEventManager();

    /*
    # Notifications System Initialization - Powered by Pushy
    */

    primaryWindow.webContents.on('did-finish-load', () => {
        Pushy.listen();
    });

    Pushy.register({appId: '62a020bfca130a4f54f56b4f'}).then((deviceToken) => {log.info("Registered Pushy")});

    if (Pushy.isRegistered()) {
        Pushy.subscribe('primary').then(r => log.info("Subscribed to primary notifications"));
    }

    Pushy.setNotificationListener((data) => {
        primaryWindow.webContents.executeJavaScript(`
    document.getElementById("notification-amount").style.opacity = '1';
    document.getElementById("notification-amount").stepUp(1);
    document.querySelector('.tabs#notifications hr').insertAdjacentHTML("afterEnd", "<notification><div class='header'><h1>` + data.icon + `` + data.title + `</h1></div><div class='n-content'>` + data.message + `</div><div class=actions><button>Dismiss</button> ` + data.action + `</div></div></notification>")
    `).then(r => log.info("successfully executed this javascript code"));
    });

    /*
    # Other important bits of code
    */

    if (nativeTheme.shouldUseDarkColors) {
        log.info('Native Theme: Dark')
    } else {
        log.info('Native Theme: Light')
    }

    if (__dirname.includes('\\WindowsApps\\')) {
        log.error('The built-in auto updater is not supported on Microsoft Store, please use the Microsoft Store to update FalixNodes Desktop.');
    } else {
        // global.update = autoUpdater.checkForUpdates();
    }

    if (commandExistsSync('mullvad')) {
    } else {
        setTimeout(() => {
            log.error('Mullvad was not detected.')
            primaryWindow.webContents.executeJavaScript('document.querySelector(".sContainer#MULLVAD-NOT-FOUND").style.display = "grid"; document.querySelector(".sContainer#mullvad-install").style.display = "inherit"; document.querySelector("vpn .vpn-connection").style.backgroundColor = "rgb(255 0 0 / 30%)";  document.querySelector("vpn .vpn-connection").style.boxShadow = "0px 0px 0px 20px rgb(255 0 0 / 10%)"')
        }, 5000); // the element doesn't load instantly
    }

    /*
    # FalixNodes Desktop Minecraft Launcher - EXPERIMENTAL
    # Credit: https://github.com/MrShieh-X/console-minecraft-launcher/
    */

    launcherEventManager();
}

app.on('ready', createMainWindow);