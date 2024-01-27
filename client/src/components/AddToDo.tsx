import React, { FormEvent } from "react";
import { useState } from "react";

function AddToDo() {
	const [newTodo, setNewTodo] = useState("");
	const [dueDate, setNewDueDate] = useState("");

	async function onSubmit(title: string, dueDate: Date | string) {
		const newTodo = { title, dueDate, completed: false };
		const res = await fetch("http://localhost:5000/todos", {
			method: "POST",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify(newTodo),
		});
	}

	// Handle the submission of the form
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (newTodo === "") return;
		// format the date to get only (yyyy-mm-dd)
		let formattedDate =
			dueDate === ""
				? "no-date"
				: new Date(dueDate).toISOString().substring(0, 10);
		onSubmit(newTodo, formattedDate);
		setNewTodo("");
		setNewDueDate("");
	};

	// Render the form
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
