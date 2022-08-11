const { app, BrowserWindow } = require('electron')
const glasstron = require('glasstron')

const createMainWindow = () => {
    let primaryWindow = new glasstron.BrowserWindow({
        width: 1200,
        height: 800,
        frame: true,
        autoHideMenuBar: true,
        blur: true,
        blurType: 'blurbehind',
        webPreferences: {
            webviewTag: true
        }
    })
    primaryWindow.loadFile('./src/index.html')
}

app.on('ready', createMainWindow);