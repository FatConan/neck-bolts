define(["jquery", "underscore"], function ($, _){
    return class BaseClass {
        constructor(){
        }

        //Generic GUID generator method
        guid(){
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        }

        findParentTag(element, tagName){
            while(element && element.tagName !== tagName && element.tagName !== null){
                element = element.parentNode;
            }
            return element;
        }

        getQueryVariable(variable){
            let query = window.location.search.substring(1);
            let vars = query.split("&");
            let returnArray = [];
            for(let i=0; i<vars.length; i++) {
                let pair = vars[i].split("=");
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
        }

        swap(items, firstIndex, secondIndex){
            let temp = items[firstIndex];
            items[firstIndex] = items[secondIndex];
            items[secondIndex] = temp;
        }

        partition(items, itemKey, left, right){
            let pivot = items[Math.floor((right + left) / 2)][itemKey];
            let i = left;
            let j = right;

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
        }

        quickSort(items, itemKey, left, right){
            let index;
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