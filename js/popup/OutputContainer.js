import { Container } from "./Container.js";


export class OutputContainer extends Container {
    _id = "#output-container";
    _HTMLPath = "html/outputContainer.html";

    outputId = ".search-output";
    outputValId = ".output-val";
    outputOccurenceId = ".output-occurence";

    add(text, distance, occurences) {
        this._renderOutput(text, distance, occurences);
        let $element = $("#output-list").find(".search-output").last();
        this._bindButtons($element);
    }

    clear() {
        $("#output-list").empty();
    }

    _renderOutput(text, distance, occurences) {
        $("#output-list").append('\
        <li class="list-group-item search-output"> \
        <div class="d-flex">\
            <span class="badge output-badge"> ' + distance + ' </span>\
            <div class="text-truncate">\
                <span class="output-val">' + text + '</span>\
            </div>\
            <div class="d-flex" style="margin-left: auto;">\
                <div class="add">\
                    <span>+</span>\
                    <span class="output-occurence">1</span>\
                </div>\
                <span>/</span>\
                <div class="sub">\
                    <span class="output-total-occurences"> ' + occurences + '</span>\
                    <span>-</span>\
                </div>\
            </div>\
        </div>\
    </li>');
    }

    _bindButtons($element) {
        $element.find(".add").click((e) => {this._increment($(e.currentTarget))});
        $element.find(".sub").click((e) => {this._decrement($(e.currentTarget))});
    }

    _increment($element) {
        let $index = $element.find(".output-occurence");
        let $max = $element.parent().find(".output-total-occurences");

        let indexVal = parseInt($index.text());
        let maxVal = parseInt($max.text());

        if (indexVal < maxVal) {
            $index.text(indexVal + 1);
        }
    }

    _decrement($element) {
        let $index = $element.parent().find(".output-occurence");
        let indexVal = parseInt($index.text());

        if (indexVal > 1) {
            $index.text(indexVal - 1);
        }
    }

}
