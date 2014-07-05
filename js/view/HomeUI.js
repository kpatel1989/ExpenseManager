ExpenseManager.Views.HomeUI = Backbone.View.extend({
	m_AddExpense : null,
	m_AddCategory : null,
	m_tblTodaysExpenses : null,
	m_tblCategories : null,
	m_Model : null,
    
    
	initialize : function() {
        this.m_AddExpense = new ExpenseManager.Views.AddExpense({el : "#addExpense"});
        this.m_AddCategory = new ExpenseManager.Views.AddCategory({el : "#addCategory"});
        this.m_tblTodaysExpenses = new ExpenseManager.Views.DailyExpense({el : "#expenseTable"});
        this.m_tblCategories = new ExpenseManager.Views.Categories({el : "#categoryList"});
        this.listenTo(this.m_AddExpense,ExpenseManager.StringConstants.strSaveExpenseBtnClick,this.saveExpenseBtnClick);
        this.listenTo(this.m_AddCategory,ExpenseManager.StringConstants.strSaveCategoryBtnClick,this.saveCategoryBtnClick);
	},
	
	render : function(){
		
	},
    
    setModel : function(model){
        this.m_Model = model;
        this.listenTo(this.m_Model,ExpenseManager.StringConstants.strTodaysExpenseLoaded,this.loadTodaysExpenses);
        this.listenTo(this.m_Model,ExpenseManager.StringConstants.strCategoriesLoaded,this.loadCategories);
        this.listenTo(this.m_Model,ExpenseManager.StringConstants.strNewExpenseSaved,this.addNewExpense);
        this.listenTo(this.m_Model,ExpenseManager.StringConstants.strNewCategorySaved,this.addNewCategory);
    },
    loadTodaysExpenses : function(expenses){
//        var i=0;
        
        /*var lstExpenses = new ExpenseManager.Collections.DailyExpense();
        var expense;
        for(;i<expenses.length;i++){
            expense = new ExpenseManager.Models.DailyExpense(expenses[i]);
            lstExpenses.add(expense);
        }*/

        this.m_tblTodaysExpenses.setModel(expenses);
        this.m_tblTodaysExpenses.render();
    },
    
    loadCategories : function(categories){
//        var lstCategories = new ExpenseManager.Collections.Category();
//        var category;
        var listParent = document.getElementById('categoryList');
        var cmbParent = document.getElementById('cmbCategory');
        //categories = response.arrCategoryNames;
        listParent.innerHTML = "";
        cmbParent.innerHTML = "";
//        var i=0;
//        for(;i<categories.length;i++){
//            category = new ExpenseManager.Models.Category(categories[i]);
//            lstCategories.add(category);
//        }
        this.m_tblCategories.setModel(categories);
        this.m_tblCategories.render();
    },
    saveExpenseBtnClick : function(expense){
        this.m_Model.addExpenseRow(expense);
    },
    saveCategoryBtnClick : function(category){
        this.m_Model.addCategory(category);
    },
    addNewExpense : function(expense){
        this.m_tblTodaysExpenses.addNewExpense(expense);
    },
    addNewCategory : function(category){
        this.m_tblCategories.addNewCategory(category);
    }
});

