<?php
require_once  './Config.php';
require_once './DatabaseManipulation.php';
require_once './ClsCategory.php';
if (isset($_POST["operation"]) && $_POST['operation'] == "addExpense"){
	$config = Config::getInstance();
	$dmlQuery = DMLQuery::getInstance($config);
	
    $oCategoryCls = Category::getInstance($config);

    $category = $_POST['category'];
    $categoryId = -1;

    $bNewCategory = FALSE;

    $categoryResult = $oCategoryCls->insertCategory($category);
    $categoryId = $categoryResult['categoryData']['uCategoryId'];
    $bNewCategory = $categoryResult['bNewCategory'];

    $con = $config->connect();

    $qry = "Select * from tbldailyExpense where uCategoryId = ". $categoryId ." and dtExpenseDate = '" . $_POST["date"] ."'";

    $result = mysqli_query($con, $qry);
    if ($result->num_rows > 0)
    {
        $response['bSuccessful'] = FALSE;
        $response['strErrDescription'] = "Expense related to this category already exists";
        echo json_encode($response);
        return;
    }

	$qry = "Select max(uExpenseId) from tbldailyexpense";
	$result = mysqli_query($con,$qry);
	$row = mysqli_fetch_assoc($result);
	$id = $row['max(uExpenseId)']+1;

	$columns = array('uExpenseId','category','date','value');
	$qry = "insert into tbldailyExpense (uExpenseId,uCategoryId,dtExpenseDate,uAmount,notes) values (". $id . "," . $categoryId . ",'" . $_POST['date'] ."'," . $_POST['value'] .",'" . $_POST['notes'] ."')";

	if (mysqli_query($con,$qry))
    {
        $qry = "select strName from tblCategories where uCategoryId=". $categoryId;
        $result = mysqli_query($con,$qry);
        $catRow = mysqli_fetch_assoc($result);

        $qry = "select * from tbldailyExpense ex, tblCategories cat where uExpenseId =" . $id . " and ex.uCategoryId = cat.uCategoryId";

        $result = mysqli_query($con,$qry);
        $row = mysqli_fetch_assoc($result);

        $response["bSuccessful"] = TRUE;
            $expenseData = array();
            $expenseData["uExpenseId"] = $id;
            $expenseData['strCategory'] = $row['strname'];
            $expenseData['uAmount'] = $row['uAmount'];
            $expenseData['notes'] = $row['notes'];
        $response['expenseData'] = $expenseData;
        $response["bNewCategory"] = $bNewCategory;
        if ($bNewCategory == TRUE)
        {
                $categoryData = array();
                $categoryData["strCategory"] = $row["strname"];
                $categoryData["uCategoryId"] = $row["uCategoryId"];
            $response["categoryData"] = $categoryData;
        }

    }
    $config->disconnect($con);
}
else{
	$response["bSuccessful"] = FALSE;
    $response["strErrDescription"]= "invalid operation";
}
echo json_encode($response);

?>
