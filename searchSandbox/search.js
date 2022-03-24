import {SearchEngine} from "./Lev/SearchEngine.js"


function search(patter, text, maxDistance) {
    SearchEngine.setEncoding("utf-8");

    var outputArray = [];


    var output = SearchEngine.lookFor(
        e.data.pattern, e.data.text, e.data.maxDistance);

    for(var i = 0 ; i < output.size(); i++) {
        outputArray[i]
        console.log(output.get(i).distance);
    }

    output.delete();
}


window.addEventListener("DOMContentLoaded", function() {
    window.addEventListener("message", function(e) {
        window.parent.postMessage(
            search(e.data.pattern, e.data.text, e.data.maxDistance),
            "*")
    }, false)

}, false)