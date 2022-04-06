//REF: https://jsfiddle.net/julmot/973gdh8g/

$(function() {
    var instance;
    var occurences;
    
    function getTextContent() {
        return document.body.innerText;
    }
    
    function jumpTo(index) {
        let $results = $("body").find("mark");
        let $current = $results.eq(index);

        $results.removeClass("selected-mark");
        if ($current.length) {
            $current.addClass("selected-mark");
            let position = $current.offset().top - 300;
            window.scrollTo(0, position);
        }
    }

    function countMarks(text) {
        let element = "tmp-mark";

        func = function(num) {
            let count = ([...getTextContent().matchAll(text)] || []).length;
            occurences = Math.min(num, count);
        };
        
        _mark(text, element, func);
        if (instance) {instance.unmark();}

        return occurences;
    }

    function mark(text, index=0) {
        let element = "mark";

        func = function () {
            jumpTo(index);
        };

        _mark(text, element, func);
    }

    function _mark(text, element, func) {
        if (instance) {instance.unmark();}
        instance = new Mark(document.body);
    
        instance.mark(text, {
            "element": element,
            "separateWordSearch": false,
            "caseSensitive": true,
            "diacritics": false,
            "ignoreJoiners": true,
            "acrossElements": true,
            done: func
        });
    }

    function setOccurences(output) {
        for (let i = 0; i < output.length; i++) {
            let text = output[i].text;
            let occurences = countMarks(text);

            if (occurences < 1) {
                output.splice(i, 1);
                i--;
            }
            else {
                output[i].occurences = occurences;
            }
        }
        return output
    }
    
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message.type == "GetTextContent") {
            chrome.runtime.sendMessage({
                type: "TextContent",
                content: getTextContent()}).catch(err => {});
        }
        else if (message.type == "HiglightText") {
            let cont = message.content;
            mark(cont.text, cont.index);
        }
        else if (message.type == "SetOccurences") {
            chrome.runtime.sendMessage({
                type: "ClearSearchOutput",
                content: setOccurences(message.content)}).catch(err => {});
        }
    
        sendResponse();
    });
});