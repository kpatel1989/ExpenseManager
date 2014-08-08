ExpenseManager.Views.Menu = Backbone.View.extend({
    el : null,
    btnHome : null,
    btnCategories : null,
    btnExpenseHistory : null,
    btnUploadPastExpense : null,
    btnProfileSettings : null,
    initialize : function(){

    },
    events : {
        "click .menuItem" : "menuBtnClick"
    },

    menuBtnClick : function(evt){
        var id = evt.target.id;
		if (evt.target.className == "menuItemChild")
		{
			id = evt.target.parentNode.id;
		}
        this.trigger(ExpenseManager.StringConstants.strMenuBtnClick,id);
    },

});
