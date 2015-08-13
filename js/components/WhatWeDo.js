(function (NS) {
	"use strict";

	var libs = [
		'lib.DOM' ];

	NS ('components.WhatWeDo', libs, function(){

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

		return WhatWeDo;

	});

})(window.NS);
