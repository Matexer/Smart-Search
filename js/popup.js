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
        let finished = await this._renderAll()
        .then(this.loadLanguage());

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

    async loadLanguage() {        
        let module = await import('../lang/pl.js').then(true);
        let lang = module.lang;
        this.statsCont.lang = {
            "lang-occurences": lang["lang-occurences"],
            "lang-Levenshtein-distance": lang["lang-Levenshtein-distance"]};

        $(document).ready(function() {
            for (const word in lang) {
                $("." + word).text(lang[word]);
            }
        })
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
