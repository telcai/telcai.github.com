<?php
	
	$connect=new MongoClient();   //连接数据库
	$col=$connect->Qdb->col;  //获取mydb数据库下的集合col

	$title=$_POST['title'];
	$content=$_POST['content'];
	$saveTime=$_POST['saveTime'];
	$endDate=$_POST['endDate'];
	$id=$_POST['id'];
	$status=$_POST['status'];
	$isNew=$_POST['isNew'];

	 
	if($isNew==0){
		$query= array("_id"=>new MongoId($id));	
		
		$objs=$col->findOne($query);
		if($objs){
			$array=array();
			// 更新数据库
			$col->update(array('_id'=>new MongoId($id)), array('$set'=>array('title'=>$title)));
			$col->update(array('_id'=>new MongoId($id)), array('$set'=>array('content'=>$content)));
			$col->update(array('_id'=>new MongoId($id)), array('$set'=>array('saveTime'=>$saveTime)));
			$col->update(array('_id'=>new MongoId($id)), array('$set'=>array('endDate'=>$endDate)));
			$col->update(array('_id'=>new MongoId($id)), array('$set'=>array('status'=>$status)));
		}
	}
	echo $isNew;
	if($isNew==1){
		$doc=array(
			'title'=>$title,
			'content'=>$content,
			'saveTime'=>$saveTime,
			'endDate'=>$endDate,
			'status'=>$status
		);
		$col->insert($doc);
	}



?>