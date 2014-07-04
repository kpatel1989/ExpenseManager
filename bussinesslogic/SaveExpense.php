<?php
require_once  './Config.php';
require_once './DatabaseManipulation.php';
if (isset($_POST["category"])){
	$config = Config::getInstance();
	$dmlQuery = DMLQuery::getInstance($config);
	
	$con = $config->connect();
	$qry = "Select max(uExpenseId) from tbldailyexpense";
	$result = mysqli_query($con,$qry);
	$row = mysqli_fetch_assoc($result);
	
	
	$columns = array('uExpenseId','category','date','value');
	$qry = "insert into tbldailyExpense (uExpenseId,uCategoryId,dtExpenseDate,uAmount,notes) values (". ($row['max(uExpenseId)'] +1) . "," . $_POST['category'] . ",'" . $_POST['date'] ."'," . $_POST['value'] .",'" . $_POST['notes'] ."')";
	
	//$dmlQuery->insert('tbldailyExpenses',$columns,$data);
	mysqli_query($con,$qry);
	
	$qry = "select strName from tblCategories where uCategoryId=".$_POST['category'];
	$result = mysqli_query($con,$qry);
	$catRow = mysqli_fetch_assoc($result);
	$config->disconnect($con);
	
	$response["bSuccessfull"] = TRUE;
	$response["uExpenseId"] = $row['max(uExpenseId)'] +1;
	$response['strCategory'] = $catRow['strName'];
	$response['uAmount'] = $_POST['value']; 
}
else{
	$response["bSuccessfull"] = FALSE;
}
echo json_encode($response);

?>
