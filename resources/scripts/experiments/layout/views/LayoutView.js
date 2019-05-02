define(["jquery", "underscore", "common/BaseClass",
        "text!experiments/layout/templates/GroupTemplate.html",
        "text!experiments/layout/templates/LinkTemplate.html",
        "jquery-ui"],
    function ($, _, BaseClass, GroupTemplateHTML, LinkTemplateHTML){
        return class LayoutView extends BaseClass{
            constructor(){
                super();
                this.layout = $("#layout");
                this.controls = $("#controls");
                this.groupElement = $("#edit-group");
                this.groupModal = this.groupElement.dialog({
                    title: "Add a Group",
                    width: 650,
                    autoOpen: false,
                    modal: true,
                    buttons: {
                        "Save": function(){
                            let title = this.groupElement.find("input[name=title]").val();
                            let data = {id: this.guid(), title: title};
                            this.addGroup(data);
                        }.bind(this),

                        "Cancel": function () {
                            this.closeGroup();
                        }.bind(this)
                    },
                    close: function(){

                    }.bind(this)
                });

                this.linkElement = $("#edit-link");
                this.linkModal = this.linkElement.dialog({
                    title: "Add a Link",
                    width: 650,
                    autoOpen: false,
                    modal: true,
                    close: function(){

                    }.bind(this)
                });

                this.groupTemplate = _.template(GroupTemplateHTML);
                this.linkTemplate = _.template(LinkTemplateHTML);

                this.addListeners();
            }

            addListeners(){
                this.controls.on("click", function(e){
                    let a = this.findParentTag(e.target, "A");
                    if(a && a.matches("a.add-group")){
                        e.preventDefault();
                        this.openGroup();
                    }
                }.bind(this));

                this.layout.on("click", function(e){
                    let a = this.findParentTag(e.target, "A");
                    let group = this.findParentTag(e.target, "FIELDSET");
                    if(a && a.matches("a.add-icon")) {
                        e.preventDefault();
                        this.openLink($(group).find("div.icons"));
                    }else if(e.target.matches("span.edit")){
                        //Do editing stuff
                    }else if(e.target.matches("span.delete")){
                        e.preventDefault();
                        this.deleteGroup(group);
                    }else if(e.target.matches("span.delete-link")){
                        e.preventDefault();
                        this.deleteLink(a, $(group).find("div.icons"));
                    }
                }.bind(this));
            }

            addGroup(data){
                let count = this.layout.find("fieldset.group").length;
                let css = "";
                for(let i=0; i<count+1; i++){
                    css += " auto";
                }
                let t = this.groupTemplate(data);
                this.layout.css("grid-template-columns", css);
                this.layout.append(t);
                this.closeGroup();
            }

            deleteGroup(group){
                let count = this.layout.find("fieldset.group").length;
                let css = "";
                for(let i=0; i<count-1; i++){
                    css += " auto";
                }
                $(group).remove();
                this.layout.css("grid-template-columns", css);
            }

            openGroup(){
                this.groupModal.dialog("open");
            }

            closeGroup(){
                this.groupModal.dialog("close");
            }

            addLink(data, group){
                let count = group.find("a").length;
                let css = "";
                for(let i=0; i<count+1; i++){
                    css += " 100px";
                }
                let t = $(this.linkTemplate(data));
                group.css("grid-template-columns", css);
                group.prepend(t);
                this.closeLink();
            }

            deleteLink(link, group){
                let count = group.find("a").length;
                let css = "";
                for(let i=0; i<count-1; i++){
                    css += " 100px";
                }
                $(link).remove();
                group.css("grid-template-columns", css);
            }

            openLink(group){
                let options = {
                    buttons: {
                        "Save": function(){
                            let title = this.linkElement.find("input[name=title]").val();
                            let data = {id: this.guid(), title: title};
                            this.addLink(data, group);
                        }.bind(this),
                        "Cancel": function () {
                            this.closeLink();
                        }.bind(this)
                    }
                };
                this.linkModal.dialog("option", options);
                this.linkModal.dialog("open");
            }

            closeLink(){
                this.linkModal.dialog("close");
            }
        };
    }
);