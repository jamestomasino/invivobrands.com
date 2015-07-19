(function (NS) {
	"use strict";

	function classWrapper() {

		var DOM = NS.use('lib.DOM');
		var Debounce = NS.use('lib.Debounce');

		var navbar = null;

		var menu = null;
		var menuButton = null;
		var menuList = null;

		// For scroll handling
		var supportPageOffset = window.pageXOffset !== undefined;
		var isCSS1Compat = ((document.compatMode || "") === "CSS1Compat");
		var lastScrollTop = 0;
		var delta = 5;


		var Menu = function ( navbar_id, menu_id) {

			function toggleMenu(evt) {
				evt = evt || window.event;
				if (evt && evt.preventDefault) {
					evt.preventDefault();
				}
				else {
					window.event.returnValue = false;
				}
				DOM.toggleClass(menuButton, "active");
				DOM.toggleClass(menuList, "active");
			}

			function hasScrolled() {
				var y = supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;
				if (Math.abs(lastScrollTop - y) <= delta) return;

				if (y > lastScrollTop) {
					DOM.addClass(navbar, 'nav-up');
					lastScrollTop = y;
				} else if ( y < lastScrollTop ) {
					DOM.removeClass(navbar, 'nav-up');
					lastScrollTop = y;
				}
			}

			// Identify navbar and add listeners
			navbar = DOM.find(navbar_id);
			menuButton = DOM.find(".menu", navbar)[0];
			menuButton.addEventListener("click", toggleMenu, false);
			menuButton.addEventListener("touchend", toggleMenu, false);

			// Identify menu
			menu = DOM.find(menu_id);
			menuList = DOM.find("ol", menu)[0];

			// Handle scroll
			window.addEventListener("scroll", Debounce(hasScrolled, 250, false), false);
		}

		var namespace = new NS ( 'components' );
		namespace.Menu = Menu;

	}

	NS.load ( ['lib.DOM', 'lib.Debounce' ], classWrapper, this );

})(window.NS);
