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
	getById(id: number): Promise<Todo> {
		return this.executeQuery("SELECT * FROM todos WHERE id = ?", [id]).then(
			(results) => {
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
			},
		);
	}

	/**
	 * Creates a todo
	 * @param todo
	 * @returns {Promise<Todo>}
	 */
	createTodo(todo: Todo): Promise<Todo> {
		return this.executeQuery(
			"INSERT INTO todos (title, completed, dueDate) VALUES (?, ?, ?)",
			[todo.getTitle(), todo.getCompleted(), todo.getDueDate()],
		).then((results) => {
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
	updateTodo(todo: Todo): Promise<number> {
		return this.executeQuery(
			"UPDATE todos SET title = ?, completed = ?, dueDate = ? WHERE id = ?",
			[
				todo.getTitle(),
				todo.getCompleted(),
				todo.getDueDate(),
				todo.getId(),
			],
		).then((results) => {
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

export default TodosManager;
