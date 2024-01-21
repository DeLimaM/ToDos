class User {
	private id: number | null;
	private username: string;
	private password: string;

	/**
	 * Constructor for User
	 * @param id
	 * @param username
	 * @param password
	 */
	constructor(id: number | null, username: string, password: string) {
		this.id = id;
		this.username = username;
		this.password = password;
	}

	getId() {
		return this.id;
	}

	getUsername() {
		return this.username;
	}

	getPassword() {
		return this.password;
	}

	setId(id: number) {
		this.id = id;
	}

	setUsername(username: string) {
		this.username = username;
	}

	setPassword(password: string) {
		this.password = password;
	}
}

export default User;
