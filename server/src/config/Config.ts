import { readFileSync } from "fs";
import { parse } from "ini";

const configPath = "config/dev.ini";

class Config {
	private dbHost: string;
	private dbPort: number;
	private dbName: string;
	private dbUser: string;
	private dbPassword: string;

	constructor() {
		this.dbHost = "host not set";
		this.dbPort = -1;
		this.dbName = "name not set";
		this.dbUser = "user not set";
		this.dbPassword = "password not set";
		this.parseIniFile();
	}

	private parseIniFile() {
		try {
			const data = readFileSync(configPath, "utf-8");
			const parsed = parse(data);
			this.dbHost = parsed.DB.host;
			this.dbPort = parseInt(parsed.DB.port);
			this.dbName = parsed.DB.name;
			this.dbUser = parsed.DB.username;
			this.dbPassword = parsed.DB.password;
		} catch (err) {
			console.log(err);
		}
	}

	getDbHost(): string {
		return this.dbHost;
	}

	getDbPort(): number {
		return this.dbPort;
	}

	getDbName(): string {
		return this.dbName;
	}

	getDbUser(): string {
		return this.dbUser;
	}

	getDbPassword(): string {
		return this.dbPassword;
	}
}

export { Config };
