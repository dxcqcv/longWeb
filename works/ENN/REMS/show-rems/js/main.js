(function(doc,win){
/* index */
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
	            zoom: 5 
	        })
	    });
        var addMarker = function(lngX, latY, title, size) {
        
            var marker = new AMap.Marker({
                //复杂图标
                icon: new AMap.Icon({    
                        //图标大小
                        //size:new AMap.Size(28,37),
                        size:new AMap.Size(size.w,size.h),
                        //大图地址
                        //image:"http://webapi.amap.com/images/custom_a_j.png", 
                        //image:"img/defaultProjectListImg.jpg", 
                        //imageOffset:new AMap.Pixel(-28,0)
                    }),
                //在地图上添加点
                position:new AMap.LngLat(lngX,latY)
              , topWhenMouseOver: true
            });
            marker.setMap(map)
            marker.setTitle(title);

              var aa = function(e) {
              //console.log($(this))
              //$(this)[0].Sc.size.x = 150
              //console.log($(this)[0].Sc.title)
              };
              var bb = function(e) {
              //console.log(this)
              };
              AMap.event.addListener(marker, 'mouseover', aa);
              AMap.event.addListener(marker, 'mouseout', bb);
        }
var demand;

function Request() {
    this.loading = $('#loading')
}
$.extend(Request.prototype, {
    start: function(opt) {
        var url = opt.url ? opt.url : 'rems-test.json'
          , type = opt.type ? opt.type : 'POST'
          , data = opt.data ? opt.data : {}
          , timeout = opt.timeout ? opt.timeout : 1000
          , currentRequest = null
          , done = opt.done ? opt.done : doneFn
          , fail = opt.fail ? opt.fail : failFn
          , self = this;

        currentRequest = $.ajax({
            url: url
          , type: type
          , timeout: timeout
          , data: data
          , dataType: 'json'
          , mimeType: 'application/json'
          , beforeSend: function() {
                if(currentRequest != null) currentRequest.abort();
          }
        })
        .done(function(data){
            var d = data;
            self.loading.addClass('hide');
            done(d);
        })
        .fail(function(jqXHR, textStatus) {
            if(textStatus == 'timeout') { alert('timeout'); }
            fail(jqXHR, textStatus);
        });
    }
});
function failFn(jqXHR, textStatus) { console.log('error is ' + jqXHR.statusText + ' textStatus is ' + textStatus); }
function doneFn() { console.log('done'); }
demand = new Request();
demand.start({done:indexInit});
function indexInit(data) {
// map left
    $('#remsTitle').text(data.title);
    $('#remsSubtitle').text(data.subtitle);
    $('#remsSubtitleTranslate').text(data.subtitleTranslate);
// map right
    var num = data.projects.length
      , str = ''
      , pic = 'img/defaultProjectListImg.jpg';
        for(var i = 0; i < num; i++) {
        str += '<div class="project-box clearfix" data-lng="'+data.projects[i].longitude+'" data-lat="'+data.projects[i].latitude+'">'
            +'<div class="project-box-left left">'
            +    '<img src="'+pic+'" alt="新奥">'
            +'</div>'
            +'<div class="project-box-right left">'
            +    '<p>'+data.projects[i].projectname+'</p>'
            +    '<p>项目类型：<span class="projectType">'+data.projects[i].industryclassname+'</span>所属行业：<span class="projectIndustry">'+data.projects[i].industrytypename+'</span></p>'
            +    '<p>功能建设：<span class="projectEnergy">'+data.projects[i].buildingarea+'</span></p>'
            +    '<p>项目地址：<span class="projectAddr">'+data.projects[i].address1+'</span></p>'
            +'</div>'
        +'</div>';
        // map markers
        addMarker(data.projects[i].longitude,data.projects[i].latitude,data.projects[i].projectname, {w:28,h:37});
        }
        $('#mapRightScroll').empty().append(str);
        //console.log(map.getZoom())
}
$(document).on('click','.project-box',clickProjectBox);
function clickProjectBox() {
    var $this = $(this)
      , lng = $this.attr('data-lng')
      , lat = $this.attr('data-lat')
      , doubleW = $this.width()
      , doubleH = $this.height()*2
        map.setZoomAndCenter(14, new AMap.LngLat(lng, lat));
        //console.log($this.height())
        $this.animate({'height':doubleH})
             .children('.project-box-right').addClass('hide')
             .end()
             .find('img').animate({'heihgt':200})
             //.find('img').animate({'heihgt':doubleH-22, 'width':doubleW-22})
             console.log('w '+doubleW)
             console.log('h '+doubleH)
}
/*
var mapObj = new AMap.Map("mapBox");
//自定义覆盖物dom元素
var m = document.createElement("div");
m.className = "marker";
var n = document.createElement("div");
n.innerHTML = "Amap";
m.appendChild(n);
 
function addM(x,y) {

//自定义覆盖物dom元素
var m = document.createElement("div");
m.className = "marker";
var n = document.createElement("div");
n.innerHTML = "Amap";
m.appendChild(n);
 
var marker = new AMap.Marker({
    map:mapObj, //添加到地图
  //position:new AMap.LngLat(121,32),//基点位置                 
  position:new AMap.LngLat(x,y),//基点位置                 
    //offset:new AMap.Pixel(0,-40),//相对于基点的偏移位置
    //draggable:true, //是否可拖动
    content:m //自定义覆盖物内容
});
            marker.setMap(mapObj);
//marker.setMap(mapObj);
//当触发mouseover事件时,换个皮肤
AMap.event.addListener(marker,"mouseover",function(){
    n.innerHTML = "高德软件";//修改内容
    m.className = "marker change";//增加样式
});
//当触发mouseout事件时,换回皮肤
AMap.event.addListener(marker,"mouseout",function(){
    n.innerHTML = "Amap";//修改内容
    m.className = m.className.replace("change","");
});
}
addM(121,32);
addM(131,32);
*/
/*
        var marker = new Array();
        var windowsArr = new Array();
        // map search 
        function placeSearch() {
            var MSearch;
            AMap.service(['AMap.PlaceSearch'],function(){
                MSearch = new AMap.PlaceSearch({ // struct locale
                    pageSize: 10
                  , pageIndex: 1
                  , city: '021' //city
                });
                // key words search
                MSearch.search('东方明珠',function(status, result){
                    if(status === 'complete' && result.info === 'OK') {
                        keywordSearch_CallBack(result);
                    }
                });
            });
        }
        placeSearch();
        // add marker & infowindow
        function addmarker(i, d) {
            var lngX = d.location.getLng()
              , latY = d.location.getLat()
              , markerOption = {
                    map: map
                  //, icon: 'http://webapi.amap.com/images/'+(i+1)+'.png'
                  , icon: new AMap.Icon({
                        size: new AMap.Size(157,136)
                      //, image: '\" class="fa fa-map-marker'
                      //, div: 'class="1"'
                  })
                  , position: new AMap.LngLat(lngX, latY)
                  , topWhenMouseOver: true
              }
              , mar = new AMap.Marker(markerOption);

              marker.push(new AMap.LngLat(lngX, latY));
              var infoWindow = new AMap.infoWindow({
                content: '<h3><font color="#00a6ac">' +(i+1)+ '.'+d.name + '</font></h3>' + TipContents(d.type, d.address, d.tel)
              , size: new AMap.Size(300,0)
              , autoMove: true
              , offset: new AMap.Pixel(0,-20)
              });
              windowsArr.push(infoWindow);
              var aa = function(e) {infoWindow.open(map, mar.getPosition());};
              AMap.event.addListener(mar, 'mouseover', aa);
        }
        // call back fn
        function keywordSearch_CallBack(data) {
            var resultStr = ''
              , poiArr = data.poiList.pois
              , resultCount = poiArr.length;
            for(var i = 0; i < resultCount; i++) {
                 resultStr += "<div id='divid" + (i + 1) + "' onmouseover='openMarkerTipById1(" + i + ",this)' onmouseout='onmouseout_MarkerStyle(" + (i + 1) + ",this)' style=\"font-size: 12px;cursor:pointer;padding:0px 0 4px 2px; border-bottom:1px solid #C1FFC1;\"><table><tr><td><img src=\"http://webapi.amap.com/images/" + (i + 1) + ".png\"></td>" + "<td><h3><font color=\"#00a6ac\">名称: " + poiArr[i].name + "</font></h3>";
                 resultStr += TipContents(poiArr[i].type, poiArr[i].address, poiArr[i].tel) + '</td></tr></table></div>';
                 addmarker(i, poiArr[i]);
            }
            map.setFitView();
        }
        function TipContents(type, address, tel) {// window content
               if (type == "" || type == "undefined" || type == null || type == " undefined" || typeof type == "undefined") {
		        type = "暂无";
		    }
		    if (address == "" || address == "undefined" || address == null || address == " undefined" || typeof address == "undefined") {
		        address = "暂无";
		    }
		    if (tel == "" || tel == "undefined" || tel == null || tel == " undefined" || typeof address == "tel") {
		        tel = "暂无";
		    }
		    var str = "  地址：" + address + "<br />  电话：" + tel + " <br />  类型：" + type;
		    return str;
        }
        function openMarkerTipById1(pointid, thiss) { //search by id
            thiss.style.background = '#CAE1FF';
            windowsArr[pointid].open(map, marker[pointid]);
        }
        function onmouseout_MarkerStyle(pointid, thiss) { // restore ater mouse leave
            thiss.style.background = '';
        }
              */
        /*
        map.setCity('中国');
        map.setCity('上海');
        map.setCity('北京');
        */
	

            //console.log(tmpl('item_tmpl',{}))

}(document,window)); // end

    // Simple JavaScript Templating
    // John Resig - http://ejohn.org/ - MIT Licensed
    (function(){
      var cache = {};
     
      this.tmpl = function tmpl(str, data){
        // Figure out if we're getting a template, or if we need to
        // load the template - and be sure to cache the result.
        var fn = !/\W/.test(str) ?
          cache[str] = cache[str] ||
            tmpl(document.getElementById(str).innerHTML) :
         
          // Generate a reusable function that will serve as a template
          // generator (and which will be cached).
          new Function("obj",
            "var p=[],print=function(){p.push.apply(p,arguments);};" +
           
            // Introduce the data as local variables using with(){}
            "with(obj){p.push('" +
           
            // Convert the template into pure JavaScript
            str
              .replace(/[\r\t\n]/g, " ")
              .split("<%").join("\t")
              .replace(/((^|%>)[^\t]*)'/g, "$1\r")
              .replace(/\t=(.*?)%>/g, "',$1,'")
              .split("\t").join("');")
              .split("%>").join("p.push('")
              .split("\r").join("\\'")
          + "');}return p.join('');");
       
        // Provide some basic currying to the user
        return data ? fn( data ) : fn;
      };
    })();
/* baidu map */
/*
map = new BMap.Map("wrap");
map.centerAndZoom(new BMap.Point(106.387516,37.729803),5);
map.enableScrollWheelZoom(); map.setMinZoom(5);
//map.addControl(new BMap.NavigationControl());
map.enableAutoResize();
*/

/* test */
/*
// d3
var data = [1,4,7,9,13,5,8,2,9]
  //, barHeight = 50
  , barWidth = 50
  , barPadding = 10
  //, svgHeight = (barHeight + barPadding) * data.length
  , svgWidth = (barWidth + barPadding) * data.length
  , svgHeight = 500;

var scale = d3.scale.linear()
.domain([0,d3.max(data)])
.range([svgWidth,0])

var svg = d3.select('#chart')
.append('svg')
.attr({
    'width': svgWidth
  , 'height': svgHeight
});

var bar = svg.selectAll('g')
.data(data)
.enter()
.append('g')
//.attr('transform',function(d,i){return 'translate(0,'+i*(barHeight+barPadding)+')';})
.attr('transform',function(d,i){return 'translate('+i*(barWidth+barPadding)+',0)';})

bar.append('rect')
.attr({
    //'width': function(d){return scale(d);}
//  , 'height': barHeight

   'y': function(d) {return scale(d)} // start draw from this
 , 'width': barWidth
 , 'height': function(d){return svgHeight - scale(d)} 
})
.style('fill','steelBlue')

bar.append('text')
.text(function(d){return d;})
.attr({
    //x: function(d){return scale(d);}
    y: function(d){return scale(d);}
//  , y: barHeight/2
  //, y: barWidth/2
  , x: barWidth/2
  , 'dy': 15
  //, 'text-anchor': 'end'
  , 'text-anchor': 'middle'
})
var width = 500, height = 250, margin = {left:50, top:30, right:20, bottom:20 }
  , gWidth = width - margin.left - margin.right
  , gHeight = height - margin.top - margin.bottom
var svg = d3.select('#chart')
.append('svg')
.attr('width',width) //attribute
.attr('height',height)

d3.select('svg').append('g')
var g = d3.select('svg')
.append('g')
.attr('transform','translate('+margin.left+','+margin.top+')')

var data = [1,3,5,7,8,4,3,7]

var scaleX = d3.scale.linear()
.domain([0,data.length-1]) // input
.range([0,gWidth]) // output

var scaleY = d3.scale.linear()
.domain([0,d3.max(data)]) // input
.range([gHeight,0]) // output

var lineGenerator = d3.svg.line()
.x(function(d,i){return scaleX(i);}) //0,1,2,3..
.y(function(d){return scaleY(d);}) //1,3,5,7..
.interpolate('cardinal') // become cardinal

var areaGenerator = d3.svg.area()
.x(function(d,i){return scaleX(i);})
.y0(gHeight)
.y1(function(d){return scaleY(d)})

//d3.select('g')
g.append('path')
.attr('d',areaGenerator(data)) // d = "M0,1L1,3L40,50" d - path data
.style('fill','steelblue')

var xAxis = d3.svg.axis().scale(scaleX)
  , yAxis = d3.svg.axis().scale(scaleY).orient('left')

g.append('g')
.call(xAxis)
.attr('transform','translate(0,'+gHeight+')')

g.append('g')
.call(yAxis)
.append('text')
.text('Price($)')
.attr('transform','rotate(-90)')
.attr('text-anchor','end')
.attr('dy','1em')
*/

/*
$('#date').datepicker()
// jQuery UI old icon
$('#btn1').button({icons: {primary: 'ui-icon-volume-on'}});
// Font Awesome Icon
$('#btn2').button({icons: {primary: 'fa fa-camera-retro'}});
// Font Awesome but BIGGER
$('#btn3').button({icons: {primary: 'icon-volume-up icon-large'}});
// Font Awesome extending
$('#btn4').button({icons: {primary: 'icon-fighter-jet icon-large'}});
*/
