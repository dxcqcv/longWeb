$(document).ready(function () {
	$("#nyglinul li").bind("click", function () {
		$("#nyglinul li").removeClass("nyglinulsel");
		$(this).addClass("nyglinulsel");
	});
		
// for auto height
    autoHeight('.xtyhWrapper','.yxljBlock','.xtyhLeft');
    autoHeight('.xtyhWrapper','.yxljBlock','.xtyhRight');
    autoHeight('.xtyhLeft','.xtyhTopTitle','.xtyhTabBlock');
	xtyhAutoHeight('.xtyhTabBlock','.xtyhBottomTitle','.xtyhTopPic','.xtyhBottomPic')
	
	// for yhpz
	var abUp = $('.abUp');
	var abDown = $('.abDown');
	var yhpzPriority = $('.yhpzPriority');
	var yhpzNonpriority = $('.yhpzNonpriority');

	var ytpz = $('.ytpz'),
		rzlpz = $('.rzlpz'),
		nyjgpz = $('.nyjgpz'),
		yhfwgl = $('.yhfwgl'),
		jhsjgl = $('.jhsjgl'),
		sxbsjpz = $('.sxbsjpz'),
		ynyxjpz = $('.ynyxjpz'),
		sbsyyxj = $('.sbsyyxj'),
		mxzxxpz = $('.mxzxxpz'),
		xtyhmbpz = $('.xtyhmbpz'),
		fhycxzpz = $('.fhycxzpz');
	abUp.on('click', cAlert);
	abDown.on('click', cAlert);
	yhpzPriority.on('click', cAlert);
	yhpzNonpriority.on('click', cAlert);

	var s = $(window).scrollTop();
	console.log(s);
	$(window).scroll(function () {
		var yhpzLeft = $('.yhpzLeft');
		var yhpzRight = $('.yhpzRight');

		var s = $(window).scrollTop();
		if (s > 96) {
			yhpzLeft.addClass('fixPanel');
			yhpzRight.addClass('ml13');
		} else if (s <= 96) {
			yhpzLeft.removeClass('fixPanel');
			yhpzRight.removeClass('ml13');
		}
		if (s >= 0 && s < 114) {
			yhpzScroll(ytpz);
		} else if (s >= 114 && s < 228) {
			yhpzScroll(rzlpz);
		} else if (s > 228 && s < 342) {
			yhpzScroll(nyjgpz);
		} else if (s > 342 && s < 474) {
			yhpzScroll(yhfwgl);
		} else if (s > 474 && s < 615) {
			yhpzScroll(jhsjgl);
		} else if (s > 615 && s < 839) {
			yhpzScroll(sxbsjpz);
		} else if (s > 839 && s < 1108) {
			yhpzScroll(ynyxjpz);
		} else if (s > 1108 && s < 1290) {
			yhpzScroll(sbsyyxj);
		} else if (s > 1290 && s < 1348) {
			yhpzScroll(mxzxxpz);
		} else if (s > 1348 && s < 1423) {
			yhpzScroll(xtyhmbpz);
		} else if (s >= 1423) {
			yhpzScroll(fhycxzpz);
		}

	});

	$.fn.scrollTo = function (x, duration) {
		x = x || 0;
		duration = duration || 500;
		var offset = $(this).offset();
		if (offset) {
			$("html,body").animate({ scrollTop: $(this).offset().top + x }, duration);
		}
	};

	var ytpz = $('.ytpz'),
		rzlpz = $('.rzlpz'),
		nyjgpz = $('.nyjgpz'),
		yhfwgl = $('.yhfwgl'),
		jhsjgl = $('.jhsjgl'),
		sxbsjpz = $('.sxbsjpz'),
		ynyxjpz = $('.ynyxjpz'),
		sbsyyxj = $('.sbsyyxj'),
		mxzxxpz = $('.mxzxxpz'),
		xtyhmbpz = $('.xtyhmbpz'),
		fhycxzpz = $('.fhycxzpz');
	ytpz.on('click', function () {
		$(".yhpzRight").scrollTo(0);
	});
	rzlpz.on('click', function () {
		$(".yhpzRight").scrollTo(110);
	});
	nyjgpz.on('click', function () {
		$(".yhpzRight").scrollTo(217);
	});
	yhfwgl.on('click', function () {
		$(".yhpzRight").scrollTo(358);
	});
	jhsjgl.on('click', function () {
		$(".yhpzRight").scrollTo(465);
	});
	sxbsjpz.on('click', function () {
		$(".yhpzRight").scrollTo(708);
	});
	ynyxjpz.on('click', function () {
		$(".yhpzRight").scrollTo(982);
	});
	sbsyyxj.on('click', function () {
		$(".yhpzRight").scrollTo(1152);
	});
	mxzxxpz.on('click', function () {
		$(".yhpzRight").scrollTo(1224);
	});
	xtyhmbpz.on('click', function () {
		$(".yhpzRight").scrollTo(1319);
	});
	fhycxzpz.on('click', function () {
		$(".yhpzRight").scrollTo(1423);
	});

	LoadJnl();
	//LoadBasicWth('2014-08-13');
	//LoadOptWth('2014-08-13');
	//LoadBasicEngConsum('2014-08-10');
	//LoadOptEngConsum('2014-08-13');
});
function xtyhAutoHeight(total, detached, result1, result2) {
    var num = parseFloat($(total).height())-parseFloat($(detached).height());
    $(result1).height(parseFloat(num/2));
    $(result2).height(parseFloat(num/2));
   $(window).resize(function(){
        var num = parseFloat($(total).height())-parseFloat($(detached).height());
        $(result1).height(parseFloat(num/2));
        $(result2).height(parseFloat(num/2));
   });
}
function yhpzLeftPanel(tonum) {
	$(window).scrollTop(tonum);
}

function PopupDialog()
{
    var selTab = $("#selectedTab").val();
    if (selTab == '.testBlock')
    {
        var aa = '';
        if (baseConsumption == 0 || optConsumption == 0)
        { return; }
    }
    else if(selTab=='.normalBlock')
    {
        if(!IsPositiveInt($("#mj").val())||!IsPositiveInt($("#cggygn").val())||!IsPositiveInt($("#cggyhn").val()))
        {            
            UEEPAlert('请输入正确的数值！');
            return;
        }
        else
        {
            $('#td_leftDate').text('常规工艺');
            $("#td_leftWater").text( '吨');
            $("#td_leftElec").text($("#cggyhn").val() + '千克标煤');
            $("#td_leftGas").text('千克标煤');
            baseConsumption = parseFloat($("#cggyhn").val());
            if (baseConsumption != 0) {
                var jnlNumFull = (baseConsumption - optConsumption) * 100 / baseConsumption;
                var jnlNum = jnlNumFull.toFixed(2);
                if (jnlNum < -100) {
                    jnlNum = -100.00;
                }
                else if (jnlNum > 100) {
                    jnlNum = 100.00;
                }
                $("#span_Jnl").text(jnlNum);
            }
        }
    }
    else if(selTab=='.beforeBlock')
    {
        //gzqhn
        if (!IsPositiveInt($("#gzqhn").val()))
        {           
            UEEPAlert('请输入正确的数值！');
            return;
        }
        else {
            $('#td_leftDate').text('改造前');
            $("#td_leftWater").text('吨');
            $("#td_leftElec").text($("#gzqhn").val() + '千克标煤');
            $("#td_leftGas").text('千克标煤');
            baseConsumption = parseFloat($("#gzqhn").val());
            if (baseConsumption != 0) {
                var jnlNumFull = (baseConsumption - optConsumption) * 100 / baseConsumption;
                var jnlNum = jnlNumFull.toFixed(2);
                if (jnlNum < -100)
                {
                    jnlNum = -100.00;
                }
                else if (jnlNum > 100)
                {
                    jnlNum = 100.00;
                }
                $("#span_Jnl").text(jnlNum);
            }
        }
    }
    PopFancyBox();
}

function PopFancyBox()
{
    $('.btnDuiBi').fancybox({

        beforeShow: function () {
            
            
        },
        helpers: {
            overlay: { closeClick: false }
        },
        padding: 0
    });
}

var elecToCoal = 0.123;
var gasToCoal = 1.215;
var zgasToCoal = 0.127;
var basicFlag = false;
var optFlat = false;

//空属性转值，防止出现null
function initstring(parameters) {
    if (parameters != null && parameters.length > 0) {
        return parameters;
    } else {
        return " ";
    }
}

//查询设备计划信息
function LoadJnl() {
    $.ajax({
        type: "POST",//这里是http类型
        url: "/OptOptimize/GetJnl",//大家都应该很清楚了
        async: false,
        data: "",//回传一个参数
        dataType: "json",//传回来的数据类型
        success: function (data)
        {
           
            $("#p_Jnl").empty();
            if (data != 'ERROR') {
                $("#p_Jnl").text(String(data.jnl));
            }
           
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            UEEPAlert(XMLHttpRequest.responseText);
        }
    });
}

function yhpzScroll(name) {
	name.addClass('yhpzSelected').siblings('li').removeClass('yhpzSelected');
}
function cAlert() {    
    UEEPAlert('hi');
}
function checkAll() {

	if ($("#checkAll").attr("checked") == "checked") {
		$(".month_tbl tr td input").each(function () {
			$(this).attr("checked", "checked");
		});
	}
	else {
		$(".month_tbl tr td input").each(function () {
			$(this).removeAttr("checked");
		});
	}

}

function editedata() {
	$(".txttblval").css("display", "inline");
}
function savedata() {    
    UEEPAlert('sf');
	$(".txttblval").css("display", "none");
}

//获取基准日期气象数据
function LoadBasicWth(date) {
    $.ajax({
        type: "POST",
        url: "/OptOptimize/GetWthDataXTYH",
        async: false,
        data: { date: date, temp: Math.random() },
        dataType: "json",//传回来的数据类型
        success: function (data) {
            DrawBasicLine(data);
            //lineshowHD(data);
            //lineshowWTH(data);
            //TableWth(data);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            UEEPAlert(XMLHttpRequest.responseText);
        }
    });
}

//获取基准日期气象数据
function LoadBasicEngConsum(date) {
    $.ajax({
        type: "POST",
        url: "/OptOptimize/GetConsumeData",
        async: false,
        data: { startTime: date+' 00', endTime: date+' 23', temp: Math.random() },
        dataType: "json",//传回来的数据类型
        success: function (data) {
            DrawBasicArea(data);
            //lineshowHD(data);
            //lineshowWTH(data);
            //TableWth(data);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            UEEPAlert(XMLHttpRequest.responseText);
        }
    });
}

//获取优化日气象数据
function LoadOptWth(date) {
    $.ajax({
        type: "POST",
        url: "/OptOptimize/GetWthDataXTYH",
        async: false,
        data: { date: date, temp: Math.random() },
        dataType: "json",//传回来的数据类型
        success: function (data) {
            DrawOptLine(data);
            //lineshowHD(data);
            //lineshowWTH(data);
            //TableWth(data);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            UEEPAlert(XMLHttpRequest.responseText);
        }
    });
}

//获取基准日期气象数据
function LoadOptEngConsum(date) {
    $.ajax({
        type: "POST",
        url: "/OptOptimize/GetConsumeData",
        async: false,
        data: { startTime: date + ' 00', endTime: date + ' 23', temp: Math.random() },
        dataType: "json",//传回来的数据类型
        success: function (data) {
            DrawOptArea(data);
            //lineshowHD(data);
            //lineshowWTH(data);
            //TableWth(data);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            UEEPAlert(XMLHttpRequest.responseText);
        }
    });
}

function RefreshRightData()
{
    WdatePicker({
        dateFmt: 'yyyy-MM-dd', onpicking: function (dp)
        {
            $('#xrd').text(dp.cal.getNewDateStr());
            LoadOptWth(dp.cal.getNewDateStr());
            LoadOptEngConsum(dp.cal.getNewDateStr());
            $('#td_RightDate').text(dp.cal.getNewDateStr());
            $('#span_rightDate').text(dp.cal.getNewDateStr());
        }
    })
}

function RefreshLeftData() {
    WdatePicker({
        dateFmt: 'yyyy-MM-dd', onpicking: function (dp)
        {
            $('#xd').text(dp.cal.getNewDateStr());
            LoadBasicWth(dp.cal.getNewDateStr());
            LoadBasicEngConsum(dp.cal.getNewDateStr());
            $('#td_leftDate').text(dp.cal.getNewDateStr());
            $('#span_leftDate').text(dp.cal.getNewDateStr());
        },onpicked:function(){
            $(this).blur();
        }
    })
}

var baseConsumption=0.0;
var optConsumption=0.0;

//温度曲线显示
function DrawBasicLine(data) {
    var series = new Array();
    var yAxis = new Array();
    var catego = new Array();
    var tpArr = new Array();
    var hdArr = new Array();
    var fzdArr = new Array();   
    $.each(data.sj, function (m, item)
    {
        //if (m == 0)
        //{
        //    lineLayc.push([0, null]);
        //}
        tpArr.push([Number(item.time), Number(item.tp)]);
        hdArr.push([Number(item.time), Number(item.hd)]);
        fzdArr.push([Number(item.time), Number(item.wth)]);
        //catego.push(item.time);
    });


    var tpSeriesItem =
        {
            name: '温度',
            type: 'spline',
            color: '#89A54E',
            yAxis: 0,
            data: tpArr,
            marker: {
                radius: 3,
                enabled: true,               
                symbol: 'circle'
            },
            dashStyle: 'solid',
            tooltip: {
                valueSuffix: '°C'
            }
        };
   
    var tpYAxis = {
        labels:
        {
            formatter: function () {
                return this.value + '°C';
            },
            style: {
                color: '#89A54E'
            }
        },
        title:
        {
            text: '温度',
            style: {
                color: '#89A54E'
            }
        },
        opposite: false
    };
    yAxis.push(tpYAxis);
    series.push(tpSeriesItem);

    var hdSeriesItem =
        {
            name: '湿度',
            type: 'spline',
            color: '#AA4643',
            yAxis: 1,
            data: hdArr,
            marker: {
                radius: 3,
                enabled: true,             
                symbol: 'circle'
            },
            dashStyle: 'solid',
            tooltip: {
                valueSuffix: ''
            }
        };

    var hdYAis =
        {
            //gridLineWidth: 1,
            title:
                {
                    text: '湿度',
                    style: {
                        color: '#AA4643'
                    }
                },
            labels:
           {
               formatter: function () {
                   return this.value + '%';
               },
               style:
                   {
                       color: '#AA4643'
                   }
           },
            opposite: true
        };
    yAxis.push(hdYAis);
    series.push(hdSeriesItem);

    var fzdSeriesItem =
        {
            name: '辐照度',
            type: 'spline',
            color: 'blue',
            yAxis: 2,
            data: fzdArr,
            marker: {
                radius: 3,
                enabled: true  ,              
                symbol: 'circle'
            },
            dashStyle: 'solid',
            tooltip: {
                valueSuffix: ''
            }
        };

    var fzdYAxis =
        {
            //gridLineWidth: 1,
            title: {
                text: '辐照度',
                style: {
                    color: 'blue'
                }
            },
            labels: {
                formatter: function () {
                    return this.value + '';
                },
                style: {
                    color: 'blue'
                }
            },
            opposite: true
        };
    yAxis.push(fzdYAxis);
    series.push(fzdSeriesItem);
       
    linechartInit('spline', $("#div_TopLeft"), "天气情况", series, yAxis, catego);
}

//温度曲线显示
function DrawBasicArea(data) {
    var series = new Array();
    var yAxis = new Array();
    var catego = new Array();
    var waterArr = new Array();
    var elecArr = new Array();
    var gasArr = new Array();
    var leftWater = 0.0;
    var leftGas = 0.0;
    var leftElec = 0.0;    
   

    $.each(data.yc, function (m, item)
    {
        //if (m == 0)
        //{
        //    lineLayc.push([0, null]);
        //}
        leftWater += item.waterConsum;
        leftGas += item.gasConsum;
        leftElec += item.elecConsum;
        leftGas = leftGas * gasToCoal;
        leftElec = leftElec * elecToCoal;
        
        waterArr.push([Number(item.hour), Number(item.waterConsum)]);
        elecArr.push([Number(item.hour), Number(item.elecConsum)]);
        gasArr.push([Number(item.hour), Number(item.gasConsum)]);
        //catego.push(item.time);
       
    });
    leftWater = Math.round(leftWater*100)/100;
    leftElec = Math.round(leftElec*100)/100;
    leftGas = Math.round(leftGas*100)/100;

    baseConsumption =  leftGas + leftElec;
    if (baseConsumption != 0) {
        //var jnlNum = Math.round((baseConsumption - optConsumption) * 100 / baseConsumption);
        var jnlNumFull = (baseConsumption - optConsumption) * 100 / baseConsumption;
        var jnlNum = jnlNumFull.toFixed(2);
        if (jnlNum < -100) {
            jnlNum = -100.00;
        }
        else if (jnlNum > 100) {
            jnlNum = 100.00;
        }
        $("#span_Jnl").text(jnlNum);
    }

    $("#td_leftWater").text(leftWater+'吨');
    $("#td_leftElec").text(leftElec + '千克标煤');
    $("#td_leftGas").text(leftGas + '千克标煤');

    var tpSeriesItem =
        {
            name: '耗电',          
            color: '#9BC6EF',
            yAxis: 0,
            data: elecArr,
            marker: {
                radius: 3,
                enabled: true,
                symbol: 'circle'
            },          
            tooltip: {
                valueSuffix: 'kWh'
            }
        };

    var tpYAxis = {
        labels:
        {
            formatter: function () {
                return this.value + 'kWh';
            },
            style: {
                color: '#9BC6EF'
            }
        },
        title:
        {
            text: '耗电',
            style: {
                color: '#9BC6EF'
            }
        },
        opposite: false
    };
    yAxis.push(tpYAxis);
    series.push(tpSeriesItem);

    var hdSeriesItem =
        {
            name: '耗气',          
            color: '#707074',
            yAxis: 1,
            data: gasArr,
            marker: {
                radius: 3,
                enabled: true,
                symbol: 'circle'
            },           
            tooltip: {
                valueSuffix: 'm³'
            }
        };

    var hdYAis =
        {
            //gridLineWidth: 1,
            title:
                {
                    text: '耗气',
                    style: {
                        color: '#707074'
                    }
                },
            labels:
           {
               formatter: function () {
                   return this.value + 'm³';
               },
               style:
                   {
                       color: '#707074'
                   }
           },
            opposite: true
        };
    yAxis.push(hdYAis);
    series.push(hdSeriesItem);

    var fzdSeriesItem =
        {
            name: '耗水',            
            color: '#92E298',
            yAxis: 2,
            data: waterArr,
            marker: {
                radius: 3,
                enabled: true,
                symbol: 'circle'
            },           
            tooltip: {
                valueSuffix: 'T'
            }
        };

    var fzdYAxis =
        {
            //gridLineWidth: 1,
            title: {
                text: '耗水',
                style: {
                    color: '#92E298'
                }
            },
            labels: {
                formatter: function () {
                    return this.value + 'T';
                },
                style: {
                    color: '#92E298'
                }
            },
            opposite: true
        };
    yAxis.push(fzdYAxis);
    series.push(fzdSeriesItem);

    linechartInit('areaspline', $("#div_BottomLeft"), "", series, yAxis, catego);
}

//温度曲线显示
function DrawOptLine(data) {
    var series = new Array();
    var yAxis = new Array();
    var catego = new Array();
    var tpArr = new Array();
    var hdArr = new Array();
    var fzdArr = new Array();
    $.each(data.sj, function (m, item) {
        //if (m == 0)
        //{
        //    lineLayc.push([0, null]);
        //}
        tpArr.push([Number(item.time), Number(item.tp)]);
        hdArr.push([Number(item.time), Number(item.hd)]);
        fzdArr.push([Number(item.time), Number(item.wth)]);
        //catego.push(item.time);
    });


    var tpSeriesItem =
        {
            name: '温度',            
            color: '#89A54E',
            yAxis: 0,
            data: tpArr,
            marker: {
                radius: 3,
                enabled: true,
                symbol: 'circle'
            },           
            tooltip: {
                valueSuffix: '°C'
            }
        };

    var tpYAxis = {
        labels:
        {
            formatter: function () {
                return this.value + '°C';
            },
            style: {
                color: '#89A54E'
            }
        },
        title:
        {
            text: '温度',
            style: {
                color: '#89A54E'
            }
        },
        opposite: false
    };
    yAxis.push(tpYAxis);
    series.push(tpSeriesItem);

    var hdSeriesItem =
        {
            name: '湿度',           
            color: '#AA4643',
            yAxis: 1,
            data: hdArr,
            marker: {
                radius: 3,
                enabled: true,
                symbol: 'circle'
            },
            dashStyle: 'solid',
            tooltip: {
                valueSuffix: ''
            }
        };

    var hdYAis =
        {
            //gridLineWidth: 1,
            title:
                {
                    text: '湿度',
                    style: {
                        color: '#AA4643'
                    }
                },
            labels:
           {
               formatter: function () {
                   return this.value + '%';
               },
               style:
                   {
                       color: '#AA4643'
                   }
           },
            opposite: true
        };
    yAxis.push(hdYAis);
    series.push(hdSeriesItem);

    var fzdSeriesItem =
        {
            name: '辐照度',            
            color: 'blue',
            yAxis: 2,
            data: fzdArr,
            marker: {
                radius: 3,
                enabled: true,
                symbol: 'circle'
            },
            dashStyle: 'solid',
            tooltip: {
                valueSuffix: ''
            }
        };

    var fzdYAxis =
        {
            //gridLineWidth: 1,
            title: {
                text: '辐照度',
                style: {
                    color: 'blue'
                }
            },
            labels: {
                formatter: function () {
                    return this.value + '';
                },
                style: {
                    color: 'blue'
                }
            },
            opposite: true
        };
    yAxis.push(fzdYAxis);
    series.push(fzdSeriesItem);

    linechartInit('spline', $("#div_TopRight"), "天气情况", series, yAxis, catego);
}

function DrawOptArea(data) {
    var series = new Array();
    var yAxis = new Array();
    var catego = new Array();
    var waterArr = new Array();
    var elecArr = new Array();
    var gasArr = new Array();
    var rightWater = 0.0;
    var rightGas = 0.0;
    var rightElec = 0.0;
    $.each(data.yc, function (m, item)
    {
        //if (m == 0)
        //{
        //    lineLayc.push([0, null]);
        //}

        rightWater += item.waterConsum;
        rightGas += item.gasConsum;
        rightElec += item.elecConsum;
        rightElec = rightElec * elecToCoal;
        rightGas = rightGas * gasToCoal;
        
        waterArr.push([Number(item.hour), Number(item.waterConsum)]);
        elecArr.push([Number(item.hour), Number(item.elecConsum)]);
        gasArr.push([Number(item.hour), Number(item.gasConsum)]);
        //catego.push(item.time);
       
    });
    rightWater = Math.round(rightWater * 100) / 100;
    rightElec = Math.round(rightElec * 100) / 100;
    rightGas = Math.round(rightGas * 100) / 100;
    optConsumption =  rightGas + rightElec;
    if (baseConsumption != 0) {
        var jnlNumFull = (baseConsumption - optConsumption) * 100 / baseConsumption;
        var jnlNum = jnlNumFull.toFixed(2);
        if (jnlNum < -100) {
            jnlNum = -100.00;
        }
        else if (jnlNum > 100) {
            jnlNum = 100.00;
        }
        $("#span_Jnl").text(jnlNum);       
    }

    $("#td_rightWater").text(rightWater + '吨');
    $("#td_rightElec").text(rightElec + '千克标煤');
    $("#td_rightGas").text(rightGas + '千克标煤');

    var tpSeriesItem =
        {
            name: '耗电',
            color: '#9BC6EF',
            yAxis: 0,
            data: elecArr,
            marker: {
                radius: 3,
                enabled: true,
                symbol: 'circle'
            },
            tooltip: {
                valueSuffix: 'kWh'
            }
        };

    var tpYAxis = {
        labels:
        {
            formatter: function () {
                return this.value + 'kWh';
            },
            style: {
                color: '#9BC6EF'
            }
        },
        title:
        {
            text: '耗电',
            style: {
                color: '#9BC6EF'
            }
        },
        opposite: false
    };
    yAxis.push(tpYAxis);
    series.push(tpSeriesItem);

    var hdSeriesItem =
        {
            name: '耗气',
            color: '#707074',
            yAxis: 1,
            data: gasArr,
            marker: {
                radius: 3,
                enabled: true,
                symbol: 'circle'
            },
            tooltip: {
                valueSuffix: 'm³'
            }
        };

    var hdYAis =
        {
            //gridLineWidth: 1,
            title:
                {
                    text: '耗气',
                    style: {
                        color: '#707074'
                    }
                },
            labels:
           {
               formatter: function () {
                   return this.value + 'm³';
               },
               style:
                   {
                       color: '#707074'
                   }
           },
            opposite: true
        };
    yAxis.push(hdYAis);
    series.push(hdSeriesItem);

    var fzdSeriesItem =
        {
            name: '耗水',
            color: '#92E298',
            yAxis: 2,
            data: waterArr,
            marker: {
                radius: 3,
                enabled: true,
                symbol: 'circle'
            },
            tooltip: {
                valueSuffix: 'T'
            }
        };

    var fzdYAxis =
        {
            //gridLineWidth: 1,
            title: {
                text: '耗水',
                style: {
                    color: '#92E298'
                }
            },
            labels: {
                formatter: function () {
                    return this.value + 'T';
                },
                style: {
                    color: '#92E298'
                }
            },
            opposite: true
        };
    yAxis.push(fzdYAxis);
    series.push(fzdSeriesItem);

    linechartInit('areaspline', $("#div_BottomRight"), "", series, yAxis, catego);
}

//修改节能率
function EditJNL() {
    //if (!$('#pageform').valid()) return;
    //提交，存入数据库  
    var aa = '';
    if (baseConsumption == 0 || optConsumption == 0)
    { return;}
    $.ajax({
        type: 'POST',
        url: "/OptOptimize/UpdateJNL",
        dataType: "json",
        data: { jnl:$("#span_Jnl").text(),baseDate:$('#td_leftDate').text(),optDate:$('#td_RightDate').text(),baseConsum:baseConsumption,optConsum:optConsumption },
        success: function (data) {
            if (data == 'OK') {
                $.fancybox.close();
                $("#p_Jnl").text($("#span_Jnl").text())

            } else {
                UEEPAlert(data);
            }
        },
        error: function (XMLResponse) {
            alert(XMLResponse.responseText);
        }
    });
}

function Compute()
{
    var jnl = $("#p_Jnl").text();
    if (parseFloat(jnl) == 100 || parseFloat(jnl)==-100)
    {
        UEEPAlert('无效的节能率数据，请重新对比获取节能率!');
        return;
    }
    var startDate = $("#startDate").val();
    var endDate = $("#endDate").val();
    var arrayD1 = startDate.split("-");
    var date1 = new Date(arrayD1[0], arrayD1[1]-1, arrayD1[2]);
    var arrayD2 = endDate.split("-");
    var date2 = new Date(arrayD2[0], arrayD2[1]-1, arrayD2[2]);

    var now = new Date();
    if (date1 > now || date2 > now)
    {       
        UEEPAlert('所选日期不应为未来日期!');
        return;
    }

    if (date1 < date2) {
        $.ajax(
       {
           url: "/OptOptimize/GetCompareData",
           type: "POST",
           async: false,
           data: { startTime: startDate, endTime: endDate, jnl: $("#p_Jnl").text() },
           dataType: "json",
           success: function (data) {
               var strEqu = "";
               //$("#p_Jnl").empty();
               if (data != 'ERROR') {
                   $("#p_basWater").text('耗水：' + String(data.basWater) + '吨' );
                   $("#p_basElec").text('耗电：'+String(data.basElec)+'kwh');
                   $("#p_basGas").text('耗气：' + String(data.basGas)+'m³');
                   $("#p_optWater").text('耗水：' + String(data.optWater) + '吨');
                   $("#p_optGas").text('耗气：' + String(data.optGas)+'m³');
                   $("#p_optElec").text('耗电：' + String(data.optElec) + 'kwh');
                   $("#p_savingWater").text('节水：' + String(data.savingWater) + '吨');
                   $("#p_savingElec").text('节电：' + String(data.savingElec) + 'kwh');
                   $("#p_savingGas").text('节气：' + String(data.savingGas)+'m³');
                   $("#p_savingCost").text('费用：' + String(data.savingCost)+'元');
                   $("#p_savingStdCoal").text('标煤：' + String(data.savingStdCoal)+"千克");
               }

           },
           //success: function (responseJSON) {
           //    var strEqu = "";
           //    $.each(responseJSON, function (n, value) {                                    
           //        $("#p_basWater").text(String(data.basWater));
           //        $("#p_basElec").text(String(data.basElec));
           //        $("#p_basGas").text(String(data.basGas));
           //        $("#p_optWater").text(String(data.optWater));
           //        $("#p_optGas").text(String(data.optGas));
           //        $("#p_optElec").text(String(data.optElec));
           //        $("#p_savingWater").text(String(data.savingWater));
           //        $("#p_savingElec").text(String(data.savingElec));
           //        $("#p_savingGas").text(String(data.savingGas));
           //        $("#p_savingCost").text(String(data.savingCost));
           //        $("#p_savingStdCoal").text(String(data.savingStdCoal));
                   
           //    });
           //},
           error: function (XMLHttpRequest, textStatus, errorThrown) {
               UEEPAlert('所选日期区间未获取到数据！');//XMLHttpRequest.responseText);
           }
       });
    }
    else       
        UEEPAlert('开始日不能晚于结束日！');

   
}


//辐照度曲线显示
function lineshowWTH(data) {
    var series = new Array();
    var catego = new Array();
    var lineLayc = new Array();
    var lineLasj = new Array();
    $.each(data.yc, function (m, item) {
        if (m == 0) { lineLayc.push([0, null]); }
        lineLayc.push([Number(item.time), Number(item.wth)]);
        //catego.push(item.time);
    });
    $.each(data.sj, function (m, item) {
        lineLasj.push([Number(item.time), Number(item.wth)]);
        //catego.push(item.time);
    });
    //if (lineLayc.length > 0) {
    var item2 = {
        name: '预测辐照度',
        data: lineLayc,
        marker: {
            enabled: false
        }
    };
    series.push(item2);
    //}
    //if (lineLasj.length > 0) {
    var item2 = {
        name: '实际辐照度',
        data: lineLasj,
        marker: {
            enabled: false
        }
    };
    series.push(item2);
    //}
    linechartInit('spline', $("#div_wth"), "辐照度", series, catego);
}

function linechartInit(type, div, title, series,yAxis, catego) {
    div.highcharts({
        chart: {
            type: type
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            tickInterval: 2
        },
        yAxis: yAxis,
        tooltip: {
            crosshairs: true,
            shared: true
        },
        series: series



    });
}
