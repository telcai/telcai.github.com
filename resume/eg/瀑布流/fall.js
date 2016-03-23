
	$(window).on("load",function(){
       waterfall();
       window.onresize = function(){
         window.location.reload();
       };  
       toTop();
          //滚动加载的数据
       $(window).on("scroll",function(){
             Load(); 



          });

});
	 // 图片位置摆放	
	function waterfall(){
		var $boxs=$(".box");
		var num=Math.floor($(window).width()/$boxs.width());//每行图片的个数
		var heightArr=[];
	  $("#cont").width(num*$boxs.width()).css("margin","0 auto");

	  	$boxs.each(function(i){
			 if (i<num-1) {
 			      heightArr.push($(this).outerHeight()); //第一行每个盒子的高度存到数组中
		    	 }else{
		    	 	var minHeight=Math.min.apply(Math,heightArr)
		    	 	var minIndex=$.inArray(minHeight,heightArr)
		    	 	$(this).css({
		    	 		"position":"absolute",
		    	 		"left":$boxs.eq(minIndex).position().left,
		    	 		"top":minHeight
		    	 	})
                    heightArr[minIndex]+=$boxs.eq(i).outerHeight();
		    	 }
		    }) 
}
	
    function Load(){
    	var dataImg={"data":[{"src":"a.jpg"},{"src":"10.jpg"},{"src":"27.jpg"},{"src":"17.jpg"},{"src":"30.jpg"},{"src":"9.jpg"}]}  
    	var loading=false;
    	var $boxs=$(".box");
	    var lastHeight=$boxs.last().offset().top+Math.floor($boxs.last().outerHeight()/2);
        var windowH=$(window).height();
        var scrollTop=$(window).scrollTop();

             //判断是否加载
        if(lastHeight<scrollTop+windowH && loading==false){
           	loading=true;
           	$.each(dataImg.data,function(i,value){
           	    var newBox=$("<div>").addClass("box").appendTo($("#cont"))
           	    $("<img>").attr("src","img/"+$(value).attr("src")).appendTo(newBox);
           	             // console.log($(this).attr("src"))
           	 })
           	waterfall();
          }
}

    function toTop(){
      var oBtn=document.getElementById("toTop");
      var timer=null;
      var oSym=true;
      window.onscroll=function(){
        oBtn.style.display="block";
        if (!oSym){
              clearInterval(timer);
            }
            oSym=false;
        oBtn.onclick=function(){
          timer=setInterval(scrollValue,20);
        }
        function scrollValue(){
           var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
           var iSpeed=Math.floor(-scrollTop/8);
           document.documentElement.scrollTop=scroll+iSpeed;
           document.body.scrollTop=scrollTop+iSpeed;
           if (scrollTop==0){
            clearInterval(timer);
            oBtn.style.display="none";
           }
           oSym=true;
        }
      }
    }