function getTextContent() {
    return document.body.innerText;
}


chrome.runtime.onMessage.addListener(function(msg) {
    if (msg.type = "getTextContent") {
        chrome.runtime.sendMessage({
            type: "sendTextContent",
            textContent: getTextContent()});
    }
});