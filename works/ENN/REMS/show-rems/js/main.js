(function(doc,win){
/* index */
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
              /*
              AMap.event.addListener(marker, 'mouseover', aa);
              AMap.event.addListener(marker, 'mouseout', bb);
              */
        }
var demand
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
demand = new Request(); // 统一调用ajax
demand.start({url:'rems-login.json',data:{username:'root', password:'long'},done:remsLogin}); // 请求登录

function remsLogin(data) {
    if(data.status === 0) demand.start({url:'rems-projects-show.json',done:indexInit}); // 登录成功加载项目
    else alert('数据库出错')
}
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
        str += '<div class="project-box clearfix" data-projectid="'+data.projects[i].projectid+'" data-lng="'+data.projects[i].longitude+'" data-lat="'+data.projects[i].latitude+'">'
            +'<div class="project-box-left left">'
            +    '<img src="'+pic+'" alt="新奥">'
            +'</div>'
            +'<div class="project-box-right left">'
            +    '<p class="project-name">'+data.projects[i].projectname+'</p>'
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
function switchBtn() {
    var $this = $(this)
      , type = $this.attr('data-type')
    $this.addClass('btn-active').siblings('.cont-btn').removeClass('btn-active');
    console.log(type)
    if(type == 3) showCont('#cont3DBox', '.contBox') 
    else if(type == 2) showCont('#processBox', '.contBox')
}
function showCont(show, hide) {
    $(show).removeClass('hide').siblings(hide).addClass('hide')
}
$(doc).on('click', '.cont-btn', switchBtn);
$(doc).on('click','.project-box',clickProjectBox);
function clickProjectBox() {
    var $this = $(this)
    if($this.hasClass('active')) {
			if( isAnimating ) {
				return false;
			}
            var projectName
              , projectid = $this.attr('data-projectid')

			if( animcursor > 67) {
				animcursor = 1;
			}
			nextPage( animcursor );
			++animcursor;
            projectName = $this.find('.project-name').text()
            $('.project-name').text(projectName)
            //console.log('rems-labeldataAll+projectid='+projectid+'.json')
            //setInterval(function(){ processChart(projectid) },60000)
            setInterval(function(){ processChart(projectid) },600)
            demand.start({url:'rems-labellist+projectid='+projectid+'.json',done:getLabellist}); // 请求设备列表
            demand.start({url:'rems-graphlist+projectid='+projectid+'.json',done:getGraphlist}); // 请求设备图像
init3D();
    } 
    else {
        var lng = $this.attr('data-lng')
          , lat = $this.attr('data-lat')
          , doubleW = $this.width()
          , doubleH = $this.height()*2
            map.setZoomAndCenter(14, new AMap.LngLat(lng, lat));

            //AMap.event.addListener(map, 'moveend', function(){
                $this.addClass('active')
                     .animate({'height':doubleH})
                     .children('.project-box-right').addClass('hide')
                     .end()
                     .find('img').animate({'width':250,'heihgt':200})
            //});
     }
}
function getLabelDataAll(data) {
 var len = data.labeldata.length-1;
 //for(var i = 0, l = data.labellist.length; i < l; i++) {
       //console.log(data.labellist[len].datavalue) 
       $('#labelValue').text(data.labeldata[len].datavalue)
 //}
}
function getLabellist(data){
 var len = data.labellist.length-1;
       $('#labelList').text(data.labellist[len].title)

}
function getGraphlist(data) {
 var len = data.graphlist.length-1;
       $('#graphList').attr({
        'src':data.graphlist[len].picturepath
      , 'width':data.graphlist[len].width
      , 'height':data.graphlist[len].height
        })

}
function processChart(id) {
    demand.start({url:'rems-labeldataAll+projectid='+id+'.json',done:getLabelDataAll}); // 请求设备数据
}
$(document).on('click', '.arrShow', showArea); // 内容页项目选择
function showArea() {
    var $this = $(this)
      , wrap = $this.closest('#contProWrap')
      , otherArr = wrap.siblings('.cont-projects-arrow')
    if(wrap.hasClass('active')) {
        $this.addClass('arrow-top').removeClass('arrow-bottom')
        wrap.animate({'height':0, 'padding': 0}).removeClass('active')
        otherArr.hide()
    } else {
        $this.addClass('arrow-bottom').removeClass('arrow-top')
        wrap.animate({'height':'auto', 'padding':'15px 35px'}).addClass('active')
        otherArr.show()
    }
}
function inherit(base, methods) {
    var sub = function() {
        this.initialize.apply(this, arguments);
    };
    sub.prototype = new base();
    $.extend(sub.prototype, methods);
    return sub;
}
// move fun
function MoveArea() {
        this.current = 0;
        this.isAnimating = false;
      	this.endCurrPage = false;
      	this.endNextPage = false;
        //this.nav = nav || '';
}
$.extend(MoveArea.prototype, {
    initialize: function(nav, step, list) {
        this.nav = nav; 
        this.step = step || 0;
        this.list = list || '';
        this.move();
    }
  , move : function() {
        var dir = this.nav.attr('data-dir')
          , offset
          , listLen = this.list.find('li').length
        if(typeof dir === 'undefined') return; 

        if( this.isAnimating ) { return false; }

    //console.log(this.list.find('li').length)    
    if(dir === 'left') {
    //console.log('current '+this.current)
        if(this.current === listLen-5) {
           this.current = listLen-5; // display 5 pic 
        } else {
           this.current++;
           offset = '-=' + this.step
        }
    }else {
        if(this.current === 0) {
            this.current = 0;
        } else {
            this.current--; 
            offset =  '+=' + this.step
        }
    }
    this.next(offset)
  }
  , next : function(distance) {
        if(typeof distance === 'undefined') return;
  //console.log('distance '+distance)
		if( this.isAnimating ) {
			return false;
		}
		this.isAnimating = true;
        this.list.animate({'margin-left':distance}) 
		this.isAnimating = false;
}


});
var m = new MoveArea(); 
$(document).on('click', '.cont-projects-arrow', function(){
   m.initialize($(this), $('.cont-project').width(), $('#projectsList'))// nav, step, list 
});

/* meter start */
function drawLineGraph(graph, points, container, id) {


    var graph = Snap(graph);


    /*END DRAW GRID*/

    /* PARSE POINTS */
    var myPoints = [];
    var shadowPoints = [];

    function parseData(points) {
        for (i = 0; i < points.length; i++) {
            var p = new point();
            var pv = points[i] / 100 * 40;
            p.x = 83.7 / points.length * i + 1;
            p.y = 40 - pv;
            if (p.x > 78) {
                p.x = 78;
            }
            myPoints.push(p);
        }
    }

    var segments = [];

    function createSegments(p_array) {
        for (i = 0; i < p_array.length; i++) {
            var seg = "L" + p_array[i].x + "," + p_array[i].y;
            if (i === 0) {
                seg = "M" + p_array[i].x + "," + p_array[i].y;
            }
            segments.push(seg);
        }
    }

    function joinLine(segments_array, id) {
        var line = segments_array.join(" ");
        var line = graph.path(line);
        line.attr('id', 'graph-' + id);
        var lineLength = line.getTotalLength();

        line.attr({
            'stroke-dasharray': lineLength,
                'stroke-dashoffset': lineLength
        });
    }

    function calculatePercentage(points, graph) {
        var initValue = points[0];
        var endValue = points[points.length - 1];
        var sum = endValue - initValue;
        var prefix;
        var percentageGain;
        //var stepCount = 1300 / sum;
        var stepCount = 2300 / sum;

        function findPrefix() {
            if (sum > 0) {
                prefix = "+";
            } else {
                prefix = "";
            }
        }

        var percentagePrefix = "";

        function percentageChange() {
            percentageGain = initValue / endValue * 100;
            
            if(percentageGain > 100){
              console.log('over100');
              percentageGain = Math.round(percentageGain * 100*10) / 100;
            }else if(percentageGain < 100){
              console.log('under100');
              percentageGain = Math.round(percentageGain * 10) / 10;
            }
            if (initValue > endValue) {
              
                percentageGain = endValue/initValue*100-100;
                percentageGain = percentageGain.toFixed(2);
              
                percentagePrefix = "";
                $(graph).find('.percentage-value').addClass('negative');
            } else {
                percentagePrefix = "+";
            }
          if(endValue > initValue){
              percentageGain = endValue/initValue*100;
              percentageGain = Math.round(percentageGain);
          }
        };
        percentageChange();
        findPrefix();

        var percentage = $(graph).find('.percentage-value');
        var totalGain = $(graph).find('.total-gain');
        var hVal = $(graph).find('.h-value');

        function count(graph, sum) {
            var totalGain = $(graph).find('.total-gain');
            var i = 0;
            //var time = 1300;
            var time = 2300;
            var intervalTime = Math.abs(time / sum);
            var timerID = 0;
            if (sum > 0) {
                var timerID = setInterval(function () {
                    i++;
                    totalGain.text(percentagePrefix + i);
                    if (i === sum) clearInterval(timerID);
                }, intervalTime);
            } else if (sum < 0) {
                var timerID = setInterval(function () {
                    i--;
                    totalGain.text(percentagePrefix + i);
                    if (i === sum) clearInterval(timerID);
                }, intervalTime);
            }
        }
        count(graph, sum);

        percentage.text(percentagePrefix + percentageGain + "%");
        totalGain.text("0%");
        setTimeout(function () {
            percentage.addClass('visible');
            hVal.addClass('visible');
        //}, 1300);
        }, 2300);

    }


    function showValues() {
        var val1 = $(graph).find('.h-value');
        var val2 = $(graph).find('.percentage-value');
        val1.addClass('visible');
        val2.addClass('visible');
    }

    function drawPolygon(segments, id) {
        var lastel = segments[segments.length - 1];
        var polySeg = segments.slice();
        polySeg.push([78, 38.4], [1, 38.4]);
        var polyLine = polySeg.join(' ').toString();
        var replacedString = polyLine.replace(/L/g, '').replace(/M/g, "");

        var poly = graph.polygon(replacedString);
        var clip = graph.rect(-80, 0, 80, 40);
        poly.attr({
            'id': 'poly-' + id,
            /*'clipPath':'url(#clip)'*/
                'clipPath': clip
        });
        clip.animate({
            transform: 't80,0'
        //}, 1300, mina.linear);
        }, 2300, mina.linear);
    }

      parseData(points);
      
      createSegments(myPoints);
      calculatePercentage(points, container);
      joinLine(segments,id);
 
      drawPolygon(segments, id);
}
function drawCircle(container,id,progress,parent){
  var paper = Snap(container);
  var prog = paper.path("M5,50 A45,45,0 1 1 95,50 A45,45,0 1 1 5,50");
  var lineL = prog.getTotalLength();
  var oneUnit = lineL/100;
  var toOffset = lineL - oneUnit * progress;
  var myID = 'circle-graph-'+id;
  prog.attr({
    'stroke-dashoffset':lineL,
    'stroke-dasharray':lineL,
    'id':myID
  });
  
  //var animTime = 1300/*progress / 100*/
  var animTime = 2300/*progress / 100*/
  
  prog.animate({
    'stroke-dashoffset':toOffset
  },animTime,mina.easein);
  
  function countCircle(animtime,parent,progress){
    var textContainer = $(parent).find('.circle-percentage');
    var i = 0;
    //var time = 1300;
    var time = 2300;
    var intervalTime = Math.abs(time / progress);
    var timerID = setInterval(function () {
      i++;
      textContainer.text(i+"%");
      if (i === progress) clearInterval(timerID);
    }, intervalTime);           
  }
  countCircle(animTime,parent,progress);
}



/* meter end */

/* 3D start */
var scene = null
  , camera = null
  , renderer = null
  , mesh = null
  , id = null
function init3D() {
                renderer = new THREE.WebGLRenderer({
                    canvas: document.getElementById('canvas3D')
                });
                //renderer.setClearColor(0x000000);
                scene = new THREE.Scene();
                
                camera = new THREE.OrthographicCamera(-5, 5, 3.75, -3.75, 0.1, 100);
                camera.position.set(15, 25, 25);
                camera.lookAt(new THREE.Vector3(0, 2, 0));
                scene.add(camera);
                
                var loader = new THREE.OBJLoader();
                loader.load('obj/port.obj', function(obj) {
                    obj.traverse(function(child) {
                        if (child instanceof THREE.Mesh) {
                            child.material.side = THREE.DoubleSide;
                        }
                    });
                
                    mesh = obj;
                    scene.add(obj);
                });
                
                var light = new THREE.DirectionalLight(0xffffff);
                light.position.set(20, 10, 5);
                scene.add(light);
                
                id = setInterval(draw, 20);

}

function draw() {
                renderer.render(scene, camera);
                
                mesh.rotation.y += 0.01;
                if (mesh.rotation.y > Math.PI * 2) {
                    mesh.rotation.y -= Math.PI * 2;
                }

}

//init3D();
/* 3D end */

// high chart
/*
function Person(name, age, sex) {
  // Common to all Persons
  this.name = 'Roy';
  this.age = 1;
  this.sex = sex;
}

Person.prototype = {
  // common to all Persons
  say: function(words) {
    return this.name +'says: '+ words;
  }
  , count: function() {
    this.age++;
    console.log(this.age)
  }
};
function T() {
    this.c = 0;
    this.p = function() {
        this.c++
        console.log(this.c)
    }
}
T.prototype.l = function() {
    this.c++;
    console.log(this.c)
}
var t = new T();
$(document).on('click', '.cont-projects-arrow', t.p);
$.extend(MoveArea.prototype, {
    move: function() {

    }
    , next: function(distance) {
        MoveArea.call(this)
    }
});
$('#hcContainer').highcharts({
    chart: {type: 'bar'}
  , title: {text:'Fruit Consumption'}
  , xAxis: {categories: ['Apples', 'Bananas', 'Oranges']}
  , yAxis: {
        title: {text: 'Fruit eaten'}
  }
  , series: [{
        name: 'Jane'
      , data: [1,0,4]
  }
  , {
        name: 'John'
      , data: [5,7,3]
  }]
});
*/
// random
function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
// page transitions
//var PageTransitions = (function() {
	var $main = $( '#wrapper' ),
		$pages = $main.children( 'div.layout' ),
		//$iterate = $( '.rems-logo-box' ),
		animcursor = getRandomArbitrary(1,67), // random 67 num
		//animcursor = globalRandomNum, // random 67 num
		pagesCount = $pages.length,
		current = 0,
		isAnimating = false,
		endCurrPage = false,
		endNextPage = false,
		animEndEventNames = {
			'WebkitAnimation' : 'webkitAnimationEnd',
			'OAnimation' : 'oAnimationEnd',
			'msAnimation' : 'MSAnimationEnd',
			'animation' : 'animationend'
		},
		// animation end event name
		animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ],
		// support css animations
		support = Modernizr.cssanimations;
	
	function init() {
		$pages.each( function() {
			var $page = $( this );
			$page.data( 'originalClassList', $page.attr( 'class' ) );
		} );

		$pages.eq( current ).addClass( 'pt-page-current' );


		//$iterate.on( 'click', function() {

	}

	function nextPage( animation ) {

		if( isAnimating ) {
			return false;
		}

		isAnimating = true;
		
		var $currPage = $pages.eq( current );

		if( current < pagesCount - 1 ) {
			++current;
		}
		else {
			current = 0;
		}

		var $nextPage = $pages.eq( current ).addClass( 'pt-page-current' ),
			outClass = '', inClass = '';

		switch( animation ) {

			case 1:
				outClass = 'pt-page-moveToLeft';
				inClass = 'pt-page-moveFromRight';
				break;
			case 2:
				outClass = 'pt-page-moveToRight';
				inClass = 'pt-page-moveFromLeft';
				break;
			case 3:
				outClass = 'pt-page-moveToTop';
				inClass = 'pt-page-moveFromBottom';
				break;
			case 4:
				outClass = 'pt-page-moveToBottom';
				inClass = 'pt-page-moveFromTop';
				break;
			case 5:
				outClass = 'pt-page-fade';
				inClass = 'pt-page-moveFromRight pt-page-ontop';
				break;
			case 6:
				outClass = 'pt-page-fade';
				inClass = 'pt-page-moveFromLeft pt-page-ontop';
				break;
			case 7:
				outClass = 'pt-page-fade';
				inClass = 'pt-page-moveFromBottom pt-page-ontop';
				break;
			case 8:
				outClass = 'pt-page-fade';
				inClass = 'pt-page-moveFromTop pt-page-ontop';
				break;
			case 9:
				outClass = 'pt-page-moveToLeftFade';
				inClass = 'pt-page-moveFromRightFade';
				break;
			case 10:
				outClass = 'pt-page-moveToRightFade';
				inClass = 'pt-page-moveFromLeftFade';
				break;
			case 11:
				outClass = 'pt-page-moveToTopFade';
				inClass = 'pt-page-moveFromBottomFade';
				break;
			case 12:
				outClass = 'pt-page-moveToBottomFade';
				inClass = 'pt-page-moveFromTopFade';
				break;
			case 13:
				outClass = 'pt-page-moveToLeftEasing pt-page-ontop';
				inClass = 'pt-page-moveFromRight';
				break;
			case 14:
				outClass = 'pt-page-moveToRightEasing pt-page-ontop';
				inClass = 'pt-page-moveFromLeft';
				break;
			case 15:
				outClass = 'pt-page-moveToTopEasing pt-page-ontop';
				inClass = 'pt-page-moveFromBottom';
				break;
			case 16:
				outClass = 'pt-page-moveToBottomEasing pt-page-ontop';
				inClass = 'pt-page-moveFromTop';
				break;
			case 17:
				outClass = 'pt-page-scaleDown';
				inClass = 'pt-page-moveFromRight pt-page-ontop';
				break;
			case 18:
				outClass = 'pt-page-scaleDown';
				inClass = 'pt-page-moveFromLeft pt-page-ontop';
				break;
			case 19:
				outClass = 'pt-page-scaleDown';
				inClass = 'pt-page-moveFromBottom pt-page-ontop';
				break;
			case 20:
				outClass = 'pt-page-scaleDown';
				inClass = 'pt-page-moveFromTop pt-page-ontop';
				break;
			case 21:
				outClass = 'pt-page-scaleDown';
				inClass = 'pt-page-scaleUpDown pt-page-delay300';
				break;
			case 22:
				outClass = 'pt-page-scaleDownUp';
				inClass = 'pt-page-scaleUp pt-page-delay300';
				break;
			case 23:
				outClass = 'pt-page-moveToLeft pt-page-ontop';
				inClass = 'pt-page-scaleUp';
				break;
			case 24:
				outClass = 'pt-page-moveToRight pt-page-ontop';
				inClass = 'pt-page-scaleUp';
				break;
			case 25:
				outClass = 'pt-page-moveToTop pt-page-ontop';
				inClass = 'pt-page-scaleUp';
				break;
			case 26:
				outClass = 'pt-page-moveToBottom pt-page-ontop';
				inClass = 'pt-page-scaleUp';
				break;
			case 27:
				outClass = 'pt-page-scaleDownCenter';
				inClass = 'pt-page-scaleUpCenter pt-page-delay400';
				break;
			case 28:
				outClass = 'pt-page-rotateRightSideFirst';
				inClass = 'pt-page-moveFromRight pt-page-delay200 pt-page-ontop';
				break;
			case 29:
				outClass = 'pt-page-rotateLeftSideFirst';
				inClass = 'pt-page-moveFromLeft pt-page-delay200 pt-page-ontop';
				break;
			case 30:
				outClass = 'pt-page-rotateTopSideFirst';
				inClass = 'pt-page-moveFromTop pt-page-delay200 pt-page-ontop';
				break;
			case 31:
				outClass = 'pt-page-rotateBottomSideFirst';
				inClass = 'pt-page-moveFromBottom pt-page-delay200 pt-page-ontop';
				break;
			case 32:
				outClass = 'pt-page-flipOutRight';
				inClass = 'pt-page-flipInLeft pt-page-delay500';
				break;
			case 33:
				outClass = 'pt-page-flipOutLeft';
				inClass = 'pt-page-flipInRight pt-page-delay500';
				break;
			case 34:
				outClass = 'pt-page-flipOutTop';
				inClass = 'pt-page-flipInBottom pt-page-delay500';
				break;
			case 35:
				outClass = 'pt-page-flipOutBottom';
				inClass = 'pt-page-flipInTop pt-page-delay500';
				break;
			case 36:
				outClass = 'pt-page-rotateFall pt-page-ontop';
				inClass = 'pt-page-scaleUp';
				break;
			case 37:
				outClass = 'pt-page-rotateOutNewspaper';
				inClass = 'pt-page-rotateInNewspaper pt-page-delay500';
				break;
			case 38:
				outClass = 'pt-page-rotatePushLeft';
				inClass = 'pt-page-moveFromRight';
				break;
			case 39:
				outClass = 'pt-page-rotatePushRight';
				inClass = 'pt-page-moveFromLeft';
				break;
			case 40:
				outClass = 'pt-page-rotatePushTop';
				inClass = 'pt-page-moveFromBottom';
				break;
			case 41:
				outClass = 'pt-page-rotatePushBottom';
				inClass = 'pt-page-moveFromTop';
				break;
			case 42:
				outClass = 'pt-page-rotatePushLeft';
				inClass = 'pt-page-rotatePullRight pt-page-delay180';
				break;
			case 43:
				outClass = 'pt-page-rotatePushRight';
				inClass = 'pt-page-rotatePullLeft pt-page-delay180';
				break;
			case 44:
				outClass = 'pt-page-rotatePushTop';
				inClass = 'pt-page-rotatePullBottom pt-page-delay180';
				break;
			case 45:
				outClass = 'pt-page-rotatePushBottom';
				inClass = 'pt-page-rotatePullTop pt-page-delay180';
				break;
			case 46:
				outClass = 'pt-page-rotateFoldLeft';
				inClass = 'pt-page-moveFromRightFade';
				break;
			case 47:
				outClass = 'pt-page-rotateFoldRight';
				inClass = 'pt-page-moveFromLeftFade';
				break;
			case 48:
				outClass = 'pt-page-rotateFoldTop';
				inClass = 'pt-page-moveFromBottomFade';
				break;
			case 49:
				outClass = 'pt-page-rotateFoldBottom';
				inClass = 'pt-page-moveFromTopFade';
				break;
			case 50:
				outClass = 'pt-page-moveToRightFade';
				inClass = 'pt-page-rotateUnfoldLeft';
				break;
			case 51:
				outClass = 'pt-page-moveToLeftFade';
				inClass = 'pt-page-rotateUnfoldRight';
				break;
			case 52:
				outClass = 'pt-page-moveToBottomFade';
				inClass = 'pt-page-rotateUnfoldTop';
				break;
			case 53:
				outClass = 'pt-page-moveToTopFade';
				inClass = 'pt-page-rotateUnfoldBottom';
				break;
			case 54:
				outClass = 'pt-page-rotateRoomLeftOut pt-page-ontop';
				inClass = 'pt-page-rotateRoomLeftIn';
				break;
			case 55:
				outClass = 'pt-page-rotateRoomRightOut pt-page-ontop';
				inClass = 'pt-page-rotateRoomRightIn';
				break;
			case 56:
				outClass = 'pt-page-rotateRoomTopOut pt-page-ontop';
				inClass = 'pt-page-rotateRoomTopIn';
				break;
			case 57:
				outClass = 'pt-page-rotateRoomBottomOut pt-page-ontop';
				inClass = 'pt-page-rotateRoomBottomIn';
				break;
			case 58:
				outClass = 'pt-page-rotateCubeLeftOut pt-page-ontop';
				inClass = 'pt-page-rotateCubeLeftIn';
				break;
			case 59:
				outClass = 'pt-page-rotateCubeRightOut pt-page-ontop';
				inClass = 'pt-page-rotateCubeRightIn';
				break;
			case 60:
				outClass = 'pt-page-rotateCubeTopOut pt-page-ontop';
				inClass = 'pt-page-rotateCubeTopIn';
				break;
			case 61:
				outClass = 'pt-page-rotateCubeBottomOut pt-page-ontop';
				inClass = 'pt-page-rotateCubeBottomIn';
				break;
			case 62:
				outClass = 'pt-page-rotateCarouselLeftOut pt-page-ontop';
				inClass = 'pt-page-rotateCarouselLeftIn';
				break;
			case 63:
				outClass = 'pt-page-rotateCarouselRightOut pt-page-ontop';
				inClass = 'pt-page-rotateCarouselRightIn';
				break;
			case 64:
				outClass = 'pt-page-rotateCarouselTopOut pt-page-ontop';
				inClass = 'pt-page-rotateCarouselTopIn';
				break;
			case 65:
				outClass = 'pt-page-rotateCarouselBottomOut pt-page-ontop';
				inClass = 'pt-page-rotateCarouselBottomIn';
				break;
			case 66:
				outClass = 'pt-page-rotateSidesOut';
				inClass = 'pt-page-rotateSidesIn pt-page-delay200';
				break;
			case 67:
				outClass = 'pt-page-rotateSlideOut';
				inClass = 'pt-page-rotateSlideIn';
				break;

		}

		$currPage.addClass( outClass ).on( animEndEventName, function() {
			$currPage.off( animEndEventName );
			endCurrPage = true;
			if( endNextPage ) {
				onEndAnimation( $currPage, $nextPage );
			}
		} );

		$nextPage.addClass( inClass ).on( animEndEventName, function() {
			$nextPage.off( animEndEventName );
			endNextPage = true;
			if( endCurrPage ) {
				onEndAnimation( $currPage, $nextPage );
			}
		} );

		if( !support ) {
			onEndAnimation( $currPage, $nextPage );
		}

	}

	function onEndAnimation( $outpage, $inpage ) {
		endCurrPage = false;
		endNextPage = false;
		resetPage( $outpage, $inpage );
		isAnimating = false;
	}

	function resetPage( $outpage, $inpage ) {
		$outpage.attr( 'class', $outpage.data( 'originalClassList' ) );
		$inpage.attr( 'class', $inpage.data( 'originalClassList' ) + ' pt-page-current' );

    // call meter
    drawCircle('#chart-4',2,70,'#circle-2'); // container, id, progress, parent 
    drawCircle('#chart-5',2,40,'#circle-3'); // container, id, progress, parent 
    drawCircle('#chart-6',2,75,'#circle-4'); // container, id, progress, parent 
	}

	init();

// page transitions end

	//return { init : init };

//})();
}(document,window)); // end
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
/*
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
    */
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

