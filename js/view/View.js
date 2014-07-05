ExpenseManager.Views.DailyExpense = Backbone.View.extend({
	el : null,
	tagName : 'tr',
	model : null,
	template : null,
	initialize : function(expenses){
		this.template = _.template( $("#expenseItem").html());
//		this.$el = $("#expenseTable")[0];
		this.model = expenses;
		console.log("DailyExpense view initialised");
	},
	
    setModel : function(model){
        this.model = model;   
    },
	render : function(event){
		var i,curModel,template ;
		var oExpenseList = this;
		this.model.each(function(expense){
			oExpenseList.$el[0].innerHTML += oExpenseList.template(expense.toJSON());
		});
	},
    addNewExpense : function(expense){
        this.model.add(expense);
        this.$el[0].innerHTML += this.template(expense.toJSON());
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
        expense = {
			category:this.m_cmbCategory.selectedOptions[0].value,
			date : this.m_txtTodayDate[0].value,
			value : this.m_txtAmount.value,
			notes : this.m_txtNotes.value
		};
        this.trigger(ExpenseManager.StringConstants.strSaveExpenseBtnClick,expense);
    },

});

ExpenseManager.Views.AddCategory = Backbone.View.extend({
	m_txtCategory : null,
	m_btnSave : null,

	initialize : function(){

	},
    events : {
        "click #btnAddCategory" : "onSaveBtnClick"
    },
    onSaveBtnClick : function(evt){
        category = {
			operation : "add",
			categoryName : $("#txtCategoryName")[0].value
		};
        this.trigger(ExpenseManager.StringConstants.strSaveCategoryBtnClick,category);
    },
	render : function(){

	},
});


ExpenseManager.Views.Categories = Backbone.View.extend({
    el : null,
    tagName : "li",
    model : null,
    template : null,
    dropDown : null,
    
    initialize : function(){
        this.template = _.template( $("#categoryItem").html());
//        this.$el = $("#categoryList")[0];
        this.dropDown = $("#cmbCategory")[0];
        this.model = new ExpenseManager.Collections.Category();
        console.log("Cateogory initialised.");
    },
    
    setModel : function(model){
        this.model = model;
    },

    render : function(){
        var me = this;
        this.model.each(function(category){
            me.$el[0].innerHTML += me.template(category.toJSON());
            
            var option = document.createElement("option");
            option.value = category.uCategoryId;
            option.innerHTML = category.strCategory;
            me.dropDown.appendChild(option);	
        });
    },
    addNewCategory : function(category){
        this.$el[0].innerHTML += this.template(category.toJSON());

        var option = document.createElement("option");
        option.value = category.uCategoryId;
        option.innerHTML = category.strCategory;
        this.dropDown.appendChild(option);
    },
    events : {
      "click #btnDelete" : "onDeleteBtnClick"
    },
    onDeleteBtnClick : function(evt){
        var parent = evt.target.parentNode;
        
    }
});
