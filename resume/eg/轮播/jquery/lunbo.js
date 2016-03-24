$(document).ready(function(){	
	var $Bimg=$(".lunbo-box img"),
	    $Simg=$("#nav img"),
	    $arrow=$("#arrow"),
	    $ul=$("#nav ul"),
	    nowIndex=0,
	    zIndex=20

	$("#nav ul").css("width",($Simg.length)*parseInt($("#nav img").css("width")));
	//箭头设置
    $(".Left").mouseenter(function(){
         
        $(".Left").css("opacity","0.8");
    }).mouseleave(function(){

    	$(".Left").css("opacity","0.5");
    });
    $(".Right").mouseenter(function(){
        $(".Right").css("opacity","0.8");
    }).mouseleave(function(){
    	$(".Right").css("opacity","0.5");
    });
   
    //小图点击大图切换

    $Simg.mouseover(function(){	
    		startMove(this,"opacity",100);	     
    	})	
    $Simg.mouseout(function(){
    	if(nowIndex!=$(this).index()){
            startMove(this,"opacity",50);
            }
       });

    $Simg.click(function(){
       if (nowIndex==$(this).index()){return;}
       nowIndex=$(this).index();
       tab();
    });

     //切换函数
     function tab(){
          $Simg.each(function(){
    		startMove(this,"opacity",50);
    	});
    	   startMove($Simg.eq(nowIndex)[0],"opacity",100);
          $Bimg.eq(nowIndex).css("z-index",zIndex++).css("height",0);
          $arrow.css("z-index",zIndex++);
          startMove($Bimg.eq(nowIndex)[0],"height",$(".lunbo-box")[0].offsetHeight);  
          
          // 小图滚动
          var LastIndex=($Simg).eq(($Simg.length)-2).index();  //倒数第二张的index
          if (nowIndex==0){
          	var newLeft=-((nowIndex)*$Simg[0].offsetWidth)
          	startMove($ul[0],"left",newLeft);
          }
          else if (nowIndex>=LastIndex){
            var newLeft=-((LastIndex-2)*$Simg[0].offsetWidth)
            startMove($ul[0],"left",newLeft);
          }
          else{
          	var newLeft=-((nowIndex-1)*$Simg[0].offsetWidth)
          	startMove($ul[0],"left",newLeft);
          }
      }	
  //箭头点击切换
     
    $(".Left").click(function(){	
     	nowIndex--;
     	if (nowIndex<0){
     		nowIndex=$Simg.length-1;
     	}
     	tab();
       });
   $(".Right").click(function(){
        nowIndex++;
     	if (nowIndex>$Simg.length-1){
     		nowIndex=0;
     	}
         tab();
     });

  //自动播放
   $("#lunbo").mouseleave(function(){
      play();
    })
    $("#lunbo").mouseover(function(){
      stop();
    })
  function play(){
   Auto=setInterval(function(){
  	  $(".Right").click();
        },3000);
   }
  function stop(){
    clearInterval(Auto);
  }

   play();
});
