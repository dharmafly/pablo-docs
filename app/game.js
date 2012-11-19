var Game = (function(){
    'use strict';

    function Game(){
        this.init();
    }

    Game.prototype = {
        init: function(settings){
            var game = this;

            this.settings = Floaters.gameSettings;
            this.messageQueue = Floaters.messageQueue;
            this.animationLoop = new AnimationLoop(null, this.settings.rootElem);

            return this;
        },

        // publish event
        pub: function(event, data){
            this.messageQueue.pub(this.namespace + ':' + event, data, this);
            return this;
        },

        // subscribe to event
        sub: function(event, callback){
            this.messageQueue.sub(event, callback);
            return this;
        },

        createDashboard: function(){
            this.dom = this.settings.root.g({'class': 'dashboard'});

            this.points = this.dom.g({'class': 'points'});

            // TODO: move to stylesheet
            this.notification = this.dom.text({
                'class': 'notification',
                x:'50%', 
                y:'50%', 
                'font-size':Floaters.gameSettings.fontSize, 
                'font-family':'lcd', 
                fill:'white',
                'text-anchor': 'middle'
            });
            this.previousNotification = this.currentNotification = '';

            return this;
        },

        displayNotification: function(message){
            // Update contents
            this.previousNotification = this.currentNotification;
            this.currentNotification = message;
            this.notification.content(message);
            return this;
        },

        gainPoints: function(symbol){
            Floaters.user.score += symbol.points;
            return this.displayPoints(symbol);
        },

        displayPoints: function(symbol){
            var fontSize = Floaters.gameSettings.fontSize;

            // TODO use stylesheet to style the `points` class
            this.points.text({
                x: Math.round(symbol.pos.x - (fontSize / 2)),
                y: Math.round(symbol.pos.y + (fontSize / 2)), 
                'font-size': fontSize, 
                'font-family':'lcd', 
                fill:'green'
            }).content(symbol.points);
            return this;
        },

        transformPoints: function(){
            var px = Floaters.randomIntRange(60, 120);

            this.points.cssPrefix({
                transform: 'rotate3d(1, 1, 1, ' + px + 'deg) scale(0.5) skew(0deg, 90deg)'
            });
            return this;
        },

        updateHiScore: function(score){
            if (Floaters.user.hiScore < score){
                Floaters.user.hiScore = score;
                this.cacheHiScore(score);
            }
            return this;
        },

        cacheHiScore: function(hiScore){
            Floaters.cache.set({hiScore: hiScore});
            return this;
        },

        levelComplete: function(){
            this.updateHiScore(Floaters.user.score)
                .displayNotification('Level complete')
                .transformPoints();
        },

        // Add CSS styles
        addStyles: function(){
            var fadeStylesToPrefix = {
                    transition: 'all ' + (this.settings.pointsTransitionDuration / 1000) + 's ' + 'ease-in-out',
                    'transform-origin': (this.settings.width / 2) + 'px ' + (this.settings.height / 2) + 'px'
                },
                fadeStyles = Pablo.cssPrefix(fadeStylesToPrefix),
                fadeStylesString = '',
                prop;

            for (prop in fadeStyles){
                fadeStylesString += prop + ':' + fadeStyles[prop] + ';'
            }

            this.dom.style().content(
                // prevent mouse clicks on dashboard notifications & points
                '.dashboard .notification, .dashboard .points { pointer-events: none; }' +
                // transform points
                '.dashboard .points {' + fadeStylesString + '}' +
                'svg.paused .dashboard { pointer-events: none; }'
            );

            return this;
        },

        update: function(){
            Floaters.messageQueue.process();
            return this;
        },

        resetGame: function(){
            // Remove existing symbolset
            if (Floaters.symbolset && Floaters.symbolset.settings.symbolsRoot){
                Floaters.symbolset.settings.symbolsRoot.remove();
            }

            Floaters.symbolset = new Symbolset();

            // Create symbols
            Floaters.symbolset.createAll();

            this.displayNotification('');
            return this;
        },

        create: function(){
            var game = this,
                rootElem = this.settings.root.get(0);

            // create state loop
            this.intervalId = window.setInterval(this.update, this.settings.gameMQInterval);

            // Create dashboard
            this.createDashboard();

            // Add CSS styles
            this.addStyles();

            // Event subscriptions
            this.sub('pause', function(data, object){
                    game.displayNotification('Paused');
                    game.settings.root.addClass('paused');
                })
                .sub('resume', function(data, object){
                    game.displayNotification(game.previousNotification);
                    game.settings.root.removeClass('paused');
                })
                .sub('symbol:remove', function(data, symbol){
                    game.gainPoints(symbol);
                })
                .sub('symbolset:remove', function(data, symbolset){
                    game.levelComplete();
                });

            // Click listener on SVG element
            rootElem.addEventListener('click', function(event){
                var symbolId = event.target.getAttribute(Floaters.attrIdKey),
                    symbol = Floaters.symbolset.getSymbolById(symbolId);
                
                if (symbol){
                    symbol.onclick.call(symbol, event);
                }
            }, false);

            // Keypress listener
            window.addEventListener('keydown', function(event){
                // Spacebar pressed
                if (event.keyCode === 32){
                    // TODO: refactor to Game.pause() and Game.resume() methods
                    if (game.animationLoop.active){
                        game.animationLoop.stop();
                        Floaters.messageQueue.pub('pause', {}, game);
                    }
                    else {
                        // Reset timer, to resume play from where we left off
                        Floaters.symbolset.updated = Floaters.now();
                        game.animationLoop.start();
                        Floaters.messageQueue.pub('resume', {}, game);
                    }
                }
            }, false);

            this.animationLoopCallback = this.animationLoop.add(function(){
                // Process all the events in the message queue
                Floaters.messageQueue.process();

                // Update all symbols
                Floaters.symbolset.updateAll();
            });
            this.animationLoop.start();

            // Reset game
            this.resetGame();

            return this;
        }
    };

    return Game;
}());