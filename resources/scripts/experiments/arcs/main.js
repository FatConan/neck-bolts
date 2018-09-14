requirejs(["../../build"], function(){
    'use strict';
    requirejs(["jquery", "domReady", "d3"], function ($, domReady, d3) {
        domReady(function(){
            function create(options){
                var chart = {
                    arcRadius: 100,
                    arcWidth: 15,
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

                    interpolator: function(startAngle, endAngle){
                        var _default = d3.scaleLinear()
                          .domain([startAngle, endAngle])
                          .interpolate(d3.interpolateRgb)
                          .range(["#f5b55f", "#93bb66"]);
                        return function(angle){
                           return _default(angle);
                        }
                    },

                    drawArc: function(radius, startAngle, endAngle, color, width){
                        var arc = d3.arc()
                            .innerRadius(radius - width)
                            .outerRadius(radius)
                            .startAngle(startAngle)
                            .endAngle(endAngle);

                        this.svg.append("path")
                            .attr("stroke", color)
                            .attr("stroke-width", 1)
                            .attr("fill", color)
                            .attr("d", arc);

                        return arc;
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

                    rotateNeedle: function(arcLimits, standard_score, benchmark_score, score){
                        var benchmark_gap = (benchmark_score - standard_score);
                        var effectiveLimits = arcLimits.effectiveLimits();
                        var degsPerPoint = arcLimits.convertToDegrees(effectiveLimits.end - effectiveLimits.start)/benchmark_gap;
                        var angle;

                        if(score - standard_score < 0){
                            angle = arcLimits.convertToDegrees(arcLimits.start);
                        }else if(score - benchmark_score > 0){
                            angle = arcLimits.convertToDegrees(arcLimits.fullLimits().end);
                        }else{
                            angle = arcLimits.convertToDegrees(effectiveLimits.start) + ((score - standard_score) * degsPerPoint);
                        }

                        return angle;
                    },

                    draw: function(standard_score, benchmark_score, game_score){
                        var radsPerPercent = (2 * Math.PI)/100;

                        var arcLimits = this.createArcLimits(Math.PI/2, 2.5 * radsPerPercent, 2.5 * radsPerPercent);

                        //Draw "empty" indicator
                        var emptyArcLimits = arcLimits.emptyLimits();
                        this.drawArc(this.arcRadius, emptyArcLimits.start, emptyArcLimits.end, '#D54447', this.arcWidth);

                        var hundredth = arcLimits.effectiveHundredth();
                        var effectiveLimits = arcLimits.effectiveLimits();
                        var interpolator = this.interpolator(effectiveLimits.start, effectiveLimits.end);

                        //Draw the gradient filled effective area
                        var i =0;
                        while(i < 100){
                            var limits = arcLimits.effectiveLimitsIncremental(i, i += 2, hundredth);
                            this.drawArc(this.arcRadius, limits.start, limits.end, interpolator(limits.start), this.arcWidth);
                        }

                        //Draw the "full" indicator
                        var fullArcLimits = arcLimits.fullLimits();
                        this.drawArc(this.arcRadius, fullArcLimits.start, fullArcLimits.end, '#3997C7', this.arcWidth);

                        this.drawNeedle(this.rotateNeedle(arcLimits, standard_score, benchmark_score, game_score));
                        this.drawText(standard_score, benchmark_score, game_score);
                    },

                    createArcLimits: function(effectiveWidth, stopPointWidth, stopPointGapWidth){
                        var total_width = effectiveWidth + (2 * (stopPointWidth + stopPointGapWidth));
                        return {
                            degsPerRad: 360/(Math.PI*2),
                            start: -total_width/2,
                            emptyStartOffset: 0,
                            emptyEndOffset: stopPointWidth,
                            effectiveRangeStartOffset: stopPointWidth + stopPointGapWidth,
                            effectiveRangeEndOffset: stopPointWidth + stopPointGapWidth + effectiveWidth,
                            fullStartOffset: stopPointWidth + effectiveWidth + (2 * stopPointGapWidth),
                            fullEndOffset: total_width,

                            convertToDegrees: function(rads){
                                return this.degsPerRad * rads;
                            },

                            emptyLimits: function(){
                                return {
                                    start: this.start + this.emptyStartOffset,
                                    end: this.start + this.emptyEndOffset
                                }
                            },

                            fullLimits: function(){
                                return {
                                    start: this.start + this.fullStartOffset,
                                    end: this.start + this.fullEndOffset
                                }
                            },

                            effectiveHundredth: function(){
                                return (this.effectiveRangeEndOffset - this.effectiveRangeStartOffset)/100;
                            },

                            effectiveLimits: function(){
                                return {
                                    start: this.start + this.effectiveRangeStartOffset,
                                    end: this.start + this.effectiveRangeEndOffset
                                }
                            },

                            effectiveLimitsIncremental: function(i, j, hundredth){
                                var distance1 = i * hundredth;
                                var distance2 = j * hundredth;
                                if(i < 100){
                                    return {
                                        start: this.start + this.effectiveRangeStartOffset + distance1,
                                        end: this.start + this.effectiveRangeStartOffset + distance2
                                    }
                                }
                                return null;
                            }
                        }
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
                console.log("Creating for " + els[i]);
                var chart = create(options);
                var a = Math.random() * 100;
                var b = Math.random() * 100;

                var bench = Math.max(a, b);
                var standard = Math.min(a, b);
                var score = Math.random() * bench;

                chart.dataProvider = [{
                    'benchmark_score': bench,
                    'standard_score': standard,
                    'actual_score': score
                }];
                charts.push(chart);
                chart.write(els[i]);
            }

           var reload = function(){
                var count = 0;
                for(var i=0; i < els.length; i++){
                    var chart = charts[i];
                    var a = Math.random() * 100;
                    var b = Math.random() * 100;

                    var bench = Math.max(a, b);
                    var standard = Math.min(a, b);
                    var score = Math.random() * 100;

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