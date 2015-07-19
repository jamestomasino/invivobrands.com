(function (NS) {
	"use strict";

	function classWrapper() {

		var DOM = NS.use('lib.DOM');
		var accordionItems = [];

		var WhatWeDo = function ( dom_id ) {
			var whatWeDoContent = DOM.find(dom_id)[0];
			var headers = DOM.find('h3', whatWeDoContent);
		}

		var namespace = new NS ( 'components' );
		namespace.WhatWeDo = WhatWeDo;

	}

	NS.load ( ['lib.DOM' ], classWrapper, this );

})(window.NS);
