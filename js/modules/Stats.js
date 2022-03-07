import { Basic } from "./Basic.js";


export class Stats extends Basic {
    constructor(root) {
        super(root, "html/statsContainer.html");
    }

    static drawLastHistChart(xs, ys) {
       return new Chart($('#lastHistChart'), {
            type: 'bar',
            data: {
                labels: ys,
                datasets: [{
                    data: xs,
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
                            text: "Wystąpienia",
                            font: {
                                size: 15
                            }
                        },
                        ticks: {
                            precision: 0
                        }
                    },
                    xAxes: {
                        title: {
                            display: true,
                            text: "Odległość edycji",
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