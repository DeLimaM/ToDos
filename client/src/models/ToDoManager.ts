import ToDo from "../components/types/ToDo.ts";

const API_URL = "http://localhost:5000/todos";

class ToDoManager {
	static async getAll(): Promise<ToDo[]> {
		const res = await fetch(API_URL);
		if (res.ok) {
			return res.json();
		}
		throw new Error(`Error fetching todos: ${res}`);
	}

	static async add(todo: ToDo): Promise<ToDo> {
		const res = await fetch(API_URL, {
			method: "POST",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify(todo),
		});
		if (res.ok) {
			return res.json();
		}
		throw new Error(`Error adding todo: ${res}`);
	}

	static async update(todo: ToDo): Promise<void> {
		const res = await fetch(`${API_URL}/${todo.id}`, {
			method: "PUT",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify(todo),
		});
		if (res.ok) {
			return res.json();
		}
		throw new Error(`Error updating todo: ${res}`);
	}

	static async delete(id: number) {
		await fetch(`${API_URL}/${id}`, {
			method: "DELETE",
		});
	}
}

export default ToDoManager;
