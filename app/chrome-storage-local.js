function Cache(){}

(function(){
	var cache = chrome.storage.local;

	Cache.prototype = {
		QUOTA_BYTES: cache.QUOTA_BYTES,
		clear: function(){
			cache.clear.apply(cache, arguments);
		},
		get: function(){
			cache.get.apply(cache, arguments);
		},
		getBytesInUse: function(){
			cache.getBytesInUse.apply(cache, arguments);
		},
		remove: function(){
			cache.remove.apply(cache, arguments);
		},
		set: function(){
			cache.set.apply(cache, arguments);
		}
	};
}());