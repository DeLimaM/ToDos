import { Request, Response } from "express";
import Todo from "../models/Todo";
import TodosManager from "../models/TodosManager";

class TodoController {
	private todosManager: TodosManager = new TodosManager();

	async getAll(req: Request, res: Response) {
		const todos = await this.todosManager.getAllTodos();
		res.json(todos);
	}

	async get(req: Request, res: Response) {
		const todoItem = await this.todosManager.getById(Number(req.params.id));
		res.json(todoItem);
	}

	async create(req: Request, res: Response) {
		const newTodo = await this.todosManager.createTodo(
			new Todo(0, req.body.title, req.body.completed, req.body.dueDate),
		);
		res.json(newTodo);
	}

	async update(req: Request, res: Response) {
		const updatedTodo = await this.todosManager.updateTodo(
			new Todo(
				Number(req.params.id),
				req.body.title,
				req.body.completed,
				req.body.dueDate,
			),
		);
		res.json(updatedTodo);
	}

	async delete(req: Request, res: Response) {
		await this.todosManager.deleteTodo(Number(req.params.id));
		res.json({ message: "Todo deleted" });
	}
}

export default TodoController;
