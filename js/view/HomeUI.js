ExpenseManager.Views.HomeUI = Backbone.View.extend({
	m_AddExpense : null,
	m_AddCategory : null,
	m_tblTodaysExpenses : null,
	m_tblCategories : null,
	m_Model : null,
    
    
	initialize : function() {
        this.m_AddExpense = new ExpenseManager.Views.AddExpense({el : "#addExpense"});
        this.m_AddCategory = new ExpenseManager.Views.AddCategory({el : "#addCategory"});
        this.m_tblTodaysExpenses = new ExpenseManager.Views.DailyExpense();
        this.m_tblCategories = new ExpenseManager.Views.Categories();
        
       // this.loadTodaysExpenses();
        //this.loadCategories();
	},
	
	render : function(){
		
	},
    
    setModel : function(model){
        this.m_Model = model;
        this.listenTo(this.m_Model,this.m_Model.strTodaysExpenseLoaded,this.updateExpenseModel);
        this.listenTo(this.m_Model,this.m_Model.strCategoriesLoaded,this.loadCategories);
    },
    loadTodaysExpenses : function(){
        url = "bussinesslogic/TodaysExpense.php";
        data = {
            date : $("#TodayDate")[0].value
        }
        ajaxRequest(url,data, onSuccess, onError)
        var me = this;
        function onSuccess(response){
            
            me.updateExpenseModel(response);
        };
        function onError(response){
        }
    },
    
    updateExpenseModel : function(expenses){
        //var expenses = data.expenses;
        var i=0;
        
        var lstExpenses = new ExpenseManager.Collections.DailyExpense();
        var expense;
        for(;i<expenses.length;i++){
            expense = new ExpenseManager.Models.DailyExpense(expenses[i]);
            lstExpenses.add(expense);
        }
        this.m_Model.set({lstTodaysExpenses : lstExpenses});
        this.m_tblTodaysExpenses.setModel(lstExpenses);
        this.m_tblTodaysExpenses.render();
    },
    
    loadCategories : function(categories){
        var lstCategories = new ExpenseManager.Collections.Category();
        var category;
        var listParent = document.getElementById('categoryList');
        var cmbParent = document.getElementById('cmbCategory');
        //categories = response.arrCategoryNames;
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
    },
    updateCategories : function(categories)
    {
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
            //this.m_Model.set({lstCategories : lstCategories});
            this.m_tblCategories = new ExpenseManager.Views.Categories(lstCategories);
            this.m_tblCategories.render();
    }
});

ExpenseManager.Views.AddExpense = Backbone.View.extend({
    m_txtTodayDate : null,
	m_cmbCategory : null,
	m_txtAmount : null,
	m_txtNotes : null,
	m_btnSave : null,
	
	initialize : function(){
		this.m_txtTodayDate = $('#TodayDate');
        this.m_txtTodayDate.datepicker();
        this.m_txtTodayDate.datepicker("option",{"dateFormat":"yy-mm-dd","showAnim":"slideDown"});
        today = new Date();
        this.m_txtTodayDate[0].value = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
        
        this.m_cmbCategory = $("#cmbCategory")[0];
        this.m_txtAmount = $("#txtExpense")[0];
        this.m_txtNotes = $("#txtNotes")[0];
        this.m_btnSave = $("#btnSave")[0];
	},
	
	render : function(){
		
	},
    events : {
        "click #btnSave" : "onSaveBtnClick"
    },
    onSaveBtnClick : function(evt){
        data = {
			category:this.m_cmbCategory.selectedOptions[0].value,
			date : this.m_txtTodayDate[0].value,
			value : this.m_txtAmount.value,
			notes : this.m_txtNotes.value
		};
		url = "bussinesslogic/SaveExpense.php";
		ajaxRequest(url,data, onExpenseAdded, onError);
		var me = this;
		function onExpenseAdded(response){
			headerParent = $("#expenseTable")[0];
			me.AddExpenseDataToRow(headerParent,response['uCategory'],response['uAmount'],response['uExpenseId']);
		}
		function onError(response){
        }
    },
    AddExpenseDataToRow : function(){
        console.log("Expense saved");
    }
});

ExpenseManager.Views.AddCategory = Backbone.View.extend({
	m_txtCategory : null,
	m_btnSave : null,
	
	initialize : function(){
		
	},
	
	render : function(){
		
	},
});