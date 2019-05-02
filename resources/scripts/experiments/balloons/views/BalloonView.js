define(["jquery", "underscore", "common/BaseClass", "jquery-ui"],
    function ($, _, BaseClass) {
        return class BalloonView extends BaseClass{
            constructor(){
                super();
                this.balloonImg = "/resources/img/balloon2.svg";
                this.balloonCount = 30;
                this.completedCount = 0;
                this.celebrationTimeout = null;
                this.balloonTimeouts = [];
                this.animationTimeouts = [];

                this.displayCelebrationIndex = 0;
                this.displayCelebrations = [{type: "Anniversary", targets:["Dave &mdash; 2yrs"]}, {type: "BIRTHDAY", targets:["Ian", "Bob", "Jane"]}];

                this.shim = $('<div class="celebration-shim"></div>');
                $("html").append(this.shim);

                this.addListeners();
            }

            addListeners(){
                this.shim.on("click", function(){
                    this.closeShim();
                }.bind(this));

                this.shim.on("transitionend", function(e) {
                    let et = e.target;
                    let $et = $(et);
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
                    }else if(et.matches("div.balloon")){
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
                        if(this.celebrationTimeout){
                            this.celebrate(this.nextCelebration());
                        }
                    }.bind(this), 100);
                }.bind(this), 2000);
            }

            nextCelebration(){
               let celebration = this.displayCelebrations[this.displayCelebrationIndex];
               this.displayCelebrationIndex += 1;
               this.displayCelebrationIndex = this.displayCelebrationIndex % this.displayCelebrations.length;
               return celebration;
            }

            clearTimeouts(){
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
            }

            resetShim(){
                this.shim.empty();
            }

            closeShim(){
               this.shim.removeClass("show");
            }

            showShim(){
                this.shim.addClass("prep");
                this.shim.addClass("show");
            }

            floatBalloon(balloon){
                return function(){
                    balloon.css("top", (-1 * balloon.height()) + "px");
                }
            }

            createBalloon(randId, left, hue, speed, scaleFactor){
                return function(){
                    let zIndex = Math.floor(scaleFactor * 100);
                    let dimension = Math.floor((scaleFactor * 400) + 100);
                    let brightness = Math.ceil((scaleFactor * 10)) * 10;

                    let b = $('<div class="balloon"></div>');
                    b.css("transition", "top " + speed + "s linear");
                    b.css("background-image", "url(" + this.balloonImg + "?id=" + randId + ")");
                    b.css("left", "" + left + "%");
                    b.css("height", "" + dimension + "px");
                    b.css("width", "" + dimension + "px");
                    b.css("z-index", zIndex);
                    b.css("-webkit-filter", "hue-rotate(" + hue + "deg) " + "brightness(" + brightness + "%)");
                    b.css("filter",  "hue-rotate(" + hue + "deg) " + "brightness(" +  brightness + "%)");

                    this.shim.append(b);
                    this.animationTimeouts.push(setTimeout(this.floatBalloon(b), 100));
                }.bind(this)
            }

            celebrate(celebration){
                this.resetShim();
                this.completedCount = 0;
                let message = $('<div class="celebration-message"></div>');
                let msg = "";
                if(celebration.type === "BIRTHDAY"){
                    msg += "<strong>Happy Birthday</strong><br />To<br />";
                }else{
                    msg += "<strong>Happy Anniversary</strong><br />To<br />";
                }

                let sep = "";
                _.each(celebration.targets, function(name){
                    msg += sep;
                    msg += name;
                    sep = " &amp; ";
                });

                message.append(msg);

                this.shim.append(message);
                this.showShim();

                //Render balloons for a particular celebration
                let randId = Math.random().toString();

                for(let i=0; i < this.balloonCount; i++){
                    let left =  Math.floor((Math.random() * 110));
                    if(left > 100){
                        left = -1 * (left - 100);
                    }
                    let delay = Math.floor((Math.random() * 25000));
                    let hue = Math.floor((Math.random() * 8)) * 45;
                    let speed = Math.floor((Math.random() * 50) + 10);
                    let scaleFactor = Math.random();

                    let t = setTimeout(this.createBalloon(randId, left, hue, speed, scaleFactor), delay);
                    this.balloonTimeouts.push(t);
                }
            }
        };
    }
);