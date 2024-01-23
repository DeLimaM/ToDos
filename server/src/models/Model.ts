import { Config } from "../config/Config";
import {
	Connection,
	ConnectionOptions,
	ResultSetHeader,
	RowDataPacket,
} from "mysql2/promise";

class Model {
	private db: null | Connection = null;

	constructor() {
		this.getDb();
	}

	/**
	 * Returns the database connection
	 * @private
	 */
	private async getDb() {
		if (this.db === null) {
			const config = new Config();
			const mySql = require("mysql2/promise");
			const connectionOptions: ConnectionOptions = {
				host: config.getDbHost(),
				port: config.getDbPort(),
				database: config.getDbName(),
				user: config.getDbUser(),
				password: config.getDbPassword(),
				rowsAsArray: true,
			};
			this.db = await mySql.createConnection(connectionOptions);
		}
		return this.db;
	}

	/**
	 * Executes a query
	 * @param query
	 * @param params
	 * @protected
	 */
	protected async executeQuery<T extends RowDataPacket[] | ResultSetHeader>(
		query: string,
		params: any[] = [],
	): Promise<T> {
		if (this.db) {
			let results: T;
			if (params.length === 0) {
				[results] = await this.db.query<T>(query);
			} else {
				[results] = await this.db.execute<T>(query, params);
			}
			return results;
		} else {
			return Promise.reject(
				new Error("Database connection is not established"),
			);
		}
	}
}

export default Model;
