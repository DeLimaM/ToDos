import Model from "./Model";
import Todo from "./Todo";

class TodosManager extends Model {
	constructor() {
		super();
	}

	/**
	 * Returns all todos
	 * @returns {Promise<Todo[]>}
	 */
	async getAllTodos(): Promise<Todo[]> {
		const results = await this.executeQuery("SELECT * FROM todos");
		const todos: Todo[] = [];
		if (Array.isArray(results)) {
			for (const result of results) {
				if (
					"id" in result &&
					"title" in result &&
					"completed" in result &&
					"dueDate" in result
				) {
					const todo = new Todo(
						result.id,
						result.title,
						result.completed,
						result.dueDate,
					);
					todos.push(todo);
				}
			}
		}
		return todos;
	}

	/**
	 * Returns a todo by its id
	 * @param id
	 * @returns {Promise<Todo>}
	 */
	async getById(id: number): Promise<Todo> {
		const results = await this.executeQuery(
			"SELECT * FROM todos WHERE id = ?",
			[id],
		);
		if (Array.isArray(results) && results.length > 0) {
			const result = results[0];
			if (
				"id" in result &&
				"title" in result &&
				"completed" in result &&
				"dueDate" in result
			) {
				return new Todo(
					result.id,
					result.title,
					result.completed,
					result.dueDate,
				);
			}
		}
		throw new Error("Todo not found");
	}

	/**
	 * Creates a todo
	 * @param todo
	 * @returns {Promise<Todo>}
	 */
	async createTodo(todo: Todo): Promise<Todo> {
		const results = await this.executeQuery(
			"INSERT INTO todos (title, completed, dueDate) VALUES (?, ?, ?)",
			[todo.getTitle(), todo.getCompleted(), todo.getDueDate()],
		);
		if (Array.isArray(results)) {
			const result_3 = results[0];
			if ("insertId" in result_3) {
				todo.setId(result_3.insertId);
				return todo;
			}
		}
		throw new Error("Todo not created : ");
	}

	/**
	 * Updates a todo
	 * @param todo
	 * @returns {Promise<number>}
	 */
	async updateTodo(todo: Todo): Promise<number> {
		const results = await this.executeQuery(
			"UPDATE todos SET title = ?, completed = ?, dueDate = ? WHERE id = ?",
			[
				todo.getTitle(),
				todo.getCompleted(),
				todo.getDueDate(),
				todo.getId(),
			],
		);
		if (Array.isArray(results)) {
			const result_4 = results[0];
			if ("affectedRows" in result_4) {
				return result_4.affectedRows;
			}
		}
		throw new Error("Todo not updated");
	}

	/**
	 * Deletes a todo
	 * @param id
	 * @returns {Promise<number>}
	 */
	async deleteTodo(id: number): Promise<number> {
		const results = await this.executeQuery(
			"DELETE FROM todos WHERE id = ?",
			[id],
		);
		if (Array.isArray(results)) {
			const result = results[0];
			if ("affectedRows" in result) {
				return result.affectedRows;
			}
		}
		throw new Error("Todo not deleted");
	}
}

export default TodosManager;
