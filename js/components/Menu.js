(function (NS) {
	"use strict";

	function classWrapper() {

		var DOM = NS.use('lib.DOM');
		var Debounce = NS.use('lib.Debounce');
		var Delegate = NS.use('lib.Delegate');

		var navbar = null;

		var menu = null;
		var menuButton = null;
		var menuList = null;

		var backtotop = null;

		// For scroll handling
		var supportPageOffset = window.pageXOffset !== undefined;
		var isCSS1Compat = ((document.compatMode || "") === "CSS1Compat");
		var lastScrollTop = 0;
		var delta = 5;
		var topThreshold = 150;
		var isAboveThreshold = true;

		var Menu = function ( navbar_id, menu_id, backtotop_id ) {

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

			function menuItemClicked(evt) {
				DOM.removeClass(menuButton, "active");
				DOM.removeClass(menuList, "active");
			}

			function hasScrolled() {
				// scroll top
				var y = supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;

				// If movement broke threshold, show/hide navbar
				if (Math.abs(lastScrollTop - y) > delta) {

					if (y > lastScrollTop) {
						if (!DOM.hasClass(menuList, "active")) {
							DOM.addClass(navbar, 'nav-up');
							lastScrollTop = y;
						}
					} else if ( y < lastScrollTop ) {
						DOM.removeClass(navbar, 'nav-up');
						lastScrollTop = y;
					}

				}
				if (isAboveThreshold && y > topThreshold) {
					DOM.addClass(backtotop, "active");
					isAboveThreshold = false;
				} else if (!isAboveThreshold && y < topThreshold) {
					DOM.removeClass(backtotop, "active");
					isAboveThreshold = true;
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
			var menuItems = DOM.find("a", menuList);

			// Back To Top
			backtotop = DOM.find(backtotop_id);

			// Close menu on nav item click
			var i = menuItems.length; while (i--) {
				menuItems[i].addEventListener("click", Delegate(menuItemClicked, this), false);
			}

			// Handle scroll
			window.addEventListener("scroll", Debounce(hasScrolled, 250, false), false);
		}

		var namespace = new NS ( 'components' );
		namespace.Menu = Menu;

	}

	NS.load ( ['lib.DOM', 'lib.Debounce', 'lib.Delegate'], classWrapper, this );

})(window.NS);
