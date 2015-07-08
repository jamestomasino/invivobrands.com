// Set the global path to javascript files for NS
NS.baseURL = 'js/';

function landing() {

	// Local vars for Lib access
	var Analytics           = NS.use('lib.Analytics');
	var DOM                 = NS.use('lib.DOM');
	var Draw                = NS.use('lib.Draw');

	// Set up Google Analytics
	var analytics           = new Analytics ( "UA-64803192-1" );

	// Create arrow lines for header
	var header = DOM.find('#header');
	var headerArrow = DOM.find(".arrow-container", header)[0];
	var line1 = Draw.line(0,30,25,54);
	var line2 = Draw.line(50,30,25,54);
	var line3 = Draw.line(25,0,25,54);
	headerArrow.appendChild(line1);
	headerArrow.appendChild(line2);
	headerArrow.appendChild(line3);

	// Accordion support for What We Do
	var whatWeDoContent = DOM.find(".whatwedo-content")[0];
	var headers = DOM.find('h3', whatWeDoContent);
	var i = headers.length; while (i--) {
		headers[i].addEventListener("click", function (e) {
			var list = DOM.find('ul', e.target.parentElement)[0];
			DOM.toggleClass(list, "active");
			DOM.toggleClass(e.target, "active");
		}, false);
	}
}

// Define standard libraries for use, calculate polyfills and load page
var libs = [ 'lib.DOM', 'lib.Draw', 'lib.Analytics' ];
var polyfills = [];

if (!document.addEventListener) {
	polyfills.push("polyfill.addEventListener");
}

NS.load ( libs.concat(polyfills), landing, this);

