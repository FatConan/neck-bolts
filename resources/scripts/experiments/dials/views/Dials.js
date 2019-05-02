define(["jquery", "domReady", "d3", "common/BaseClass"], function($, domReady, d3, BaseClass){
    return class Dials extends BaseClass{
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
                .attr("transform", "translate(" + (this.arcRadius + this.padding) + "," + (this.arcRadius + this.padding) + ")");
        }

        drawArc(radius, startAngle, endAngle, color, width){
            let arc = d3.arc()
                .innerRadius(radius - width)
                .outerRadius(radius)
                .startAngle(startAngle)
                .endAngle(endAngle);

            this.svg.append("path")
                .attr("fill", color)
                .attr("d", arc);

            return arc;
        }

        rotateNeedle(percentage){
            let degreePerPercent = 180/100;
            return -90 + degreePerPercent * percentage;
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

        draw(standard_percentage, benchmark_percentage, game_percentage){
            let radsPerPercent = (Math.PI)/100;
            let defaultStartAngle = 1.5 * Math.PI;
            let defaultEndAngle = 2.5 * Math.PI;

            //Draw the background arc
            this.drawArc(this.arcRadius, defaultStartAngle, defaultEndAngle, this.backgroundColor, this.arcWidth);

            if(benchmark_percentage > standard_percentage){
                //Draw the benchmark value first
                this.drawArc(this.arcRadius, defaultStartAngle, defaultStartAngle + (radsPerPercent * benchmark_percentage.toFixed(0)), this.benchmarkArcColor, this.arcWidth);
                //Draw the standard arc second
                this.drawArc(this.arcRadius, defaultStartAngle, defaultStartAngle + (radsPerPercent * standard_percentage.toFixed(0)), this.standardArcColor, this.arcWidth);
            }else{
                //Draw the standard arc second
                this.drawArc(this.arcRadius, defaultStartAngle, defaultStartAngle + (radsPerPercent * standard_percentage.toFixed(0)), this.standardArcColor, this.arcWidth);
                //Draw the benchmark value first
                this.drawArc(this.arcRadius, defaultStartAngle, defaultStartAngle + (radsPerPercent * benchmark_percentage.toFixed(0)), this.benchmarkArcColor, this.arcWidth);
            }

            this.drawNeedle(this.rotateNeedle(game_percentage));
            this.drawText(standard_percentage, benchmark_percentage, game_percentage);
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

