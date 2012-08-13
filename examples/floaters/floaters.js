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