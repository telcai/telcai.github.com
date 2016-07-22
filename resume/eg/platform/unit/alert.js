	function Alert(){
		//默认值
		this.cfg={
			width:340,
			height:180,
			top:100,
			title:'提示',
			content:'内容',
			btn:'按钮',
			cover:false,
			closeBtn:false,
			theme:'',
			btn_handler:false,
			close_handler:false
		}

	};
	Alert.prototype={

		alert : function(set){
			var boundingBox=document.createElement('div');
			var boundingBoxHtml=document.createElement('div');
			var button=document.createElement('button');
			var title=document.createElement('div');
			var cfg={};
			for (var i in this.cfg){
	 			cfg [i]= set[i] ? set[i] : this.cfg[i];
			}

			// 弹框
			document.body.appendChild(boundingBox);
			boundingBox.className='win_boundingBox';
			boundingBox.style.width=cfg.width +'px';
			boundingBox.style.height=cfg.height+'px';
			boundingBox.style.top=cfg.top +'px';

			// 弹框标题
			title.innerHTML='<h3>'+cfg.title+'</h3>';
			title.className='win_title'+" "+'win_title_color';
			boundingBox.appendChild(title);

			// 弹框内容
			boundingBoxHtml.innerHTML=cfg.content;
			boundingBoxHtml.className='win_content';
			boundingBoxHtml.style.height=parseInt(boundingBox.style.height)-47+'px';

			boundingBox.appendChild(boundingBoxHtml);

			// 弹框按钮
			boundingBox.appendChild(button);
			button.innerHTML= cfg.btn;
			button.className="win_btn"+" "+"win_btn_color";
			button.onclick=function(){
				cfg.btn_handler && cfg.btn_handler();
				boundingBox.parentNode.removeChild(boundingBox);
				if(cfg.cover){
					document.body.removeChild(cover);
				}

			}

			// 关闭按钮
			if(cfg.closeBtn){
				var span=document.createElement('span');

				span.className='win_closeBtn';
				boundingBox.appendChild(span);
				span.onclick=function(){
					cfg.close_handler && cfg.close_handler();
					boundingBox.parentNode.removeChild(boundingBox);
					if(cfg.cover){
						document.body.removeChild(cover);
					}
				}

			}

			// 遮罩层
			if(cfg.cover){
				var cover=document.createElement('div');

				cover.className="win_cover";
				cover.style.height=document.body.clientHeight+'px';
				document.body.appendChild(cover);
				// cover.onclick=function(){
				// 	cfg.close_handler && cfg.close_handler();
				// 	boundingBox.parentNode.removeChild(boundingBox);
				// 	document.body.removeChild(cover);
				// }
			}
			// 定制主题
			if(cfg.theme){
				boundingBox.className='win_boundingBox'+' '+cfg.theme;
			}
		}

	};
