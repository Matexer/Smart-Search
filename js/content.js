//REF: https://jsfiddle.net/julmot/973gdh8g/

$(function() {
    var instance;
    var $results;
    
    function getTextContent() {
        return document.body.innerText;
    }
    
    function jumpTo(index) {
        if ($results.length < 1) {return;}

        $current = $results.eq(index);
        $results.removeClass("selected-mark");
        if ($current.length) {
            $current.addClass("selected-mark");
            let position = $current.offset().top - 300;
            window.scrollTo(0, position);
        }
    }

    function mark(text) {
        if (instance) {instance.unmark();}
        instance = new Mark(document.body);
    
        instance.mark(text, {
            "separateWordSearch": false,
            "caseSensitive": true,
            "diacritics": false,
            "ignoreJoiners": true,
            "acrossElements": true,
            done: function() {
                $results = $("body").find("mark");
                jumpTo(0);
            }
        });
    }

    function removeUnselectable(output) {
        for (let i = 0; i < output.length; i++) {
            const text = output[i].text;
            if ($("body:contains(" + text + ")").length < 1) {
                output.splice(i, 1);
                i--;
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
            mark(message.content);
        }
        else if (message.type == "RemoveUnselectable") {
            chrome.runtime.sendMessage({
                type: "ClearSearchOutput",
                content: removeUnselectable(message.content)}).catch(err => {});
        }
    
        sendResponse();
    });
});