$(document).ready(function(){
	var img1=$("#d1 .next"),
		img2=$("#d2 .next"),
		img3=$("#d3 .next"),
		img4=$("#d4 .next"),
		allFall=0;
$("#list li").addClass("listRo");
$(".again").click(function  () {
		window.location.reload();
	});
//飘落
var falling=setInterval(function(){ 
	var left = Math.random()*window.innerWidth; 
	var height = Math.random()*window.innerHeight; 
// var src = "s1.jpg";
	// console.log(left);
 	var src = "s"+Math.floor(Math.random()*3+1)+".png";//两张图片分别为"s1.png"、"s2.png" 
	snow(left,height,src); 
},500); 

//pagefall
	img1.click(function(){

		fall($(this).parent(),allFall);
	});

	img2.click(function(){
		fall($(this).parent(),allFall);
	});

	img3.click(function(){
		fall($(this).parent(),allFall);
	});
	img4.click(function(){
		allFall=1;
		fall($(this).parent(),allFall);
	});


	
})//document

function fall(demo,allFall){
		demo.addClass("pagefall");
		var Index=demo.index()-1;
		
		// var set = setTimeout(function(){
  //           demo.removeClass("a");
  //           demo.addClass("b") ; 
  //       },3500);

  //       $("#list li").eq(Index).animate({
		// 	opacity:"0"
		// },2000);
		$("#list li").eq(Index).animate({
			opacity:"1"
		},1000);

		if (Index==1){
			$("#list li").eq(Index).animate({
				opacity:"1"
			},1000);
		}

		if (allFall==1){
		 	
		 	var start=setTimeout(function(){
		 			$("#list li").addClass("shining").addClass("pointer");
		 		},2500);

		 
		 	$("#list li").each(function(){

		 		$(this).click(function(){
		 			var i=$(this).index();
		 		 	// console.log(i)
		 			//页面旋转
 					$("#container").addClass("ro");
 					var clear = setTimeout(function(){
            			$("#container").removeClass("ro");
            			$("#d5").html($(".po").eq(i).html());
            			$(".po").css("opacity","0");
            			$(".next").css("display","none");
            		},1000);
 				});

		 	})
		   
		}//if
}

function snow(left,height,src){ 
	var div = document.createElement("div"); 
	var img = document.createElement("img"); 
	div.appendChild(img); 
	img.className = "roll"; 
	img.src = src; 
	div.style.left=left+"px"; 
	div.style.height=height+"px"; 
	div.className="div"; 
	document.getElementById("snowzone").appendChild(div); 
// setTimeout(function(){ 
// document.getElementById("snowzone").removeChild(div); 
// // console.log(window.innerHeight); 
// },5000); 
} 