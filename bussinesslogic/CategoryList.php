<?php
require_once  './Config.php';
require_once './DatabaseManipulation.php';
$config = Config::getInstance();
$dmlQuery = DMLQuery::getInstance($config);
if (isset($_POST['operation'])){
	$con = $config->connect();
	
	$qry = "Select max(uCategoryId) from tblcategories";
	$result = mysqli_query($con,$qry);
	$row = mysqli_fetch_assoc($result);
	
	$qry = "insert into tblcategories (uCategoryId,strname) values(" . ($row['max(uCategoryId)'] +1) . ",'" .$_POST['categoryName'] . "')";
	$result = mysqli_query($con,$qry);	
	$config->disconnect($con);
	
	$categoryData = array();
	$categoryData["strCategoryName"] = $_POST['categoryName'];
	$categoryData["uCategoryId"] = ($row['max(uCategoryId)'] +1);
	$response = array();
	$response["bSuccessfull"] = TRUE;
	$response["categoryData"] = $categoryData;
	echo json_encode($response);
}
else {

	$con = $config->connect();
	$qry = "Select * from tblcategories";
	$result = mysqli_query($con,$qry);
	$categoryData = array();
	$i = 0;
	while ($row = mysqli_fetch_assoc($result)){
		$categoryData[$i]['uCategoryId'] = $row['uCategoryId'];
		$categoryData[$i]['strCategoryName'] = $row['strname'];
		$i++;
	}
	$config->disconnect($con);
	$response = array();
	$response["bSuccessfull"] = true;
	$response["arrCategoryNames"] = $categoryData;
	echo json_encode($response);
}
?>
