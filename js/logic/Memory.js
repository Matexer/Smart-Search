export class Memory {
    saveLocal(data) {
        chrome.storage.local.set(data);
    }
    
    async getStats() {
        let data = await this._getLocal("stats");
        if (this._isEmpty(data)) {return null}
        else {return data.stats}
    }

    async getTotalStats() {
        let data = await this.getStats();
        if (data) {return data.totalStats}
        else {return null}
    }

    _saveSync(data) {
        chrome.storage.sync.set(data);
    }

    _getSync(type) {

    }
    
    _getLocal(type) {
        return new Promise((resolve, reject) => {
            chrome.storage.local.get(type, (items) => {
              if (chrome.runtime.lastError) {
                return reject(chrome.runtime.lastError);
              }
              resolve(items);
            });
          });
    }

    _isEmpty(obj) {
        return Object.keys(obj).length === 0;
    }
}