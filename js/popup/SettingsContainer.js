import { Container } from "./Container.js";


export class SettingsContainer extends Container {
    _HTMLPath = "html/settingsContainer.html";
    _id = "#settings-container";

    saveBtnId = "#save-settings-btn"
    resetSettingsBtnId = "#reset-settings-btn"

    getSettings() {
        return {capitalLetters: $('#capital-letters-chbox').prop('checked'),
        maxNumOfOutputs: $('#max-num-of-outputs').val(),
        defaultMaxDistance: $('#def-max-distance').val(),
        deletionCost: $('#deletion-cost').val(),
        insertionCost: $('#insertion-cost').val(),
        swapCost: $('#swap-cost').val(),
        purifyRange: $('#purify-range').val(),
        fixRange: $('#fix-range').val(),
        utfEncoding: $('#utf-encoding').val()
        }
    }

    insertSettings(settings) {
        $('#capital-letters-chbox').prop('checked', settings.capitalLetters),
        $('#max-num-of-outputs').val(settings.maxNumOfOutputs),
        $('#def-max-distance').val(settings.defaultMaxDistance),
        $('#deletion-cost').val(settings.deletionCost),
        $('#insertion-cost').val(settings.insertionCost),
        $('#swap-cost').val(settings.swapCost),
        $('#purify-range').val(settings.purifyRange),
        $('#fix-range').val(settings.fixRange),
        $('#utf-encoding').val(settings.utfEncoding)
    }
}