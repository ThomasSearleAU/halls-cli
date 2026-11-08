const { Stage, ConfigReader, ServerQuery } = require('../common.js');

class ConnectingStage extends Stage {
    async loop() {
        this.displayMsg('Connecting to server...')

        let response = await ServerQuery.GET('');
        if (!response.ok) return new (require('./error.js'))(`Error whilst connecting to server: ${response.status} - ${response.statusText}`);

        this.displayMsg('Server is operationl!')

        const token = ConfigReader.getKey('token');
        const username = ConfigReader.getKey('username');

        if (!token || !username) return new (require('./login.js'))();

        this.displayMsg('Checking credentials with server...')

        response = await ServerQuery.GET('check-token', token, { username });
        if (!response.ok) return new (require('./login.js'))(`Invalid credentials.`);

        let json = await response.json();
        if (!json.username || json.username != username) return new (require('./login.js'))('Invalid credentials.');

        this.displayMsg('Connected!');
        return new Stage();
    }
}

module.exports = ConnectingStage