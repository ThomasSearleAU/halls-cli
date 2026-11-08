const Renderer = require('../renderer.js');

class Stage {
    async loop() { return this; }

    displayMsg(message) {
        Renderer.clear();
        Renderer.logo();
        console.log(`\n\n${message}`);
    }
}

class ConfigReader {
    static getLocation() {
        const os = require('os');
        const path = require('path')

        switch (os.type) {
            case 'Linux': return path.join(os.homedir(), '.local', 'share', 'halls');
            case 'Windows_NT': return path.join(os.homedir(), 'AppData', 'Local', 'halls')
            default: throw new Error('Unrecognised operating system.')
        }
    }

    static read() { 
        const fs = require('fs');
        try {
            let config fs.readFileSync(`${ConfigReader.getLocation()}/config.json`) || '{}';
            return JSON.parse(config)
        } catch { return {}; }
    }
    static write(contents) {
        const fs = require('fs');
        fs.writeFileSync(`${ConfigReader.getLocation}/config.json`, JSON.stringify(contents));
    }

    static getKey(key) {
        const config = ConfigReader.read();
        return config[key];
    }

    static setKey(key, name) {
        const config = ConfigReader.read();
        config[key] = name;
        ConfigReader.write(config);
    }
}

class ServerQuery {
    static SERVER_URL = "https://halls.theadelaidegame.org";

    static async GET(path, token=null, params={}) {
        const paramsFormatted = new URLSearchParams(params).toString();
        const url = `${ServerQuery.SERVER_URL}/${path}${paramsFormatted ? `?${paramsFormatted}` : ''}`;
        const response = await fetch(url, {
            headers: token ? { Authorization: `Bearer ${token}`} : {}
        });
        return response;
    }

    static async POST(path, token=null, body={}) {
        const headers = { 'Content-Type': 'application/json' }
        if (token) headers['Authorization'] = `Bearer ${token}`;
        const response = await fetch(`${ServerQuery.SERVER_URL}/${path}`, {
            headers: headers,
            method: 'POST',
            body: JSON.stringify(body)
        });
        return response;
    }
}

module.exports = { Stage, ConfigReader, ServerQuery }