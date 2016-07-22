<?php
	$connect=new MongoClient();
	$col=$connect->Qdb->col;

	$id=$_POST['id'];
	$type=$_POST['type'];
	

	// $objs=$col->find($query);

	if($type=='edit'){
		$query=array("_id"=>new MongoId("$id"));  //根据id查找

		$objs=$col->find($query);

		if($objs->count()){
			$array=array();
			foreach ($objs as $i) {
				array_push($array,$i);
			}
		 	echo json_encode($array);
		 }else{
		 	echo '0';
		 };
	}

	if ($type=='del') {
		$query=array("_id"=>new MongoId("$id"));  //根据id查找

		$col->remove($query);

	}

	if($type=='delall'){
		$col->remove();
	}

	if($type=='view'){
		$status=$_POST['status'];

		// echo $status;
		$query=array("_id"=>new MongoId("$id"));  //根据id查找

		$objs=$col->findOne($query);
		if($objs){
			$array=array();
			$col->update(array('_id'=>new MongoId($id)), array('$set'=>array('status'=>$status)));
		}

	}



?>