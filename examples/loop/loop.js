(function(window, Pablo){
    'use strict';

    // NOTE: Polyfill for requestAnimationFrame: https://gist.github.com/paulirish/1579671

    var dataIndex = '__animations__',

        requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame,

        cancelAnimationFrame = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame || window.webkitCancelRequestAnimationFrame,

        nowUnix = window.Date.now || function(){
            return (new Date()).getTime();
        };


    /////


    function Things(unique){
        // If `unique` is true, then the object cannot appear more than once
        this.unique = unique === true;
    }

    Things.prototype = Pablo.extend([], {
        add: function(thing){
            // Flatten array of things
            if (Pablo.isArray(thing)){
                thing.forEach(this.add, this);
            }
            else {
                if (!this.unique || (this.unique && this.indexOf(thing) === -1)){
                    this.push(thing);
                }
            }
            return this;
        },

        remove: function(thing){
            var index;

            if (Pablo.isArray(thing)){
                thing.forEach(this.remove, this);
            }
            else {
                index = this.indexOf(thing);

                // Remove animation from array
                if (index >= 0){
                    this.splice(index, 1);
                }
            }   
            return this;
        }
    });


    /////


    function Animation(callback, settings){
        this.init(callback, settings);
    }

    Pablo.extend(Animation.prototype, {
        // The `active` parameter is changed by Loop.add and Loop.remove
        active: false,
        ended: false,
        autostart: true,
        lasttime: null,
        startTimeUnix: null,
        runningtime: 0,
        dur: -1,

        init: function(callback, settings){
            this.callback = callback;
            this.events = Pablo();

            if (settings){
                Pablo.extend(this, settings);
            }
            if (this.autostart){
                this.start();
            }
            return this;
        },

        // Prepare the animation for a new frame
        resetFrame: function(){
            this.lasttime = null;
            return this;
        },

        onAnimationFrame: function(deltaT, timestamp, frameStartTimeUnix){
            // First iteration of the animation since last added to the loop
            if (!this.lasttime){
                deltaT = frameStartTimeUnix - this.startTimeUnix;
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
                // Reset values after having stopped
                this.active = true;
                this.lasttime = null;
                this.startTimeUnix = nowUnix();

                // Reset values after having previously ended
                if (this.ended){
                    this.ended = false;
                    this.runningtime = 0;
                }

                // Loop can listen for the 'start' event and add the animation to the loop
                this.events.trigger('start');
            }
            return this;
        },

        stop: function(){
            if (this.active){
                this.active = false;
                // Loop can listen for the 'stop' event and remove the animation from the loop
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
        },   

        end: function(){
            if (!this.ended){
                this.ended = true;
                this.stop();
                this.events.trigger('end');
            }
            return this;
        }
    });


    /////


    function Loop(animations){
        // Cache an array of animation callbacks
        this.animations = new Things(true);

        // Create an empty collection to act as an events proxy
        this.events = Pablo();
        this.onAnimationFrame = this.onAnimationFrame.bind(this);

        if (animations){
            this.add(animations);
        }
    }

    Loop.nowUnix = nowUnix;

    Pablo.extend(Loop.prototype, {
        active: false,

        create: function(callback, settings){
            var loop = this,
                animation = new Animation(callback, settings);

            // Add/remove from loop at animation start and stop
            animation.events
                .on('start', function(){
                    loop.add(animation);
                })
                .on('stop', function(){
                    loop.remove(animation);
                });

            return animation;
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

            this.animations.add(animation);
            this.events.trigger('add', animation);

            return animation;
        },

        remove: function(animation){
            if (Pablo.isArray(animation)){
                animation.forEach(this.remove, this);
            }
            else {
                this.animations.remove(animation);
                animation.stop();
                this.events.trigger('remove', animation);

                if (!this.animations.length){
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
                    animation.resetFrame();
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

        remove: function(animation, indefinite){
            this.loop.remove(animation, indefinite);
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


    /////

    // var elements = new Things(true);

    return;

    /////


    function Tween(loop, collection, tweenSettings){
        this.init(loop, collection, tweenSettings);
    }

    Tween.prototype = Pablo.extend(new Animation(), {
        init: function(loop, collection, tweenSettings){
            this.collection = collection;
            this.tween = tweenSettings;

            Animation.prototype.init.call(this, this.onAnimationFrame, loop);
            return this;
        },

        onAnimationFrame: function(deltaT, timestamp){
            this.applyTween(deltaT);

            if ('callback' in this.tween){
                this.tween.callback(deltaT, timestamp);
            }
            return this;
        },

        applyTween: function(deltaT){
            if ('transform' in this.tween){
                this.applyTransform(deltaT);
            }
            else if ('attr' in this.tween) {
                this.applyAttr(deltaT);
            }
            return this;
        },

        applyAttr: function(deltaT){
            // TODO: apply isSingle
            this.collection.each(function(el){
                var node = Pablo(el),
                    currentAttr = Number(node.attr(this.tween.attr)) || 0,
                    newAttr;

                if (currentAttr === this.tween.to){
                    return;
                }

                // TODO: apply for each element in the collection
                if (!this.tween.original){
                    this.tween.original = currentAttr;
                }

                // TODO: determine isPositive
                newAttr = this.linear(deltaT, currentAttr, this.tween.to, this.tween.original);

                if (this.tween.to - newAttr < 1){
                    newAttr = this.tween.to;
                }
                node.attr(this.tween.attr, newAttr);

                // TODO: need to end each element in the collection, not the whole tween
                // or instead add tween callback to each element? extra work; not ideal
                if (newAttr === this.tween.to){
                    this.end();
                }
            }, this);
            return this;
        },

        applyTransform: function(deltaT){

        },

        linear: function(deltaT, from, to, original){
            return (to - original) / 1000 * deltaT + from;
        },

        easeout: function(deltaT, from, to){
            return (to - from) / 1000 * deltaT + from;
        }
    });

    // TODO: use data('tweens')on each element to store AnimationController (stop/start) of tweens 
    // TODO: store elements with active tweens; when empty, stop(); when new addition, start
    Pablo.fn.tween = (function(){
        var tweens = new Things(),
            master;

        function onAnimationFrame(deltaT, timestamp){
            if (!tweens.length){
                this.end();
            }
            else {
                tweens.forEach(function(tween){
                    tween.onAnimationFrame(deltaT, timestamp);
                });
            }
            return this;
        }

        return function(tweenSettings, indefinite){
            var tween = new Tween(Pablo.animation.loop, this, tweenSettings);

            if (!indefinite){
                tween.events.on('end', function(){
                    tweens.remove(tween);
                });
            }

            tweens.add(tween);

            if (!master){
                master = Pablo.animation(onAnimationFrame);
            }
            return master;
        };
    }());

    return;

    /////


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

            function updateTransform(elem, deltaT, tweenSettings){
                var currentTransformStr = elem.attr('transform'),
                    pattern, currentTransform;

                pattern = currentTransformStr && new RegExp('^.*' + tweenSettings.transform + '\\(' + '(.*)\\).*$');
                currentTransform = currentTransformStr && Number(currentTransformStr.replace(pattern, '$1')) || 0;

                elem.transform(tweenSettings.transform, currentTransform + tweenSettings.by.join(' '));
            }

            function updateCollection(collection, deltaT, tweenSettings){
                var length = collection.length;

                if ('transform' in tweenSettings){
                    if (length > 1){
                        collection.each(function(el){
                            updateTransform.call(this, Pablo(el), deltaT, tweenSettings);
                        }, this);
                    }
                    else if (length) {
                        updateTransform.call(this, collection, deltaT, tweenSettings);
                    }
                }

                else {
                    if (length > 1){
                        collection.each(function(el){
                            updateAttr.call(this, Pablo(el), deltaT, tweenSettings);
                        }, this);
                    }
                    else if (length) {
                        updateAttr.call(this, collection, deltaT, tweenSettings);
                    }
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

                    // Set `from` on resume when no `from` had been specified
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
