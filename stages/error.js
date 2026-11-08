const { Stage } = require("../common.js")
const Renderer = require("../renderer.js")

class ErrorStage extends Stage {
    constructor(message) { super(); this.message = message; }
    async loop() {
        Renderer.clear();
        Renderer.logo();

        console.log(`\nAn error has occured: ${this.message}`);

        return new Stage();
    }
}

module.exports = ErrorStage