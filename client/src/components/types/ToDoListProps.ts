import ToDo from "./ToDo";

interface ToDoListProps {
    todos: ToDo[];
    toggleCompleted: (id: number) => void;
    deleteToDo: (id: number) => void;
    updateToDo: (id: number, title: string, dueDate: Date | string) => void;
}

export default ToDoListProps;