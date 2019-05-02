requirejs(["../../build"], function(){
    'use strict';
    requirejs(["jquery", "domReady", "experiments/dials/views/Dials"], function ($, domReady, Dials){
        domReady(function(){
            let options = {
                arcRadius: 45,
                arcWidth: 10,
                arrowWidth: 6,
                arrowLength: 30,
                backgroundColor: "#dddddd",
                standardArcColor:"#60bd88",
                benchmarkArcColor: "#3396c9",
                actualColor: '#000000',
                padding: 10
            };

            let els = ['#a', '#b', '#c', '#d', '#e', '#f'];
            let charts = [];

            for(let i=0; i < els.length; i++){
                let chart = new Dials(options);
                chart.dataProvider = [{
                    'benchmark_score': Math.random() * 100,
                    'standard_score': Math.random() * 100,
                    'actual_score': Math.random() * 100
                }];
                charts.push(chart);
                chart.write(els[i]);
            }

            let reload = function(){
                let count = 0;
                for(let i=0; i < els.length; i++){
                    let chart = charts[i];
                    if(chart.dataProvider[0]['actual_score'].toFixed(0) !== "100"){
                        chart.dataProvider = [{
                            'benchmark_score': Math.random() * 100,
                            'standard_score': Math.random() * 100,
                            'actual_score': Math.random() * 100
                        }];
                        chart.write(els[i]);
                    }else{
                        count++;
                    }
                }
                if(count !== els.length){
                    setTimeout(reload, 50);
                }
            };

            setTimeout(reload, 50);
        });
    });
});