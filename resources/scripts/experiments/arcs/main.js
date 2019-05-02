requirejs(["../../build"], function(){
    'use strict';
    requirejs(["jquery", "domReady", "experiments/arcs/views/Arcs"], function ($, domReady, Arcs){
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
                console.log("Creating for " + els[i]);
                let chart = new Arcs(options);
                let a = Math.random() * 100;
                let b = Math.random() * 100;

                let bench = Math.max(a, b);
                let standard = Math.min(a, b);
                let score = Math.random() * bench;

                chart.dataProvider = [{
                    'benchmark_score': bench,
                    'standard_score': standard,
                    'actual_score': score
                }];
                charts.push(chart);
                chart.write(els[i]);
            }

            let reload = function(){
                let count = 0;
                for(let i=0; i < els.length; i++){
                    let chart = charts[i];
                    let a = Math.random() * 100;
                    let b = Math.random() * 100;

                    let bench = Math.max(a, b);
                    let standard = Math.min(a, b);
                    let score = Math.random() * 100;

                    chart.dataProvider = [{
                        'benchmark_score': bench,
                        'standard_score': standard,
                        'actual_score': score
                    }];

                    chart.write(els[i]);
                }

                if(count !== els.length){
                    setTimeout(reload, 50);
                }
            };

            setTimeout(reload, 50);
        });
    });
});