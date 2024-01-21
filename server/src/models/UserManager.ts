import Model from "./Model";
import User from "./User";

class UserManager extends Model {
	constructor() {
		super();
	}

	/**
	 * Returns all users
	 */
	getAllUsers(): Promise<User[]> {
		return this.executeQuery("SELECT * FROM users").then((results) => {
			const users: User[] = [];
			if (Array.isArray(results)) {
				for (const result of results) {
					if (
						"id" in result &&
						"username" in result &&
						"password" in result
					) {
						const user = new User(
							result.id,
							result.username,
							result.password,
						);
						users.push(user);
					}
				}
			}
			return users;
		});
	}

	/**
	 * Returns a user by its id
	 * @param id
	 */
	getById(id: number): Promise<User> {
		return this.executeQuery("SELECT * FROM users WHERE id = ?", [id]).then(
			(results) => {
				if (Array.isArray(results) && results.length > 0) {
					const result = results[0];
					if (
						"id" in result &&
						"username" in result &&
						"password" in result
					) {
						return new User(result.id, result.username, result.password);
					}
				}
				throw new Error("User not found");
			},
		);
	}

	/**
	 * Creates a user
	 * @param user
	 */
	createUser(user: User): Promise<User> {
		return this.executeQuery(
			"INSERT INTO users (username, password) VALUES (?, ?)",
			[user.getUsername(), user.getPassword()],
		).then((results) => {
			if (Array.isArray(results) && results.length > 0) {
				const result = results[0];
				if ("insertId" in result) {
					user.setId(result.insertId);
					return user;
				}
			}
			throw new Error("User not created");
		});
	}

	/**
	 * Updates a user
	 * @param user
	 */
	updateUser(user: User): Promise<number> {
		return this.executeQuery(
			"UPDATE users SET username = ?, password = ? WHERE id = ?",
			[user.getUsername(), user.getPassword(), user.getId()],
		).then((results) => {
			if (Array.isArray(results) && results.length > 0) {
				const result = results[0];
				if ("affectedRows" in result) {
					return result.affectedRows;
				}
			}
			throw new Error("User not updated");
		});
	}
}

export default UserManager;
