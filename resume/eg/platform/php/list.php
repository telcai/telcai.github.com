<?php

	$connect=new MongoClient();   //连接数据库
	$col=$connect->Qdb->col;  //获取mydb数据库下的集合col

 	$objs=$col->find();
	 if($objs->count()){
	 	$array=array();
	 	foreach ($objs as $i) {
	 		array_push($array,$i);
	 	}
	  	echo json_encode($array);
	}
?>