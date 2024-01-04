interface AddToDoProps {
    onSubmit: (title: string, dueDate: Date | string) => void;
}

export default AddToDoProps;