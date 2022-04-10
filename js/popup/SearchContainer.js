import { Container } from "./Container.js";
import { OutputContainer } from "./OutputContainer.js";


export class SearchContainer extends Container {
    _HTMLPath = "html/searchContainer.html";
    _id = "#search-container";
    _outputCont = new OutputContainer();

    searchBtnId = "#search-btn";
    outputId = this._outputCont.outputId;
    outputValId = this._outputCont.outputValId;
    outputOccurenceId = this._outputCont.outputOccurenceId;

    async render(rootID) {
        return await super.render(rootID)
            .then(() => this._outputCont.render("#output"))
            .then(() => this._activateListeners());
    }

    showOutput(outputData) {
        this._outputCont.clear();
        this._outputCont.show();

        for (const output of outputData) {
            this._outputCont.add(output.text, output.distance, output.occurences);
        }
    }

    showLoading() {
        this._outputCont.hide();
        $("#loading").show();
        //$("#search-btn").attr('disabled', true);
    }

    hideLoading() {
        $("#loading").hide();
        //$("#search-btn").attr('disabled', false);
    }

    getPattern() {
        return $("#pattern").val();
    }

    getMaxDistance() {
        return $("#filter-value").val();
    }

    setFilterPercentValue(value) {
        $("#filter-slider").val(value);
        $("#filter-percent-value").text(value);
    }

    _activateListeners() {
        $("#filter-slider").on("input", () => this._updateFilterValue());
        $("#pattern").on("input", () => this._updateFilterValue());
    }

    _updateFilterValue() {
        let percent = $("#filter-slider").val();
        let val = Math.round((100 - percent) * this.getPattern().length / 100, 0);
        
        $("#filter-value").val(val);
        $("#filter-percent-value").text(percent);
    }

}