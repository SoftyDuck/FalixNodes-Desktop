const log = require("electron-log");
module.exports = {
    name: "logout", once: false, execute(ses, app) {
        log.info("Goodbye! *kisses*")
        app.relaunch({args: process.argv.slice(1).concat(['--relaunch'])});
        app.exit(0);
    }
}