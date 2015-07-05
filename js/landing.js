// Set the global path to javascript files for NS
var NS = window.NS;
NS.baseURL = 'js/';

// Page level callback
function landing() {

	/**********************************************************************/
	/************************** Google Analytics **************************/
	/**********************************************************************/

	var Analytics           = NS.use('lib.Analytics');
	var analytics           = new Analytics ( "UA-64803192-1" );
}

// List all page dependencies
var libs = [ 'lib.DOM', 'lib.Analytics' ];

// Load all page dependencies and initiate page setup via callback
NS.load ( libs, landing, this);
