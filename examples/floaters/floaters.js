'use strict';

/*
    TODO:
    - convert Symbol to Symbolset or to Circleset
    - explode into 4 squares on click, shoot off-screen never to return (a new Symbolset); worth many points; use same stroke-color as mother
    - click within union between symbols, for double points
    - keep score
    - `panic` param -> greater velocity
    - keep time; time is taken off score for that round; ticker sound, LCD font
*/

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


var namespace = 'pabloviz',
    attrNamespace = 'data-' + namespace,
    attrIdKey = attrNamespace + '-id',
    root = createRoot('#paper'),
    reqAnimFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame ||
        window.msRequestAnimationFrame,
    cancelAnimFrame = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame ||
        window.msCancelAnimationFrame,

    active = true,
        
    colors = ['#e0f6a5','#eafcb3','#a0c574','#7c7362','#745051','#edcabc','#6b5048','#ae7271','#b79b9e','#c76044','#edfcc1','#d9f396','#75a422','#819b69','#c8836a'],
    colorsLength = colors.length,
    symbolDensity = 2,

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
        fadeoutTime: 405
    },


    rMid = ((settings.rMax - settings.rMin) / 2) + settings.rMin,
    numPixels = settings.width * settings.height,
    maxSymbols = Math.round((numPixels / rMid) * (symbolDensity / 1000)),
    createInterval = 240;


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

/////


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


function Symbol(settings, params){
    this.settings = settings;

    // Instance parameters specified - e.g. radius, color, etc
    if (params){
        Pablo.extend(this, params);
    }

    // No instance parameters given, so randomise first
    else {
        this.randomize();
    }
    this.create();
}

Symbol.prototype = {
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

        this.pos || (this.pos = new Vector());
        this.pos.x = x;
        this.pos.y = y;

        this.velocity || (this.velocity = new Vector());
        this.velocity.x = velocityX;
        this.velocity.y = velocityY;

        return this;
    },

    update: function(velocityPerFrame){
        var pos = this.pos,
            halfwidth = this.r + this.strokeWidth;

        pos.add(velocityPerFrame || this.velocity);

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

    onclick: function(event){
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
    },

    createDom: function(){
        this.root = this.settings.root;
        this.dom = this.root.circle();
        return this;
    },

    create: function(){
        return this.createDom()
            .drawAppearance()
            .drawPos();
    }
};

function Symbolset(){
    this.symbols = [];
}

Symbolset.prototype = {
    now: now,
    createInterval: createInterval,
    maxSymbols: maxSymbols,
    reqAnimFrame: reqAnimFrame,

    createSymbol: function(settings){
        var symbol = new Symbol(settings);
        this.symbols.push(symbol);
        return symbol;
    },

    // Create as many symbols as specified by maxSymbols; add id to each symbol dom
    createAll: function(settings){
        var Symbol = this,
            attr = {},
            i, symbol;

        this.created = this.now(); // used in updateAll()
        settings.root = settings.root.g({'class': 'symbols'});

        for (i=0; i < Symbol.maxSymbols; i++){
            symbol = Symbol.createSymbol(settings);
            symbol.id = i;
            attr[attrIdKey] = i;
            symbol.dom.attr(attr);
        }
    },

    updateAll: (function(){
        // Keep updateSymbol in the closure, and return the main updateAll function
        return function(){
            var symbolset = this,
                timeSinceLastUpdateVector;

            // Cache timestamp of this run of the loop
            this.prevUpdated = this.updated || this.created;
            this.updated = this.now();
            this.timeSinceLastUpdate = this.prevUpdated ?
                this.updated - this.prevUpdated : null;

            this.symbols.forEach(
                function (symbol){
                    var velocityPerFrame;

                    velocityPerFrame = symbolset.timeSinceLastUpdate ?
                        symbol.velocity.clone().multiply(symbolset.timeSinceLastUpdate) :
                        symbol.velocity;

                    symbol.update(velocityPerFrame);
                }
            );
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
    },

    getSymbolById: function(id){
        return this.symbols[id];
    },

    removeSymbol: function(symbol){
        if (symbol.id){
            delete this.symbols[symbol.id];
        }
    }
};


/////

// If browser environment suitable...
if (Pablo.isSupported && reqAnimFrame){
    var circles = new Symbolset(),
        // Main loop handler, fires on each animation frame
        loop = function(){
            // Update all symbols
            circles.updateAll();

            // On each animation frame, repeat the loop; store ID of this request for the next animation frame
            loop.requestId = reqAnimFrame(loop, settings.rootElem);
        };

    // Add CSS styles
    circles.addStyles();

    // Create symbols
    circles.createAll(settings);

    // Store ID of this request for the next animation frame
    loop.requestId = reqAnimFrame(loop, settings.rootElem);

    // Click listener on SVG element
    settings.rootElem.addEventListener('click', function(event){
        var symbol = circles.getSymbolById(event.target.getAttribute(attrIdKey));
        if (symbol){
            symbol.onclick.call(symbol, event);
            // Remove Symbol instance from memory
            circles.removeSymbol(this);
        }
    }, false);

    // Keypress listener
    window.addEventListener('keydown', function(event){
        // Spacebar pressed
        if (event.keyCode === 32){
            if (active && cancelAnimFrame){
                active = false;
                cancelAnimFrame(loop.requestId);
            }
            else {
                active = true;
                // Reset timer, to resume play from where we left off
                circles.updated = now();
                loop();
            }
        }
    }, false);

}

else {
    alert('Sorry, your browser does not support the JavaScript technologies required for this demo.')
}