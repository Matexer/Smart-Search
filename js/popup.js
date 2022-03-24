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

        var iframe = document.querySelector("iframe");
        var _window = iframe.contentWindow;

        window.addEventListener("message", function(e) {
        var output = e.data;
        console.log();
        // for(var i = 0 ; i < output.size(); i++) {
        //     console.log(output.get(i).distance);
        // }
        }, false)

        var searchData = {
            pattern: "Egg",
            text: "hcshrwhvriasajkshdfEgjdhfgEGgfakfuhaeu",
            maxDistance: 10
        }

        $("#search-btn").click(function() {
            console.log(Search.getPattern());
            _window.postMessage(searchData, "*")
            Search.showOutputCotainer();
        })

        var y = [6, 4, 3, 2, 1, 0];
        var x = [12, 19, 3, 5, 2, 3];
        var lastHistvhart = Stats.drawLastHistChart(x, y);

    }
}


var popup = new Popup();
