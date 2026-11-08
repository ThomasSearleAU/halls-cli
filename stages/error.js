const { Stage } = require("../common.js")
const Renderer = require("../renderer.js")

class ErrorStage extends Stage {
    constructor(message) = { this.message = message; }
    async loop() {
        Renderer.clear();
        Renderer.logo();

        console.log(`An error has occured: ${this.message}`);

        return new Stage();
    }
}

module.exports = ErrorStage