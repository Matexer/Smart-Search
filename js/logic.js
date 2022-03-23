import {SearchEngine} from "./Lev/SearchEngine.js"


class Logic {
    static test() {
        SearchEngine.setEncoding("utf-8");

        var output = SearchEngine.lookFor("egg", "sdfhsdfhjsfdegg", 10);
    
        for(var i = 0 ; i < output.size(); i++) {
            console.log(output.get(i).distance);
        }
    
        output.delete();
    }
};

$( document ).ready(function() {
    Logic.test();
});
