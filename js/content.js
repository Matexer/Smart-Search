//REF: https://jsfiddle.net/julmot/973gdh8g/

$(function() {
    var $content = $("body"),
    instance,
    $results,
    currentClass = "current",
    offsetTop = 300,
    currentIndex = 0;
    
    function getTextContent() {
        return document.body.innerText;
    }
    
    function jumpTo() {
        if ($results.length) {
          var position,
            $current = $results.eq(currentIndex);
          $results.removeClass(currentClass);
          if ($current.length) {
            $current.addClass(currentClass);
            position = $current.offset().top - offsetTop;
            window.scrollTo(0, position);
          }
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
                $results = $content.find("mark");
                currentIndex = 0;
                jumpTo();
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