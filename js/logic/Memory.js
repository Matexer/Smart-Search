export class Memory {
    saveStats(statsData) {
        let data = {stats: {
            lastStats: statsData
        }}
        this._saveLocal(data);
    }

    getStats() {
        return this._getLocal("stats");
    }

    _saveSync(data) {
        chrome.storage.sync.set(data);
    }

    _getSync(type) {
        let data;
        chrome.storage.sync.get([type], result => {
            data = result;
        })
        return data;
    }

    _saveLocal(data) {
        chrome.storage.local.set(data);
    }
    
    _getLocal(type) {
        let data;
        chrome.storage.local.get([type], result => {
            data = result;
        })
        return data;
    }
}