var AnimationLoop = (function(window){
	'use strict';


	function now(){
	    return (new Date().getTime());
	}

	var nativeRequestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame ||
			        window.msRequestAnimationFrame,
		nativeCancelAnimationFrame = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame ||
	        window.msCancelAnimationFrame;

	function AnimationLoop(callback, element){
		this.init(callback, element);
	}

	AnimationLoop.prototype = {
		requestID: null,
		lastUpdated: null,
		timeSinceLastFrame: 0,
		element: null,
		callbacks: [],
		nativeRequestAnimationFrame: nativeRequestAnimationFrame,
		nativeCancelAnimationFrame: nativeCancelAnimationFrame,
		isSupported: !!(nativeRequestAnimationFrame && nativeCancelAnimationFrame),

		init: function(callback, element){
			if (callback){
				this.add(callback, element);
			}
			if (element){
				this.element = element;
			}
			this.lastUpdated = now();
		    
		    return this.start();
		},

		request: function(){
			var animationLoop = this;

			if (this.isSupported){
				this.requestID = this.nativeRequestAnimationFrame.call(window, function(){
					animationLoop.process();
				});
			}
			return this;
		},

		start: function(){
			return this.request();
		},

		stop: function(){
			if (this.isSupported){
				this.nativeCancelAnimationFrame.call(window, this.requestID);
				this.requestID = null;
			}
			return this;
		},

		process: (function(){
			function process(callbackObj){
				callbackObj.callback.call(callbackObj.thisArg || null, this.timeSinceLastFrame);
			}

			return function(){
				var t = now();

				this.timeSinceLastFrame = t - this.lastUpdated;
				this.lastUpdated = t;
				this.callbacks.forEach(process);

				return this.request();
			};
		}()),

		add: function(callback, element, thisArg){
			this.callbacks.push({
				callback: callback,
				element: element, // (not currently supported)
				thisArg: thisArg
			});
			return this;
		},

		remove: function(callback){
			var callbacks = this.callbacks,
				len = callbacks.length,
				i;

			for (i=0; i<len; i++){
				if (callbacks[i].callback === callback){
					// splice out callback from callbacks array
					this.callbacks.splice(i, 1);
					break;
				}
			}

			return this;
		}/*,


		find: function(callback){
			var callbacks = this.callbacks,
				len = callbacks.length,
				i;

			for (i=0; i<len; i++){
				if (callbacks[i].callback === callback){
					return callbacks[i];
				}
			}

			return null;
		}*/
	};

	return AnimationLoop;
}(window));