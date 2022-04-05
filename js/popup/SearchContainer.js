import { Container } from "./Container.js";
import { OutputContainer } from "./OutputContainer.js";


export class SearchContainer extends Container {
    _HTMLPath = "html/searchContainer.html";
    _id = "#search-container";
    _outputCont = new OutputContainer();

    searchBtnId = "#search-btn";
    outputId = this._outputCont.outputId;
    outputValId = this._outputCont.outputValId;

    async render(rootID) {
        return await super.render(rootID)
            .then(() => this._outputCont.render("#output"))
            .then(() => this._activateListeners());
    }

    showOutput(outputData) {
        this._outputCont.clear();
        this._outputCont.show();

        for (const output of outputData) {
            this._outputCont.add(output.text, output.distance);
        }
    }

    getPattern() {
        return $("#pattern").val();
    }

    getMinSimilarity() {
        return $("#filter-value").val();
    }

    setFilterPercentValue(value) {
        console.log()
        $("#filter-slider").val(value);
        $("#filter-percent-value").text(value);
    }

    _activateListeners() {
        $("#filter-slider").on("input", () => this._updateFilterValue());
        $("#pattern").on("input", () => this._updateFilterValue());
    }

    _updateFilterValue() {
        let percent = $("#filter-slider").val();
        let val = Math.round(percent * this.getPattern().length / 100, 0);
        
        $("#filter-value").val(val);
        $("#filter-percent-value").text(percent);
    }

}