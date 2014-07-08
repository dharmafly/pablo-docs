var launchDemo = (function(window, Pablo){
    'use strict';

    var doc = Pablo(document),
        stage = Pablo('#demo-launch'),
        path = stage.attr('data-assets') || '',
        ctrl, active,
        DEBUG = false;

    function demo(){
        var svg = stage.svg({width:'100%', height:'100%'}).css('background', 'black'),//.viewbox([0,0,900,800]),
            defs = svg.defs(),
            rocketSymbol = defs.symbol({id:'rocket'}),
            fireSymbol = defs.symbol({id:'fire'}),
            space = svg.g().addClass('space')
                           .css({
                                width: '100%',
                                height: '100%',
                                opacity: 0
                            })
                           // encourage GPU: http://stackoverflow.com/a/10814821/165716
                           .transformCss({rotateZ:'360deg', translateZ:0}),
            sky = space.g().addClass('sky'),
            rocket = space.g().addClass('rocket'),
            width, height,
            rocketBody, rocketLabels, rocketShapes, fireControl,
            rocketShapeControl, rocketLabelControl1, rocketLabelControl2;

        // window.addEventListener('resize', function(){
        //     width = window.innerWidth;
        //     height = window.innerHeight;
        //     svg.attr({width:width, height:height});
        // }, false);

        /////

        Pablo.load(path + 'fire-e.svg', function(){
            this.appendTo(fireSymbol);
        });

        Pablo.load(path + 'rocket-japanese-e.svg', function(){
            var text, paths;

            rocketBody = this.addClass('rocketbody');

            text = rocketBody.find('tspan').css({fill:'green'});
            paths = rocketBody.find('text ~ path').css({stroke:'green'});

            rocketLabels = Pablo([text, paths]).css({opacity:0});

            rocketShapes = rocketBody.find('path, rect').select(function(el){
                return !rocketLabels.some(el);
            }).css({opacity:1});
        });

        function createCtrl(){
            ctrl = {
                controls: function(){
                    return [rocketShapeControl, rocketLabelControl1, rocketLabelControl2, fireControl].filter(function(singleCtrl){
                        return singleCtrl;
                    });
                }
            };

            ['start', 'stop', 'destroy'].forEach(function(method){
                ctrl[method] = function(){
                    this.controls().forEach(function(singleCtrl){
                        singleCtrl[method]();
                    });
                };
            });
        }

        function rocketInit(){
            rocketBody.transition({
                name: 'opacity',
                from: 0,
                to: 1,
                dur: 800
            }).appendTo(rocket);
        }       


        function rocketEffects(){
            rocketShapes.transition('opacity', 5000);

            window.setTimeout(function(){
                rocketShapeControl = rocketShapes.stagger(function(current, prev){
                    current = Pablo(current);
                    var fill = current.css('fill');

                    current.css({
                        stroke: 'green',
                        fill: 'lightgreen'
                    });

                    Pablo(prev).css({
                        stroke: 'black',
                        fill: fill
                    });
                }, {t:100, repeat:-1});
            }, 500);


            // Labels
            rocketLabels.transition('opacity', 1000);

            rocketLabelControl1 = rocketLabels.stagger(function(current){
                Pablo(current).css('opacity', 1);
            }, {t:400, repeat:-1});

            rocketLabelControl2 = rocketLabels.stagger(function(current){
                Pablo(current).css('opacity', 0);
            }, {t:500, repeat:-1});
        }

        function rocketPrepareForLaunch(){
            var bbox = rocketBody.bbox(),
                x = 0,
                y = height - bbox.height - 16;

            rocket.transformCss('translate', [x + 'px', y + 'px']);

            space.css('opacity', 1);
        }

        fireControl = (function(){
            var elements = Pablo
                .use({
                    'xlink:href': '#fire',
                    width: 61.592,
                    height: 72.552
                })
                .addClass('fire')
                .css({
                    'transform-origin': '30px 3px',
                    opacity: 0
                })
                .transformCss([
                    {translate: ['188px', '620px']}
                    // {scale: 0.25}
                ])
                .duplicate(2)
                .appendTo(rocket),

            transitionSettings = {
                name: 'transform',
                dur: 250,
                timing: 'cubic-bezier(0.47, 0, 0.745, 0.715)',
                from: {scale: 0.25},
                to: {scale: 1},
                end: function(event){
                    if (event && event.target){
                        Pablo(event.target).css('opacity', 0);
                    }
                }
            };

            return elements.stagger(function(el, i){
                var fire = Pablo(el);

                fire.transition(transitionSettings)
                    .css('opacity', 1);
            }, {t:200, repeat:-1, autostart:false});
        }());


        function buttonInit(){
            var b = space.image({
                'xlink:href': path + 'button-launch.png',
                width: 112,
                height: 122,
                x: '100%',
                y: '100%',
                cursor: 'pointer'
            })
            .transform('translate', [-112, -122])
            .transition({
                name: 'opacity',
                from: 0,
                to: 1,
                dur: 800
            })
            .addClass('button')
            .one('click', function(event){
                b.attr('cursor', null);
                rocketLaunch();
                event.stopPropagation();
            });
        }

        function rocketLaunch(){
            fireControl.start();

            rocketLabels.transition('opacity', {
                to: 0,
                dur: 900
            });

            window.setTimeout(function(){
                rocketLabels.detach();
                if (rocketLabelControl1 && rocketLabelControl2){
                    rocketLabelControl1.destroy();
                    rocketLabelControl2.destroy();
                }
                rocketLabels = rocketLabelControl1 = rocketLabelControl2 = null;
            }, 800);

            // Move rocket
            rocket.transition({
                name: 'transform',
                to: {translate: [0, '-800px']},
                dur: 5000,
                timing: 'cubic-bezier(0.47, 0, 0.745, 0.715)'
            });

            // 'end' firing early in Chrome(?); temporarily use setTimeout
            window.setTimeout(function(){
                // Fade out space
                space.transition({
                    name: 'opacity',
                    from: 1,
                    to: 0,
                    dur: 2000
                });

                window.setTimeout(function(){
                    space.find('.button').detach();
                    //rocket.detach();
                    spaceSceneInit();
                }, 2000);
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

            ctrl.stop();

            sky.append([
                backgroundStars,
                starfield,
                foreground,
                foreground2
            ]);

            createStars(100, width, height + 200).appendTo(starfield);

            starfield.transition({
                name: 'transform',
                from: {translate: [0, '-200px']},
                to: {translate: [0, 0]},
                dur: 16000
            });


            // Create moon
            moon = foreground.image({
                'xlink:href': path + 'moon-200.png',
                width: 200,
                height: 200,
                x: width - 250,
                y: 20
            }).addClass('moon');

            // Create moon
            saturn = foreground.image({
                'xlink:href': path + 'saturn-100.png',
                width: 100,
                height: 109,
                x: width - 280,
                y: 600
            }).addClass('saturn');

            foreground.image({
                'xlink:href': path + 'jupiter.svg',
                width: 60,
                height: 60,
                x: width - 90,
                y: 310
            }).addClass('jupiter').transform('rotate', -20, width - 90 + 30, 340);

            foreground.image({
                'xlink:href': path + 'star.svg',
                width: 30,
                height: 30,
                x: width - 80,
                y: 500
            }).addClass('star');

            foreground.transformCss('translate', ['280px', '-220px']);

            window.setTimeout(function(){
                foreground.transition({
                    name: 'transform',
                    to: {translate: [0, 0]},
                    dur: 15000,
                    timing: 'cubic-bezier(0.445, 0.05, 0.55, 0.95)'
                });
            }, 2000);


            /////

            foreground2.image({
                'xlink:href': path + 'star.svg',
                width: 30,
                height: 30,
                x: 80,
                y: 0
            }).transformCss('rotate', 45, 90, 10);

            foreground2.image({
                'xlink:href': path + 'star.svg',
                width: 30,
                height: 30,
                x: 0,
                y: 100
            }).transformCss('rotate', 22, 10, 110);

            foreground2.image({
                'xlink:href': path + 'star.svg',
                width: 30,
                height: 30,
                x: 160,
                y: 120
            }).transformCss('rotate', 80, 170, 130);

            foreground2.image({
                'xlink:href': path + 'pie.svg',
                width: 60,
                height: 60,
                x: -80,
                y: -100
            }).addClass('pie');

            foreground2.transformCss('translate', ['-160px', height + 'px']);

            window.setTimeout(function(){
                foreground2.transition({
                    name: 'transform',
                    to: {translate: ['120px', height - 200 + 'px']},
                    dur: 20000,
                    timing: 'cubic-bezier(0.445, 0.05, 0.55, 0.95)'
                });
            }, 2000);


            // Start rocket path
            window.setTimeout(function(){
                rocket.transition(null);
                rocket.transformCss([
                    {translate: ['-60px', height - 70 + 'px']},
                    {scale: 0.4},
                    {rotate: '40deg'}
                ]);

                window.setTimeout(function(){
                    rocket.transition({
                        name: 'transform',
                        to: {
                            translate: [width - 360 + 'px', '10px'],
                            rotate: '70deg'
                        },
                        dur: 18000,
                        timing: 'cubic-bezier(0.445, 0.05, 0.55, 0.95)'
                    });
                }, 300);

                window.setTimeout(function(){
                    createHeader();
                    createCallouts();
                    fireControl.collection.css('opacity', 1);
                    fireControl.destroy();
                }, 18000);

                fireControl.options.t = 1200;
                fireControl.collection.splice(1, 2);
                fireControl.reset();
                rocketShapeControl.options.repeat = 3;
                rocketShapeControl.reset();
                ctrl.start();
            }, 14000);

            // Fade in space
            space.transition({
                name: 'opacity',
                to: 1,
                dur: 3000
            });
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
                'xlink:href': path + 'callout-circle.svg',
                width: 582.77,
                height: 234.94,
                x: width - 90 - 585,
                y: 278
            }).addClass('callout-circle');

            callouts.image({
                'xlink:href': path + 'callout-template.svg',
                width: 955.57,
                height: 183.81,
                x: width - 900,
                y: 392
            }).addClass('callout-template');

            callouts.image({
                'xlink:href': path + 'callout-images.svg',
                width: 393.74,
                height: 126.03,
                x: width - 666,
                y: 590
            }).addClass('callout-images');

            callouts.image({
                'xlink:href': path + 'callout-plugins.svg',
                width: 487.18,
                height: 126.18,
                x: 110,
                y: height - 331
            }).addClass('callout-plugins');

            callouts.image({
                'xlink:href': path + 'callout-import.svg',
                width: 473.25,
                height: 126.16,
                x: 10,
                y: 30
            }).addClass('callout-import');

            var animCalloutX = width - 360 - 940;
            callouts.image({
                'xlink:href': path + 'callout-animation.svg',
                width: 707.27,
                height: 234.22,
                x: animCalloutX < 0 ? 0 : animCalloutX,
                y: 95
            }).addClass('callout-animation');

            allCallouts = callouts.find('image').css({
                opacity: 0,
                'pointer-events': 'none'
            });

            window.setTimeout(function(){
                allCallouts.transition('opacity', 1000);
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


        // FULLSCREEN
        var requestFullscreenProp = Pablo.findPrefixedProperty('requestFullscreen', document.body) || Pablo.findPrefixedProperty('requestFullScreen', document.body);

        function fullscreen(target, callback){
            if (requestFullscreenProp){
                Pablo(target)[0][requestFullscreenProp]();
                window.setTimeout(callback, 1200);
            }
            else {
                callback();
            }
        }

        function createHeader(callback, fadeOut){
            var header = Pablo.text({
                'font-family': 'Megrim, "Helvetica Neue", sans-serif',
                'font-size': 72,
                fill: '#fdde03',
                'pointer-events': 'none',
                'text-anchor': 'middle',
                'dominant-baseline': 'central',
                x: '50%',
                y: '50%'
            }).content('Pablo')
            .transition('opacity', {
                from: 0,
                to: 1,
                dur: 1200,
                timing: 'ease-in'
            })
            .appendTo(svg);

            if (fadeOut){
                window.setTimeout(function(){
                    header.transition('opacity', {
                        to: 0,
                        dur: 1942,
                        timing: 'ease-in',
                        delay: 1200,
                        end: function(){
                            header.detach();
                            if (callback){
                                callback();
                            }
                        }
                    });
                }, 1200);
            }
        }

        function addFullscreenStyles(){
            var cssRule = [':fullscreen', ':' + Pablo.userAgent.cssPrefix + 'fullscreen', ':' + Pablo.userAgent.cssPrefix + 'full-screen'].map(function(selector){
                return selector + '{width:100%!important; height:100%!important; margin:0!important; padding:0!important;}\n';
            }).join('');

            Pablo(document.createElement('style'))
                .content(cssRule)
                .prependTo(stage);
        }

        function startDemo(){
            addFullscreenStyles();

            fullscreen(stage, function(){
                width = window.innerWidth,
                height = window.innerHeight,

                createHeader(function(){
                    createCtrl(); 
                    rocketInit();
                    rocketPrepareForLaunch();
                    DEBUG || rocketEffects();
                    buttonInit();
                }, true);
            });
        }


        /////


        startDemo();
    }

    function placeholder(){
        //width = stage[0].clientWidth,
        //height = stage[0].clientHeight
        var width = 130.427,
            height = 502.237,
            svg = stage.svg({width:'100%', height:'100%'}).css('background', 'black'),
            rocket = svg.image({
                'xlink:href': path + 'rocket.svg',
                width: width,
                height: height
            }).transform([{rotate:75}, {translate:[40,-height + 50]}]),
            playButton = svg.text({
                'font-size': 120,
                fill: '#fdde03',
                'text-anchor': 'middle',
                'dominant-baseline': 'central',
                x: '50%',
                y: '50%'
            }).content('➤');
    }

    function init(){
        function fullscreenElement(){
            var prop = Pablo.findPrefixedProperty('fullscreenElement', document) ||
                Pablo.findPrefixedProperty('fullScreenElement', document);

            if (prop){
                return document[prop];
            }
        }

        function isFullscreen(){
            // var prop = Pablo.findPrefixedProperty('fullScreen', doc);
            // if (prop){
            //     return document[prop]();
            // }

            return !!fullscreenElement();
        }

        function keyListener(event){
            // Esc key
            if (event.keyCode === 27){
                end();
            }
        }

        function start(){
            var callback;

            if (!active){
                active = true;
                stage.empty();
                window.addEventListener('keydown', keyListener);

                callback = function(){
                    if (!isFullscreen()){
                        end();
                    }
                };
                // Chrome
                stage.on('fullscreenchange', callback)
                     .on(Pablo.userAgent.prefix + 'fullscreenchange', callback);
                // Firefox
                doc.on('fullscreenchange', callback)
                     .on(Pablo.userAgent.prefix + 'fullscreenchange', callback);

                demo();
            }
        }

        function end(){
            if (active){
                active = false;
                stage.empty();
                window.removeEventListener('keypress', keyListener);
                stage.off('fullscreenchange')
                   .off(Pablo.userAgent.prefix + 'fullscreenchange');
                doc.off('fullscreenchange')
                   .off(Pablo.userAgent.prefix + 'fullscreenchange');
                
                // May be invoked before `ctrl` has been created
                if (ctrl){
                    ctrl.destroy();
                }

                placeholder();
            }
        }

        stage.css('cursor', 'pointer')
             .on('click', function(){
                if (!active){
                    stage.css('cursor', null);
                    start();
                }
            });

        placeholder();

        // Preload images; TODO init on all loaded
        Pablo.load(path + 'rocket-japanese-e.svg', function(){
            ['fire-e.svg', 'button-launch.png', 'moon-200.png', 'saturn-100.png', 'jupiter.svg', 'star.svg', 'pie.svg', 'callout-circle.svg', 'callout-template.svg', 'callout-images.svg', 'callout-plugins.svg', 'callout-import.svg', 'callout-animation.svg'].forEach(function(src){
                Pablo.load(path + src, function(){});
            });
        })
    }

    /////

    if (Pablo.isSupported && Pablo.support.css.transform && Pablo.support.css.transition){
        init();
        return true;
    }

    else {
        return false;
    }

}(window, window.Pablo));