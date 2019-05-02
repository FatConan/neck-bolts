requirejs(["../../build"], function(){
    requirejs(["underscore", "jquery", "domReady", "experiments/funnel/views/Funnel"], function (_, $, domReady, Funnel) {
        domReady(function(){
            let funnel = new Funnel();
            funnel.render("#funnel", [{v: 100, l: "Stage 1"}, {v: 50, l: "Stage 2"}, {v: 25,l: "Stage 3"}, {v: 12.5, l: "Stage 4"}]);
        });
    });
});