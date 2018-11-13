requirejs(["../../build"], function(){
    'use strict';
    requirejs(["jquery", "domReady", "experiments/balloons/views/BalloonView"], function ($, domReady, BalloonView) {
        domReady(function(){
            new BalloonView();
        });
    });
});