var instance;

function getTextContent() {
    return document.body.innerText;
}

function mark(text) {
    if (instance) {instance.unmark();}
    instance = new Mark(document.body);
    console.log(text);
    instance.mark(text, {
        "separateWordSearch": false,
        "caseSensitive": true,
        "diacritics": false,
    });
}


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type == "GetTextContent") {
        chrome.runtime.sendMessage({
            type: "TextContent",
            content: getTextContent()}).catch(err => {});
    }
    else if (message.type == "HiglightText") {
        mark(message.content);
    }

    sendResponse();
});