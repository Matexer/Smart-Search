function getTextContent() {
    return document.body.innerText;
}


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type = "GetTextContent") {
        chrome.runtime.sendMessage({
            type: "TextContent",
            content: getTextContent()}).catch(err => {});
    }
    sendResponse();
});