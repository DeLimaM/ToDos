import { useEffect, useState } from "react";
import AddToDo from "./AddToDo";
import ToDoList from "./ToDoList";

function App() {
	// define todos as a state variable
	const [todos, setTodos] = useState(() => {
		const localData = localStorage.getItem("todos");
		return localData ? JSON.parse(localData) : [];
	});

	// update a todo's title and due date
	function updateToDo(id, newTitle, newDate) {
		const newTodos = [...todos];
		const todo = newTodos.find((todo) => todo.id === id);
		todo.title = newTitle;
		todo.dueDate = newDate;
		setTodos(newTodos);
	}

	// add a new todo to the list of todos
	function addToDo(newTodo, dueDate) {
		setTodos([
			...todos,
			{ id: Date.now(), title: newTodo, completed: false, dueDate: dueDate },
		]);
	}

	// toggle the completion status of a todo
	function toggleCompleted(id) {
		const newTodos = [...todos];
		const todo = newTodos.find((todo) => todo.id === id);
		todo.completed = !todo.completed;
		setTodos(newTodos);
	}

	// delete a todo from the list of todos
	function deleteTodo(id) {
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
				deleteTodo={deleteTodo}
				updateToDo={updateToDo}
			/>
		</>
	);
}

export default App;
