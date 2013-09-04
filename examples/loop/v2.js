'use strict';

var svg = Pablo('#stage').svg({width:1920, height:1024}),
    rect = svg.rect({width:100, height:100, x:0, y:0}),
    fpsElem = Pablo('#fps'),
    fpsFrames,
    lastFpsRounded,
    animations;


/////


rect.one('click', function(){
    animations = [
        rect.tween({
            attr: 'x',
            to: 300,
            dur: 2000
        }),

        rect.tween({
            attr: 'y',
            by: 50,
            dur: 5000,
            callback: function(deltaT){
                var fps = 1000 / deltaT,
                    fpsSampleSize = 60,
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
            }
        })
    ];
    animations.active = true;

    rect.on('click', function(){
        var allComplete = animations.every(function(animation){
            return animation.complete;
        });

        animations.active = !animations.active;

        animations.forEach(function(animation){
            if (allComplete){
                animation.start();
                animations.active = true;
            }
            else if (!animations.active){
                animation.stop();
            }
            else if (!animation.complete){
                animation.start();
            }
        });
    });
});

// Add event listeners
Pablo.animation.on('add', function(obj, callback){console.log('add');});
Pablo.animation.on('remove', function(obj, callback){console.log('remove');});
Pablo.animation.on('start', function(){console.log('start', Pablo.animation.loop.loopStartTime);});
Pablo.animation.on('loop', function(obj, deltaT, timestamp){console.log('loop', deltaT, timestamp);});
Pablo.animation.on('stop', function(){console.log('stop');});
