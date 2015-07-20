(function (NS) {
	"use strict"

	var supportPageOffset = window.pageXOffset !== undefined;
	var isCSS1Compat = ((document.compatMode || "") === "CSS1Compat");

	function classWrapper() {

		var requestAnimFrame = (function(){
			return  window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function( callback ){ window.setTimeout(callback, 1000 / 60); };
		})();

		function ScrollTo(to, callback, duration, easing) {

			function move(amount) {
				document.documentElement.scrollTop = document.body.parentNode.scrollTop = document.body.scrollTop = amount;
				// if (supportPageOffset) {
				// 	window.pageYOffset = amount;
				// } else if (isCSS1Compat) {
				// 	document.documentElement.scrollTop = amount;
				// } else {
				// 	document.body.scrollTop = amount;
				// }
			}

			function position() {
				return document.documentElement.scrollTop || document.body.parentNode.scrollTop || document.body.scrollTop;
			}

			var start = position();
			var change = to - start;
			var currentTime = 0;
			var increment = 20;

			duration = (typeof(duration) === 'undefined') ? 500 : duration;
			easing = (typeof(easing) === 'undefined') ? Math.easeInOutQuad : easing;

			var animateScroll = function() {
				currentTime += increment;
				var val = easing.call(this, currentTime, start, change, duration);
				move(val);
				if (currentTime < duration) {
					requestAnimFrame(animateScroll);
				} else {
					if (callback && typeof(callback) === 'function') {
						callback();
					}
				}
			};

			animateScroll();
		}

		var namespace = new NS ( 'lib' );
		namespace.ScrollTo = ScrollTo;
	}

	NS.load ( ['lib.Easing'], classWrapper, this );

})(window.NS);
