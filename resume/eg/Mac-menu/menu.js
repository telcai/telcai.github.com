$(document).ready(function(){
    var lists=$("#cont li"),
        imgs=$("#cont img")
       // console.log(lists.eq(0).offset().left+"----"+lists.eq(1).offset().left)
    $(document).mousemove(function(ev){
         var ev=ev || event;
         lists.each(function(i){
            var a=Math.abs($(this).offset().top+lists.height()/2-ev.clientY),
                b=Math.abs($(this).offset().left+lists.width()/2-ev.clientX),
                c=Math.sqrt(a*a+b*b),  //c表示鼠标到每一个li的中心点的距离，
                scale=1-c/400 
            if (scale<0.5){
                   scale=0.5;
                }
           imgs[i].style.width=128*scale+"px"  ;    
         }) ;
    });   


});