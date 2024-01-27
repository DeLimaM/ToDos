"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const TodosRouter_1 = __importDefault(require("./router/TodosRouter"));
const cors_1 = __importDefault(require("cors"));
const Logger_1 = __importDefault(require("./logging/Logger"));
const app = (0, express_1.default)();
const todosRouter = new TodosRouter_1.default();
const logger = new Logger_1.default();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(todosRouter.router);
logger.Log("Server started");
app.listen(5000, () => {
    logger.Log("Server listening on port 5000");
});
