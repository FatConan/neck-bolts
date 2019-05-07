requirejs(["../../build"], function(){
    requirejs(["underscore", "jquery", "domReady", "experiments/hls-test/views/VideoTest", "common/ViewScript"], function (_, $, domReady, VideoTest) {
        domReady(function(){
            new VideoTest();
        });
    });
});