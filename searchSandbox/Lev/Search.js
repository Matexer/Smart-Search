import {SearchEngine} from "./SearchEngine.js"
import {SearchMessenger} from "./SearchMessenger.js"


export class Search {
    #messenger = new SearchMessenger();
    #engine = new SearchEngine();

    constructor() {
        this._activateListeners();
    }

    _activateListeners() {
        window.addEventListener("message", event => this._handleMessageEvent(event.data), false);
    }

    async _handleMessageEvent(eventData) {
        let msg = this.#messenger.handleMessage(eventData);
        if (!msg) return;

        if (msg.config) {
            this.#engine.setConfig(msg.config);
        }

        var output = await this.#engine.lookFor(msg.searchData);

        this.#messenger.sendSearchOutput(output);
    }
}