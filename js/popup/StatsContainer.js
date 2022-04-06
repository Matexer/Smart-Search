import { Container } from "./Container.js";


export class StatsContainer extends Container {
    _id = "#stats-container";
    _HTMLPath = "html/statsContainer.html";
    _chart = null;

    resetBtnId = "#reset-stats-btn";
    langText;

    showLastSearchStats(data) {
        $('#stats-pattern').text(data.pattern);
        $('#stats-pattern-length').text(data.pattern.length);
        $('#stats-text-length').text(data.textLength);
        $('#stats-max-distance').text(data.maxDistance);
        $('#stats-search-time').text(data.searchTime);
        $('#stats-numOfOutputs').text(data.numOfOutputs);

        this._showOnChart(data.histData);
    }

    showTotalSearchStats(data) {
        $('#stats-numOfPatterns').text(data.numOfPatterns);
        $('#stats-totalNumOfOutputs').text(data.numOfOutputs);
        $('#stats-numOfAnalizedSigns').text(data.analizedSigns);
    }

    reloadChartLabels() {
        if (this._chart) {
            let xs = this._chart.data.labels;
            let ys = this._chart.data.datasets[0].data;
            this._updateChart(xs, ys);
        }
    }

    _showOnChart(histData) {
        if (!this._chart) {
            this._chart = this._drawChart(histData.xs, histData.ys);
        }
        else {
            this._updateChart(histData.xs, histData.ys);
        }
    }

    _updateChart(xs, ys) {
        this._chart.destroy();
        this._chart = this._drawChart(xs, ys);
    }

    _drawChart(xs, ys) {
       return new Chart($('#barChart'), {
            type: 'bar',
            data: {
                labels: xs,
                datasets: [{
                    data: ys,
                    backgroundColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ]
                }]
            },

            options: {
                plugins: {
                    legend: {
                        display: false
                    },
                     tooltips: {
                        enabled: false
                    }
                },
                scales: {
                    yAxes: {
                        title: {
                            display: true,
                            text: this.langText["lang-occurences"],
                            font: {
                                size: 15
                            }
                        },
                        ticks: {
                            precision: 0,
                        }
                    },
                    xAxes: {
                        title: {
                            display: true,
                            text: this.langText["lang-Levenshtein-distance"],
                            font: {
                                size: 15
                            }
                        }
                    }
                },
            }
        });
        
    }
}