import {Popup} from './popup.js';
import {LogicMessenger} from './logic/LogicMessenger.js'
import {Memory} from './logic/Memory.js'


class Logic {
    #popup = new Popup();
    #messenger = new LogicMessenger();
    #memory = new Memory();

    #searchData = {};
    #minSimilarity = null;

    #settings = {};
    #defaultSettings = {
        capitalLetters: true,
        maxNumOfOutputs: 10,
        defaultMinSimilarity: 80,
        deletionCost: 1,
        insertionCost: 1,
        swapCost: 1,
        purifyRange: 100,
        fixRange: 30,
        utfEncoding: 16
    }

    constructor() {
        this.initialize();
    }

    async initialize() {
        await this.#popup.initialize();

        this._activateListeners();
        this._bindButtons();
        this._loadData();
    }

    _bindButtons() {
        $(this.#popup.searchCont.searchBtnId).click(() => this._initializeSearch());
        $(this.#popup.statsCont.resetBtnId).click(() => this._resetStats());
        $(this.#popup.settingsCont.saveBtnId).click(() => this._updateSettings());
        $(this.#popup.settingsCont.resetSettingsBtnId).click(() => this._resetSettings());       
    }

    async _loadData() {
        let [stats, settings] = await Promise.all([
            this.#memory.getStats(),
            this.#memory.getSettings()
        ]);

        if (stats) {
            this._showStats(stats);
        }

        if (settings) {
            this.#settings = settings;
            this.#popup.settingsCont.insertSettings(settings);
        }
        else {
            this.#settings = this.#defaultSettings;
            this._resetSettings();
        }

        this.#popup.searchCont.setFilterPercentValue(
            this.#settings.defaultMinSimilarity)
    }

    _initializeSearch() {
        let data = this.#popup.getSearchData();
        this.#searchData.pattern = data.pattern;

        //TODO Uwzględnić dla różnych kosztów edycji 
        this.#searchData.maxDistance = Math.max(
            data.pattern.length - data.minSimilarity, 0);
        this.#minSimilarity = data.minSimilarity;

        this.#messenger.askForTextContent();
    }

    _activateListeners() {
        window.addEventListener("message",
            event => this._handleMessageEvent(event), false);

        chrome.runtime.onMessage.addListener(
            (message, sender, sendResponse) => {
                this._handleChromeMessage(message);
                sendResponse();
        })
    }

    //From Search - receiving SearchOutput
    _handleMessageEvent(event) {
        let msg = this.#messenger.handleMessage(event.data);
        if (!msg) return;

        let output = this._parseOutput(msg.content.output);
        this._removeUnselectable(output);
        this._updateStats(msg.content.stats);
    }

    //From content - receiving TextContent
    _handleChromeMessage(msg) {
        if (msg.type == "TextContent") {
            this.#searchData.text = msg.content;
            this._search();
        }
        else if (msg.type == "ClearSearchOutput") {
            this.#popup.searchCont.showOutput(msg.content);

            $(this.#popup.searchCont.outputId).click(
                output => this._higlight(output.currentTarget));
        }
    }

    _search() {
        let purifyRange = Math.round(
            this.#settings.purifyRange * this.#searchData.pattern.length / 100, 0);
        let fixRange = Math.round(
            this.#settings.fixRange * this.#searchData.pattern.length / 100, 0);

        let searchConfig = {deletionCost: parseInt(this.#settings.deletionCost),
            insertionCost: parseInt(this.#settings.insertionCost),
            swapCost: parseInt(this.#settings.swapCost),
            purifyRange: purifyRange,
            fixRange: fixRange,
            encoding: this.#settings.utfEncoding,
            maxNumOfOutputs: parseInt(this.#settings.maxNumOfOutputs),
            // muliThreading = false;
            // multiThreadingMinComplexity = 100;
            // maxNumOfThreads = 12;
        }

        var searchData = this.#searchData;
        if (!this.#settings.capitalLetters) {
            searchData = {pattern: this.#searchData.pattern.toLowerCase(),
                          text: this.#searchData.text.toLowerCase(),
                          maxDistance: this.#searchData.maxDistance}
        }

        let data = {searchData: searchData,
                    config: searchConfig};

        this.#messenger.sendSearchData(data);
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

    async _updateStats(newStats) {
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

        let totalStats = await this.#memory.getTotalStats();

        if (totalStats) {
            totalStats.numOfPatterns += 1;
            totalStats.numOfOutputs += lastData.numOfOutputs;
            totalStats.analizedSigns += lastData.textLength;
        }
        else {
            totalStats = {}
            totalStats.numOfPatterns = 1;
            totalStats.numOfOutputs = lastData.numOfOutputs;
            totalStats.analizedSigns = lastData.textLength;
        }

        let data = {stats: {
            lastStats: lastData,
            totalStats: totalStats
        }}

        this._showStats(data.stats);
        this.#memory.saveLocal(data);
    }

    _showStats(stats) {
        this.#popup.statsCont.showLastSearchStats(stats.lastStats);
        this.#popup.statsCont.showTotalSearchStats(stats.totalStats);
    }

    async _resetStats() {
        let stats = await this.#memory.getStats();
        let totalStats = {numOfPatterns: 0,
                          numOfOutputs: 0,
                          analizedSigns: 0}

        let data = {stats: {
            lastStats: stats.lastStats,
            totalStats: totalStats
        }}

        this.#popup.statsCont.showTotalSearchStats(totalStats);
        this.#memory.saveLocal(data);
    }

    _updateSettings() {
        let settings = this.#popup.settingsCont.getSettings();
        this.#settings = settings;
        let data = {settings: settings};
        this.#memory.saveSync(data);
    }

    _resetSettings() {
        let data = {settings: this.#defaultSettings};
        this.#settings = this.#defaultSettings;
        this.#memory.saveSync(data);
        this.#popup.settingsCont.insertSettings(this.#defaultSettings);
    }

    _higlight(output) {
        let val = $(output).find(this.#popup.searchCont.outputValId).text();
        this.#messenger.askForHiglight(val);
    }

    _removeUnselectable(output) {
        this.#messenger.askForRemovingUnselectable(output);
    }
}


const logic = new Logic();