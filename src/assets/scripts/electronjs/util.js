const fs = require("fs");
const {ipcMain} = require("electron");
const log = require("electron-log");
const Pushy = require("pushy-electron");
const launcherEventManager = () => {
    const eventFiles = fs
        .readdirSync(`${__dirname}/ipcMain_Events/launcherEvents`)
        .filter((file) => file.endsWith(".js"));
    for (const file of eventFiles) {
        const event = require(`${__dirname}/ipcMain_Events/launcherEvents/${file}`);
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
        const event = require(`${__dirname}/ipcMain_Events/vpnEvents/${file}`);
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
        const event = require(`${__dirname}/ipcMain_Events/electronEvents/${file}`);
        event.once ?
            ipcMain.once(event.name, (...args) => event.execute(...args, ses)) :
            ipcMain.on(event.name, (...args) => event.execute(...args, ses));
    }
}

const platformCheck = () => {
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
}

const initializePushy = (primaryWindow) => {
    Pushy.register({appId: '62a020bfca130a4f54f56b4f'}).then((deviceToken) => {log.info("Registered Pushy")});

    if (Pushy.isRegistered()) {
        Pushy.subscribe('primary').then(r => log.info("Subscribed to primary notifications"));
    }
    Pushy.setNotificationListener((data) => {
        primaryWindow.sender.executeJavaScript(`
    document.getElementById("notification-amount").style.opacity = '1';
    document.getElementById("notification-amount").stepUp(1);
    document.querySelector('.tabs#notifications hr').insertAdjacentHTML("afterEnd", "<notification><div class='header'><h1>` + data.icon + `` + data.title + `</h1></div><div class='n-content'>` + data.message + `</div><div class=actions><button>Dismiss</button> ` + data.action + `</div></div></notification>")
    `).then(r => log.info("successfully executed this javascript code"));
    });
}

const primaryWindowEventManager = (ses) => {
    const eventFiles = fs
        .readdirSync(`${__dirname}/ipcMain_Events/primaryWindowEvents`)
        .filter((file) => file.endsWith(".js"));
    for (const file of eventFiles) {
        const event = require(`${__dirname}/ipcMain_Events/primaryWindowEvents/${file}`);
        event.once ?
            ses.once(event.name, (...args) => event.execute(...args)) :
            ses.on(event.name, (...args) => event.execute(...args));
    }
}

const that = (primary) => {
    const eventFiles = fs
        .readdirSync(`${__dirname}/ipcMain_Events/vpnEvents/that`)
        .filter((file) => file.endsWith(".js"));
    for (const file of eventFiles) {
        const event = require(`${__dirname}/ipcMain_Events/vpnEvents/that/${file}`);
        event.once ?
            ipcMain.once(event.name, (...args) => event.execute(...args, primary)) :
            ipcMain.on(event.name, (...args) => event.execute(...args, primary));
    }
}

exports.launcherEventManager = launcherEventManager;
exports.vpnEventManager = vpnEventManager;
exports.electronEventManager = electronEventManager;
exports.platformCheck = platformCheck;
exports.initializePushy = initializePushy;
exports.primaryWindowEventManager = primaryWindowEventManager;
exports.that = that;