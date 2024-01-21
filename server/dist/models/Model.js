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
const config_1 = require("../config/config");
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
        if (this.db === null) {
            const config = new config_1.Config();
            const dbDsn = config.getDbDsn();
            const dbUser = config.getDbUser();
            const dbPassword = config.getDbPassword();
            this.db = require("mysql2/promise.js")({
                host: dbDsn,
                user: dbUser,
                password: dbPassword,
                database: "todos",
            });
        }
        return this.db;
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
                if (params.length === 0) {
                    const [results] = yield this.db.query(query);
                    return results;
                }
                else {
                    const [results] = yield this.db.execute(query, params);
                    return results;
                }
            }
            else {
                return Promise.reject(new Error("Database connection is not established"));
            }
        });
    }
}
exports.default = Model;
