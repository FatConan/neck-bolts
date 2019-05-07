// -- RequireJS config --
requirejs.config({
    baseUrl: '/resources/scripts',
    paths: {
        'text': ['https://cdnjs.cloudflare.com/ajax/libs/require-text/2.0.12/text.min'],
        'underscore': ['https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.9.1/underscore-min'],
        'jquery': ['https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min'],
        'jquery-ui': ['https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min'],
        'd3': ['https://cdnjs.cloudflare.com/ajax/libs/d3/5.7.0/d3.min'],
        'domReady': ['./common/DomReady'],
        'videojs': ["https://cdnjs.cloudflare.com/ajax/libs/video.js/7.5.4/video.min"],
        'silvermine-videojs-quality-selector': ["https://cdn.jsdelivr.net/npm/silvermine-videojs-quality-selector@1.1.2/dist/js/silvermine-videojs-quality-selector.min"]
    },
    map: {

    },
    shim: {
        'jquery-ui': ['jquery'],
        'silvermine-videojs-quality-selector': ['add-video-js-in-global-scope'],
        'underscore': {
            exports: '_'
        }
    }
});

define("add-video-js-in-global-scope", ["videojs"], function(videojs){
     window.videojs = videojs;
});

