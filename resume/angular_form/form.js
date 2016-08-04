var app=angular.module('myApp',[]);

app.controller('Form',function($scope){

	$scope.user={};
	$scope.isDisable=true;

	$scope.submit=function(){
		alert('sucess');
		console.log($scope.user)
	}


	

});

app.directive('compare',function(){
	var o={};
	o.restrict='A';
	o.scope={
		org:'=compare'
	};
	o.require='ngModel';
	o.link=function(scope,ele,att,ctrl){
		ctrl.$validators.compare=function(value){
			return value==scope.org;
		}
		scope.$watch('org',function(){
			ctrl.$validate();
		})
	}
	return o;


});
