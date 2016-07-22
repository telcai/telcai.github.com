$(document).ready(function(){
	 var sideBar=$(".sidebar");
	 var lisColor=$(".color li");
	 var lisWidth=$(".width li");
	 var colors=["red","green","blue","yellow","black","purple","#DD17DD","#fff"];
	 var widthMor=$(".width .more");
	 var colorMor=$(".color .more");
    var paint=1;
  	widthMor.click(function(){
  		$(".width ul").slideToggle(300);
  	});

    $('.navbar li').on('click',function(){
        $("#c1").css("background-color",'#fff');
  
        var oCG=$('#c1')[0].getContext("2d");
        oCG.clearRect(0,0,750,560);
    })

    lisColor.each(function(i){
    	lisColor[i].style.backgroundColor=colors[i];
    });
    lisColor.click(function(){
       $(".jscolor").css("background-color",$(this).css("background-color"));
       
       paint=1;
       drawing(paint);
    });
    $(".jscolor").click(function(){
 
        paint=1;
        drawing(paint);
    })
    lisWidth.click(function(){   
       $(".width input").val($(this).attr("value")+'px');
       $(".width ul").slideUp(300);
       paint=1;
       drawing(paint);
    });
    $('.selfwidth input').blur(function(){
      if($(this).val()){
        $('.width>input').val('');
        $('.width>input').val($(this).val()+'px');
      }
    })

    $(".width").click(function(){
    	  paint=1;
       drawing(paint);
    })
   
    //填充背景
    $(".fillColor").click(function(){
    	var fillCo=$(".jscolor").css("background-color");
        $("#c1").css("background-color",fillCo);
    })

   //擦除
    $(".eraser img").click(function(){
      var oC=$("#c1");
      var oCG=oC[0].getContext("2d");
      paint=0;
      oC.css({cursor:"url(eraser1.png),auto"}); //橡皮
	    oC.mousedown(function(ev){
	  	if(paint==0){
	  		//console.log(paint);	
    		var ev=ev||event;
    		var x=ev.clientX-oC[0].offsetLeft+$(window).scrollLeft();
    		var y=ev.clientY-oC[0].offsetTop+$(window).scrollTop();
			
			//oC.css({cursor:"pointer"});
    	    oC.mousemove(function(ev){
    	    	 var ev=ev||event;
    			   var x=ev.clientX-oC[0].offsetLeft+$(window).scrollLeft()+10;
    			   var y=ev.clientY-oC[0].offsetTop+$(window).scrollTop()+10;
    			   oCG.clearRect(x,y,6,6);
    	    });
    	    oC.mouseup(function(){
                oC.off("mousemove");
                oC.off("mouseup");
                oC.css({cursor:"default"});
    	    });
		}
	 });
	   drawing(paint);

    })

   //画
   drawing(paint);
})//document

function drawing(p){
    var oC=$("#c1");
    var oCG=oC[0].getContext("2d");
    
    paint=p;
    // if (color!=0){
   //	oCG.strokeStyle=color;
    // }
    // if (width!=0){
   //	oCG.lineWidth=width;
    // }//默认参数的方法


    oC.mousedown(function(ev){

        var color=$(".jscolor").css("background-color");
        var width=$(".width>input").val().split('px')[0];
  
       	oCG.strokeStyle=color;
       	oCG.lineWidth=width; //在画之前取颜色和粗细
     
        if (paint==1){
	
          	var ev=ev||event;
          	var x=ev.clientX-oC[0].offsetLeft+$(window).scrollLeft(),
          		y=ev.clientY-oC[0].offsetTop+$(window).scrollTop()
            // console.log(paint);	
          	oC.css({cursor:"pointer"});
          	oCG.beginPath();
          	oCG.moveTo(x,y);

          	oC.mousemove(function(ev){
          		var ev=ev||event;
          		var x=ev.clientX-oC[0].offsetLeft+$(window).scrollLeft(),
          			y=ev.clientY-oC[0].offsetTop+$(window).scrollTop()
          		oCG.lineTo(x,y);
                  //console.log($(window).scrollTop()+"   "+y)
          		oCG.stroke();	
          	});
          	oC.mouseup(function(){
          		oC.off("mouseup");
          		oC.off("mousemove");
          		oC.css({cursor:"default"});
          		oCG.closePath(); //
          	});
        }
  })

}