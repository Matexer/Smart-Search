export class LogicMessenger {
    #searchSandbox = document.querySelector("iframe").contentWindow;

    handleEventMessage(message) {
        if (message.type != "SearchOutput") {
            return null;
        }
        else {
            return message.content;
        }
    }

    handleChromeMessage(message) {
        if (message.type != "TextContent") {
            return null;
        }
        else {
            return message.content;
        }
    }

    askForTextContent() {

    }

    sendSearchData(data) {
        console.log("sendSearchData");
        let message = {type: "SearchData", content: data};
        this.#searchSandbox.postMessage(message, "*");
    }
}
