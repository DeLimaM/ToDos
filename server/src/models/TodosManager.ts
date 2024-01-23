import Model from "./Model";
import Todo from "./Todo";
import { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import Logger from "../logging/Logger";

class TodosManager extends Model {
	constructor() {
		super();
	}

	/**
	 * Returns all todos
	 * @returns {Promise<Todo[]>}
	 */
	async getAll(): Promise<Todo[]> {
		Logger.Log("Called TodosManager.getAll()");
		const req = "SELECT * FROM todos";
		const todos = await this.executeQuery<RowDataPacket[]>(req);
		return todos.map((todo) => {
			return new Todo(
				todo[0] as number,
				todo[1] as string,
				todo[2] as boolean,
				todo[3] as Date,
			);
		});
	}

	/**
	 * Returns a todo by its id
	 * @param id
	 * @returns {Promise<Todo>}
	 */
	async getById(id: number): Promise<Todo> {
		Logger.Log(`Called TodosManager.getById(${id})`);
		const req = "SELECT * FROM todos WHERE id = ?";
		const todos = await this.executeQuery<RowDataPacket[]>(req, [id]);
		if (todos.length === 0) {
			return Promise.reject(new Error("Todo not found"));
		} else {
			const todo = todos[0];
			return new Todo(
				todo[0] as number,
				todo[1] as string,
				todo[2] as boolean,
				todo[3] as Date,
			);
		}
	}

	/**
	 * Creates a todo
	 * @param todo
	 * @returns {Promise<Todo>}
	 */
	async create(todo: Todo): Promise<Todo> {
		Logger.Log(`Called TodosManager.create(${todo.toString()})`);
		const req =
			"INSERT INTO todos (title, completed, dueDate) VALUES (?, ?, ?)";
		const result = await this.executeQuery<ResultSetHeader>(req, [
			todo.title,
			todo.completed,
			todo.dueDate,
		]);
		return new Todo(
			result.insertId,
			todo.title,
			todo.completed,
			todo.dueDate,
		);
	}

	/**
	 * Updates a todo
	 * @param todo
	 * @returns {Promise<number>}
	 */
	async update(todo: Todo): Promise<number> {
		Logger.Log(`Called TodosManager.update(${todo.toString()})`);
		const req =
			"UPDATE todos SET title = ?, completed = ?, dueDate = ? WHERE id = ?";
		const result = await this.executeQuery<ResultSetHeader>(req, [
			todo.title,
			todo.completed,
			todo.dueDate,
			todo.id,
		]);
		return result.affectedRows;
	}

	/**
	 * Deletes a todo
	 * @param id
	 * @returns {Promise<number>}
	 */
	async delete(id: number): Promise<number> {
		Logger.Log(`Called TodosManager.delete(${id})`);
		const req = "DELETE FROM todos WHERE id = ?";
		const result = await this.executeQuery<ResultSetHeader>(req, [id]);
		return result.affectedRows;
	}
}

export default TodosManager;
