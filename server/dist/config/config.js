"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
const promises_1 = require("node:fs/promises");
const ini_1 = require("ini");
const configPath = "dev.ini";
class Config {
    constructor() {
        this.dbDsn = "unset";
        this.dbUser = "unset";
        this.dbPassword = "unset";
        this.init();
    }
    /**
     * Initializes the config object
     * @private
     */
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            const config = yield this.parseIniFile(configPath);
            this.dbDsn = config.dbDsn;
            this.dbUser = config.dbUser;
            this.dbPassword = config.dbPassword;
        });
    }
    /**
     * Parses an ini file and returns a key-value object
     * @param filePath
     * @private
     */
    parseIniFile(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            const fileContent = yield (0, promises_1.readFile)(filePath, "utf-8");
            return (0, ini_1.parse)(fileContent);
        });
    }
    getDbDsn() {
        return this.dbDsn;
    }
    getDbUser() {
        return this.dbUser;
    }
    getDbPassword() {
        return this.dbPassword;
    }
}
exports.Config = Config;
