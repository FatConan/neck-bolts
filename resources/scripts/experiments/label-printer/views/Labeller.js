define(["jquery", "underscore", "d3", "common/BaseClass",], function ($, _, d3, BaseClass){
    return class Labeller extends BaseClass{
        /*label: null,
        controls: null,
        ruler: null,
        classes: "",*/

        constructor(options){
            super();
            this.ruler = options.ruler;
            this.label = options.label;
            this.controls = options.controls;

            this.controls.find("option").each(function(i, o){
                this.classes += " " + $(o).prop("value");
            }.bind(this));

            this.controls.on("change", function(e){
                this.updateLabel();
            }.bind(this));

            this.ruler.on("click", function(e){
                this.editingAction(e);
            }.bind(this));
        }

        nl2br(str, is_xhtml){
            // http://kevin.vanzonneveld.net
            // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +   improved by: Philip Peterson
            // +   improved by: Onno Marsman
            // +   improved by: Atli Þór
            // +   bugfixed by: Onno Marsman
            // +      input by: Brett Zamir (http://brett-zamir.me)
            // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +   improved by: Brett Zamir (http://brett-zamir.me)
            // +   improved by: Maximusya
            // *     example 1: nl2br('Kevin\nvan\nZonneveld');
            // *     returns 1: 'Kevin<br />\nvan<br />\nZonneveld'
            // *     example 2: nl2br("\nOne\nTwo\n\nThree\n", false);
            // *     returns 2: '<br>\nOne<br>\nTwo<br>\n<br>\nThree<br>\n'
            // *     example 3: nl2br("\nOne\nTwo\n\nThree\n", true);
            // *     returns 3: '<br />\nOne<br />\nTwo<br />\n<br />\nThree<br />\n'
            const breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br ' + '/>' : '<br>'; // Adjust comment to avoid issue on phpjs.org display
            return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
        }

        editingAction(e){
            if(e.target.matches("div.label")){
                e.preventDefault();
                let textarea = $('<textarea class="edit" placeholder="Enter some text"></textarea>');
                this.label.append(textarea);
                textarea.text(this.label.data("text"));
                textarea.focus();
            }else if(e.target.matches("textarea.edit")) {
            }else{
                if(this.label.find("textarea").length){
                    e.preventDefault();
                    let $textarea = $(this.label.find("textarea"));
                    let text = $textarea.val();
                    this.label.data("text", text);
                    $textarea.remove();
                    this.label.html(this.nl2br(text));
                }
            }
        }

        removeLabelClasses(){
            _.each(this.classes, function(e){
                this.label.removeClass(this.classes);
            }.bind(this))
        }

        updateLabel(){
            let classes = [];
            this.controls.find("select").each(function(i, e){
                classes.push($(e).val());
            });
            this.removeLabelClasses();
            this.label.addClass(classes.join(" "));
        }
    };
});