
	$(window).on("load",function(){
       waterfall();
      
          // 滚动加载的数据
       $(window).on("scroll",function(){
             Load(); 
          });

       $(window).resize(function(){
         window.location.reload();
       });
});
	 // 图片位置摆放	
	function waterfall(){
		var $boxs=$(".article-img");
		var num=Math.floor($("#content").outerWidth()/$boxs.width());//每行图片的个数
		var heightArr=[];
    var padLeft=$("#content").outerWidth()-(num-1)*($(".article-img").outerWidth())-25*(num-2);
  //console.log(padLeft)
// 	  $("#content").css("padding-left",padLeft/2)

	  	$boxs.each(function(i){
			 if (i<num-1) {
 			    heightArr.push($(this).outerHeight()+$("#content").offset().top+70); //第一行每个盒子的高度存到数组中
             
		    	}else{
		    	 	var minHeight=Math.min.apply(Math,heightArr)
		    	 	var minIndex=$.inArray(minHeight,heightArr)
          
		    	 	$(this).css({
		    	 		"position":"absolute",
		    	 		"left":$boxs.eq(minIndex).position().left,
		    	 		"top":minHeight
		    	 	})
                 heightArr[minIndex]+=$boxs.eq(i).outerHeight()+20;
                 $("#content>ul").css("height",minHeight+200)
		    	 }
		    }) 

}
	
    function Load(){
    	//var dataImg={"data":[{"src":"a.jpg"},{"src":"b.jpg"},{"src":"c.jpg"},{"src":"d.jpg"},{"src":"a.jpg"},{"src":"e.jpg"}]}  
    	var loading=false;
    	// var $boxs=$(".article-img");
	    // var lastHeight=$boxs.last().offset().top+Math.floor($boxs.last().outerHeight()/2);
     //  var windowH=$(window).height();
      var scrollTop=$(window).scrollTop();
        if (scrollTop>0){
          $(".navbar-inverse").css("background-color","rgba(0,0,0,0.6)");

        }else{
          $(".navbar-inverse").css("background-color","rgba(0,0,0,1)");
        }
             //判断是否加载
        // if(lastHeight<scrollTop+windowH && loading==false){
        //    	loading=true;

           	// $.each(dataImg.data,function(i,value){
           	//     var newBox=$("<article>").addClass("article-img").addClass("post").appendTo($("#content"))
           	//     $("<img>").attr("src","../css/img/"+$(value).attr("src")).appendTo(newBox);
           	//              // console.log($(this).attr("src"))
           	//  })
           	// waterfall();
          // }
}

       