$(document).ready(function(){
	var lis=$(".btn-list a");
	var title="";
	var Data="";

	//显示详细信息
	lis.on('click',function(event){
		var event=event||window.event;
		var val=$(event.target).html();
		$.post('php/app.php',{title:val},function(data){
			Process(data);
		});

	});
	// 按钮
	$("#back").on('click',toSearch);

	// 编辑
	$('#edit_icon').on('click',function(event){
		$('#back').unbind('click',toSearch);
		$(this).addClass('ui-disabled');
		var event=event||window.event;
		var Node=$(event.target).parent().parent().find('div.infor');
		// console.log(Node);
		Node.css("display","none");
		$(".search").css("display","none");


		$('#back').on('click',toSearch);
	//数据填充
		for (var i=0;i<Data.length;i++){
			var edit_html='<div data-role="fieldcontain">'
				+'<h3>名称：'
				+Data[i]['title']
				+'</h3><lable for="english">英文名称：</lable><input type="text" name="english" value="'
				+Data[i]['english']
				+'" /><lable for="update">更新人及时间：</lable><input type="text" name="update" value="'
				+Data[i]['update']
				+'" /><lable for="description">内容：</lable><textarea rows="5" style="overflow-y:scroll;" name="description" >'+Data[i]['description']+' </textarea>'
				+'<lable for="imgs">图片地址：</lable><input type="text" name="imgs" value="'
				+Data[i]['imgs']
				+'" /></div>'
				+'<button id="submit" class="ui-btn-center" data-role="button" href="#index2" data-rel="dialog" style="background-color:#1ABC9C;color:#fff;">提交</button>'
		}
		$('.edit').append(edit_html);
		$('.edit').trigger("create");
		$('.edit').show();

	//提交修改信息
		$("#submit").on('click',function(){
			// console.log($('textarea[name=description]').val());
			$('#edit_icon').removeClass('ui-disabled');

			$.post('php/edit.php',{
				title:Data[0]['title'],
				english:$('input[name=english]').val(),
				update:$('input[name=update]').val(),
				imgs:$('input[name=imgs]').val(),
				description:$('textarea').val()
			},function(data){
				// console.log(data);
				Update(data);
				toSearch();
				window.location.reload();
			});

		});

	});


	function toSearch(){
		$(".infor").css('display','none');
		$(".edit").css('display','none');
		$(".search").css('display',"block");
		$(this).css('display','none');
		$('#edit_icon').removeClass('ui-disabled');
		$('#edit_icon').css('display','none');
	}

	function Process(data){
		if(data==0){
			alert('没有找到查询结果！');
		}else{
			var html='';
			$('#back').css('display','block');
			$('#edit_icon').css('display','block');

			$("div[data-role=content]").html('');
			Data=$.parseJSON(data);
			$(".search").css('display',"none");

			for (var i=0;i<Data.length;i++){
				var imgs='';
				for (var j=0;j<Data[i]['imgs'].length;j++){
					imgs+='<a href="#pop'+i+j+'" data-rel="popup" data-position-to="window" data-transition="fade" title="点击查看大图"><img src="'
						+Data[i]['imgs'][j]
						+'" style="height:130px;" /></a>'
						+'<div data-role="popup" id="pop'+i+j+'">'
						+'<a href="#" data-rel="back" class="ui-btn ui-corner-all ui-icon-delete ui-btn-icon-notext ui-btn-right">关闭</a>'
						+'<img src="'
						+Data[i]['imgs'][j]
						+'" style="height:350px;" /></div>';
				};
				img_html='<div data-role="fieldcontain">'+imgs+'</div>';
			// console.log(img_html);

				html+='<div data-role="collapsible" data-collapsed-icon="carat-d" data-expanded-icon="carat-u"><h2>名称：'
					+Data[i]['title']				
					+'<br />英文名称：'
					+Data[i]['english']
					+'<br />资料更新：'
					+Data[i]['update']
					+'</h2><div><p class="text">'
					+Data[i]['description']
					+'</p>'
					+'<p>参考图片</p>'
					+img_html
					+'</div></div>';
			}
			$(".infor").append(html);
			$(".infor").css('display','block');

		 	$(".infor").collapsibleset().trigger('create');  	
		}
		
	}


	function Update(date){
		if(data="sucess"){
			alert('更新成功！');
		}else{
			alert('未完成更新！');
		}
	};


});

