define(["jquery", "underscore"],
    function ($, _){
        return class Clock{
            constructor(options){
                this.target = options.target;
                this.clockFace = _.template("<span class=\"clock\">" +
                    "<span class='date'><%- day %>/<%- month %>/<%- year %></span>" +
                    "<span class='time'><%- hour %>" +
                    "<span style='visibility: <%- tick %>;'>:</span>" +
                    "<%- minute %></span></span>");
                this.init();
            }

            init(){
                let tick = function(){
                    let today = new Date();
                    let day = today.getDate();
                    let month = today.getMonth() + 1;
                    let year = today.getFullYear();
                    let h = today.getHours();
                    let m = today.getMinutes();
                    let s = today.getSeconds();
                    let dateValues = {
                        day: ("00" + day).slice(-2),
                        month: ("00" + month).slice(-2),
                        year: ("0000" + year).slice(-4),
                        hour: ("00" + h).slice(-2),
                        minute: ("00" + m).slice(-2),
                        tick: s % 2 === 0 ? "hidden" : "visible"
                    };
                    this.target.empty().append(this.clockFace(dateValues));
                }.bind(this);

                tick();
                setInterval(tick, 1000);
            }
        };
    }
);