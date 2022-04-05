//REF: https://jsfiddle.net/julmot/973gdh8g/

$(function() {
    var $content = $("body"),
    instance,
    $results,
    currentClass = "current",
    offsetTop = 50,
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
    
    
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message.type == "GetTextContent") {
            chrome.runtime.sendMessage({
                type: "TextContent",
                content: getTextContent()}).catch(err => {});
        }
        else if (message.type == "HiglightText") {
            mark(message.content);
        }
    
        sendResponse();
    });
});