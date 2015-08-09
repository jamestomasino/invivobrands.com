(function (NS) {
	"use strict";

	NS ( 'components.Header', ['lib.DOM','lib.Draw'], function(){
		var DOM = NS.use('lib.DOM');
		var Draw = NS.use('lib.Draw');
		var DOM_EL = null;

		var minHeight = 310;
		var maxHeight = 865;

		var Header = function ( dom_id ) {
			DOM_EL = DOM.find(dom_id);
			var headerArrow = DOM.find('.arrow_container', DOM_EL)[0];
			var line1 = Draw.line(0,30,25,54);
			var line2 = Draw.line(50,30,25,54);
			var line3 = Draw.line(25,0,25,54);
			headerArrow.appendChild(line1);
			headerArrow.appendChild(line2);
			headerArrow.appendChild(line3);
		}

		return Header;
	});

})(window.NS);
