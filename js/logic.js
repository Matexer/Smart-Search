import {Popup} from './popup.js';


class Logic {
    constructor() {
        this.popup = new Popup();
        this.popup.initialize();
    }
}


const logic = new Logic();