export class SearchEngine {
    encodingVal = "8";

    deletionCost = 1;
    insertionCost = 1;
    swapCost = 1;

    purifyRange = 5;
    fixRange = 5;

    muliThreading = false;
    multiThreadingMinComplexity = 100;
    maxNumOfThreads = 12;


    lookFor(pattern, text, maxDistance) {
        var SizeTVal = this.getSizeTVal(pattern);
        var Engine = this.getEngine(SizeTVal);

        Engine.setDeletionCost(this.deletionCost);
        Engine.setInsertionCost(this.insertionCost);
        Engine.setSwapCost(this.swapCost);

        Engine.setPurifyRange(this.purifyRange);
        Engine.setFixRange(this.fixRange);

        Engine.setMultiThreading(this.muliThreading);
        Engine.setMultiThreadingMinComplexity(this.multiThreadingMinComplexity);
        Engine.setMaxNumOfThreads(this.setMaxNumOfThreads);

        return Engine.lookFor(pattern, text, maxDistance);
    }

    setEncoding(encoding) {
        switch (encoding) {
            case "utf-8":
                this.encodingVal = "8";
                break
            case "utf-16":
                this.encodingVal = "16";
                break      
            case "utf-32":
                this.encodingVal = "32";
                break
            default:
                new Error("Attempt to set inappropriate encoding. \
                    Possible values: utf-8, utf-16, utf-32")
        }
    }

    getSizeTVal(pattern) {
        if (pattern.length < 256) {
            return "";
        }
        else if (pattern.length < 65536) {
            return "16";
        }
        else if (pattern.length < 4294967296) {
            return "32";
        }
        else {
            new Error("Too long pattern. Max length is 4 294 967 295");
        }
    }

    getEngine(sizeTVal) {
        return Module["SearchEngine" + sizeTVal + "Str" + this.encodingVal];
    }
};
