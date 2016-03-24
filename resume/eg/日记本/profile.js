$(document).ready(function(){
	var Num= window.localStorage.getItem('num')||0;
		$(".badge").html(Num); 

//显示头像
var oSrc='a0.jpg';
$(".icon").attr("src",window.localStorage.getItem('imgSrc')||oSrc);

// 图像预览
var result = $(".newImg"); 
var input = document.getElementById("file_input"); 
 
if(typeof FileReader==='undefined'){ 
    result.html("抱歉，你的浏览器不支持 FileReader"); 
    input.setAttribute('disabled','disabled'); 
}else{ 
    input.addEventListener('change',readFile,false); 
} 
function readFile(){ 
    var file = this.files[0]; 
    if(!/image\/\w+/.test(file.type)){ 
        alert("文件必须为图片！"); 
        return false; 
    } 
    var reader = new FileReader(); 
    reader.readAsDataURL(file); 
    reader.onload = function(e){ 
        result.html('<img id="logoImg" src="'+this.result+'" alt="" width="80px" height="80px"/>' ) ;
    } 

}//readFile 


//上传头像
	$(".upImg").click(function(){
		var imgSrc=$("#logoImg").attr("src");
		window.localStorage.setItem('imgSrc',imgSrc);
		$(".icon").attr("src",imgSrc);
		
  	 // console.log(imgSrc)
	});

//恢复默认头像
	$(".oImg").click(function(){
		$(".icon").attr("src",oSrc);
		window.localStorage.removeItem('imgSrc');
	});

});
