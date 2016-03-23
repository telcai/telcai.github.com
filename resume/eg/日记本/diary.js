$(document).ready(function(){
   // window.localStorage.clear();
	 
    var showLi=$("#showList"),
        iNow= window.localStorage.getItem('num')||0,
        textChange=false,
        Index=-1;
        
		//console.log(iNow);
 	
  
    //读取原有数据
  for (var i=0;i<iNow;i++){
    var newLi=$("<button></button>").addClass("list-group-item").addClass("li").appendTo(".sideList")
        newLi[0].index=i;
        newLi.html(localStorage.getItem('title'+i));
  }
   $(".badge").html(iNow); 
    //本地保存
   $("#store").click(function(){
    // console.log(textChange)
    // console.log(Index)
      if (textChange){
        //编辑已有文章
        changeLi(Index);
        textChange=false;
      }else{
        //新建文章
        addLi(iNow);
      }
      
    })  //store

    //获取保存数据
 $(document).on('click','.sideList .li',function(){
       // console.log(this.index);
       // console.log(iNow)
       textChange=true;
       Index=this.index;
       This=$(this);
      // console.log(Index)
    $("#title input").val(window.localStorage.getItem('title'+this.index)); 
    $("#txt textarea").val(window.localStorage.getItem('text'+this.index)); 

  });//给动态添加的元素绑定事件
   
 //删除本地保存
   $("#del").click(function(){
    if (confirm("您确定要删除本文件吗？")) {
       This.remove();
       window.localStorage.removeItem('title'+Index);
       window.localStorage.removeItem('text'+Index);

        $("#title input").val("");
        $("#txt textarea").val("");

        //重新整理本地保存文件的顺序
        var newTitle=[];
        var newText=[];
        for (var i=0;i<iNow;i++){
          if(window.localStorage.getItem('title'+i)!=null){
            newTitle.push(window.localStorage.getItem('title'+i));
            newText.push(window.localStorage.getItem('text'+i));
          }   
        }
        // console.log(newTitle.length)
        iNow=newTitle.length;
         window.localStorage.setItem('num',iNow);
        for (var i=0;i<iNow;i++){
            window.localStorage.setItem('title'+i,newTitle[i]);
            window.localStorage.setItem('text'+i,newText[i]);
        }
        
        succeTip('删除成功！');
  };
        

 });

$("#delall").click(function(){
  if (confirm("确定要全部清除吗？")) {
    window.localStorage.clear();
     succeTip('全部清除成功！');
  };
     
});
  
    var upDown=0;
    showLi.click(function(){
        upDown++;
        $(".sideList").slideToggle();
        
        if(upDown%2){
            $("body").animate({"left":"0px"},300);
        }else{
            $("body").animate({"left":"-200px"},300);
        };
 
    })

})//document

function succeTip(tip){
        $(".badge").html($("#sideBar .li").length);
        alert(tip);
        window.location.reload();
//         $("#title input").val("");
//         $("#txt textarea").val("");
 }
 function addLi(iNow){
        var titleVal=$("#title input");
        var txtVal=$("#txt textarea");

       if (titleVal[0].value==""||txtVal[0].value==""){
            alert("标题或内容不能为空");
       }else{
       //放入NoteList
        var newLi=$("<button></button>").addClass("list-group-item").addClass("li").appendTo(".sideList")
           
            window.localStorage.setItem('title'+iNow,titleVal.val());
            window.localStorage.setItem('text'+iNow,txtVal.val());
            newLi.html(localStorage.getItem('title'+iNow));

            iNow++;
            window.localStorage.setItem('num',iNow);

         $("#sideBar .li").each(function(i){
            this.index=i;   
           });
        succeTip("添加成功！");
        } 
 
 }
 function changeLi(Index){
    var titleVal=$("#title input");
    var txtVal=$("#txt textarea");

       if (titleVal[0].value==""||txtVal[0].value==""){
            alert("标题或内容不能为空");
       }else{

         window.localStorage.setItem('title'+Index,titleVal.val());
         window.localStorage.setItem('text'+Index,txtVal.val());
         $("#sideBar .li")[Index].innerHTML=localStorage.getItem('title'+Index);
         succeTip("保存成功！");
       }

 }