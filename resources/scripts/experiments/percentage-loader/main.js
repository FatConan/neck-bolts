requirejs(["../../build"], function(){
    'use strict';
    requirejs(["jquery", "domReady", "d3"], function ($, domReady, d3) {
        domReady(function () {
            var progressIndicator = ({
                radius: 100,
                canvas: null,
                svg: null,

                create: function () {
                    return this;
                },

                resetCanvas: function (canvas) {
                    this.canvas = d3.select(canvas);
                    this.canvas.html("");
                    this.svg = this.canvas.append("svg")
                        .attr("width", this.radius * 2)
                        .attr("height", this.radius * 2)
                        .append("g")
                        .attr("transform", "translate(" + this.radius + "," + this.radius + ")");
                },

                draw: function (percentage) {
                    var radsPerPercent = (Math.PI * 2) / 100;

                    var textColor = "#169BD5";
                    if (percentage === 0) {
                        textColor = "#D0D0D0";
                    }

                    var backgroundColor = "#D0D0D0";
                    var arcColor = "#169BD5";

                    //Draw the background arc
                    var outerArc = d3.arc()
                        .innerRadius(this.radius - 20)
                        .outerRadius(this.radius - 15)
                        .startAngle(0)
                        .endAngle(2 * Math.PI);

                    this.svg.append("path")
                        .attr("fill", backgroundColor)
                        .attr("d", outerArc);

                    //Draw the foreground arc (showing the percentage complete)
                    var arc = d3.arc()
                        .innerRadius(this.radius - 20)
                        .outerRadius(this.radius - 15)
                        .startAngle(0)
                        .endAngle(radsPerPercent * percentage.toFixed(0));

                    this.svg.append("path")
                        .attr("fill", arcColor)
                        .attr("d", arc);

                    var fontSize = Math.max((this.radius / 8));
                    if (fontSize > 10) {
                        this.svg.append("text")
                            .text(percentage.toFixed(0) + "%")
                            .attr("fill", textColor)
                            .style("font-size", fontSize + "pt")
                            .attr("text-anchor", "middle")
                            .attr("transform", "translate(" + -2 + "," + fontSize / 2 + ")");
                    }
                },

                render: function (canvas, percentageToDisplay, radius) {
                    this.radius = radius;
                    this.resetCanvas(canvas);

                    this.draw(percentageToDisplay);
                }
            }).create();

            var rand = Math.random() * 100;
            var radius = 100;
            progressIndicator.render("div.canvas", rand, radius.toFixed(0));

            d3.select("#test").on('click', function () {
                var rand = Math.random() * 100;
                progressIndicator.render("div.canvas", rand, radius.toFixed(0));
            });
        });
    });
});