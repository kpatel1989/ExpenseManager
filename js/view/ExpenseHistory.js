ExpenseManager.Views.ExpenseHistory = Backbone.View.extend({
	m_graph : null,
	m_graphMenu : null,
	m_Chart : null,

	initialize : function(){
		this.m_graph = $("#graph");
		this.m_graphMenu  = new ExpenseManager.Views.GraphMenu({el : "#graphMenu"};

		m_Chart = new BarChart();
	},

});

ExpenseManager.Views.GraphMenu = Backbone.View.extend({
	el : null,

	initialize : function(){

	},
	events : {
		"click .graphMenuItem" : "onGraphMenuClick"
	},
	onGraphMenuClick : function(evt){
		var id = evt.target.id;
		this.sendReportRequest(id);

	},
	GetReportData : function(id){

		switch (id)
		{
			case "categoryReport":
				data = {
					"reportType" : "categoryReport",
					""  : ""
				};
				break;
			case "monthlyReport":

				break;
			case "yearlyReport":

				break;
		}
  	},
})
