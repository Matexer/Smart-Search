function getTextContent() {
    return document.body.innerText;
}


chrome.runtime.onMessage.addListener(function(msg) {
    if (msg.type = "getTextContent") {
        port.postMessage({
            type: "sendTextContent",
            textContent: getTextContent()});
    }
});