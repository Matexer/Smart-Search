export class LogicMessenger {
    #searchSandbox = document.querySelector("iframe").contentWindow;

    askForTextContent() {
        chrome.tabs.query(
            {active: true, currentWindow: true}, (tabs) => {
                chrome.tabs.sendMessage(tabs[0].id, {type: "GetTextContent"}).catch(err => {});
            }
        )
    }

    askForHiglight(text) {
        let message = {type: "HiglightText", content: text};
        chrome.tabs.query(
            {active: true, currentWindow: true}, (tabs) => {
                chrome.tabs.sendMessage(tabs[0].id, message).catch(err => {});
            }
        )
    }

    askForRemovingUnselectable(output) {
        let message = {type: "RemoveUnselectable", content: output};
        chrome.tabs.query(
            {active: true, currentWindow: true}, (tabs) => {
                chrome.tabs.sendMessage(tabs[0].id, message).catch(err => {});
            }
        )
    }

    sendSearchData(data) {
        let message = {type: "SearchData", content: data};
        this.#searchSandbox.postMessage(message, "*");
    }
}
