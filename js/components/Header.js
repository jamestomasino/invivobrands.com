(function (NS) {
	"use strict";

	function classWrapper() {

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

			var bgtextfill = DOM.find('.bgtextfill', DOM_EL)[0];
			var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
			h = h - 50;
			bgtextfill.style.height = Math.min(Math.max(h,minHeight),maxHeight) + "px";
		}

		var namespace = new NS ( 'components' );
		namespace.Header = Header;

	}

	NS.load ( ['lib.DOM','lib.Draw'], classWrapper, this );

})(window.NS);
