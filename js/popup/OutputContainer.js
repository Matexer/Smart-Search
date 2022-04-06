import { Container } from "./Container.js";


export class OutputContainer extends Container {
    _id = "#output-container";
    _HTMLPath = "html/outputContainer.html";

    outputId = ".search-output";
    outputValId = ".output-val";
    outputOccurenceId = ".output-occurence";

    add(text, distance, occurences) {
        this._renderOutput(text, distance, occurences);
    }

    clear() {
        $("#output-list").empty();
    }

    _renderOutput(text, distance, occurences) {
        $("#output-list").append('\
        <li class="list-group-item search-output"> \
        <div class="d-flex flex-row">\
            <span class="badge output-badge"> ' + distance + ' </span>\
            <div class="text-truncate">\
                <span class="output-val">' + text + '</span>\
            </div>\
            <div class="d-flex" style="margin-left: auto;">\
                <span>[</span>\
                <span class="output-occurence">1</span>\
                <span>/</span>\
                <span class="output-total-occurences"> ' + occurences + '</span>\
                <span>]</span>\
            </div>\
        </div>\
    </li>');
    }

}
