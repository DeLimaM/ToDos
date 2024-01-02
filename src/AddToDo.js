import { useState } from "react";

function AddToDo({ onSubmit }) {
	const [newTodo, setNewTodo] = useState("");
	const [dueDate, setNewDueDate] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		if (newTodo === "") return;
		onSubmit(newTodo, dueDate);
		setNewTodo("");
		setNewDueDate("");
	};

	return (
		<form className={"addtodo-container"} onSubmit={handleSubmit}>
			<label htmlFor="todo"></label>
			<input
				type="text"
				id="add-todo-text"
				value={newTodo}
				onChange={(e) => setNewTodo(e.target.value)}
			/>
			<input
				type="date"
				id="due-date"
				value={dueDate}
				onChange={(e) => setNewDueDate(e.target.value)}
			/>
			<button type="submit">
				<i className="icon fa-solid fa-plus"></i>
			</button>
		</form>
	);
}

export default AddToDo;
