import Route from "../Route";
import UserManager from "../../models/UserManager";

class UsersRoute extends Route {
	private userManager: UserManager;

	constructor() {
		super();
		this.userManager = new UserManager();
	}

	protected initializeRoutes(): void {
		this.router.get("/users", (req, res) => {
			this.userManager.getAllUsers().then((users) => {
				res.json(users);
			});
		});
	}
}

export default UsersRoute;
