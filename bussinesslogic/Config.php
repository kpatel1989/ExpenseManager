<?php
class Config{
	public $settings = array(
		'serverport' => "3306",
		'servername' => "localhost",
		'username' => "root",
		'password' => "",
		'database' => "ExpenseManager"
		);
	private $g_Config;

	public static function  getInstance(){
		if (!isset($g_Config)){
			$g_Config = new Config();
		}
		return $g_Config;
	}

	public function connect(){
		$con = mysqli_connect($this->settings['servername'],$this->settings['username'],$this->settings['password']);
		mysqli_select_db($con,$this->settings['database']);
		return $con;
	}

	public function disconnect($con){
		mysqli_close($con);
	}
	
	
}
?>