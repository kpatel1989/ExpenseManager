<?php
class DMLQuery{
	public static $g_TableNames = array(
		'tbldailyExpenses'
	);
	private $config;
	function DMLQuery($cfg){
		$this->config = $cfg;
	}

	private static $g_DMLQuery;
	public static function getInstance($cfg){
		if(!isset($g_DMLQuery)){
			$g_DMLQuery = new DMLQuery($cfg);
		}
		return $g_DMLQuery;
	}
	
	
	
	public function insert($tblName, $columns, $values){
		$con = $this->config->connect();
		$qry = "insert into" . $tblName . " (";
		for($i=0;$i<count($columns)-1;$i++){
			$qry = $qry . $coulums[$i] . ",";
		}
		$qry = $qry . $coulums[$i] .") values (";
		
		for($i=0;$i<count($columns)-1;$i++){
			$qry = $qry . $values[$i] . ",";
		}
		$qry = $qry . $values[$i] . ")";
		$result = mysqli_query($con,$qry);
		$this->config.disconnect($con);
	}
	
	public function delete($tblName){
		
	}
}

?>