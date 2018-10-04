define(["jquery", "underscore"], function ($, _){
    return {
        extend: function(extendingClass){
            var extended = _.extend({}, this);
            _.extend(extended, extendingClass);
            return function(options){
                return extended.instantiate(options);
            };
        },

        init: function(options){
            //Override this method in subclasses
        },

        //Generic GUID generator method
        guid: function() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        },

        findParentTag: function(element, tagName){
            while(element && element.tagName !== tagName && element.tagName !== null){
                element = element.parentNode;
            }
            return element;
        },

        getQueryVariable: function(variable){
            var query = window.location.search.substring(1);
            var vars = query.split("&");
            var returnArray = [];
            for (var i=0;i<vars.length;i++) {
                var pair = vars[i].split("=");
                if(pair[0] === variable){
                    returnArray.push(decodeURIComponent(pair[1]));
                }
            }
            if(returnArray.length === 1){
                return returnArray[0];
            }else if(returnArray.length === 0){
                return "";
            }else{
                return returnArray;
            }
        },

        initialize: function(options){
            _.extend(this, options);
            this.init(options);
            return this;
        },

        instantiate: function(options){
            var instance = _.extend({}, this);
            return instance.initialize(options);
        },

        swap: function(items, firstIndex, secondIndex){
            var temp = items[firstIndex];
            items[firstIndex] = items[secondIndex];
            items[secondIndex] = temp;
        },

        partition: function(items, itemKey, left, right){
            var pivot = items[Math.floor((right + left) / 2)][itemKey];
            var i = left;
            var j = right;

            while(i <= j){
                while(items[i][itemKey] < pivot){
                    i++;
                }

                while(items[j][itemKey] > pivot){
                    j--;
                }

                if(i <= j){
                    this.swap(items, i, j);
                    i++;
                    j--;
                }
            }
            return i;
        },

        quickSort: function(items, itemKey, left, right){
            var index;
            if(items.length > 1){
                left = typeof left !== "number" ? 0 : left;
                right = typeof right !== "number" ? items.length-1 : right;
                index = this.partition(items, itemKey, left, right);
                if(left < index-1){
                    this.quickSort(items, itemKey, left, index-1);
                }
                if(index < right){
                    this.quickSort(items, itemKey, index, right);
                }
            }

            return items;
        }
    };
});