import fs from "fs";
import path from "path";

class Logger {
	constructor() {
		this.Clear();
	}

	public Log(message: string) {
		this.Write("LOG", message);
	}

	private Write(level: string, message: string) {
		const log = `${new Date().toLocaleTimeString()} - ${level} - ${message}\n`;
		fs.appendFile(path.join(__dirname, "../../logs/logs.txt"), log, (err) => {
			if (err) {
				console.error(`Failed to write to log file: ${err}`);
			}
		});
	}

	private Clear() {
		fs.writeFile(path.join(__dirname, "../../logs/logs.txt"), "", (err) => {
			if (err) {
				console.error(`Failed to clear log file: ${err}`);
			}
		});
	}
}

export default Logger;
