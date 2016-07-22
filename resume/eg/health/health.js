$(document).ready(function(){
   var H=$("#height"),
       W=$("#weight"),
       V=$("#value"),
       E=$("#evaluate"),
       youVal=0

$("#btn2").click(function(){
	if (Check(H,W)){
		youVal=calculate(H.val()/100,W.val());

		V.val(youVal);
		if (youVal>28){
			E.val("哪有这种身材，太胖了！");
		}
		else if (youVal>26&&youVal<=28){
			E.val("再不减肥就完蛋了！");
		}
		else if (youVal>24&&youVal<=26){
			E.val("长胖了？快减肥吧！");
		}
		else if (youVal>22&&youVal<=24){
			E.val("有点偏胖，需要锻炼了！");
		}
		else if (youVal>20&&youVal<=22) {
			E.val("你目前是标准身材！");
		}
		else if (youVal>18&&youVal<=20){
			E.val("朋友，可以多吃点的！");
		}
		else if (youVal>16&&youVal<=18){
			E.val("这个是火柴杆吗？");
		}
		else if (youVal<=16){
			E.val("不能生存的。");
		}
	}
});//click btn2

$("#btn1").click(function(){
	clearForm();
});//clibk btn1


// // $(document).ready(function(){
//              var liStar=$(".star li"),
//                  liDes=$(".des li"),
//                  o=true;   
//              liStar.each(function(){
//                 $(this).mouseover(function(){	
//                 		var Index=$(this).index()
//                          showStar(Index);	
                	
//                  })
//                  $(".star").mouseleave(function(){
//                 	if (o){
//                 		liStar.find("img").css("top","0px");
//                 	}else{
//                 		showStar(Index1)
//                 	  }
                	
//                 })

//                 $(this).click(function(){
//                     o=false;
//                     Index1=$(this).index()
//                 	liDes.css("display","none");
//                 	liDes.eq(Index1).css("display","block");
//                 })


//              });
//         function showStar(indx){
//         	liStar.find("img").css("top","0px");
//                 	for (var i=0;i<=indx;i++){
//                 		 var img=liStar.eq(i).find("img");
//                 	    img.css("top","-30px");
//                 	  }
//               }

//         // })



})//document


//计算函数
function calculate(height,weight){
	//console.log(height,weight)
  bVal=weight/eval(height*height);  //eval() 是字符串可以计算
  return Math.round(bVal);
}
//检查输入框是否输入正确内容
function Check(obj1,obj2){
	if (obj1.val()==null || obj2.val()==null || obj1.val().length==0 || obj2.val().length==0 || isNaN(obj1.val()) || isNaN(obj2.val())){
		console.log(isNaN(obj1.val()))
		alert("对不起，填写错误，请重新填写。");
		return false;
	}
	else if(parseFloat(obj1.val())<=0 ||parseFloat(obj1.val())>300||parseFloat(obj2.val())<=0||parseFloat(obj2.val())>200){
		alert("输入范围不输入人类，请重新测试。");
		return false;
	}
	return true;
}
//清空表单
function clearForm(){
	$("input").val("");
}
