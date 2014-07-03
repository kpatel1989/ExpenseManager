//configuring Require.js and loading initially important dependencies.
/*
require.config({
	paths : {
		jQuery : 'lib/jquery/jquery-1.11.0',
		Underscore : 'lib/underscore/underscore',
		Backbone : 'lib/backbone/backbone',
	}
});

require([
     'app',
     'order!lib/jquery/jquery-1.11.0.min',
     'order!lib/underscore/underscore-min',
     'order!lib/backbone/backbone-min'
], function(App){
	App.initalize();
})
*/

	window.ExpenseManager = {
		Models : {},
		Collections : {},
		Views : {}
	};
	
	/*window.template = function(id){
		return _.template("#" id).html();
	};*/
