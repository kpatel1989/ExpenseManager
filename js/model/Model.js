ExpenseManager.Models.DailyExpense = Backbone.Model.extend({
	defaults : {
		strCategory : '',
		notes : "",
		uAmount : 0.0,
		date : '',
		uExpenseId : -1
	},
	initialize : function(data){
		this.date = new Date();
		this.uAmount = data.uAmount;
		this.strCategory = data.strCategory;
		this.uExpenseId = data.uExpenseId;
		console.log("DailyExpense model initailized");
	}
});

ExpenseManager.Collections.DailyExpense = Backbone.Collection.extend({
	model : ExpenseManager.Models.DailyExpense,
});

ExpenseManager.Models.UserData = Backbone.Model.extend({
	strTodaysExpenseLoaded : "todaysExpenseLoaded",
    strCategoriesLoaded : "categoriesLoaded",
    m_UserName : '',
    m_Categories : null,
    m_TodaysExpenses : null,
    
	initialize : function(){
		this.m_TodaysExpenses = new ExpenseManager.Collections.DailyExpense();
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
            me.trigger(me.strTodaysExpenseLoaded,response.expenses);
            //me.updateExpenseModel(response);
        };
        function onError(response){
        }
    },
    loadCategories : function(){
        ajaxRequest("bussinessLogic/CategoryList.php","",onSuccess,onError);
        var me = this;
        function onSuccess(response){
            me.trigger(me.strCategoriesLoaded,response.arrCategoryNames);
            return;
            
            var lstCategories = new ExpenseManager.Collections.Category();
            var category;
            var listParent = document.getElementById('categoryList');
            var cmbParent = document.getElementById('cmbCategory');
            categories = response.arrCategoryNames;
            listParent.innerHTML = "";
            cmbParent.innerHTML = "";
            var i=0;
            for(;i<categories.length;i++){
                //addCategoryToList(listParent,cmbParent,categories[i]["strCategoryName"],categories[i]['uCategoryId']);
                category = new ExpenseManager.Models.Category(categories[i]);
                lstCategories.add(category);
            }
            me.m_Model.set({lstCategories : lstCategories});
            me.m_tblCategories = new ExpenseManager.Views.Categories(lstCategories);
            me.m_tblCategories.render();
        }
        function onError(response){

        }
    }
});

ExpenseManager.Models.Category = Backbone.Model.extend({
    strCategory : null,
    uCategoryId : null,
    
    initialize : function(data)
    {
        this.strCategory = data.strCategoryName;
        this.uCategoryId = data.uCategoryId;
        console.log(" Category Model initialized");
    }
});

ExpenseManager.Collections.Category = Backbone.Collection.extend({
    model : ExpenseManager.Models.Category
});