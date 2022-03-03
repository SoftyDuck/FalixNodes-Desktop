const { app, BrowserWindow } = require('electron')
const glasstron = require('glasstron')
const path = require('path');
const { setupTitlebar, attachTitlebarToWindow } = require('custom-electron-titlebar/main');

setupTitlebar();

function Launch() {
    const primaryWindow = new glasstron.BrowserWindow({
        width: 1200,
        height: 800,
        minHeight: 590,
        minWidth: 720,
        autoHideMenuBar: true,
        frame: true,
        blue: true,
        blueType: 'blurbehind',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            webviewTag: true,
            contextIsolation: true,
            nodeIntegration: false
        }
    })
    primaryWindow.loadFile('src/index.html')
    attachTitlebarToWindow(primaryWindow);
}

app.whenReady().then(() => {Launch()})