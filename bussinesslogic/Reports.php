<?php
require_once  './Config.php';
require_once './DatabaseManipulation.php';
require_once './ClsCategory.php';
	if (isset($_POST['reportType']))
	{
		$type =  $_POST['reportType'];
		$mode = $_POST['reportMode'];
		$startDate = $_POST['startDate'];
		$endDate = $_POST['endDate'];

		$config = Config::getInstance();
		$dmlQuery = DMLQuery::getInstance($config);

		$qry="";

		if ($type == 'category')
		{
			$qry = "select strname as source, sum(uAmount) as total
					from tbldailyexpense e, tblcategories c
					where dtExpenseDate >= '" . $startDate . "' and dtExpenseDate <= '" . $endDate . "'
					and e.uCategoryId = c.uCategoryId group by strname;";
		}
		else if ($type == "monthly")
		{
			$qry = "select date(dtExpenseDate) as source, sum(uAmount) as total
						from tbldailyexpense e, tblcategories c
						where e.uCategoryId = c.uCategoryId
						and month(dtExpenseDate) = month('".$startDate."')
						group by date(dtExpenseDate);";
		}
		else if ($type == "yearly")
		{
			$qry= "select monthname(dtExpenseDate) as source, sum(uAmount) as total
					from tbldailyexpense e, tblcategories c
					where e.uCategoryId = c.uCategoryId
					and year(dtExpenseDate) = year('". $startDate ."')
					group by month(dtExpenseDate);";

			$qry2="";
		}

		$con = $config->connect();
		$result = mysqli_query($con, $qry);
		$i = 0;
		$reportData = [];
		while($row = mysqli_fetch_assoc($result))
		{
			$reportData[$i]['source'] = $row['source'];
			$reportData[$i]['total'] = $row['total'];
			$i++;
		}
		if($mode == "Memo")
		{
			for($j =0; $j < $i; $j++)
			{
				$details = [];
				if ($type == "monthly")
				{
					$qry2 = "select strname as category,uAmount
						from tbldailyexpense e, tblcategories c
						where e.uCategoryId = c.uCategoryId
						and date(dtExpenseDate) = '". $reportData[$j]['source']."'
						group by date(dtExpenseDate),strname;";
					$result = mysqli_query($con, $qry2);
					$k=0;


					while($row = mysqli_fetch_assoc($result))
					{
						$details[$k]['categoryName'] = $row['category'];
						$details[$k]['uAmount'] = $row['uAmount'];
						$k++;
					}
				}
				$reportData[$j]['details'] = $details;
			}
		}
		$response['reportData'] = $reportData;
		$response['bSuccessful'] = true;
	}
	else
	{
		$response['bSuccessful'] = false;
	}
	echo json_encode($response);
?>
