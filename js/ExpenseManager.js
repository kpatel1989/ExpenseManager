var model_UserData;
var homeUI;
$(document).ready(function(){
    model_UserData = new ExpenseManager.Models.UserData();
    homeUI = new ExpenseManager.Views.HomeUI();
    homeUI.setModel(model_UserData);
    
    model_UserData.loadTodaysExpenses();
    model_UserData.loadCategories();

    //fillExpenseTable();
	//fillCategoryList();
    return;
	$("#TodayDate").datepicker();
	$("#TodayDate").datepicker("option",{"dateFormat":"yy-mm-dd","showAnim":"slideDown"});
	today = new Date();
	$("#TodayDate")[0].value = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
	//new DateWheel($("#dateWheel")[0]);
	fillExpenseTable();
	fillCategoryList();
	
	$("#btnSave").click(function(){
		data = {
			category:$("#cmbCategory")[0].selectedOptions[0].value,
			date : $("#TodayDate")[0].value,
			value : $("#txtExpense")[0].value,
			notes : $("#notes")[0].value
		};
		url = "bussinesslogic/SaveExpense.php";
		ajaxRequest(url,data, onExpenseAdded, onError);
		
		function onExpenseAdded(response){
			headerParent = $("#expenseTable")[0];
			AddExpenseDataToRow(headerParent,response['uCategory'],response['uAmount'],response['uExpenseId']);
		}
		function onError(response){
			
		}
	});
	$("#TodayDate").change(function(){
		fillExpenseTable();
	});
	
	
	$("#btnAddCategory").click(function(){
        return;
		url = "bussinessLogic/CategoryList.php";
		data = {
			operation : "add",
			categoryName : $("#txtCategoryName")[0].value
		};
		ajaxRequest(url,data,onSuccessfullAdd,onError);
		
		function onSuccessfullAdd(response){
			var newCategory = response.categoryData;
			var listParent = document.getElementById('categoryList');
			var cmbParent = document.getElementById('cmbCategory');
			addCategoryToList(listParent,cmbParent,newCategory['strCategory'],newCategory['uCategoryId']);
		}
		function onError(response){
			
		}
	});
	
	
});

function OnSaveExpenseClicked(data){
    url = "bussinesslogic/SaveExpense.php";
    ajaxRequest(url,data, onExpenseAdded, onError);
    var me = this;
    function onExpenseAdded(response){
        model_UserData.AddExpenseRow(response);
        return;
        headerParent = $("#expenseTable")[0];
        me.AddExpenseDataToRow(headerParent,response['uCategory'],response['uAmount'],response['uExpenseId']);
    }
    function onError(response){
    }
}
/*

function fillExpenseTable(){
	url = "bussinesslogic/TodaysExpense.php";
	data = {
		date : $("#TodayDate")[0].value
	}
	ajaxRequest(url,data, onSuccess, onError)
	function onSuccess(response){
		//updateExpenseTable(response.expenses);
		updateExpenseModel(response);
	};
	function onError(response){
		
	};
}

function updateExpenseModel(data){
	var expenses = data.expenses;
	var i=0;
	var userData = new ExpenseManager.Models.UserData();
	var lstExpenses = new ExpenseManager.Collections.DailyExpense();
	var expense;
	for(;i<expenses.length;i++){
		expense = new ExpenseManager.Models.DailyExpense(expenses[i]);
		lstExpenses.add(expense);
	}
	userData.set({lstTodaysExpenses : lstExpenses})
	var expenseView = new ExpenseManager.Views.DailyExpense(lstExpenses);
	expenseView.render();
}

function updateExpenseTable(data)
{
	tableHeader = document.getElementById('tableHeader');
	headerParent = tableHeader.parentNode;
	clearExpenseTable(tableHeader);
	for (i=0;i<data.length;i++){
		AddExpenseDataToRow(headerParent,data[i]['strCategory'],data[i]['uAmount'],data[i]['uExpenseId']);
	}
}

function clearExpenseTable(){
	tableHeader = document.getElementById('tableHeader');
	headerParent = tableHeader.parentNode;
	while(tableHeader.nextSibling){
		headerParent.removeChild(tableHeader.nextSibling);
	}
}

function AddExpenseDataToRow(parent,categoryName,amount,id){
	
	var tr = document.createElement("tr");	
	parent.appendChild(tr);
	var trcategory = document.createElement("td");
	tr.appendChild(trcategory);
	trcategory.innerHTML = categoryName;
	
	var tramount = document.createElement("td");
	tr.appendChild(tramount);
	tramount.innerHTML = amount;
	
	var deleteExpense = document.createElement("td");
	tr.appendChild(deleteExpense);
	deleteExpense.className = "delete";
	deleteExpense.appendChild(createHiddenField(id));
	
	var deleteBtn = document.createElement("input");
	deleteBtn.type = "button";
	deleteBtn.value ="Delete";
	deleteBtn.className = "deleteExpense";	
	deleteExpense.appendChild(deleteBtn);
	deleteExpense.addEventListener("click",OnDeleteExpenseBtnPress,false);
	
}

function OnDeleteExpenseBtnPress(evt){
	var me = evt.target;
	url = "bussinessLogic/DeleteExpense.php";
	data = {
		operation : "delete",
		expenseId : me.previousSibling.value
	};
	ajaxRequest(url,data,OnSuccessfullDelete,OnError);
	
	function OnError(response){
		
	};
	function OnSuccessfullDelete(){
		var row = me.parentNode.parentNode;
		row.parentNode.removeChild(row);
	}
}

function createHiddenField(value){
	var hiddenField = document.createElement("input");
	hiddenField.type = "hidden";
	hiddenField.value = value;
	return hiddenField;
} 

function fillCategoryList(){
	ajaxRequest("bussinessLogic/CategoryList.php","",onSuccess,onError);
	function onSuccess(response){
		var listParent = document.getElementById('categoryList');
		var cmbParent = document.getElementById('cmbCategory');
		categories = response.arrCategoryNames;
		listParent.innerHTML = "";
		cmbParent.innerHTML = "";
		for(i=0;i<categories.length;i++){
			addCategoryToList(listParent,cmbParent,categories[i]["strCategory"],categories[i]['uCategoryId']);
			
		}
	}
	function onError(response){
		
	}
}

function addCategoryToList(parent,cmbParent,categoryName,id){
	var li = document.createElement('li');
	parent.appendChild(li);
	
	var divCategory = document.createElement("div");
	li.appendChild(divCategory);
	var imgDeleteCategory = document.createElement("img");
	divCategory.appendChild(document.createTextNode(categoryName));
	divCategory.appendChild(imgDeleteCategory);
	divCategory.appendChild(createHiddenField(id));
	
	var deleteBtn = document.createElement("input");
	deleteBtn.type = "button";
	deleteBtn.value ="Delete";
	deleteBtn.className = "deleteCategory";	
	divCategory.appendChild(deleteBtn);
	deleteBtn.addEventListener("click",OnDeleteCategoryBtnPress,false);
	
	var option = document.createElement("option");
	option.value = id;
	option.innerHTML =categoryName;
	cmbParent.appendChild(option);	
}

function OnDeleteCategoryBtnPress(evt){
	var me = evt.target;
	url = "bussinessLogic/DeleteCategory.php";
	data = {
		operation : "delete",
		categoryId : me.previousSibling.value
	};
	ajaxRequest(url,data,OnSuccessfullDelete,OnError);
	
	function OnError(response){
		
	};
	function OnSuccessfullDelete(){
		var li = me.parentNode;
		li.parentNode.removeChild(li);
		var cmbParent = document.getElementById('cmbCategory');
		var options = cmbParent.options;
		for(var i=0; i<options.length; i++){
			if (options[i].value == me.previousSibling.value){
				cmbParent.removeChild(options[i]);
			}
		}
	}
}
*/
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
