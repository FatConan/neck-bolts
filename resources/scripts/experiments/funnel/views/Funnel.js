define(["jquery", "underscore", "d3", "common/BaseClass",], function ($, _, d3, BaseClass){
    return class Funnel extends BaseClass{
        constructor(options){
            super();
            this.canvas = null;
            this.svg = null;
            this.height = options && options.height ? options.height : 300;
            this.lineColor = options && options.lineColor ? options.lineColor : "#fff";
            this.sectionColors = options && options.sectionColors ? options.sectionColors: [
                "#ccaaff",
                "#ccbbff",
                "#ccccff",
                "#ccddff",
                "#cceeff",
                "#ccffff"].reverse();
        }

        resetCanvas(canvas){
            this.canvas = d3.select(canvas);
            this.canvas.html("");
            this.canvasWidth = $(canvas).width();
            this.svg = this.canvas.append("svg")
                .attr("width", this.canvasWidth)
                .attr("height", this.height);
        }

        drawSections(data, opts){
            let mode = opts && opts.mode ? opts.mode : "absolute";
            switch(mode){
                case "relative":
                    data.push({v: 100, l: ""});
                    break;

                case "absolute":
                default:
                    let d = data[data.length-1];
                    data.push({v: d.v, l:""});
                    break;
            }

            let backstops = [];
            let funnelWidth = this.canvasWidth/(data.length-1);
            let height = this.height;
            let previousHeight;
            let h;

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

            let trapezoidArrays = [];
            _.each(backstops, function(current, i){
                if(backstops[i+1]){
                    let d = data[i];
                    let next = backstops[i+1];
                    let offsetA = Math.floor((height-current)/2);
                    let offsetB = Math.floor((height-next)/2);

                    let points = [
                        {x: Math.floor(i*funnelWidth), y: offsetA, label: "🡆 " + d.v + "% - " + d.l},
                        {x: Math.floor(i*funnelWidth), y: height-offsetA, label: "🡆 " + d.v + "% - " + d.l},
                        {x: Math.floor((i+1) * funnelWidth), y: height-offsetB, label: "🡆 " + d.v + "% - " + d.l},
                        {x: Math.floor((i+1) * funnelWidth), y: offsetB, label: "🡆 " + d.v + "% - " + d.l}
                    ];
                    trapezoidArrays.push(points);
                }
            });
            let line = d3.line().x(function(d){
                return d.x;
            }).y(function (d){
                return d.y;
            });

            let blah = function(points, index){
                let trap = this.svg.append('path')
                    .attr("d", line(points) + 'Z')
                    .style("fill", this.sectionColors[index % this.sectionColors.length])
                    .style("stroke", this.lineColor);

                this.svg.append("g").data(points).append("text")
                    .style("font-size", "13pt")
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
        }

        render(canvas, data, opts){
            this.resetCanvas(canvas);
            this.drawSections(data, opts);
        }
    };
});