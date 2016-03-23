$(document).ready(function(){
	var angleH=360/12,
	    angleM=360/60 

	for  (var i=0; i<=12;i++){	  
     $(".Hourline ul").append(
     	"<li class='hour-line' style='transform:rotate("+angleH*i+"deg) translate(80px,-10%)'></li>"
     	);
	}
    
	function showtime(){
            var timer= new Date();
            var h=timer.getHours();
            var m=timer.getMinutes();
            var s=timer.getSeconds();
            $('.time').html(h+":"+m+":"+s);
        }
     setInterval(showtime,1000);

	for  (var i=0; i<=60;i++){
		if((angleM*i)%10!=0) {
		    $(".Minline ul").append(
     		"<li class='min-line' style='transform:rotate("+angleM*i+"deg) translate(85px,-10%)'></li>"
     	);
		}

	}
    
  setInterval(function(){
    var date=new Date(),
        H=date.getHours(),
        M=date.getMinutes(),
        S=date.getSeconds()

    if (H==12&&M==0&&S==0){
    	   $(".Hpointer").css(
           'transform','rotate('+(-90)+'deg)'
     	  );
    }else{
    		$(".Hpointer").css(
           'transform','rotate('+(angleH*H+M*0.5-90)+'deg)'
     	   );
    }
 
    $(".Mpointer").css(
           'transform','rotate('+(angleM*M+S*0.1-90)+'deg)'
     	);
    $(".Spointer").css(
           'transform','rotate('+(angleM*S-90)+'deg)'
     	); 

    },1000)

})