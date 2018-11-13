define(["jquery", "underscore", "common/BaseClass",
        "jquery-ui"],
    function ($, _, BaseClass) {
        return BaseClass.extend({
            init: function(){
                this.balloonImg = "/resources/img/balloon.svg";
                this.balloonCount = 1;
                this.completedCount = 0;
                this.celebrationTimeout = null;
                this.balloonTimeouts = [];
                this.animationTimeouts = [];

                this.displayCelebrationIndex = 0;
                this.displayCelebrations = [{type: "BIRTHDAY", targets:["Ian", "Bob", "Jane"]}];

                this.shim = $('<div class="celebration-shim"></div>');
                $("html").append(this.shim);

                this.addListeners();
            },

            addListeners: function(){
                this.shim.on("click", function(){
                    this.closeShim();
                }.bind(this));

                this.shim.on("transitionend", function(e) {
                    console.log("Shim transition complete");
                    if(e.target.matches("div.celebratory-shim")){
                        console.log(e.target);
                        if (this.shim.hasClass("show")){
                            console.log("Shim show");
                            this.clearTimeouts();
                        }else{
                            console.log("Shim hide");
                            this.shim.removeClass("prep");
                            this.clearTimeouts();
                        }
                    }
                }.bind(this));

                this.celebrationTimeout = setTimeout(function(){
                    this.celebrate(this.nextCelebration());
                }.bind(this), 0);
            },

            nextCelebration: function(){
               var celebration = this.displayCelebrations[this.displayCelebrationIndex];
               this.displayCelebrationIndex += 1;
               this.displayCelebrationIndex = this.displayCelebrationIndex % this.displayCelebrations.length;
               return celebration;
            },

            clearTimeouts: function(){
                clearTimeout(this.celebrationTimeout);
                _.each(this.balloonTimeouts, function(balloonTimeoutId){
                    clearTimeout(balloonTimeoutId);
                });
                _.each(this.animationTimeouts, function(animationTimeoutId){
                    clearTimeout(animationTimeoutId);
                });
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
                    //balloon.addClass("move");
                    balloon.css("top", (-1 * balloon.height()) + "px");
                }
            },

            createBalloon: function(randId, left, hue, speed, scaleFactor){
                return function(){
                    var zIndex = Math.floor(scaleFactor * 100);
                    var dimension = Math.floor((scaleFactor * 400) + 100);

                    var b = $('<div class="balloon"></div>');
                    b.on("transitionend", function(e){
                        $(e.target).remove();
                        this.completedCount += 1;
                        if(this.completedCount === this.balloonCount){
                            this.closeShim();
                            this.celebrationTimeout = setTimeout(function(){
                                this.celebrate(this.nextCelebration());
                            }.bind(this), 30000);
                        }
                    }.bind(this));

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
                    msg += "Happy Birthday<br />";
                }

                var sep = "";
                _.each(celebration.targets, function(name){
                    msg += sep;
                    msg += name;
                    msg += "<br />";
                    sep = "&amp; ";
                });

                message.append(msg);

                this.shim.append(message);
                this.showShim();

                //Render balloons for a particular celebration
                var randId = Math.random().toString();

                for(var i=0; i < this.balloonCount; i++){
                    var left =  Math.floor((Math.random() * 100));
                    var delay = Math.floor((Math.random() * 25000) + 5000);
                    var hue = Math.floor((Math.random() * 10)) * 36;
                    var speed = Math.floor((Math.random() * 50) + 10);
                    var scaleFactor = Math.random();

                    var t = setTimeout(this.createBalloon(randId, left, hue, speed, scaleFactor), 0);
                    this.balloonTimeouts.push(t);
                }
            }
        });
    }
);