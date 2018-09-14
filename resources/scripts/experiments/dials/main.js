requirejs(["../../build"], function(){
    'use strict';
    requirejs(["jquery", "domReady", "d3"], function ($, domReady, d3) {
        domReady(function(){
            function create(options){
                var chart = {
                    arcRadius: 100,
                    arcWidth: 20,
                    arrowWidth: 6,
                    arrowLength: 34,
                    canvas: null,
                    svg: null,

                    resetCanvas: function(canvas){
                       this.canvas = d3.select(canvas);
                       this.canvas.html("");
                       this.svg = this.canvas.append("svg")
                            .attr("width", (this.arcRadius * 5) + options.padding * 2)
                            .attr("height", (this.arcRadius * 2) + options.padding * 2)
                            .append("g")
                            .attr("transform", "translate(" + (this.arcRadius+options.padding) + "," + (this.arcRadius+options.padding) + ")");
                    },

                    drawArc: function(radius, startAngle, endAngle, color, width){
                        var arc = d3.arc()
                            .innerRadius(radius - width)
                            .outerRadius(radius)
                            .startAngle(startAngle)
                            .endAngle(endAngle);

                        this.svg.append("path")
                            .attr("fill", color)
                            .attr("d", arc);

                        return arc;
                    },

                    rotateNeedle: function(percentage){
                        var degreePerPercent = 180/100;
                        return -90 + degreePerPercent * percentage;
                    },

                    drawNeedle: function(angle){
                        var needleWidth = this.arrowWidth/2;
                        var needleLength = this.arrowLength - (this.arrowWidth/2);
                        var pathLine = [{x: 0, y: -needleLength}, {x: -needleWidth, y: 0}, {x: 0, y: 0}, {x: needleWidth, y: 0}, {x: 0, y: -needleLength}]
                        var container = this.svg.append("svg:g").attr("class", "pointerContainer");
                        var pointerLine = d3.line()
                            .x(function(d) { return d.x })
                            .y(function(d) { return d.y });

                        container.selectAll("path")
                            .data([pathLine])
                            .enter()
                            .append("svg:path")
                            .attr("d", pointerLine)
                            .attr("transform", function(d){
                                return "rotate(" + angle +")";
                            })
                            .style("fill", "#000")
                            .style("stroke", "#000")
                            .style("fill-opacity", 1);

                        container.append("svg:circle")
                            .attr("cx", 0)
                            .attr("cy", 0)
                            .attr("r", this.arrowWidth/2)
                            .style("fill", "#000")
                            .style("stroke", "#000")
                            .style("opacity", 1);
                    },

                    drawText: function(standard_percentage, benchmark_percentage, game_percentage){
                        this.svg.append("text")
                            .text("Standard " + standard_percentage.toFixed(0) + "%")
                            .attr("fill",  options.standardArcColor)
                            .style("font-size", "10pt")
                            .attr("text-anchor", "middle")
                            .attr("transform", "translate(" + 0 + "," + ((this.arcRadius/2) + 10) + ")");

                        this.svg.append("text")
                            .text("Benchmark " + benchmark_percentage.toFixed(0) + "%")
                            .attr("fill",  options.benchmarkArcColor)
                            .style("font-size", "10pt")
                            .attr("text-anchor", "middle")
                            .attr("transform", "translate(" + (this.arcRadius * 3) + "," + ((this.arcRadius/2) + 10) + ")");

                        this.svg.append("text")
                            .text(game_percentage.toFixed(0) + "%")
                            .attr("fill",  options.actualColor)
                            .style("font-size", "30pt")
                            .style("font-weight", "300")
                            .attr("text-anchor", "middle")
                            .attr("transform", "translate(" + (this.arcRadius * 3) + "," + 0 + ")");
                    },

                    draw: function(standard_percentage, benchmark_percentage, game_percentage){
                        var radsPerPercent = (Math.PI)/100;
                        var defaultStartAngle = 1.5 * Math.PI;
                        var defaultEndAngle = 2.5 * Math.PI;


                        //Draw the background arc
                        this.drawArc(this.arcRadius, defaultStartAngle, defaultEndAngle, options.backgroundColor, this.arcWidth);

                        if(benchmark_percentage > standard_percentage){
                            //Draw the benchmark value first
                            this.drawArc(this.arcRadius, defaultStartAngle, defaultStartAngle + (radsPerPercent * benchmark_percentage.toFixed(0)), options.benchmarkArcColor, this.arcWidth);
                            //Draw the standard arc second
                            this.drawArc(this.arcRadius, defaultStartAngle, defaultStartAngle + (radsPerPercent * standard_percentage.toFixed(0)), options.standardArcColor, this.arcWidth);
                        }else{
                            //Draw the standard arc second
                            this.drawArc(this.arcRadius, defaultStartAngle, defaultStartAngle + (radsPerPercent * standard_percentage.toFixed(0)), options.standardArcColor, this.arcWidth);
                            //Draw the benchmark value first
                            this.drawArc(this.arcRadius, defaultStartAngle, defaultStartAngle + (radsPerPercent * benchmark_percentage.toFixed(0)), options.benchmarkArcColor, this.arcWidth);
                        }

                        this.drawNeedle(this.rotateNeedle(game_percentage));
                        this.drawText(standard_percentage, benchmark_percentage, game_percentage);
                    },

                    react: function(value){
                        if(options.general.valueReaction){
                            return options.general.valueReaction(this, parent, value);
                        }
                        return value;
                    },

                    write: function(target){
                        var rowIndex = (options.rowIndex && options.rowIndex < this.dataProvider.length) ? options.rowIndex : 0;
                        try{
                            var benchmark = this.dataProvider[rowIndex]['benchmark_score'];
                            var standard = this.dataProvider[rowIndex]['standard_score'];
                            var actual = this.dataProvider[rowIndex]['actual_score'];

                            this.arcRadius = options.arcRadius;
                            this.arcWidth = options.arcWidth;
                            this.arrowWidth = options.arrowWidth;
                            this.arrowLength = options.arrowLength;
                            this.resetCanvas(target);
                            this.draw(standard, benchmark, actual);
                        }catch(e){
                            console.log(e);
                        }
                    }
                };

                return chart;
            }

            var options = {
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

            var els = ['#a', '#b', '#c', '#d', '#e', '#f'];
            var charts = [];

            for(var i=0; i < els.length; i++){
                var chart = create(options);
                chart.dataProvider = [{
                    'benchmark_score': Math.random() * 100,
                    'standard_score': Math.random() * 100,
                    'actual_score': Math.random() * 100
                }];
                charts.push(chart);
                chart.write(els[i]);
            }

            var reload = function(){
                var count = 0;
                for(var i=0; i < els.length; i++){
                    var chart = charts[i];
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