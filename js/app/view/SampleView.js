(function(NS){
	"use strict";

	function classWrapper () {

		//---------------------------------------------------------------
		//------------------ Global Vars and Libs -----------------------
		//---------------------------------------------------------------

		var Events = NS.use('lib.Events');
		var Delegate = NS.use('lib.Delegate');
		var CONST = NS.use('app.model.CONST');

		//---------------------------------------------------------------
		//---------------------- Constructor ----------------------------
		//---------------------------------------------------------------


		/**
		 * Sample view class
		 * @param {DOM Object id} ui
		 * @public
		 */
		var SampleView = function ( ui ) {
			this.ui = ui;
			this.el = document.getElementById(ui);

			// Event Subscriptions
			Events.subscribe (CONST.DATA_EVENT_NAME_1, Delegate(this._onSampleDataEvent, this));
		};


		//---------------------------------------------------------------
		//------------------------ Methods ------------------------------
		//---------------------------------------------------------------


		var p = SampleView.prototype;


		//---------------------------------------------------------------
		//------------------------ Internal -----------------------------
		//---------------------------------------------------------------

		/**
		 * Handler when sample data event
		 * @param {String} data [Sample data from model]
		 * @private
		 */
		p.onSampleDataEvent = function ( data ) {
			console.log ( 'SampleView::onSampleDataEvent -', data );
		};

		var namespace = new NS ( 'app.view' );
		namespace.SampleView = SampleView;

	}

	NS.load ( ['lib.Events', 'lib.Delegate', 'app.model.CONST'], classWrapper, this);

})(window.NS);
