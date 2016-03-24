$(document).ready(function(){
	var $index=$("#nav img").each(function(){
			return $(this).attr("index");
	})
	var $img=$(".lunbo-box")
   	var i=0;
     function indexShow(){
    	if (i<3){
    		i++;
    	}else{
    		i=0;
    	}
    	
    	$index.css("opacity","0.5")
    	$index[i].style.opacity=1;
    }
    
	function play(){
		var $img=$(".lunbo-box")
		if($img.position().left<-1879){
			$img.css("left","-470px");
		}else{
			$img.css("left","-=470px");
		}
		indexShow();
	}

   	function start(){timer=setInterval(play,2000);}

    function stop(thisIndex){
    	clearInterval(timer);
    	i=thisIndex;
    }    
	$index.each(function(){
		$(this).click(function(){		
			$(this).siblings().css("opacity","0.5");
		    this.style.opacity=1;
           var thisIndex=$.inArray(this,$index)
           var thisLeft=-470*(thisIndex+1)
           $img.css("left",thisLeft); 
           //alert(this.src)
           stop(thisIndex);
           start();
		});
	});
	start();
});
