import {SearchContainer} from './popup/SearchContainer.js'
import {Header} from './popup/Header.js'
import {StatsContainer} from './popup/StatsContainer.js'
import {SettingsContainer} from './popup/SettingsContainer.js'


export class Popup {
    constructor() { 
        this.header = new Header();
        this.searchCont = new SearchContainer();
        this.statsCont = new StatsContainer();
        this.settingsCont = new SettingsContainer();
    }

    async initialize() {
        return await this._renderAll()
            .then(() => this._bindHeaderIcons())
            .then(() => this._showSearchContainer());
    }

    async _renderAll() {
        return await Promise.all([
            this.header.render("#head"),

            this.searchCont.render("#content"),
            this.statsCont.render("#content"),
            this.settingsCont.render("#content")
        ]);
    }

    
    _bindHeaderIcons() {
        $(this.header.searchIconId).click(() => this._showSearchContainer());
        $(this.header.statsIconId).click(() => this._showStatsContainer());
        $(this.header.settingsIconId).click(() => this._showSettingsContainer());
    }


    _hideContent() {
        $("#content").children().hide();
        this.header.unselectIcons();
    }

    _showSearchContainer() {
        this._hideContent();
        this.header.markSelected(this.header.searchIconId);
        this.searchCont.show();
    }

    _showStatsContainer() {
        this._hideContent();
        this.header.markSelected(this.header.statsIconId);
        this.statsCont.show();
    }

    _showSettingsContainer() {
        this._hideContent();
        this.header.markSelected(this.header.settingsIconId);
        this.settingsCont.show();
    }


    //     var searchData = {
    //         pattern: "Egg",
    //         text: "",
    //         maxDistance: 10
    //     }

    //     //Search Engine
    //     var iframe = document.querySelector("iframe");
    //     var _window = iframe.contentWindow;

    //     window.addEventListener("message", function(e) {
    //     var output = e.data;

    //     for(var out of e.data) {
    //         Search.addOutput(
    //             searchData.text.substring(out.index, out.length + out.index),
    //             out.distance)
    //     }
    //     }, false)
    //     // end - Search Engine

    //     $("#search-btn").click(function() {
    //         Search.clearOutputList();
    //         searchData.pattern = Search.getPattern();
    //         //searchData.maxDistance = length(searchData.pattern) - Search.getMinSimilarity();
    //         searchData.maxDistance = Search.getMinSimilarity();

    //         console.log(searchData.pattern);
    //         console.log("Wiadomość do content");
    //         chrome.tabs.query(
    //             {active: true, currentWindow: true},

    //             function(tabs) {
    //                 chrome.tabs.sendMessage(tabs[0].id,
    //                     {type: "getTextContent"});
    //         }

    //         );
    //         Search.showOutputCotainer();
    //     })

    //     chrome.runtime.onMessage.addListener((msg) => {
    //         if (msg.type = "sendTextContent") {
    //             searchData.text = msg.textContent.replace(/(\r\n|\n|\r)/gm, "");
    //             _window.postMessage(searchData, "*")
    //         }
    //     })

    //     var y = [6, 4, 3, 2, 1, 0];
    //     var x = [12, 19, 3, 5, 2, 3];
    //     var lastHistvhart = Stats.drawLastHistChart(x, y);

}
