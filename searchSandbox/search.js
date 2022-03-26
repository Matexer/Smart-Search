import {SearchEngine} from "./Lev/SearchEngine.js"


function search(pattern, text, maxDistance) {
    SearchEngine.setEncoding("utf-8");

    var outputArray = [];

    var output = SearchEngine.lookFor(
        pattern, text, maxDistance);

    for(var i = 0 ; i < output.size(); i++) {
        outputArray[i]
        console.log(output.get(i).distance);
    }

    output.delete();
}


window.addEventListener("DOMContentLoaded", function() {
    window.addEventListener("message", function(e) {

        window.parent.postMessage(
            search(
                e.data.pattern, e.data.text, e.data.maxDistance),
                "*"
            )
    }, false)

}, false)