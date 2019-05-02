requirejs(["../../build"], function(){
    'use strict';
    requirejs(["jquery", "domReady", "experiments/layout/views/LayoutView"], function ($, domReady, LayoutView) {
        domReady(function(){
            new LayoutView();
        });
    });
});