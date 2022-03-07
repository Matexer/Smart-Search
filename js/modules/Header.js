import { Basic } from "./Basic.js";


export class Header extends Basic {
    constructor(root) {
        super(root, "html/headerContainer.html");
        Header.bindIcons();
    }

    static bindIcons() {
        $("#search-icon").click(function() {
            Header.hideAll();
            Header.showSearchContainer();
        });

        $("#stats-icon").click(function() {
            Header.hideAll();
            Header.showStatsContainer();
        });

        $("#settings-icon").click(function() {
            Header.hideAll();
            Header.showSettingsContainer();
        });
    }

    static hideAll() {
        $("#content").children().hide();
        $("#icons-container").children().removeClass("icon-selected");
    }

    static showSearchContainer() {
        $("#search-container").show();
        $("#search-icon").addClass("icon-selected")
    }

    static showStatsContainer() {
        $("#stats-container").show();
        $("#stats-icon").addClass("icon-selected")
    }

    static showSettingsContainer() {
        $("#settings-container").show();
        $("#settings-icon").addClass("icon-selected")
    }
}