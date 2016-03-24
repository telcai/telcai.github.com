$(document).ready(function(){
			var $len=$(".menu-2").length
			for (i=0;i<$len;i++){
				$(".menu-2")[i].id=i;
			}
			$(".menu-1").click(function(ent){
				$(ent.target).next().slideToggle(800);
				if ($(ent.target).css("border-bottom-left-radius")=="0px"){
					$(ent.target).css({"border-bottom-left-radius":"5px","border-bottom-right-radius":"5px","font-weight":"normal"})
				}else{
					$(ent.target).css({"border-bottom-left-radius":"0px","border-bottom-right-radius":"0px","font-weight":"600"})
				}
    		 });
    		// $("#0").click(function(){
     	// 		$("#eg-cont-right iframe").attr("src","eg/turning/turning.html");
     	// 	})
     		// $("#2").click(function(){
     		// 	$("#eg-cont-right iframe").attr("src","../iframe/iframe1.html");
     		// })
		});