import { Request, Response } from "express";
import Todo from "../models/Todo";
import TodosManager from "../models/TodosManager";
import Logger from "../logging/Logger";

class TodoController {
	private todosManager: TodosManager = new TodosManager();

	async getAll(req: Request, res: Response) {
		Logger.Log(`${req.method} ${req.url} - Getting all todos`);
		const todos = await this.todosManager.getAll();
		res.json(todos);
	}

	async get(req: Request, res: Response) {
		Logger.Log(
			`${req.method} ${req.url} - Getting todo with id ${req.params.id}`
		);
		const todoItem = await this.todosManager.getById(Number(req.params.id));
		res.json(todoItem);
	}

	async create(req: Request, res: Response) {
		Logger.Log(`${req.method} ${req.url} - Creating new todo`);
		const newTodo = await this.todosManager.create(
			new Todo(0, req.body.title, req.body.completed, req.body.dueDate)
		);
		res.json(newTodo);
	}

	async update(req: Request, res: Response) {
		Logger.Log(
			`${req.method} ${req.url} - Updating todo with id ${req.params.id}`
		);
		const updatedTodo = await this.todosManager.update(
			new Todo(
				Number(req.params.id),
				req.body.title,
				req.body.completed,
				req.body.dueDate
			)
		);
		res.json(updatedTodo);
	}

	async delete(req: Request, res: Response) {
		Logger.Log(
			`${req.method} ${req.url} - Deleting todo with id ${req.params.id}`
		);
		await this.todosManager.delete(Number(req.params.id));
		res.json({});
	}
}

export default TodoController;
