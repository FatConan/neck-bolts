requirejs(["../../build"], function(){
    'use strict';
    requirejs(["jquery", "domReady", "experiments/layout/views/LayoutView", "common/ViewScript"], function ($, domReady, LayoutView) {
        domReady(function(){
            new LayoutView();
        });
    });
});