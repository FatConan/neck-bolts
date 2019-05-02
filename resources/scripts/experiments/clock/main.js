requirejs(["../../build"], function(){
    requirejs(["jquery", "domReady", "experiments/clock/views/Clock"], function ($, domReady, Clock){
        domReady(function(){
            let clockCanvas = $("#clock");
            new Clock({target: clockCanvas});
        });
    });
});