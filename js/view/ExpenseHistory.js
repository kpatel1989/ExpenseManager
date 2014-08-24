ExpenseManager.Views.ExpenseHistory = Backbone.View.extend({
	m_graph : null,
	m_graphMenu : null,
	m_Chart : null,
	m_month : null,
	m_ReportType : null,
	m_GraphType : null,

	initialize : function(){
		this.m_graph = $("#graph");
		this.m_graphMenu  = new ExpenseManager.Views.GraphMenu({el : "#graphMenu"});
		this.listenTo(this.m_graphMenu, ExpenseManager.StringConstants.strExpenseHistoryResponse,this.onMenuBtnClick)
		this.m_month = $("#lstMonth");
		var month = new Date().getMonth();
		document.getElementById('option'+month).selected = true;
		this.m_GraphType = BarChart.GraphType.HORIZONTAL;
	},

	events : {
		"change #lstMonth" : "onMonthChange"
	},
	onMonthChange : function(evt){
		this.sendReportRequest();
	},
   	onMenuBtnClick : function(id){
		this.m_ReportType = id;
		this.sendReportRequest();
	},
	sendReportRequest : function(){

		var date = new Date();
		var month = this.m_month[0].selectedIndex;
		var firstDay = new Date(date.getFullYear(), month, 1);
		var lastDay = new Date(date.getFullYear(), month+1, 0);
		month += 1;

		month = month < 10 ? '0' + month : month;
		var date = (firstDay.getDate());
		date = date < 10 ? '0' + date : date;
		firstDay = firstDay.getFullYear() + "-" + month + "-" + date;

		var date = (lastDay.getDate());
		date = date < 10 ? '0' + date : date;
		lastDay = lastDay.getFullYear() + "-" + month + "-" + date;

		switch (this.m_ReportType)
		{
			case "categoryReport":
				data = {
					"reportType" : "category",
					"startDate"  : firstDay,
					"endDate" : lastDay
				};
				this.m_GraphType = BarChart.GraphType.HORIZONTAL;
				break;
			case "monthlyReport":
				data = {
					"reportType" : "monthly",
					"startDate" : firstDay,
					"endDate" : lastDay
				}
				this.m_GraphType = BarChart.GraphType.HORIZONTAL;
				break;
			case "yearlyReport":

				break;
		}
		url = "/ExpenseManager/bussinesslogic/Reports.php";

		me = this;
		onSuccess = function(response){
			me.showExpenseHistory(response);
		};
		ajaxRequest(url,data, onSuccess, this.getReportError);
  	},
	getReportError : function(response){

	},
	showExpenseHistory : function(response){
		var chartData = {};
		chartData['GraphType'] = this.m_GraphType;
		chartData['XAxisTitle'] = "x axis";
		chartData['YAxisTitle'] = 'y axis';
		chartData['ChartTitle'] = response.reportType;
		chartData['AxisData'] = [];
		chartData['Values'] = [];
		var reportData = response.reportData;
		for (i=0;i<reportData.length;i++)
		{
			chartData['AxisData'][i] = reportData[i]['source'];
			chartData['Values'][i] = parseFloat(reportData[i]['total']);
		}


		if (!this.chart)
			this.chart = new BarChart({el : "#graph"});

		this.m_ChartModel = new BarChartModel();
		this.chart.setModel(this.m_ChartModel);
		this.m_ChartModel.setData(chartData);

	}
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
		this.trigger(ExpenseManager.StringConstants.strExpenseHistoryResponse,id);
	}
})
