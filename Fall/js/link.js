   window.onresize=window.onscroll=function(){

         var oMenu=document.getElementById("social-font");
         var scrollTop=document.body.scrollTop;
         var t=Math.floor((oMenu.clientHeight)/2);
         oMenu.style.top=scrollTop+t+"px";
         console.log(oMenu.style.top)
       }