(function(window, Pablo){
    'use strict';

    // NOTE: Polyfill for requestAnimationFrame: https://gist.github.com/paulirish/1579671

    var dataIndex = '__animations__',

        requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame,

        cancelAnimationFrame = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame || window.webkitCancelRequestAnimationFrame,

        now = window.Date.now || function(){
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


    function Loop(animations){
        // Cache an array of animations. (The animations can be modified at any time 
        // by the calling scope).
        this.animations = animations;
        this.onAnimationFrame = this.onAnimationFrame.bind(this);
    }

    Pablo.extend(Loop.prototype, {
        active: false,
        events: Pablo({}),

        onAnimationFrame: function(timestamp){
            var loop = this,
                deltaT, currenttimeUnix;

            // In case cancelAnimationFrame is unavailable, break the loop here
            if (!this.active){
                return;
            }

            if (!this.lasttime){
                currenttimeUnix = now();
                deltaT = currenttimeUnix - this.starttimeUnix;
            }
            else {
                deltaT = timestamp - this.lasttime;
            }

            // Process each animation callback
            this.animations.forEach(function(callback){
                var deltaT;

                // First iteration of the animation - use time since added
                if (!callback.lasttime){
                    if (!currenttimeUnix){
                        currenttimeUnix = now();
                    }
                    deltaT = currenttimeUnix - callback.starttimeUnix;
                }
                else {
                    deltaT = timestamp - callback.lasttime;
                }
                callback.lasttime = timestamp;
                callback(deltaT, timestamp);
            });

            this.events.trigger('loop', deltaT, timestamp);

            // Update lasttime for next loop
            this.lasttime = timestamp;

            // Send the loop function to the next animation frame
            this.handle = requestAnimationFrame(this.onAnimationFrame);
        },

        start: function(){
            if (!this.active){
                this.active = true;
                this.starttimeUnix = now();
                this.events.trigger('start');
                this.handle = requestAnimationFrame(this.onAnimationFrame);
            }
            return this;
        },

        stop: function(){
            if (this.active){
                this.active = false;
                this.stoptimeUnix = now();
                cancelAnimationFrame(this.handle);
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
    Pablo.animation = function(animations){
        this.animation.add(animations);
        this.animation.loop.start();
        return this;
    };

    (function(){
        var animations = [];

        Pablo.extend(Pablo.animation, {
            animations: animations,
            events: Pablo({}),
            loop: new Loop(animations),

            start: function(){
                this.loop.start();
                return this;
            },

            stop: function(){
                this.loop.stop();
                return this;
            },

            add: function(callback){
                callback.starttimeUnix = now();
                callback.lasttime = null;
                this.animations.push(callback);
                this.loop.events.trigger('add', callback);
                return this;
            },

            remove: function(callback, persist){
                var animationApi;

                if (Pablo.isArray(callback)){
                    animationApi = this;
                    callback.forEach(function(callback){
                        animationApi.remove(callback);
                    });
                }

                else {
                    removeFromArray(this.animations, callback);
                }

                if (!persist && !this.animations.length){
                    this.stop();
                }
                this.loop.events.trigger('remove', callback);

                return this;
            },

            on: function(){
                this.loop.events.on.apply(this.loop.events, arguments);
                return this;
            },

            off: function(){
                this.loop.events.off.apply(this.loop.events, arguments);
                return this;
            }
        });
    }());


    /////

    function Animation(callback, autostart){
        this.callback = callback;
    }

    Pablo.extend(Animation.prototype, {
        active: false,

        start: function(){
            this.active = true;
            // Add to global loop
            Pablo.animation.add(this.callback);
            // Start global loop if not already started
            Pablo.animation.start();
            return this;
        },

        stop: function(){
            this.active = false;
            // Remove from global loop
            Pablo.animation.remove(this.callback);
            return this;
        },

        toggle: function(animations){
            if (this.active){
                this.stop();
            }
            else {
                this.start();
            }
            return this;
        }
    });


    // Collection API extension
    Pablo.extend(Pablo.fn, {
        active: false,

        animation: function(callback, autostart){
            var elem = this,
                animations = this.data(dataIndex),
                animation;

            // `autostart` is true by default; pass `false` to override
            autostart = autostart !== false;

            if (!animations){
                animations = [];
                animations.active = autostart;
                this.data(dataIndex, animations);
            }

            animation = new Animation(callback);
            animations.push(animation);

            if (autostart){
                animation.start();
            }
            return animation;
        },

        tween: (function(){
            function updateAttr(elem, deltaT, settings){
                var currentAttr = Number(elem.attr(settings.attr)),
                    deltaAttr = (deltaT / settings.per) * settings.delta,
                    newAttr = currentAttr + deltaAttr;
                
                elem.attr(settings.attr, newAttr);
            }

            return function(settings, autostart){
                var collection = this;

                return this.animation(function(deltaT){
                    collection.each(function(el){
                        // TODO: improve performance by caching element attribute values. Have an
                        // optional override as argument, which would be needed if the attributes
                        // were being modified from outside of this loop
                        var elem = Pablo(el);

                        if (Pablo.isArray(settings)){
                            settings.forEach(function(settings){
                                updateAttr(elem, deltaT, settings);
                            });
                        }
                        else {
                            updateAttr(elem, deltaT, settings);
                        }                            
                    });
                }, autostart);
            }
        }()),

        removeAnimation: function(animation){
            var animations = this.data(dataIndex);

            // Remove from global animation loop
            animation.stop();

            if (animations){
                removeFromArray(animations, animation);
            }

            if (animations.length){
                this.removeData(dataIndex);
            }
            return this;
        },

        // TODO: pass `id` instead of `animations` callback function?
        // TODO: need to create new loop or reset deltaT, so that pause/resume is possible - 
        // currently, stopAnimation -> startAnimation jumps to current position, with the clock not paused
        startAnimation: function(){
            var animations = this.data(dataIndex);

            if (animations){
                animations.active = true;
                animations.forEach(function(animation){
                    animation.start();
                });
            }
            return this;
        },

        stopAnimation: function(){
            var animations = this.data(dataIndex);

            if (animations){
                animations.active = false;
                animations.forEach(function(animation){
                    animation.stop();
                });
            }
            return this;
        },

        toggleAnimation: function(){
            var animations = this.data(dataIndex);

            if (animations){
                if (animations.active){
                    this.stopAnimation();
                }
                else {
                    this.startAnimation();
                }
            }
            return this;
        }
    });

}(window, window.Pablo));
