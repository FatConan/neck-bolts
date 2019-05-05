requirejs(["../../build"], function() {
    requirejs(["underscore", "jquery", "jquery-ui"], function(_, $){
        class ViewScript{
            constructor(){
                this.modalEl = $("<div class=\"modal\"></div>");
                this.entryTemplate = _.template("<div><h2><%- source %></h2><pre class=\"see-code\"><%- code %></pre></div>");
                this.triggerEl = $("<a href=\"#\" class=\"see-code\">See Code</a>");
                this.descriptionHeaderEl = $("section.description h1");
                this.mainDemoEl = $("section.demonstrations");
                this.descriptionHeaderEl.append(this.triggerEl);
                this.mainDemoEl.prepend(this.modalEl);
                this.scripts = [];
                this.displayEl = this.modalEl.find("pre");

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

                this.modalEl.dialog({
                    position: {my: "center", at: "top", of: window},
                    title: "View Source",
                    width: "80%",
                    autoOpen: false,
                    modal: true,
                    close: function(){
                        this.modalEl.empty();
                    }.bind(this)
                });

                this.triggerEl.on("click", function(){
                    this.trigger();
                }.bind(this))

            }

            fetch(){
                $(this.scripts).each(function(i, e){
                    $.ajax({
                        method: "GET",
                        url: e,
                        processData: false,
                        mimeType: "text/plain",
                        success: function(text){
                            this.render(e, text);
                            if(!this.modalEl.dialog("isOpen")){
                                this.modalEl.dialog("open");
                            }
                        }.bind(this),
                        error: function(){
                        }
                    });
                }.bind(this));
            }

            render(src, text){
                let code = this.entryTemplate({source: src, code: text});
                this.modalEl.append(code);
            }

            trigger(){
                this.fetch();
            }
        }

        new ViewScript();
    });
});