import express from "express";
import TodosRouter from "./router/TodosRouter";
import cors from "cors";
import Logger from "./logging/Logger";

const app = express();
const todosRouter = new TodosRouter();

app.use(cors());
app.use(express.json());
app.use(todosRouter.router);

Logger.Clear();
Logger.Log("Server started");

app.listen(5000, () => {
	Logger.Log("Server listening on port 5000");
});
