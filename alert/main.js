require(['window'],function(w){

	var btn=document.getElementById('btn');
	var btn2=document.getElementById('btn2');

	btn.onclick=function(){
		var win= new w.Window();
		win.alert({
			width:300,
			height:180,
			top:'' , //如果希望top的值为0，这里不可以直接写0，因为会认为是flase而使用默认值，可以传0.1避免这个问题
			title:'11111',
			content:'确定退出吗？',
			btn:'确定',
			cover:false,
			closeBtn:false,
			theme:'win_theme_blue', // 主题设为false为默认的黑色主题，备选主题有‘win_theme_red’,‘win_theme_blue’，可以用相同的方法在css中定制自己的主题
			btn_handler:function(){alert('you click the button')},
			close_handler:function(){alert('you click the closeBtn')}
		});

	}
	btn2.onclick=function(){
		var win= new w.Window();
		win.alert({
			width:300,
			height:180,
			top:'' , //如果希望top的值为0，这里不可以直接写0，因为会认为是flase而使用默认值，可以传0.1避免这个问题
			title:'',
			content:'确定退出吗？',
			btn:'确定',
			cover:true,
			closeBtn:false,
			theme:'win_theme_blue', // 主题设为false为默认的黑色主题，备选主题有‘win_theme_red’,‘win_theme_blue’，可以用相同的方法在css中定制自己的主题
			btn_handler:function(){alert('you click the button')},
			close_handler:function(){alert('you click the closeBtn')}
		});

	}

});