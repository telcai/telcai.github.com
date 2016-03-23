$(document).ready(function(){
	var Cont=$(".div-cont");
	var text=$(".mdl-card");
	var btns=$(".mdl-layout__drawer button");
	var colors=["black","#4a90e2","#75461d","#27b998"];

	$(".mdl-layout__drawer button").click(function(){
		var Index=$(this).index();
		var val;
		Cont.removeClass("sliUp");
		$(Cont[Index-1]).css("background","url(imgs/"+Index+".jpg) center/cover")
						.addClass("sliUp");

		val=$(btns[Index-1]).text();

		// console.log(val)
		$(".mdl-layout-spacer p").text(val)
		 $( text[Index-1]).removeAttr( "style" );
		 // console.log(Index%2)
		 if (Index%2){
		 	$( text[Index-1] ).delay(500).show( "clip",500 );
		 }else{
		 	$( text[Index-1] ).delay(500).show( "slide",500 );
		 }
		
		$(".mdl-layout__header-row").css("background-color",colors[Index-1]);

	})

$(".drawer-img").click(function(){
	Cont.removeClass("sliUp");
	$(".mdl-layout-spacer p").text("")
	$(".mdl-layout__header-row").css("background-color","rgb(156,39,176)");
})

       
 })