
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

// var o1Table=new Table();

// var table1=o1Table.init({
// 		'table_row':13,
// 		'table_col':4,
// 		'table_head':['姓名','语文','数学','英语'],
// 		'col_sort':[0,0,1,1,1],
// 		'table_content':{
// 			1:['小A',90,100,85],
// 			2:['小B',92,85,95],
// 			3:['小A',90,100,85],
// 			4:['小B',92,85,95],
// 			5:['小A',90,100,85],
// 			6:['小B',92,85,95],
// 			7:['小明',80,100,200],
// 			8:['小红',92,85,215],
// 			9:['小明',80,85,220],
// 			10:['小红',85,88,205],
// 			11:['小明',80,109,85],
// 			12:['小红',92,85,215],
// 			13:['小红',92,85,88]



// 		},
// 		'table_head_fixed':true

// 	});

// document.body.appendChild(table1);

// var o2Table=new Table();

// var table2=o2Table.init({
// 		'table_row':10,
// 		'table_col':3,
// 		'table_head':['姓名','语文','数学'],
// 		'col_sort':[0,0,1,1],
// 		'table_content':{
// 			1:['小A',90,100],
// 			2:['小B',92,95],
// 			3:['小A',90,85],
// 			4:['小B',95,95],
// 			5:['小A',90,85],
// 			6:['小B',92,95],
// 			7:['小明',80,100],
// 			8:['小红',92,85],
// 			9:['小明',80,85],
// 			10:['小红',85,88]

// 		},
// 		'table_head_fixed':true

// 	});

// document.body.appendChild(table2);