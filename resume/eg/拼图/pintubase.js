$(document).ready(function(){
  //function starter(){ 
  var oPosition=[],
      Pics=$("#box li")

   window.imgs=null;
   $(".btn1").on("click",function(){
      
       $(".home").fadeIn(500).delay(1000).fadeOut(500);
   })

   $(".list li").on("click",function(){

    var txt=$(this).html(),  //被选择的li
        Index=$(this).index()
      //$(".txtBtn").html(txt);
      $(".list").slideUp(500);  
      $(".btn3").removeAttr("disabled");
     for (var i=0; i<Pics.length;i++){
        if (i!=Index){
           $(Pics[i]).removeClass().addClass("boxs");
        }else{
           $(Pics[Index]).removeClass().addClass("box1");
        }
      }
      imgs=$(".box1 img");
      //定位
    imgs.each(function(i){
      oPosition.push({
        left:imgs[i].offsetLeft,
        top:imgs[i].offsetTop
       });
    })

    imgs.each(function(i){
      imgs[i].id=i;
      imgs[i].index=i;
      imgs[i].style.left=oPosition[i].left+"px";
      imgs[i].style.top=oPosition[i].top+"px";
    })

    imgs.css("position","absolute");//定位
    $(".btn1").off("click");
    $(".btn1").on("click",function(){ 
      //随机排序
        Random(imgs,oPosition);
        open=1;
      //游戏计时
        timeIndex = 0;
        times = setInterval(setTime, 1000);    //每隔1秒执行函数
        //imgs.draggable({ "disabled": "true" });
        $(".btn1").css("display","none");
        $(".btn2").css("display","block");

        dragging(oPosition,imgs);

   })

      $(".btn2").on("click",function(){
         clearInterval(times);
        // $(".btn2").css("display","none");
        // $(".btn1").css("display","block");     
        $(".time").val("");
        timeIndex = 0;
        times = setInterval(setTime, 1000);
        Random(imgs,oPosition);
  });
      $(".selected").css("display","block").html(txt);
      $(".changePic").css("display","none");//选择图片按钮

})  //click

      $(".btn3").attr("disabled","true");
      $(".btn3").on("click",Stop);

    $(".txtBtn").click(function(ev){
        $(".list").slideToggle(500);
      clearInterval(timerBling);

   }).mouseover(function(){
       $(".txtBtn").css("cursor","pointer");
   });
   

  //闪烁效果 
      timerBling=setInterval(function(){
            $(".txtBtn").animate({"opacity":0.2},400).animate({"opacity":1},400);  
          },800);

})//document

function dragging(oPosition,obj){
  
   var zIndex=1;
    obj.mousedown(function(evn){
      var o=null;
      var evn=evn || event,
        oDrag=$(evn.target)[0],
        disX=evn.clientX-$(this).offset().left,
        disY=evn.clientY-$(this).offset().top,
        pzArr=[]
      $(this).css("z-index",zIndex++);

        $(document).mousemove(function(evn){
          var evn=evn || event,
            newX=evn.clientX-disX,
            newY=evn.clientY-disY,
            pzArr=[]
          $(oDrag).offset({
                 "left":newX,
                 "top":newY
              });

          //移动过程中检测碰撞
          obj.each(function(i){
                 //console.log(obj[i].index);
            if (oDrag != obj[i]){
                Pengz(oDrag,obj[i])&&pzArr.push(obj[i]);
            }
          });
          o=getShort(oDrag,pzArr);
          
          // console.log(o.index)
         
        })//mousemove

        $(document).mouseup(function(){
          $(document).off("mouseup");
          $(document).off("mousemove");
      //console.log(oP[oDrag.index].left+",,"+oP[o.index].left)

          if (o){
            Jmove(o,{
              left:oPosition[oDrag.index].left,
              top:oPosition[oDrag.index].top
            },300);

            Jmove(oDrag,{
              left:oPosition[o.index].left,
              top:oPosition[o.index].top
            },300)
            var temp=o.index;
            o.index=oDrag.index;
            oDrag.index=temp;

          }else{
            Jmove(oDrag,{
              left:oPosition[oDrag.index].left,
              top:oPosition[oDrag.index].top
            },300)
          }
      succed(obj,oPosition,times);
      })//mouseup
        return false;
    })//mousedown

     //检测是否拖拽成功
   }


//随机排序
function Stop(){
        $(".btn2").css("display","none");
        $(".btn1").css("display","block");     
        $(".time").val("");
        location.reload();//重新加载页面
}
function Random(obj,oPosition){
  var arr=[];
      for (var i=0;i<obj.length;i++){
        arr.push(i);
      } 
       //数组arr随机排序
      arr.sort(function(){
          return Math.random()-0.5;
      });
     
    obj.each(function(i){
      Jmove( obj[i],{
          left:oPosition[arr[i]].left,
          top:oPosition[arr[i]].top
        },500,'backOut');
        obj[i].index=arr[i];
      });
}


function succed(obj,oP,times){
    var succedArr=[];
    var oArr=[];
    obj.each(function(i){
      succedArr.push(obj[i].index);
      oArr.push(i);
   })
   // console.log(succedArr+",,"+oArr)
   // console.log(succedArr.toString()==oArr.toString())
  if (succedArr.toString()==oArr.toString()){

      setTimeout(function(){
         $(".tip").css("display","block");
        $("#over").css("display","block"); 
        clearInterval(times); //清除计时器 
        $(".showTime").html("共用时 "+$(".time").val()+"");  
      },600);

       $(".close").click(function(){
           $(".tip").css("display","none");
           $("#over").css("display","none");
           Stop();
     
         });

      }
}


function setTime(){
    //var hour = parseInt(timeIndex / 3600);    // 计算时 
    var minutes = parseInt((timeIndex % 3600) / 60);    // 计算分 
    var seconds = parseInt(timeIndex % 60);    // 计算秒  
    
    //hour = hour < 10 ? "0" + hour : hour;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    $(".time").val( minutes + ":" + seconds);
    timeIndex++;
 }
  function Pengz(obj1,obj2){
   var T1=obj1.offsetTop,
       L1=obj1.offsetLeft,
       R1=obj1.offsetWidth+L1,
       B1=obj1.offsetHeight+T1,
       T2=obj2.offsetTop,
       L2=obj2.offsetLeft,
       R2=obj2.offsetWidth+L2,
       B2=obj2.offsetHeight+T2
   return !(R1<L2||B1<T2||L1>R2||T1>B2); //发生碰撞
}

function getShort(obj,arr){
  var  dis=10000;
  var o=null;
    $(arr).each(function(i){
      var a=obj.offsetTop-arr[i].offsetTop,
          b=obj.offsetLeft-arr[i].offsetLeft,
          c=Math.sqrt(a*a+b*b)
      if (c<dis){
        dis=c;
          o=arr[i];
      }
      
    }) ; 
  return o;
}
