(function (NS) {
	"use strict";

	function classWrapper() {

		var DOM      = NS.use('lib.DOM');
		var ScrollTo = NS.use('lib.ScrollTo');

		var SmoothAnchor = function ( ) {

			document.body.addEventListener("click",this.onBodyClick,false);
		};

		var p = SmoothAnchor.prototype;

		p.onBodyClick = function (event) {
			var el = event.srcElement || event.target;

			/* Loop up the DOM tree through parent elements if clicked element is not a link (eg: an image inside a link) */
			while(el && (typeof el.tagName === 'undefined' || el.tagName.toLowerCase() !== 'a' || !el.href)){
				el = el.parentNode;
			}

			if(el && el.href) {
				var link = el.getAttribute('href');
				if(link.substr(0,1) === '#') {
					if (link.length === 1) {
						ScrollTo(0);
					} else {
						el = DOM.find(link);
						if (el) {
							var elRect = el.getBoundingClientRect();
							ScrollTo(elRect.top.toString());
							if (event.preventDefault)
								event.preventDefault()
							else
								event.returnValue = false;
							return false;
						}
					}
				}
			}
		};

		return SmoothAnchor;
	}

	var libs = [
		'lib.DOM',
		'lib.ScrollTo' ];

	var polyfills = [];

	if (!document.addEventListener) {
		polyfills.push("polyfill.addEventListener");
	}

	NS ( 'components.SmoothAnchor', libs.concat(polyfills), classWrapper, this );

})(window.NS);
