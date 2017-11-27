<?php
require_once  './Config.php';
require_once './DatabaseManipulation.php';
$response = array();
$response["bSuccessfull"] = false;
if (isset($_POST['operation']) && $_POST['operation'] == "delete"){
	$config = Config::getInstance();
	$con = $config->connect();
	$qry = "delete from tbldailyexpense where uExpenseId=".$_POST['expenseId'];
	$result = mysqli_query($con,$qry);
	$config->disconnect($con);
	$response["bSuccessfull"] = true;
}
echo json_encode($response);
?>