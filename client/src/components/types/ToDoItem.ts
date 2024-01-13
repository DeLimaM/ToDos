import ToDo from "./ToDo";

interface ToDoItemProps {
    key: number;
    todo: ToDo;
    toggleCompleted: (id: number) => void;
    deleteToDo: (id: number) => void;
    updateToDo: (id: number, title: string, dueDate: Date | string) => void;
}

export default ToDoItemProps;