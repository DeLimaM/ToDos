"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    /**
     * Constructor for User
     * @param id
     * @param username
     * @param password
     */
    constructor(id, username, password) {
        this.id = id;
        this.username = username;
        this.password = password;
    }
    getId() {
        return this.id;
    }
    getUsername() {
        return this.username;
    }
    getPassword() {
        return this.password;
    }
    setId(id) {
        this.id = id;
    }
    setUsername(username) {
        this.username = username;
    }
    setPassword(password) {
        this.password = password;
    }
}
exports.default = User;
