define(function(){
	function Window(){
		//默认值
		this.cfg={
			width:400,
			height:300,
			title:'弹框提示',
			content:'弹框内容',
			btn:'按钮'
		}

	};
	Window.prototype={

		alert : function(cfg){
			var boundingBox=document.createElement('div');
			var boundingBoxHtml=document.createElement('div');
			var button=document.createElement('button');
			var title=document.createElement('div');

			// 弹框
			document.body.appendChild(boundingBox);
			boundingBox.className='win_boundingBox';
			boundingBox.style.width=cfg.width ? cfg.width+'px' : this.cfg.width+'px';
			boundingBox.style.height=cfg.height ? cfg.height+'px' : this.cfg.height+'px';
			boundingBox.style.top=cfg.top ? cfg.top+'px' : (window.innerHeight-cfg.height)/2+'px';

			// 弹框标题
			title.innerHTML=cfg.title ? cfg.title : this.cfg.title;
			title.className='win_title'+" "+'win_title_color';
			boundingBox.appendChild(title);

			// 弹框内容
			boundingBoxHtml.innerHTML=cfg.content ? cfg.content : this.cfg.content;
			boundingBoxHtml.className='win_content';
			boundingBoxHtml.style.height=parseInt(boundingBox.style.height)-47+'px';

			boundingBox.appendChild(boundingBoxHtml);

			// 弹框按钮
			boundingBox.appendChild(button);
			button.innerHTML= cfg.btn ? cfg.btn : this.cfg.btn;
			button.className="win_btn"+" "+"win_btn_color";
			button.onclick=function(){
				cfg.btn_handler && cfg.btn_handler();
				boundingBox.parentNode.removeChild(boundingBox);
				document.body.removeChild(cover);

			}

			// 关闭按钮
			if(cfg.closeBtn){
				var span=document.createElement('span');

				span.className='win_closeBtn';
				boundingBox.appendChild(span);
				span.onclick=function(){
					cfg.close_handler && cfg.close_handler();
					boundingBox.parentNode.removeChild(boundingBox);
					document.body.removeChild(cover);
					document.body.removeChild(cover);

				}

			}

			// 遮罩层
			if(cfg.cover){
				var cover=document.createElement('div');

				cover.className="win_cover";
				document.body.appendChild(cover);
				cover.onclick=function(){
					cfg.close_handler && cfg.close_handler();
					boundingBox.parentNode.removeChild(boundingBox);
					document.body.removeChild(cover);


				}
			}

			// 定制主题
			if(cfg.theme){
				boundingBox.className='win_boundingBox'+' '+cfg.theme;
			}

		

		},

		confirm : function(){ },
		prompt : function(){ }

	};
	return { Window : Window };

});