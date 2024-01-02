import { format } from "date-fns";
import { useState } from "react";

function ToDoItem(props) {
	// define title and date as state variables
	const [date, setDate] = useState(
		props.todo.dueDate ? props.todo.dueDate : "no-date",
	);
	const [title, setTitle] = useState(props.todo.title);

	// update the todo when the title is changed
	function handleTitleBlur(event) {
		let newTitle = event.target.innerHTML;
		if (newTitle === "") {
			alert("Please enter a title");
			event.target.innerHTML = title;
		} else {
			setTitle(newTitle);
			props.updateToDo(props.todo.id, newTitle, date);
		}
	}

	// update the todo date field when the due date is being edited
	function handleDateChange(event) {
		let newDate = event.target.value;
		setDate(newDate);
	}

	// update the todo date when the due date is changed
	function handleDateBlur(event) {
		if (date !== "no-date" && date < format(new Date(), "yyyy-MM-dd")) {
			alert("Please enter a valid date");
			setDate(props.todo.dueDate);
		} else {
			props.updateToDo(props.todo.id, props.todo.title, date);
		}
	}

	// prevent the user from entering a new line in the title field
	function handleKeyDown(event) {
		if (event.key === "Enter") {
			event.preventDefault();
			event.target.innerHTML = event.target.innerHTML.replace(
				/&[^;]+;/g, // replace HTML entities
				"",
			);
			event.target.blur();
		}
	}

	// add the current date to the todo if no date is set
	function handleAddDate(event) {
		setDate(format(new Date(), "yyyy-MM-dd"));
		props.updateToDo(
			props.todo.id,
			props.todo.title,
			format(new Date(), "yyyy-MM-dd"),
		);
	}

	// remove the date from the todo if a date is set
	function handleRemoveDate(event) {
		setDate("no-date");
		props.updateToDo(props.todo.id, props.todo.title, "");
	}

	return (
		<li className={`todo-item ${props.todo.completed ? "checked-item" : ""}`}>
			<input
				className="todo-checkbox"
				type="checkbox"
				id={`todo-${props.todo.id}`}
				value="todo"
				name="todo"
				checked={props.todo.completed}
				onChange={() => props.toggleCompleted(props.todo.id)}
			/>
			<label
				className="todo-label"
				onBlur={handleTitleBlur}
				onKeyDown={handleKeyDown}
				contentEditable={!props.todo.completed}
				suppressContentEditableWarning="true"
				spellCheck="false"
			>
				{props.todo.title}
			</label>
			<div className="date-container">
				{date !== "no-date" ? (
					<>
						<button
							className="remove-date-button"
							onClick={handleRemoveDate}
							disabled={props.todo.completed}
						>
							<i className="icon fa-solid fa-xmark"></i>
						</button>
						<input
							className="todo-due-date"
							type="date"
							value={date}
							onChange={handleDateChange}
							onBlur={handleDateBlur}
							onKeyDown={handleKeyDown}
							disabled={props.todo.completed}
						/>
					</>
				) : (
					<button
						className="add-date-button"
						onClick={handleAddDate}
						disabled={props.todo.completed}
					>
						Add Date
					</button>
				)}
			</div>
			<button
				className="todo-button"
				onClick={() => props.deleteTodo(props.todo.id)}
			>
				<i className="icon fa-solid fa-trash"></i>
			</button>
		</li>
	);
}

export default ToDoItem;
