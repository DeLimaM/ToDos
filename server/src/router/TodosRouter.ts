import { Router } from "express";
import TodoController from "../controllers/TodoController";

class TodoRouter {
	router: Router;
	controller: TodoController;

	constructor() {
		this.router = Router();
		this.controller = new TodoController();
		this.initRoutes();
	}

	initRoutes() {
		this.router.get("/todos", this.controller.getAll.bind(this.controller));
		this.router.get("/todos/:id", this.controller.get.bind(this.controller));
		this.router.post("/todos", this.controller.create.bind(this.controller));
		this.router.put(
			"/todos/:id",
			this.controller.update.bind(this.controller),
		);
		this.router.delete(
			"/todos/:id",
			this.controller.delete.bind(this.controller),
		);
	}
}

export default TodoRouter;
