requirejs(["../../build"], function(){
    requirejs(["jquery", "domReady", "experiments/clock/views/Clock", "common/ViewScript"], function ($, domReady, Clock){
        domReady(function(){
            let clockCanvas = $("#clock");
            new Clock({target: clockCanvas});
        });
    });
});