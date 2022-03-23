
function getRedableContent(tab) {
    var text;
    chrome.tabs.executeScript(tab.id,
        {code: 'document.body.innerText;'},
        text);
    return text;
};


function sendResponse() {

};


chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
    sendResponse(responseObject);
});


