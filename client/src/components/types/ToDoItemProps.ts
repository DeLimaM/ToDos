import ToDo from "./ToDo";

interface ToDoItemProps {
	key: number;
	todo: ToDo;
	onDelete: (id: number) => void;
	onUpdate: (todo: ToDo) => void;
	onCompletedChange: (todo: ToDo) => void;
}

export default ToDoItemProps;
