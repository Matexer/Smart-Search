import {Popup} from './popup.js';
import {LogicMessenger} from './logic/LogicMessenger.js'


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
        console.log(msg);
        let output = this._parseOutput(msg.output);
        this.#popup.searchCont.showOutput(output);
        // this.#popup.statsCont.showStats(msg.stats);
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
        console.log(output);
        for (const out of output) {
            let word = this.#searchData.text.substr(out.index, out.length);
            parsedOutput.push({
                text: word,
                distance: out.distance
            })
        }

        return parsedOutput;
    }
}


const logic = new Logic();