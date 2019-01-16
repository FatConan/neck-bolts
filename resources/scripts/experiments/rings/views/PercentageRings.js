define(["jquery", "underscore", "d3", "common/BaseClass",], function ($, _, d3, BaseClass){
    return BaseClass.extend({
        canvas: null,
        svg: null,

        init: function(options){
            this.radsPerPercent = (Math.PI * 2) / 100;
            this.arcColor = options && options.arcColor ? options.arcColor : "#169BD5";
            this.decorArcColor = options && options.decorArcColor ? options.decorArcColor : "rgba(0, 0, 0, 0.8)";
            this.backgroundArcColor = options && options.backgroundArcColor ? options.backgroundArcColor : "#D0D0D0";
            this.arcWidth = options && options.arcWidth ? options.arcWidth : 20;
            this.decorArcWidth = options && options.decorArcWidth ? options.decorArcWidth : 1;
        },

        resetCanvas: function(canvas, mainRadius){
            this.canvas = d3.select(canvas);
            this.canvas.html("");
            this.svg = this.canvas.append("svg")
            .attr("width", mainRadius * 2)
            .attr("height", mainRadius * 2)
            .append("g")
            .attr("transform", "translate(" + mainRadius+ "," + mainRadius + ")");
        },

        drawRing: function(percentage, radius, arcWidth, decorArcWidth, opts){
            var backgroundColor = opts.backgroundArcColor;
            var arcColor = opts.arcColor;
            var decorArcColor = opts.decorArcColor;
            var overArcColor = opts.overArcColor;


            if(percentage > 100){
                backgroundColor = arcColor;
                arcColor = overArcColor;
                percentage = percentage - 100;
            }

            var outerArc = d3.arc()
            .innerRadius(radius - arcWidth)
            .outerRadius(radius)
            .startAngle(this.radsPerPercent * percentage.toFixed(0))
            .endAngle(2 * Math.PI);

            this.svg.append("path")
            .attr("fill", backgroundColor)
            .attr("d", outerArc);

            //Draw the foreground arc (showing the percentage complete)
            var arc = d3.arc()
            .innerRadius(radius - arcWidth)
            .outerRadius(radius)
            .startAngle(0)
            .endAngle(this.radsPerPercent * percentage.toFixed(0));

            this.svg.append("path")
            .attr("fill", arcColor)
            .attr("d", arc);

            var decorArc = d3.arc()
            .innerRadius(radius - arcWidth - decorArcWidth)
            .outerRadius(radius - arcWidth)
            .startAngle(0)
            .endAngle(2 * Math.PI);

            this.svg.append("path")
            .attr("fill", decorArcColor)
            .attr("d", decorArc);
        },

        render: function(canvas, data, opts){
            this.resetCanvas(canvas, 250);
            var ops = {
                backgroundArcColor: "#bbbbbb",
                arcColor: "#dedede",
                decorArcColor: "#000000",
                overArcColor: "#ff0000"
            };

            var overArcColors = ["#ccaaff", "#ccbbff", "#ccccff", "#ccddff", "#cceeff", "#ccffff"];

            var outerRad = 200;
            var rad = outerRad;
            var width = 20;
            var decorWidth = 0;
            var pct = 100.0;

            console.log(data);

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

            var offset = data.months.length;
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
    });
});