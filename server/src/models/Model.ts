import { Config } from "../config/Config";
import { Connection, ConnectionOptions } from "mysql2/promise";

class Model {
	private db: null | Connection = null;

	constructor() {
		this.getDb();
	}

	/**
	 * Returns the database connection
	 * @private
	 */
	private getDb() {
		if (this.db === null) {
			const config = new Config();
			const dbDsn = config.getDbDsn();
			const dbUser = config.getDbUser();
			const dbPassword = config.getDbPassword();
			const mySql = require("mysql2/promise");
			const connectionOptions: ConnectionOptions = {
				user: dbUser,
				password: dbPassword,
			};
			this.db = mySql.createConnection(connectionOptions);
		}
		return this.db;
	}

	/**
	 * Executes a query
	 * @param query
	 * @param params
	 * @protected
	 */
	protected async executeQuery(query: string, params: any[] = []) {
		if (this.db) {
			if (params.length === 0) {
				const [results] = await this.db.query(query);
				return results;
			} else {
				const [results] = await this.db.execute(query, params);
				return results;
			}
		} else {
			return Promise.reject(
				new Error("Database connection is not established"),
			);
		}
	}
}

export default Model;
