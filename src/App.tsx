import { useEffect, useState } from "react";
import AddToDo from "./components/AddToDo";
import ToDoList from "./components/ToDoList";
import React from "react";
import ToDo from "./components/types/ToDo";

function App() {
	// define todos as a state variable
	const [todos, setTodos] = useState<ToDo[]>(() => {
		const localData = localStorage.getItem("todos");
		return localData ? JSON.parse(localData) : [];
	});

	// update a todo's title and due date
	function updateToDo(id: number, newTitle: string, newDate: Date | string) {
		const newTodos = [...todos];
		const todo = newTodos.find((todo) => todo.id === id);
		if (todo) {
			todo.title = newTitle;
			todo.dueDate = newDate;
			setTodos(newTodos);
		}
	}

	// add a new todo to the list of todos
	function addToDo(title: string, dueDate: Date | string) {
		setTodos([
			...todos,
			{ id: Date.now(), title: title, completed: false, dueDate: dueDate },
		]);
	}

	// toggle the completion status of a todo
	function toggleCompleted(id: number) {
		const newTodos = [...todos];
		const todo = newTodos.find((todo) => todo.id === id);
		if (todo) {
			todo.completed = !todo.completed;
			setTodos(newTodos);
		}
	}

	// delete a todo from the list of todos
	function deleteToDo(id: number) {
		const newTodos = [...todos];
		const todoIndex = newTodos.findIndex((todo) => todo.id === id);
		newTodos.splice(todoIndex, 1);
		setTodos(newTodos);
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
