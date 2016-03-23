
$(document).ready(function(){


		
		$("#title_box").mousedown(function(e){

				$(this).css("cursor","pointer");

           var disX=e.clientX,disY=e.clientY
           var Qleft=$("#QQ_box").offset().left,Qtop=$("#QQ_box").offset().top 
           var cleft=disX-Qleft,ctop=disY-Qtop
           $(document).mousemove(function(e){
           	    var moveX=e.clientX,moveY=e.clientY
           	    var newL=moveX-cleft,newT=moveY-ctop
           	    var WX=$(window).width(),WT=$(window).height()
           	    if (newL<0){
           	    	newL=0;
           	    }
           	    if (newL>WX-$("#QQ_box").width()-8){
           	    	newL=WX-$("#QQ_box").width()-8;
           	    }
           	    if (newT<7){
           	    	newT=7;
           	    }
           	    if (newT>WT-$("#QQ_box").height()){
           	    	newT=WT-$("#QQ_box").height();
           	    }
           	   $("#QQ_box").css({"left":newL,"top":newT})
           	  // $(".sanjiaoxing").html(WX+","+WT) 
           })
          });

	   $("#title_box").mouseup(function(){
	  	   $(document).off("mousemove");
	    });
	  
          $("#user").first().blur(function(){  		
	 	    if($.isNumeric($("#user").val())&& $("#user").val().length>7){
	 	    	$("#warning").html("");
	 	    }else{
	 	    	 $("#warning").html("请输入正确地QQ账号");
	 	    }
	        });

	          $("#pass").last().blur(function(){  		
	 	       if($("#pass").val().length<6){
	 	       	    $("#warning").html("密码不得少于6位");
	 	       }else{
	 	       	    $("#warning").html("");
	 	       }

	        }); 
	        $(".close").click(function(){
	        	$("#QQ_box").animate({"height":"0px","border":"0px"},500);
	            
	        	
	        });
    
});
          
