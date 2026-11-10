const { Stage, ConfigReader, ServerQuery, AnimatedActionText } = require('../common.js');
const readline = require('readline/promises');
const Renderer = require('../renderer.js');

class LoginStage extends Stage {
    constructor(login_msg='') { super(); this.msg = login_msg; }

    _handleLoginResponseError(status, statusText) {
        async function _generalError() {
            console.log(`\n\nError whilst logging in: ${status} - ${statusText}`);
            await new Promise(r => setTimeout(r, 5000));
            return new (require('./error.js'))(`${status} - ${statusText}`);
        }
        switch (status) {
            case 400: return new LoginStage('Invalid username or password.');
            case 401: return new LoginStage('Invalid username or password.');
            default: return _generalError();
        }
    }

    async loop() {
        this.displayMsg(`You need to login${this.msg ? ` - ${this.msg}!` : '!'}\n\n${Renderer.Colours.ITALIC}If you do not have an account, please create one by using the Halls desktop application.${Renderer.Colours.RESET}\n\n`);
        
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        process.stdout.write(Renderer.Colours.Cursor.SHOW_CURSOR + Renderer.Colours.Cursor.STOP_CURSOR_TRACKING);
        process.stdin.setRawMode(false);

        const username = await rl.question('Username: ');
        const password = await rl.question(`${Renderer.Colours.Cursor.MOVE_CURSOR_UP()}Password: `);
        rl.close();

        process.stdout.write(`${Renderer.Colours.Cursor.HIDE_CURSOR + Renderer.Colours.Cursor.MOVE_CURSOR_UP(2)}Password: ${'*'.repeat(password.length)}`);
        process.stdout.write(`\n${Renderer.Colours.CLEAR_LINE}\n`);
        const actionText = new AnimatedActionText('Validating with server...');
        actionText.start();
        
        const response = await ServerQuery.POST('login', null, { username, password });
        actionText.stop();

        process.stdin.resume();
        process.stdin.setRawMode(true);

        if (!response.ok) return this._handleLoginResponseError(response.status, response.statusText);
        const json = await response.json();
        ConfigReader.setKey('token', json.token);
        ConfigReader.setKey('username', username);
        return new (require('./connecting.js'))();
    }
}

module.exports = LoginStage;