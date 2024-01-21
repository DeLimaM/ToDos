import { readFileSync } from "fs";
import { parse } from "ini";

const configPath = "config/dev.ini";

class Config {
	private dbDsn: string;
	private dbUser: string;
	private dbPassword: string;

	constructor() {
		this.dbDsn = "dsn not set";
		this.dbUser = "user not set";
		this.dbPassword = "password not set";
		this.parseIniFile();
	}

	private parseIniFile() {
		try {
			const data = readFileSync(configPath, "utf-8");
			const parsed = parse(data);
			this.dbDsn = parsed.DB.dsn;
			this.dbUser = parsed.DB.username;
			this.dbPassword = parsed.DB.password;
		} catch (err) {
			console.log(err);
		}
	}

	getDbDsn(): string {
		return this.dbDsn;
	}

	getDbUser(): string {
		return this.dbUser;
	}

	getDbPassword(): string {
		return this.dbPassword;
	}
}

export { Config };
