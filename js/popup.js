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
        await this._renderAll();
        
        this._bindHeaderIcons();
        this._showSearchContainer();
    }

    getSearchData() {
        let data = {pattern: this.searchCont.getPattern(),
                       minSimilarity: this.searchCont.getMinSimilarity()
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
