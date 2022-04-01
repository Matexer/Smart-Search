import { Container } from "./Container.js";
import { OutputContainer } from "./OutputContainer.js";


export class SearchContainer extends Container {
    _HTMLPath = "html/searchContainer.html";
    _id = "#search-container";
    _outputCont = new OutputContainer();

    searchBtnId = "#search-btn";

    async render(rootID) {
        return await super.render(rootID)
            .then(() => this._outputCont.render("#output"));
    }

    showOutput() {
        this._outputCont.show();
    }

    getPattern() {
        return $("#pattern").val();
    }

    getMinSimilarity() {
        return $("#filter-value").val();
    }

}