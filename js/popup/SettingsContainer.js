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
        let settings = {};
        let id = null;

        for(let setting in this._settingsId) {
            id = this._settingsId[setting];
            settings[setting] = $(id).val();
        }

        for(let chbox in this._chboxesId) {
            id = this._chboxesId[chbox];
            settings[chbox] = $(id).prop('checked');
        }

        return settings;
    }

    insertSettings(settings) {
        let id = null;
        for(let setting in this._settingsId) {
            id = this._settingsId[setting];
            $(id).val(settings[setting]);
        }

        for(let chbox in this._chboxesId) {
            id = this._chboxesId[chbox];
            $(id).prop('checked', settings[chbox]);
        }
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