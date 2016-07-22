<?php

	$connect=new MongoClient();   //连接数据库
	$db=$connect->mydb->col;  //获取mydb数据库下的集合col


	$title=$_POST['title'];
	$english=$_POST['english'];
	$update=$_POST['update'];
	$imgs=$_POST['imgs'];
	$description=$_POST['description'];

	$query = array('title'=>$title);
	$objs=$db->find($query);

	if($objs->count()){
		$array=array();

		//更新数据库
		foreach ($objs as $i) {
			$result=$db->update(array('english'=>$i['english']), array('$set'=>array('english'=>$english)));
			$result=$db->update(array('update'=>$i['update']), array('$set'=>array('update'=>$update)));
			// $result=$db->update(array('imgs'=>$i['imgs']), array('$set'=>array('imgs'=>$imgs)));
			$result=$db->update(array('description'=>$i['description']), array('$set'=>array('description'=>$description)));
			echo $description;

			if($result['updatedExisting']){
				echo "sucess";
			}else{
				echo "no";
			};
		}
	 }else{
	 	echo '0';
	 }
	// $db.update({'title'},{$set:{}},{multi:true});
	// $result->update(array('english'=>$result['english']),array('$set'=>array('english'=>$english));


?>