/*global NS*/
NS.baseURL = 'js/';

function landing() {

	// Local vars for Lib access
	var Analytics           = NS.use('lib.Analytics');
	var DOM                 = NS.use('lib.DOM');
	var Draw                = NS.use('lib.Draw');
	var Header              = NS.use('components.Header');
	var HowWeDoIt           = NS.use('components.HowWeDoIt');
	var LetsConnect         = NS.use('components.LetsConnect');
	var Menu                = NS.use('components.Menu');


	// Set up Google Analytics
	var analytics = new Analytics ( "UA-64803192-1" );

	// Header Component
	var header = new Header("#header");

	// How We Do It Component
	var howwedoit = new HowWeDoIt(".howwedoit_content");

	// Let's Connect Component
	var letsconnect = new LetsConnect(".letsconnect_question");

	// Menu Component
	var menu = new Menu("#navigation", "#menu");

}

// Define standard libraries for use, calculate polyfills and load page
var libs = [
	'lib.DOM',
	'lib.Draw',
	'lib.Analytics',
	'components.Header',
	'components.Menu',
	'components.HowWeDoIt',
	'components.LetsConnect' ];

var polyfills = [];

if (!document.addEventListener) {
	polyfills.push("polyfill.addEventListener");
}

NS.load (libs.concat(polyfills), landing, this);

