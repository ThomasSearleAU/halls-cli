const ConnectingStage = require('./stages/connecting.js');

let stage = new ConnectingStage();

async function run() {
    while (true) {
        stage = await stage.loop();
        await new Promise(r => setTimeout(r, 33));
    }
}

run();