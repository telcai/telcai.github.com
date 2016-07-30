$(document).ready(function(){
	var Cont=$(".div-cont");
	var text=$(".mdl-card");
	var btns=$(".mdl-layout__drawer button");
	var colors=["#34495e","#3498db","#88552a","#1abc9c"];
	// var colors=['']
	var colors1=["#2c3e50","#2980b9","#75461d","#16a085"];

	$(".mdl-layout__drawer button").click(function(){
		var Index=$(this).index();
		var val;
		Cont.removeClass("sliUp");
		$(Cont[Index-1]).css("background-color",colors1[Index-1])
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