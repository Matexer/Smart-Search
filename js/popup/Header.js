import { DOMElement } from "./DOMElement.js";


export class Header extends DOMElement {
    _HTMLPath = "html/headerContainer.html";
    _id = "#header-container";

    searchIconId = "#search-icon";
    statsIconId = "#stats-icon";
    settingsIconId = "#settings-icon";


    markSelected(iconId) {
        $(iconId).addClass("icon-selected");
    }

    unselectIcons() {
        $("#icons-container").children().removeClass("icon-selected");
    }
}