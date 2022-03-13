const { app, BrowserWindow, nativeTheme, protocol, powerMonitor, session } = require('electron')
const glasstron = require('glasstron')
const path = require('path');

function Launch() {
    const primaryWindow = new glasstron.BrowserWindow({
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

    if (process.windowsStore) {
        console.log('App Type: Windows Store')
    }
    else {
        console.log('App Type: Non-Windows Store')
    }
}

app.enableSandbox()
app.whenReady().then(() => {
    Launch()
})