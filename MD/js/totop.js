window.onload=function(){
      var oBtn=document.getElementById("totop");
      var timer=null;
      var oSym=true;
      window.onscroll=function(){
        oBtn.style.display="block";
        if (!oSym){
              clearInterval(timer);
            }
            oSym=false;
        oBtn.onclick=function(){
          timer=setInterval(scrollValue,30);
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
  
      

     
  
      
 