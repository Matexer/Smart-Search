import { Basic } from "./Basic.js";


export class Search extends Basic {
    constructor(root) {
        super(root, "html/searchContainer.html");

    }

    static getPattern() {
        return $("#pattern").val();
    }

    static getMinSimilarity() {
        return $("#filter-value").val();
    }

    static showOutputCotainer() {
        $("#output-container").show();
    }

    static hideOutputCotainer() {
        $("#output-container").hide();
    }

    static addOutput(text, distance) {
        $("#output-list").append('\
        <li class="list-group-item text-truncate search-output"> \
        <span class="badge output-badge percent">' + distance +'</span> \
        <span>' + text + '</span> \
        </li>');
    }

    static clearOutputList() {
        $("#output-list").empty();
    }
}