export class SearchEngine {
    #config = {deletionCost: 1,
        insertionCost: 1,
        swapCost: 1,
        purifyRange: 10,
        fixRange: 2,
        encoding: 16,
        maxNumOfOutputs: 10,
        // muliThreading = false;
        // multiThreadingMinComplexity = 100;
        // maxNumOfThreads = 12;
        }

    lookFor(searchData) {
        let pattern = searchData.pattern;
        let text = searchData.text;
        let maxDistance = searchData.maxDistance;

        var sizeTVal = this._getSizeTVal(pattern);
        var engine = this._getEngine(sizeTVal);
        this._configEngine(engine);

        const t0 = performance.now();
        let output = engine.lookFor(pattern, text, maxDistance);
        const t1 = performance.now();

        let outputArray = [];
        let statsData = this._parseStatsData(output);
        statsData.searchTime = Math.round(t1 - t0, 0);
    
        let maxVals = Math.min(this.#config.maxNumOfOutputs, output.size());
        for(var i = 0 ; i < maxVals; i++) {
            outputArray.push({
                index: output.get(i).index,
                length: output.get(i).length,
                distance: output.get(i).distance
            });
        }
    
        output.delete();

        let outputData = {output: outputArray,
                          stats: statsData};
        return outputData;
    }

    setConfig(config) {
        this.#config = config;
    }

    _getSizeTVal(pattern) {
        let theMostSigFactor = Math.max(this.#config.deletionCost,
                                        this.#config.insertionCost,
                                        this.#config.swapCost)
        let maxVal = (pattern.length + 2*this.#config.fixRange) * theMostSigFactor;

        if (maxVal < 256) {
            return "8";
        }
        else if (maxVal < 65536) {
            return "16";
        }
        else if (maxVal < 4294967296) {
            return "32";
        }
        else {
            new Error("Too big possible cost. Max is 4 294 967 295");
        }
    }

    _getEngine(sizeTVal) {
        return Module["SearchEngine" + this.#config.encoding + "Str" + sizeTVal];
    }

    _configEngine(engine) {
        engine.setDeletionCost(this.#config.deletionCost);
        engine.setInsertionCost(this.#config.insertionCost);
        engine.setSwapCost(this.#config.swapCost);

        engine.setPurifyRange(this.#config.purifyRange);
        engine.setFixRange(this.#config.fixRange);

        engine.setMultiThreading(false);
        // engine.setMultiThreadingMinComplexity(this.multiThreadingMinComplexity);
        // engine.setMaxNumOfThreads(this.setMaxNumOfThreads);
    }

    _parseStatsData(outputVec) {
        let histData = {};
        for(var i = 0 ; i < outputVec.size(); i++) {
            let dis = outputVec.get(i).distance;
            if (histData[dis]) {
                histData[dis] += 1;
            }
            else {
                histData[dis] = 1;
            }
        }

        let statsData = {numOfOutputs: outputVec.size(),
                         histData: histData};
        return statsData;
    }
};
