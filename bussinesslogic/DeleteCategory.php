<?php
require_once  './Config.php';
require_once './DatabaseManipulation.php';
$response = array();
$response["bSuccessfull"] = false;
if (isset($_POST['operation']) && $_POST['operation'] == "delete"){
	$config = Config::getInstance();
	$con = $config->connect();
    $qry = "update tblcategories set bMarkedAsDeleted = true where uCategoryId=".$_POST['categoryId'];
	$result = mysqli_query($con,$qry);
	$config->disconnect($con);
	$response["bSuccessful"] = true;
}
echo json_encode($response);
?>
