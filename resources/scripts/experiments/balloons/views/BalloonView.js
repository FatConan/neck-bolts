define(["jquery", "underscore", "common/BaseClass",
        "jquery-ui"],
    function ($, _, BaseClass) {
        return BaseClass.extend({
            init: function(){
                this.balloonImg = "/resources/img/balloon2.svg";
                this.balloonCount = 99;
                this.completedCount = 0;
                this.celebrationTimeout = null;
                this.balloonTimeouts = [];
                this.animationTimeouts = [];

                this.displayCelebrationIndex = 0;
                this.displayCelebrations = [{type: "Anniversary", targets:["Dave &mdash; 2yrs"]}, {type: "BIRTHDAY", targets:["Ian", "Bob", "Jane"]}];

                this.shim = $('<div class="celebration-shim"></div>');
                $("html").append(this.shim);

                this.addListeners();
            },

            addListeners: function(){
                this.shim.on("click", function(){
                    this.closeShim();
                }.bind(this));

                this.shim.on("transitionend", function(e) {
                    var et = e.target;
                    var $et = $(et);
                    if(et.matches("div.celebration-shim")){
                        if(!this.shim.hasClass("show")){
                            this.shim.removeClass("prep");
                            this.clearTimeouts();

                            this.celebrationTimeout = setTimeout(function(){
                                this.shim.addClass("prep");
                                setTimeout(function(){
                                    if(this.celebrationTimeout) {
                                        this.celebrate(this.nextCelebration());
                                    }
                                }.bind(this), 100);
                            }.bind(this), 2000);
                        }
                    }else if(et.matches("div.balloon")) {
                        $et.remove();
                        this.completedCount += 1;
                        if (this.completedCount === this.balloonCount) {
                            this.closeShim();
                        }
                    }
                }.bind(this));

                this.celebrationTimeout = setTimeout(function(){
                    this.shim.addClass("prep");
                    setTimeout(function(){
                        if(this.celebrationTimeout) {
                            this.celebrate(this.nextCelebration());
                        }
                    }.bind(this), 100);
                }.bind(this), 2000);
            },

            nextCelebration: function(){
               var celebration = this.displayCelebrations[this.displayCelebrationIndex];
               this.displayCelebrationIndex += 1;
               this.displayCelebrationIndex = this.displayCelebrationIndex % this.displayCelebrations.length;
               return celebration;
            },

            clearTimeouts: function(){
                clearTimeout(this.celebrationTimeout);
                this.celebrationTimeout = null;
                _.each(this.balloonTimeouts, function(balloonTimeoutId){
                    clearTimeout(balloonTimeoutId);
                });
                _.each(this.animationTimeouts, function(animationTimeoutId){
                    clearTimeout(animationTimeoutId);
                });
                this.balloonTimeouts = [];
                this.animationTimeouts = [];
            },

            resetShim: function(){
                this.shim.empty();
            },

            closeShim: function(){
               this.shim.removeClass("show");
            },

            showShim: function(){
                this.shim.addClass("prep");
                this.shim.addClass("show");
            },

            floatBalloon: function(balloon){
                return function(){
                    balloon.css("top", (-1 * balloon.height()) + "px");
                }
            },

            createBalloon: function(randId, left, hue, speed, scaleFactor){
                return function(){
                    var zIndex = Math.floor(scaleFactor * 100);
                    var dimension = Math.floor((scaleFactor * 400) + 100);

                    var b = $('<div class="balloon"></div>');
                    b.css("transition", "top " + speed + "s linear");
                    b.css("background-image", "url(" + this.balloonImg + "?id=" + randId + ")");
                    b.css("left", "" + left + "%");
                    b.css("height", "" + dimension + "px");
                    b.css("width", "" + dimension + "px");
                    b.css("z-index", zIndex);
                    b.css("-webkit-filter", "hue-rotate(" + hue + "deg) " + "brightness(" + (scaleFactor * 100) + "%)");
                    b.css("filter",  "hue-rotate(" + hue + "deg) " + "brightness(" + (scaleFactor * 100) + "%)");

                    this.shim.append(b);
                    this.animationTimeouts.push(setTimeout(this.floatBalloon(b), 100));
                }.bind(this)
            },

            celebrate: function(celebration){
                this.resetShim();
                this.completedCount = 0;
                var message = $('<div class="celebration-message"></div>');
                var msg = "";
                if(celebration.type === "BIRTHDAY"){
                    msg += "<strong>Happy Birthday</strong><br />To<br />";
                }else{
                    msg += "<strong>Happy Anniversary</strong><br />To<br />";
                }

                var sep = "";
                _.each(celebration.targets, function(name){
                    msg += sep;
                    msg += name;
                    sep = " &amp; ";
                });

                message.append(msg);

                this.shim.append(message);
                this.showShim();

                //Render balloons for a particular celebration
                var randId = Math.random().toString();

                for(var i=0; i < this.balloonCount; i++){
                    var left =  Math.floor((Math.random() * 100));
                    var delay = Math.floor((Math.random() * 25000));
                    var hue = Math.floor((Math.random() * 10)) * 36;
                    var speed = Math.floor((Math.random() * 50) + 10);
                    var scaleFactor = Math.random();

                    var t = setTimeout(this.createBalloon(randId, left, hue, speed, scaleFactor), delay);
                    this.balloonTimeouts.push(t);
                }
            }
        });
    }
);