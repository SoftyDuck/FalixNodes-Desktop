const { app, nativeTheme, ipcMain } = require('electron');
Pushy = require('pushy-electron');
glasstron = require('glasstron');
log = require('electron-log');
path = require('path');
const { launcherEventManager, vpnEventManager, electronEventManager, platformCheck, initializePushy, primaryWindowEventManager, that } = require("./util");

let commandExistsSync = require('command-exists').sync

platformCheck();

options = {
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
        color: '#161616',
        symbolColor: 'white'
    },
    webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        webviewTag: true,
        contextIsolation: true,
        nodeIntegration: false,
    }
}


// Overwrite 'console.log' with 'log`

console.log = log.info
console.error = log.error
Object.assign(console, log.functions)

// Main app function

const createMainWindow = () => {
    let primaryWindow = new glasstron.BrowserWindow(options)
    primaryWindow.loadFile('src/index.html').then(r => log.info("Loaded index.html"));
    electronEventManager(primaryWindow.webContents.session);

    // Mullvad VPN - Windows and Linux are supported. macOS support will come later.

    that(primaryWindow.webContents);
    vpnEventManager();

    // Notifications System Initialization - Powered by Pushy

    primaryWindowEventManager(primaryWindow.webContents)
    initializePushy(primaryWindow.webContents);
    
    // Other important bits of code

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

    ipcMain.on("relaunch", () => {
        log.info("Goodbye! *kisses*")
        app.relaunch({args: process.argv.slice(1).concat(['--relaunch'])});
        app.exit(0);
    });

    // FalixNodes Desktop Minecraft Launcher - EXPERIMENTAL
    // Credit: https://github.com/MrShieh-X/console-minecraft-launcher/
    launcherEventManager();
}

app.on('ready', createMainWindow);