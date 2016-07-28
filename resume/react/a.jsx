var Box=React.createClass({
	getInitialState:function(){
		return {
			data:[
				{id:'0000',name:'吃饭',status:false},
				{id:'0001',name:'睡觉',status:false},
				{id:'0002',name:'打豆豆',status:false}
			]
		};
	},    //初始化

	generateId:function(){
		return (Math.floor(Math.random()*9000)+1000).toString();   //随机产生一个4位数的id
	},

	handleSubmit:function(task){
		var tasks=this.state.data;
		var id=this.generateId();
		tasks.push({id:id, name:task, status:false });
		this.setState({data:tasks});
	},  //添加新任务 submit点击时触发 onClick

	handleChange:function(taskId){
		var index='';
		var tasks=this.state.data;
		for (var i in tasks){
			if(tasks[i].id==taskId){
				tasks[i].status=!tasks[i].status;
			}
		}
		this.setState({data:tasks});
	}, //改变任务状态 checkbox变化时触发 onChange

	handleDel:function(taskId){

		var tasks=this.state.data;
		tasks=tasks.filter(function(i){
			return i.id!=taskId;
		});              
		// console.log(tasks)
		// console.log(this.state.data)
		// for (var i in tasks){
		// 	if(tasks[i].id==taskId){
		// 		tasks.splice(i,1);  //删除数组中的元素
		// 	}
		// }

		this.setState({data:tasks});
	},

	handleDid:function(){
		var tasks=this.state.data;
		var didnum=0;
		for (var i in tasks){
			if(tasks[i].status==true){
				didnum++;
			}
		}
		return { allnum:tasks.length,
				 didnum:didnum   
			};  //为函数设置返回值，在子组件中得到数据

	},  //当this.state.data有改变时，更新底部完成状态

	render:function(){
		// console.log(this.state)
		return (
			<div>
				<Header />
				<div className="cont">
					<Body listData={this.state.data}  delListItem={this.handleDel} changeListStatus={this.handleChange} />
				</div>
				<Footer addTask={this.handleSubmit} totalTask={this.handleDid} />
			</div>
		);
	}

});


var Header=React.createClass({
	render:function(){
		return (
			<div>
				<header><h3>List</h3></header>
			</div>
		);
	}
})

var Body=React.createClass({

	listStatus:function(itemid){
		this.props.changeListStatus(itemid);
	}, // checkbox变化 由父组件的changeListStatus属性的到绑定函数。

	delTask:function(itemid){
		this.props.delListItem(itemid);
	}, 

	render:function(){
		var a=this.props.listData;
		
		var taskList=a.map(function(i){
				return (
					<ListItem 
					  item={i.name} 
					  itemId={i.id} 
					  itemStatus={i.status}
					  delTask={this.delTask} 
					  didTask={this.didTask}
					  listStatus={this.listStatus}  />
				)	
			},this);   //注意this,否则报错
 
		return <ul>{taskList}</ul> ;
	}			
});

var ListItem=React.createClass({

	changeStatus:function(){
		var item= this.refs.changeStatus; //refs 用来获取被选中的input的check状态 	
		this.props.listStatus(item.id);
	},

	delItem:function(){
		var item= this.refs.changeStatus;		
		this.props.delTask(item.id);
	},

	render:function(){
		var taskName=this.props.item;
		var taskId=this.props.itemId;		
		var taskStatus=this.props.itemStatus;
		var liClass=taskStatus ? 'did' : '';

		return (
			<li className={liClass} >
				<input 
					id={taskId} 
					type='checkbox' 
					checked={taskStatus}
					ref='changeStatus' 
					onChange={this.changeStatus}  />
					{taskName}
				<button 
					className='delBtn' 
					onClick={this.delItem}>
					删除
				</button>
			</li>
		);		
	}
})

var Footer=React.createClass({

	submitTask:function(){
		var taskInput=this.refs.addTask;
		 
		taskInput.focus(); 

		if(taskInput.value!=''){
			this.props.addTask(taskInput.value);
			taskInput.blur(); 
			taskInput.value='';
		}
	},
	
	render:function(){
		var num=this.props.totalTask().allnum;
		var did=this.props.totalTask().didnum;
		return (
			<footer>
				<p className="add">add task  <input ref="addTask" type="text" placeholder="还想做什么..?" /></p>
				<button className="save" onClick={this.submitTask} >Submit</button>
				<p className='total'>已完成:{did}／总共:{num}</p>
			</footer>
		);
	}			
});



ReactDOM.render(
	<Box />,
	document.getElementById('box')
)

