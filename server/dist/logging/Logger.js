"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class Logger {
    constructor() {
        this.Clear();
    }
    Log(message) {
        this.Write("LOG", message);
    }
    Write(level, message) {
        const log = `${new Date().toLocaleTimeString()} - ${level} - ${message}\n`;
        fs_1.default.appendFile(path_1.default.join(__dirname, "../../logs/logs.txt"), log, (err) => {
            if (err) {
                console.error(`Failed to write to log file: ${err}`);
            }
        });
    }
    Clear() {
        fs_1.default.writeFile(path_1.default.join(__dirname, "../../logs/logs.txt"), "", (err) => {
            if (err) {
                console.error(`Failed to clear log file: ${err}`);
            }
        });
    }
}
exports.default = Logger;
