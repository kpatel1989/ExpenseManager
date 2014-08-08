<?php
	require_once  './Config.php';
	require_once './DatabaseManipulation.php';
	$config = Config::getInstance();
	$dmlQuery = DMLQuery::getInstance($config);
	$con = $config->connect();
	$qry = "Select * from tbldailyExpense e, tblCategories c where DATE_FORMAT(dtExpenseDate,'%Y-%m-%d') = '" . $_POST['date'] . "' and e.uCategoryId = c.uCategoryId";
	//echo $qry;
    $result = mysqli_query($con,$qry);
	$expenses = array();
	$i =0;
	while($row = mysqli_fetch_assoc($result)){
		$expenses[$i]['uExpenseId'] = $row['uExpenseId'];
		$expenses[$i]['strCategory'] = $row['strname'];
	 	$expenses[$i]['uAmount'] = $row['uAmount'];
        $expenses[$i]['notes'] = $row['notes'];
	 	$i++;
	}
	$response = array();
	$response["bSuccessful"] = true;
	$response["expenses"] = $expenses;
	$config->disconnect($con);
	echo json_encode($response);
?>
