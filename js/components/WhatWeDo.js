(function (NS) {
	"use strict";

	function classWrapper() {

		var DOM = NS.use('lib.DOM');
		var accordionItems = [];

		function accordionToggle(e) {
			var i = accordionItems.length; while (i--) {
				var accItem = accordionItems[i];
				var header = DOM.find('h3', accItem)[0];
				var ul = DOM.find('ul', accItem)[0];
				if (header === e.target) {
					if (DOM.hasClass(header, 'active')) {
						DOM.removeClass(header, 'active');
						DOM.removeClass(ul, 'active');
					} else {
						DOM.addClass(header, 'active');
						DOM.addClass(ul, 'active');
					}
				} else {
					DOM.removeClass(header, 'active');
					DOM.removeClass(ul, 'active');
				}
			}
		}

		var WhatWeDo = function ( dom_id ) {
			var whatWeDoContent = DOM.find(dom_id)[0];
			var headers = DOM.find('h3', whatWeDoContent);

			var i = headers.length; while (i--) {
				accordionItems.push(headers[i].parentElement);
				headers[i].addEventListener("click", accordionToggle, false);
			}
		}

		var namespace = new NS ( 'components' );
		namespace.WhatWeDo = WhatWeDo;

	}

	NS.load ( ['lib.DOM' ], classWrapper, this );

})(window.NS);
