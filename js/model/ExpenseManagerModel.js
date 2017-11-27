ExpenseManager.Models.ExpenseManagerModel = Backbone.Model.extend({
	model_UserData : null,

	initialize : function(){
		this.model_UserData = new ExpenseManager.Models.UserData();
        this.model_UserData.loadTodaysExpenses();
		this.model_UserData.loadCategories();
	},
	getUserDataModel : function(){
		return this.model_UserData;
	},
});
