(function (NS) {
	"use strict";

	function classWrapper() {

		var DOM = NS.use('lib.DOM');
		var Debounce = NS.use('lib.Debounce');
		var DOM_EL = null;
		var isSmallScreen = false;
		var items = [];

		function activeToggle(evt) {
			evt = evt || window.event;
			if (evt && evt.preventDefault) {
				evt.preventDefault();
			}
			else {
				window.event.returnValue = false;
			}
			var i = items.length; while (i--) {
				var item = items[i];
				var header = DOM.find('dt', item)[0];
				var par = header.parentElement;
				if (header === evt.currentTarget) {
					if (!DOM.hasClass(par, 'active')) {
						DOM.addClass(par, 'active');
					}
				} else {
					DOM.removeClass(par, 'active');
				}
			}
		}

		var HowWeDoIt = function ( dom_id ) {
			DOM_EL = DOM.find(dom_id);
			var headers = DOM.find('dt', DOM_EL);
			var i = headers.length; while (i--) {
				items.push(headers[i].parentElement);
				headers[i].addEventListener("click", activeToggle, false);
				headers[i].addEventListener("touchend", activeToggle, false);
			}

			function fixActiveItem() {
				var el = DOM.find('.active', DOM_EL)[0];
				DOM.removeClass(el, 'active');
				DOM.offsetHeight;
				setTimeout(function () {
					DOM.addClass(el, 'active');
				}, 20);
			}

			function resizeHandler() {
				var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
				if (isSmallScreen && w > 735) {
					isSmallScreen = false;
					fixActiveItem();
				} else if (w < 735) {
					isSmallScreen = true;
				}
			}

			window.addEventListener("resize", Debounce(resizeHandler, 66, true, true), false);
			resizeHandler();
			fixActiveItem();
		}

		var namespace = new NS ( 'components' );
		namespace.HowWeDoIt = HowWeDoIt;

	}

	var libs = [
		'lib.DOM',
		'lib.Debounce' ];

	var polyfills = [];

	if (!document.addEventListener) {
		polyfills.push("polyfill.addEventListener");
	}

	NS.load ( libs.concat(polyfills), classWrapper, this );

})(window.NS);
