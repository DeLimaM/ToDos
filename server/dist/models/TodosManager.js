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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Model_1 = __importDefault(require("./Model"));
const Todo_1 = __importDefault(require("./Todo"));
class TodosManager extends Model_1.default {
    constructor() {
        super();
    }
    /**
     * Returns all todos
     * @returns {Promise<Todo[]>}
     */
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const req = "SELECT * FROM todos";
            const todos = yield this.executeQuery(req);
            return todos.map((todo) => {
                return new Todo_1.default(todo[0], todo[1], todo[2], todo[3]);
            });
        });
    }
    /**
     * Returns a todo by its id
     * @param id
     * @returns {Promise<Todo>}
     */
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const req = "SELECT * FROM todos WHERE id = ?";
            const todos = yield this.executeQuery(req, [id]);
            if (todos.length === 0) {
                return Promise.reject(new Error("Todo not found"));
            }
            else {
                const todo = todos[0];
                return new Todo_1.default(todo[0], todo[1], todo[2], todo[3]);
            }
        });
    }
    /**
     * Creates a todo
     * @param todo
     * @returns {Promise<Todo>}
     */
    create(todo) {
        return __awaiter(this, void 0, void 0, function* () {
            const req = "INSERT INTO todos (title, completed, dueDate) VALUES (?, ?, ?)";
            const result = yield this.executeQuery(req, [
                todo.title,
                todo.completed,
                todo.dueDate,
            ]);
            return new Todo_1.default(result.insertId, todo.title, todo.completed, todo.dueDate);
        });
    }
    /**
     * Updates a todo
     * @param todo
     * @returns {Promise<number>}
     */
    update(todo) {
        return __awaiter(this, void 0, void 0, function* () {
            const req = "UPDATE todos SET title = ?, completed = ?, dueDate = ? WHERE id = ?";
            const result = yield this.executeQuery(req, [
                todo.title,
                todo.completed,
                todo.dueDate,
                todo.id,
            ]);
            return result.affectedRows;
        });
    }
    /**
     * Deletes a todo
     * @param id
     * @returns {Promise<number>}
     */
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const req = "DELETE FROM todos WHERE id = ?";
            const result = yield this.executeQuery(req, [id]);
            return result.affectedRows;
        });
    }
}
exports.default = TodosManager;
