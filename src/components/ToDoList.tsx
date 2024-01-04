import React from "react";
import ToDoItem from "./ToDoItem";
import ToDoListProps from "./types/ToDoListProps";

function ToDoList({todos, toggleCompleted, updateToDo, deleteToDo}: ToDoListProps) {
	// Render the list of todos
	return (
		<ul className="todo-list">
			{todos.length === 0 && <p className="no-todos">No todos yet!</p>}
			{todos.map((todo) => (
				<ToDoItem
					key={todo.id}
					todo={todo}
					toggleCompleted={toggleCompleted}
					deleteToDo={deleteToDo}
					updateToDo={updateToDo}
				/>
			))}
		</ul>
	);
}

export default ToDoList;
