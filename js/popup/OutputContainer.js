import { Container } from "./Container.js";


export class OutputContainer extends Container {
    _id = "#output-container";
    _HTMLPath = "html/outputContainer.html";

    outputId = ".search-output";
    outputValId = ".output-val";

    add(text, distance) {
        $("#output-list").append('\
        <li class="list-group-item text-truncate search-output"> \
        <span class="badge output-badge">' + distance +'</span> \
        <span class="output-val">' + text + '</span> \
        </li>');
    }

    clear() {
        $("#output-list").empty();
    }
}
