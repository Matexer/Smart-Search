import {SearchContainer} from './popup/SearchContainer.js'
import {Header} from './popup/Header.js'
import {StatsContainer} from './popup/StatsContainer.js'
import {SettingsContainer} from './popup/SettingsContainer.js'


export class Popup {
    constructor() { 
        this.header = new Header();
        this.searchCont = new SearchContainer();
        this.statsCont = new StatsContainer();
        this.settingsCont = new SettingsContainer();
    }

    async initialize() {
        let finished = await this._renderAll();

        this._bindHeaderIcons();
        this._showSearchContainer();

        return finished;
    }

    getSearchData() {
        let data = {pattern: this.searchCont.getPattern(),
                    maxDistance: this.searchCont.getMaxDistance()
        }
        return data;
    }

    async _renderAll() {
        return Promise.all([
            this.header.render("#head"),

            this.searchCont.render("#content"),
            this.statsCont.render("#content"),
            this.settingsCont.render("#content")
        ]);
    }

    async loadLanguage(language) {        
        let module = await import('../lang/' + language + '.js');
        let lang = module.lang;
        this.statsCont.lang.text = {
            "lang-occurences": lang.text["lang-occurences"],
            "lang-Levenshtein-distance": lang.text["lang-Levenshtein-distance"]};
        
        for (const ele in lang.text) {
            $("." + ele).text(lang.text[ele]);
        }

        for (const ele in lang.placeholder) {
            $("." + ele).attr("placeholder", lang.placeholder[ele]);
        }
    }

    _bindHeaderIcons() {
        $(this.header.searchIconId).click(() => this._showSearchContainer());
        $(this.header.statsIconId).click(() => this._showStatsContainer());
        $(this.header.settingsIconId).click(() => this._showSettingsContainer());
    }


    _hideContent() {
        $("#content").children().hide();
        this.header.unselectIcons();
    }

    _showSearchContainer() {
        this._hideContent();
        this.header.markSelected(this.header.searchIconId);
        this.searchCont.show();
    }

    _showStatsContainer() {
        this._hideContent();
        this.header.markSelected(this.header.statsIconId);
        this.statsCont.show();
    }

    _showSettingsContainer() {
        this._hideContent();
        this.header.markSelected(this.header.settingsIconId);
        this.settingsCont.show();
    }
}
