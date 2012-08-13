var Game = (function(){
    'use strict';

    function Game(settings){
        this.init(settings);
    }

    Game.prototype = {
        init: function(settings){
            var game = this;

            this.settings = settings;
            this.animationLoop = new AnimationLoop(null, settings.rootElem);

            return this;
        },

        // publish event
        pub: function(event, data){
            messageQueue.pub(this.namespace + ':' + event, data, this);
            return this;
        },

        // subscribe to event
        sub: function(event, callback){
            messageQueue.sub(event, callback);
            return this;
        },

        createDashboard: function(){
            this.dom = this.settings.root.g({'class': 'dashboard'});

            this.points = this.dom.g({'class': 'points'});

            this.notification = this.dom.text({
                'class': 'notification',
                x:'45%', 
                y:'50%', 
                'font-size':30, 
                'font-family':'lcd', 
                fill:'white'
            });

            return this;
        },

        displayNotification: function(message){
            // Update contents
            this.notification.content(message);
            return this;
        },

        displayPoints: function(symbol){
            var fontSize = 30;

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
            var px = randomIntRange(30, 60);

            this.points.cssPrefix({
                transform: 'rotate3d(1, 1, 1, ' + px + 'deg)'
            });
            return this;
        },

        // Add CSS styles
        addStyles: function(){
            var fadeStylesToPrefix = {
                transition: 'all ' + (800 / 1000) + 's ' + 'ease-in',
                'transform-origin': (this.settings.width / 2) + 'px ' + (this.settings.height / 2) + 'px'
            };

            this.dom.style().content(
                // prevent mouse clicks on dashboard notifications & points
                '.dashboard .notification, .dashboard .points { pointer-events: none; }' +
                // transform points
                '.dashboard .points {' + Pablo.cssTextPrefix(fadeStylesToPrefix) + '}'
            );

            return this;
        },

        update: function(){
            messageQueue.process();
            return this;
        },

        create: function(){
            var game = this,
                circles = new Symbolset();

            // create state loop
            this.intervalId = window.setInterval(this.update, gameMQInterval);

            // Create symbols
            circles.createAll(settings);

            // Create dashboard
            this.createDashboard();

            // Add CSS styles
            this.addStyles();

            // Event subscriptions
            this.sub('pause', function(data, object){
                    game.displayNotification('Paused');
                })
                .sub('resume', function(data, object){
                    game.displayNotification('');
                })
                .sub('symbol:remove', function(data, symbol){
                    game.displayPoints(symbol);
                })
                .sub('symbolset:remove', function(data, symbolset){
                    game.displayNotification('Level complete');
                    game.transformPoints();
                });

            // Click listener on SVG element
            settings.rootElem.addEventListener('click', function(event){
                var symbolId = event.target.getAttribute(attrIdKey),
                    symbol = circles.getSymbolById(symbolId);

                if (symbol){
                    symbol.onclick.call(symbol, event);
                }
            }, false);

            // Keypress listener
            window.addEventListener('keydown', function(event){
                // Spacebar pressed
                if (event.keyCode === 32){
                    if (game.animationLoop.active){
                        game.animationLoop.stop();
                        messageQueue.pub('pause', {}, game);
                    }
                    else {
                        // Reset timer, to resume play from where we left off
                        circles.updated = now();
                        game.animationLoop.start();
                        messageQueue.pub('resume', {}, game);
                    }
                }
            }, false);

            this.animationLoopCallback = this.animationLoop.add(function(){
                // Process all the events in the message queue
                messageQueue.process();

                // Update all symbols
                circles.updateAll();
            });
            this.animationLoop.start();

            return this;
        }
    };

    return Game;
}());