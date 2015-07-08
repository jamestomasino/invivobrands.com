/*global NS*/
NS.baseURL = 'js/';

function landing() {

	// Local vars for Lib access
	var Analytics           = NS.use('lib.Analytics');
	var DOM                 = NS.use('lib.DOM');
	var Draw                = NS.use('lib.Draw');
	var WhatWeDo            = NS.use('components.WhatWeDo');

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

	// WhatWeDo Component
	var whatwedo = new WhatWeDo(".whatwedo_content");

}

// Define standard libraries for use, calculate polyfills and load page
var libs = [ 'lib.DOM', 'lib.Draw', 'lib.Analytics', 'components.WhatWeDo' ];
var polyfills = [];

if (!document.addEventListener) {
	polyfills.push("polyfill.addEventListener");
}

NS.load ( libs.concat(polyfills), landing, this);

