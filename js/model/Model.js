ExpenseManager.Models.UserData = Backbone.Model.extend({
    m_UserName : '',
    m_Categories : null,
    m_TodaysExpenses : null,
	initialize : function(){
		this.m_TodaysExpenses = new ExpenseManager.Collections.DailyExpense();
        this.m_Categories = new ExpenseManager.Collections.Category();
		console.log("UserData model initialized");
	},
	setData : function(userData){
		if (userData.userName)
			this.m_UserName = userData.userName;
		if (userData.lstCateogories)
			this.m_Cateogries = userData.lstCateogories;
		if (userData.lstTodaysExpense)
			this.m_TodaysExpenses = userData.lstTodaysExpense;
	},
    loadTodaysExpenses : function(){
        url = "bussinesslogic/TodaysExpense.php";
        data = {
            date : $("#TodayDate")[0].value
        }
        ajaxRequest(url,data, onSuccess, onError)
        var me = this;
        function onSuccess(response){
            var expenses = response.expenses;
            me.m_TodaysExpenses.reset();
            for(var i=0;i<expenses.length;i++){
                expense = new ExpenseManager.Models.DailyExpense(expenses[i]);
                me.m_TodaysExpenses.add(expense);
            }
            me.trigger(ExpenseManager.StringConstants.strTodaysExpenseLoaded,me.m_TodaysExpenses);
        };
        function onError(response){
        }
    },
    loadCategories : function(){
        url = "bussinessLogic/CategoryList.php";
        ajaxRequest(url,"",onSuccess,onError);
        var me = this;
        function onSuccess(response){
            var categories = response.arrCategoryNames;
            var lstCategories = new ExpenseManager.Collections.Category();
            for(var i=0;i<categories.length;i++){
                category = new ExpenseManager.Models.Category(categories[i]);
                lstCategories.add(category);
            }

            me.trigger(ExpenseManager.StringConstants.strCategoriesLoaded,lstCategories);

        }
        function onError(response){

        }
    },
    addExpenseRow : function(expense){
        url = "bussinesslogic/SaveExpense.php";
        ajaxRequest(url,expense, onExpenseAdded, onError);
        var me = this;
        function onExpenseAdded(response){
            var newExpense = new ExpenseManager.Models.DailyExpense(response);
            me.m_TodaysExpenses.add(newExpense);
            me.trigger(ExpenseManager.StringConstants.strNewExpenseSaved,newExpense);
        }
        function onError(response){
        }
    },
    addCategory : function(category){
        url = "bussinessLogic/CategoryList.php";
        ajaxRequest(url,category,onSuccessfullAdd,onError);
		var me = this;
		function onSuccessfullAdd(response){
			var newCategory = response.categoryData;
			var categoryModel = new ExpenseManager.Models.Category(newCategory);
			me.m_Categories.add(categoryModel);
            me.trigger(ExpenseManager.StringConstants.strNewCategorySaved,categoryModel);
		}
		function onError(response){

		}
    },
    deleteCategory : function(id){
        url = "bussinessLogic/DeleteCategory.php";
        data = {
            operation : "delete",
            categoryId : id
        };
        ajaxRequest(url,data,OnSuccessfullDelete,OnError);

        function OnError(response){

        };
        function OnSuccessfullDelete(response){

        }
    },
    deleteExpense : function(id){
        url = "bussinessLogic/DeleteExpense.php";
        data = {
            operation : "delete",
            expenseId : id
        };
        ajaxRequest(url,data,OnSuccessfullDelete,OnError);

        function OnError(response){

        };
        function OnSuccessfullDelete(){

        }
    },
});

ExpenseManager.Models.DailyExpense = Backbone.Model.extend({
	defaults : {
		strCategory : '',
		notes : "",
		uAmount : 0.0,
		uExpenseId : -1
	},
	initialize : function(data){
		data.uAmount= parseFloat(data.uAmount).toFixed(2);
		this.uAmount = data.uAmount;
		this.strCategory = data.strCategory;
		this.uExpenseId = data.uExpenseId;
        this.notes = data.notes;
		console.log("DailyExpense model initailized");
	}
});

ExpenseManager.Collections.DailyExpense = Backbone.Collection.extend({
	model : ExpenseManager.Models.DailyExpense,
});

ExpenseManager.Models.Category = Backbone.Model.extend({
    strCategory : null,
    uCategoryId : null,
    
    initialize : function(data)
    {
        this.strCategory = data.strCategory;
        this.uCategoryId = data.uCategoryId;
        console.log(" Category Model initialized");
    }
});

ExpenseManager.Collections.Category = Backbone.Collection.extend({
    model : ExpenseManager.Models.Category
});
