(function (NS) {
	"use strict";

	function classWrapper() {
		// Usage:
		// Storage.get('someid');
		// Storage.set('someid', someval);

		var Storage;
		if ( NS.global.localStorage && JSON ) {
			Storage = {
				get: function( key ) {
					return NS.global.localStorage[key] && JSON.parse(NS.global.localStorage[key]);
				},
				set: function( key, data ) {
					NS.global.localStorage[key] = JSON.stringify(data);
				}
			};
		} else {
			console.log ('Warning: This browser doesn\'t support localStorage or JSON');
			Storage = {
				get: function( key ) { return },
				set: function( key, data ) { return }
			};
		}

		return Storage;
	}

	var libs = [];
	var polyfills = [];
	NS.load ( 'lib.Storage', libs.concat(polyfills), classWrapper, this );
})(window.NS);
