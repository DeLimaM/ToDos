import express from "express";
import ApiRouter from "./router/ApiRouter";

const app = express();
const apiRouter = new ApiRouter();

app.use("/api", apiRouter.router);

console.log("Starting server...\n");

console.log("Routes:");
console.log(app.routes + "\n");

app.listen(5000, () => {
	console.log("Server is listening on port 5000");
});
