const {exec} = require("child_process");


module.exports = {
    name: "minecraft-launch-1.2.4", once: false, execute() {
        exec('cd && java -jar CMCL.jar 1.2.4');
    }
}