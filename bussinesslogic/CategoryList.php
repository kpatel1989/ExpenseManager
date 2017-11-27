<?php
require_once  './Config.php';
require_once './DatabaseManipulation.php';
require_once './ClsCategory.php';
$config = Config::getInstance();
$dmlQuery = DMLQuery::getInstance($config);
if (isset($_POST['operation'])){
	$oCategory = Category::getInstance($config);
    echo json_encode($oCategory->insertCategory($_POST['categoryName']));
}
else {

	$con = $config->connect();
	$qry = "Select * from tblcategories where bMarkedAsDeleted = false";
	$result = mysqli_query($con,$qry);
	$categoryData = array();
	$i = 0;
	while ($row = mysqli_fetch_assoc($result)){
		$categoryData[$i]['uCategoryId'] = $row['uCategoryId'];
		$categoryData[$i]['strCategory'] = $row['strname'];
		$i++;
	}
	$config->disconnect($con);
	$response = array();
	$response["bSuccessful"] = true;
	$response["arrCategoryNames"] = $categoryData;
	echo json_encode($response);
}
?>
