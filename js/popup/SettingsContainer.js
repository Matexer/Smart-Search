import { Container } from "./Container.js";


export class SettingsContainer extends Container {
    _HTMLPath = "html/settingsContainer.html";
    _id = "#settings-container";

    saveBtnId = "#save-settings-btn";
    resetSettingsBtnId = "#reset-settings-btn";

    _settingsId = {
        language: '#language',
        maxNumOfOutputs: '#max-num-of-outputs',
        defaultMaxDistance: '#def-max-distance',
        deletionCost: '#deletion-cost',
        insertionCost: '#insertion-cost',
        swapCost: '#swap-cost',
        purifyRange: '#purify-range',
        fixRange: '#fix-range',
        utfEncoding: '#utf-encoding',
    };

    _chboxesId = {
        capitalLetters: '#capital-letters-chbox',
        multithreading: '#multithreading-chbox'
    };

    _invalid = new Set();

    async render(rootID) {
        return await super.render(rootID)
            .then(() => this._activateListeners());
    }

    getSettings() {
        return {
            language: $('#language').val(),
            capitalLetters: $('#capital-letters-chbox').prop('checked'),
            maxNumOfOutputs: $('#max-num-of-outputs').val(),
            defaultMaxDistance: $('#def-max-distance').val(),
            deletionCost: $('#deletion-cost').val(),
            insertionCost: $('#insertion-cost').val(),
            swapCost: $('#swap-cost').val(),
            purifyRange: $('#purify-range').val(),
            fixRange: $('#fix-range').val(),
            utfEncoding: $('#utf-encoding').val(),
            multithreading: $('#multithreading-chbox').prop('checked')
        };
    }

    insertSettings(settings) {
        $('#language').val(settings.language);
        $('#capital-letters-chbox').prop('checked', settings.capitalLetters);
        $('#max-num-of-outputs').val(settings.maxNumOfOutputs);
        $('#def-max-distance').val(settings.defaultMaxDistance);
        $('#deletion-cost').val(settings.deletionCost);
        $('#insertion-cost').val(settings.insertionCost);
        $('#swap-cost').val(settings.swapCost);
        $('#purify-range').val(settings.purifyRange);
        $('#fix-range').val(settings.fixRange);
        $('#utf-encoding').val(settings.utfEncoding);
        $('#multithreading-chbox').prop('checked', settings.multithreading);
    }

    unmarkAll() {
        for(let settingID in this._settingsId) {
            let id = this._settingsId[settingID];
            $(id).removeClass("improper");
        }
        $("#save-settings-btn").attr('disabled', false);
    }

    _activateListeners() {
        for(let settingID in this._settingsId) {
            let id = this._settingsId[settingID];
            $(id).on("input", (event) => this._validate(event.currentTarget.id));
        }
    }

    _validate(id) {
        if (!document.getElementById(id).checkValidity()) {
            $("#" + id).addClass("improper");
            this._invalid.add(id);
        }
        else {
            $("#" + id).removeClass("improper");
            this._invalid.delete(id);
        }

        if (this._invalid.size > 0) {
            $("#save-settings-btn").attr('disabled', true);
        }
        else {
            $("#save-settings-btn").attr('disabled', false);
        }
    }

}