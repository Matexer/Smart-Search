import {Search} from './modules/Search.js'
import {Header} from './modules/Header.js'
import {Settings} from './modules/Settings.js'
import {Stats} from './modules/Stats.js'


class Popup {
    constructor() { 
        this.header = new Header($("#head"));
        this.searchWindow = new Search($("#content"));
        this.statsWindow = new Stats($("#content"));
        this.settingsWindow = new Settings($("#content"));

        Header.showSearchContainer();

        $("#search-btn").click(function() {
            console.log(Search.getPattern());
        })

    }
}


var popup = new Popup();