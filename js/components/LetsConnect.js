(function (NS) {
	"use strict";

	function classWrapper() {

		var DOM = NS.use('lib.DOM');
		var Draw = NS.use('lib.Draw');
		var DOM_EL = null;
		var items = [];
		var isSmallScreen = false;

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
				var header = DOM.find('dt', item)[0];
				var par = header.parentElement;

				if (header === evt.currentTarget) {
					if (!DOM.hasClass(par, 'active')) {
						DOM.addClass(par, 'active');
					}
				} else {
					DOM.removeClass(par, 'active');
				}
			}
		}

		var LetsConnect = function ( dom_id ) {
			DOM_EL = DOM.find(dom_id)[0];
			if (DOM_EL) {
				var headers = DOM.find('dt', DOM_EL);
				var i = headers.length; while (i--) {
					items.push(headers[i].parentElement);
					headers[i].addEventListener("click", activeToggle, false);
					headers[i].addEventListener("touchend", activeToggle, false);

					var headerArrow = DOM.find(".arrow_container", headers[i])[0];
					if (headerArrow) {
						var line1 = Draw.line(0,30,25,54);
						var line2 = Draw.line(50,30,25,54);
						var line3 = Draw.line(25,0,25,54);
						headerArrow.appendChild(line1);
						headerArrow.appendChild(line2);
						headerArrow.appendChild(line3);
					} else {
						console.log ('Warning: .arrow_container not found.');
					}
				}


				// Special hack for webkit rendering issue
				var resizeTimeout;

				// Special hack for webkit rendering issue
				window.addEventListener("resize", resizeThrottler, false);
				actualResizeHandler();
				fixActiveItem();
			}

			function fixActiveItem() {
				var el = DOM.find('.active', DOM_EL)[0];
				DOM.removeClass(el, 'active');
				DOM.offsetHeight;
				setTimeout(function () {
					DOM.addClass(el, 'active');
				}, 20);
			}

			function actualResizeHandler() {
				var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
				if (isSmallScreen && w > 735) {
					isSmallScreen = false;
					fixActiveItem();
				} else if (w < 735) {
					isSmallScreen = true;
				}
			}

			function resizeThrottler() {
				if ( !resizeTimeout ) {
					resizeTimeout = setTimeout(function() {
						resizeTimeout = null;
						actualResizeHandler();
					}, 66);
				}
			}
		}

		var namespace = new NS ( 'components' );
		namespace.LetsConnect = LetsConnect;

	}

	NS.load ( ['lib.DOM', 'lib.Draw' ], classWrapper, this );

})(window.NS);
