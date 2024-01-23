import express from "express";
import TodosRouter from "./router/TodosRouter";
import cors from "cors";
import Logger from "./logging/Logger";

const app = express();
const todosRouter = new TodosRouter();

app.use(cors());
app.use(express.json());
app.use(todosRouter.router);

Logger.Info("Server is starting...");

app.listen(5000, () => {
	Logger.Info("Server is running on port 5000");
});
