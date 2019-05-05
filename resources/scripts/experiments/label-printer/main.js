requirejs(["../../build"], function(){
    'use strict';
    requirejs(["jquery", "domReady", "experiments/label-printer/views/Labeller", "common/ViewScript"], function ($, domReady, Labeller) {
        domReady(function(){
            new Labeller({label: $("#label"), controls: $("#label-controls"), ruler: $("#label-ruler")});
        });
    });
});