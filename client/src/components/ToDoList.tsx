import React, { useEffect, useState } from "react";
import ToDoItem from "./ToDoItem.tsx";
import ToDo from "./types/ToDo.ts";
import ToDoManager from "../models/ToDoManager.ts";

function ToDoList() {
	// define todos as a state variable
	const [todos, setTodos] = useState<ToDo[]>([]);

	// fetch todos from the server when the component mounts
	useEffect(() => {
		ToDoManager.getAll().then((todos) => setTodos(todos));
	}, []);

	// update the todo when the completed status is changed
	function onCompletedChange(prevTodo: ToDo) {
		const updatedTodo = { ...prevTodo, completed: !prevTodo.completed };
		setTodos(
			todos.map((todo) => {
				return todo.id === updatedTodo.id ? updatedTodo : todo;
			})
		);
		ToDoManager.update(updatedTodo);
	}

	// Render the list of todos
	return (
		<ul className="todo-list">
			{todos.length === 0 && <p className="no-todos">No todos yet!</p>}
			{todos.map((todo) => (
				<ToDoItem
					key={todo.id}
					todo={todo}
					onUpdate={ToDoManager.update}
					onDelete={ToDoManager.delete}
					onCompletedChange={onCompletedChange}
				/>
			))}
		</ul>
	);
}

export default ToDoList;
