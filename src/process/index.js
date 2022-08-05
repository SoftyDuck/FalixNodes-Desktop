const { app, BrowserWindow } = require('electron')
const glasstron = require('glasstron')
require('v8-compile-cache');

const createMainWindow = () => {
    let primaryWindow = new glasstron.BrowserWindow({
        width: 1200,
        height: 800,
        frame: true,
        blur: true,
        blurType: 'blurbehind',
        webPrefernces: {
            webviewTag: true,
            contextIsolation: true,
            nodeIntegration: false
        }
    })
    primaryWindow.loadFile('./src/index.html')
}

app.on('ready', createMainWindow);