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
    }

    static showSearchContainer() {
        $("#search-container").show();
    }

    static showStatsContainer() {
        $("#stats-container").show();
    }

    static showSettingsContainer() {
        $("#settings-container").show();
    }
}