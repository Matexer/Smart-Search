import { Basic } from "./Basic.js";


export class Search extends Basic {
    constructor(root) {
        super(root, "html/searchContainer.html");

    }

    static getPattern() {
        return $("#pattern").val();
    }
}