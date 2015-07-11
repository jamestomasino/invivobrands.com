(function (NS) {
	"use strict";

	function classWrapper() {

		var DOM = NS.use('lib.DOM');
		var items = [];

		function activeToggle(evt) {
			evt = evt || window.event;
			if (evt && evt.preventDefault) {
				evt.preventDefault();
			}
			else {
				window.event.returnValue = false;
			}
			console.log (evt.currentTarget);
			var i = items.length; while (i--) {
				var item = items[i];
				var header = DOM.find('dt', item)[0];
				var term = DOM.find('.term', item)[0];
				var phrase = DOM.find('.phrase', item)[0];
				var content = DOM.find('dd', item)[0];

				if (header === evt.currentTarget) {
					if (!DOM.hasClass(term, 'active')) {
						DOM.addClass(term, 'active');
						DOM.addClass(phrase, 'active');
						DOM.addClass(content, 'active');
					}
				} else {
					DOM.removeClass(term, 'active');
					DOM.removeClass(phrase, 'active');
					DOM.removeClass(content, 'active');
				}
			}
		}

		var HowWeDoIt = function ( dom_id ) {
			var howWeDoItContent = DOM.find(dom_id)[0];
			var headers = DOM.find('dt', howWeDoItContent);
			var i = headers.length; while (i--) {
				items.push(headers[i].parentElement);
				headers[i].addEventListener("click", activeToggle, false);
				headers[i].addEventListener("touchend", activeToggle, false);
			}
		}

		var namespace = new NS ( 'components' );
		namespace.HowWeDoIt = HowWeDoIt;

	}

	NS.load ( ['lib.DOM' ], classWrapper, this );

})(window.NS);
