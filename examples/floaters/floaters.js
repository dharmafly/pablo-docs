'use strict';

function createRoot(container){
    var root, width, height;

    // SETTINGS
    width = window.innerWidth;
    height = window.innerHeight;

    var root;

    // Body styles
    Pablo('body').css({
        margin:0,
        body: 0,
        'background-color': 'black',
        color: 'white'
    });

    // SVG root node
    return Pablo('#paper').root({
        width: width,
        height: height
    });
}

/////


var namespace = 'floaters',
    attrNamespace = 'data-' + namespace,
    attrIdKey = attrNamespace + '-id',
    root = createRoot('#paper'),
    reqAnimFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame ||
        window.msRequestAnimationFrame,
    cancelAnimFrame = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame ||
        window.msCancelAnimationFrame,

    gameMQInterval = 1000 / 5,
        
    colors = ['#e0f6a5','#eafcb3','#a0c574','#7c7362','#745051','#edcabc','#6b5048','#ae7271','#b79b9e','#c76044','#edfcc1','#d9f396','#75a422','#819b69','#c8836a'],
    colorsLength = colors.length,
    symbolDensity = 1,

    settings = {
        root: root,
        rootElem: root.el[0],
        width: Number(root.attr('width')),
        height: Number(root.attr('height')),
        rMax: 150,
        rMin: 1.5,
        strokeWidthMin: 2,
        strokeWidthMax: 20,
        velocityMin: 0.05,
        velocityMax: 0.2,
        velocitySlowdown: 1.5,
        opacityMin: 0.3,
        opacityMax: 0.9,
        //opacityMin: 1,
        //opacityMax: 1,
        colors: colors,
        colorsLength: colorsLength,
        fadeoutTime: 405,
        pointsMin: 5,
        pointsMax: 100
    },

    rMid = ((settings.rMax - settings.rMin) / 2) + settings.rMin,
    numPixels = settings.width * settings.height,
    maxSymbols = Math.round((numPixels / rMid) * (symbolDensity / 1000)),
    createInterval = 240,

    // global message queue
    messageQueue = new MQ();


/////


function round(num, decimalplaces){
    return Number(num.toFixed(decimalplaces));
}

function randomInt(length){
    return Math.ceil((length || 2) * Math.random()) - 1;
}

function selectInRange(factor, min, max){
    return factor * (max - min) + min;
}

function randomInRange(min, max){
    return selectInRange(Math.random(), min, max);
}

function randomIntRange(min, max){
    return randomInt(max + 1 - min) + min;
}

function now(){
    return (new Date().getTime());
}

////

function Vector(x, y){
    this.x = x;
    this.y = y;
}

Vector.prototype = {
    add: function(vectorOrDigit){
        if (typeof vectorOrDigit === 'number'){
            this.x += vectorOrDigit;
            this.y += vectorOrDigit;
        }
        else if (typeof vectorOrDigit === 'object' && vectorOrDigit !== null) {
            this.x += vectorOrDigit.x;
            this.y += vectorOrDigit.y;
        }
        return this;
    },

    multiply: function(vectorOrDigit){
        if (typeof vectorOrDigit === 'number'){
            this.x *= vectorOrDigit;
            this.y *= vectorOrDigit;
        }
        else if (typeof vectorOrDigit === 'object' && vectorOrDigit !== null) {
            this.x *= vector.x;
            this.y *= vector.y;
        }
        return this;
    },

    clone: function(){
        return new Vector(this.x, this.y);
    }
};


/////


function Game(settings){
    this.init(settings);
}

Game.prototype = {
    init: function(settings){
        var game = this;

        this.settings = settings;
        this.animationLoop = new AnimationLoop(null, settings.rootElem);

        return this.create();
    },

    // publish event
    pub: function(event, data){
        messageQueue.pub(this.namespace + ':' + event, data, this);
        return this;
    },

    // subscribe to event
    sub: function(event, callback){
        messageQueue.sub(event, callback);
        return this;
    },

    createDashboard: function(){
        this.dom = this.settings.root.g({'class': 'dashboard'});

        this.points = this.dom.g({'class': 'points'});

        this.notification = this.dom.text({
            'class': 'notification',
            x:'45%', 
            y:'50%', 
            'font-size':30, 
            'font-family':'lcd', 
            fill:'white'
        });

        return this;
    },

    displayNotification: function(message){
        // Update contents
        this.notification.content(message);
        return this;
    },

    displayPoints: function(symbol){
        var fontSize = 30;

        this.points.text({
            x: Math.round(symbol.pos.x - (fontSize / 2)),
            y: Math.round(symbol.pos.y + (fontSize / 2)), 
            'font-size': fontSize, 
            'font-family':'lcd', 
            fill:'green'
        }).content(symbol.points);

        return this;
    },

    transformPoints: function(){
        var px = randomIntRange(30, 60);

        this.points.cssPrefix({
            transform: 'rotate3d(1, 1, 1, ' + px + 'deg)'
        });
        return this;
    },

    // Add CSS styles
    addStyles: function(){
        var fadeStylesToPrefix = {
            transition: 'all ' + (800 / 1000) + 's ' + 'ease-in',
            'transform-origin': (this.settings.width / 2) + 'px ' + (this.settings.height / 2) + 'px'
        };

        this.dom.style().content(
            // prevent mouse clicks on dashboard notifications & points
            '.dashboard .notification, .dashboard .points { pointer-events: none; }' +
            // transform points
            '.dashboard .points {' + Pablo.cssTextPrefix(fadeStylesToPrefix) + '}'
        );

        return this;
    },

    update: function(){
        messageQueue.process();
        return this;
    },

    create: function(){
        var game = this,
            circles = new Symbolset();

        // create state loop
        this.intervalId = window.setInterval(this.update, gameMQInterval);

        // Create symbols
        circles.createAll(settings);

        // Create dashboard
        this.createDashboard();

        // Add CSS styles
        this.addStyles();

        // Event subscriptions
        this.sub('pause', function(data, object){
                game.displayNotification(game.settings.pauseText);
            })
            .sub('resume', function(data, object){
                game.displayNotification('');
            })
            .sub('symbol:remove', function(data, symbol){
                game.displayPoints(symbol);
            })
            .sub('symbolset:remove', function(data, symbolset){
                game.displayNotification('Level complete');
                game.transformPoints();
            });

        // Click listener on SVG element
        settings.rootElem.addEventListener('click', function(event){
            var symbolId = event.target.getAttribute(attrIdKey),
                symbol = circles.getSymbolById(symbolId);

            if (symbol){
                symbol.onclick.call(symbol, event);
            }
        }, false);

        // Keypress listener
        window.addEventListener('keydown', function(event){
            // Spacebar pressed
            if (event.keyCode === 32){
                if (game.animationLoop.active){
                    game.animationLoop.stop();
                    messageQueue.pub('pause', {}, game);
                }
                else {
                    // Reset timer, to resume play from where we left off
                    circles.updated = now();
                    game.animationLoop.start();
                    messageQueue.pub('resume', {}, game);
                }
            }
        }, false);

        this.animationLoopCallback = this.animationLoop.add(function(){
            // Process all the events in the message queue
            messageQueue.process();

            // Update all symbols
            circles.updateAll();
        });
        this.animationLoop.start();
    }
};


/////


function Symbol(settings, params){
    this.init(settings, params);
}

Symbol.prototype = {
    namespace: 'symbol',

    init: function(settings, params){
        this.settings = settings;
        this.pos = new Vector();
        this.velocity = new Vector();

        // Instance parameters specified - e.g. radius, color, etc
        if (params){
            Pablo.extend(this, params);
        }
        // No instance parameters given, so randomise first
        else {
            this.randomize();
        }

        return this.create();
    },

    // publish event
    pub: function(event, data){
        messageQueue.pub(this.namespace + ':' + event, data, this);
        return this;
    },

    // subscribe to event
    sub: function(event, callback){
        messageQueue.sub(event, callback);
        return this;
    },

    create: function(){
        return this.createDom()
            .drawAppearance()
            .drawPos();
    },

    pickColor: function(){
        return this.settings.colors[randomInt(this.settings.colorsLength)];
    },

    randomize: function(){
        var settings = this.settings,
            halfwidth, x, y, velocityX, velocityY, velocityMax;

        // Importance
        this.importance = randomIntRange(1, 100) / 100;

        // Size & colour
        this.opacity = round(selectInRange(1 - this.importance, settings.opacityMin, settings.opacityMax), 2);

        this.r = Math.round(selectInRange(this.importance, settings.rMin, settings.rMax));

        this.strokeWidth = Math.round(selectInRange(this.importance, settings.strokeWidthMin, settings.strokeWidthMax));
        
        this.fill = this.pickColor();
        this.stroke = this.pickColor();

        halfwidth = this.r + this.strokeWidth;

        // Points
        this.points = Math.round(selectInRange(1 - this.importance, settings.pointsMin, settings.pointsMax));
        

        // Starting position - spread over either x or y axis
        if (randomInt()){
            x = randomInt() ? settings.width + halfwidth : 0 - halfwidth;
            y = randomInt(settings.height);
        }
        else {
            x = randomInt(settings.width);
            y = randomInt() ? settings.height + halfwidth : 0 - halfwidth;
        }

        velocityMax = selectInRange((1 - this.importance) * settings.velocitySlowdown, settings.velocityMin, settings.velocityMax);
        velocityX = round(randomInRange(settings.velocityMin, velocityMax), 2);
        velocityY = round(randomInRange(settings.velocityMin, velocityMax), 2);

        if (x > this.settings.width / 2){
            velocityX = 0 - velocityX;
        }
        if (y > this.settings.height / 2){
            velocityY = 0 - velocityY;
        }

        this.pos.x = x;
        this.pos.y = y;

        this.velocity.x = velocityX;
        this.velocity.y = velocityY;

        return this;
    },

    update: function(timeSinceLastUpdate){
        var pos = this.pos,
            halfwidth = this.r + this.strokeWidth;

        if (timeSinceLastUpdate){
            pos.x += this.velocity.x * timeSinceLastUpdate;
            pos.y += this.velocity.y * timeSinceLastUpdate;
        }
        else {
            pos.add(this.velocity);
        }

        if (
            pos.y < 0 - halfwidth ||
            pos.x > this.settings.width + halfwidth ||
            pos.y > this.settings.height + halfwidth
        ){
            this.randomize().drawAppearance();
        }

        return this.drawPos();
    },

    drawAppearance: function(){
        this.dom.attr({
            r: this.r,
            fill: this.fill,
            stroke: this.stroke,
            'stroke-width': this.strokeWidth,
            opacity: this.opacity
        });

        return this;
    },

    drawPos: function(){
        this.dom.attr({
            cx: Math.round(this.pos.x),
            cy: Math.round(this.pos.y)
        });

        return this;
    },

    remove: function(event){
        var symbol = this;

        // Fade out
        this.dom
            .attr({'class': 'fade'})
            .cssPrefix({
                'transform-origin': this.pos.x + 'px ' + this.pos.y + 'px'
            });

        // Remove DOM element from DOM tree, when animation finished
        window.setTimeout(function(){
            symbol.dom.remove();
        }, settings.fadeoutTime);

        return this.pub('remove');
    },

    createDom: function(){
        this.root = this.settings.root;
        this.dom = this.root.circle();
        return this;
    },

    onclick: function(domEvent){
        return this.remove();
    }
};

function Symbolset(){
    this.init();
}

Symbolset.prototype = {
    namespace: 'symbolset',
    now: now,
    createInterval: createInterval,
    maxSymbols: maxSymbols,
    reqAnimFrame: reqAnimFrame,

    init: function(){
        var symbolset = this;
        
        this.symbols = [];

        this.addStyles();

        this.sub('symbol:remove', function(data, symbol){
            symbolset.removeSymbol(symbol);
        });
        return this;
    },

    // publish event
    pub: function(event, data){
        messageQueue.pub(this.namespace + ':' + event, data, this);
        return this;
    },

    // subscribe to event
    sub: function(event, callback){
        messageQueue.sub(event, callback);
        return this;
    },

    createSymbol: function(settings){
        var symbol = new Symbol(settings);

        this.symbols.push(symbol);
        return symbol;
    },

    // Create as many symbols as specified by maxSymbols; add id to each symbol dom
    createAll: function(settings, params){
        var Symbol = this,
            attr = {},
            i, symbol;

        this.created = this.now(); // used in updateAll()
        settings.root = settings.root.g({'class': 'symbols'});

        for (i=0; i < this.maxSymbols; i++){
            symbol = this.createSymbol(settings, params);
            symbol.id = i;
            attr[attrIdKey] = i;
            symbol.dom.attr(attr);
        }

        return this;
    },

    updateAll: (function(){
        function updateSymbol(symbol){
            symbol.update(this.timeSinceLastUpdate);
        }

        // Keep updateSymbol in the closure, and return the main updateAll function
        return function(){
            // Cache timestamp of this run of the loop
            this.prevUpdated = this.updated || this.created;
            this.updated = this.now();
            this.timeSinceLastUpdate = this.prevUpdated ?
                this.updated - this.prevUpdated : null;

            this.symbols.forEach(updateSymbol, this);
            return this;
        };
    }()),

    // Add CSS styles
    addStyles: function(){
        var fadeStylesToPrefix = {
            transition: 'all ' + (settings.fadeoutTime / 1000) + 's ' + 'ease-out',
            transform: 'scale(0)'
        };

        settings.root.style().content(
            '.symbols circle:hover {stroke:green; cursor:crosshair;}' + 
            '.symbols circle.fade {' + Pablo.cssTextPrefix(fadeStylesToPrefix) + '}'
        );
        return this;
    },

    getSymbolById: function(id){
        return this.symbols[id];
    },

    removeSymbol: function(symbol){
        var hasRemainingSymbols, i;

        // Remove instance from memory
        delete this.symbols[symbol.id];

        // Check if all symbols removed
        for (i = this.symbols.length; i; i--){
            if (this.symbols[i-1]){
                hasRemainingSymbols = true;
                break;
            }
        }
        if (!hasRemainingSymbols){
            this.pub('remove');
        }

        return this;
    }
};


/////


// If browser environment suitable...
if (Pablo.isSupported && reqAnimFrame){
    new Game({
        pauseText: 'Paused',
        root: root,
        width: settings.width,
        height: settings.height
    });
}

else {
    alert('Sorry, your browser does not support the JavaScript technologies required for this demo.')
}

/////

/*
    TODO:
    - explode into 4 squares on click, shoot off-screen never to return (a new Symbolset); worth many points; use same stroke-color as mother
    - click within union between symbols, for double points
    - keep score
    - `panic` param -> greater velocity
    - keep time; time is taken off score for that round; ticker sound, LCD font
    - join symbol points, trigger second round with all circles recreated from the points in the last round
*/