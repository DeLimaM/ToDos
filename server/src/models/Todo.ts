class Todo {
	private id: number;
	private title: string;
	private completed: boolean;
	private dueDate: Date | string;

	constructor(
		id: number = -1,
		title: string,
		completed: boolean,
		dueDate: Date | string,
	) {
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

	setTitle(title: string) {
		this.title = title;
	}

	setCompleted(completed: boolean) {
		this.completed = completed;
	}

	setDueDate(dueDate: Date | string) {
		this.dueDate = dueDate;
	}
}

export default Todo;
