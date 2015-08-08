(function (NS) {
	"use strict";

	function classWrapper() {

		var DOM = NS.use('lib.DOM');
		var Debounce = NS.use('lib.Debounce');
		var Delegate = NS.use('lib.Delegate');
		var Prefix = NS.use('lib.Prefix');
		var supportPageOffset = window.pageXOffset !== undefined;
		var isCSS1Compat = ((document.compatMode || "") === "CSS1Compat");
		var objs = [];
		var debounceScroll;

		var transition = Prefix.getStyle('transition WebkitTransition MozTransition MsTransition OTransition');
		var transitions = {
			'WebkitTransition' : 'webkitTransitionEnd',
			'MozTransition'    : 'transitionend',
			'OTransition'      : 'oTransitionEnd otransitionend',
			'transition'       : 'transitionend'
		};
		var transitionEnd = transitions[transition] || false;

		console.log (transitionEnd);

		function onTransEnd(e) {
			DOM.addClass(e.target, 'finished');
		}

		function onTransEndDelay(obj) {
			setTimeout(function () {
				DOM.addClass(obj, 'finished');
			}, 5000);
		}

		var Animate = function ( els ) {

			if (transitionEnd) {
				document.body.addEventListener(transitionEnd, onTransEnd, false);
			}

			function hasScrolled() {
				var y = supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;
				var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
				var bodyRect = document.body.getBoundingClientRect();

				var i = objs.length; while (i--) {
					var elemRect = objs[i].getBoundingClientRect();
					var offset   = elemRect.top - bodyRect.top;

					if(y > (offset - (h*0.75))) {

						// Add animate class when object is about to be on screen
						DOM.addClass(objs[i], 'animate');

						if (!transitionEnd) {
							onTransEndDelay(objs[i]);
						}
						// Listen for the transition end and add a finished class for cleanup

						objs.splice(i,1);
						if (objs.length === 0) {
							window.removeEventListener("scroll", debounceScroll, false);
						}
					}
				}
			}

			var i = els.length; while (i--) {
				var obj = DOM.find(els[i]);
				objs.push ((obj.length) ? obj[0] : obj);
			}

			debounceScroll = Debounce(hasScrolled, 66, true, true);
			window.addEventListener("scroll", debounceScroll, false);
			hasScrolled();
		}

		var namespace = new NS ( 'components' );
		namespace.Animate = Animate;

	}

	var libs = [
		'lib.DOM',
		'lib.Debounce',
		'lib.Delegate',
		'lib.Prefix' ];

	var polyfills = [];

	if (!document.addEventListener) {
		polyfills.push("polyfill.addEventListener");
	}

	NS.load ( libs.concat(polyfills), classWrapper, this );

})(window.NS);
