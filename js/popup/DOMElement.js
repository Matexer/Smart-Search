export class DOMElement {
    _HTMLPath;
    _id;

    async render(rootID) {
        return await fetch(this._HTMLPath)
                    .then(response => response.text())
                    .then(text => $(rootID).append(text))
                    .then(() => true);
    }

    get id() {return this._id};
}
