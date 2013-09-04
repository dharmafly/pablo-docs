(function(window, Pablo){
    'use strict';

    // NOTE: Polyfill for requestAnimationFrame: https://gist.github.com/paulirish/1579671

    var dataIndex = '__animations__',

        requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame,

        cancelAnimationFrame = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame || window.webkitCancelRequestAnimationFrame,

        nowUnix = window.Date.now || function(){
            return (new Date()).getTime();
        };


    function removeFromArray(array, target){
        var index = array.indexOf(target);

        // Remove animation from array
        if (index >= 0){
            array.splice(index, 1);
        }
    }


    /////


    function Animation(callback, loop, settings){
        this.callback = callback;
        this.loop = loop;
        this.events = Pablo();

        if (settings){
            Pablo.extend(this, settings);
        }
    }

    Pablo.extend(Animation.prototype, {
        // The `active` parameter is changed by Loop.add and Loop.remove
        active: false,
        complete: false,
        lasttime: null,
        addedToLoopTimeUnix: null,
        runningtime: 0,
        dur: -1,

        // Prepare the animation for a new cycle, which will last many frames
        onStartCycle: function(){
            this.complete = false;
            this.runningtime = 0;
            return this;
        },

        // Prepare the animation to be added back into the loop, after stopping
        onAddToLoop: function(){
            this.active = true;
            this.lasttime = null;
            this.addedToLoopTimeUnix = nowUnix();
            return this;
        },

        onRemoveFromLoop: function(){
            this.active = false;
            return this;
        },

        onStartLoop: function(){
            this.lasttime = null;
            return this;
        },

        onAnimationFrame: function(deltaT, timestamp, frameStartTimeUnix){
            // First iteration of the animation since last added to the loop
            if (!this.lasttime){
                deltaT = frameStartTimeUnix - this.addedToLoopTimeUnix;
            }
            // Successive iterations
            else {
                deltaT = timestamp - this.lasttime;
            }

            this.deltaT = deltaT;
            this.lasttime = timestamp;
            this.runningtime = deltaT + this.runningtime;
            this.callback(deltaT, timestamp);

            // If duration reached, then end
            if (this.dur > -1){
                if (this.runningtime > this.dur){
                    this.end();
                }
            }
            return this;
        },

        start: function(){
            if (!this.active){
                if (this.complete){
                    this.onStartCycle();
                }

                // Add to loop and start if not already started
                this.loop.add(this);
                this.loop.start();
                this.events.trigger('start');
            }
            return this;
        },

        stop: function(){
            if (this.active){
                // Remove from loop
                this.loop.remove(this);
            }
            this.events.trigger('stop');
            return this;
        },

        toggle: function(){
            if (this.active){
                this.stop();
            }
            else {
                this.start();
            }
            return this;
        },   

        end: function(){
            if (!this.complete){
                this.complete = true;
                this.stop();
                this.events.trigger('end');
            }
            return this;
        }
    });


    /////


    function Loop(animations, autostart){
        // Cache an array of animation callbacks
        this.animations = [];
        this.autostart = autostart;

        // Create an empty collection to act as an events proxy
        this.events = Pablo();
        this.onAnimationFrame = this.onAnimationFrame.bind(this);

        if (animations){
            this.add(animations);
        }
        if (autostart){
            this.start();
        }
    }

    Loop.nowUnix = nowUnix;

    Pablo.extend(Loop.prototype, {
        active: false,
        autostart: false,

        create: function(callback, settings){
            return new Animation(callback, this, settings);
        },

        add: function(callback, settings){
            var animation;

            if (Pablo.isArray(callback)){
                return callback.map(function(callback){
                    return this.add(callback);
                }, this);
            }

            if (callback instanceof Animation){
                animation = callback;
            }
            else {
                animation = this.create(callback, settings);
            }

            animation.onAddToLoop();
            this.animations.push(animation);
            this.events.trigger('add', animation);
            
            return animation;
        },

        remove: function(animation, persist){
            if (Pablo.isArray(animation)){
                animation.forEach(function(animation){
                    this.remove(animation, persist);
                }, this);
            }
            else {
                animation.onRemoveFromLoop();
                removeFromArray(this.animations, animation);
                this.events.trigger('remove', animation);

                if (!persist && !this.animations.length){
                    this.stop();
                }
            }
            return this;
        },

        onAnimationFrame: function(timestamp){
            var frameStartTimeUnix;

            // In case cancelAnimationFrame is unavailable, break the loop here
            if (!this.active){
                return;
            }

            this.timestamp = timestamp;

            // This is the first iteration of the loop since it was last started
            if (!this.lasttime){
                frameStartTimeUnix = nowUnix();
                this.deltaT = frameStartTimeUnix - this.loopStartTimeUnix;
            }
            // Successive iterations
            else {
                this.deltaT = timestamp - this.lasttime;
            }

            // Process each animation callback
            this.animations.forEach(function(animation){
                if (!frameStartTimeUnix && !animation.lasttime){
                    frameStartTimeUnix = nowUnix();
                }
                animation.onAnimationFrame(this.deltaT, timestamp, frameStartTimeUnix);
            }, this);

            this.events.trigger('loop', this.deltaT, timestamp, frameStartTimeUnix);

            // Update lasttime for next loop
            this.lasttime = timestamp;

            // Send the loop function to the next animation frame
            this.frameRequestId = requestAnimationFrame(this.onAnimationFrame);

            return this;
        },

        start: function(){
            if (!this.active){
                this.active = true;
                this.lasttime = null;
                this.loopStartTimeUnix = nowUnix();
                // this.loopStartTime = window.performance.now();

                this.animations.forEach(function(animation){
                    animation.onStartLoop();
                });

                this.events.trigger('start');
                this.frameRequestId = requestAnimationFrame(this.onAnimationFrame);
            }
            return this;
        },

        stop: function(){
            var stoptimeUnix;

            if (this.active){
                this.active = false;
                this.stoptimeUnix = stoptimeUnix = nowUnix();
                this.animations.forEach(function(animation){
                    animation.stoptimeUnix = stoptimeUnix;
                });
                cancelAnimationFrame(this.frameRequestId);
                this.events.trigger('stop');
            }
            return this;
        },

        toggle: function(){
            if (this.active){
                this.stop();
            }
            else {
                this.start();
            }
            return this;
        }
    });


    /////


    // Pablo.animation
    Pablo.animation = function(animation, settings){
        animation = Pablo.animation.add(animation, settings);
        Pablo.animation.start();
        return animation;
    };
    
    Pablo.extend(Pablo.animation, {
        Loop: Loop,
        Animation: Animation,
        nowUnix: nowUnix,
        loop: new Loop(),

        create: function(animation, settings){
            return this.loop.create(animation, settings);
        },

        add: function(animation, settings){
            return this.loop.add(animation, settings);
        },

        remove: function(animation, persist){
            this.loop.remove(animation, persist);
            return this;
        },

        start: function(){
            this.loop.start();
            return this;
        },

        stop: function(){
            this.loop.stop();
            return this;
        },

        toggle: function(){
            this.loop.toggle();
            return this;
        },

        on: function(){
            this.loop.events.on.apply(this.loop.events, arguments);
            return this;
        },

        off: function(){
            this.loop.events.off.apply(this.loop.events, arguments);
            return this;
        },

        trigger: function(){
            this.loop.events.trigger.apply(this.loop.events, arguments);
            return this;
        }
    });


    // Collection API extension
    Pablo.extend(Pablo.fn, {
        tween: (function(){
            // TODO: improve performance by caching element attribute values. Have an
            // optional override as argument, which would be needed if the attributes
            // were being modified from outside of this loop
            function updateAttr(elem, deltaT, tweenSettings){
                var currentAttr = Number(elem.attr(tweenSettings.attr)) || 0,
                    isPositive = true,
                    deltaAttr, newAttr;

                if ('to' in tweenSettings){
                    isPositive = tweenSettings.to > tweenSettings.from;
                }
                
                if ('by' in tweenSettings){
                    deltaAttr = (deltaT / tweenSettings.per) * tweenSettings.by;
                }
                else if ('dur' in tweenSettings){
                    if ('to' in tweenSettings){
                        deltaAttr = (deltaT / tweenSettings.dur) * (
                            isPositive ?
                                tweenSettings.to - tweenSettings.from :
                                tweenSettings.from - tweenSettings.to
                        );
                    }
                    else {
                        deltaAttr = tweenSettings.dur / deltaT;
                    }
                }
                else {
                    deltaAttr = 1000 / deltaT;
                }

                if (!deltaAttr){
                    this.end();
                    return;
                }
                
                newAttr = isPositive ?
                    currentAttr + deltaAttr : currentAttr - deltaAttr;

                if ('to' in tweenSettings && (
                    isPositive && newAttr >= tweenSettings.to ||
                    !isPositive && newAttr <= tweenSettings.to
                )){
                    elem.attr(tweenSettings.attr, tweenSettings.to);
                    this.end();
                }

                else {
                    elem.attr(tweenSettings.attr, newAttr);
                }
            }

            function updateCollection(collection, deltaT, tweenSettings){
                var length = collection.length;

                if (length > 1){
                    collection.each(function(el){
                        updateAttr.call(this, Pablo(el), deltaT, tweenSettings);
                    }, this);
                }
                else if (length) {
                    updateAttr.call(this, collection, deltaT, tweenSettings);
                }
            }

            function applyTween(collection, deltaT, tweenSettings){
                if (Pablo.isArray(tweenSettings)){
                    tweenSettings.forEach(function(tweenSettings){
                        updateCollection.call(this, collection, deltaT, tweenSettings);
                    }, this);
                }
                else {
                    updateCollection.call(this, collection, deltaT, tweenSettings);
                }
            }

            return function(tweenSettings, animationSettings){
                var collection = this,
                    animation;

                // Default 'per' is 1000 milliseconds
                if ('by' in tweenSettings && !('per' in tweenSettings)){
                    tweenSettings.per = 1000;
                }

                if ('dur' in tweenSettings && !('to' in tweenSettings)){
                    animationSettings = (animationSettings || {});
                    animationSettings.dur = tweenSettings.dur;
                }
                    
                animation = Pablo.animation(function(deltaT, timestamp){
                    applyTween.call(this, collection, deltaT, tweenSettings);

                    if ('callback' in tweenSettings){
                        tweenSettings.callback.call(this, deltaT, timestamp, collection, tweenSettings);
                    }
                }, animationSettings);

                if ('from' in tweenSettings){
                    this.attr(tweenSettings.attr, tweenSettings.from);
                }
                else {
                    // TODO: handle multiple elements in the collection
                    tweenSettings.from = Number(this.attr(tweenSettings.attr)) || 0;

                    // Set `from` on unpause when no `from` had been specified
                    animation.events.on('start', function(){
                        tweenSettings.from = Number(collection.attr(tweenSettings.attr)) || 0;

                        if (!tweenSettings.from){
                            tweenSettings.from = 0;
                            collection.attr(tweenSettings.attr, 0);
                        }
                    });   
                }

                return animation;
            };
        }()),
    });

}(window, window.Pablo));
