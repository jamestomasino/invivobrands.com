(function (NS) {
	"use strict";

	function classWrapper() {

		var DOM = NS.use('lib.DOM');
		var menuButton = null;
		var menu = null;


		var Menu = function ( menuButton, menu) {
			var buttonContainer = DOM.find(menuButton);
			var menuContainer = DOM.find(menu);
			menuButton = DOM.find(".menu", buttonContainer)[0];
			menu = DOM.find("ol", menuContainer)[0];
			menuButton.addEventListener("click", toggleMenu, false);
			menuButton.addEventListener("touchend", toggleMenu, false);

			function toggleMenu(evt) {
				evt = evt || window.event;
				if (evt && evt.preventDefault) {
					evt.preventDefault();
				}
				else {
					window.event.returnValue = false;
				}
				DOM.toggleClass(menuButton, "active");
				DOM.toggleClass(menu, "active");
			}
		}

		var namespace = new NS ( 'components' );
		namespace.Menu = Menu;

	}

	NS.load ( ['lib.DOM' ], classWrapper, this );

})(window.NS);
