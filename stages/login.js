const { Stage, ConfigReader, ServerQuery, AnimatedActionText } = require('../common.js');
const readline = require('readline/promises');
const Renderer = require('../renderer.js');

class LoginStage extends Stage {
    constructor(login_msg='') { super(); this.msg = login_msg; }
    async loop() {
        this.displayMsg(`You need to login${this.msg ? ` - ${this.msg}!` : '!'}\n\nIf you do not have an account, please create one by using the Halls desktop application.\n`);
        
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        const username = await rl.question('Username: ');
        const password = await rl.question('Password: ');
        rl.close()
        process.stdout.write(`${Renderer.Colours.MOVE_CURSOR_UP()}Password: ${'*'.repeat(password.length)}\n\n`);
        const actionText = new AnimatedActionText('Validating with server...');
        actionText.start();
        
        const response = await ServerQuery.POST('login', null, { username, password });
        actionText.stop();

        if (!response.ok) {
            console.log(`\n\nError whilst logging in: ${response.status} - ${response.statusText}`);
            await new Promise(r => setTimeout(r, 5000));
            return new (require('./error.js'))(`${response.status} - ${response.statusText}`);
        }
        const json = await response.json();
        ConfigReader.setKey('token', json.token);
        ConfigReader.setKey('username', username);
        return new (require('./connecting.js'))();
    }
}

module.exports = LoginStage;