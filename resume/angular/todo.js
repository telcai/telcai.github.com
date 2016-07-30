var todoList=angular.module('todo-list',[]);

todoList.controller('TodoList',function($scope){
	$scope.listItem=[
		{name:'吃饭',status:false},
		{name:'睡觉',status:false},
		{name:'打豆豆',status:false}
	];
	
	$scope.focus=false;
	// $scope.totalLen=listItem.
	$scope.addItem=function(){
		var value=$scope.newTask;
		if(value){
			$scope.listItem.push({name:value,status:false});
			$scope.newTask='';
		}else{
			$scope.focus=true;
		};
	}

	$scope.delItem=function(){
		$scope.listItem.splice(this.$index,1);
		$scope.getdidLen();
	}

	$scope.getdidLen=function(){
		var num=0;
		for(i in $scope.listItem){
			if($scope.listItem[i].status){
				num++;
			}
		}		
		$scope.didLen=num;
	}

});

todoList.directive('setFocus',function(){
	return {
		restrict:'A',
		link:function(scope,element){
			scope.$watch('focus',function(newValue){
				if(newValue){
					element[0].focus();
					scope.focus=false;
				}
			});
		}
	}
});