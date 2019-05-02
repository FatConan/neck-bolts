define(["jquery", "domReady", "d3", "common/BaseClass"], function($, domReady, d3, BaseClass){
    return class Arcs extends BaseClass{
        constructor(options){
            super();
            this.arcRadius = options.arcRadius ? options.arcRadius : 100;
            this.arcWidth = options.arcWidth ? options.arcWidth : 20;
            this.arrowWidth = options.arrowWidth ? options.arrowWidth : 6;
            this.arrowLength = options.arrowLength ? options.arrowLength : 34;
            this.padding = options.padding ? options.padding : 10;

            this.canvas = null;
            this.svg = null;

            this.backgroundColor = options.backgroundColor;
            this.standardArcColor = options.standardArcColor;
            this.benchmarkArcColor = options.benchmarkArcColor;
            this.actualColor = options.actualColor;

            this.rowIndex = options.rowIndex ? options.rowIndex  : 0;
            this.valueReaction = options.valueReaction;
        }

        resetCanvas(canvas){
            this.canvas = d3.select(canvas);
            this.canvas.html("");
            this.svg = this.canvas.append("svg")
                .attr("width", (this.arcRadius * 5) + this.padding * 2)
                .attr("height", (this.arcRadius * 2) + this.padding * 2)
                .append("g")
                .attr("transform", "translate(" + (this.arcRadius+this.padding) + "," + (this.arcRadius+this.padding) + ")");
        }

        interpolator(startAngle, endAngle){
            let _default = d3.scaleLinear()
                .domain([startAngle, endAngle])
                .interpolate(d3.interpolateRgb)
                .range(["#f5b55f", "#93bb66"]);
            return function(angle){
                return _default(angle);
            }
        }

        drawArc(radius, startAngle, endAngle, color, width){
            let arc = d3.arc()
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
        }

        drawText(standard_percentage, benchmark_percentage, game_percentage){
            this.svg.append("text")
                .text("Standard " + standard_percentage.toFixed(0) + "%")
                .attr("fill",  this.standardArcColor)
                .style("font-size", "10pt")
                .attr("text-anchor", "middle")
                .attr("transform", "translate(" + 0 + "," + ((this.arcRadius/2) + 10) + ")");

            this.svg.append("text")
                .text("Benchmark " + benchmark_percentage.toFixed(0) + "%")
                .attr("fill",  this.benchmarkArcColor)
                .style("font-size", "10pt")
                .attr("text-anchor", "middle")
                .attr("transform", "translate(" + (this.arcRadius * 3) + "," + ((this.arcRadius/2) + 10) + ")");

            this.svg.append("text")
                .text(game_percentage.toFixed(0) + "%")
                .attr("fill",  this.actualColor)
                .style("font-size", "30pt")
                .style("font-weight", "300")
                .attr("text-anchor", "middle")
                .attr("transform", "translate(" + (this.arcRadius * 3) + "," + 0 + ")");
        }

        drawNeedle(angle){
            let needleWidth = this.arrowWidth/2;
            let needleLength = this.arrowLength - (this.arrowWidth/2);
            let pathLine = [{x: 0, y: -needleLength}, {x: -needleWidth, y: 0}, {x: 0, y: 0}, {x: needleWidth, y: 0}, {x: 0, y: -needleLength}];
            let container = this.svg.append("svg:g").attr("class", "pointerContainer");
            let pointerLine = d3.line()
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
        }

        rotateNeedle(arcLimits, standard_score, benchmark_score, score){
            let benchmark_gap = (benchmark_score - standard_score);
            let effectiveLimits = arcLimits.effectiveLimits();
            let degsPerPoint = arcLimits.convertToDegrees(effectiveLimits.end - effectiveLimits.start)/benchmark_gap;
            let angle;

            if(score - standard_score < 0){
                angle = arcLimits.convertToDegrees(arcLimits.start);
            }else if(score - benchmark_score > 0){
                angle = arcLimits.convertToDegrees(arcLimits.fullLimits().end);
            }else{
                angle = arcLimits.convertToDegrees(effectiveLimits.start) + ((score - standard_score) * degsPerPoint);
            }

            return angle;
        }

        draw(standard_score, benchmark_score, game_score){
            let radsPerPercent = (2 * Math.PI)/100;

            let arcLimits = this.createArcLimits(Math.PI/2, 2.5 * radsPerPercent, 2.5 * radsPerPercent);

            //Draw "empty" indicator
            let emptyArcLimits = arcLimits.emptyLimits();
            this.drawArc(this.arcRadius, emptyArcLimits.start, emptyArcLimits.end, '#D54447', this.arcWidth);

            let hundredth = arcLimits.effectiveHundredth();
            let effectiveLimits = arcLimits.effectiveLimits();
            let interpolator = this.interpolator(effectiveLimits.start, effectiveLimits.end);

            //Draw the gradient filled effective area
            let i =0;
            while(i < 100){
                let limits = arcLimits.effectiveLimitsIncremental(i, i += 2, hundredth);
                this.drawArc(this.arcRadius, limits.start, limits.end, interpolator(limits.start), this.arcWidth);
            }

            //Draw the "full" indicator
            let fullArcLimits = arcLimits.fullLimits();
            this.drawArc(this.arcRadius, fullArcLimits.start, fullArcLimits.end, '#3997C7', this.arcWidth);

            this.drawNeedle(this.rotateNeedle(arcLimits, standard_score, benchmark_score, game_score));
            this.drawText(standard_score, benchmark_score, game_score);
        }

        createArcLimits(effectiveWidth, stopPointWidth, stopPointGapWidth){
            let total_width = effectiveWidth + (2 * (stopPointWidth + stopPointGapWidth));
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
        }

        react(value){
            if(this.valueReaction){
                return this.valueReaction(this, parent, value);
            }
            return value;
        }

        write(target){
            let rowIndex = (this.rowIndex && this.rowIndex < this.dataProvider.length) ? this.rowIndex : 0;
            try{
                let benchmark = this.dataProvider[rowIndex]['benchmark_score'];
                let standard = this.dataProvider[rowIndex]['standard_score'];
                let actual = this.dataProvider[rowIndex]['actual_score'];

                this.resetCanvas(target);
                this.draw(standard, benchmark, actual);
            }catch(e){
                console.log(e);
            }
        }
    };
});