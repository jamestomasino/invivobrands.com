(function (NS) {
	"use strict";

	function classWrapper() {

		var DOM = NS.use('lib.DOM');
		var Debounce = NS.use('lib.Debounce');
		var Delegate = NS.use('lib.Delegate');
		var supportPageOffset = window.pageXOffset !== undefined;
		var isCSS1Compat = ((document.compatMode || "") === "CSS1Compat");
		var objs = [];
		var debounceScroll;

		var Animate = function ( els ) {

			function hasScrolled() {
				var y = supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;
				var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
				var bodyRect = document.body.getBoundingClientRect();

				var i = objs.length; while (i--) {
					var elemRect = objs[i].getBoundingClientRect();
					var offset   = elemRect.top - bodyRect.top;
					if(y > (offset - (h*.75))) {
						DOM.addClass(objs[i], 'animate');
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

			debounceScroll = Debounce(hasScrolled, 250, false);
			window.addEventListener("scroll", debounceScroll, false);
			hasScrolled();
		}

		var namespace = new NS ( 'components' );
		namespace.Animate = Animate;

	}

	NS.load ( ['lib.DOM', 'lib.Debounce', 'lib.Delegate'], classWrapper, this );

})(window.NS);
