$(document).ready(function(){
var Total=$(".total"),
    Price=$(".price")

	Total.each(function(i){
		Total[i].innerHTML=Price[i].innerHTML;
	});

//$("input[type='checkbox']").prop("checked",true);//默认都是被选中的
	$("#headAll").click(function(ev){
		var ev=ev||event;
		selectAll(ev.target);
	});
	$("#footAll").click(function(ev){
		var ev=ev||event;
		selectAll(ev.target);
	});
	$(".minus").click(function(ev){
		var ev=ev||event
		goodsNum(ev.target,-1);
	});

	$(".add").click(function(){
		var ev=ev||event
		goodsNum(ev.target,+1);
	});
//商品被选择时计算总价和数量
	$("#container input[type='checkbox']").click(accountMoney);

//console.log($('.tBody').find("input[type='text']").eq(2).val());

    $(".down").click(function(){
   		$(".goodsLi").css("display","block");
   		$(".down").css("display","none");
   		$(".up").css("display","block");
    });

    $(".up").click(function(){
  	   	$(".goodsLi").css("display","none");
   		$(".down").css("display","block");
   		$(".up").css("display","none");
    });
  //删除商品
Delate();
delAll();
 
})//document


function selectAll(obj){

     if ($(obj).is(":checked")) {  
        $(":checkbox").prop("checked", true);  
     }else {  
        $(":checkbox").prop("checked", false);  
    }  //注意这里使用prop
}
function goodsNum(obj,num){	//num为 +1 或-1
    var preInput=$(obj).parent().find("input"),
        val=preInput.val(),
        oTotal=$(obj).parent().parent().siblings(".total"),
    	oPrice=$(obj).parent().parent().siblings(".price")
  
  	if(val==1 && num<0){
  		preInput.val("1");
    }else{
        preInput.val(parseInt(val)+num); //改变商品数量

   	 var money=oPrice.html()*preInput.val();
     	oTotal.html(money.toFixed(2));
     	//console.log(money)
     	accountMoney(); //当商品的数量改变时，和重新计算总价和数量
    }
}
  //总价  
function accountMoney() {
	var sumMoney=0,
    	sumNum=0,
        checkedId=[],
        imgArr=[]

	$(".tBody input[type='checkbox']").each(function(i){  
		 this.id=i; //给商品动态添加id
   		if ($(this).is(":checked")){
      		checkedId.push(this.id);//被选中商品的id存入数组
   		}else{
   			$("#headAll").prop("checked", false);
   			$("#footAll").prop("checked", false);
   		} 
	});

	//当列表被清空后取消全选
 if ($(".tBody input[type='checkbox']").length==0){
 	$("#headAll").prop("checked", false);
   	$("#footAll").prop("checked", false);
 }  
   // console.log(checkedId)
 	if (checkedId.length!=0){
 	   	$(checkedId).each(function(){
 	   		var j=$(this)[0]; //根据被选商品的id找到数组中相应的下标
 	   		//计算总价
     		sumMoney+=parseFloat($(".total")[j].innerHTML); 
     		//计算商品总件数
     		sumNum+=parseInt($(".num input[type='text']")[j].value);           
    		$(".checkMoney").html(sumMoney.toFixed(2));
    		$(".checkNum").html(sumNum);
 	    });
 	}else{
 		$(".checkNum").html("0");
 		$(".checkMoney").html("0.00");
    }

    //将被选中的图片写入goodsLi中
   pustGoodsLi(checkedId);	//imgArr为要放入goodsLi中的图片id
 
}

function pustGoodsLi(obj){
  var imgs=$(".goods img");
  var checkboxs=$(".tBody input[type='checkbox']");
	$(".goodsLi ul").html("");

    for (var i=0;i<obj.length;i++){
  		$(".goodsLi ul").append("<li><img ><div index="+obj[i]+" >取消选择</div></li>");
  		$(".goodsLi img")[i].src=imgs[obj[i]].src; 
  		$(".goodsLi div")[i].className="hoverDel";
    }   

$(".goodsLi li").mouseover(function(){                
	var oHDel=$(this).find(".hoverDel");
		//console.log("1");
    oHDel.css("display","block");

    oHDel.click(function(){ 
        var Index=$(this).attr("index");
        $(this).parent().remove(); 
        $(checkboxs[Index]).prop("checked",false);//清除对应的checkbox

        if($(".goodsLi li").length==0){
            $(".goodsLi").css("display","none");
   			$(".down").css("display","block");
   			$(".up").css("display","none");
        } //当底部列表为空时，关闭此列表

        $(".tBody input[type='checkbox']").each(function(){  
   			if (!$(this).is(":checked")){
   				$("#headAll").prop("checked", false);
   				$("#footAll").prop("checked", false);
   			}//当有未选中商品时，取消全选
		});

    });

      

});

$(".goodsLi li").mouseout(function(){
   		$(".hoverDel").css("display","none");
  });

}

function Delate(){
	var Dels=$(".delate a");
    Dels.click(function(ev){
   		var ev=ev||event;
        var Tar=$(ev.target).parent().parent();
        Tar.remove(); //删除该删除所在的tr 
        accountMoney();
  });
   
}
function delAll(){
	$(".footDel a").click(function(ev){
	  $(".tBody input[type='checkbox']").each(function(i){  
   		 if ($(this).is(":checked")){
		   $(this).parent().parent().remove() ;
	     } //删除别选中的checkbox所在的tr
	  });
	  accountMoney();
  })
	
}