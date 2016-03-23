$(document).ready(function(){
    var $Ul=$("#lunbo ul"),
        $lis=$("#lunbo ul li"),  
        $imgs=$("#lunbo li img")  
   // $Ul[0].innerHTML+=$Ul[0].innerHTML;  //两个块的内容拼接
         Spead=-2;
    $Ul.css("width",$lis.length*($lis.outerWidth()+parseInt($lis.css("margin-left"))));
    // $imgs.css({
    // 	"width":$lis.width(),
    // 	"height":$lis.height()
    // })
    $(".left").click(function(){
    	Spead=-2;
    })
    $(".right").click(function(){
    	Spead=2;
    })
    function play(){
    	Left=parseInt($Ul.css("left"))
    	if (Left<(-$Ul.outerWidth()/2)){
    		Left=0;
    	}
    	else if (Left>0){
    		Left=-$Ul.outerWidth()/2;
    	}
        $Ul.css("left",(Left+Spead)+"px"); 
    }
    
    timer=setInterval(play,50);
    
    $lis.mouseover(function(){
    	clearInterval(timer);
       $(this).addClass("Selected");
    })


    $lis.mouseout(function(){
    	timer=setInterval(play,50);
    	$(this).removeClass("Selected");
    })


});