"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(require("../Route"));
const UserManager_1 = __importDefault(require("../../models/UserManager"));
class UsersRoute extends Route_1.default {
    constructor() {
        super();
        this.userManager = new UserManager_1.default();
    }
    initializeRoutes() {
        this.router.get("/users", (req, res) => {
            this.userManager.getAllUsers().then((users) => {
                res.json(users);
            });
        });
    }
}
exports.default = UsersRoute;
