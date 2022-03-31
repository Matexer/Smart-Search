import { DOMElement } from "./DOMElement.js";


export class Container extends DOMElement {
    show() {
        $(this.id).show();
    }

    hide() {
        $(this.id).hide();
    }
}
