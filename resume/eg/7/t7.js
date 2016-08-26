
window.onload=function(){
	var btns=document.getElementsByTagName('button');
	// console.log(btns)
	for (let i=0;i<btns.length;i++){

		btns[i].addEventListener('click',function(){
			this.className=this.className+' ripple';
			
		},false);
		btns[i].addEventListener('webkitAnimationEnd',function(){
			this.className=this.className.toString().replace(/ripple/g,'');
			console.log(this.className)
		
		},false);
	
	};

	window.onscroll=function(){
		var dis=document.documentElement.scrollTop||document.body.scrollTop;
		console.log(dis)
		if(dis>300){
			var cont2=document.getElementsByClassName('cont-2')[0];
			if(cont2.className.indexOf('showb')==-1){
				cont2.className=cont2.className+' showb';
			}
			
		}
		if(dis>600){
			var cont3=document.getElementsByClassName('cont_3')[0];
			var img=cont3.getElementsByClassName('cont_3_img')[0];
			var p=cont3.getElementsByTagName('p')[0];

			if(img.className.indexOf('showc')==-1){
				img.className=img.className+' showc';
			}

			if(p.className.indexOf('showc')==-1){
				setTimeout(function(){
					p.className=p.className+' showc';
				},200);
			};
		}

		if(dis>1400){
			var liImg=document.getElementsByClassName('cont_5img')[0];
			var li0=liImg.getElementsByTagName('li')[0];
			var li1=liImg.getElementsByTagName('li')[1];
			var li2=liImg.getElementsByTagName('li')[2];
			var li3=liImg.getElementsByTagName('li')[3];

			if(li0.className.indexOf('showd')==-1){
				li0.className=li0.className+' showd';
			}
			if(li3.className.indexOf('showe')==-1){
				li3.className=li3.className+' showe';
			}
			if(li1.className.indexOf('showf')==-1&&li2.className.indexOf('showf')==-1){
				li1.className=li1.className+' showf';
				li2.className=li2.className+' showf';
			}
		};
		if(dis>2000){	
			var right=document.getElementsByClassName('cont_6_right left')[0];
			var left=document.getElementsByClassName('cont_6_left left')[0];

			if(right.className.indexOf('showg')==-1){
				right.className=right.className+' showg';
			}
			if(left.className.indexOf('showc')==-1){
				left.className=left.className+' showc';
			}
		}
		if(dis>2500){	
			var right=document.getElementsByClassName('cont7_right left')[0];
			var left=document.getElementsByClassName('cont7_left left')[0];

			if(right.className.indexOf('showg')==-1){
				right.className=right.className+' showg';
			}
			if(left.className.indexOf('showc')==-1){
				left.className=left.className+' showc';
			}
		}
		if(dis>2900){	
			var cont8=document.getElementsByClassName('cont_8')[0];

			if(cont8.className.indexOf('showa')==-1){
				cont8.className=cont8.className+' showa';
			}
		}

	}
}