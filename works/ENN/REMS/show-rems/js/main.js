/* index */
$('#date').datepicker()
// jQuery UI old icon
$('#btn1').button({icons: {primary: 'ui-icon-volume-on'}});
// Font Awesome Icon
$('#btn2').button({icons: {primary: 'fa fa-camera-retro'}});
// Font Awesome but BIGGER
$('#btn3').button({icons: {primary: 'icon-volume-up icon-large'}});
// Font Awesome extending
$('#btn4').button({icons: {primary: 'icon-fighter-jet icon-large'}});

/* baidu map */
/*
map = new BMap.Map("wrap");
map.centerAndZoom(new BMap.Point(106.387516,37.729803),5);
map.enableScrollWheelZoom(); map.setMinZoom(5);
//map.addControl(new BMap.NavigationControl());
map.enableAutoResize();
*/

/* ibs map */
		//初始化地图对象，加载地图
		var map = new AMap.Map('mapBox',{
			resizeEnable: true,
	        rotateEnable:true,
	        dragEnable:true,
	        zoomEnable:true,
	        //二维地图显示视口
	        //设置地图中心点
	        //设置地图显示的缩放级别
	        view: new AMap.View2D({
	            //center: new AMap.LngLat(121.498586, 31.239637),
	            center: new AMap.LngLat(106.387516,37.729803),
	            zoom: 4 
	        })
	    });
        /*
        map.setCity('中国');
        map.setCity('上海');
        map.setCity('北京');
        */
