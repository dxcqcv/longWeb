var jayfunction = function() {
	//UI control
	var $doc,$win,$html,$body;
	
	$doc = $(document);
	// 链接VPN数据
var demand
  , projectBoxIndex = 0 // 项目索引 
  , contTitle = $('#contSubTitle') 
  , interId // 清重复
  , sumProjectid = 0
  , sumProjectData =  {}
  , intervalWeather //小时刷新天气
  , intervalInnerRight //小时刷新内页供能耗能
  , intervalLeftRight // 小时刷新节能率等和成本收益
  , intervalIndex //小时刷新首页项目
  , isWan = null // 检查是不是超过万

var legendName0 = '当'
  , legendName1 = '年'
  , legendName2 = '月'
  , legendName3 = '日'
  , legendName4 = '成本'
  , legendName5 = '收益'
  , legendName6 = legendName0+legendName1+legendName4 //当年成本
  , legendName7 = legendName0+legendName2+legendName4 //当月成本
  , legendName8 = legendName0+legendName3+legendName4 //当日成本
  , legendName9 = legendName0+legendName1+legendName5 //当年收益
  , legendName10 = legendName0+legendName2+legendName5 // 当月收益
  , legendName11 = legendName0+legendName3+legendName5 // 当日收益

// 日期备用
var nowdate = new Date();
var nowYear = nowdate.getFullYear();
var nowMonth = nowdate.getMonth();
var nowDay = nowdate.getDate();

var jsonDataRight = {}; // 全局
function Request() {
    this.loading = $('#loading')
}
$.extend(Request.prototype, {
    start: function(opt) {
        var url = opt.url ? opt.url : 'rems-test.json'
          , type = opt.type ? opt.type : 'GET'
          , data = opt.data ? opt.data : {}
          , timeout = opt.timeout ? opt.timeout : 10000
          , currentRequest = null
          , done = opt.done ? opt.done : doneFn
          , fail = opt.fail ? opt.fail : failFn
          , jsonp = opt.jsonp ? opt.jsonp : 'callbackparam'
          , self = this;

        currentRequest = $.ajax({
            url: url
          , type: type
          , timeout: timeout
          , data: data
          //, async : false
          , dataType: 'jsonp'
          , jsonp: jsonp //服务端用于接收callback调用的function名的参数  
          //, jsonpCallback: 'success_jsonpCallback'//callback的function名称,服务端会把名称和data一起传递回来 
          , crossDomain: true
          , mimeType: 'application/json'
          , contentType: 'text/plain'
          //, xhrFields: { withCredentials: false }
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
            if(textStatus == 'timeout') { //alert('timeout'); 
            }
            fail(jqXHR, textStatus);
        });
    }
});
function failFn(jqXHR, textStatus) { console.log('error is ' + jqXHR.statusText + ' textStatus is ' + textStatus); }
function doneFn() { console.log('done'); }
demand = new Request(); // 统一调用ajax

updateIndex();
intervalIndex = setInterval(updateIndex,3600000);//更新首页右侧项目列表
function updateIndex(){
    demand.start({type:'GET',url:'http://10.36.128.73:8080/reds/login?USERNAME=ennshow&PASSWORD=ennshow0311',jsonp: 'login' ,done:remsLogin}); // 请求登录
    function remsLogin(data) {
        if(data[0].login === 'true') demand.start({url:'http://10.36.128.73:8080/reds/ds/gislist', jsonp: 'gislist',done:indexInit}); // 登录成功加载项目
        //else alert('数据库出错')
    }
}
function indexInit(data){
    jsonDataRight = data;
    $doc.trigger("index_jsonload")
}

	
    /* 页面切换开始 */
// page transitions
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

    /* 页面切换结束 */

	(function tab() {
		var index = "";
		var $this;
		var $target = $(".toggle-tabs-001 > .tablayout");
		return $doc.on("click", ".subhead-tab-warp > .tabs", function(e) {
			$this = $(this);
			index = $this.index();
			$this.addClass("cur").siblings().removeClass("cur");
			$target.eq(index).addClass("cur").siblings().removeClass("cur");
            //alert(projectBoxIndex);
            //alert(typeof index);
            //$doc.trigger("loadRightTab2JSON",[_pid]); // 加载供能耗能

            if(index == 1) bindY_M_D_data(); //pinmingle add 右边年月日数据绑定

		});
	})();
	

	window.pageName = "index";
	
	var icon_arr = [];
	if (typeof pageName != 'undefined' && pageName == "index") {
		require([
			"../lib/swiper/swiper.min",
			"css!../lib/swiper/swiper.min"

		],function(){
			
			
			$doc.on("index_jsonload", function(e) {
				//console.log('list '+jsonDataRight)
				var $div = $("<div>");
				$.each(jsonDataRight, function(i,data){
					var _location = data.address;
					var _locationName = data.projectname;
                    /*
					var _protype = data.industryclassname;
                    */
					var _protype = data.industrytypename;
                    var _renew = (data.data1===null || data.data1 == 0) ? '0.0' : data.data1;
                    var _co2 = (data.data2===null || data.data2 == 0) ? '0.0' : data.data2;
                    var _energySaving = (data.data3===null || data.data3 == 0) ? '0.0' : data.data3;
					var _pic =  (function() {
						var defimg = "images/loacationimg00.jpg"
						if (data.projectid == "1") {
							defimg = "images/loacationimg01.jpg"
						}
						if (data.projectid == "3") {
							defimg = "images/loacationimg02.jpg"
						}
						if (data.projectid == "4") {
							defimg = "images/loacationimg03.jpg"
						}
						return defimg
					})();
                    var date = new Date(); 
					var _m = 12,_y = date.getFullYear();
					//var _m = data.rectime.substring(1,4),_y =data.rectime.substring(6,7)
					
					var _buildingarea = data.buildingarea;
                    //_buildingarea = Number(_buildingarea/10000).toFixed(1);
                    _buildingarea = filterUnit(_buildingarea); // 过滤万分位
                    
					var _supplyarea = data.supplyarea;
					_supplyarea = filterUnit(_supplyarea); // 过滤万分位
					
					var _refh = data.longitude;
					var _refv = data.latitude;
                    var _pid = data.projectid;
					
					
					//百度地图
					var point = new BMap.Point(_refh,_refv);  // 创建点坐标  
					var myIcon = new BMap.Icon("images/icon-map_1.png", new BMap.Size(18,27));
					var marker2 = new BMap.Marker(point,{icon:myIcon});  // 创建标注
					bdmap.addOverlay(marker2);     
					
					icon_arr.push(marker2);
					var myIcon_hover = new BMap.Icon("images/icon-map_2.png", new BMap.Size(32,47));
					var marker3 = new BMap.Marker(point,{icon:myIcon_hover});  // 创建标注
					icon_arr.push(marker3);
					bdmap.addOverlay(marker3);   
					marker3.hide();

/*
var reg = /^\d{5,}$/;
var re = new RegExp(reg);
*/


					var template =
					//'<a class="swiper-slide irhitemsheight" href="page1.html" refh="'+_refh+'" refv="'+_refv+'" >'+
					'<div class="swiper-slide irhitemsheight" data-name="'+_locationName+'" refh="'+_refh+'" refv="'+_refv+'" data-pid="'+_pid+'" >'+
					'	<div class="mapview-line-hov">'+
					'		<div class="mapview-line-cycle">'+
					'			<div class="icon-loaction"></div>'+
					'		</div>'+
					'		<div class="mv-local">'+_location+'</div>'+
					'		<div class="mv-localname">'+_locationName+'</div>'+
					'	</div>'+
					'	<div class="mapview-right-text-wrap">'+
					'		<div class="inner-cycle-top flexmid">'+
					'			<p>'+_buildingarea+' 万</p>'+
					'			<h2>建筑</h2>'+
					'		</div>'+
					'		<div class="inner-cycle-bot flexmid">'+
					'			<h2>供能</h2>'+
					'			<p>'+_supplyarea+' 万</p>'+
					'		</div>'+
					'		<span class="inner-text">'+
					'			<i class="it-line-hov"></i>'+
					'			<em>'+_protype+' ㎡</em>'+
					'		</span>'+
					'	</div>'+
					'	<div class="mapview-cycle-wrap">'+
					'		<div class="mapview-cycle"><img src="'+_pic+'" alt="">'+
					'			<div class="mpv-cycle-detail flexmid">'+
					'				<h3>二氧化碳减排率</h3>'+
					'				<p>'+_co2+'%</p>'+
					'				<h3>可再生能源利用率</h3>'+
					'				<p>'+_renew+'%</p>'+
					'				<h3>节能率</h3>'+
					'				<p>'+_energySaving+'%</p>'+
					'			</div>'+
					'		</div>'+
					'		<div class="mapview-cycle-tips">'+
					'			<div class="icon-si flexmid">'+
					'				<img src="images/icon-bulid-1.png" alt="">'+
					'			</div>'+
					'			<div class="text-date flexmid">'+
					/*
					'				<h2>'+_m+'</h2>'+
					*/
					'				<p>'+_y+'</p>'+
					'			</div>'+
					'		</div>'+
					'	</div>'+
					'	</div>';
					//'	</div>'+
					//'</a>';
					$div.append(template);
					template = ""

                sumProjectData[_pid] = _locationName

				})
				$("#index_right_swiper .swiper-wrapper").html($div.html())
				$div = null;
				jsonDataRight = null;
				var INDEX_RIGHT_SWIPER = new Swiper("#index_right_swiper", {
					direction:"vertical",
					nextButton:"#slider_next",
					prevButton:"#slider_prew",
					mousewheelControl: true,
					slidesPerView: 3
				});
				
				});

			window.bottomSwiper = new Swiper('#bottomSWIPER', {
              // Optional parameters
              direction: 'horizontal',
              slidesPerView:4,
              nextButton:"#index_next",
	      	  prevButton:"#index_prev",
              loop: true
            }) 
			
			/*内页顶部滚动*/
			var header_swiper = new Swiper('#header_gonggao', {
				direction: 'vertical',
				autoplay:10000, // 10秒
				autoplayDisableOnInteraction:false,
				loop:true
			});
			
			var INDEX_LEFT_SWIPER = new Swiper("#index_left_swiper", {
				slidesPerView: 1,
				paginationHide:false,
				mousewheelControl: true,
				paginationClickable: true,
				pagination:"#ils_pages"
			});
			
			
		    $('#goHome').on('click', function(e) {
            		
				
                    window.pageName = "index";

                    if(window.pageName == "index") {
                        clearInterval(interId); // 清3d
                        clearInterval(intervalWeather); // 清气象更新
                        clearInterval(intervalInnerRight); // 清内页右侧更新

                    }
                    switchPage(function(){
                        $(".mapview-active").removeClass("mapview-active");
                        bdmap.centerAndZoom(new BMap.Point(103.404, 39.915),5); //修改地图的中心点
					if(icon_arr && icon_arr.length>=1){
						for(var i=0; i<icon_arr.length; i++){	
							icon_arr[2*i].show();   
							icon_arr[2*i+1].hide();
						}
					}
                    }); //切换页面         
            });	
            var detail_data_index = 0; //内页图表数据索引 pinmingle add
			$("#index_right_swiper").on("click", ".swiper-slide", function(e) {
				var $this = $(this);
				var _relh = $this.attr("refh");
				var _relv = $this.attr("refv");
                var _pid = $this.attr('data-pid')
				var point = new BMap.Point( Number(_relh),Number(_relv) );
                var name = $this.find('.mv-localname').text();
sumProjectid = _pid; // 为了3d属性
//				console.log(point)
				bdmap.centerAndZoom(point,12); //地图的缩放比
				var _actclass = "mapview-active"
				if ( !$this.hasClass(_actclass) ){
                    if(_pid != '1' && _pid != '3' && _pid != '4') {
                        $(".mapview-active").removeClass("mapview-active"); //取消高亮
                        bdmap.centerAndZoom(new BMap.Point(103.404, 39.915),5); //修改地图的中心点
                        //alert(name +'还在建造中');
                        return;
                    }
					$this.addClass(_actclass).siblings().removeClass(_actclass);
                    					//pinmingle add
					var index = $this.index();
					icon_arr[2*index].hide();   
					icon_arr[2*index+1].show();
					e.preventDefault();
				} else {
                    window.pageName = "page01";
                    if(window.pageName == "page01")
                        clearInterval(interId);



                    switchPage(function(){// 切换后回调
                        demand.start({type:'GET',url:'http://10.36.128.73:8080/reds/ds/setProject?projectid='+_pid,jsonp: 'setProject' ,done:setCompelte}); // 设置projectid

                    //change3d(_pid); // 调用3d
loadLeftRight(_pid); //加载左右
intervalLeftRight = setInterval(innerLeftRight(_pid),3600000);

//和下方联动函数，现注释
                    //detail_data_index = $this.index(); // 获取图表数据索引 pinmingle add 
                    //$(".inner-selector-i .selector").eq(detail_data_index).trigger("click"); //pinmingle add
                    //$(".inner-selector-i .selector").eq(_pid).trigger("click"); //pinmingle add

projectBoxIndex = _pid; //为了内页切换重载成本收益

	$doc.trigger("loadRightTab2JSON",[_pid]); // 加载供能耗能, JSON语法错误
    intervalInnerRight = setInterval(innerRight(_pid), 3600000); //小时更新供能耗能 
    getWeather(); 
    intervalWeather = setInterval(getWeather,3600000);// 加载气象信息

     contTitle.text(name);

//console.log(sumProjectData)
var innerWrap = $('#xinaoProjects')
innerWrap.empty();
$.each(sumProjectData, function(index, data){
var cur = (index == _pid) ? 'class="selector cur swiper-slide"' : 'class="selector swiper-slide"'
  , img = 0
  switch(index) {
    case '1': img = 1; break; 
    case '3': img = 2; break;
    case '4': img = 3; break;
    default: img = 4; break;
  }
    var innerProjects = '<div index="'+index+'" '+cur+'>'+
                            '<img src="images/sampleimg-'+img+'.jpg" alt="">'+
                            '<p>'+data+'</p>'+
                         '</div>';
                         innerWrap.append(innerProjects);

});

}); //切换页面   


                }
			});
			
		});
		
	}//index end
	
	$doc.on("click", ".ctr-button", function() {
		$(".xa-bottom-layout").toggleClass("show")
	});

    var globalYears, globalMons, globalDays 

    var dateYear = $('.dateinput-year')
      , dateMon  = $('.dateinput-months')
      , dateDay  = $('.dateinput-day')
      , joinDate = null, y, m, d

			dateYear.datepicker({
				autoclose:true,
				startView:2,
				minViewMode:2,
				format:'yyyy',
                endDate: '+0y',
				language:"zh-CN"
			}).on('changeDate',function(ev) {
                  
                var $this = $(this)
                  , wrap = $this.parents('.xa-modal-wrapper')
                  , type = wrap.attr('data-type')
                  , pid = wrap.attr('data-pid')
                  , unitname = wrap.attr('data-unitname')
                
                m = (dateMon.val() == '') ? (nowMonth+1) : dateMon.val();
                d = (dateDay.val() == '') ? nowDay : dateDay.val();
                y = ev.date.getFullYear();
                joinDate =  y + '-' + m + '-' + d; // 选择的年 


               //dateMon.datepicker('setDate', new Date(Date.UTC(y,m-1,d)));// 同步调整月中年
               dateMon.datepicker('setDate', new Date(y,m-1,d));// 同步调整月中年
               dateDay.datepicker('setDate', new Date(y,m-1,d));// 同步调整日中年
               selectDate(type, pid, joinDate, unitname); 
			});
			dateMon.datepicker({
				autoclose:true,
				startView:1,
				minViewMode:1,
				format:'mm',
                endDate: '+0m',
				language:"zh-CN"
			}).on('changeDate',function(ev) {
                var $this = $(this)
                  , wrap = $this.parents('.xa-modal-wrapper')
                  , type = wrap.attr('data-type')
                  , pid = wrap.attr('data-pid')
                  , unitname = wrap.attr('data-unitname')
                

                y = (dateYear.val() == '') ? nowYear : dateYear.val();
                d = (dateDay.val() == '') ? nowDay : dateDay.val();
                m = ev.date.getMonth();
                joinDate = y + '-' + (m+1) + '-' + d; // 选择的月 

               dateDay.datepicker('setDate', new Date(y,m,d));// 同步调整日中年
               selectDate(type, pid, joinDate, unitname); 
			});
            	dateDay.datepicker({
				autoclose:true,
				startView:0,
				minViewMode:0,
				format:'dd',
                endDate: '+0d',
				language:"zh-CN"
			}).on('changeDate', function(ev){
                var $this = $(this)
                  , wrap = $this.parents('.xa-modal-wrapper')
                  , type = wrap.attr('data-type')
                  , pid = wrap.attr('data-pid')
                  , unitname = wrap.attr('data-unitname')
                
                //console.log('unitname ',unitname)
                y = (dateYear.val() == '') ? nowYear : dateYear.val();
                m = (dateMon.val() == '') ? (nowMonth+1) : dateMon.val();
                joinDate = y + '-' + m + '-' + ev.date.getDate(); // 选择的日 

               selectDate(type, pid, joinDate, unitname); 


            })
            .on('changeMonth', function(ev){
               dateMon.datepicker('setDate', ev.date);// 同步调整日中月
            })
            .on('changeYear', function(ev){
               dateYear.datepicker('setDate', ev.date);// 同步调整日中月
            });

	
	var $xa_modal_overlay = $(".xa-modal-overlay"),
		$xa_modal_wrapper = $(".xa-modal-wrapper");
		
	
	$doc.on("click", ".clsbtn", function(e) {
		$xa_modal_wrapper.on("animationend.ane webkitAnimationEnd.ane", function(e) {
			$xa_modal_wrapper.addClass("modal-hide");
			$xa_modal_wrapper.removeClass("modal-hidding");
			$doc.trigger("modalhide");
			$xa_modal_wrapper.off(".ane");
		});
		$xa_modal_wrapper.addClass("modal-hidding");
		$xa_modal_overlay.addClass("modal-overlay-hide");

	});
	
	
	 $doc.on('modalshow',function(e,type){
		//console.log('pop-up');
        //alert($xa_modal_wrapper.find('#popUpTitle').text())
        var $title = $xa_modal_wrapper.find('#popUpTitle')
        switch(type) {
            case 'one': $title.text('耗气'); break;
            case 'two': $title.text('耗水'); break;
            case 'three': $title.text('耗电'); break;
            case 'four': $title.text('供热'); break;
            case 'five': $title.text('供冷'); break;
            //case 'six': $title.text('多项供能对比'); break;
            case 'six': $title.text('发电'); break;

            case 'seven': $title.text('供蒸汽'); break;

            case 'eight': $title.text('当年成本收益'); break;
            case 'nine': $title.text('当月成本收益'); break;
            case 'ten': $title.text('当日成本收益'); break;
            case 'eleven': $title.text('节能率'); break;
            case 'twelve': $title.text('CO2减排率'); break;
            case 'thirteen': $title.text('系统能效'); break;
            case 'fourteen': $title.text('可再生能源利用率'); break;
        }

// 时间控件显示当前时间
		$(".dateinput-day").val(nowDay).datepicker("update");
		$(".dateinput-months").val(parseInt(nowMonth+1)).datepicker("update");
		$(".dateinput-year").val(nowYear).datepicker("update");
	});
	
	
	function showModal(type,callback,url, jsonp, pid,unitname) {
        $xa_modal_wrapper.attr('data-type',type); // 增加弹出框标识
        $xa_modal_wrapper.attr('data-pid',pid); // 增加classpropertyid
        $xa_modal_wrapper.attr('data-unitname',unitname); // 增加unitname

		$xa_modal_wrapper.on("animationend.ane webkitAnimationEnd.ane", function() {
			$xa_modal_wrapper.removeClass("modal-showing");
			$doc.trigger("modalshow",[type]);
			if (typeof callback == "function") {
				callback(url, jsonp, unitname); // pass unitname
			}
			$xa_modal_wrapper.off(".ane");
		});
		$xa_modal_wrapper.removeClass("modal-hide");
		$xa_modal_wrapper.addClass("modal-showing");
		$xa_modal_overlay.removeClass("modal-overlay-hide")
	}
	
	
	$doc.on("modal_date_change", function(e,date) {
		var changeDate = date;
		var chartDetail =  $modalinnerChartWrap.data();
        
		if ( chartDetail.chartType && chartDetail.chartType >= 1) {
			if (chartDetail.chartType == "1") {
				var links1 = chartDetail.chartDataURL[0][0] + chartDetail.chartDataURL[0][1] + "?timeradio=" + chartDetail.chartDateType + "&date=" + changeDate;
				var links2 = chartDetail.chartDataURL[1][0] + chartDetail.chartDataURL[1][1] + "?timeradio=" + chartDetail.chartDateType + "&date=" + changeDate;
				var links3 = chartDetail.chartDataURL[2][0] + chartDetail.chartDataURL[2][1] + "?timeradio=" + chartDetail.chartDateType + "&date=" + changeDate;
				var test = [
					[links1, chartDetail.chartDataURL[0][1]], 
					[links1, chartDetail.chartDataURL[1][1]],
					[links1, chartDetail.chartDataURL[2][1]]
				]
				console.log(links1,links2,links3,"拿到3个链接参数");
				console.log(test[0])
				console.log(test[1])
				console.log(test[2])
				console.log("这里我拿到的数据是错的，在这里断点，请检查");
//				return ;
				costFn(test[0],test[1],test[2])
			}
		} 
	});
	
	
	
	window.$modalinnerChartWrap = $("#chartinner");
	var modalchartobj ;
	$doc.on("click", "#showModal_1", function() {
dateAllShow(); // show all datepicker
		modalchartobj = null;
		$modalinnerChartWrap[0].innerHTML= "";
        var $this = $(this)
          , classpropertyid = $this.attr('data-classpropertyid')
          , unitname = $this.attr('data-unitname')
		function show_1_callback() {
			//console.log("show 1 call back");
            /*
			modalchartobj = echarts.init(document.getElementById('chartinner'), defaultTheme);
			modalchartobj.setOption(optionModal);
            */
            energyFn(['http://10.36.128.73:8080/reds/ds/singleEnergy?pid='+classpropertyid+'&timeradio=days&date=now','singleEnergy'],['http://10.36.128.73:8080/reds/ds/energyPie?pid='+classpropertyid+'&timeradio=days&date=now','energyPie'],unitname);
		}
		showModal('one',show_1_callback,'','',classpropertyid,unitname); // 参数为type, callback, url, jsonp, pid, unitname
	}).on("click", "#showModal_2",function() {
dateAllShow(); // show all datepicker
		modalchartobj = null;
		$modalinnerChartWrap[0].innerHTML= "";
        var $this = $(this)
          , classpropertyid = $this.attr('data-classpropertyid')
          , unitname = $this.attr('data-unitname')
		function show_2_callback() {
			//console.log("show 1 call back")
            energyFn(['http://10.36.128.73:8080/reds/ds/singleEnergy?pid='+classpropertyid+'&timeradio=days&date=now','singleEnergy'],['http://10.36.128.73:8080/reds/ds/energyPie?pid='+classpropertyid+'&timeradio=days&date=now','energyPie'],unitname);
		}
		showModal('two',show_2_callback,'','',classpropertyid,unitname);
	}).on("click", "#showModal_3",function() {
dateAllShow(); // show all datepicker
		modalchartobj = null;
		$modalinnerChartWrap[0].innerHTML= "";
        var $this = $(this)
          , classpropertyid = $this.attr('data-classpropertyid')
          , unitname = $this.attr('data-unitname')
		function show_3_callback() {
			//console.log("show 1 call back")
            energyFn(['http://10.36.128.73:8080/reds/ds/singleEnergy?pid='+classpropertyid+'&timeradio=days&date=now','singleEnergy'],['http://10.36.128.73:8080/reds/ds/energyPie?pid='+classpropertyid+'&timeradio=days&date=now','energyPie'],unitname);
		}
		showModal('three',show_3_callback,'','',classpropertyid,unitname);
	})
    .on("click", "#showModal_4",function() {
dateAllShow(); // show all datepicker
		modalchartobj = null;
		$modalinnerChartWrap[0].innerHTML= "";
        var $this = $(this)
          , classpropertyid = $this.attr('data-classpropertyid')
          , unitname = $this.attr('data-unitname')

		showModal('four',singleEnergy_callback, 'http://10.36.128.73:8080/reds/ds/singleEnergy?pid='+classpropertyid+'&timeradio=days&date=now', 'singleEnergy',classpropertyid,unitname);
	})
    .on("click", "#showModal_5",function() {
dateAllShow(); // show all datepicker
		modalchartobj = null;
		$modalinnerChartWrap[0].innerHTML= "";
        var $this = $(this)
          , classpropertyid = $this.attr('data-classpropertyid')
          , unitname = $this.attr('data-unitname')
		showModal('five',singleEnergy_callback, 'http://10.36.128.73:8080/reds/ds/singleEnergy?pid='+classpropertyid+'&timeradio=days&date=now', 'singleEnergy',classpropertyid,unitname);
	})
    .on("click", "#showModal_6",function() {
dateAllShow(); // show all datepicker
		modalchartobj = null;
		$modalinnerChartWrap[0].innerHTML= "";
        var $this = $(this)
          , classpropertyid = $this.attr('data-classpropertyid')
          , unitname = $this.attr('data-unitname')
		showModal('six',singleEnergy_callback, 'http://10.36.128.73:8080/reds/ds/singleEnergy?pid='+classpropertyid+'&timeradio=days&date=now', 'singleEnergy',classpropertyid,unitname );
	})
    .on("click", "#showModal_7",function() {
dateAllShow(); // show all datepicker
		modalchartobj = null;
		$modalinnerChartWrap[0].innerHTML= "";
        var $this = $(this)
          , classpropertyid = $this.attr('data-classpropertyid')
          , unitname = $this.attr('data-unitname')
		showModal('seven',singleEnergy_callback, 'http://10.36.128.73:8080/reds/ds/singleEnergy?pid='+classpropertyid+'&timeradio=days&date=now', 'singleEnergy',classpropertyid, unitname);
	})
    .on("click", "#showModal_8",function() {

      // 年成本收益
      dateYear.parents('.selector').show();
      dateMon.parents('.selector').hide();
      dateDay.parents('.selector').hide();

		modalchartobj = null;
		$modalinnerChartWrap[0].innerHTML= "";
		var $span1 = $("<span>").html("成本能源结构图").css({
			"position":"absolute",
			"left":"1610px",
			"fontSize":"60px",
			"top":"90px"
		});
		var $span2 = $("<span>").html("收益能源结构图").css({
			"position":"absolute",
			"left":"2320px",
			"fontSize":"60px",
			"top":"90px"
		});
		function show_8_callback() {
        costFn(["http://10.36.128.73:8080/reds/ds/mainfinance?timeradio=years&date=now","mainfinance"],["http://10.36.128.73:8080/reds/ds/financePie?type=0&timeradio=years&date=now","financePie"],["http://10.36.128.73:8080/reds/ds/financePie?type=1&timeradio=years&date=now","financePie"],0);
			//console.log("modal8 clicked")
            /*
			var URLS = [["http://10.36.128.73:8080/reds/ds/","mainfinance"],["http://10.36.128.73:8080/reds/ds/","financePie"],["http://10.36.128.73:8080/reds/ds/","financePie"]];
			$modalinnerChartWrap.data({
				"chartType":"1",
				"chartDateType":"years",
				"chartDataURL":URLS
			});
            */
		}
		
		showModal('eight',show_8_callback);
	}).on("click", "#showModal_9",function() {

      // 月成本收益
      dateYear.parents('.selector').hide();
      dateMon.parents('.selector').show();
      dateDay.parents('.selector').hide();

		modalchartobj = null;
		$modalinnerChartWrap[0].innerHTML= "";
		var $span1 = $("<span>").html("成本能源结构图").css({
			"position":"absolute",
			"left":"1610px",
			"fontSize":"60px",
			"top":"90px"
		});
		var $span2 = $("<span>").html("收益能源结构图").css({
			"position":"absolute",
			"left":"2320px",
			"fontSize":"60px",
			"top":"90px"
		});
		function show_5_callback() {
            costFn(["http://10.36.128.73:8080/reds/ds/mainfinance?timeradio=mons&date=now","mainfinance"],["http://10.36.128.73:8080/reds/ds/financePie?type=0&timeradio=mons&date=now","financePie"],["http://10.36.128.73:8080/reds/ds/financePie?type=1&timeradio=mons&date=now","financePie"], 1);
		}
		showModal('nine',show_5_callback);
	}).on("click", "#showModal_10",function() {
		function show_10_callback() {

      // 日成本收益
      dateYear.parents('.selector').hide();
      dateMon.parents('.selector').hide();
      dateDay.parents('.selector').show();

            costFn(["http://10.36.128.73:8080/reds/ds/mainfinance?timeradio=days&date=now","mainfinance"],["http://10.36.128.73:8080/reds/ds/financePie?type=0&timeradio=days&date=now","financePie"],["http://10.36.128.73:8080/reds/ds/financePie?type=1&timeradio=days&date=now","financePie"],2);
            /*
			var URLS = [["http://10.36.128.73:8080/reds/ds/","mainfinance"],["http://10.36.128.73:8080/reds/ds/","financePie"],["http://10.36.128.73:8080/reds/ds/","financePie"]];
			$modalinnerChartWrap.data({
				"chartType":"1",
				"chartDateType":"mons",
				"chartDataURL":URLS
			});
            */
		}
		showModal('ten',show_10_callback);
	}).on('click', '#pie1',function(){ //节能率弹出层
    function pie1(){}
		showModal('eleven',pie1);

    }).on('click', '#pie2',function(){ //co2减排率弹出层

    function pie2(){}
		showModal('twelve',pie2);
    }).on('click', '#pie3',function(){ //系统能效弹出层

    function pie3(){}
		showModal('thirteen',pie3);
    }).on('click', '#pie4',function(){ // 可再生能源利用率弹出层

    function pie4(){}
		showModal('fourteen',pie4);
    });
    
	
	
	//Charts
	if (typeof echarts == 'undefined' ) {
		return 
	} else {
	var defaultTheme = "macarons"; // 默认chart主题
//	var myCharts = echarts.init(document.getElementById('pie1'), defaultTheme);
//	var myCharts2 = echarts.init(document.getElementById('pie2'), defaultTheme);
//	var myChartsPie3 = echarts.init(document.getElementById('pie3'), defaultTheme);
//	var myChartsPie4 = echarts.init(document.getElementById('pie4'), defaultTheme);
//	var myCharts3 = echarts.init(document.getElementById('barchart-1'), defaultTheme);
//	var myCharts4 = echarts.init(document.getElementById('barchart-2'), defaultTheme);
	var mycolumnChart3 = echarts.init(document.getElementById('columnChart3'), defaultTheme);
	var mycolumnChart4 = echarts.init(document.getElementById('columnChart4'), defaultTheme);
	var mycolumnChart5 = echarts.init(document.getElementById('columnChart5'), defaultTheme);
//	var myModalChart = echarts.init(document.getElementById('chartinner'), defaultTheme);
	var radius = [130,150];//修改圆
	var labelTop = {
		normal : {
			label : {
				show : true,
				position : 'center',
				formatter : '{b}',
				textStyle: {
					fontSize:48,
					baseline : 'bottom'
				}
			},
			labelLine : {
				show : false
			}
		}
	};
	var labelFromatter = {
		normal : {
			label : {
				formatter : function (params){
					//保留小数点后面1位
                    //console.log('params ',params)
                    // 圆环参数公式
					return  Math.floor((100 - params.value)*10)/10 + '%';
				},
				textStyle: {
					fontWeight:'bold',
					fontSize:36,
					baseline : 'top'
				}
			}
		},
	};
	var labelBottom = {
		normal : {
			color: '#ccc',
			label : {
				show : true,
				position : 'center'
			},
			labelLine : {
				show : false
			}
		},
		emphasis: {
			color: 'rgba(0,0,0,0)'
		}
	};
	
	var animationDurationAll = 300;
	
	var optionsPie1 = {
		animationDuration: animationDurationAll,
		color : ['#faaf3b'],
		series : [
			{
				type : 'pie',
				center : ['50%', '50%'],
				radius : radius,
				x: '0%', // for funnel
				itemStyle : labelFromatter,
				data : [
					{name:'', value: 0, itemStyle : labelBottom},
					{name:'节能率', value: 0,itemStyle : labelTop}
				]
			}
		]
	};
	var optionsPie2 = {
		animationDuration: animationDurationAll,
		color : [ '#22b473'],
		series : [
			{
				type : 'pie',
				center : ['50%', '50%'],
				radius : radius,
				x: '0%', // for funnel
				itemStyle : labelFromatter,
				data : [
					{name:'', value:60, itemStyle : labelBottom},
					{name:'减排率', value:40,itemStyle : labelTop}
				]
			}
		]
	};
	
	
	
	var optionsbar1 = {
		animationDuration: animationDurationAll,
		backgroundColor: "#fff",
		calculable: false,
		grid: {
			borderWidth:0,
			x: 30,
			x2: 30,
			y: 60,
			y2: 60
		},
		xAxis: [
			{
				splitLine: {
					show: false
				},
				axisTick: {
					show: false
				},
				axisLine: {
					show: false
				},
				axisLabel: {
					textStyle: {
						color: '#989898',
						fontWeight: 'bolder',
						fontSize: 30
					}
				},
				type: 'category',
				show: true,
				data: ['当前能耗', '常规能耗'],
			}
		],
		yAxis: [
			{
				
				type: 'value',
				show: false
			}
		],
		series: [
			{
				name: 'xx',
				type: 'bar',
				barWidth : 42,
				itemStyle: {
					normal: {
						color: function(params) {
							// build a color map as your need.
							var colorList = [
							  '#faaf3b','#B5C334','#FCCE10','#E87C25','#27727B',
							   '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
							   '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
							];
							return '#faaf3b';
						},
						label: {
							textStyle:{
								fontSize: 30 //节能量co2减排量字体大小 
							},
							show: true,
							position: 'top',
							formatter: function(params) {
								var html = params.value + "\n" + "标煤(t)";
								return html;
							} 
						}
					}
				},
				data: [25406,16406]
			},
			
		]

	};
	

	var columnChartopt = { //成本收益柱状图模板
		grid:{
			//x:"100px",
			x0:"10px"
			,x:200 //Y轴左边距设置
		},
		legend: {
			x:"right",
			y:"30px",
			itemWidth:80,
			itemHeight:30,
			textStyle:{
				fontSize:40
			},
			data:['当年成本','当年收益']
		},
		xAxis : [
			{
				axisLine:{
					lineStyle:{
						color: '#989898'
					}
				},
				axisLabel:{
					textStyle:{
						color: '#989898',
						fontWeight: 'bolder',
						fontSize: 34// x轴字体大小
					}
				},
				type : 'category',
				data : [2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015]
			}
		],
		yAxis : [
			{
				type : 'value',
				axisLine:{
					lineStyle:{
						color: '#989898'
					}
				},
				axisLabel:{
                    formatter: '￥{value}', //成本收益图表加单位
					textStyle:{
						color: '#989898',
						fontWeight: 'bolder',
						fontSize: 34 // y轴字体大小
					}
				}
			}
		],
		series:[
			{
				name:"当年成本",
				type:'bar',
				//barWidth : 20,
				barWidth : 10,
				barCategoryGap:'40%',
				itemStyle : 
				{
					normal: {
						color: '#22b473',
						borderRadius: 5,
						label : {
							show: false,
							position: 'left',
							formatter: '{b}'
						}
					}
				},
				data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
			},
			{
				name:"当年收益",
				type:"bar",
				barWidth : 10,
				barCategoryGap:'40%',
				itemStyle : { 
					normal: 
					{
						color: '#00a89c',
						borderRadius: 5,
						label : {
							show: false,
							position: 'left',
							formatter: '{b}'
						}
					}
				},
				data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
			}
		]
	};
	
	
		
		
		
	var optionModal = {
		animationDuration: animationDurationAll,
		color:["#55b6d8", "#2bbaba", "#1c7099", "#038cc4"],
		title : {
			show:false
		},
		tooltip : {
			trigger: 'axis'
		},
		legend: {
			show:false,
			data:['意向','预购','成交']
		},
		toolbox: {
			show : false,
			feature : {
				mark : {show: true},
				dataView : {show: true, readOnly: false},
				magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
				restore : {show: true},
				saveAsImage : {show: true}
			}
		},
		grid:{
			x2:"50%",
			x:250 //Y轴左边距设置
		},
		calculable : false,
		xAxis : [
			{
				type : 'category',
				boundaryGap : false,
				data : ['2009','2010','2011','2012','2013','2014','2015'],
				axisLabel:{
					textStyle:{
						fontSize:40
					}	
				}
			}
		],
		yAxis : [
			{
				type : 'value',
				axisLabel:{
                    formatter: '￥{value}',
					textStyle:{
						fontSize:40
					}	
				}
				
			}
		],
		series : [
			{
				name:'累计',
				type:'line',
				smooth:true,
				itemStyle: {normal: {areaStyle: {type: 'default'}}},
				data:[1000, 12, 21, 54, 260, 830, 710]
			},
            /*
			{
				name:'预购',
				type:'line',
				smooth:true,
				itemStyle: {normal: {areaStyle: {type: 'default'}}},
				data:[30, 182, 434, 791, 390, 30, 10]
			},
			{
				name:'意向',
				type:'line',
				smooth:true,
				itemStyle: {normal: {areaStyle: {type: 'default'}}},
				data:[1320, 1132, 601, 234, 120, 90, 20]
			},
            */
			{
				calculable : true,
				name:'意向',
				type:'pie',
				/*roseType : 'area',*/
				center: (function() {
					var half = 2908/2
					var k = [half*1.5, "50%"]
					return k
				})(),
				radius :[120, (function() {
					return 995/2 - 180
				})()],
				itemStyle :　{
					normal : {
						label:{
							 formatter :function (params){
								//  console.log(params)
									return params.name + '\n' + (params.percent + '%')
								},
							textStyle:{
								fontSize:40
							}
						},
						labelLine : {
							lineStyle:{
								width:4
							},
							length : 50
						}
					}
				},
				data:[
					{value:748, name:'土壤源热泵机组'},
					{value:451, name:'冷温水循环泵'},
					{value:247, name:'冷温水循环泵2'},
					{value:502, name:'其他'}
				]
			}
		]
	};

	var optionModal2itemsty = {
		normal:{
			lineStyle:{
				width:10
			},
			
		}
	}	
	var optionModal2 = {
		animationDuration: animationDurationAll,
		color:["#f6921e","#f05a24", "#ec1c24", "#c0272d"],
		tooltip : {
			show:false,
			trigger: 'axis'
		},
        /*
		legend: {
			itemWidth:80,
			itemHeight:40,
			textStyle:{
				fontSize:40
			},
			data:['供热','供冷','发电','供蒸汽']
		},
        */
		toolbox: {
			show : false,
			feature : {
				mark : {show: true},
				dataView : {show: true, readOnly: false},
				magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
				restore : {show: true},
				saveAsImage : {show: true}
			}
		},
		grid:{
        /*
			y:200,
			y2:200,
			x2:"50%",
            */
			x:250,  //左边到Y轴距离
            x2: 150 // 右边到Y轴距离
		},
		calculable : false,
		xAxis : [
			{
				type : 'category',
				boundaryGap : false,
				axisLabel:{
					textStyle:{
						fontSize:40
					}	
				},
				data : ['周一','周二','周三','周四','周五','周六','周日']
			}
		],
		yAxis : [
			{
				axisLabel:{
					textStyle:{
						fontSize:40
					}	
				},
				type : 'value'
			}
		],
		series : [
			{
				name:'供电',
				type:'line',
				symbolSize:10,
				stack: '总量',
				itemStyle:optionModal2itemsty,
				data:[120, 132, 101, 134, 90, 230, 210]
			},
			{
				name:'供热',
				type:'line',
				symbolSize:10,
				stack: '总量',
				itemStyle:optionModal2itemsty,
				data:[220, 182, 191, 234, 290, 330, 310]
			},
			{
				name:'供热水',
				type:'line',
				symbolSize:10,
				stack: '总量',
				itemStyle:optionModal2itemsty,
				data:[150, 232, 201, 154, 190, 330, 410]
			},
			{
				name:'供蒸汽',
				type:'line',
				symbolSize:10,
				stack: '总量',
				itemStyle:optionModal2itemsty,
				data:[320, 332, 301, 334, 390, 330, 320]
			}
		]
	};	

		
	var optionModal3 = {
		animationDuration: animationDurationAll,
		color:["#55b6d8", "#2bbaba", "#1c7099", "#038cc4"],
		title : {
			show:false
		},
		tooltip : {
			show:true,
			textStyle:{
				fontSize:30
			},
			showDelay: 0,
			hideDelay: 50,
			transitionDuration:0,
			backgroundColor : 'rgba(255,0,255,0.7)',
			borderColor : '#f50',
			borderRadius : 8,
			borderWidth: 2,
			padding: 10,    // [5, 10, 15, 20]
			position : function(p) {
				// 位置回调
				// console.log && console.log(p);
				return [p[0] + 10, p[1] - 10];
			}
		},
		legend: {
			x:'center',
			data:['当年成本','当年收益'],
			textStyle:{
				fontSize:40//图例的字号
			},
      		itemWidth :70,//图例的宽
       		itemHeight :40//图例的高
		},
		toolbox: {
			show : false,
			feature : {
				mark : {show: true},
				dataView : {show: true, readOnly: false},
				magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
				restore : {show: true},
				saveAsImage : {show: true}
			}
		},
		grid:{
			y:200,
			y2:200,
			x2:"50%",
			x:200 //Y轴左边距设置
		},
		calculable : false,
		xAxis : [
			{
				axisLine:{
					lineStyle:{
						color: '#989898'
					}
				},
				axisLabel:{
					textStyle:{
						color: '#989898',
						fontWeight: 'bolder',
						fontSize: 34
					}
				},
				type : 'category',
				data : [2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015]
			}
		],
		yAxis : [
			{
				type : 'value',
				axisLine:{
					lineStyle:{
						color: '#989898'
					}
				},
				axisLabel:{
                    formatter: '￥{value}',
					textStyle:{
						color: '#989898',
						fontWeight: 'bolder',
						fontSize: 34
					}
				}
			}
		],
		series : [
			{
				name:"当年成本", //图例item颜色与name相对应
				type:'bar',
				barWidth : 15,
				barCategoryGap:'40%',
				itemStyle : 
				{
					normal: {
						color: '#22b473',
						borderRadius: 5,
						label : {
							show: false,
							position: 'left',
							formatter: '{b}'
						}
					}
				},
				data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
			},
			{
				name:"当年收益",
				type:"bar",
				barWidth : 15,
				barCategoryGap:'40%',
				itemStyle : { 
					normal: 
					{
						color: '#00a89c',
						borderRadius: 5,
						label : {
							//show: false, //是否显示tips 
							show: true, //是否显示tips 
							position: 'left',
							formatter: '{b}'
						}
					}
				},
				data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
			},
			{
				calculable : false,
				name:'意向',
				type:'pie',
				/*roseType : 'area',*/
				center: (function() {
					var half = 2908/2
					var k = [half*1.25, "50%"]
					return k
				})(),
				radius :[80, (function() {
					//return 995/2 - 180 //外半径
					return 995/2 - 330 //外半径
				})()],
				itemStyle :　{
					normal : {
						label:{
							//show:false,
							show: true, //是否显示tips 
							 formatter :function (params){
								//  console.log(params)
									return params.name + '\n' + (params.percent + '%')
								},
							textStyle:{
								fontSize:34
							}
						},
						labelLine : {
							//show:false,
							show: true, //是否显示tips 
							lineStyle:{
								width:4
							},
							//length : 150
							length : 10 // tips 线长度
						}
					}
				},
				data:[
					{value:748, name:'土壤源热泵机组'},
					{value:451, name:'冷温水循环泵'},
					{value:247, name:'冷温水循环泵2'},
					{value:502, name:'其他'}
				]
			},
			{
				calculable : false,
				name:'意向',
				type:'pie',
				/*roseType : 'area',*/
				center: (function() {
					var half = 2908/2
					var k = [half*1.75, "50%"]
					return k
				})(),
				radius :[80, (function() { // 内半径
					//return 995/2 - 180
					return 995/2 - 330 //外半径
				})()],
				itemStyle :　{
					normal : {
						label:{
							//show:false,
							show: true, //是否显示tips 
							 formatter :function (params){
								//  console.log(params)
									return params.name + '\n' + (params.percent + '%')
								},
							textStyle:{
								fontSize:34 //字体大小
							}
						},
						labelLine : {
							//show:false,
							show: true, //是否显示tips 
							lineStyle:{
								width:4
							},
							//length : 50
							length : 10 // tips 线长度
						}
					}
				},
				data:[
					{value:748, name:'土壤源热泵机组'},
					{value:451, name:'冷温水循环泵'},
					{value:247, name:'冷温水循环泵2'},
					{value:502, name:'其他'}
				]
			}
		]
	};	
		
		
		
		
	
	
	
	
	
	mycolumnChart4.setOption(columnChartopt);
	//示例加载数据
	var columnChartopt5 = columnChartopt;
	columnChartopt.series[0].data = [1230, 1233, 3412, 2000, 111, 575, 4777, 3547, 554, 500, 900, 200];
	columnChartopt.series[1].data = [1000, 2233, 1412, 1000, 311, 275, 2377, 1547, 254, 100, 700, 100];
	mycolumnChart5.setOption(columnChartopt5);
	
		
		
		
		
		
	$doc.on("leftjsonpdataReady", function(){
		//console.log(leftjsonpdata,"left Json Data load");
		var datalength = leftjsonpdata.length;
//		console.log(datalength)
		$.each(leftjsonpdata, function(index, data) {
			if ( index <= 1) { // 节能率和CO2排放
				var _name,
					_percent,
					data_1_name,
					data_1_val,
					data_1_unit,
					data_2_name,
					data_2_val,
					data_2_unit,
					data_3_name,
					data_3_val,
					data_3_unit,
					classGroup;
                
				/* 节能率 */
				_name = data.name;
				_percent = data.datavalue;
				/* 节能量 */
				data_1_name = data.data1.name;
				data_1_val = data.data1.datavalue;
				data_1_unit = data.data1.unitname;
				/* 常规能耗 */
				data_2_name = data.data2.name;
				data_2_val = data.data2.datavalue;
				data_2_unit = data.data2.unitname;
                /* 当前能耗 */
				data_3_name = data.data3.name;
				data_3_val = data.data3.datavalue;
				data_3_unit = data.data3.unitname;

				classGroup = ".leftGruop_" + index;
				var $classGroup = $(classGroup)

                //console.log(index, data_1_name)
                if(index == 0) // 0为节能量 1为co2减排量 
                    $classGroup.find(".chart-text-block").find("p").eq(0).html(data_1_name);
                else if(index == 1)
                    $classGroup.find(".chart-text-block").find("p").eq(0).html('CO2减排量');

                var dNum = Number(data_2_val - data_3_val).toFixed(1); //计算节能量和减排量
				//$classGroup.find(".chart-text-block").find("p").eq(1).html(data_1_val+ " " +data_1_unit)
				$classGroup.find(".chart-text-block").find("p").eq(1).html(dNum+ " " +data_1_unit)
				
				var $chartel = $classGroup.filter(function() {
					var $this = $(this);
					if ($this.hasClass("dib") && $this.attr("id")) {
						return $this;
					}
				})
//				console.log($chartel)
				var myCharts = echarts.init($chartel[0], defaultTheme);
				var chartOPT;
				if (index == "0") {
					chartOPT = optionsPie1;
					chartOPT.color = ['#f8ae3b'];
				} else if (index == "1") {
					chartOPT = optionsPie2
					chartOPT.color = ['#21b171'];
				}
				
				
				//var secVal = 100 - _percent;
				var secVal =  _percent;
                //console.log(_percent)
                //console.log(secVal)
				//chartOPT.series[0].data[0].value = secVal
				chartOPT.series[0].data[0].value = 100 - _percent 
				chartOPT.series[0].data[1].value = _percent
				chartOPT.series[0].data[1].name = _name
				myCharts.setOption(chartOPT);

				
				
				var $chartel2 = $classGroup.filter(function() {
					var $this = $(this);
					if ($this.hasClass("hov-line-chartblock") && $this.attr("id")) {
						return $this;
					}
				})
				
				//console.log($chartel2)
				var myCharts2x = echarts.init($chartel2[0], defaultTheme);
				
				var chartOPT2 = optionsbar1; //co2减排量
				chartOPT2.series[0].itemStyle.normal.label.formatter = function(params) {
					//return params.value + "\n" + data_2_unit;
					return params.value ; //节能量减排量去单位
				};
				chartOPT2.series[0].data = [data_2_val,data_3_val];
                /*
                var newData2Name = data_2_name.substring(0,2) + data_2_name.substring(5); // 去掉co2
                var newData3Name = data_3_name.substring(0,2) + data_3_name.substring(5); // 去掉co2
                */
                var newData2Name = data_2_name.substring(0,2) ; // 去掉co2
                var newData3Name = data_3_name.substring(0,2) ; // 去掉co2

				chartOPT2.xAxis[0].data = [newData2Name,newData3Name];
				if (index == "0") {
					chartOPT2.series[0].itemStyle.normal.color = "#f8ae3b";
					
				} else if (index == "1") {
					chartOPT2.series[0].itemStyle.normal.color = "#21b171";
				}
				myCharts2x.setOption(chartOPT2)
				
				
			} else {
            /*系统能效和可再生能源利用率*/
				var _name,
					_percent,
                    /*综合耗能*/
					data_1_name,
					data_1_val,
					data_1_unit,
                    /*综合供能或可再生能源*/
					data_2_name,
					data_2_val,
					data_2_unit,
                    /*null*/
					data_3_name,
					data_3_val,
					data_3_unit,
                    sysRat = null,
					classGroup;

				_name = data.name;
				_percent = data.datavalue;
				/* */
				data_1_name = data.data1.name;
				data_1_val = data.data1.datavalue;
				data_1_unit = data.data1.unitname;
				/* */
				data_2_name = data.data2.name;
				data_2_val = data.data2.datavalue;
				data_2_unit = data.data2.unitname;

				classGroup = ".leftGruop_" + index; 


				classGroup = ".leftGruop_" + index;
				var $classGroup = $(classGroup);
				var $classGroupBlock = $classGroup.find(".hov-line-chartblock");
				var $classGroupBlock_p = $classGroupBlock.find("p");
				
				
				var $chartel = $classGroup.filter(function() {
					var $this = $(this);
					if ($this.hasClass("dib") && $this.attr("id")) {
						return $this;
					}
				})
				var myCharts = echarts.init($chartel[0], defaultTheme);
				var chartOPT;

				if (index == "2") { // 系统能效
					chartOPT = optionsPie1;
					chartOPT.color = ['#ec1e79'];
					chartOPT.series[0].data[0].value = (function(){
                    /*
                        if(sumProjectid == 1){  return (100 - (_percent * 100)); } // 黄花机场系统能耗乘100  
                        else return (100 - _percent);
                        */
                        return (100 - _percent);
                        //return (100 - 87.9);
                    })();
					chartOPT.series[0].data[1].value = (function() {
						if (_percent > 100) {
							return 100;
							//return 87.9;
						} else {
                        /*
                            if(sumProjectid == 1){ 
                                var huanghuaP = _percent * 100;
                                if( huanghuaP > 100 ) return 100;
                                else return _percent *= 100
                            }// 黄花机场系统能耗乘100  
                            else return _percent;
                            */
                        return _percent;
                        //return 87.9;
						}
					})();
					chartOPT.series[0].data[1].name = _name;

                    $classGroupBlock_p.eq(3).find("font").html(data_2_val) //综合供能值
                    $classGroupBlock_p.eq(3).find("span").html(data_2_unit)
					
				} else if (index == "3") { //可再生能源利用率
					chartOPT = optionsPie1
					chartOPT.color = ['#92278e'];

					chartOPT.series[0].data[0].value = 100 - _percent;
					chartOPT.series[0].data[1].value = _percent;
					chartOPT.series[0].data[1].name = (function() {
						if (_name == "可再生能源利用率") return "可再生能源\n利用率"
					})();
					chartOPT.series[0].data[1].itemStyle.normal.label.textStyle.fontSize =36;


                    /* 可再生能源 */
                    var renewNum = Number(data_1_val * _percent / 100).toFixed(1); //可再生能源计算公式 
                    $classGroupBlock_p.eq(3).find("font").html(renewNum) // 可再生能源值
                    $classGroupBlock_p.eq(3).find("span").html(data_2_unit)//可再生能源单位

				}
				myCharts.setOption(chartOPT); //圆环生成
				
                //console.log(data_1_val)
				$classGroupBlock_p.eq(0).html( data_1_name ) //名称第一行，如综合耗能
				$classGroupBlock_p.eq(2).html( data_2_name ) //名称第三行，如综合供能，可再生能源
				
				$classGroupBlock_p.eq(1).find("font").html(data_1_val) //值第一行，无需公式计算 
				$classGroupBlock_p.eq(1).find("span").html(data_1_unit) //单位第一行，如GJ
				

				
			}
			
		});
	});
		
        // left jsonp ready end
		
		
		
		
	var leftjsonpdata = {};
	//pinmingle add
	var data_Jsonp = ["leftjsonp.js","leftjsonp_2.js","leftjsonp_3.js","leftjsonp_4.js"];
        var projectid

	$doc.on("click", ".inner-selector-i .selector", function() {
		detail_data_index = $(this).index(); //pinmingle add
		$(this).addClass("cur").siblings().removeClass("cur");
		
		 projectid = $(this).attr("index");
         //change3d(projectid); // 调用3d
		
		//alert("bbb"+a);
		
		demand.start({type:'GET',url:'http://10.36.128.73:8080/reds/ds/setProject?projectid='+projectid,jsonp: 'setProject' ,done:setCompelte});
		demand.start({type:'GET',url:'http://10.36.128.73:8080/reds/ds/mainLeft?timeradio=hours',jsonp: 'mainLeft' ,done:mainLeft_Compelte}); //pinmingle add 左侧数据绑定
		bindY_M_D_data(); //pinmingle add 右边年月日数据绑定
	
	});
		
        function loadLeftRight(id) {
            demand.start({type:'GET',url:'http://10.36.128.73:8080/reds/ds/mainLeft?timeradio=hours',jsonp: 'mainLeft' ,done:mainLeft_Compelte}); //pinmingle add 左侧数据绑定
            bindY_M_D_data(); //pinmingle add 右边年月日数据绑定
        }
		
}		
		
		
		
		
	//判断echart undefined end
//			modalchartobj = echarts.init(document.getElementById('chartinner'), defaultTheme);
//			modalchartobj.setOption(optionModal3);
var rightY_M_D_data = [{"yData":"ajaxsample/costsumY.js","mData":"ajaxsample/costsumM.js","dData":"ajaxsample/costsumD.js"},{"yData":"ajaxsample/costsumY.js","mData":"ajaxsample/costsumM.js","dData":"ajaxsample/costsumD.js"},{"yData":"ajaxsample/costsumY.js","mData":"ajaxsample/costsumM.js","dData":"ajaxsample/costsumD.js"}];

var tab01chartjsonM = {};
	var tab01chartjsonD = {};
	var tab01chartjsonY = {};
	
function bindY_M_D_data(){ //成本收益侧栏生成

	$doc.on("tab01chartjsonloadM", function(e) { // 收益成本月
        mycolumnChart4.dispose();
	    mycolumnChart4 = echarts.init(document.getElementById('columnChart4'), defaultTheme);
		//console.log(tab01chartjsonM);
		$("#cou_03").html("￥ "+tab01chartjsonM[0].costsum);
		$("#cou_04").html("￥ "+tab01chartjsonM[0].incomesum);
		var dates1 = [];
		var dates2 = [];
		var dateX = [];
		var columnChartoptInit = columnChartopt;
		$.each(tab01chartjsonM[0].costdatas, function(i, d) {
			dates1[i] = d.data;
			dateX[i] = d.rectime;
		})
		$.each(tab01chartjsonM[0].incomedatas, function(i, d) {
			dates2[i] = d.data;
		})
        // 图例
        columnChartoptInit.legend.data = [legendName7,legendName10]; 
        columnChartoptInit.series[0].name=legendName7; //图例item颜色需name对应
        columnChartoptInit.series[1].name=legendName10;
		columnChartoptInit.xAxis[0].data = dateX;
		columnChartoptInit.series[0].data = dates1;
		columnChartoptInit.series[1].data = dates2;

        //mycolumnChart4.clear();
		mycolumnChart4.setOption(columnChartoptInit);

	}).on("tab01chartjsonloadD", function(e) { // 收益成本日
        mycolumnChart5.dispose();// 刷新图表
	    mycolumnChart5 = echarts.init(document.getElementById('columnChart5'), defaultTheme);
		//console.log(tab01chartjsonD);
		$("#cou_05").html("￥ "+tab01chartjsonD[0].costsum);
		$("#cou_06").html("￥ "+tab01chartjsonD[0].incomesum);
		var dates1 = [];
		var dates2 = [];
		var dateX = [];
		var columnChartoptInit = columnChartopt;
		$.each(tab01chartjsonD[0].costdatas, function(i, d) {
			dates1[i] = d.data;
			dateX[i] = d.rectime;
		})
		$.each(tab01chartjsonD[0].incomedatas, function(i, d) {
			dates2[i] = d.data;
		})
        // 图例
        columnChartoptInit.legend.data = [legendName8,legendName11]; 
        columnChartoptInit.series[0].name=legendName8; //图例item颜色需name对应
        columnChartoptInit.series[1].name=legendName11;

		columnChartoptInit.xAxis[0].data = dateX;
		columnChartoptInit.series[0].data = dates1;
		columnChartoptInit.series[1].data = dates2;

        //mycolumnChart5.clear();
		mycolumnChart5.setOption(columnChartoptInit);
	}).on("tab01chartjsonloadY", function(e) { // 收益成本年
        mycolumnChart3.dispose(); // 刷新图表
	    mycolumnChart3 = echarts.init(document.getElementById('columnChart3'), defaultTheme);
		//console.log(tab01chartjsonY);
		$("#cou_01").html("￥ "+tab01chartjsonY[0].costsum);
		$("#cou_02").html("￥ "+tab01chartjsonY[0].incomesum);
		var dates1 = [];
		var dates2 = [];
		var dateX = [];
		var columnChartoptInit = columnChartopt;
		$.each(tab01chartjsonY[0].costdatas, function(i, d) {
			dates1[i] = d.data;
			dateX[i] = d.rectime;
		})
		$.each(tab01chartjsonY[0].incomedatas, function(i, d) {
			dates2[i] = d.data;
		})
        // 图例
        columnChartoptInit.legend.data = [legendName6,legendName9]; 
        columnChartoptInit.series[0].name=legendName6; //图例item颜色需name对应
        columnChartoptInit.series[1].name=legendName9;

		columnChartoptInit.xAxis[0].data = dateX;
		columnChartoptInit.series[0].data = dates1;
		columnChartoptInit.series[1].data = dates2;

        //mycolumnChart3.clear();
		mycolumnChart3.setOption(columnChartoptInit);
	});
		
	/*$.ajax({
			type : "get",
			async:true,
			url : rightY_M_D_data[i].mData,
			dataType : "jsonp",
			jsonp: "callback",
			jsonpCallback:"costsumM",
			success : function(json){
				tab01chartjsonM = json;
				$doc.trigger("tab01chartjsonloadM")
			},
				error:function(){
				alert('加载图表01数据失败');
			}
		});*/
		demand.start({type:'GET',url:'http://10.36.128.73:8080/reds/ds/mainfinance?timeradio=mons&date=now',jsonp: 'mainfinance' ,done:main_mons_Compelte});
		
		/*$.ajax({
			type : "get",
			async:true,
			url : rightY_M_D_data[i].dData,
			dataType : "jsonp",
			jsonp: "callback",
			jsonpCallback:"costsumD",
			success : function(json){
				tab01chartjsonD = json;
				$doc.trigger("tab01chartjsonloadD")
			},
				error:function(){
				alert('加载图表01数据失败');
			}
		});		*/
		demand.start({type:'GET',url:'http://10.36.128.73:8080/reds/ds/mainfinance?timeradio=days&date=now',jsonp: 'mainfinance' ,done:main_days_Compelte});
		
		
		demand.start({type:'GET',url:'http://10.36.128.73:8080/reds/ds/mainfinance?timeradio=years&date=now',jsonp: 'mainfinance' ,done:main_years_Compelte});
			
		
		
}
	
//一些会调函数
function setCompelte(){ console.log(1111)}	


function main_years_Compelte(data){
	tab01chartjsonY = data;
	$doc.trigger("tab01chartjsonloadY")
}
function main_mons_Compelte(data){
	tab01chartjsonM = data;
	$doc.trigger("tab01chartjsonloadM")
}
function main_days_Compelte(data){
	tab01chartjsonD = data;
	$doc.trigger("tab01chartjsonloadD");
}

function mainLeft_Compelte(data){
	leftjsonpdata = data;
	$doc.trigger("leftjsonpdataReady") //左侧4个圆
}



function gnhnfn_Compelte(data, projectid){
var costEnergy = $('#costEnergy')
  , supplyEnergy = $('#supplyEnergy')
  ,	d = data
  , checkTypeNum = 0
  , colorNum = 1
  , logo = 'thunder'
  , indexNum = 0

// 清空列表
costEnergy.empty()
supplyEnergy.empty()

	//console.log(data,"供能耗能数据");
	$.each(d, function(index, data) {
        if(data.name === '供热水') return;
        var energyClass = data.name.substring(1,2);

        if(data.name.substring(0,1) === '耗' ) checkTypeNum++; //分类耗与供

        if(index < checkTypeNum) { //判断耗能还是供能
            switch(energyClass) {
                case '气':
                    colorNum = 1;
                    logo = 'fire';
                    indexNum = 1;
                break;
                case '水':
                    colorNum = 2;
                    logo = 'wth2';
                    indexNum = 2;
                break;
                case '电':
                    colorNum = 3;
                    logo = 'thunder'
                    indexNum = 3;
                break;
            }     
        } else {
            switch(energyClass) {
                case '热':
                    colorNum = 'ab5150';
                    logo = 'fire2';
                    indexNum = 4;
                break;
                case '冷':
                    colorNum = '71538a';
                    logo = 'cup';
                    indexNum = 5;
                break;
                case '电':
                    colorNum = '838d58';
                    logo = 'spr';
                    indexNum = 6;
                break;
                case '蒸':
                    colorNum = 'b59142';
                    logo = '9dots';
                    indexNum = 7;
                break;
                }
        }     

		var _day_name = "今日"+data.name+ " " +data.data1.unitname;
		var _month_name = "当月"+ data.name+ " " +data.data2.unitname;
		var _year_name = "当年"+ data.name+ " " +data.data3.unitname;
		var _day_val =data.data1.datavalue ;
		var _month_val = data.data2.datavalue;
		var _year_val = data.data3.datavalue;
        var _classpropertyid = data.classpropertyid;
		
var gnhnTemp = '<div class="eng-bp" id="showModal_'+indexNum+'" data-classpropertyid="'+_classpropertyid+'" data-unitname="'+data.data1.unitname+'">' +
               '     <div class="eng-block color-'+colorNum+'">' +
               '           <div class="eng-b-top clearfix">' +
               '                <div class="eng-icon">'+
'                                            <img src="images/icon-'+logo+'.png" alt="">'+
'                                        </div>'+
'                                        <div class="eng-text">'+
'                                            <div>'+
'                                                <p class="ghn-01-day-name">'+_day_name+'</p>'+
'                                                <p class="ghn-01-day-val">'+_day_val+'</p>'+
'                                            </div>'+
'                                        </div>'+
'                                    </div>'+
'                                    <div class="eng-b-con">'+
'                                        <div class="eng-bcin">'+
'                                            <p class="ghn-01-month-name">'+_month_name+'</p>'+
'                                            <p class="ghn-01-month-val">'+_month_val+'</p>'+
'                                        </div>'+
'                                        <div class="eng-bcin">'+
'                                            <p class="ghn-01-year-name">'+_year_name+'</p>'+
'                                            <p class="ghn-01-year-val">'+_year_val+'</p>'+
'                                        </div>'+
'                                    </div>'+
'                                </div>'+
'                            </div>';
		
        if(index < checkTypeNum) {
            costEnergy.append(gnhnTemp);		
        }
        else {
            supplyEnergy.append(gnhnTemp)
        }
		
	});
        // 对齐
                switch(projectid) {
                    case '1':
						$('.part-3 .eng-bp').css('width','33.33%');
                    break;
                    case '3':
						$('.part-3 .eng-bp').css('width','33.33%');
                    break;
                    case '4':
                        $('.part-3 .eng-bp').css('width','50%');
                    break;
                }
}
	
	function gnhnfn(e,projectid) {
			demand.start({type:'GET',url:'http://10.36.128.73:8080/reds/ds/setProject?projectid='+projectid+'',jsonp: 'setProject' ,done:setCompelte});
			demand.start({type:'GET',url:'http://10.36.128.73:8080/reds/ds/mainRight?timeradio=days',jsonp: 'mainRight' ,done:function(data){
                gnhnfn_Compelte(data, projectid);
            }
        });
	}
	$doc.on("loadRightTab2JSON", gnhnfn);
	//$doc.trigger("loadRightTab2JSON",[1]);

// 获取环境信息
function getWeather() {
    demand.start({url:'http://10.36.128.73:8080/reds/ds/weather',jsonp: 'weather' ,done:setWeather});
}
function setWeather(data){
   var d = data
     , irradiance = $('#irradiance') 
     , irradianceIcon = $('#irradianceIcon')
   if(data.length === 2){
        irradiance.hide();
        irradianceIcon.hide();
    } else {
        irradiance.show();
        irradianceIcon.show();
    }
   $.each(d, function(index, data) {
        switch(index) {
            case 0: $('#temperature').find('.highlight').text(data.datavalue + '°C');break;
            case 1: $('#humidity').find('.highlight').text(data.datavalue + '%');break;
            case 2: irradiance.find('.highlight').text(data.datavalue + 'w/㎡');break;
        }        
   });
}
	
	//RecvMsgFormUnity();
		function RecvMsgFormUnity(str, callback)
		{
                u.getUnity().SendMessage("AnchorPoint", "RecvMessage",d);
		}


    // 页面切换效果
        function switchPage(callback) {
			if( isAnimating ) {
				return false;
			}
			if( animcursor > 67) {
				animcursor = 1;
			}
			nextPage( animcursor, callback );
			++animcursor;
            //callback();
        }
// random
function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
	function init() {
		$pages.each( function() {
			var $page = $( this );
			$page.data( 'originalClassList', $page.attr( 'class' ) );
		} );

		$pages.eq( current ).addClass( 'pt-page-current' );

	}

	function nextPage( animation, callback ) {

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

		$nextPage.addClass( inClass ).on( animEndEventName, {fn: callback},function(event) { //callback
			$nextPage.off( animEndEventName );
			endNextPage = true;
            //console.log(event.data.fn)
			if( endCurrPage ) {
				onEndAnimation( $currPage, $nextPage, event.data.fn);
			}
		} );
            //console.log(callback)
        callback();

		if( !support ) {
			onEndAnimation( $currPage, $nextPage );
		}

	}

	function onEndAnimation( $outpage, $inpage, callback) {

		endCurrPage = false;
		endNextPage = false;
		resetPage( $outpage, $inpage ,callback);
		isAnimating = false;
	}

	function resetPage( $outpage, $inpage ) {
		$outpage.attr( 'class', $outpage.data( 'originalClassList' ) );
		$inpage.attr( 'class', $inpage.data( 'originalClassList' ) + ' pt-page-current' );

        if(typeof callback !== 'undefined') {
            callback();
        }
	}

	init(); // 切换页面


// 获取ajax
			function ajaxget(URL,JSONP,CALLBACK_NAME) {
				var thisAjax = $.ajax({
					type : "get",
					async:true,
					url : URL,
					dataType : "jsonp",
					jsonp: JSONP,
					//jsonpCallback:CALLBACK_NAME
				});
				return thisAjax;
			}
// 耗气，曲线+饼图

function energyFn() {
    var ajaxLoad_1
      , ajaxLoad_2
      , getEchart
      , unitname = (typeof arguments[2] == 'undefined') ? '' : arguments[2]

    ajaxLoad_1 = ajaxget(arguments[0][0],arguments[0][1], "popinc_col");
    ajaxLoad_2 = ajaxget(arguments[1][0],arguments[1][1], "popinc_pie");



    $.when(ajaxLoad_1,ajaxLoad_2,unitname).done(function(json_a,json_b,unitname) { // add passing unit

/*
                console.log(json_b[0][0].y);
                console.log(json_b);
                */

    modalchartobj = echarts.init(document.getElementById('chartinner'), defaultTheme);
    			
				//alert("ttt");
				var opt = optionModal; // 模型
				var xAxisdata = [];
				var colsdata01 = [];
				var piedata = [];
				var piedata2 = [];

if(json_a[0][0].list == null)  json_a[0][0].list = [{'rectime':'0','data':'0'},{'rectime':'0','data':'0'}]; // 若数据无则默认输出 
//if(json_b[0] == null) json_b[0] = []; 

//console.log(json_a[0][0].list.length)
                for(var i = 0, l = json_a[0][0].list.length; i < l; i++) {
                //console.log(json_a[0][0].list[i].rectime)
					//xAxisdata[i] = json_a[0][0].list[i].rectime.substring(0,10);// 过滤小时
					//xAxisdata[i] = json_a[0][0].list[i].rectime.split(' ')[1].split(':')[0]; // 过滤年月日，变为小时
					xAxisdata[i] = json_a[0][0].list[i].rectime; // 过滤年月日，变为小时

					colsdata01[i] = filterUnit(json_a[0][0].list[i].data); //过滤万分位
                }
                for(var j = 0, k = json_b[0].length; j < k; j++) {
					piedata[j] = {
						value : json_b[0][j].y, name:json_b[0][j].name
					}
                }
				opt.xAxis[0].data = xAxisdata;
				//opt.xAxis[0].axisLabel.formatter = '{value}'+'H'; // 增加X轴时间单位
				opt.xAxis[0].axisLabel.formatter = '{value}'; // 增加X轴时间单位
                if(isWan == null) opt.yAxis[0].axisLabel.formatter = '{value}'+unitname; // unitname
                else opt.yAxis[0].axisLabel.formatter = '{value}'+' 万'+unitname; // unitname

				opt.series[0].data = colsdata01;
				//opt.series[0].barWidth = 15;
				opt.series[1].data = piedata;
			//	alert(opt.series[1].data.length);

				modalchartobj.setOption(opt);
				$modalinnerChartWrap.data("echart", modalchartobj);
    });
}
// 成本收益弹出框调用函数
	function costFn(){ // 只传url、jsonp和type
			var ajaxLoad_1,
				ajaxLoad_2,
				ajaxLoad_3,
                type = arguments[3], //判断年0、月1、日2
				getEchart;
            //             demand.start({url:"http://10.36.128.73:8080/reds/ds/mainfinance?timeradio=years&date=now",jsonp:'mainfinance',done:function(data){console.log('dddddd '+data);ajaxLoad_1 = data}});
            //console.log('dididid '+arguments)
			ajaxLoad_1 = ajaxget(arguments[0][0],arguments[0][1], "popinc_col");
			ajaxLoad_2 = ajaxget(arguments[1][0],arguments[1][1], "popinc_pie");
			ajaxLoad_3 = ajaxget(arguments[2][0],arguments[2][1], "popinc_pie2");

			$.when(ajaxLoad_1,ajaxLoad_2,ajaxLoad_3).done(function(json_a,json_b,json_c) {
				//console.log( json_a,json_b,json_c,"拿到JSON数据")
				modalchartobj = echarts.init(document.getElementById('chartinner'), defaultTheme);

				var opt = optionModal3;
				var xAxisdata = [];
				var colsdata01 = [];
				var colsdata02 = [];
				var piedata = [];
				var piedata2 = [];


				$.each(json_a[0][0].costdatas, function(index,data) {
					xAxisdata[index] = data.rectime;
					colsdata01[index] = data.data; 
				});


				$.each(json_a[0][0].incomedatas, function(index,data) {
					colsdata02[index] = data.data; 
				});
				$.each(json_b[0], function(index,data) {
					piedata[index] = {
						value : data.y, name:data.name
					}
				});
				$.each(json_c[0], function(index,data) {
					piedata2[index] = {
						value : data.y, name:data.name
					}
				});

                //修改图例
                switch(type) {
                    case 0: //当年成本收益 
                        opt.legend.data = [legendName6,legendName9]; 
                        opt.series[0].name=legendName6; //图例item颜色需name对应
                        opt.series[1].name=legendName9;
                        break;
                    case 1: 
                        opt.legend.data = [legendName7,legendName10]; 
                        opt.series[0].name=legendName7;
                        opt.series[1].name=legendName10;
                        break;
                    case 2: 
                        opt.legend.data = [legendName8,legendName11]; 
                        opt.series[0].name=legendName8;
                        opt.series[1].name=legendName11;
                        break;
                }
                //判断Y轴是否加万分位
                if(isWan == null) opt.yAxis[0].axisLabel.formatter = '￥{value}';  
                else opt.yAxis[0].axisLabel.formatter = '￥{value}'+' 万';  


				opt.xAxis[0].data = xAxisdata;
				opt.series[0].data = filterUnit(colsdata01);//万分位过滤
				opt.series[0].barWidth = 15;
				opt.series[1].data =  filterUnit(colsdata02);//万分位过滤
				opt.series[1].barWidth = 15;
				opt.series[2].data = piedata;
				opt.series[3].data = piedata2;

				modalchartobj.setOption(opt);
				$modalinnerChartWrap.prepend( $("<div>").attr("id", "tempss").css("position", "relative") )
				//$(document.getElementById("tempss")).prepend($span1);
				//$(document.getElementById("tempss")).prepend($span2);
				$modalinnerChartWrap.data("echart", modalchartobj);
			})
    }	
    // 切换3d模型 

         function change3d(id) {
         
            switch(id) {
                case '1':
                    builtUnity3d("obj/AirPort20150515.unity3d");
                    interId = setInterval(function(){
                        demand.start({url:'http://10.36.128.73:8080/reds/ds/labeldataAll?pageid=100', jsonp: 'labeldataAll', done:sent3dData});
                    },6000);
                    break;
                case '3':
                    builtUnity3d("obj/Hostpial20150515.unity3d");
                    interId = setInterval(function(){
                        demand.start({url:'http://10.36.128.73:8080/reds/ds/labeldataAll?pageid=101', jsonp: 'labeldataAll', done:sent3dData});
                    },6000);
                    break;
                case '4':
                    builtUnity3d("obj/Other20150515.unity3d");
                    interId = setInterval(function(){
                        demand.start({url:'http://10.36.128.73:8080/reds/ds/labeldataAll?pageid=102', jsonp: 'labeldataAll', done:sent3dData});
                    },6000);
                    break;
            }
         }
         // 3d per
         function property3d(id) {
         
            switch(id) {
                case '1':
                        demand.start({url:'http://10.36.128.73:8080/reds/ds/labellist?pageid=100', jsonp: 'labellist', done:sent3dProperty});
                    break;
                case '3':
                        demand.start({url:'http://10.36.128.73:8080/reds/ds/labellist?pageid=101', jsonp: 'labellist', done:sent3dProperty});
                    break;
                case '4':
                        demand.start({url:'http://10.36.128.73:8080/reds/ds/labellist?pageid=102', jsonp: 'labellist', done:sent3dProperty});
                    break;
            }
         }

// 单曲线回调函数
		function singleEnergy_callback(url, callback, unitname) {
			//console.log("show 4 call back");
			//console.log(url);
			//console.log(callback);
			$.ajax({
				type : "get",
				async:true,
				//url : "ajaxsample/pop_inc_line_single.js",
				//url : "http://10.36.128.73:8080/reds/ds/singleEnergy?pid=473&timeradio=mons&date=now",
				url : url,
				dataType : "jsonp",
				//jsonp: "singleEnergy",
				jsonp: callback,
				jsonpCallback:"popinc_line_single",
				success : function(json){
					//console.log(json);
					var opt = optionModal2;
                    opt.xAxis[0].axisLabel.formatter = '{value}'+'H'; // 增加X轴时间单位
                    opt.yAxis[0].axisLabel.formatter = '{value}'+unitname; // unitname
					opt.xAxis[0].data= (function() {
						var  k = [];
                        if(json[0].list == null)  json[0].list = [{'rectime':'0','data':'0'},{'rectime':'0','data':'0'}]; // 若数据无则默认输出 
						$.each(json[0].list , function(index,data) {
							//k[index] = data.rectime.split(" ")[0];
							//k[index] = data.rectime.split(" ")[1].split(':')[0]; // 小时
							k[index] = data.rectime; // 小时
							//k[index] = data.rectime; // 单项曲线X轴
						});
						return k
					})();
					opt.series = [];
					opt.series[0] = (function() {
						var sd = {
							name: (function() {
								return json[0].div.name;
							})(),
							type:'line',
							symbolSize:10,
							stack: '总量',
							itemStyle:optionModal2itemsty,
							data:(function() {
								var k = [];
								$.each(json[0].list, function(index, data) {
									k[index] = data.data;
								});
								return k;
							})()
						}
						return sd;
					})();
					modalchartobj = echarts.init(document.getElementById('chartinner'), defaultTheme);
					modalchartobj.setOption(opt);
				},
					error:function(){
					//alert('加载单条曲线数据失败');
				}
			});	
        }
    function innerRight(id) {
        return function(){
            $doc.trigger("loadRightTab2JSON",[id]); // 加载供能耗能
        } 
    }
function innerLeftRight(id) {
   return function(){
       loadLeftRight(id);
   } 
} 

                function selectDate(type, pid, joinDate, unitname) {

                    switch(type) {
                        case 'one': // 耗气 
                            energyFn(['http://10.36.128.73:8080/reds/ds/singleEnergy?pid='+pid+'&timeradio=days&date='+joinDate+'','singleEnergy'],['http://10.36.128.73:8080/reds/ds/energyPie?pid='+pid+'&timeradio=days&date='+joinDate+'','energyPie'],unitname);
                            break;
                        case 'two': // 耗水
                            energyFn(['http://10.36.128.73:8080/reds/ds/singleEnergy?pid='+pid+'&timeradio=days&date='+joinDate+'','singleEnergy'],['http://10.36.128.73:8080/reds/ds/energyPie?pid='+pid+'&timeradio=days&date='+joinDate+'','energyPie'],unitname);
                            break;
                        case 'three': // 耗电
                            energyFn(['http://10.36.128.73:8080/reds/ds/singleEnergy?pid='+pid+'&timeradio=days&date='+joinDate+'','singleEnergy'],['http://10.36.128.73:8080/reds/ds/energyPie?pid='+pid+'&timeradio=days&date='+joinDate+'','energyPie'],unitname);
                            break;
                        case 'four':
                        case 'five':
                        case 'six':
                        case 'seven':
                            singleEnergy_callback('http://10.36.128.73:8080/reds/ds/singleEnergy?pid='+pid+'&timeradio=days&date='+joinDate+'', 'singleEnergy',unitname);
                            break;
                        case 'eight':
                            costFn(["http://10.36.128.73:8080/reds/ds/mainfinance?timeradio=years&date="+joinDate+"","mainfinance"],["http://10.36.128.73:8080/reds/ds/financePie?type=0&timeradio=years&date="+joinDate+"","financePie"],["http://10.36.128.73:8080/reds/ds/financePie?type=1&timeradio=years&date="+joinDate+"","financePie"],0);
                            break;
                        case 'nine':
                            costFn(["http://10.36.128.73:8080/reds/ds/mainfinance?timeradio=mons&date="+joinDate+"","mainfinance"],["http://10.36.128.73:8080/reds/ds/financePie?type=0&timeradio=mons&date="+joinDate+"","financePie"],["http://10.36.128.73:8080/reds/ds/financePie?type=1&timeradio=mons&date="+joinDate+"","financePie"],1);
                            break;
                        case 'ten':
                            costFn(["http://10.36.128.73:8080/reds/ds/mainfinance?timeradio=days&date="+joinDate+"","mainfinance"],["http://10.36.128.73:8080/reds/ds/financePie?type=0&timeradio=days&date="+joinDate+"","financePie"],["http://10.36.128.73:8080/reds/ds/financePie?type=1&timeradio=days&date="+joinDate+"","financePie"],2);
                            break;
                    }
                
                }
function dateAllShow() {
  dateYear.parents('.selector').show();
  dateMon.parents('.selector').show();
  dateDay.parents('.selector').show();
}

function getMaxOfArray(numArray) {
    return Math.max.apply(null, numArray);
}

function filterUnit(dig) {// 过滤万分位
    var max = null
      , flag = null
      , newArray = []
    if(Object.prototype.toString.call(dig) == '[object Array]') { //判断为array
       max = getMaxOfArray(dig); 
       flag = 1;
    } else {
        max = Number(dig);
        flag = null;
    }
                

    /*
    */
    if(Number(max) > 10000 ) { // max大于1W
        isWan = 1; //全局flag
        if(flag === 1) { // 是否为array
           $.each(dig, function(index, value) {
               newArray[index] = Number(value/10000).toFixed(1); //保留1位小数
           }); 
           
            return  newArray;
        } else {
            return Number(dig/10000).toFixed(1); //保留1位小数
        }
    }
    else {
        isWan = null;
        return dig;
    }

}
demand.start({url:'http://10.36.128.73:8080/reds/ds/equipState', jsonp: 'equipState',done:huanghuaEquipStatFn});

var huanghuaDianlengji17 = $('#huanghuaDianlengji17') //1#离心电冷机
  , huanghuaDianlengji18 = $('#huanghuaDianlengji18') //2#离心电冷机
function huanghuaEquipStatFn(data) {
   $.each(data, function(index, value){
        if(value.classinstanceid === 17 && value.datavalue1 === '0') {
            huanghuaDianlengji17.addClass('gray-filter');
        } else if(value.classinstanceid === 17 && value.datavalue1 === '1') {
            huanghuaDianlengji17.removeClass('gray-filter');
            setTimeout(function(){releaseAnimate('lixindianlengjiIn')},1000);
        } else if(value.classinstanceid === 18 && value.datavalue1 === '0') {
            huanghuaDianlengji18.addClass('gray-filter');
            console.log(9999999)
        } else if(value.classinstanceid === 18 && value.datavalue1 === '1') {
            huanghuaDianlengji18.removeClass('gray-filter');
            console.log(1121212)
        }
   });
}
var lixindianlengjiIn01 = [
    function() { animateFn('.leng-1-in01 .inner', {'height':'100%'}, 1543, 'linear',function(){releaseAnimate('lixindianlengjiIn')});}, // duration = height * spd 2.1
    function() { animateFn('.leng-1-in02 .inner', {'height':'100%'}, 567, 'linear',function(){releaseAnimate('lixindianlengjiIn')});}
];
$doc.queue('lixindianlengjiIn',lixindianlengjiIn01 );
/*释放队列下一个*/
function releaseAnimate(name) {
    $doc.dequeue(name);
}
/* 动画公用函数
ele对象 obj
rc removeClass string
ac addClass string
styles 属性 obj
duration 持续时间 number
easing 方式 string
callback 回调 function
*/
function animateFn(ele,styles,duration,easing,callback) {
    $(ele).animate(styles,duration,easing, callback);
}
/**************end*************/
};
       
