requirejs(["../../build"], function(){
    requirejs(["underscore", "jquery", "domReady", "experiments/funnel/views/Funnel", "common/ViewScript"], function (_, $, domReady, Funnel) {
        domReady(function(){
            let funnel = new Funnel();
            let randomFunnel = function(){
                let stages = 6;
                let data = [];
                let funnels = [];
                for(let i=0; i < stages; i++){
                    data.push(Math.random() * 100);
                }
                data.sort(function(a,b){return a - b;});
                data.reverse();
                $(data).each(function(i, v){
                    funnels.push({v: v.toFixed(1), l: "Stage " + i});
                });
                funnel.render("#funnel", funnels);
            };
            setInterval(randomFunnel, 500);
            randomFunnel();
        });
    });
});