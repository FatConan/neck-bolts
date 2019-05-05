requirejs(["../../build"], function(){
    requirejs(["jquery", "domReady", "experiments/balloons/views/BalloonView", "common/ViewScript"], function($, domReady, BalloonView){
        domReady(function(){
            new BalloonView();
        });
    });
});