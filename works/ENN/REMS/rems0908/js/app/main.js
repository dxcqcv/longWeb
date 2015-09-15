require.config({
    waitSeconds:120,
    map:{
        '*':{
           'css':'../lib/css.min' 
        }
    },
    paths: {
        jquery:'../lib/jquery',
        bootstrap:'../lib/bootstrap.min',
        highcharts:'../lib/highcharts/highcharts',
        index:'index',
        login:'login',
        gyt:'gyt',
        roy:'roy'
    },
    shim: {
       'bootstrap':{deps:['jquery']},
       'highcharts':{deps:['jquery']},
       'gyt':{deps:['jquery','highcharts']},
       'roy':{deps:['jquery','bootstrap']}, 
       'index':{deps:['jquery','bootstrap']}, 
       'login':{deps:['jquery','bootstrap']} 
    }
});

require(
	[
		'roy','gyt','index','login'
	], 
	function (jquery,modernizr,roy){
		$(function() {
			royfunction();
			gytfunction();
			indexfunction();
			loginfunction();
		});
	}
);
//加载对应css模块
require([
//Reset CSS
    //"css!../../css/reset",
//Bootstrap Core CSS
    "css!../../css/bootstrap",
    "css!../../css/bootstrap-theme",
//Custom Fonts 
    "css!../../font-awesome/css/font-awesome",
//Custom CSS
    "css!../../css/global",
    "css!../../css/login",
    "css!../../css/index",
    "css!../../css/gyt",
    "css!../../css/others"
]);
