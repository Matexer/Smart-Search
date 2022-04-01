import {SearchEngine} from "./SearchEngine.js"
import {SearchMessenger} from "./SearchMessenger.js"


export class Search {
    #messenger = new SearchMessenger();
    #engine = new SearchEngine();

    constructor() {
        this.activateListeners();
    }

    activateListeners() {
        window.addEventListener("message", event => this._handleMessageEvent(event), false);
    }

    _handleMessageEvent(event) {
        let data = this.#messenger.handleMessage(event.data);
        if (!data) return;
        this.#messenger.sendSearchOutput(this._lookFor(data));
    }

    _lookFor(data) {
        let pattern = data.pattern;
        let text = data.text;
        let maxDistance = data.maxDistance;

        //Do usunięcia w tym miejscu
        this.#engine.setEncoding("utf-16");
    
        let outputArray = [];
    
        let output = this.#engine.lookFor(
            pattern, text, maxDistance);
    
        let maxVals = Math.min(10, output.size());
        for(var i = 0 ; i < maxVals; i++) {
            outputArray.push({
                index: output.get(i).index,
                length: output.get(i).length,
                distance: output.get(i).distance
            });
        }
    
        output.delete();
        return outputArray;
    }

}