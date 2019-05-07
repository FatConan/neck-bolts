define(["jquery", "underscore", "common/BaseClass", "videojs", "silvermine-videojs-quality-selector"], function ($, _, BaseClass, videojs){
    return class VideoTest extends BaseClass{
        /*


         */
        constructor(){
            super();
            this.liveVideo = "#video-live";
            this.archiveVideo = "#video";
            this.browser = $("#browser");
            this.videoTemplate = _.template("<video id=\"video\" class=\"video-js vjs-default-skin\" controls autoplay preload=\"auto\" width=\"600\" height=\"400\"></video>");
            this.sourceTemplate = _.template("<source src=\"<%- src %>\" label=\"<%- label %>\" type=\"<%- type %>\" <%- selected %> />");

            this.options = {
                controlBar: {
                  children: [
                     'playToggle',
                     'progressControl',
                     'volumePanel',
                     'qualitySelector',
                     'fullscreenToggle',
                  ]
               }
            };

            this.sources = {
                sports: [
                    {src:"//cdn.nuevolab.com/media/demo_240.mp4", label: "240p", type:"video/mp4"},
                    {src:"//cdn.nuevolab.com/media/demo_360.mp4", label: "360p", type:"video/mp4"},
                    {src:"//cdn.nuevolab.com/media/demo_480.mp4", label: "480p", type:"video/mp4"},
                    {src:"//cdn.nuevolab.com/media/demo_720.mp4", label: "720p", type:"video/mp4"}
                ],

                bunny: [
                    {src: "/resources/video/SampleVideo_1280x720_1mb.mp4", type:"video/mp4", label:"720P"},
                    {src:"/resources/video/SampleVideo_720x480_1mb.mp4", type:"video/mp4", label:"480P"},
                    {src:"/resources/video/SampleVideo_640x360_1mb.mp4", type:"video/mp4", label:"360P"},
                    {src:"/resources/video/SampleVideo_360x240_1mb.mp4", type:"video/mp4", label:"240P"}
                ]
            };

            this.livePlayer = videojs(this.liveVideo, {});
            this.player = null;
            this.currentSources = "bunny";
            this.addEntries(this.sources[this.currentSources]);

            this.browser.on("click", function(e){
                console.log("CLICK");
                if(e.target.matches("a")){
                    e.preventDefault();
                    let $el = $(e.target);
                    let source = $el.data("sources");
                    this.currentSources = source;
                    this.addEntries(this.sources[this.currentSources]);
                }
            }.bind(this));
        }

        addEntries(optionsList){
            let video = $(this.videoTemplate({}));
            $(optionsList).each(function(i, e){
                let opts = _.extend({}, e);
                if(i === 0){
                    opts.selected = "selected=\"true\"";
                }else{
                    opts.selected = "";
                }
                video.append(this.sourceTemplate(opts));
            }.bind(this));

            let $archiveVideo = $(this.archiveVideo);
            if(this.player === null) {
                $archiveVideo.empty().append(video);
                this.player = videojs(video[0], this.options);
            }else{
                this.player.dispose();
                 $archiveVideo.empty().append(video);
                this.player = videojs(video[0], this.options);
            }
        }
    };
});