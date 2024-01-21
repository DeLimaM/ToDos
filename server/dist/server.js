"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Router_1 = __importDefault(require("./router/Router"));
const app = (0, express_1.default)();
const apiRouter = new Router_1.default();
app.use("/api", apiRouter.router);
app.listen(5000, () => {
    console.log("Server is listening on port 5000");
});
