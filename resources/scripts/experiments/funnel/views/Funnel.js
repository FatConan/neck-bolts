define(["jquery", "underscore", "d3", "common/BaseClass",], function ($, _, d3, BaseClass){
    return BaseClass.extend({
        canvas: null,
        svg: null,

        init: function(options){
            this.height = options && options.height ? options.height : 300;
            this.lineColor = options && options.lineColor ? options.lineColor : "#fff";
            this.sectionColors = options && options.sectionColors ? options.sectionColors: [
                "#ccaaff",
                "#ccbbff",
                "#ccccff",
                "#ccddff",
                "#cceeff",
                "#ccffff"].reverse();
        },

        resetCanvas: function(canvas){
            this.canvas = d3.select(canvas);
            this.canvas.html("");
            this.canvasWidth = $(canvas).width();
            this.svg = this.canvas.append("svg")
            .attr("width", this.canvasWidth)
            .attr("height", this.height);
        },

        drawSections: function(data, opts){
            var mode = opts && opts.mode ? opts.mode : "absolute";
            switch(mode){
                case "relative":
                    data.push({v: 100, l: ""});
                    break;

                case "absolute":
                default:
                    var d = data[data.length-1];
                    data.push({v: d.v, l:""});
                    break;
            }

            var backstops = [];
            var funnelWidth = this.canvasWidth/(data.length-1);
            var height = this.height;
            var previousHeight;
            var h;

            _.each(data, function(d){
                switch(mode){
                    case "relative":
                        if(previousHeight){
                            h = previousHeight * (d.v/100);
                        }else{
                            h = height * (d.v/100);
                        }
                        previousHeight = h;
                        backstops.push(Math.floor(h));
                        break;

                    case "absolute":
                    default:
                        backstops.push(Math.floor(height * (d.v/100)));
                        break;
                }
            });

            console.log(backstops);

             var trapezoidArrays = [];
            _.each(backstops, function(current, i){
                if(backstops[i+1]){
                    var d = data[i];
                    var next = backstops[i+1];
                    var offsetA = Math.floor((height-current)/2);
                    var offsetB = Math.floor((height-next)/2);

                    var points = [
                        {x: Math.floor(i*funnelWidth), y: offsetA, label: "" + d.v + "% - " + d.l},
                        {x: Math.floor(i*funnelWidth), y: height-offsetA, label: "" + d.v + "% - " + d.l},
                        {x: Math.floor((i+1) * funnelWidth), y: height-offsetB, label: "" + d.v + "% - " + d.l},
                        {x: Math.floor((i+1) * funnelWidth), y: offsetB, label: "" + d.v + "% - " + d.l}
                    ];
                    trapezoidArrays.push(points);
                }
            });
            var line = d3.line().x(function(d){
                return d.x;
            }).y(function (d){
                return d.y;
            });

            var blah = function(points, index){
                console.log(points);
                var trap = this.svg.append('path')
                  .attr("d", line(points) + 'Z')
                  .style("fill", this.sectionColors[index % this.sectionColors.length])
                  .style("stroke", this.lineColor);

                this.svg.append("g").data(points).append("text")
                    .style("fill", "#000")
                    .style("stroke", "#000")
                    .attr("x", function(d){
                        return d.x + 10;
                    })
                    .attr("y", function (d) {
                        return this.height-30;
                    }.bind(this))
                    .attr("dy", ".35em")
                    .text(function (d) {
                        return "" + d.label;
                    });
            }.bind(this);

            _.each(trapezoidArrays, function(points, index){
                blah(points, index);
            });
        },

        render: function(canvas, data, opts){
            this.resetCanvas(canvas);
            this.drawSections(data, opts);
        }
    });
});