import { Config } from "../config/Config";
import Logger from "../logging/Logger";
import {
	Connection,
	ConnectionOptions,
	ResultSetHeader,
	RowDataPacket,
} from "mysql2/promise";

class Model {
	private static db: null | Connection = null;

	constructor() {
		this.getDb();
	}

	/**
	 * Returns the database connection
	 * @private
	 */
	private async getDb() {
		if (Model.db === null) {
			const config = new Config();
			const mySql = require("mysql2/promise");
			const connectionOptions: ConnectionOptions = {
				host: config.getDbHost(),
				port: config.getDbPort(),
				user: config.getDbUser(),
				password: config.getDbPassword(),
				rowsAsArray: true,
			};

			Model.db = await mySql.createConnection(connectionOptions);

			await Model.db?.query(
				`CREATE DATABASE IF NOT EXISTS ${config.getDbName()};`
			);
			await Model.db?.query(`USE ${config.getDbName()}`);
			await Model.db?.query(
				`CREATE TABLE IF NOT EXISTS todos (
					id INT AUTO_INCREMENT PRIMARY KEY,
					title VARCHAR(255),
					completed BOOLEAN DEFAULT false,
					dueDate VARCHAR(255)
				);`
			);
		}
		return Model.db;
	}

	/**
	 * Executes a query
	 * @param query
	 * @param params
	 * @protected
	 */
	protected async executeQuery<T extends RowDataPacket[] | ResultSetHeader>(
		query: string,
		params: any[] = []
	): Promise<T> {
		if (Model.db) {
			let results: T;
			if (params.length === 0) {
				[results] = await Model.db.query<T>(query);
			} else {
				[results] = await Model.db.execute<T>(query, params);
			}
			return results;
		} else {
			return Promise.reject(
				new Error("Database connection is not established")
			);
		}
	}
}

export default Model;
