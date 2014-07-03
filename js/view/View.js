ExpenseManager.Views.DailyExpense = Backbone.View.extend({
	el : null,
	tagName : 'tr',
	model : null,
	template : null,
	initialize : function(expenses){
		this.template = _.template( $("#expenseItem").html());
		this.$el = $("#expenseTable")[0];
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
			oExpenseList.$el.innerHTML += oExpenseList.template(expense.toJSON());
		});
	},
})

ExpenseManager.Views.Categories = Backbone.View.extend({
    el : null,
    tagName : "li",
    model : null,
    template : null,
    dropDown : null,
    
    initialize : function(cateogory){
        this.template = _.template( $("#categoryItem").html());
        this.$el = $("#categoryList")[0];
        this.dropDown = $("#cmbCategory")[0];
        this.model = cateogory;
        console.log("Cateogory initialised.");
    },
    
    render : function(){
        var me = this;
        this.model.each(function(category){
            me.$el.innerHTML += me.template(category.toJSON());
            
            var option = document.createElement("option");
            option.value = category.uCategoryId;
            option.innerHTML = category.strCategory;
            me.dropDown.appendChild(option);	
        });
        
    }
    
});
