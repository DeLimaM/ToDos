"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Model_1 = __importDefault(require("./Model"));
class Todo extends Model_1.default {
    constructor(id, title, completed, dueDate) {
        super();
        this.id = id;
        this.title = title;
        this.completed = completed;
        this.dueDate = dueDate;
    }
    getId() {
        return this.id;
    }
    getTitle() {
        return this.title;
    }
    getCompleted() {
        return this.completed;
    }
    getDueDate() {
        return this.dueDate;
    }
    setId(id) {
        this.id = id;
    }
}
exports.default = Todo;
