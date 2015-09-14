require.config({
    waitSeconds:120,
    map:{
        '*':{
           'css':'../lib/css.min' 
        }
    },
    paths: {
        jquery:'../lib/jquery',
        roy:'roy'
    },
    shim: {
       'roy':{deps:['jquery']} 
    }
});

require(
	[
		'roy'
	], 
	function (jquery,modernizr,roy){
		$(function() {
			royfunction();
		});
	}
);
//加载对应css模块
require([
//Reset CSS
    "css!../../css/reset",
//Bootstrap Core CSS
    "css!../../css/bootstrap",
    "css!../../css/bootstrap-theme",
//Custom Fonts 
    "css!../../font-awesome/css/font-awesome",
//Custom CSS
    "css!../../css/global"
]);
