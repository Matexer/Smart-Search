import { Container } from "./Container.js";
import { OutputContainer } from "./OutputContainer.js";


export class SearchContainer extends Container {
    _HTMLPath = "html/searchContainer.html";
    _id = "#search-container";
    _outputCont = new OutputContainer();

    searchBtnId = "#search-btn";
    patternId = "#pattern";
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
        $("#search-btn").attr('disabled', true);
    }

    hideLoading() {
        $("#loading").hide();
        $("#search-btn").attr('disabled', false);
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

    isDistanceValid() {
        return document.getElementById("filter-value").checkValidity();
    }

    _activateListeners() {
        $("#filter-slider").on("input", () => this._updateFilterValue());
        $("#pattern").on("input", () => this._updateFilterValue());
        $("#filter-value").on("input", () => this._validateFilterValue());

        $("#filter-value").on("input", () => this._updateSliderValue());

        $("#pattern").on("input", () => this._updateMaxDistance());
        $("#pattern").on("input", () => this._updateDisplayedPatternLength());
    }

    _updateFilterValue() {
        let percent = $("#filter-slider").val();
        let pattern = this.getPattern().length;

        let val = Math.floor(pattern * (percent) / 100, 0);
        
        $("#filter-value").val(val);
        $("#filter-percent-value").text(percent);

        this._validateFilterValue();
    }

    _updateMaxDistance() {
        $("#filter-value").attr('max', this.getPattern().length);
        this._validateFilterValue();
    }

    _updateDisplayedPatternLength() {
        $("#pattern-length").text(this.getPattern().length);    
    }

    _updateSliderValue() {
        let distance = $("#filter-value").val();
        let pattern = this.getPattern().length;

        let percent = Math.round((distance / pattern * 100), 0);

        if (percent > 100) {
            percent = 100;
        }
        else if (percent < 0) {
            percent = 0;
        }

        this.setFilterPercentValue(percent);
    }

    _validateFilterValue() {
        if (!document.getElementById("filter-value").checkValidity()) {
            $("#filter-value").addClass("improper");
            $("#search-btn").attr('disabled' , true);
        }
        else {
            $("#filter-value").removeClass("improper");
            $("#search-btn").attr('disabled' , false);
        }
    }

}