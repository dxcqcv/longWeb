require.config({
    waitSeconds:120,
    map:{
        '*':{
           'css':'../lib/css.min' 
        }
    },
    paths: {
        jquery:'../lib/jquery',
        dx:'dx'
    },
    shim: {
       'dx':{deps:['jquery']} 
    }
});

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
	"css!../../css/style1",
	"css!../../css/animations"
]);
