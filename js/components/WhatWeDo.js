(function (NS) {
	"use strict";

	function classWrapper() {

		var DOM = NS.use('lib.DOM');
		var DOM_EL = null;
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
				if (item === evt.currentTarget) {
					if (!DOM.hasClass(item, 'active')) {
						DOM.addClass(item, 'active');
					}
				} else {
					DOM.removeClass(item, 'active');
				}
			}
		}

		var WhatWeDo = function ( dom_id ) {
			DOM_EL = DOM.find(dom_id);
			items = DOM.find('.row', DOM_EL);
			var i = items.length; while (i--) {
				items[i].addEventListener("click", activeToggle, false);
				items[i].addEventListener("touchend", activeToggle, false);
			}
		}

		var namespace = new NS ( 'components' );
		namespace.WhatWeDo = WhatWeDo;

	}

	var libs = [
		'lib.DOM' ];

	var polyfills = [];

	if (!document.addEventListener) {
		polyfills.push("polyfill.addEventListener");
	}

	NS.load ( 'components.WhatWeDo', libs.concat(polyfills), classWrapper, this );

})(window.NS);
