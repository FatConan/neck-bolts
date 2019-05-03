requirejs(["../../build"], function() {
    requirejs(["underscore", "jquery"], function(_, $){
        class ViewScript{
            constructor(){
                this.scripts = [];
                this.triggerEl = $("a.see-code");
                this.displayEl = $("pre.see-code");
                if(this.triggerEl){
                    let scriptList = $("script");
                    let main = null;

                    scriptList.each(function(i, e){
                        let $el = $(e);
                        if($el.data("main")){
                            main = $el.data("main");
                        }
                    }.bind(this));

                    if(main){
                        main = main.replace("/main", "");
                        scriptList.each(function(i, e){
                            let $el = $(e);
                            let src = $el.attr("src");
                            if (src.startsWith(main) && src.indexOf("/../") === -1 && src.indexOf("/./") === -1) {
                                this.scripts.push(src);
                            }
                        }.bind(this));
                    }

                    this.triggerEl.on("click", function(){
                        this.trigger();
                    }.bind(this))
                }
            }

            fetch(){
                $(this.scripts).each(function(i, e){
                    console.log("READING", i, e);
                    $.ajax({
                        method: "GET",
                        url: e,
                        processData: false,
                        mimeType: "text/plain",
                        success: function(text){
                            this.render(text);
                        }.bind(this),
                        error: function(){
                        }
                    });
                }.bind(this));
            }

            render(text){
                this.displayEl.append(text);
                this.displayEl.append("\n\n");
            }

            trigger(){
                this.fetch();
                console.log("TRIGGER");
            }
        }

        new ViewScript();
    });
});