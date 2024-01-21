import express from "express";

abstract class Route {
	public router = express.Router();

	protected constructor() {
		this.initializeRoutes();
	}

	/**
	 * Initializes the routes
	 * @protected
	 */
	protected abstract initializeRoutes(): void;
}

export default Route;
