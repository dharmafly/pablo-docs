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


    // An extended array for managing related objects
    function Things(unique){
        // If `unique` is true, then the object cannot appear more than once
        this.unique = unique === true;
    }

    Things.prototype = Pablo.extend([], {
        constructor: Things,

        add: function(thing){
            // Flatten array of things
            if (Pablo.isArray(thing)){
                thing.forEach(this.add, this);
            }
            else {
                // TODO: a more performant way to check if `thing` is already present is
                // to add an index to each object and check on a lookup object of indexes
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
        this.animations = new Things();

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

            loop.add(animation);
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

            if (animation.active && !this.active){
                this.start();
            }

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
        return animation;
    };
    
    Pablo.extend(Pablo.animation, {
        Loop: Loop,
        Animation: Animation,
        nowUnix: nowUnix,
        loop: new Loop(),

        create: function(animation, settings){
            this.loop.create(animation, settings);
            return this;
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



    ///////////////////////////////////////////


    (function(){
        var tweens, animation;


        /////


        function Tween(settings){
            Pablo.extend(this, settings);
            this.events = Pablo();
            this.elements = new Things();
        }

        Pablo.extend(Tween.prototype, {
            from: 0,
            to: 0,
            dur: -1, // infinite
            repeats: 1,
            remaining: 1,
            per: 1000,
            ended: false,
            active: false,
            attr: null,
            transform: null,

            addElement: function(elem){
                var el = Pablo.isElement(elem) ? elem : elem[0],
                    value, element;

                if (this.elements.every(function(element){
                    return element.elem[0] !== el;
                })){
                    elem = Pablo.isPablo(elem) ? elem : Pablo(elem);
                    value = this.getDomValue(elem),
                    element = {
                        elem: elem,
                        value: value,
                        original: value
                    };
                    this.elements.add(element);
                }
                return this;
            },

            removeElement: function(elem){
                var el = Pablo.isElement(elem) ? elem : elem[0];

                this.some(function(element, index){
                    if (element.elem[0] === el){
                        this.elements.splice(index, 1);
                        return true;
                    }
                }, this);

                return this;
            },

            start: function(){
                if (!this.active){
                    this.active = true;

                    if (this.ended){
                        this.ended = false;
                    }
                    this.events.trigger('start');
                }
                return this;
            },

            stop: function(){
                if (this.active){
                    this.active = false;
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

                    if (this.remaining > 0){
                        this.remaining --;
                    }
                    this.events.trigger('end');
                }
                return this;
            },

            getDomValue: function(elem){
                if (!this.attr){
                    return 0;
                }
                return Number(elem.attr(this.attr)) || 0;
            },

            onAnimationFrame: function(deltaT, timestamp){
                var method;

                if (this.transform){
                    method = this.applyTransform;
                }
                else if (this.attr) {
                    method = this.applyAttr;
                }

                if (method && this.elements.length){
                    this.elements.forEach(function(element){
                        method.call(this, deltaT, element);
                    }, this);
                }
                return this;
            },

            getNewValue: function(deltaT, element){
                var newValue;

                if (element.value === this.to){
                    return element.value;
                }
                
                // TODO: determine isPositive
                newValue = this.linear(deltaT, element.value, this.to, element.original);

                // If only a pixel remaining, then end
                if (Math.abs(this.to - newValue) < 1){
                    newValue = this.to;
                }

                return newValue;
            },

            applyAttr: function(deltaT, element){
                var elem = element.elem,
                    newValue = this.getNewValue(deltaT, element);

                if (newValue !== element.value){
                    element.value = newValue;
                    elem.attr(this.attr, newValue);
                }

                if (newValue === this.to){
                    this.end();
                }
                return newValue;
            },

            applyTransform: function(deltaT, elem){

            },

            linear: function(deltaT, from, to, original){
                return (to - original) / 1000 * deltaT + from;
            },

            easeout: function(deltaT, from, to){
                return (to - from) / 1000 * deltaT + from;
            }
        });


        /////


        function TweenSet(tweens){
            this.events = Pablo();
            this.elements = new Things(true);

            if (tweens){
                this.add(tweens);
            }
        }

        TweenSet.prototype = Pablo.extend(new Things(true), {
            constructor: TweenSet,
            active: false,
            ended: false,

            add: function(tween){
                var tweenset = this;

                // Add to tweenset
                Things.prototype.add.call(this, tween);

                function onStart(){
                    if (!tweenset.active){
                        tweenset.start();
                    }
                }

                function onStop(){
                    if (tweenset.every(function(tween){
                        return !tween.active;
                    })){
                        tweenset.stop();
                    }
                }

                function onEnd(){
                    if (tween.remaining > 0 || tween.remaining === -1){
                        tweenset.remove(tween);

                        // Remove listeners
                        tween.events
                            .off('start', onStart)
                            .off('stop', onStop)
                            .off('end', onEnd);
                    }

                    if (!tweenset.length){
                        tweenset.end();
                    }
                }

                // Add listeners
                tween.events
                    .on('start', onStart)
                    .on('stop', onStop)
                    .on('end', onEnd);

                if (tween.active){
                    onStart();
                }

                return this;
            },

            remove: function(tween){
                Things.prototype.remove.call(this, tween);

                if (!this.length){
                    this.stop();
                }
                return this;
            },

            addElement: function(elem){
                if (this.length){
                    this.forEach(function(tween){
                        tween.addElement(elem);
                    });
                }
                return this;
            },

            removeElement: function(elem){
                if (this.length){
                    this.forEach(function(tween){
                        tween.removeElement(elem);
                    });
                }
                return this;
            },

            start: function(){
                if (!this.active){
                    this.active = true;

                    if (this.ended){
                        this.ended = false;
                    }

                    if (this.length){
                        this.forEach(function(tween){
                            tween.start();
                        });
                    }
                    this.events.trigger('start');
                }
                return this;
            },

            stop: function(){
                if (this.active){
                    this.active = false;

                    if (this.length){
                        this.forEach(function(tween){
                            tween.stop();
                        });
                    }
                    this.events.trigger('stop');
                }
                return this;
            },

            toggle: function(){
                if (this.length){
                    this.forEach(function(tween){
                        tween.toggle();
                    });
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
            },

            onAnimationFrame: function(deltaT, timestamp){
                return this.forEach(function(tween){
                    tween.onAnimationFrame(deltaT, timestamp);
                });
            }
        });


        /////

        tweens = new TweenSet();

        Pablo.tween = (function(){
            return function(settings){
                var tween;

                if (Pablo.isArray(settings)){
                    tween = new TweenSet();
                    settings.forEach(function(settings){
                        tween.add(new Tween(settings));
                    });
                }
                else {
                    tween = new Tween(settings);
                }

                tween.events
                    .on('start', function(){
                        tweens.add(tween);
                    })
                    .on('stop', function(){
                        tweens.remove(tween);
                    });

                return tween.start();
            };
        }());

        Pablo.extend(Pablo.tween, {
            tweens: tweens,
            Tween: Tween,
            TweenSet: TweenSet
        });

        animation = Pablo.animation(function(deltaT, timestamp){
            tweens.onAnimationFrame(deltaT, timestamp);
        }, {id:'tweenloop', autostart:false});

        tweens.events
            .on('start', function(){
                if (!animation.active){
                    animation.start();
                }
            })
            .on('stop', function(){
                if (animation.active){
                    animation.stop();
                }
            });


        /////


        Pablo.fn.tween = function(tween){
            if (!(tween instanceof Tween || tween instanceof TweenSet)){
                tween = Pablo.tween(tween);
            }

            // Add to `tweens`
            // Check if the tween's `elements` set is empty, a performant way to check if the
            // tween is already in `tweens`
            if (!tween.elements.length){
                tweens.add(tween);
            }

            // Add element to tween's set of elements
            // If this is a single-element Pablo collection
            if (this.length === 1){
                tween.addElement(this);
            }

            // If there are multiple elements in the collection
            else {
                this.each(function(el){
                    tween.addElement(el);
                });
            }
            return tween.start();
        };


        /////
        

        Pablo.fn.removeTween = function(tween){
            // Remove element from tween's set of elements
            // If this is a single-element Pablo collection
            if (this.length === 1){
                tween.removeElement(this);
            }

            // If there are multiple elements in the collection
            else {
                this.each(function(el){
                    tween.removeElement(el);
                });
            }

            // If tween has no more elements to serve, then remove from `tweens`
            if (!tween.elements.length){
                tweens.remove(tween);
            }

            return this;
        };
    }());


    return;



    ///////////////////////////////////////////


    /////

    Pablo.fn.removeTween = function(tween){
        var tweens = this.data(tweenNamespace);
        if (tweens){
            tweens.remove(tween);
        }
    };

    (function(){
        var tweenNamespace = '__tweens__',
            elements = new Things(true),
            animation;

        animation = Pablo.animation(function(deltaT, timestamp){
            elements.forEach(function(elem){
                var tweens = elem.data(tweenNamespace);
                
                // Double-check an element hasn't mistakenly avoided being
                // removed from `elements`
                if (tweens){
                    tweens.onAnimationFrame(deltaT, timestamp, elem);
                }
                else {
                    elements.remove(elem);
                }
            });

            if (!elements.length){
                this.stop();
            }
        });


        /////


        function Tween(settings){
            Pablo.extend(this, settings);
            this.events = Pablo();
        }

        Pablo.extend(Tween.prototype, {
            from: 0,
            to: 0,
            dur: -1, // infinite
            repeats: 1,
            remaining: 1,
            per: 1000,
            ended: false,
            active: true,

            pause: function(){
                this.active = false;
                return this;
            },

            resume: function(){
                this.active = true;
                return this;
            },

            start: function(){
                if (this.ended){
                    this.ended = false;
                }
                this.events.trigger('start');
                return this;
            },

            stop: function(){
                this.events.trigger('stop');
                return this;
            },

            end: function(){
                if (!this.ended){
                    this.ended = true;

                    if (this.remaining > 0){
                        this.remaining --;
                    }
                    this.events.trigger('end');
                }
                return this;
            },

            onAnimationFrame: function(deltaT, timestamp, elem){
                // Change `elem` according to `deltaT`

                return this;
            }
        });


        /////


        function TweenSet(tweens){
            this.events = Pablo();
            this.add(tweens);
        }

        TweenSet.prototype = Pablo.extend(new Things(), {
            constructor: TweenSet,
            active: true,
            //ended: false,

            add: function(tween){
                Things.prototype.add.call(this, tween);

                tween.on('start', function(){
                    if (!this.active){
                        this.start();
                    }
                }, this);

                tween.on('stop', function(){
                    this.remove(tween);
                }, this);

                return this;
            },

            remove: function(){
                Things.prototype.remove.call(this, tween);

                if (!this.length){
                    this.stop();
                }
                return this;
            },

            start: function(){
                if (!this.active){
                    this.active = true;

                    if (this.length){
                        this.forEach(function(tween){
                            tween.start();
                        });
                    }
                    this.events.trigger('start');
                }
                return this;
            },

            stop: function(){
                if (this.active){
                    this.active = false;

                    if (this.length){
                        this.forEach(function(tween){
                            tween.stop();
                        });
                    }
                    this.events.trigger('stop');
                }
                return this;
            }, /*

            end: function(){
                if (!this.ended && !this.length){
                    this.ended = true;
                    this.events.trigger('end');
                }
                return this;
            },
            */

            onAnimationFrame: function(deltaT, timestamp, elem){
                return this.forEach(function(tween){
                    tween.onAnimationFrame(deltaT, timestamp, elem);
                });
            }
        });


        /////


        // TODO: improve on having to search through each element to remove tween
        Pablo.fn.removeTween = function(tween){
            elements.forEach(function(elem){
                var tweens = elem.data(tweenNamespace);
                if (tweens){
                    tweens.remove(tween);
                }
            });
            return this;
        };

        Pablo.fn.tween = function(settings){
            var tween;

            if (settings instanceof Tween || settings instanceof TweenSet){
                tween = settings;
            }
            else if (Pablo.isArray(settings)){
                tween = new TweenSet(settings);
            }
            else {
                tween = new Tween(settings);
            }

            this.each(function(el){
                var elem = Pablo(el),
                    tweens;

                tween.events
                    .on('start', function(){
                        tweens = elem.data(tweenNamespace);

                        if (!tweens){
                            tweens = new TweenSet(settings);
                            elem.data(tweenNamespace, tweens);
                            animation.start();
                        }
                        tweens.add(tween);
                        elements.add(elem);
                    })
                    .on('stop', function(){
                        tweens.remove(tween);

                        if (!tweens.length){
                            elem.removeData(tweenNamespace);
                            elements.remove(elem);
                        }
                    })
                    .on('end', function(){
                        if (!tween.remaining){
                            tweens.remove(tween);

                            if (!tweens.length){
                                elem.removeData(tweenNamespace);
                                elements.remove(elem);
                            }
                        }
                    });
            });

            
            tween.start();

            return tween;
        };
    });


    return;



    ///////////////////////////////////////////




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
