window.onload=function(){
	window.location.hash=' ';
	var main=$('#main');
	var url='';

	$('#mylist').on('click',function(){
		window.location.hash='#index';
	});
	
}

var _id="";  //数据在数据库的id

window.onhashchange = function(){     //监听hash值变化，实现页面变换
	var hash=window.location.hash;	
    changePage(hash); 
}  

function changePage(hash){
	// window.location.hash=hash;
	switch (hash)
	{
	case '#index':
		url='partials/list.html';
		break;
	case '#newpage':
		url='partials/newpage.html';
		break;	
	case '#edit':
		url='partials/edit.html';
		break;
	case '#viewQ':
		url='partials/viewQ.html';
		break;
	case '#viewData':
		url='partials/viewData.html';
		break;
	}

	$.ajax({      //根据hash值选择页面
		type:'GET',
		url:url,
		async:false,
		success:function(data){
			main.innerHTML=data;
			processData(hash);
		}
	});
}  //changePage  


function processData(hash){   //处理页面内容
	if(hash=='#index'){     //index页面
		$('#newBtn').on('click',function(){
			window.location.hash='#newpage';
		});
		$.post('./php/list.php',function(data){
			var data=$.parseJSON(data);
			processList(data);
		});
	}

	if(hash=='#newpage'){     //新建问卷页面
		$('#newpageBtn').on('click',function(){
			window.location.hash='#edit';
		});
	}

	if(hash=='#edit'){    //编辑页面
	//calendar 插件
		var para={
			start_year:2016,
			end_year:2020,
			input:'calendar',  //获取的数据返回位置id
		};
		$('#calendar').on('click',function(e){
			Calendar.create(para,'calendarBox');  //接受第二个参数，表示容器
		});
	//添加问题
		$('.addBtn').on('click',function(e){
			$('.addType').toggle(300);
		});

		$('.addType button').on('click',function(e){
			var type=$(this).attr('class');
			var newQ=new NewQ(type);
		});
	//保存问卷
		$('.save').on('click',function(){
			var results=checkPage();   //检查页面是否填写完整，返回结果

			// alert插件
			var oAlert= new Alert();
			oAlert.alert({
				content:results.cont,
				btn:'确定',
				cover:true,
				btn_handler:false,
				close_handle:false
			});

			//当页面填写完整时，提交到数据库
			if(results.flag=='1'){
				var content=$('.Qblock').html();
				var isNew=0;   
				if (results.id==0) {
					isNew=1;
				};     //判断问卷是否新建，新建isNew＝1，编辑已有问卷isNew＝0；

				$.post('./php/a.php',{   //提交问卷信息到数据库
					title:results.title,
					content:content,
					saveTime:results.saveTime,
					status:'未发布',
					endDate:results.endDate,
					id:results.id,
					isNew:isNew
				},function(data){
					// console.log(data);
				});
				
				window.location.hash='#index';  //完成保存后跳转＃index
			}
		});

		$('.issue').on('click',function(){    //发布 与.save基本相同 ，注意status
			var results=checkPage();
			var oAlert= new Alert();
			oAlert.alert({
				content:'是否发布问卷？<br />(此问卷截止日起为'+results.endDate+')',
				btn:'确定',
				cover:true,
				closeBtn:true,
				btn_handler:false,
				close_handle:false
			});
			var content=$('.Qblock').html(); 
			var isNew=0;
			if (results.id==0) {
				isNew=1;
			};
			
			$.post('./php/a.php',{
				title:results.title,
				content:content,
				saveTime:results.saveTime,
				status:'发布中',
				endDate:results.endDate,
				id:results.id,
				isNew:isNew
			});
			
			window.location.hash='#index';
		});

	}  //#edit
} //processDate

//处理每一个新问题
function NewQ(type){
	this.type=type;
	this.set={};
	this.init();
};		
NewQ.prototype={
	init:function(){   //新问题基本结构初始化
		var newQ=$('<div class="newQ"></div>');
		var Qlist='';
		var type=this.type;
		var set=this.set;
		var that=this;
		var index=$('.newQ').length+1?$('.newQ').length+1:0;   //添加index属性，用来标记题号

		newQ.attr('index',index);
		newQ.html('<header></header><div class="listQ"></div><footer><ul><li class="up">上移</li><li class="down">下移</li><li class="copy">复用</li><li class="del">删除</li></ul></footer>');
		$('.Qblock').append(newQ);
		set.newQ=newQ;
		set.header=newQ.children('header');
		set.footer=newQ.children('footer');
		set.listQ=newQ.children('.listQ');

		if(this.type=='radio'){
			set.header.html('<span class="index">Q'+index+'</span><input type="text" value="单选题" /></h4><button class="add-option">添加选项</button><button class="del-option">删除选项</bitton>');
			var question=set.header.children('input').val();
			set.addOption=set.header.children('.add-option');
			set.delOption=set.header.children('.del-option');

			for (var i=0;i<3;i++){
				Qlist+='<li><input type="'+type+'" name="'+question+'" />&nbsp;<input class="options" type="text" value="选项'+parseInt(i+1)+'" /></li>'
			}
			set.listQ.html('<ul>'+Qlist+'</ul>');

			set.addOption.on('click',function(){
				that.addOption(set,type,question);
			});
			set.delOption.on('click',function(){
				that.delOption(set);
			});
		}
		if(this.type=='checkbox'){
			set.header.html('<span class="index">Q'+index+'</span><input type="text" value="多选题" /></h4><button class="add-option">添加选项</button><button class="del-option">删除选项</bitton>');
			set.addOption=set.header.children('.add-option');
			set.delOption=set.header.children('.del-option');
			for (var i=0;i<3;i++){
				Qlist+='<li><input type="'+type+'" />&nbsp;<input class="options" type="text" value="选项'+parseInt(i+1)+'" /></li>'
			}
			set.listQ.html('<ul>'+Qlist+'</ul>');

			set.addOption.on('click',function(){
				that.addOption(set,type,question);
			});
			set.delOption.on('click',function(){
				that.delOption(set);
			});
		}
		if(this.type=='text'){
			set.header.html('<span class="index">Q'+index+'</span><input type="text" value="问答题" /></h4>');
			set.listQ.html('<textarea></textarea>');
		}	

		set.footer.on('click',function(e){
			var event=e||window.event;
			var target=event.target||event.srcElement;
			that.moveNode(target,set,that);  
		});

	},

	addOption:function(set,type,question){   //增加选项
		var ul=set.listQ.children('ul');
		var len=ul.children('li').length;
		if(type=="radio"){
			ul.append('<li><input type="'+type+'" name="'+question+'" />&nbsp;<input class="options" type="text" value="选项'+parseInt(len+1)+'" /></li>');

		}
		if(type=='checkbox'){
			ul.append('<li><input type="'+type+'" />&nbsp;<input class="options" type="text" value="选项'+parseInt(len+1)+'" /></li>');
		}
	},

	delOption:function(set){    //删除选项
		var ul=set.listQ.children('ul');
		ul.children('li:last').remove();
	},

	moveNode:function(target,set,that){   //调整问题的位置
		var prevNode=set.newQ.prev();
		var nextNode=set.newQ.next();

		if($(target).attr('class')=='up' && prevNode.attr('index')){
			set.newQ.insertBefore(prevNode);
			changeIndex();
		}
		if($(target).attr('class')=='down' && nextNode.attr('class')!='addQ'){
			set.newQ.insertAfter(nextNode);
			changeIndex();
		}
		if($(target).attr('class')=='copy'){
			set.newQ.clone(true).insertAfter(set.newQ);
			changeIndex();
		}
		if($(target).attr('class')=='del'){
			set.newQ.remove();
			changeIndex();
		}

		function changeIndex(){   //交换问题节点的位置后，交换问题的index
			var newQs=$('.newQ');
			for (var i=1;i<=newQs.length;i++){
				$(newQs[i-1]).attr('index',i);
				$(newQs[i-1].getElementsByTagName('span')).html('Q'+i);
			}
		}
	}		
} //NewQ


function checkPage(){     //检查页面是否填写完整
	var title=$('.page header input').val();
	var endDate=$('#calendar').val();  //截止日期
	var flag=1;
	var d=new Date();
	var cont='保存成功！';

	//日期格式化
	function len(str){
		if(str.toString().length<2){
			return '0'+str;
		}else{
			return str;
		}
	};
	var saveTime=d.getFullYear()+'-'+len(d.getMonth()+1)+'-'+len(d.getDate())+' '+len(d.getHours())+':'+len(d.getMinutes())+':'+len(d.getSeconds());

	if($('.newQ').length=='0'){
		cont='请添加问卷调查题目！';
		flag=0;
	}else if(title==''){
		cont='请添加文件标题！';
		flag=0;

	}else if(!endDate){
		cont='请选择问卷截止日期！';
		flag=0;
	}
	_id=_id?_id:0;   //用来标记此问卷时新建问卷（_id=0）还是编辑的已有问卷(_id为问卷在数据库中的id)

	return {
		flag:flag,
		cont:cont,
		title:title,
		saveTime:saveTime,
		endDate:endDate,
		id:_id
	}

}//checkPage

//在index页面填写数据库中的问卷
function processList(data){  
	var btn3=''; 
	for (var i=0;i<data.length;i++){
		if(data[i].status=='未发布'){
			btn3='查看问卷';
		}else{
			btn3='查看数据';
		}
		var tr='<tr data-id="'
			+data[i]._id.$id
			+'" data-status="'
			+data[i].status
			+'"><td><input type="checkbox" /></td><td>'
			+data[i].title+'</td><td>'
			+data[i].saveTime+'</td><td class="notissue">'
			+data[i].status+'</td><td colspan="2">'
			+'<button class="disable">编辑</button><button class="disable">删除</button><button class="disable">'
			+btn3
			+'</button></td></tr>';

		$('.list tbody').append(tr);
	}
	$('.list tfoot input').on('click',function(){  //全选按钮
		if ($(this).is(":checked")){   //全选按钮被选中
			$('.list input[type="checkbox"]').prop('checked',true);
			console.log($('.list input[type="checkbox"]').prop('checked'));

			$(this).next('button').addClass('checked').click(function(){
				// console.log($(this))
				var tr=$('tbody tr');
				var oAlert= new Alert();
				oAlert.alert({
					content:'确定要全部删除问卷吗？',
					btn:'确定',
					cover:true,
					closeBtn:true,
					btn_handler:function(){
						tr.remove();
						$.post('./php/getdata.php',{type:'delall'});   //操作数据库
						$('.list tfoot input').prop('checked',false);
						$(this).next('button').removeClass('checked').off('click');  //
					},
					close_handle:false
				});
			});
		}else{ //全选按钮没有选中
			$('.list input[type="checkbox"]').prop('checked',false);
			$(this).next('button').removeClass('checked').off('click');
		}
	});
	
	$('.list tbody tr').each(function(){   //根据不同的状态设置样式颜色
		if($(this).attr('data-status')=='发布中'){
			$(this).children('.notissue').addClass('issuing');
		}
		if($(this).attr('data-status')=='结束'){
			$(this).children('.notissue').addClass('endissue');
		}
		if($(this).attr('data-status')=='未发布'){
			$(this).children('.notissue').removeClass().addClass('notissue');
		}
	})

	
	$('.list tbody input[type="checkbox"]').on('click',function(){
		if ($(this).is(":checked")){
			var buttons=$(this).parent().parent().find('button');   //操作栏中的3个按钮
			buttons.addClass('checked');
			buttons.on('click',function(){
				listBtn($(this));   //按钮点击事件
			});
		}
				
		if(!$(this).is(':checked')){
			var buttons=$(this).parent().parent().find('button');
			buttons.removeClass('checked');
			buttons.off('click');
		}
	});

	function listBtn(target){
		var tr=target.parent().parent();
		_id=tr.attr('data-id');    //获取该条数据的id
		var _status=tr.attr('data-status');   //获取该条数据的状态

		if(target.html()=='编辑'){     //点击‘编辑’按钮时
			if(_status=="发布中"){
				var oAlert= new Alert();
				oAlert.alert({
					content:'问卷正在发布中，无法编辑！',
					btn:'确定',
					cover:true,
					btn_handler:false,
					close_handle:false
				});
			}
			else if(_status=="未发布"){
				window.location.hash='#edit';
				$.post('./php/getdata.php',{type:'edit',id:_id},function(data){
					var data=$.parseJSON(data);
				
					$('.page header input').val(data[0].title);
					$('.Qblock').html(data[0].content);
					$('#calendar').val(data[0].endDate);
				});
			}
			else if(_status=="结束"){
				var oAlert= new Alert();
				oAlert.alert({
					content:'问卷已结束，无法编辑！',
					btn:'确定',
					cover:true,
					btn_handler:false,
					close_handle:false
				});
			}
		};

		if(target.html()=='删除'){    //点击‘删除’按钮时
			
			if(_status="发布中"){
				var oAlert= new Alert();
				oAlert.alert({
					content:'问卷正在发布中，无法删除！',
					btn:'确定',
					cover:true,
					btn_handler:false,
					close_handle:false
				});
			}else{
				var oAlert= new Alert();
				oAlert.alert({
					content:'确定要删除问卷吗？',
					btn:'确定',
					cover:true,
					closeBtn:true,
					btn_handler:function(){
						tr.remove();
						$.post('./php/getdata.php',{type:'del',id:_id});
					},
					close_handle:false
				});
			}
		}

		if(target.html()=='查看问卷'){    //点击‘查看数据’按钮时
			window.location.hash='#viewQ';   //切换到 ＃viewQ页面 此页面为问卷展示页，与edit页面的区别为：不可编辑

			$.post('./php/getdata.php',{type:'edit',id:_id},function(data){  //根据数据的存储id获取数据，与＃edit页面时获取相同，这里仍用type:'edit'
				var data=$.parseJSON(data);
				$('.page header input').val(data[0].title);
				$('.Qblock').html(data[0].content);
				
				$('.save').on('click',function(){
					window.location.hash='#index';
				});

				$('.newQ').addClass('moveHover');   //去掉每个问题的hover样式
				$('.newQ footer').css('display','none');
				$('.newQ input').attr('readonly','readonly');


				$('.issue').on('click',function(){
					var oAlert= new Alert();
					oAlert.alert({
						content:'是否发布问卷？<br />(此问卷截止日起为'+data[0].endDate+')',
						btn:'确定',
						cover:true,
						closeBtn:true,
						btn_handler:false,
						close_handle:false
					});
				
					$.post('./php/getdata.php',{	  //点击‘发布’按钮将问卷状态更新
						status:'发布中',
						type:'view',
						id:_id
					});
					window.location.hash='#index';
				});
			});
		} //#viewQ
		if(target.html()=='查看数据'){
			window.location.hash='#viewData';   //切换到 ＃viewData页面 此页面为问卷展示页，与viewQ页面的区别为：展示调查的数据统计
			$.post('./php/getdata.php',{type:'edit',id:_id},function(data){  //根据数据的存储id获取数据，与＃edit页面时获取相同，这里仍用type:'edit'
				var data=$.parseJSON(data);
				$('.page header input').val(data[0].title);
				$('.Qblock').html(data[0].content);
				$('.newQ').addClass('moveHover').addClass('viewData');
				$('.newQ input').attr('readonly','readonly');
				$('.newQ .add-option').replaceWith('<p class="p1">数据占比</p>')
				$('.newQ:even li').each(function(){
					 $(this).children('input:first').replaceWith('<div class="bar"><div class="bar-all"><span class="bar-color"></span></div><span class="persent">80%</span></div>')
				})
				$('.newQ:odd').each(function(i){

					if($(this).children('header').children('input[type="text"]').val()!='问答题'){
						 $(this).children('.listQ').append('<div class="chart"></div>');
						 
						 var myChart = echarts.init($('.chart')[i]);
						    myChart.setOption({
						    series : [
						        {
						            name: '访问来源',
						            type: 'pie',
						            radius: '55%',
						            data: [{value:400, name:"选项1"},{value:335, name:"选项2"},{value:310, name:"选项3"}]					        
						        }
						    ]
						})
					}
				})


					//each
				// console.log($('.newQ header input[type="text"]').val())
				$('.newQ header input[type="text"]').each(function(){

					if($(this).val()=='问答题'){
						// console.log($(this))
						$(this).after('<p class="p1" style="top:0px">有效回答占比</p>')
						$('.newQ textarea').replaceWith('<div class="textCont"><div class="bar" style="margin-right:30px"><div class="bar-all"><span class="bar-color"></span></div><span class="persent">80%</span></div></div>');
						
					}
				}) ;

				$('.save').on('click',function(){
					window.location.hash='#index';
				});
			});
		}//viewData

	} //listBtn

}//processList




