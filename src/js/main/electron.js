const { app, BrowserWindow } = require('electron')
const glasstron = require('glasstron')
require('v8-compile-cache');

const createMainWindow = () => {
    let primaryWindow = new glasstron.BrowserWindow({
        width: 1200,
        height: 800,
        frame: true,
        webPrefernces: {
            webviewTag: true,
            contextIsolation: true,
            nodeIntegration: false
        }
    })
    primaryWindow.loadFile('./bundle/index.html')
}

app.on('ready', createMainWindow);