
<?php
	$connect=new MongoClient();   //连接数据库
	$db=$connect->mydb->col;  //获取mydb数据库下的集合col

	$name=$_POST["title"];

	$query = array('title'=>$name);
	$objs=$db->find($query);
	// var_dump($objs);

	if($objs->count()){
		$array=array();
		foreach ($objs as $i) {
			array_push($array,$i);
		}
	 	echo json_encode($array);
	 }else{
	 	echo '0';
	 }

	////// echo count((array) $objs);
?>