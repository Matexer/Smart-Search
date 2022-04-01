export class SearchMessenger {

    handleMessage(message) {
        if (message.type != "SearchData") {
            return null;
        }
        else {
            return message.content;
        }
    }

    sendSearchOutput(searchOutput) {
        let message = {type: "SearchOutput", content: searchOutput};
        window.parent.postMessage(message, "*");
    }

}
