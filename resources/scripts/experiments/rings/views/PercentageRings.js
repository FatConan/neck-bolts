define(["jquery", "underscore", "d3", "common/BaseClass",], function ($, _, d3, BaseClass){
    return class PercentageRings extends BaseClass{
        constructor(options){
            super();
            this.canvas = null;
            this.svg = null;

            this.radsPerPercent = (Math.PI * 2) / 100;
            this.arcColor = options && options.arcColor ? options.arcColor : "#169BD5";
            this.decorArcColor = options && options.decorArcColor ? options.decorArcColor : "rgba(0, 0, 0, 0.8)";
            this.backgroundArcColor = options && options.backgroundArcColor ? options.backgroundArcColor : "#D0D0D0";
            this.arcWidth = options && options.arcWidth ? options.arcWidth : 20;
            this.decorArcWidth = options && options.decorArcWidth ? options.decorArcWidth : 1;
        }

        resetCanvas(canvas, mainRadius){
            this.canvas = d3.select(canvas);
            this.canvas.html("");
            this.svg = this.canvas.append("svg")
                .attr("width", mainRadius * 2)
                .attr("height", mainRadius * 2)
                .append("g")
                .attr("transform", "translate(" + mainRadius+ "," + mainRadius + ")");
        }

        drawRing(percentage, radius, arcWidth, decorArcWidth, opts){
            let backgroundColor = opts.backgroundArcColor;
            let arcColor = opts.arcColor;
            let decorArcColor = opts.decorArcColor;
            let overArcColor = opts.overArcColor;

            if(percentage > 100){
                backgroundColor = arcColor;
                arcColor = overArcColor;
                percentage = percentage - 100;
            }

            let outerArc = d3.arc()
                .innerRadius(radius - arcWidth)
                .outerRadius(radius)
                .startAngle(this.radsPerPercent * percentage.toFixed(0))
                .endAngle(2 * Math.PI);

            this.svg.append("path")
                .attr("fill", backgroundColor)
                .attr("d", outerArc);

            //Draw the foreground arc (showing the percentage complete)
            let arc = d3.arc()
                .innerRadius(radius - arcWidth)
                .outerRadius(radius)
                .startAngle(0)
                .endAngle(this.radsPerPercent * percentage.toFixed(0));

            this.svg.append("path")
                .attr("fill", arcColor)
                .attr("d", arc);

            let decorArc = d3.arc()
                .innerRadius(radius - arcWidth - decorArcWidth)
                .outerRadius(radius - arcWidth)
                .startAngle(0)
                .endAngle(2 * Math.PI);

            this.svg.append("path")
                .attr("fill", decorArcColor)
                .attr("d", decorArc);
        }

        render(canvas, data, opts){
            this.resetCanvas(canvas, 250);
            let ops = {
                backgroundArcColor: "#bbbbbb",
                arcColor: "#dedede",
                decorArcColor: "#000000",
                overArcColor: "#ff0000"
            };

            let overArcColors = ["#ccaaff", "#ccbbff", "#ccccff", "#ccddff", "#cceeff", "#ccffff"];

            let outerRad = 200;
            let rad = outerRad;
            let width = 20;
            let decorWidth = 0;
            let pct = 100.0;

            _.each(data.months, function(e, i){
                pct = (e.worked * 100)/e.alloted;
                rad = outerRad - (i * 25);
                ops.overArcColor = overArcColors[i % overArcColors.length];
                this.drawRing(pct, rad, width, decorWidth, ops);
            }.bind(this));

            this.svg.append("text")
                .text("Last 3 Months")
                .style("font-size", "15pt")
                .attr("text-anchor", "middle")
                .attr("transform", "translate(180, 160)");

            let offset = data.months.length;
            _.each(data.years, function(e, i){
                pct = (e.worked * 100)/e.alloted;
                rad = outerRad - ((offset + i + 1) * 25);
                ops.overArcColor = overArcColors[(i + offset) % overArcColors.length];
                this.drawRing(pct, rad, width, decorWidth, ops);
            }.bind(this));

             this.svg.append("text")
                .text("Last 3 Years")
                .style("font-size", "15pt")
                .attr("text-anchor", "middle")
                .attr("transform", "translate(90, 90)");
        }
    };
});