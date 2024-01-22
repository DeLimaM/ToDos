import { useEffect, useState } from "react";
import AddToDo from "./components/AddToDo.tsx";
import ToDoList from "./components/ToDoList.tsx";
import React from "react";
import ToDo from "./components/types/ToDo";

function App() {
	// define todos as a state variable
	const [todos, setTodos] = useState<ToDo[]>([]);

	// update a todos title and due date
	async function updateToDo(
		id: number,
		newTitle: string,
		newDate: Date | string,
	) {
		const todoToUpdate = todos.find((todo) => todo.id === id);
		if (todoToUpdate) {
			// if the todo exists, update it
			todoToUpdate.title = newTitle;
			todoToUpdate.dueDate = newDate;
			const res = await fetch(`http://localhost:5000/todos/${id}`, {
				method: "PUT",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify(todoToUpdate),
			});
			const data = await res.json();
			setTodos([...todos, data]);
		}
	}

	// add a new todo to the list of todos
	async function addToDo(title: string, dueDate: Date | string) {
		const newTodo = { title, dueDate, completed: false };
		const res = await fetch("http://localhost:5000/todos", {
			method: "POST",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify(newTodo),
		});
		const data = await res.json();
		setTodos([...todos, data]);
	}

	// toggle the completion status of a todo
	async function toggleCompleted(id: number) {
		const todoToToggle = todos.find((todo: { id: number }) => todo.id === id);
		if (todoToToggle) {
			// if the todo exists, toggle its completed status
			todoToToggle.completed = !todoToToggle.completed;
			const res = await fetch(`http://localhost:5000/todos/${id}`, {
				method: "PUT",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify(todoToToggle),
			});
			if (res.ok) {
				// if the response is ok, update the todos state
				setTodos([...todos.filter((todo) => todo.id !== id), todoToToggle]);
			}
		}
	}

	// delete a todo from the list of todos
	async function deleteToDo(id: number) {
		const res = await fetch(`http://localhost:5000/todos/${id}`, {
			method: "DELETE",
		});
		if (res.ok) {
			setTodos(todos.filter((todo) => todo.id !== id));
		}
	}

	// save todos to local storage each time todos changes
	useEffect(() => {
		localStorage.setItem("todos", JSON.stringify(todos));
	}, [todos]);

	// render the components
	return (
		<>
			<AddToDo onSubmit={addToDo} />
			<ToDoList
				todos={todos}
				toggleCompleted={toggleCompleted}
				deleteToDo={deleteToDo}
				updateToDo={updateToDo}
			/>
		</>
	);
}

export default App;
