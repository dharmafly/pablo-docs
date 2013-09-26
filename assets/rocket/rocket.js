(function(window, Pablo){
    'use strict';

    // TODO:
    // Pablo.fn.cssTransform(type, arg1, ...)

    // Process a callback on each element in the collection, one per `delay` time
    Pablo.fn.eachTimeout = function(callback, delay, onend){
        var collection = this,
            i = 0,
            timeoutRef,
            controller;

        delay = (delay || 1000);
        controller = {
            start: function(){
                timeoutRef = window.setTimeout(function processCallback(){
                    callback(collection.eq(i), i);

                    if (i < collection.length){
                        timeoutRef = window.setTimeout(processCallback, delay);
                    }
                    else {
                        window.clearTimeout(timeoutRef);
                        if (onend){
                            onend(collection);
                        }
                    }
                    i ++;
                }, delay);
                return this;
            },
            stop: function(){
                window.clearTimeout(timeoutRef);
                return this;
            }
        };
        return controller.start();
    };

    Pablo.fn.eachInterval = function(callback, delay, onend){
        var collection = this,
            // Repeat eachTimeout until `contoller.stop()`is called
            controller = collection.eachTimeout(callback, delay, function loop(){
                controller = collection.eachTimeout(callback, delay, loop);
            });

        return {
            start: function(){
                controller.start();
                return this;
            },
            stop: function(){
                controller.stop();
                return this;
            }
        };
    };

    /*

    Pablo.fn.cssTransform = function(value, origin){
        return this.cssPrefix({
            transform: value,
            'transform-origin': origin
        });
    };

    Pablo.fn.cssTransition = function(property, duration, onend){
        return this.cssPrefix({
            'transition-property': Pablo.cssPrefix('transform'),
            'transition-duration': '0.25s',
            'transition-timing-function': 'cubic-bezier(0.47, 0, 0.745, 0.715)'
        });
    };

    Pablo.fn.cssTransitionTransform = function(duration, origin, onend){
        return this.cssTransition({
            'transform-origin': '30px 3px',
            'transition-property': Pablo.cssPrefix('transform'),
            'transition-duration': '0.25s',
            'transition-timing-function': 'cubic-bezier(0.47, 0, 0.745, 0.715)'
        });
    };

    Pablo.fn.svgTransition = function(){

    };
    */



    var width = window.innerWidth,
        height = window.innerHeight,
        svg = Pablo('.demo-rocket').svg().css('background', 'black'),
        defs = svg.defs().append([
            /*
            Pablo.radialGradient({
                id:'sun',
                //gradientTransform:'rotate(0.04 ' + width/2 + ' ' + height/2 + ')'
            }).append([
                Pablo.stop({offset:'30%', 'stop-color':'gold', 'stop-opacity': 0.9}),
                Pablo.stop({offset:'60%', 'stop-color':'orange', 'stop-opacity': 0.5}),
                Pablo.stop({offset:'80%', 'stop-color':'darkred', 'stop-opacity': 0.2}),
            ]),

            Pablo.linearGradient({
                id:'sky-day',
                gradientTransform:'rotate(90)'
            }).append([
                Pablo.stop({offset:'10%', 'stop-color':'darkblue', 'stop-opacity': 0.9}),
                //Pablo.stop({offset:'30%', 'stop-color':'darkblue', 'stop-opacity': 0.9}),
                Pablo.stop({offset:'60%', 'stop-color':'#3ac', 'stop-opacity': 0.7}),
            ])
            */
        ]),
        space = svg.g().addClass('space').css('opacity', 0),
        sky = space.g().addClass('sky'),
        /*
        skyDay = space.rect({
            width: '100%',
            height: '100%',
            fill: 'url(#sky-day)',
        }).addClass('sky'),
        sun = space.circle({
            r: 100,
            cx: width - 110,
            cy: 110,
            fill: 'url(#sun)',
        }).addClass('sun'),
        */
        rocketSymbol = defs.symbol({id:'rocket'}),
        fireSymbol = defs.symbol({id:'fire'}),
        rocket = space.g().addClass('rocket'),
        rocketBody, rocketLabels, rocketShapes, fireControl,
        rocketShapeControl1, rocketShapeControl2;


    /////

    var rocketControl = {
        start: function(){
            if (rocketShapeControl1){
                rocketShapeControl1.start();
            }
            if (rocketShapeControl2){
                rocketShapeControl2.start();
            }
            if (fireControl){
                fireControl.start();
            }
            return this;
        },
        stop: function(){
            if (rocketShapeControl1){
                rocketShapeControl1.stop();
            }
            if (rocketShapeControl2){
                rocketShapeControl2.stop();
            }
            if (fireControl){
                fireControl.stop();
            }
            return this;
        }
    };

    window.setTimeout(function(){
        space.cssPrefix('transition', 'opacity 2s');
    }, 4);

    Pablo.load('fire-e.svg', function(){
        this.appendTo(fireSymbol);
    });

    Pablo.load('rocket-japanese-e.svg', function(){
        var text, paths;

        rocketBody = this.addClass('rocketbody')
            // Make room for rocket fire
            //.attr('height', 800);

        text = rocketBody.find('tspan').css({fill:'green'});
        paths = rocketBody.find('text ~ path').css({stroke:'green'});

        rocketLabels = Pablo([text, paths]).css({opacity:0});

        rocketShapes = rocketBody.find('path, rect').select(function(el){
                return !rocketLabels.some(el);
            }).css({opacity:1});
    });


    function rocketInit(){
        rocketBody.appendTo(rocket);
    }

    function rocketEffects(){
        rocketShapes.cssPrefix('transition', 'opacity 5s');

        rocketShapeControl1 = rocketShapes.eachInterval(function(current, i){
            current.css('opacity', 1);
        }, 75);

        window.setTimeout(function(){
            rocketShapeControl2 = rocketShapes.eachInterval(function(current, i){
                var fill = current.css('fill');
                current.css({stroke:'green', fill:'lightgreen'});
                if (i > 0){
                    rocketShapes.eq(i-1).css({stroke:'black', fill:fill});
                }
            }, 100);
        }, 500);


        // Labels
        rocketLabels.cssPrefix('transition', 'opacity 1s');

        rocketLabels.eachTimeout(function(current, i){
            current.css('opacity', 1);
        }, 50);

        window.setTimeout(function(){
            rocketLabels.eachTimeout(
                function(current, i){
                    current.css('opacity', 0);
                },
                75,
                // On end, detach elements
                function(){
                    window.setTimeout(function(){
                        rocketLabels.detach();
                        rocketLabels = null;
                    }, 5000);
                }
            );
        }, 7000);
    }

    function rocketPrepareForLaunch(){
        rocket.cssPrefix('transform', 'translate(0, ' +
            (height - rocket[0].getBBox().height - 20) + 'px)');

        space.css('opacity', 1);
    }

    fireControl = {
        timeoutRef: null,

        create: function(){
            var fire = Pablo.use({
                'xlink:href': '#fire',
                width: 61.592,
                height: 72.552
            });

            fire.cssPrefix({
                'transform-origin': '30px 3px',
                'transition-property': Pablo.cssPrefix('transform'),
                'transition-duration': '0.25s',
                'transition-timing-function': 'cubic-bezier(0.47, 0, 0.745, 0.715)'
            });

            return fire;
        },

        elements: [],

        transitionFire: function(){
            var fire;

            if (fireControl.elements.length){
                fire = this.elements.shift();
            }
            else {
                fire = fireControl.create();
            }

            fire.cssPrefix({transform: 'translate(188px, 620px) scale(0.25)'})
                .appendTo(rocket);

            window.setTimeout(function(){
                fire.cssPrefix({
                    // ' + (Math.random() * 0.9 + 0.1) + '
                    transform: 'translate(188px, 622px) scale(1)'
                });
            }, 4);
            
            window.setTimeout(function(){
                fireControl.elements.push(fire);
            }, 300);
        },

        start: function(){
            function loop(){
                fireControl.transitionFire();
                fireControl.timeoutRef = window.setTimeout(loop, 220);
            }
            loop();
        },

        stop: function(){
            window.clearTimeout(this.timeoutRef);
        }
    };

    function buttonInit(){
        var b = space.image({
            'xlink:href': 'button-launch.png',
            width: 112,
            height: 122,
            x: width - 112,
            y: height - 122
        })
        .addClass('button')
        .css('cursor', 'pointer')
        .one('click', function(){
            rocketLaunch();
        });
    }

    function rocketLaunch(){
        fireControl.start();

        rocket.cssPrefix({
            transform: 'translate(0, -800px)',
            'transition-property': Pablo.cssPrefix('transform'),
            'transition-duration': '5s',
            'transition-timing-function': 'cubic-bezier(0.47, 0, 0.745, 0.715)'
        });

        window.setTimeout(function(){
            var button = space.find('.button');

            // Fade out space
            space.css('opacity', 0);

            // After fade out
            window.setTimeout(function(){
                button.detach();
                //rocket.detach();
                spaceSceneInit();
            }, 1000);

            //fireControl.stop();
        }, 5000);
    }

    function createStars(total, width, height){
        var stars = Pablo.g().addClass('stars'),
            i;

        stars.circle({r:1})
            .duplicate(100)
            .attr({
                cx: function(){
                    return Math.round(Math.random() * width);
                },
                cy: function(){
                    return Math.round(Math.random() * height);
                },
                fill: function(){
                    return 'hsl(' + Math.round((Math.random() * 80 + 140)) + ',100%,' + Math.round((Math.random() * 80 + 20)) + '%)';
                }
            })

        return stars;
    }

    function spaceSceneInit(){
        var backgroundStars = createStars(500, width, height),
            starfield = Pablo.g().addClass('starfield'),
            foreground = Pablo.g().addClass('foreground'),
            foreground2 = Pablo.g().addClass('foreground'),
            moon, saturn;

        rocketControl.stop();

        sky.append([
            backgroundStars,
            starfield,
            foreground,
            foreground2
        ]);

        createStars(100, width, height + 200).appendTo(starfield);

        starfield.cssPrefix({
            transform: 'translate(0, -200px)',
            'transition-property': Pablo.cssPrefix('transform'),
            'transition-duration': '16s'
        });

        window.setTimeout(function(){
            starfield.cssPrefix({transform: 'translate(0, 0px)'});
        }, 4);


        // Create moon
        moon = foreground.image({
            'xlink:href': 'moon-200.png',
            width: 200,
            height: 200,
            x: width - 250,
            y: 20
        }).addClass('moon');

        // Create moon
        saturn = foreground.image({
            'xlink:href': 'saturn-100.png',
            width: 100,
            height: 109,
            x: width - 280,
            y: 600
        }).addClass('saturn');

        foreground.image({
            'xlink:href': 'jupiter.svg',
            width: 60,
            height: 60,
            x: width - 90,
            y: 310
        }).addClass('jupiter').transform('rotate', -20, width - 90 + 30, 340);

        foreground.image({
            'xlink:href': 'star.svg',
            width: 30,
            height: 30,
            x: width - 80,
            y: 500
        }).addClass('star');

        foreground.cssPrefix({
            transform: 'translate(280px, -220px)'
        });

        window.setTimeout(function(){
            foreground.cssPrefix({
                transform: 'translate(0, 0)',
                'transition-property': Pablo.cssPrefix('transform'),
                'transition-duration': '15s',
                'transition-timing-function': 'cubic-bezier(0.445, 0.05, 0.55, 0.95)'
            });
        }, 2000);


        /////

        foreground2.image({
            'xlink:href': 'star.svg',
            width: 20,
            height: 20,
            x: 80,
            y: 0
        }).transform('rotate', 45, 90, 10);

        foreground2.image({
            'xlink:href': 'star.svg',
            width: 20,
            height: 20,
            x: 0,
            y: 100
        }).transform('rotate', 22, 10, 110);

        foreground2.image({
            'xlink:href': 'star.svg',
            width: 20,
            height: 20,
            x: 160,
            y: 120
        }).transform('rotate', 80, 170, 130);

        foreground2.image({
            'xlink:href': 'pie.svg',
            width: 60,
            height: 60,
            x: -80,
            y: -100
        }).addClass('pie');

        foreground2.cssPrefix({
            transform: 'translate(-160px, ' + height + 'px)'
        });

        window.setTimeout(function(){
            foreground2.cssPrefix({
                transform: 'translate(120px, ' + (height - 200) + 'px)',
                'transition-property': Pablo.cssPrefix('transform'),
                'transition-duration': '20s',
                'transition-timing-function': 'cubic-bezier(0.445, 0.05, 0.55, 0.95)'
            });
        }, 2000);


        // Reset rocket
        rocket.cssPrefix({
            transform: 'translate(-60px, ' + (height - 70)  + 'px) scale(0.4) rotate(40deg)',
            transition: 'none'
        });

        // Start rocket path
        window.setTimeout(function(){
            rocket.cssPrefix({
                transform: 'translate(' + (width - 360) + 'px, 10px) scale(0.4) rotate(70deg)',
                'transition-property': '-webkit-transform', //TODO: Pablo.cssPrefix('transform')
                'transition-duration': '18s',
                'transition-timing-function': 'cubic-bezier(0.445, 0.05, 0.55, 0.95)'
            });

            window.setTimeout(function(){
                createCallouts();
            }, 18000);

            rocketControl.start();
        }, 14000);

        // Fade in space
        space.cssPrefix('transition', 'opacity 3s').css('opacity', 1);
    }

    function createCallouts(){
        var callouts = space.g().addClass('callouts'),
            allCallouts;

        callouts.rect({
            width: 200,
            height: 200,
            opacity: 0
        }).addClass('import-hotspot');

        callouts.image({
            'xlink:href': 'callout-circle.svg',
            width: 582.77,
            height: 234.94,
            x: width - 90 - 585,
            y: 278
        }).addClass('callout-circle');

        callouts.image({
            'xlink:href': 'callout-template.svg',
            width: 955.57,
            height: 183.81,
            x: width - 900,
            y: 392
        }).addClass('callout-template');

        callouts.image({
            'xlink:href': 'callout-images.svg',
            width: 393.74,
            height: 126.03,
            x: width - 666,
            y: 590
        }).addClass('callout-images');

        callouts.image({
            'xlink:href': 'callout-plugins.svg',
            width: 487.18,
            height: 126.18,
            x: 110,
            y: height - 331
        }).addClass('callout-plugins');

        callouts.image({
            'xlink:href': 'callout-import.svg',
            width: 473.25,
            height: 126.16,
            x: 10,
            y: 30
        }).addClass('callout-import');

        callouts.image({
            'xlink:href': 'callout-animation.svg',
            width: 707.27,
            height: 234.22,
            x: width - 360 - 940,
            y: 95
        }).addClass('callout-animation');

        allCallouts = callouts.find('image').css({
            opacity: 0,
            'pointer-events': 'none'
        });

        window.setTimeout(function(){
            allCallouts.cssPrefix('transition', 'opacity 1s');
        }, 4);

        Pablo('.jupiter')
            .on('mouseover', function(){
                Pablo('.callout-circle').css('opacity', 1);
            })
            .on('mouseout', function(){
                Pablo('.callout-circle').css('opacity', 0);
            });

        Pablo('.star')
            .on('mouseover', function(){
                Pablo('.callout-template').css('opacity', 1);
            })
            .on('mouseout', function(){
                Pablo('.callout-template').css('opacity', 0);
            });

        Pablo('.saturn')
            .on('mouseover', function(){
                Pablo('.callout-images').css('opacity', 1);
            })
            .on('mouseout', function(){
                Pablo('.callout-images').css('opacity', 0);
            });

        Pablo('.pie')
            .on('mouseover', function(){
                Pablo('.callout-plugins').css('opacity', 1);
            })
            .on('mouseout', function(){
                Pablo('.callout-plugins').css('opacity', 0);
            });

        Pablo('.import-hotspot')
            .on('mouseover', function(){
                Pablo('.callout-import').css('opacity', 1);
            })
            .on('mouseout', function(){
                Pablo('.callout-import').css('opacity', 0);
            });

        Pablo('.rocket')
            .on('mouseover', function(){
                Pablo('.callout-animation').css('opacity', 1);
            })
            .on('mouseout', function(){
                Pablo('.callout-animation').css('opacity', 0);
            });
    }

    function start(){
        Pablo('h1').cssPrefix('transition', 'opacity 0.8s ease-in').css('opacity', 0);

        window.setTimeout(function(){
            rocketInit();
            rocketPrepareForLaunch();
            rocketEffects();
            buttonInit();

            //spaceSceneInit();
        }, 1200);
    }


    /////


    Pablo('body').one('click', function(){
        start();
    });

}(window, window.Pablo));