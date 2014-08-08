<?php
class Category{
    private static $tableName = "tblCategories";

    private $config;
	function Category($cfg){
		$this->config = $cfg;
	}

    private static $g_oCateogryCls;
	public static function getInstance($cfg){
		if(!isset($g_oCateogryCls)){
			$g_oCateogryCls = new Category($cfg);
		}
		return $g_oCateogryCls;
	}

    public function insertCategory($strCategoryName){
        $con = $this->config->connect();

        if ($strCategoryName == "")
        {
            $response['bSuccessful'] = FALSE;
            $response['strErrDescription'] = "Invalid Category";
            return $response;
        }

        $id = -1;
        $qry = "select * from tblcategories where strName like '" . $strCategoryName . "'";
        $result = mysqli_query($con,$qry);

        if ($result->num_rows>0)
        {
            $row = mysqli_fetch_assoc($result);
            $id = $row['uCategoryId'];
            $bMarkedAsDeleted = $row['bMarkedAsDeleted'];
            if ($bMarkedAsDeleted)
            {
                $qry = "update tblCategories set bMarkedAsDeleted = false where uCategoryId = " . $id;
                $response["bNewCategory"] = TRUE;
            }
            else
            {
                $response['bSuccessful'] = FALSE;
                $response['strErrDescription'] = "Category already exists";
                    $categoryData = array();
                    $categoryData["strCategory"] = $strCategoryName;
                    $categoryData["uCategoryId"] = $id;
                $response["categoryData"] = $categoryData;
                $response["bNewCategory"] = FALSE;
                $this->config->disconnect($con);
                return $response;
            }
        }
        else
        {
            $qry = "Select max(uCategoryId) from tblcategories";
            $result = mysqli_query($con,$qry);
            $row = mysqli_fetch_assoc($result);
            $id = $row['max(uCategoryId)'] +1;
            $qry = "insert into tblcategories (uCategoryId,strname) values(" . $id . ",'" . $strCategoryName . "')";
        }
        $result = mysqli_query($con,$qry);
        $this->config->disconnect($con);

        $categoryData = array();
        $categoryData["strCategory"] = $strCategoryName;
        $categoryData["uCategoryId"] = $id;
        $response = array();
        $response["bSuccessful"] = TRUE;
        $response["categoryData"] = $categoryData;
        $response["bNewCategory"] = TRUE;
        return $response;
    }
}
?>
