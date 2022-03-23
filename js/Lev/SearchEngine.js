export class SearchEngine {
    static encodingVal = "";
    static deletionCost = 1;
    static insertionCost = 1;


    static lookFor(pattern, text, maxDistance) {
        var SizeTVal = this.getSizeTVal(pattern);
        let Engine = this.getEngine(SizeTVal);
        return Engine.lookFor(pattern, text, maxDistance);
    }

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

    static getSizeTVal(pattern) {
        if (pattern.length < 256) {
            return 8;
        }
        else if (pattern.length < 65536) {
            return 16;
        }
        else if (pattern.length < 4294967296) {
            return 32;
        }
        else {
            console.error("Too long pattern. Max length is 4 294 967 295")
            return 1;
        }
    }

    static getEngine(SizeTVal) {
        switch(SizeTVal) {

        case(8):
            if (this.encodingVal == "") {
                return Module.SearchEngineStr8;
            }
            else if (this.encodingVal == "16") {
                return Module.SearchEngine16Str8;
            }
            else {
                return Module.SearchEngine32Str8;
            }
        break

        case(16): 
            if (this.encodingVal == "") {
                return Module.SearchEngineStr16;
            }
            else if (this.encodingVal == "16") {
                return Module.SearchEngine16Str16;
            }
            else {
                return Module.SearchEngine32Str16;
            }
        break

        default:
            if (this.encodingVal == "") {
                return Module.SearchEngineStr32;
            }
            else if (this.encodingVal == "16") {
                return Module.SearchEngine16Str32;
            }
            else {
                return Module.SearchEngine32Str32;
            }
        break
    }
    }
};
