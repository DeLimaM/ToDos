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
    getAllTodos() {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield this.executeQuery("SELECT * FROM todos");
            const todos = [];
            if (Array.isArray(results)) {
                for (const result of results) {
                    if ("id" in result &&
                        "title" in result &&
                        "completed" in result &&
                        "dueDate" in result) {
                        const todo = new Todo_1.default(result.id, result.title, result.completed, result.dueDate);
                        todos.push(todo);
                    }
                }
            }
            return todos;
        });
    }
    /**
     * Returns a todo by its id
     * @param id
     * @returns {Promise<Todo>}
     */
    getById(id) {
        return this.executeQuery("SELECT * FROM todos WHERE id = ?", [id]).then((results) => {
            if (Array.isArray(results) && results.length > 0) {
                const result = results[0];
                if ("id" in result &&
                    "title" in result &&
                    "completed" in result &&
                    "dueDate" in result) {
                    return new Todo_1.default(result.id, result.title, result.completed, result.dueDate);
                }
            }
            throw new Error("Todo not found");
        });
    }
    /**
     * Creates a todo
     * @param todo
     * @returns {Promise<Todo>}
     */
    createTodo(todo) {
        return this.executeQuery("INSERT INTO todos (title, completed, dueDate) VALUES (?, ?, ?)", [todo.getTitle(), todo.getCompleted(), todo.getDueDate()]).then((results) => {
            if (Array.isArray(results)) {
                const result = results[0];
                if ("insertId" in result) {
                    todo.setId(result.insertId);
                    return todo;
                }
            }
            throw new Error("Todo not created");
        });
    }
    /**
     * Updates a todo
     * @param todo
     * @returns {Promise<number>}
     */
    updateTodo(todo) {
        return this.executeQuery("UPDATE todos SET title = ?, completed = ?, dueDate = ? WHERE id = ?", [
            todo.getTitle(),
            todo.getCompleted(),
            todo.getDueDate(),
            todo.getId(),
        ]).then((results) => {
            if (Array.isArray(results)) {
                const result = results[0];
                if ("affectedRows" in result) {
                    return result.affectedRows;
                }
            }
            throw new Error("Todo not updated");
        });
    }
}
exports.default = TodosManager;
