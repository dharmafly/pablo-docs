(function(window, Pablo){
    'use strict';

    var requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame,

        cancelAnimationFrame = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame || window.webkitCancelRequestAnimationFrame,

        now = window.Date.now || function(){
            return (new Date()).getTime();
        };

    function Animation(settings){
        Pablo.extend(this, settings);
    }

    Animation.prototype = {
        constructor: Animation
    };


    /////


    function createLoop(animationGroup){
        var starttimeUnix = now(),
            lasttime;

        return function loop(timestamp){
            var deltaT, id, animation, currentAttr, deltaAttr;

            // In case cancelAnimationFrame is unavailable, break the loop here
            if (!animationGroup.animating){
                return;
            }

            // First iteration of the loop - use time since loop created
            if (!lasttime){
                deltaT = now() - starttimeUnix;
            }
            // Successive iterations
            else {
                deltaT = timestamp - lasttime;
            }
            // Update lasttime for next loop
            lasttime = timestamp;

            // Process each animation
            for (id in animationGroup.animations){
                if (animationGroup.animations.hasOwnProperty(id)){
                    animation = animationGroup.animations[id];

                    if (typeof animation === 'function'){
                        animation.call(null, timestamp);
                    }

                    else {
                        // TODO: improve performance by caching element attribute values, with
                        // optional override as argument in createLoop() and animationGroup.start()
                        currentAttr = Number(animationGroup.elem.attr(animation.attr));
                        deltaAttr = (deltaT / animation.per) * animation.delta;
                        animationGroup.elem.attr(animation.attr, currentAttr + deltaAttr);
                    }
                }
            }
            animationGroup.handle = requestAnimationFrame(loop);
        }
    }

    function AnimationGroup(settings, elem){
        this.animations = {};
        this.elem = elem;
        Pablo.extend(this, settings);
    }

    AnimationGroup.prototype = {
        constructor: AnimationGroup,
        animating: false,
        starttime: null,
        handle: null,

        add: function(id, settings){
            this.animations[id] = new Animation(settings);
        },

        start: function(){
            var loop;

            this.animating = true;
            Pablo(this).trigger('start');

            if (requestAnimationFrame){
                loop = createLoop(this);
                this.handle = requestAnimationFrame(loop, this.elem[0]);
            }
            return this;
        },

        stop: function(){
            this.animating = false;
            Pablo(this).trigger('stop');

            if (cancelAnimationFrame && this.handle){
                cancelAnimationFrame(this.handle);
                this.handle = null;
            }
            return this;
        }
    };


    /////


    Pablo.fn.animation = function(settings){
        return new AnimationGroup(settings, this);
    };

}(window, window.Pablo));
