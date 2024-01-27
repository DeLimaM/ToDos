import { format } from "date-fns";
import {
	MouseEvent,
	KeyboardEvent,
	FocusEvent,
	ChangeEvent,
	useState,
} from "react";
import ToDoItemProps from "./types/ToDoItemProps.ts";
import React from "react";

function ToDoItem({
	key,
	todo,
	onDelete,
	onUpdate,
	onCompletedChange,
}: ToDoItemProps) {
	// define title and date as state variables
	const [date, setDate] = useState(todo.dueDate ? todo.dueDate : "no-date");
	const [title, setTitle] = useState(todo.title);

	// update the todo when the title is changed
	function handleTitleBlur(event: FocusEvent<HTMLElement>) {
		let newTitle = event.target.innerHTML;
		if (newTitle === "") {
			alert("Please enter a title");
			event.target.innerHTML = title;
		} else {
			setTitle(newTitle);
			onUpdate({ ...todo, title: newTitle });
		}
	}

	// update the todo date field when the due date is being edited
	function handleDateChange(event: ChangeEvent<HTMLInputElement>) {
		let newDate = event.target.value;
		setDate(newDate);
	}

	// update the todo date when the due date is changed
	function handleDateBlur(event: FocusEvent<HTMLInputElement>) {
		if (date !== "no-date" && date < format(new Date(), "yyyy-MM-dd")) {
			alert("Please enter a valid date");
			setDate(todo.dueDate);
		} else {
			onUpdate({ ...todo, dueDate: date });
		}
	}

	// prevent the user from entering a new line in the title field
	function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
		if (event.key === "Enter") {
			event.preventDefault();
			(event.target as HTMLElement).innerHTML = (
				event.target as HTMLElement
			).innerHTML.replace(
				/&[^;]+;/g, // replace HTML entities
				"",
			);
			(event.target as HTMLElement).blur();
		}
	}

	// add the current date to the todo if no date is set
	function handleAddDate(event: MouseEvent<HTMLButtonElement>) {
		setDate(format(new Date(), "yyyy-MM-dd"));
		onUpdate({ ...todo, dueDate: format(new Date(), "yyyy-MM-dd") });
	}

	// remove the date from the todo if a date is set
	function handleRemoveDate(event: MouseEvent<HTMLButtonElement>) {
		setDate("no-date");
		onUpdate({ ...todo, dueDate: "no-date" });
	}

	// render the todo item
	return (
		<li className={`todo-item ${todo.completed ? "checked-item" : ""}`}>
			<input
				className="todo-checkbox"
				type="checkbox"
				id={`todo-${todo.id}`}
				value="todo"
				name="todo"
				checked={todo.completed}
				onChange={() => onCompletedChange(todo)}
			/>
			<label
				className="todo-label"
				onBlur={handleTitleBlur}
				onKeyDown={handleKeyDown}
				contentEditable={!todo.completed}
				suppressContentEditableWarning={true}
				spellCheck="false"
			>
				{todo.title}
			</label>
			<div className="date-container">
				{date !== "no-date" ? (
					<>
						<button
							className="remove-date-button"
							onClick={handleRemoveDate}
							disabled={todo.completed}
						>
							<i className="icon fa-solid fa-xmark"></i>
						</button>
						<input
							className="todo-due-date"
							type="date"
							value={date.toString()}
							onChange={handleDateChange}
							onBlur={handleDateBlur}
							onKeyDown={handleKeyDown}
							disabled={todo.completed}
						/>
					</>
				) : (
					<button
						className="add-date-button"
						onClick={handleAddDate}
						disabled={todo.completed}
					>
						Add Date
					</button>
				)}
			</div>
			<button className="todo-button" onClick={() => onDelete(todo.id)}>
				<i className="icon fa-solid fa-trash"></i>
			</button>
		</li>
	);
}

export default ToDoItem;
