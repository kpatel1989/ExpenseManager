
$(document).ready(function(){
    var controller = new ExpenseManager.Views.ExpenseManagerCtrlr({el: "#expenseManager"});
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
