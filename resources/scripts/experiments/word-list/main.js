requirejs(["../../build"], function(){
    'use strict';
    requirejs(["jquery", "domReady", "d3"], function ($, domReady, d3) {
        domReady(function(){
            let words = [{"text": "parsley", "weight": 0.07182309204488058, "rating": 1.0769230769230769}, {"text": "arugula", "weight": 0.04027221952908211, "rating": 0.9459459459459459}, {"text": "bok choy/bok choi/pak choy", "weight": 0.03830522629325861, "rating": 0.9292035398230089}, {"text": "", "weight": 0.03046626878104952, "rating": 1.0609756097560976}, {"text": "parsley root", "weight": 0.018804361766046718, "rating": 1.0763358778625953}, {"text": "bell pepper", "weight": 0.01667747825371646, "rating": 1.5483870967741935}, {"text": "hearts of palm", "weight": 0.015593167811007724, "rating": 1.103448275862069}, {"text": "galangal", "weight": 0.015593167811007724, "rating": 1.1379310344827587}, {"text": "jerusalem artichoke/sunchokes", "weight": 0.015133988410856558, "rating": 0.7719298245614035}, {"text": "turnip greens", "weight": 0.011866966866773465, "rating": 1.103448275862069}, {"text": "mustard greens", "weight": 0.009400233138699754, "rating": 1.6521739130434783}, {"text": "arugula", "weight": 0.009349773652711946, "rating": 1.3333333333333333}, {"text": "tomato", "weight": 0.008989695884529247, "rating": 1.2272727272727273}, {"text": "chinese broccoli/kai-lan", "weight": 0.008006899494552355, "rating": 1.155844155844156}, {"text": "celtuce", "weight": 0.007671340900327728, "rating": 1.2413793103448276}, {"text": "lettuce", "weight": 0.006939512824922778, "rating": 0.8823529411764706}, {"text": "burdock root/gobo", "weight": 0.006624806421591245, "rating": 0.9}, {"text": "watercress", "weight": 0.006423096139453133, "rating": 1.5}, {"text": "rapini", "weight": 0.006022442692230179, "rating": 0.9581881533101045}, {"text": "parsnip", "weight": 0.005495412939548361, "rating": 1.1666666666666667}, {"text": "radish", "weight": 0.005297156526734792, "rating": 0.9375}, {"text": "mustard greens", "weight": 0.0052162742118637695, "rating": 0.634765625}, {"text": "tomato", "weight": 0.004917577321113198, "rating": 0.90625}, {"text": "green, purple, white", "weight": 0.004813464653231847, "rating": 1.4444444444444444}, {"text": "water chestnut", "weight": 0.0046035873294902885, "rating": 0.6792035398230089}, {"text": "jerusalem artichoke/sunchokes", "weight": 0.0045401521854613325, "rating": 1.2272727272727273}, {"text": "parsley", "weight": 0.004450473967362978, "rating": 0.6910755148741419}, {"text": "green onions/scallions", "weight": 0.004401569004443884, "rating": 1.6666666666666667}, {"text": "cucumber", "weight": 0.004301806773955086, "rating": 1.1153846153846154}, {"text": "broccoli", "weight": 0.0042774931119626824, "rating": 1.125}, {"text": "iceberg", "weight": 0.0042774931119626824, "rating": 1.0}, {"text": "tomato", "weight": 0.0042774931119626824, "rating": 1.0}, {"text": "", "weight": 0.004216735214439771, "rating": 1.1363636363636365}, {"text": "broccoli", "weight": 0.004143182704483994, "rating": 1.0}, {"text": "turnip", "weight": 0.004034032788972075, "rating": 0.6363636363636364}, {"text": "watercress", "weight": 0.004029906382244874, "rating": 1.0}, {"text": "spinach", "weight": 0.003741807460068358, "rating": 1.4285714285714286}, {"text": "green, red, savoy", "weight": 0.003741807460068358, "rating": 1.0}, {"text": "kale", "weight": 0.003741807460068358, "rating": 1.1428571428571428}, {"text": "watercress", "weight": 0.0036678812742647615, "rating": 0.7777777777777778}, {"text": "turnip", "weight": 0.003655755706182262, "rating": 0.8305084745762712}, {"text": "olive", "weight": 0.0035320695845797445, "rating": 0.9130434782608695}, {"text": "parsley", "weight": 0.003332069469510035, "rating": 1.8}, {"text": "sugar snap peas", "weight": 0.003306935300255498, "rating": 1.0}, {"text": "parsnip", "weight": 0.003306935300255498, "rating": 1.0}, {"text": "swiss chard", "weight": 0.003256827653623562, "rating": 0.9411764705882353}, {"text": "leaf- green leaf, red leaf", "weight": 0.0032265686419639117, "rating": 1.0476190476190477}, {"text": "celery", "weight": 0.0032064075450541907, "rating": 1.0}, {"text": "curly/frisee", "weight": 0.0030938891956684422, "rating": 0.6677631578947368}, {"text": "lettuce", "weight": 0.0030706582998569765, "rating": 0.95}, {"text": "kohlrabi", "weight": 0.10909299298987962, "rating": 3.590909090909091}, {"text": "leaf- green leaf, red leaf", "weight": 0.09526551603647948, "rating": 3.2142857142857144}, {"text": "water spinach", "weight": 0.05370601527224039, "rating": 3.6153846153846154}, {"text": "green onions/scallions", "weight": 0.03846525482755947, "rating": 4.6}, {"text": "parsley root", "weight": 0.03303271780053585, "rating": 3.6}, {"text": "water chestnut", "weight": 0.03303271780053585, "rating": 2.8}, {"text": "purslane", "weight": 0.030612882281112475, "rating": 3.2857142857142856}, {"text": "swiss chard", "weight": 0.0241609342649729, "rating": 3.1363636363636362}, {"text": "arugula", "weight": 0.022904719199665857, "rating": 4.666666666666667}, {"text": "nopales", "weight": 0.022904719199665857, "rating": 5.0}, {"text": "bamboo shoots", "weight": 0.022904719199665857, "rating": 3.6666666666666665}, {"text": "belgian endive", "weight": 0.022904719199665857, "rating": 5.0}, {"text": "bok choy/bok choi/pak choy", "weight": 0.015212106597835007, "rating": 2.5}, {"text": "sugar snap peas", "weight": 0.015212106597835007, "rating": 5.0}, {"text": "wax beans", "weight": 0.014672536994436047, "rating": 3.4}, {"text": "green onions/scallions", "weight": 0.013084406301149265, "rating": 5.0}, {"text": "spinach", "weight": 0.013084406301149265, "rating": 5.0}, {"text": "bean sprouts", "weight": 0.012852674062486358, "rating": 3.088235294117647}, {"text": "bell pepper", "weight": 0.010910764141377705, "rating": 3.5}, {"text": "parsley", "weight": 0.00793863404781403, "rating": 2.709090909090909}, {"text": "watercress", "weight": 0.007793734246871686, "rating": 3.3518518518518516}, {"text": "rapini", "weight": 0.007214343319017713, "rating": 3.4}, {"text": "fiddlehead", "weight": 0.00653323845092979, "rating": 3.6818181818181817}, {"text": "kohlrabi greens", "weight": 0.006296341047934639, "rating": 4.5}, {"text": "avocado", "weight": 0.005394532000248642, "rating": 3.75}, {"text": "shallots", "weight": 0.005189096960024564, "rating": 3.9722222222222223}, {"text": "", "weight": 0.004755645683929721, "rating": 2.909090909090909}, {"text": "olive", "weight": 0.004587998526258463, "rating": 3.9}, {"text": "corn/maize", "weight": 0.004466782010461134, "rating": 3.096774193548387}, {"text": "purslane", "weight": 0.004152591434680941, "rating": 3.4285714285714284}, {"text": "calabash", "weight": 0.004140270084720621, "rating": 4.363636363636363}, {"text": "kohlrabi greens", "weight": 0.004032222106638672, "rating": 5.0}, {"text": "watercress", "weight": 0.00394552774450152, "rating": 4.055555555555555}, {"text": "greens", "weight": 0.003889303781483555, "rating": 4.2592592592592595}, {"text": "tomatillo", "weight": 0.003805306784200102, "rating": 4.142857142857143}, {"text": "chayote", "weight": 0.00369682833021745, "rating": 2.6666666666666665}, {"text": "kohlrabi greens", "weight": 0.0031882566163923265, "rating": 2.5}, {"text": "grape leaves", "weight": 0.0031882566163923265, "rating": 5.0}, {"text": "curly", "weight": 0.0030474777448139534, "rating": 5.0}, {"text": "romaine", "weight": 0.0029350263700143042, "rating": 4.5}, {"text": "chayote", "weight": 0.002888484219840004, "rating": 4.5}, {"text": "escarole", "weight": 0.0027166010911927607, "rating": 4.0}, {"text": "potato", "weight": 0.002524351951923798, "rating": 3.25}, {"text": "calabash", "weight": 0.002524351951923798, "rating": 3.5}, {"text": "collard greens", "weight": 0.002524351951923798, "rating": 5.0}, {"text": "grape leaves", "weight": 0.0024840874739417984, "rating": 3.5428571428571427}, {"text": "snow peas", "weight": 0.0024630362053219557, "rating": 2.0}, {"text": "nopales", "weight": 0.0022422998276825368, "rating": 4.5}, {"text": "rapini", "weight": 0.0021900416250528743, "rating": 4.7}, {"text": "turnip", "weight": 0.0021900416250528743, "rating": 4.2}].sort(function(a, b) {  return b.weight - a.weight;
            });

            //CREATE USED TO GIVE THE SAME STRUCTURE AS A PORTAL DASHBOARD CHART
            function create(options){
                //QuadTree used for boundinbox collisions
                function QuadTree(boundBox, lvl) {
                    let maxObjects = 10;
                    this.bounds = boundBox || {
                        x: 0,
                        y: 0,
                        width: 0,
                        height: 0
                    };
                    let objects = [];
                    this.nodes = [];
                    let level = lvl || 0;
                    let maxLevels = 5;
                    /*
                     * Clears the quadTree and all nodes of objects
                     */
                    this.clear = function() {
                        objects = [];
                        for (let i = 0; i < this.nodes.length; i++) {
                            this.nodes[i].clear();
                        }
                        this.nodes = [];
                    };
                    /*
                     * Get all objects in the quadTree
                     */
                    this.getAllObjects = function(returnedObjects){
                        for(let i = 0; i < this.nodes.length; i++){
                            this.nodes[i].getAllObjects(returnedObjects);
                        }
                        for(let i = 0, len = objects.length; i < len; i++){
                            returnedObjects.push(objects[i]);
                        }
                        return returnedObjects;
                    };
                    /*
                     * Return all objects that the object could collide with
                     */
                    this.findObjects = function(returnedObjects, obj){
                        if (typeof obj === "undefined") {
                            return;
                        }
                        let index = this.getIndex(obj);
                        if (index !== -1 && this.nodes.length) {
                            this.nodes[index].findObjects(returnedObjects, obj);
                        }
                        for (let i = 0, len = objects.length; i < len; i++) {
                            returnedObjects.push(objects[i]);
                        }
                        return returnedObjects;
                    };
                    /*
                     * Insert the object into the quadTree. If the tree
                     * excedes the capacity, it will split and add all
                     * objects to their corresponding nodes.
                     */
                    this.insert = function(obj) {
                        if(typeof obj === "undefined"){
                            return;
                        }
                        if(obj instanceof Array){
                            for (let i=0, len = obj.length; i < len; i++) {
                                this.insert(obj[i]);
                            }
                            return;
                        }
                        if(this.nodes.length){
                            let index = this.getIndex(obj);
                            // Only add the object to a subnode if it can fit completely
                            // within one
                            if(index !== -1){
                                this.nodes[index].insert(obj);
                                return;
                            }
                        }
                        objects.push(obj);
                        // Prevent infinite splitting
                        if(objects.length > maxObjects && level < maxLevels){
                            if (this.nodes[0] == null){
                                this.split();
                            }
                            let i = 0;
                            while(i < objects.length){
                                let index = this.getIndex(objects[i]);
                                if(index !== -1){
                                    this.nodes[index].insert((objects.splice(i,1))[0]);
                                }else {
                                    i++;
                                }
                            }
                        }
                    };
                    /*
                     * Determine which node the object belongs to. -1 means
                     * object cannot completely fit within a node and is part
                     * of the current node
                     */
                    this.getIndex = function(obj){
                        let index = -1;
                        let verticalMidpoint = this.bounds.x + this.bounds.width / 2;
                        let horizontalMidpoint = this.bounds.y + this.bounds.height / 2;
                        // Object can fit completely within the top quadrant
                        let topQuadrant = (obj.y < horizontalMidpoint && obj.y + obj.height < horizontalMidpoint);
                        // Object can fit completely within the bottom quandrant
                        let bottomQuadrant = (obj.y > horizontalMidpoint);
                        // Object can fit completely within the left quadrants
                        if (obj.x < verticalMidpoint &&
                                obj.x + obj.width < verticalMidpoint) {
                            if (topQuadrant) {
                                index = 1;
                            }
                            else if (bottomQuadrant) {
                                index = 2;
                            }
                        }
                        // Object can fix completely within the right quandrants
                        else if (obj.x > verticalMidpoint) {
                            if (topQuadrant) {
                                index = 0;
                            }
                            else if (bottomQuadrant) {
                                index = 3;
                            }
                        }
                        return index;
                    };
                    /*
                     * Splits the node into 4 subnodes
                     */
                    this.split = function() {
                        // Bitwise or [html5rocks]
                        let subWidth = (this.bounds.width / 2) | 0;
                        let subHeight = (this.bounds.height / 2) | 0;
                        this.nodes[0] = new QuadTree({
                            x: this.bounds.x + subWidth,
                            y: this.bounds.y,
                            width: subWidth,
                            height: subHeight
                        }, level+1);
                        this.nodes[1] = new QuadTree({
                            x: this.bounds.x,
                            y: this.bounds.y,
                            width: subWidth,
                            height: subHeight
                        }, level+1);
                        this.nodes[2] = new QuadTree({
                            x: this.bounds.x,
                            y: this.bounds.y + subHeight,
                            width: subWidth,
                            height: subHeight
                        }, level+1);
                        this.nodes[3] = new QuadTree({
                            x: this.bounds.x + subWidth,
                            y: this.bounds.y + subHeight,
                            width: subWidth,
                            height: subHeight
                        }, level+1);
                    };
                }

                let chart = {
                    arrowWidth: 6,
                    arrowLength: 34,
                    barHeight: 10,
                    canvas: null,
                    svg: null,
                    quadTree: null,
                    spiralGenerator: null,
                    cw: 1 << 11 >> 5,
                    ch: 1 << 11,
                    ratio: 1,
                    paddingTop: 30,
                    paddingBottom: 30,
                    paddingLeft: 30,
                    paddingRight: 30,
                    scale: 1,
                    current: {
                        currentSizeI: -1,
                        currentWeight: -1
                    },

                    resetCanvas: function(canvas){
                        if(typeof document !== "undefined"){
                            this.spriteCanvas = document.createElement("canvas");
                            this.spriteCanvas.width = 1;
                            this.spriteCanvas.height = 1;
                            this.ratio = Math.sqrt(this.spriteCanvas.getContext("2d").getImageData(0, 0, 1, 1).data.length >> 2);
                            this.spriteCanvas.width = (this.cw << 5) / this.ratio;
                            this.spriteCanvas.height = this.ch / this.ratio;
                        }else{
                        // Attempt to use node-canvas.
                            this.spriteCanvas = new Canvas(this.cw << 5, this.ch);
                        }
                        this.spriteContext = this.spriteCanvas.getContext("2d");

                        //The actual canvas where we'll draw our stuff
                        this.canvas = d3.select(canvas);
                        this.canvas.html("");

                        this.paddingTop = options.paddingTop !== undefined ? options.paddingTop : this.paddingTop;
                        this.paddingBottom = options.paddingBottom !== undefined ? options.paddingBottom : this.paddingBottom;
                        this.paddingLeft = options.paddingLeft !== undefined ? options.paddingLeft : this.paddingLeft;
                        this.paddingRight = options.paddingRight !== undefined ? options.paddingRight : this.paddingRight;

                        this.scale = options.scale !== undefined ? options.scale : this.scale;

                        let canvasWidth = this.width;
                        let canvasHeight = this.height;

                        this.svg = this.canvas.append("svg")
                            .attr("width", canvasWidth)
                            .attr("height", canvasHeight)
                            .append("g")
                            .attr("transform", "translate( " + this.paddingLeft +"," + this.paddingTop + ")");

                        this.quadTree = new QuadTree({x:0,y:0,width:canvasWidth,height:canvasHeight});
                        this.spiralGenerator = this.archimedeanSpiral(canvasWidth, canvasHeight);
                    },

                    getSprite: function(node){
                        this.spriteContext.clearRect(0, 0, (this.cw << 5), this.ch);
                        this.spriteContext.save();
                        this.spriteContext.font = " 300 " +  ((node.size +1)/ this.ratio) + "px Arial";

                        let spriteWidth = this.spriteContext.measureText(node.text).width ;
                        let spriteHeight = node.size << 1; //Half the defined font size

                        this.spriteContext.fillText(node.text, 0, 0);
                        this.spriteContext.restore();

                        node.width = spriteWidth;
                        node.height = spriteHeight;
                    },

                    colorWord: function(rating){
                        let colors = ['#d35454', '#f48d71', '#f9c55d', '#d6cf56', '#92bc61'];
                        let i = Math.max(Math.min(Math.floor(rating), colors.length - 1), 0);
                        return colors[i];
                    },

                    archimedeanSpiral: function(width, height) {
                        let e = width / height;
                        return function(t) {
                            return [e * (t *= .1) * Math.cos(t), t * Math.sin(t)];
                        };
                    },

                    rectangularSpiral: function(width, height) {
                        let dy = 4,
                            dx = dy * width / height,
                            x = 0,
                            y = 0;
                        return function(t) {
                          let sign = t < 0 ? -1 : 1;
                          // See triangular numbers: T_n = n * (n + 1) / 2.
                          switch ((Math.sqrt(1 + 4 * sign * t) - sign) & 3) {
                            case 0:  x += dx; break;
                            case 1:  y += dy; break;
                            case 2:  x -= dx; break;
                            default: y -= dy; break;
                          }
                          return [x, y];
                        };
                    },

                    createTextNode: function(container, word, i, total) {
                        let x_base = this.width/5; //position to the right based on rating (min 1, max 5)
                        let y_base = this.height/5; //position vertically based on size

                        if(this.current.currentWeight !== word.weight) {
                            this.current = {
                                currentSizeI: i,
                                currentWeight: word.weight
                            };
                        }

                        let ratio = Math.sqrt(Math.sqrt(((this.current.currentSizeI+1)/total)));
                        let size = (16 + (90 - (90 * ratio))) * this.scale;
                        let rotate = 1;
                        let textNode = {
                            'id': i,
                            'size': size,
                            'rotate': rotate,
                            'rating': word.rating,
                            'text': word.text,
                            'collidableWith': 'word',
                            'type': 'word',
                            'direction': 1
                        };

                        this.getSprite(textNode); //Get the height and width od the word;

                        //I'm loathe to use it, but here the ~~ will return 0 in the case where .rating is undefined
                        let xStart = x_base * Math.max(~~word.rating, 0);
                        let xOffset = x_base * Math.random();
                        let x = Math.max(0, Math.min(xStart + xOffset, this.width - textNode.width));

                        let yStart = y_base * Math.max(Math.floor(5 * i/total), 0);
                        let yOffset = y_base * Math.random();

                        let y = Math.max(0, Math.min(yStart + yOffset, this.height - textNode.height));
                        y = Math.random() * this.height;
                        textNode.x = x;
                        textNode.originalX = x;
                        textNode.y = y;
                        textNode.originalY = y;

                        return textNode;
                    },

                    positionText: function(nodes, node, spiralGenerator, iteration, drawCallback){
                        this.quadTree.clear();
                        this.quadTree.insert(nodes);
                        this.quadTree.insert(node);
                        this.detectCollision();

                        let outOfBounds = false;
                        let maxBoundWidth = this.width - this.paddingRight;
                        let minBoundWidth = this.paddingLeft;
                        let maxBoundHeight = this.height - this.paddingBottom;
                        let minBoundHeight = this.paddingTop;

                        let maxDelta = this.width/10;

                        if (node.x < minBoundWidth|| node.y < minBoundHeight ||
                            node.x + node.width > maxBoundWidth || node.y + node.height > maxBoundHeight) {
                            outOfBounds = true;
                        }

                        let distance = Math.abs(node.originalX - node.x);

                        if(node.isColliding && !(distance > maxDelta)){
                            let posUpdate = spiralGenerator(iteration * node.direction);
                            node.x += posUpdate[0];
                            node.y += posUpdate[1];
                            node.isColliding = false;
                            this.positionText(nodes, node, spiralGenerator, ++iteration, drawCallback);
                        }else if(!outOfBounds && !(distance > maxDelta)){
                            nodes.push(node);
                            drawCallback();
                        }
                    },

                    drawLine: function(container, lineCoords){
                        let pointerLine = d3.line()
                            .x(function(d) { return d.x })
                            .y(function(d) { return d.y });

                        container.selectAll("path")
                            .data([lineCoords])
                            .enter()
                            .append("svg:path")
                            .attr("d", pointerLine)
                            .style("fill", "#dedede")
                            .style("stroke", "#dedede")
                            .style("fill-opacity", 1);
                    },

                    drawGuideLines: function(){
                        let container;

                        for(let i=0; i<6; i++){
                            let  y = (this.height/5) * i;
                            container = this.svg.append("svg:g");
                            this.drawLine(container, [{x: 0, y: y}, {x: this.width, y: y}]);
                        }

                        for(let i=0; i < 16; i++){
                            let x = (this.width/15) * i;
                            container = this.svg.append("svg:g");
                            this.drawLine(container, [{x: x, y: 0}, {x: x, y: this.height}]);
                        }

                        for(let i=0; i<5; i++){
                            let y = -40;
                            let x = ((this.width/5) * i+1) + this.width/10;
                            let text = i+1 + (i+1 > 1 ? " STARS" : " STAR");
                            container = this.svg.append("svg:g");
                            container.append("text")
                                .text(text)
                                .attr("fill", "#ababab")
                                .style("font-size", "16px")
                                .style("font-weight", "300")
                                .attr("text-anchor", "middle")
                                .attr("transform", "translate(" + x + "," + y + ")");
                        }

                        let maxWidth = (this.width/5) * 0.7;
                        let leftOffset = ((this.width/5) - maxWidth)/2;

                        let ratings = this.dataProvider["ratings"];
                        this.drawBar(container, maxWidth, ratings["total"], ratings["1"], this.colorWord(0), leftOffset, -30);
                        this.drawBar(container, maxWidth, ratings["total"], ratings["2"], this.colorWord(1), (this.width/5) + leftOffset, -30);
                        this.drawBar(container, maxWidth, ratings["total"], ratings["3"], this.colorWord(2), ((this.width/5)*2) + leftOffset, -30);
                        this.drawBar(container, maxWidth, ratings["total"], ratings["4"], this.colorWord(3), ((this.width/5)*3) + leftOffset, -30);
                        this.drawBar(container, maxWidth, ratings["total"], ratings["5"], this.colorWord(4), ((this.width/5)*4) + leftOffset, -30);
                    },

                    drawTexts: function(container, nodes){
                        for(let i=0; i<nodes.length; i++){
                            this.drawText(container, nodes[i]);
                        }
                    },

                    drawText: function(container, node){
                        let draw_x = node.x;
                        let draw_y = node.y;
                        let draw_rotate = node.rotate;

                        container.append("text")
                            .text(node.text)
                            .attr("fill",  this.colorWord(node.rating))
                            .style("font-size", node.size + "px")
                            .style("font-weight", "600")
                            .attr("text-anchor", "start")
                            .attr("transform", "translate(" + draw_x + "," + draw_y + "), rotate(" + draw_rotate +")");
                    },

                    drawBar: function(container, barWidth, total, count, color, x, y){
                        let pathLine = [{x: 0, y: 0}, {x: barWidth, y: 0}, {x: barWidth, y: this.barHeight}, {x: 0, y: this.barHeight}, {x: 0, y: 0}];
                        container = this.svg.append("svg:g")
                            .attr("transform", "translate(" + x + "," + y +")");

                        let filledWidth = barWidth * (count/total);
                        let fillerLine = [{x: 0, y: 0}, {x: filledWidth, y: 0}, {x: filledWidth, y: this.barHeight}, {x: 0, y: this.barHeight}, {x: 0, y: 0}];
                        let pointerLine = d3.line()
                            .x(function(d) { return d.x })
                            .y(function(d) { return d.y });

                        let filledLine = d3.line()
                            .x(function(d) { return d.x })
                            .y(function(d) { return d.y });

                            container.selectAll("path.underlay")
                                .data([pathLine])
                                .enter()
                                .append("svg:path")
                                .attr("class", "underlay")
                                .attr("d", pointerLine)
                                .style("fill", "#dedede")
                                .style("stroke-opacity", 0)
                                .style("fill-opacity", 1);

                            container.append("svg:circle")
                                .attr("cx", 0)
                                .attr("cy", this.barHeight/2)
                                .attr("r", this.barHeight/2)
                                .style("fill", "#dedede")
                                .style("stroke-opacity", 0)
                                .style("fill-opacity", 1);

                            container.append("svg:circle")
                                .attr("cx", barWidth)
                                .attr("cy", this.barHeight/2)
                                .attr("r", this.barHeight/2)
                                .style("fill", "#dedede")
                                .style("stroke-opacity", 0)
                                .style("fill-opacity", 1);

                            container.selectAll("path.overlay")
                                .data([fillerLine])
                                .enter()
                                .append("svg:path")
                                .attr("class", "overlay")
                                .attr("d", filledLine)
                                .style("fill", color)
                                .style("stroke-opacity", 0)
                                .style("fill-opacity", 1);

                            container.append("svg:circle")
                                .attr("cx", 0)
                                .attr("cy", this.barHeight/2)
                                .attr("r", this.barHeight/2)
                                .style("fill", color)
                                .style("stroke-opacity", 0)
                                .style("fill-opacity", 1);

                            container.append("svg:circle")
                                .attr("cx", filledWidth)
                                .attr("cy", this.barHeight/2)
                                .attr("r", this.barHeight/2)
                                .style("fill", color)
                                .style("stroke-opacity", 0)
                                .style("fill-opacity", 1);
                    },

                    draw: function(words, progressive){
                        this.drawGuideLines();
                        let container = this.svg.append("svg:g").attr("class", "word-cloud");
                        let nodes = [];

                        this.current = {
                            currentSizeI: -1,
                            currentWeight: -1
                        };

                        let i = 0;
                        let f = function(container, i, nodes, words){
                            return function(){
                                if(i < words.length){
                                    let node = this.createTextNode(container, words[i], i, words.length);
                                    let drawCallback = function(container, node){
                                        return function(){};
                                    };

                                    if(progressive){
                                        drawCallback = function(container, node){
                                            return function(){
                                                this.drawText(container, node);
                                            }.bind(this);
                                        }.bind(this);
                                    }

                                    this.positionText(nodes, node, this.spiralGenerator, 0, drawCallback(container, node));
                                    setTimeout(f(container, ++i, nodes, words), 0);
                                }else{
                                    if(!progressive){
                                        this.drawTexts(container, nodes);
                                    }
                                }
                            }.bind(this);
                        }.bind(this);
                        setTimeout(f(container, i, nodes, words), 0);
                    },

                    detectCollision: function() {
                        let objects = [];
                        this.quadTree.getAllObjects(objects);

                        for (let x = 0, len = objects.length; x < len; x++){
                            let obj = [];
                            this.quadTree.findObjects(obj, objects[x]);

                            for (let y = 0, length = obj.length; y < length; y++) {
                                if (objects[x].id !== obj[y].id &&
                                    objects[x].collidableWith === obj[y].type &&

                                    (objects[x].x < obj[y].x + obj[y].width &&
                                    objects[x].x + objects[x].width > obj[y].x &&
                                    objects[x].y < obj[y].y + obj[y].height &&
                                    objects[x].y + objects[x].height > obj[y].y)) {
                                        objects[x].isColliding = true;
                                        obj[y].isColliding = true;
                                }
                            }
                        }
                    },

                    addRefresher: function(target){
                        $(target).append("<button class=\"refresh\">R</button>");
                        let btn = $(target).find("button.refresh");
                        btn.css("position", "absolute").css("bottom", "0").css("right", 0).on("click", function(){this.write(target)}.bind(this));
                    },

                    react: function(value){
                        if(options.general.valueReaction){
                            return options.general.valueReaction(this, parent, value);
                        }
                        return value;
                    },

                    write: function(target){
                        this.height = 500;
                        this.width = 1600;
                        this.resetCanvas(target);
                        this.quadTree.clear();
                        this.draw(this.dataProvider["words"], true);
                        this.addRefresher(target);
                    }
                };
                return chart;
            }

            let canvas = $("div canavas");
            let width = canvas.width();
            let height =  (4/9) * width;

            let options = {
                height: height,
                width: width,
                paddingTop: 80,
                paddingBottom: 20,
                paddingLeft: 30,
                paddingRight: 30,
                scale: 1
            };

            let chart = create(options);
            chart.dataProvider = {'words':words, 'ratings':{'1': 345, '2':200, '3':100, '4':89, '5':24, 'total': 758}};
            chart.write('#word');
        });
    });
});