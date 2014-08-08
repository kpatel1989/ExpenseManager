ExpenseManager.Views.ExpenseManagerCtrlr = Backbone.View.extend({
    model : null,
    homeUI : null,
    menu : null,
    el : null,
    currentWindow : null,
	chart : null,
    initialize : function(){
        this.currentWindow = $("homeUI");

        this.homeUI = new ExpenseManager.Views.HomeUI();

		this.model = new ExpenseManager.Models.ExpenseManagerModel();
		this.homeUI.setModel(this.model.getUserDataModel());

        this.menu = new ExpenseManager.Views.Menu({el : "#menu"});
        this.listenTo(this.menu,ExpenseManager.StringConstants.strMenuBtnClick,this.onMenuBtnClick);

		this.currentWindow = $("#homeUI");
		$("#categories").hide();
		$("#expenseHistory").hide();
		$("#importExpense").hide();
    },

    onMenuBtnClick : function(buttonId){
       this.currentWindow.hide();
        switch(buttonId){
            case "btnhome" :
                $("#homeUI").show();
                this.currentWindow = $("#homeUI");
				this.model.load
                //flipTo($("#homeUI")[0]);
            break;
            case "btncategories" :
                $("#categories").show();
                this.currentWindow = $("#categories");
                //flipTo($("categories")[0]);
            break;
            case "btnexpenseHistory" :
                $("#expenseHistory").show();
                this.currentWindow = $("#expenseHistory");
				if (!this.chart)
					this.chart = new BarChart();

				data = {
					'GraphType' : BarChart.GraphType.HORIZONTAL,
					'YAxisData' : [200,300,400,500,600],
					'XAxisData' : ['a','b','c','d','e'],
					'Values' : [1,2,3,4,5],
					'XAxisTitle' : "x axis",
					'YAxisTitle' : 'y axis',
					'ChartTitle' : 'new bar chart',
				};
				this.chart.initialize(data);
				this.chart.render($("#graph")[0]);
                //flipTo($("expenseHistory")[0]);
            break;
            case "btnimportExpense" :
                $("#importExpense").show();
                this.currentWindow = $("#importExpense");
                //flipTo($("importExpense")[0]);
            break;
            case "btnprofileSettings" :
                $("#profileSettings").show();
                this.currentWindow = $("#profileSettings");
                //flipTo($("profileSettings")[0]);
            break;
        }
    },
});
