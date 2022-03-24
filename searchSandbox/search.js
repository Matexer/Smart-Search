import {SearchEngine} from "./Lev/SearchEngine.js"


class Search {
    static test() {
        SearchEngine.setEncoding("utf-8");

        var output = SearchEngine.lookFor("egg", "sdfhsdfhjsfdegg", 10);
    
        for(var i = 0 ; i < output.size(); i++) {
            console.log(output.get(i).distance);
        }
    
        output.delete();
    }
};


window.addEventListener("message", function(event) {
    console.info("message received in sandbox: " + event.data.message);
    console.log("Wiadomośc otrzymana.");
    Search.test();
});
