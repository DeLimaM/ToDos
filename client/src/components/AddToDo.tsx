import React, {FormEvent} from "react";
import { useState } from "react";
import AddToDoProps from "./types/AddToDoProps";

function AddToDo({ onSubmit }: AddToDoProps) {
	const [newTodo, setNewTodo] = useState("");
	const [dueDate, setNewDueDate] = useState("");

	// Handle the submission of the form
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (newTodo === "") return;
		dueDate === "" ? onSubmit(newTodo, "no-date") :
		onSubmit(newTodo, new Date(dueDate));
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
