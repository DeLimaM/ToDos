import express from "express";
import TodosRouter from "./router/TodosRouter";
import cors from "cors";

const app = express();
const todosRouter = new TodosRouter();

app.use(cors());
app.use(express.json());
app.use(todosRouter.router);

console.log("Starting server...\n");

app.listen(5000, () => {
	console.log("Server is listening on port 5000\n");
});
