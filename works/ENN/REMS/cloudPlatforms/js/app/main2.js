//配置页面加载模块参数
require.config({
	//等待加载的时间
	waitSeconds:120,
	//添加加载异步加载CSS的插件
	map:{
		'*':{
			'css':'../lib/css.min'
		}
	},
	//配置Javascript文件映射路径
	paths: {
		modernizr	:"../lib/modernizr.custom",
		jquery		:"../lib/jquery.min",
		datepicker	:"../lib/datepicker/bootstrap-datepicker.min",
		datelocation:"../lib/datepicker/bootstrap-datepicker.zh-CN.min",
		jay			:"jay"
	},
	shim: {//模块依赖关系 demo
		//'swiperscrollbar': {deps:['swiper']},
		//'swiper': {deps: ['jquery']},
		//'swiper': {deps: ['jquery']},
		'datepicker': {deps: ['jquery']},
		'datelocation': {deps: ['datepicker']},
		'jay': {deps: ['jquery','modernizr','datepicker']},
		//'jay'  : {deps: ['swiper','swiperscrollbar']}
	}
});

//配置页面加载模块

require(
	[
		'jay'
	], 
	function (jquery,modernizr,jay){
		$(function() {
			jayfunction();
		});
	}
);
//加载对应css模块
require([
	"css!../../css/style2",
	"css!../../css/animations"
]);
