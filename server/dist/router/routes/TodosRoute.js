"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(require("../Route"));
const TodosManager_1 = __importDefault(require("../../models/TodosManager"));
class TodosRoute extends Route_1.default {
    constructor() {
        super();
        this.todosManager = new TodosManager_1.default();
    }
    initializeRoutes() {
        this.router.get("/todos", (req, res) => {
            this.todosManager.getAllTodos().then((todos) => {
                res.json(todos);
            });
        });
    }
}
exports.default = TodosRoute;
