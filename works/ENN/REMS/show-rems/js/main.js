(function(doc,win){
/* index */
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
demand.start({done:getMapLeft});
demand.start({done:getMapRight});
function getMapLeft(data) {
    $('#remsTitle').text(data.title);
    $('#remsSubtitle').text(data.subtitle);
    $('#remsSubtitleTranslate').text(data.subtitleTranslate);
}
function getMapRight(data) {
    var num = data.project.length
    console.log(num)
}
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
	            zoom: 5 
	        })
	    });
        /*
        map.setCity('中国');
        map.setCity('上海');
        map.setCity('北京');
        */

}(document,window)); // end
