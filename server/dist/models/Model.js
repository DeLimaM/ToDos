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
const Config_1 = require("../config/Config");
class Model {
    constructor() {
        this.db = null;
        this.getDb();
    }
    /**
     * Returns the database connection
     * @private
     */
    getDb() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.db === null) {
                const config = new Config_1.Config();
                const mySql = require("mysql2/promise");
                const connectionOptions = {
                    host: config.getDbHost(),
                    port: config.getDbPort(),
                    database: config.getDbName(),
                    user: config.getDbUser(),
                    password: config.getDbPassword(),
                    rowsAsArray: true,
                };
                this.db = yield mySql.createConnection(connectionOptions);
            }
            return this.db;
        });
    }
    /**
     * Executes a query
     * @param query
     * @param params
     * @protected
     */
    executeQuery(query, params = []) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.db) {
                let results;
                if (params.length === 0) {
                    [results] = yield this.db.query(query);
                }
                else {
                    [results] = yield this.db.execute(query, params);
                }
                return results;
            }
            else {
                return Promise.reject(new Error("Database connection is not established"));
            }
        });
    }
}
exports.default = Model;
