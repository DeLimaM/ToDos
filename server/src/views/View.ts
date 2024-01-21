class View {
	private readonly file: string;
	private readonly title: string;

	constructor(action: string) {
		this.file = "views/" + action + ".html";
		this.title = action;
	}

	/**
	 * Renders the view
	 * @param data
	 */
	render(data: []): string {
		const fs = require("fs");
		const template = fs.readFileSync(this.file, "utf8");
		let html = template.replace("{{title}}", this.title);
		if (data.length > 0) {
			html = html.replace("{{data}}", JSON.stringify(data));
		}
		return html;
	}
}
