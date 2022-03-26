import {Search} from './modules/Search.js'
import {Header} from './modules/Header.js'
import {Settings} from './modules/Settings.js'
import {Stats} from './modules/Stats.js'


class Popup {
    constructor() { 
        this.header = new Header($("#head"));
        this.searchWindow = new Search($("#content"));
        this.statsWindow = new Stats($("#content"));
        this.settingsWindow = new Settings($("#content"));

        Header.showSearchContainer();

        var searchData = {
            pattern: "Egg",
            text: "",
            maxDistance: 10
        }

        //Search Engine
        var iframe = document.querySelector("iframe");
        var _window = iframe.contentWindow;

        window.addEventListener("message", function(e) {
        var output = e.data;

        for(var out of e.data) {
            Search.addOutput(
                searchData.text.substring(out.index, out.length + out.index),
                out.distance)
        }
        }, false)
        // end - Search Engine

        $("#search-btn").click(function() {
            Search.clearOutputList();
            searchData.pattern = Search.getPattern();
            //searchData.maxDistance = length(searchData.pattern) - Search.getMinSimilarity();
            searchData.maxDistance = Search.getMinSimilarity();

            console.log(searchData.pattern);
            console.log("Wiadomość do content");
            chrome.tabs.query(
                {active: true, currentWindow: true},

                function(tabs) {
                    chrome.tabs.sendMessage(tabs[0].id,
                        {type: "getTextContent"});
            }

            );
            Search.showOutputCotainer();
        })

        chrome.runtime.onMessage.addListener((msg) => {
            if (msg.type = "sendTextContent") {
                searchData.text = msg.textContent.replace(/(\r\n|\n|\r)/gm, "");
                _window.postMessage(searchData, "*")
            }
        })

        var y = [6, 4, 3, 2, 1, 0];
        var x = [12, 19, 3, 5, 2, 3];
        var lastHistvhart = Stats.drawLastHistChart(x, y);

    }
}


var popup = new Popup();


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
//             func: getTextContent,
//         }, (injectionResults) => {
//             console.log(injectionResults[0].result);
//     });
// }
