"use strict";
class View {
    constructor(action) {
        this.file = "views/" + action + ".html";
        this.title = action;
    }
    /**
     * Renders the view
     * @param data
     */
    render(data) {
        const fs = require("fs");
        const template = fs.readFileSync(this.file, "utf8");
        let html = template.replace("{{title}}", this.title);
        if (data.length > 0) {
            html = html.replace("{{data}}", JSON.stringify(data));
        }
        return html;
    }
}
