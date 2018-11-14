requirejs(["../../build"], function(){
    'use strict';
    requirejs(["jquery", "domReady", "d3", "experiments/time-picker/views/Picker"], function ($, domReady, d3, Picker) {
        domReady(function(){
            new Picker();
        });
    });
});