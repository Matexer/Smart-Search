import {Popup} from './popup.js';
import {LogicMessenger} from './logic/LogicMessenger.js'
import {Memory} from './logic/Memory.js'


class Logic {
    #popup = new Popup();
    #messenger = new LogicMessenger();

    #searchData = {};
    #searchConfig = {deletionCost: 1,
        insertionCost: 1,
        swapCost: 1,
        purifyRange: 5,
        fixRange: 3,
        encoding: 16,
        maxNumOfOutputs: 10,
        // muliThreading = false;
        // multiThreadingMinComplexity = 100;
        // maxNumOfThreads = 12;
        }

    #minSimilarity = null;

    constructor() {
        this.initialize();
    }

    async initialize() {
        await this.#popup.initialize();

        this._activateListeners();
        this._bindSearchBtn();
    }

    _bindSearchBtn() {
        $(this.#popup.searchCont.searchBtnId).click(() => this._initializeSearch());
    }

    _initializeSearch() {
        let data = this.#popup.getSearchData();
        this.#searchData.pattern = data.pattern;

        //TODO Uwzględnić dla różnych kosztów edycji 
        this.#searchData.maxDistance = Math.max(data.pattern.length - data.minSimilarity, 0);
        this.#minSimilarity = data.minSimilarity;

        this.#messenger.askForTextContent();
    }

    _activateListeners() {
        window.addEventListener("message", event => this._handleMessageEvent(event), false);
        chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
            this._handleChromeMessage(message);
            sendResponse();
        })
    }

    //From Search - receiving SearchOutput
    _handleMessageEvent(event) {
        let msg = this.#messenger.handleMessage(event.data);
        if (!msg) return;

        let output = this._parseOutput(msg.output);
        this.#popup.searchCont.showOutput(output);
        this._updateStats(msg.stats);
    }

    //From content - receiving TextContent
    _handleChromeMessage(message) {
        let textContent = this.#messenger.handleMessage(message);
        if (textContent) {
            this.#searchData.text = textContent;
            let data = {searchData: this.#searchData,
                        config: this.#searchConfig};

            this.#messenger.sendSearchData(data);
        }
    }

    _parseOutput(output) {
        let parsedOutput = [];
        for (const out of output) {
            let word = this.#searchData.text.substr(out.index, out.length);
            parsedOutput.push({
                text: word,
                distance: out.distance
            })
        }

        return parsedOutput;
    }

    _updateStats(newStats) {
        let histData = {xs: [], ys: []}

        for (const x in newStats.histData) {
            histData.xs.push(x);
            histData.ys.push(newStats.histData[x]);
        }

        let lastData = {pattern: this.#searchData.pattern,
                        textLength: this.#searchData.text.length,
                        minSimilarity: this.#minSimilarity,
                        searchTime: newStats.searchTime,
                        numOfOutputs: newStats.numOfOutputs,
                        histData: histData};

        this.#popup.statsCont.showLastSearchStats(lastData);
    }
}


const logic = new Logic();