
var op={
		'table_row':6,
		'table_col':5,
		'table_head':['姓名','语文','数学','英语','总分'],
		'col_sort':[0,1,1,1,1],
		'table_content':{
			1:['小明',80,109,85,200],
			2:['小红',92,85,88,245],
			3:['小明',80,109,85,210],
			4:['小红',92,85,88,245],
			5:['小明',80,109,85,220],
			6:['小红',92,85,88,215]

		},
		'table_head_fixed':true
	};

var oTable=new Table(op);

document.body.appendChild(oTable);


var op1={
		'table_row':9,
		'table_col':4,
		'table_head':['姓名','数学','英语','总分'],
		'col_sort':[0,1,0,1],
		'table_content':{
			1:['小明',109,85,200],
			2:['小红',85,88,245],
			3:['小明',109,85,210],
			4:['小红',92,88,245],
			5:['小明',80,109,220],
			6:['小红',92,88,215],
			7:['小明',109,85,210],
			8:['小红',92,88,245],
			9:['小明',80,109,220],

		},
		'table_head_fixed':true
	};

var oTable1=new Table(op1);

document.body.appendChild(oTable1);
