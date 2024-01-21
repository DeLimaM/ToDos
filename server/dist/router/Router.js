"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UsersRoute_1 = __importDefault(require("./routes/UsersRoute"));
const TodosRoute_1 = __importDefault(require("./routes/TodosRoute"));
class ApiRouter {
    constructor() {
        this.router = express_1.default.Router();
        this.usersRoute = new UsersRoute_1.default();
        this.todosRoute = new TodosRoute_1.default();
        this.initializeRoutes();
    }
    /**
     * Initializes the routes
     * @private
     */
    initializeRoutes() {
        this.router.use("/users", this.usersRoute.router);
        this.router.use("/todos", this.todosRoute.router);
    }
}
exports.default = ApiRouter;
