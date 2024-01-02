import ToDoItem from "./ToDoItem.js";

function ToDoList(props) {
	return (
		<ul className="todo-list">
			{props.todos.length === 0 && <p className="no-todos">No todos yet!</p>}
			{props.todos.map((todo) => (
				<ToDoItem
					key={todo.id}
					todo={todo}
					toggleCompleted={props.toggleCompleted}
					deleteTodo={props.deleteTodo}
					updateToDo={props.updateToDo}
				/>
			))}
		</ul>
	);
}

export default ToDoList;
