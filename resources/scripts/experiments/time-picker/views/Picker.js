define(["jquery", "underscore", "common/BaseClass",
        "jquery-ui"],
    function ($, _, BaseClass) {
        return BaseClass.extend({
            init: function(){
                this.target = $("section.picker");

                this.selecting = false;
                this.start = null;
                this.end = null;

                this.addListeners();
            },

            highlightRange: function(start, end, className){
                var started = false;
                var done = false;
                _.each(this.target[0].children, function(d){
                    if(!done){
                        if(d === start || d === end){
                            $(d).addClass(className);
                            if(started){
                               done = true;
                            }else{
                                started = true;
                            }
                        }else if(started){
                            $(d).addClass(className);
                        }
                    }
                }.bind(this));
            },

            addListeners: function(){
                this.target.on("mousedown", function (e) {
                    var el = e.target;
                    while (el && el.matches && !el.matches("div.division")) {
                        el = el.parentNode;
                    }
                    if(el){
                        this.start = el;
                        this.selecting = true;
                    }
                }.bind(this));

                this.target.on("mouseover", function(e){
                    if(this.selecting){
                        var el = e.target;
                        while (el && el.matches && !el.matches("div.division")) {
                            el = el.parentNode;
                        }
                        if(el){
                            this.highlightRange(this.start, el, "hover");
                        }
                    }
                }.bind(this));

                this.target.on("mouseup", function (e) {
                    if(this.selecting){
                        var el = e.target;
                        while (el && el.matches && !el.matches("div.division")) {
                            el = el.parentNode;
                        }
                        if(el){
                            this.end = el;
                            this.target.find("div.hover").removeClass("hover");
                            this.highlightRange(this.start, this.end, "selected");
                        }
                    }
                    this.selecting = false;
                }.bind(this));
            }
        });
    }
);