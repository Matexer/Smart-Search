import {SearchEngine} from "./Lev/SearchEngine.js"


function search(pattern, text, maxDistance) {
    SearchEngine.setEncoding("utf-16");

    var outputArray = [];

    var output = SearchEngine.lookFor(
        pattern, text, maxDistance);

    let maxVals = Math.min(10, output.size());
    for(var i = 0 ; i < maxVals; i++) {
        outputArray.push({
            index: output.get(i).index,
            length: output.get(i).length,
            distance: output.get(i).distance
        });
    }

    output.delete();
    return outputArray;
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