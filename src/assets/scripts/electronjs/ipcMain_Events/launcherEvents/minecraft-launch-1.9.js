const {exec} = require("child_process");


module.exports = {
    name: "minecraft-launch-1.9", once: false, execute() {
        exec('cd && java -jar CMCL.jar 1.9');
    }
}