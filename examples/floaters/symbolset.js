var Symbolset = (function(){
    'use strict';

    function Symbolset(){
        this.init();
    }

    Symbolset.prototype = {
        namespace: 'symbolset',
        now: now,
        createInterval: createInterval,
        maxSymbols: maxSymbols,
        reqAnimFrame: reqAnimFrame,

        init: function(){
            var symbolset = this;
            
            this.symbols = [];

            this.addStyles();

            this.sub('symbol:remove', function(data, symbol){
                symbolset.removeSymbol(symbol);
            });
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

        createSymbol: function(settings){
            var symbol = new Symbol(settings);

            this.symbols.push(symbol);
            return symbol;
        },

        // Create as many symbols as specified by maxSymbols; add id to each symbol dom
        createAll: function(settings, params){
            var Symbol = this,
                attr = {},
                i, symbol;

            this.created = this.now(); // used in updateAll()
            settings.root = settings.root.g({'class': 'symbols'});

            for (i=0; i < this.maxSymbols; i++){
                symbol = this.createSymbol(settings, params);
                symbol.id = i;
                attr[attrIdKey] = i;
                symbol.dom.attr(attr);
            }

            return this;
        },

        updateAll: (function(){
            function updateSymbol(symbol){
                symbol.update(this.timeSinceLastUpdate);
            }

            // Keep updateSymbol in the closure, and return the main updateAll function
            return function(){
                // Cache timestamp of this run of the loop
                this.prevUpdated = this.updated || this.created;
                this.updated = this.now();
                this.timeSinceLastUpdate = this.prevUpdated ?
                    this.updated - this.prevUpdated : null;

                this.symbols.forEach(updateSymbol, this);
                return this;
            };
        }()),

        // Add CSS styles
        addStyles: function(){
            var fadeStylesToPrefix = {
                transition: 'all ' + (settings.fadeoutTime / 1000) + 's ' + 'ease-out',
                transform: 'scale(0)'
            };

            settings.root.style().content(
                '.symbols circle:hover {stroke:green; cursor:crosshair;}' + 
                '.symbols circle.fade {' + Pablo.cssTextPrefix(fadeStylesToPrefix) + '}'
            );
            return this;
        },

        getSymbolById: function(id){
            return this.symbols[id];
        },

        removeSymbol: function(symbol){
            var hasRemainingSymbols, i;

            // Remove instance from memory
            delete this.symbols[symbol.id];

            // Check if all symbols removed
            for (i = this.symbols.length; i; i--){
                if (this.symbols[i-1]){
                    hasRemainingSymbols = true;
                    break;
                }
            }
            if (!hasRemainingSymbols){
                this.pub('remove');
            }

            return this;
        }
    };

        return Symbolset;
}());