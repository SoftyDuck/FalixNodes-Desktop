const { app, BrowserWindow, dialog, ipcMain, ipcRenderer, nativeTheme, protocol, powerMonitor, session } = require('electron')
const glasstron = require('glasstron')
const fs = require('fs');
const path = require('path');
const { Client, SFTPStream } = require('ssh2');
const PromisePool = require('es6-promise-pool');
let primaryWindow;
let sftp;

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

    if (nativeTheme.shouldUseDarkColors) {
      console.log('Yes')
    } else {
      console.log('No')
    }

    if (__dirname.includes('\\WindowsApps\\')) {
      console.log('The built-in auto updater is not supported on Microsoft Store, please use the Microsoft Store to update FalixNodes Desktop.');
    }
    else {
      global.update = autoUpdater.checkForUpdates();
    }
}

app.on('ready', createMainWindow);