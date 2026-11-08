const { Stage } = require('../common.js');

class LoginStage extends Stage {
    constructor(login_msg='') { this.msg = login_msg; }
    async loop() {
        this.displayMsg(`You need to login${this.msg ? ` - ${this.msg}!` : '!'}`);
        return new Stage();
    }
}

module.exports = LoginStage;