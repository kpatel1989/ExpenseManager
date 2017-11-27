ExpenseManager.Views.ExpenseManagerCtrlr = Backbone.View.extend({
    model : null,
    homeUI : null,
    menu : null,
    el : null,
    currentWindow : null,
	//chart : null,
	expenseHistory : null,

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
				if (!this.expenseHistory)
				{
					this.expenseHistory = new ExpenseManager.Views.ExpenseHistory({$el : "#expenseHistory"});
				}
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
