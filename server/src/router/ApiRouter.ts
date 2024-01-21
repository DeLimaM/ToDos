import express from "express";
import TodosRoute from "./routes/TodosRoute";

class ApiRouter {
	public router: express.Router;
	private todosRoute: TodosRoute;

	constructor() {
		this.router = express.Router();
		this.todosRoute = new TodosRoute();
		this.initializeRoutes();
	}

	/**
	 * Initializes the routes
	 * @private
	 */
	private initializeRoutes(): void {
		this.router.use("/todos", this.todosRoute.router);
	}
}

export default ApiRouter;
