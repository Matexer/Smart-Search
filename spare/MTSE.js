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

    // async lookFor(searchData) {
    //     return new Promise((resolve, reject) => {
    //         try {
    //             resolve(this._lookFor(searchData));
    //         }    
    //         catch (e) {
    //             reject(e);
    //         }
    //     });
    // }

    lookFor(searchData) {
        return this._lookFor(searchData);
    }

    setConfig(config) {
        this.#config = config;
    }

    async _lookFor(searchData) {
        let pattern = searchData.pattern;
        let text = searchData.text;
        //let maxDistance = searchData.maxDistance;

        var sizeTVal = this._getSizeTVal(pattern);
        var engine = this._getEngine(sizeTVal);
        this._configEngine(engine);

        const t0 = performance.now();
        //let output = engine.lookFor(pattern, text, maxDistance);
        let numOfThreads = Math.min(window.navigator.hardwareConcurrency,
            // maxNumOfThreads,
            12
            )
        let indexesPerThread = Math.round(text.length / numOfThreads, 0);
        let pool = [];

        let firstIndex = 0;
        let lastIndex = indexesPerThread;
        for (let i = 0; i < numOfThreads - 1; i++) {
            pool.push(this._concLookFor(engine, searchData, firstIndex, lastIndex));
            firstIndex += indexesPerThread;
            lastIndex += indexesPerThread + pattern.length;
        }

        lastIndex = text.length + pattern.length;
        pool.push(this._concLookFor(engine, searchData, firstIndex, lastIndex));

        let outputs = await Promise.all(pool);

        let outputArray = [].concat(...outputs);

        console.log(outputArray);

        //let statsData = this._parseStatsData(output);

        // for(var i = 0 ; i < outputSize; i++) {
        //     outputArray.push({
        //         index: output.get(i).index,
        //         length: output.get(i).length,
        //         distance: output.get(i).distance
        //     });
        // }

        // output.delete();

        this._removeDuplicates(outputArray, text);
        let outputSize = outputArray.length;
        let statsData = this._parseStatsData(outputArray);

        let maxVals = Math.min(this.#config.maxNumOfOutputs, outputSize);
        outputArray.splice(maxVals);

        const t1 = performance.now();
        statsData.searchTime = Math.round(t1 - t0, 0);

        let outputData = {output: outputArray,
                          stats: statsData};

        console.log(outputData);

        return outputData;
    }

    _concLookFor(engine, searchData, firstIndex, lastIndex) {
        return new Promise((resolve, reject) => {
            try {
                var _searchData = {pattern: searchData.pattern,
                    text: searchData.text.substr(firstIndex, lastIndex - firstIndex + searchData.pattern.length),
                    maxDistance: searchData.maxDistance};
                let output = engine.lookFor(_searchData.pattern, _searchData.text, _searchData.maxDistance);
                let outputArray = this._parseOutput(output, firstIndex);
                output.delete();
                resolve(outputArray);
            }    
            catch (e) {
                reject(e);
            }
        });
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
        return Module["SearchEngineUTF" + this.#config.encoding + "Size" + sizeTVal];
    }

    _configEngine(engine) {
        engine.setDeletionCost(this.#config.deletionCost);
        engine.setInsertionCost(this.#config.insertionCost);
        engine.setSwapCost(this.#config.swapCost);

        engine.setPurifyRange(this.#config.purifyRange);
        engine.setFixRange(this.#config.fixRange);

        engine.setMaxNumOfThreads(2);
        engine.setMultiThreading(false);
        // engine.setMultiThreadingMinComplexity(this.multiThreadingMinComplexity);
        // engine.setMaxNumOfThreads(this.setMaxNumOfThreads);
    }

    _parseOutput(output, baseIndex=0) {
        let outputArray = [];
        let outputSize = output.size();
        for(var i = 0 ; i < outputSize; i++) {
            outputArray.push({
                index: output.get(i).index + baseIndex,
                length: output.get(i).length,
                distance: output.get(i).distance
            });
        }
        return outputArray;
    }

    // _parseStatsData(outputVec) {
    //     let histData = {};
    //     for(var i = 0 ; i < outputVec.size(); i++) {
    //         let dis = outputVec.get(i).distance;
    //         if (histData[dis]) {
    //             histData[dis] += 1;
    //         }
    //         else {
    //             histData[dis] = 1;
    //         }
    //     }

    //     let statsData = {numOfOutputs: outputVec.size(),
    //                      histData: histData};
    //     return statsData;
    // }

    _parseStatsData(outputArray) {
        let histData = {};
        for(var i = 0 ; i < outputArray.length; i++) {
            let dis = outputArray[i].distance;
            if (histData[dis]) {
                histData[dis] += 1;
            }
            else {
                histData[dis] = 1;
            }
        }

        let statsData = {numOfOutputs: outputArray.length,
                         histData: histData};
        return statsData;
    }

    _removeDuplicates(outputArray, text) {
        for (let i = 0; i < outputArray.length; i++) {
            const ele1 = outputArray[i];
            let word1 = text.substr(ele1.index, ele1.length);
            for (let j = i + 1; j < outputArray.length; j++) {
                const ele2 = outputArray[j];
                let word2 = text.substr(ele2.index, ele2.length);
                if (word1 == word2) {
                    outputArray.splice(j, 1);
                    j--;
                }
            }
        }
    }

};
