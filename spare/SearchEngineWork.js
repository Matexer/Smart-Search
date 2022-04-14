export class SearchEngine {
    #config = {deletionCost: 1,
        insertionCost: 1,
        swapCost: 1,
        purifyRange: 10,
        fixRange: 2,
        encoding: 16,
        maxNumOfOutputs: 10,
        }

    lookFor(searchData) {
        return this._lookFor(searchData);
    }

    setConfig(config) {
        this.#config = config;
    }

    async _lookFor(searchData) {
        let pattern = searchData.pattern;
        let text = searchData.text;

        var sizeTVal = this._getSizeTVal(pattern);
        var engine = this._getEngine(sizeTVal);
        this._configEngine(engine);

        const t0 = performance.now();

        let numOfThreads = window.navigator.hardwareConcurrency;
        let indexesPerThread = Math.round(text.length / numOfThreads, 0);
        let pool = [];

        var outputArray = [];
        var threadFinishCounter = 0;

        let firstIndex = 0;
        let lastIndex = indexesPerThread;
        for (let i = 0; i < numOfThreads - 1; i++) {
            let worker = this._spawnWorker();
            //let worker = new Worker("SearchWorker.js");
            let msg = {type: "LookFor",
                       content: {
                            engine: engine, 
                            searchData: searchData, 
                            firstIndex: firstIndex, 
                            lastIndex: lastIndex
                       }}

            
            worker.addEventListener('message', function(event) {
                let msg = event.data;

                if (msg.type != "LookForReturn") {return;}

                outputArray += msg.content;
                threadFinishCounter++;
            }, false);

            worker.postMessage(msg);
            pool.push(worker);

            firstIndex += indexesPerThread;
            lastIndex += indexesPerThread + pattern.length;
        }


        lastIndex = text.length + pattern.length;
        let worker = this._spawnWorker();
        let msg = {type: "LookFor",
                    content: {
                        engine: engine, 
                        searchData: searchData, 
                        firstIndex: firstIndex, 
                        lastIndex: lastIndex
                    }}


        worker.addEventListener('message', function(event) {
            let msg = event.data;

            if (msg.type != "LookForReturn") {return;}

            outputArray += msg.content;
            threadFinishCounter++;
        }, false);

        worker.postMessage(msg);
        pool.push(worker);

        while (threadFinishCounter < numOfThreads) {
            await sleep(10);
            console.log(threadFinishCounter);
        }

        console.log(outputArray);

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

    _spawnWorker() {
        return new Worker(URL.createObjectURL(new Blob(["("+worker.toString()+")()"], {type: 'text/javascript'})));
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

        engine.setMultiThreading(false);
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

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

};
