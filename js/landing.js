// Set the global path to javascript files for NS
NS.baseURL = 'js/';

// Page level callback
function landing() {

	/**********************************************************************/
	/************************** Google Analytics **************************/
	/**********************************************************************/

	var Analytics           = NS.use('lib.Analytics');
	var analytics           = new Analytics ( "UA-64803192-1" );

	var DOM                 = NS.use('lib.DOM');
	var Draw                = NS.use('lib.Draw');

	var header = DOM.find('#header');


	// Create arrow lines for header
	var headerArrow = DOM.find(".arrow-container", header)[0];
	var line1 = Draw.line(0,30,25,54);
	var line2 = Draw.line(50,30,25,54);
	var line3 = Draw.line(25,0,25,54);
	headerArrow.appendChild(line1);
	headerArrow.appendChild(line2);
	headerArrow.appendChild(line3);
}

// List all page dependencies
var libs = [ 'lib.DOM', 'lib.Draw', 'lib.Analytics' ];

// Load all page dependencies and initiate page setup via callback
NS.load ( libs, landing, this);
