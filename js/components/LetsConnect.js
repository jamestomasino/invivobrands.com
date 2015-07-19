(function (NS) {
	"use strict";

	function classWrapper() {

		var DOM = NS.use('lib.DOM');
		var Draw = NS.use('lib.Draw');
		var Debounce = NS.use('lib.Debounce');
		var items = [];
		var isSmallScreen = false;
		var letsConnect;
		var letsConnectQuestion;
		var letsConnectOutro;

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
						DOM.addClass(letsConnectOutro, 'active');
					}
				} else {
					DOM.removeClass(par, 'active');
				}
			}
		}

		function fixActiveItem() {
			var el = DOM.find('.active', letsConnect)[0];
			DOM.removeClass(el, 'active');
			DOM.offsetHeight;
			setTimeout(function () {
				DOM.addClass(el, 'active');
			}, 20);
		}

		function resizeHandler() {
			var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
			if (isSmallScreen && w > 735) {
				isSmallScreen = false;
				fixActiveItem();
			} else if (w < 735) {
				isSmallScreen = true;
			}
		}

		var LetsConnect = function ( dom_id ) {
			letsConnect = DOM.find(dom_id);
			letsConnectQuestion = DOM.find('.letsconnect_question', letsConnect)[0];
			letsConnectOutro = DOM.find('.letsconnect_outro', letsConnect)[0];

			var headers = DOM.find('dt', letsConnectQuestion);
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
			window.addEventListener("resize", Debounce(resizeHandler, 66, true, true), false);
			resizeHandler();
			fixActiveItem();


		}

		var namespace = new NS ( 'components' );
		namespace.LetsConnect = LetsConnect;

	}

	NS.load ( ['lib.DOM', 'lib.Draw', 'lib.Debounce' ], classWrapper, this );

})(window.NS);
