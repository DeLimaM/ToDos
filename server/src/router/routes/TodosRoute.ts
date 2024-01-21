import Route from "../Route";
import TodosManager from "../../models/TodosManager";

class TodosRoute extends Route {
	private todosManager: TodosManager;

	constructor() {
		super();
		this.todosManager = new TodosManager();
	}

	initializeRoutes() {
		this.router.get("/todos", (req, res) => {
			this.todosManager.getAllTodos().then((todos) => {
				res.json(todos);
			});
		});
	}
}

export default TodosRoute;
