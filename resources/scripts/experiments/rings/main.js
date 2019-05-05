requirejs(["../../build"], function(){
    'use strict';
    requirejs(["jquery", "domReady", "experiments/rings/views/PercentageRings", "common/ViewScript"], function ($, domReady, PercentageRings) {
        domReady(function(){
            const canvas = $("#canvas");
            const rings = new PercentageRings();
            rings.render("#canvas", canvas.data("data"));
        });
    });
});