const { exec } = require("child_process");
module.exports = {
    name: "enableVPN", once: false, execute() {
        switch (process.platform) {
            case "linux":
                exec("mullvad disconnect")
                break
            case "win32":
                exec(`
      cd\Program Files\Mullvad VPN\resources
      mullvad disconnect
    `);
                break
        }
    }
}