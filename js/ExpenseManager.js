var model_UserData;
var homeUI;
$(document).ready(function(){
    model_UserData = new ExpenseManager.Models.UserData();
    homeUI = new ExpenseManager.Views.HomeUI();
    homeUI.setModel(model_UserData);
    
    model_UserData.loadTodaysExpenses();
    model_UserData.loadCategories();
});

function ajaxRequest(url,data,onSuccess,onError){
	$.ajax({
		type:'POST',
		cache : false,
		dataType:'json',
		data:data,
		url : url,
		success : function(data){
			onSuccess(data);
		},
		error : function(data){
			onError(data);
		}
	});
}
