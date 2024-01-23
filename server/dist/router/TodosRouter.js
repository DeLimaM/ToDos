"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TodoController_1 = __importDefault(require("../controllers/TodoController"));
class TodoRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.controller = new TodoController_1.default();
        this.initRoutes();
    }
    initRoutes() {
        this.router.get("/todos", this.controller.getAll.bind(this.controller));
        this.router.get("/todos/:id", this.controller.get.bind(this.controller));
        this.router.post("/todos", this.controller.create.bind(this.controller));
        this.router.put("/todos/:id", this.controller.update.bind(this.controller));
        this.router.delete("/todos/:id", this.controller.delete.bind(this.controller));
    }
}
exports.default = TodoRouter;
