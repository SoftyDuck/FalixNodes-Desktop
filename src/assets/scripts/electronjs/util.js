const fs = require("fs");
const {ipcMain, app} = require("electron");
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
            ipcMain.once(event.name, (...args) => event.execute(...args, ses, app)) :
            ipcMain.on(event.name, (...args) => event.execute(...args, ses, app));
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

const initializePushy = () => {
    Pushy.register({appId: '62a020bfca130a4f54f56b4f'}).then((deviceToken) => {log.info("Registered Pushy")});

    if (Pushy.isRegistered()) {
        Pushy.subscribe('primary').then(r => log.info("Subscribed to primary notifications"));
    }
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

exports.launcherEventManager = launcherEventManager;
exports.vpnEventManager = vpnEventManager;
exports.electronEventManager = electronEventManager;
exports.platformCheck = platformCheck;
exports.initializePushy = initializePushy;
exports.primaryWindowEventManager = primaryWindowEventManager;