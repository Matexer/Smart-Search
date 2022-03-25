// async function getTabId() {
//     let queryOptions = { active: true, currentWindow: true };
//     let [tab] = await chrome.tabs.query(queryOptions);
//     var tabId = tab.id;
//     return tabId;
// }

// async function getContent() {
//     var tabId = await getTabId();

//     chrome.scripting.executeScript(
//         {
//             target: {tabId: tabId, allFrames: true},
//             file: 'content.js'
//         }
// )};


// chrome.runtime.onMessage.addListener(
//     function(message, callback) {
//       if (message == "injectContentScript"){
//         chrome.tabs.executeScript({
//           file: 'contentScript.js'
//         });
//       }
// });