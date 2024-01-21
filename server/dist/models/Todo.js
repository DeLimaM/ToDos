"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Todo {
    constructor(id = -1, title, completed, dueDate) {
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
    setTitle(title) {
        this.title = title;
    }
    setCompleted(completed) {
        this.completed = completed;
    }
    setDueDate(dueDate) {
        this.dueDate = dueDate;
    }
}
exports.default = Todo;
