function worker() {


    function lookFor(engine, searchData, firstIndex, lastIndex) {

        var _searchData = {pattern: searchData.pattern,
            text: searchData.text.substr(
                firstIndex, lastIndex - firstIndex + searchData.pattern.length),
            maxDistance: searchData.maxDistance};

        let output = engine.lookFor(_searchData.pattern, _searchData.text, _searchData.maxDistance);
        let outputArray = this._parseOutput(output, firstIndex);
        output.delete();
        return outputArray;
    }


    self.addEventListener('message', function(event) {
        var msg = event.data;

        if (msg.type != "LookFor") {return;}

        let data = msg.content;
        let outputArray = lookFor(data.engine, data.searchData, data.firstIndex, data.lastIndex);

        msg = {type: "LookForReturn",
            content: outputArray}

        self.postMessage(msg);
        self.close();
    })


}