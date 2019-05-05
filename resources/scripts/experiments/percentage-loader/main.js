requirejs(["../../build"], function(){
    'use strict';
    requirejs(["jquery", "domReady", "experiments/percentage-loader/views/PercentageLoader", "common/ViewScript"], function ($, domReady, PercentageLoader) {
        domReady(function(){
            const progressIndicator = new PercentageLoader();
            let progressLoader = function(){
                console.log("Loader");
                let tick = function(i){
                    progressIndicator.render("div.canvas", i, 150);
                };
                let i = 0;
                let wrapped = function(){
                    tick(i);
                    i += 1;
                    if(i <= 100){
                        setTimeout(wrapped, 50);
                    }else{
                        i = 0;
                        setTimeout(progressLoader, 5000);
                    }
                };
                wrapped();
            };

            progressLoader();
        });
    });
});