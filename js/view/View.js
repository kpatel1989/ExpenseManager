ExpenseManager.Views.DailyExpense = Backbone.View.extend({
	el : null,
	tagName : 'tbody',
	model : null,
	template : null,
    totalExpense : null,

	initialize : function(expenses){
		this.template = _.template( $("#expenseItem").html());
        this.totalExpense = $("#txtTotalExpense")[0];
		this.model = expenses;
		console.log("DailyExpense view initialised");
	},
	events : {
        "click #btnDeleteExpense" : "onDeleteExpenseBtnClick"
    },
    setModel : function(model){
        this.model = model;   
    },
	render : function(event){
		var i,curModel,template ;
		var oExpenseList = this;
        this.clearExpenseTable();
		this.model.each(function(expense){
            element = $(oExpenseList.template(expense.toJSON()))[0];
			$(element).hide().appendTo(oExpenseList.$el[0]).fadeIn(500);
            //oExpenseList.$el[0].append().fadeIn(100);
		});
        this.setTotalExpense();
	},
    clearExpenseTable : function(){
        tableHeader = $("#tableHeader")[0];
        headerParent = tableHeader.parentNode;
        while(tableHeader.nextSibling){
            headerParent.removeChild(tableHeader.nextSibling);
        }
    },
    addNewExpense : function(expense){
        this.model.add(expense);
        element = $(this.template(expense.toJSON()))[0];
        $(element).hide().appendTo(this.$el[0]).fadeIn(500);
        //this.$el[0].append(this.template(expense.toJSON())).fadeIn(100);
        this.setTotalExpense();
    },
    setTotalExpense : function(){
        var total = 0.0;
        this.model.each(function(expense){
            total += parseFloat(expense.uAmount);
        });
        this.totalExpense.innerHTML = parseFloat(total).toFixed(2);
    },
    onDeleteExpenseBtnClick : function(evt){
        var row = evt.target.parentNode.parentNode;
        var inputField = row.getElementsByTagName("input");
        var idField;
        for(var field in inputField){
            if (inputField[field].id.indexOf(ExpenseManager.StringConstants.InitExpenseInputField)==0){
                idField = inputField[field];
                break;
            }
        }
        var id=idField.id.substring(ExpenseManager.StringConstants.InitExpenseInputField.length);
        var expenseModel = this.model.where({uExpenseId : parseInt(id)});
        this.model.remove(expenseModel);
        this.removeExpense(row);
        this.trigger(ExpenseManager.StringConstants.strDeleteExpense,id);
    },
    removeExpense : function(row){
        row.parentNode.removeChild(row);
        this.setTotalExpense();
    }
});

ExpenseManager.Views.AddExpense = Backbone.View.extend({
    m_txtTodayDate : null,
	m_cmbCategory : null,
	m_txtAmount : null,
	m_txtNotes : null,
	m_btnSave : null,
    m_txtCategoryName : null,

	initialize : function(){
		this.m_txtTodayDate = $('#TodayDate');
        this.m_txtTodayDate.datepicker();
        this.m_txtTodayDate.datepicker("option",{"dateFormat":"yy-mm-dd","showAnim":"slideDown"});
        today = new Date();
        var month = (today.getMonth() + 1);
        month = month < 10 ? '0' + month : month;
		var date = (today.getDate());
		date = date < 10 ? '0' + date : date;
        this.m_txtTodayDate[0].value = today.getFullYear() + "-" + month + "-" + date;

        this.m_cmbCategory = $("#cmbCategory")[0];
        this.m_txtAmount = $("#txtExpense")[0];
        this.m_txtNotes = $("#txtNotes")[0];
        this.m_btnSave = $("#btnSave")[0];
        this.m_txtCategoryName = $("#txtExpenseCategoryName")[0];
	},

	render : function(){

	},
    events : {
        "click #btnSave" : "onSaveBtnClick",
        "change #TodayDate" : "onDateChange"
    },
    onSaveBtnClick : function(evt){
        expense = {
            operation : "addExpense",
			category:this.m_txtCategoryName.value.trim(),
			date : this.m_txtTodayDate[0].value.trim(),
			value : this.m_txtAmount.value.trim(),
			notes : this.m_txtNotes.value.trim()
		};
        if (expense.category == "" || expense.date == "" || expense.value == "")
        {
            return;
        }
        this.trigger(ExpenseManager.StringConstants.strSaveExpenseBtnClick,expense);
    },
    onDateChange : function(evt){
        date = this.m_txtTodayDate[0].value;
        this.trigger(ExpenseManager.StringConstants.strDateChange,date);
    }

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
			categoryName : $("#txtCategoryName")[0].value.trim()
		};
        if (category.categoryName == "")
        {
            return;
        }
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
        this.addOption(category);
    },
    addOption : function(category){
        var option = document.createElement("option");
        option.value = category.uCategoryId;
        option.innerHTML = category.strCategory;
        this.dropDown.appendChild(option);
    },
    events : {
      "click #btnDeleteCategory" : "onDeleteBtnClick"
    },
    onDeleteBtnClick : function(evt){
        var parent = evt.target.parentNode;
        var inputField = parent.getElementsByTagName("input");
        var idField;
        for(var field in inputField){
            if (inputField[field].id.indexOf(ExpenseManager.StringConstants.InitCategoryInputField)==0){
                idField = inputField[field];
                break;
            }
        }
        var id=idField.id.substring(ExpenseManager.StringConstants.InitCategoryInputField.length);
        var categoryModel = this.model.where({uCategoryId : parseInt(id)});
        this.model.remove(categoryModel);
        this.removeCategory(idField);
        this.trigger(ExpenseManager.StringConstants.strDeleteCategory,id);
    },
    removeCategory : function(inputField){
        var parent = inputField.parentNode;
        parent.parentNode.removeChild(parent);
        var id=inputField.id.substring(ExpenseManager.StringConstants.InitCategoryInputField.length);
        this.removeOption(id);
    },
    removeOption : function(id){
        var cmbParent = document.getElementById('cmbCategory');
		var options = cmbParent.options;
		for(var i=0; i<options.length; i++){
			if (options[i].value == id){
				cmbParent.removeChild(options[i]);
			}
		}
    }
});
