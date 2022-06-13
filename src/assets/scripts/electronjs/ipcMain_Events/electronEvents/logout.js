const log = require("electron-log");
const { info } = require("electron-log");
module.exports = {
    name: "logout", once: false, execute(ses, app) {
        ses.clearCache().then(() => log,info("Temporary cache has been cleared"));
        log.info('LOGGING OUT');
    }
}