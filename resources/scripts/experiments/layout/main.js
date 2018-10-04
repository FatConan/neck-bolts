requirejs(["../../build"], function(){
    'use strict';
    requirejs(["jquery", "domReady", "d3", "experiments/layout/views/LayoutView"], function ($, domReady, d3, LayoutView) {
        domReady(function(){
            new LayoutView();
        });
    });
});