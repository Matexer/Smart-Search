export class Basic {
    constructor(root, path) {
        this.appendSyncContent(root, path)
    }

    appendSyncContent(root, path) {
        var html = $.ajax({
            type: "GET",
            url: path,
            async: false
        }).responseText;

        root.append(html);
    }
}