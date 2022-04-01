import {Popup} from './popup.js';
import {LogicMessenger} from './logic/LogicMessenger.js'


class Logic {
    #popup = new Popup();
    #messenger = new LogicMessenger();

    #searchData = {};

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
        console.log('_initializeSearch');
        this.#searchData = this.#popup.getSearchData();
        //Do usunięcia w tym miejscu
        this.#searchData.text = "Testowy tejst fjkhafskjhafsdjjhkafjkafsd";

        this.#messenger.sendSearchData(this.#searchData);
    }

    _activateListeners() {
        window.addEventListener("message", event => this._handleMessageEvent(event), false);
        chrome.runtime.onMessage.addListener(() => this._handleChromeMessage());
    }

    _handleMessageEvent(event) {
        console.log("_handleMessageEvent");
        let output = this.#messenger.handleEventMessage(event.data);
        if (!output) return;
        console.log(output);
    }

    _handleChromeMessage(message) {
        let textContent = this.#messenger.handleChromeMessage(message);
        if (textContent) {
            this.#searchData.text = textContent;
        }
    }
}


const logic = new Logic();