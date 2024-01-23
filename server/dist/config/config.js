"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
const fs_1 = require("fs");
const ini_1 = require("ini");
const configPath = "config/dev.ini";
class Config {
    constructor() {
        this.dbHost = "host not set";
        this.dbPort = -1;
        this.dbName = "name not set";
        this.dbUser = "user not set";
        this.dbPassword = "password not set";
        this.parseIniFile();
    }
    parseIniFile() {
        try {
            const data = (0, fs_1.readFileSync)(configPath, "utf-8");
            const parsed = (0, ini_1.parse)(data);
            this.dbHost = parsed.DB.host;
            this.dbPort = parseInt(parsed.DB.port);
            this.dbName = parsed.DB.name;
            this.dbUser = parsed.DB.username;
            this.dbPassword = parsed.DB.password;
        }
        catch (err) {
            console.log(err);
        }
    }
    getDbHost() {
        return this.dbHost;
    }
    getDbPort() {
        return this.dbPort;
    }
    getDbName() {
        return this.dbName;
    }
    getDbUser() {
        return this.dbUser;
    }
    getDbPassword() {
        return this.dbPassword;
    }
}
exports.Config = Config;
