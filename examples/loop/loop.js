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


    function Animation(callback, loop){
        this.callback = callback;
        this.loop = loop;
        this.events = Pablo();
    }

    Pablo.extend(Animation.prototype, {
        // The `active` parameter is changed by Loop.add and Loop.remove
        active: false,
        complete: false,
        starttimeUnix: null,
        lasttime: null,
        runningtime: 0,
        dur: -1,

        reset: function(){
            this.complete = false;
            this.runningtime = 0;
            return this;
        },

        start: function(){
            if (!this.active){
                if (this.complete){
                    this.reset();
                }

                // Add to loop and start if not already started
                this.loop.add(this);
                this.loop.start();
            }
            return this;
        },

        stop: function(){
            if (this.active){
                // Remove from loop
                this.loop.remove(this);
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

    Pablo.extend(Loop.prototype, {
        active: false,

        createAnimation: function(animation){
            if (animation instanceof Animation){
                return animation;
            }
            else if (typeof animation === 'function'){
                return new Animation(animation, this);
            }
        },

        add: function(animation){
            if (Pablo.isArray(animation)){
                return animation.map(function(animation){
                    return this.add(animation);
                }, this);
            }

            animation = this.createAnimation(animation);
            animation.active = true;
            animation.lasttime = null;
            animation.starttimeUnix = now();
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
                animation.active = false;
                removeFromArray(this.animations, animation);
                if (!persist && !this.animations.length){
                    this.stop();
                }
                this.events.trigger('remove', animation);
            }
            return this;
        },

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
            this.animations.forEach(function(animation){
                var deltaT;

                // First iteration of the animation - use time since added
                if (!animation.lasttime){
                    if (!currenttimeUnix){
                        currenttimeUnix = now();
                    }
                    deltaT = currenttimeUnix - animation.starttimeUnix;
                }
                else {
                    deltaT = timestamp - animation.lasttime;
                }
                animation.lasttime = timestamp;
                animation.runningtime = deltaT + animation.runningtime;
                animation.callback(deltaT, timestamp);

                // If duration reached, then end
                if (animation.dur > -1){
                    animation.runningtime = deltaT + animation.runningtime;
                    if (animation.runningtime > animation.dur){
                        animation.end();
                    }
                }
            });

            this.events.trigger('loop', deltaT, timestamp);

            // Update lasttime for next loop
            this.lasttime = timestamp;

            // Send the loop function to the next animation frame
            this.handle = requestAnimationFrame(this.onAnimationFrame);
        },

        start: function(){
            var starttimeUnix;

            if (!this.active){
                this.active = true;
                this.starttimeUnix = starttimeUnix = now();
                this.lasttime = null;
                this.animations.forEach(function(animation){
                    animation.starttimeUnix = starttimeUnix;
                    animation.lasttime = null;
                });
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
    Pablo.animation = function(animation){
        animation = Pablo.animation.add(animation);
        Pablo.animation.start();
        return animation;
    };

    
    Pablo.extend(Pablo.animation, {
        Loop: Loop,
        Animation: Animation,
        now: now,
        loop: new Loop(),

        add: function(animation){
            return this.loop.add(animation);
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
            function updateAttr(elem, deltaT, settings){
                var currentAttr = Number(elem.attr(settings.attr)),
                    deltaAttr = (deltaT / settings.per) * settings.by,
                    newAttr = currentAttr + deltaAttr;

                elem.attr(settings.attr, newAttr);
            }

            function updateCollection(collection, deltaT, settings){
                var length = collection.length;

                if (length > 1){
                    collection.each(function(el){
                        updateAttr.call(this, Pablo(el), deltaT, settings);
                    }, this);
                }
                else if (length) {
                    updateAttr.call(this, collection, deltaT, settings);
                }
            }

            function applySettings(collection, deltaT, settings){
                if (Pablo.isArray(settings)){
                    settings.forEach(function(settings){
                        updateCollection.call(this, collection, deltaT, settings);
                    }, this);
                }
                else {
                    updateCollection.call(this, collection, deltaT, settings);
                }
            }

            return function(settings){
                var collection = this,
                    animation = Pablo.animation(function(deltaT){
                        applySettings.call(this, collection, deltaT, settings);
                    });

                if ('dur' in settings){
                    animation.dur = settings.dur;
                }
                return animation;
            };
        }()),
    });

}(window, window.Pablo));
