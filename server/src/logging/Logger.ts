class Logger {
	public constructor() {}

	public static Log(message: string) {
		console.log(`${new Date().toLocaleTimeString()} - ${message}`);
	}

	public static Error(message: string) {
		console.error(`${new Date().toLocaleTimeString()} - ${message}`);
	}

	public static Warn(message: string) {
		console.warn(`${new Date().toLocaleTimeString()} - ${message}`);
	}

	public static Info(message: string) {
		console.info(`${new Date().toLocaleTimeString()} - ${message}`);
	}
}

export default Logger;
