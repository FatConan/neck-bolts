define(["jquery", "domReady", "d3"], function ($, domReady, d3) {
    return class PercentageLoader{
        constructor(options){
            this.radius = 100;
            this.canvas = null;
            this.svg = null;
        }
        resetCanvas(canvas){
            this.canvas = d3.select(canvas);
            this.canvas.html("");
            this.svg = this.canvas.append("svg")
                .attr("width", this.radius * 2)
                .attr("height", this.radius * 2)
                .append("g")
                .attr("transform", "translate(" + this.radius + "," + this.radius + ")");
        }

        draw(percentage){
            let radsPerPercent = (Math.PI * 2) / 100;

            let textColor = "#169BD5";
            if (percentage === 0) {
                textColor = "#D0D0D0";
            }

            let backgroundColor = "#D0D0D0";
            let arcColor = "#169BD5";

            //Draw the background arc
            let outerArc = d3.arc()
                .innerRadius(this.radius - 20)
                .outerRadius(this.radius - 15)
                .startAngle(0)
                .endAngle(2 * Math.PI);

            this.svg.append("path")
                .attr("fill", backgroundColor)
                .attr("d", outerArc);

            //Draw the foreground arc (showing the percentage complete)
            let arc = d3.arc()
                .innerRadius(this.radius - 20)
                .outerRadius(this.radius - 15)
                .startAngle(0)
                .endAngle(radsPerPercent * percentage.toFixed(0));

            this.svg.append("path")
                .attr("fill", arcColor)
                .attr("d", arc);

            let fontSize = Math.max((this.radius / 8));
            if (fontSize > 10) {
                this.svg.append("text")
                    .text(percentage.toFixed(0) + "%")
                    .attr("fill", textColor)
                    .style("font-size", fontSize + "pt")
                    .attr("text-anchor", "middle")
                    .attr("transform", "translate(" + -2 + "," + fontSize / 2 + ")");
            }
        }

        render(canvas, percentageToDisplay, radius){
            this.radius = radius;
            this.resetCanvas(canvas);
            this.draw(percentageToDisplay);
        }
    };
});
