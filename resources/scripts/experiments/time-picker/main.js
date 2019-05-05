requirejs(["../../build"], function(){
    'use strict';
    requirejs(["jquery", "domReady", "d3", "experiments/time-picker/views/Picker", "common/ViewScript"], function ($, domReady, d3, Picker) {
        domReady(function(){
            new Picker();
        });
    });
});