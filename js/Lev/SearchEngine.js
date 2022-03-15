export class SearchEngine {
    static encodingVal = "";
    static SizeTVal = "8";

    static setEncoding(encoding) {
        switch (encoding) {
            case "utf-8":
                this.encodingVal = "";
                break
            case "utf-16":
                this.encodingVal = "16";
                break      
            case "utf-32":
                this.encodingVal = "32";
                break
            default:
                console.error("Attempt to set inappropriate encoding.")
        }
    }

    static setSizeTVal(pattern) {
        if (pattern.length < 256) {
            this.SizeTVal = "8";
        }
        else if (pattern.length < 65536) {
            this.SizeTVal = "16";
        }
        else if (pattern.length < 4294967296) {
            this.SizeTVal = "32";
        }
        else {
            console.error("Too long pattern. Max length is 4 294 967 295")
            return 1;
        }
    }

    static getEngine() {
        if (this.SizeTVal == "8") {
            if (this.encodingVal == "") {
                return Module.SearchEngineStr8;
            }
            if (this.encodingVal == "16") {
                return Module.SearchEngine16Str8;
            }
            else {
                return Module.SearchEngine32Str8;
            }
        }
        else if (this.SizeTVal == "16") {
            if (this.encodingVal == "") {
                return Module.SearchEngineStr16;
            }
            if (this.encodingVal == "16") {
                return Module.SearchEngine16Str16;
            }
            else {
                return Module.SearchEngine32Str16;
            }
        }
        else {
            if (this.encodingVal == "") {
                return Module.SearchEngineStr32;
            }
            if (this.encodingVal == "16") {
                return Module.SearchEngine16Str32;
            }
            else {
                return Module.SearchEngine32Str32;
            }
        }
    }

    static lookFor(pattern, text, maxDistance) {
        this.setSizeTVal(pattern);
        let Engine = this.getEngine();
        return Engine.lookFor(pattern, text, maxDistance);
    }
};
