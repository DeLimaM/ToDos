import express from "express";
import TodosRouter from "./router/TodosRouter";
import cors from "cors";
import Logger from "./logging/Logger";

const app = express();
const todosRouter = new TodosRouter();
const logger = new Logger();

app.use(cors());
app.use(express.json());
app.use(todosRouter.router);
logger.Log("Server started");

app.listen(5000, () => {
	logger.Log("Server listening on port 5000");
});
