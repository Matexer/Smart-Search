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

        Header.showSettingsContainer();

        $("#search-btn").click(function() {
            console.log(Search.getPattern());
        })

        var labels = [6, 4, 3, 2, 1, 0];
        var data = [12, 19, 3, 5, 2, 3];
        var lastHistvhart = Stats.drawLastHistchart(labels, data);

    }
}


var popup = new Popup();