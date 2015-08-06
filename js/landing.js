/*global NS*/
NS.baseURL = 'js/';

function landing() {

	// Local vars for Lib access
	var Analytics           = NS.use('lib.Analytics');
	var DOM                 = NS.use('lib.DOM');
	var Draw                = NS.use('lib.Draw');
	var SmoothAnchor        = NS.use('components.SmoothAnchor');
	var Animate             = NS.use('components.Animate');
	var Header              = NS.use('components.Header');
	var WhatWeDo            = NS.use('components.WhatWeDo');
	var HowWeDoIt           = NS.use('components.HowWeDoIt');
	var LetsConnect         = NS.use('components.LetsConnect');
	var Menu                = NS.use('components.Menu');


	// Set up Google Analytics
	// - Hijack exit links for tracking
	var analytics = new Analytics ( "UA-64803192-1" );

	// Header Component
	// - Add arrow lines
	// - Size '.bgtextfill' to the client height
	var header = new Header("#header");

	// What We Do Component
	// - Click/tap listeners to switch offerings.
	var whatwedo = new WhatWeDo("#whatwedo");

	// How We Do It Component
	// - Click/tap listeners to switch steps. Resize render fix
	var howwedoit = new HowWeDoIt("#howwedoit");

	// Let's Connect Component
	// - Add arrow lines
	// - Click/tap listeners to switch. Resize render fix
	var letsconnect = new LetsConnect("#letsconnect");

	// Menu Component
	var menu = new Menu("#navigation", "#menu", "#back_to_top");

	// Animate Component
	// - Triggers 'animate' class on each div when it comes into view
	var animate = new Animate([
		'#navigation',
		'#header',
		'#gettoknowus',
		'#whatwedo',
		'#howwedoit',
		'#letsconnect']);

	// Override anchor links to force a slide transition
	var smoothAnchor = new SmoothAnchor();
}

// Define standard libraries for use, calculate polyfills and load page
var libs = [
	'lib.DOM',
	'lib.Draw',
	'lib.Analytics',
	'components.SmoothAnchor',
	'components.Animate',
	'components.Header',
	'components.Menu',
	'components.WhatWeDo',
	'components.HowWeDoIt',
	'components.LetsConnect' ];

var polyfills = [];

NS.load (libs.concat(polyfills), landing, this);

