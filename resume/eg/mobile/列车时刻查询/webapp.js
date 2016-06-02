var urlPre = "https://crossorigin.me/"; //跨域中转
//按站查询
var url1 = "http://www.webxml.com.cn/WebServices/TrainTimeWebService.asmx/getStationAndTimeByStationName?UserID=";
//按车次查询
var url2 = "http://www.webxml.com.cn/WebServices/TrainTimeWebService.asmx/getStationAndTimeDataSetByLikeTrainCode?UserID=";
//列车详细信息
var url3 = "http://www.webxml.com.cn/WebServices/TrainTimeWebService.asmx/getDetailInfoByTrainCode?UserID=";
var isBind="0";
//获取列车车次表
var getTimeLi=function(){
	
	//查询内容不为空
	if( $("#start").val() && $("#stop").val() || $("#num").val() ){
		
	//查询中的loading效果
	$.mobile.loading("show");

	var subBtn=$(this);
	var url=url1;
	var _data={};

	//查询过程中按钮设为不可用
	subBtn.attr("disabled",true);

		if(!($("#num").val())){ //按站查询链接
			 _data.StartStation=$("#start").val();
			 _data.ArriveStation=$("#stop").val();
			url=urlPre+url1;

		}else{  //按车次查询链接
			_data.TrainCode=$("#num").val();
			url=urlPre+url2;
		}

		$.get(url,_data,function(data){
			var list=$("#trainLi");
			var timeTables=$(data).find("TimeTable");
			var arr=[];

			list.html("");
			timeTables.each(function(index,obj){
				var i=index;
				
				var that=$(this);
				if(that.find("FirstStation").text()=="数据没有被发现"){
					list.html("<p>无查询结果！</p>");
					return false;
				}

				var _html="<li><a href='#' data-transition='pop' data-train='"+that.find("TrainCode").text()+"'><h2>"+
							that.find("TrainCode").text()+"</h2><p>"
							+that.find("FirstStation").text()+"-"
							+that.find("LastStation").text()+"</p><p> 用时："
							+that.find("UseDate").text()+"</p><p class='ui-li-aside'> 开车时间："
							+that.find("StartTime").text()+"</p></a></li>" ;
				arr.push(_html);

			});

			if(arr.length>0){
				list.html(arr.join("")); //将数组变为字符串
				list.listview("refresh");
			}

			$.mobile.loading("hide");
			subBtn.removeAttr("disabled");

		});//ajax
	}else{
		alert("请输入发车站和终点站，或查询车次！");
	}
} ;//getTimeLi

//获取详细信息
var flag=0;
var getDetail=function(){
if(flag=="0"){
	flag=1;

	$.mobile.loading("show");

	var trainCode = $(this).attr("data-train");
	var detailLi=$("#index2 tbody");
	var _data={};
	url=urlPre+url3;
	_data.TrainCode=trainCode;
	$("#index2 h2").html(trainCode+"次");
	detailLi.html("");

	$.get(url,_data,function(data){

		$(data).find("TrainDetailInfo").each(function(index,obj){
			var that=$(this);
			var tr=$("<tr></tr>");
			var _html="<td>"+that.find("TrainStation").text()+"</td><td>"
							+that.find("ArriveTime").text()+"</td><td>"
							+that.find("StartTime").text()+"</td>"

			tr.html(_html);
			detailLi.append(tr);
			$("#back").css("display","block");
		});

		$.mobile.loading("hide");
		$.mobile.changePage("#index2");
		flag=0;

	})
}
} ;//getDetail

$(document).on("pageshow","#index",function(){
	if(isBind=="0"){   //避免点击多次触发
		$("#submit").on("tap",getTimeLi);
		$("#trainLi").on("tap","a",getDetail);
		isBind=1;

		
	}


})
