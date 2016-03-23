
$(function(){
           $("#lists li:eq(5)").click(function(){
        		$("#secondli").toggle();
        	})	
        $("#lists li").click(function(){       	
        	$("#lists li").css("background-color","#f7f7f7");
        	$(this).css("background-color","#dfdfdf");
        })
        $(".topmenu li a").click(function(){
        	$(".topmenu li a").css("color","#c3c3c3");
        	$(this).css("color","#fdfdfd")
        })

        function showpic(i,j){
        	$("#picshow img")[j].style.display="none";
        	$("#picshow img")[i].style.display="block";
        	//alert(i)
        }
         i=0;
       setInterval(function(){
       	i++;
       	j=i-1;
       	if (i>3){
       		i=0;
       		j=3;
       	}
       	showpic(i,j);
       },2000)
    })

       