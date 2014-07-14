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
	id = $row['max(uExpenseId)'] +1;
	
	$columns = array('uExpenseId','category','date','value');
	$qry = "insert into tbldailyExpense (uExpenseId,uCategoryId,dtExpenseDate,uAmount,notes) values (". id . "," . $_POST['category'] . ",'" . $_POST['date'] ."'," . $_POST['value'] .",'" . $_POST['notes'] ."')";
	
	//$dmlQuery->insert('tbldailyExpenses',$columns,$data);
	if (mysqli_query($con,$qry))
    {
        $qry = "select strName from tblCategories where uCategoryId=".$_POST['category'];
        $result = mysqli_query($con,$qry);
        $catRow = mysqli_fetch_assoc($result);
        $config->disconnect($con);

        $qry = "select * from tbldailExpense ex, tblCategories cat where uExpenseId =" . id . " and ex.uCategoryId = cat.uCategoryId";
        $result = mysqli_query($con,$qry);
        $row = mysqli_fetch_assoc($result);
        $response["bSuccessfull"] = TRUE;
        $response["uExpenseId"] = id;
        $response['strCategory'] = $row['strName'];
        $response['uAmount'] = $row['uAmount'];
        $response['notes'] = $row['notes'];
    }
}
else{
	$response["bSuccessfull"] = FALSE;
}
echo json_encode($response);

?>
