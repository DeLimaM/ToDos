import Model from "./Model";

class Todo extends Model {
	id: number;
	title: string;
	completed: boolean;
	dueDate: Date;

	constructor(id: number, title: string, completed: boolean, dueDate: Date) {
		super();
		this.id = id;
		this.title = title;
		this.completed = completed;
		this.dueDate = dueDate;
	}

	getId() {
		return this.id;
	}

	getTitle() {
		return this.title;
	}

	getCompleted() {
		return this.completed;
	}

	getDueDate() {
		return this.dueDate;
	}

	setId(id: number) {
		this.id = id;
	}
}

export default Todo;
