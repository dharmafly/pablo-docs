'use strict';

var svg = Pablo('#stage').svg({width:1920, height:1024}),
    rect = svg.rect({width:100, height:100, x:0, y:0}),
    fpsElem = Pablo('#fps'),
    fpsFrames,
    lastFpsRounded,
    tweens, fpsCounter;


/////


rect.one('click', function(){
    tweens = rect.tween([
        /*
        {
            attr: 'x',
            to: 300,
            dur: 2000
        },

        {
            attr: 'y',
            by: 50,
            dur: 5000
        },

        {
            transform: 'rotate',
            by: [10]
        }
        */
        {
            attr: 'x',
            from: 0,
            to: 500
        }
    ]);

    fpsCounter = Pablo.animation(function(deltaT){
        var fps, fpsSampleSize, fpsAverage, fpsRounded;

        fps = 1000 / deltaT;
        fpsSampleSize = 60;
        fpsAverage, fpsRounded;

        // Skip first frame
        if (!fpsFrames){
            fpsFrames = [];
            return;
        }

        if (fpsFrames.length === fpsSampleSize){
            fpsFrames.shift();
        }
        fpsFrames.push(fps);

        fpsAverage = fpsFrames.reduce(function(previousValue, currentValue){
            return currentValue + previousValue;
        }) / fpsFrames.length;

        fpsRounded = Math.round(fpsAverage);
        if (lastFpsRounded !== fpsRounded){
            lastFpsRounded = fpsRounded;
            fpsElem.content(fpsRounded + ' fps');
        }
    });

    tweens.events.on('start', function(){
        fpsCounter.start();
    });

    tweens.events.on('stop', function(){
        fpsCounter.stop();
    });

    rect.on('click', function(){
        tweens.toggle();
    });
});


/////


// Add event listeners
Pablo.animation.on('add', function(obj, callback){console.log('add');});
Pablo.animation.on('remove', function(obj, callback){console.log('remove');});
Pablo.animation.on('start', function(){console.log('start', Pablo.animation.loop.loopStartTime);});
Pablo.animation.on('loop', function(obj, deltaT, timestamp){console.log('loop', deltaT, timestamp);});
Pablo.animation.on('stop', function(){console.log('stop');});
