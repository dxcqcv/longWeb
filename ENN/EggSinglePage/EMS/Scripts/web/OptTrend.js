//初始化加载
$(document).ready(function () {
    // for hide table
    var etTable = $('.hideTable');
    etTable.hide();

    $(window).resize(function(){
	//	$("#tab_eng_head").width($("#tab_eng_content").width());
	//	$("#tab_wht_head").width($("#tab_wht_content").width());
		fhycAutoHeight('#fhycWrapper', '.eeoptTop'); // for ie resize
        // for three chart
        setThreeChart();
    });

    // for auto height
    autoHeight('.eeoptTop', '.etBar', '.etcBlock');
    autoHeight('.eeoptTop', '.etBar', '#div_eng');
    autoHeight('.eeoptTop', '.etBar', '.fhycTable');
    fhycAutoHeight('#fhycWrapper', '.eeoptTop');
    fhycTableAutoHeight('.fhycTable', 35, '.etScroll');
    $("#nyglinul li").bind("click", function () {
        $("#nyglinul li").removeClass("nyglinulsel");
        $(this).addClass("nyglinulsel");
    });
    // for fhyc tab
    var fl = $('.fhxzList > li');
    // for fh sel
    var lrfh = $('#lrfh'),
        dfh = $('#dfh');
    var cld = $('.cld'),
        pld = $('.pld');
    dfh.hide();
    pld.hide();


    fl.on('click', function () {
        var $this = $(this);
        var sel = $this[0].id.replace("li_", "");

        $this.addClass('on').siblings('li').removeClass('on');
        LoadEng($("#sele_time_eng").val(), $this[0].id.replace("li_", ""));
        if (sel === "pld") {
            lrfh.hide();
            dfh.show();
            pld.show();
            cld.hide();
        } else {
            dfh.hide();
            lrfh.show();
            cld.show();
            pld.hide();
        }
    });
    // for fhyc select
    var fhycS = $('.fhycS');
    var fhycB = $('.fhycB');
    var fhycWrapper = $('.fhycWrapper');
    fhycWrapper.on('mouseover', function () {
        var $this = $(this);
        $this.children('.fhycB').show();
    });
    fhycWrapper.on('mouseleave', function () {
        var $this = $(this);
        $this.children('.fhycB').hide();
    });
    fhycS.on('click', function () {
        var $this = $(this);
    });
    fhycB.on('click', function () {
        var $this = $(this);
        var pos = $this.data('sel');
        var fbottomc = $('.fbottomc');
        var fbottomt = $('.fbottomt');
        var etChart = $('.etChart');
        var etTable = $('.etTable');

        if ($this.hasClass('fhycbHide')) {
            $this.siblings('div.fhycS').addClass('fhycbShow').removeClass('fhyctShow');
            $this.addClass('fhyctHide').removeClass('fhycbHide');
            if (pos == 'top') {
                etTable.show();
                etChart.hide();
            } else if (pos == 'bottom') {
                fbottomt.show();
                fbottomc.hide();
            }
        } else if ($this.hasClass('fhyctHide')) {
            $this.siblings('div.fhycS').addClass('fhyctShow').removeClass('fhycbShow');
            $this.addClass('fhycbHide').removeClass('fhyctHide');
            if (pos == 'top') {
                etChart.show();
                etTable.hide();
            } else if (pos == 'bottom') {
                fbottomc.show();
                fbottomt.hide();
            }
        }
        //$("#tab_eng_head").width($("#tab_eng_content").width());
        //$("#tab_wht_head").width($("#tab_wht_content").width());

    });
    $("#sele_time_wth").val($("#today").val());
    $("#sele_time_eng").val($("#today").val());
    LoadWth($("#sele_time_wth").val());
    LoadEng($("#sele_time_eng").val(), "cld");
    //$("#sele_time_wth").change(function () {
    //    alert("aaa");
    //    LoadWth($("#sele_time_wth").val());
    //});
    //$("#sele_time_eng").change(function () {
    //    LoadEng($("#sele_time_eng").val());
    //});
});
function setThreeChart() {
    var chartWrapper = $('.contentTop'),
        etBlock = $('.etcBlock');
    var tw = chartWrapper.width();
    var hasVerticalScrollbar = chartWrapper[0].scrollHeight>chartWrapper[0].clientHeight;

    if(!hasVerticalScrollbar) {
        tw = chartWrapper.width() - 20;
    } else {
        tw = chartWrapper.width();
    }
    etBlock.each(function() {
        $(this).width(Math.floor(tw/3)); 
    });
}
function fhycTableAutoHeight(total, detached, result) {
    var num = parseFloat($(total).outerHeight()) - detached;
    $(result).height(num);
    $(window).resize(function(){
        var num = parseFloat($(total).outerHeight()) - detached;
        $(result).height(num);
    });
}
function fhycAutoHeight(total, result) {
   var num = parseFloat($(total).height())/2; 
   $(result).height(num);
   /*
    $(window).resize(function(){
           var num = parseFloat($(total).height())/2; 
           $(result).height(num);
    });
    */
}
//获取气象数据
function LoadWth(date) {
    $.ajax({
        type: "POST",
        url: "/OptTrend/GetWthData",
        async: false,
        data: { date: date, temp: Math.random() },
        dataType: "json",//传回来的数据类型
        success: function (data) {
            lineshowTP(data);
            lineshowHD(data);
            lineshowWTH(data);
            TableWth(data);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            UEEPAlert(XMLHttpRequest.responseText);
        }
    });
}
//能源数据
function LoadEng(date, type) {
    $.ajax({
        type: "POST",
        url: "/OptTrend/GetEngData",
        async: false,
        data: { date: date, temp: Math.random() },
        dataType: "json",//传回来的数据类型
        success: function (data) {
            TableEng(data);
            var series = new Array();
            var catego = new Array();
            var lineLayc = new Array();
            var lineLaxz = new Array();
            var lineLasj = new Array();
            $.each(data.yc, function (m, item) {
                if (m == 0) { lineLayc.push([0, null]); }
                lineLayc.push([Number(item.time), Number(eval("item." + type + ""))]);
            });
            $.each(data.xz, function (m, item) {
                lineLaxz.push([Number(item.time), Number(eval("item." + type + ""))]);
            });
            $.each(data.sj, function (m, item) {
                lineLasj.push([Number(item.time), Number(eval("item." + type + ""))]);
            });
            //if (lineLayc.length > 0) {
                var item2 = {
                    name: '预测',
                    data: lineLayc,
                    marker: {
                        enabled: false
                    }
                };
                series.push(item2);
            //}
            //if (lineLaxz.length > 0) {
                var item2 = {
                    name: '修正',
                    data: lineLaxz,
                    marker: {
                        enabled: false
                    }
                };
                series.push(item2);
            //}
            //if (lineLasj.length > 0) {
                var item2 = {
                    name: '实际',
                    data: lineLasj,
                    marker: {
                        enabled: false
                    }
                };
                series.push(item2);
            //}
            linechartInit('area', $("#div_eng"), "", series, catego);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            UEEPAlert(XMLHttpRequest.responseText);
        }
    });
}
//气象表格
function TableWth(data) {
    var drawStr = "";
    if (data.yc.length == 0 &&data.sj.length>0)
    {
        $.each(data.sj, function (n, value) {
            //if (n > data.sj.length - 1) { return false; }
            drawStr += "<tr>";
            //$.each(data.yc, function (m, value) {

            drawStr += "<td>" + value.day + "</td>";
            drawStr += "<td>" + value.time + "</td>";
            drawStr += "<td>" + '--' + "</td>";
            drawStr += "<td>" + (typeof (data.sj[n]) == "undefined" ? 0 : data.sj[n].tp) + "</td>";
            drawStr += "<td>" + '--' + "</td>";
            drawStr += "<td>" + (typeof (data.sj[n]) == "undefined" ? 0 : data.sj[n].hd) + "</td>";
            drawStr += "<td>" + '--' + "</td>";
            drawStr += "<td>" + (typeof (data.sj[n]) == "undefined" ? 0 : data.sj[n].wth) + "</td>";
            //});
            drawStr += "</tr>";
        });
    }
    else if (data.yc.length >0  && data.sj.length == 0)
    {
        $.each(data.yc, function (n, value) {
            //if (n > data.sj.length - 1) { return false; }
            drawStr += "<tr>";
            //$.each(data.yc, function (m, value) {

            drawStr += "<td>" + value.day + "</td>";
            drawStr += "<td>" + value.time + "</td>";
            drawStr += "<td>" + value.tp + "</td>";
            drawStr += "<td>" + '--' + "</td>";
            drawStr += "<td>" + value.hd + "</td>";
            drawStr += "<td>" + '--' + "</td>";
            drawStr += "<td>" + value.wth + "</td>";
            drawStr += "<td>" + '--' + "</td>";
            //});
            drawStr += "</tr>";
        });
    }
    else if (data.yc.length == 0 && data.sj.length == 0)
    {
        drawStr = "";
    }
    else
    {
        $.each(data.yc, function (n, value) {
            //if (n > data.sj.length - 1) { return false; }
            drawStr += "<tr>";
            //$.each(data.yc, function (m, value) {

            drawStr += "<td>" + value.day + "</td>";
            drawStr += "<td>" + value.time + "</td>";
            drawStr += "<td>" + value.tp + "</td>";
            drawStr += "<td>" + (typeof (data.sj[n]) == "undefined" ? 0 : data.sj[n].tp) + "</td>";
            drawStr += "<td>" + value.hd + "</td>";
            drawStr += "<td>" + (typeof (data.sj[n]) == "undefined" ? 0 : data.sj[n].hd) + "</td>";
            drawStr += "<td>" + value.wth + "</td>";
            drawStr += "<td>" + (typeof (data.sj[n]) == "undefined" ? 0 : data.sj[n].wth) + "</td>";
            //});
            drawStr += "</tr>";
        });
    }
    
    $("#table_wht").empty().append(drawStr);
    $("#table_wht tr:odd").addClass("odd");
		//$("#tab_eng_head").width($("#tab_eng_content").width());
		//$("#tab_wht_head").width($("#tab_wht_content").width());
}
//温度曲线显示
function lineshowTP(data) {
    var series = new Array();
    var catego = new Array();
    var lineLayc = new Array();
    var yAxis = new Array();
    var lineLasj = new Array();
    $.each(data.yc, function (m, item) {
        if (m == 0) { lineLayc.push([0, null]); }
        lineLayc.push([Number(item.time), Number(item.tp)]);
        //catego.push(item.time);
    });
    $.each(data.sj, function (m, item) {
        lineLasj.push([Number(item.time), Number(item.tp)]);
        //catego.push(item.time);
    });
    //if (lineLayc.length > 0) {
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
   
        var item2 = {
           

        	name: '天气预报温度',
            type: 'spline',
            color: '#89A54E',            
            data: lineLayc,
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
        series.push(item2);
    //}
    //if (lineLasj.length > 0) {
        var item2 =
        {           
            name: '实际温度',
            type: 'spline',
            color: '#3197e3',            
            data: lineLasj,
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
        series.push(item2);
    //}
    chartInit1('spline', $("#div_tp"), "温度", series,tpYAxis, catego);
}
//湿度曲线显示
function lineshowHD(data) {
    var series = new Array();
    var catego = new Array();
    var lineLayc = new Array();
    var lineLasj = new Array();
    $.each(data.yc, function (m, item) {
        if (m == 0) { lineLayc.push([0, null]); }
        lineLayc.push([Number(item.time), Number(item.hd)]);
        //catego.push(item.time);
    });
    $.each(data.sj, function (m, item) {
        lineLasj.push([Number(item.time), Number(item.hd)]);
        //catego.push(item.time);
    });
    //if (lineLayc.length > 0) {
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
            opposite: false
        };
        var item2 = {            
        	name: '天气预报湿度',
            type: 'spline',
            color: '#89A54E',
            data: lineLayc,
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
        series.push(item2);
    //}
    //if (lineLasj.length > 0) {
        var item2 = {           
            name: '实际湿度',
            type: 'spline',
            color: '#3197e3',
            data: lineLasj,
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
        series.push(item2);
    //}
        chartInit1('spline', $("#div_hd"), "湿度", series,hdYAis, catego);
}
//辐照度曲线显示
function lineshowWTH(data) {
    var series = new Array();
    var catego = new Array();
    var lineLayc = new Array();
    var lineLasj = new Array();
    var yAxis = new Array();
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
            opposite: false
        };
        var item2 = {           

        	name: '天气预报辐照度',
            type: 'spline',
            color: '#89A54E',
            data: lineLayc,
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
        series.push(item2);
    //}
    //if (lineLasj.length > 0) {
        var item2 = {
            
            name: '实际辐照度',
            type: 'spline',
            color: '#3197e3',
            data: lineLasj,
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
        series.push(item2);
    //}
        chartInit1('spline', $("#div_wth"), "辐照度", series,fzdYAxis, catego);
}

//能源表格显示
function TableEng(data) {
    var cld = $('#li_cld'),
        pld = $('#li_pld');
    var drawStr = "", drawStrNull = "--";
    var data_temp = data;
    if (data.yc.length > 0)
    {
        data_temp = data.yc;
    }
    else if (data.xz.length > 0) {
        data_temp = data.xz;
    }
    else if (data.sj.length > 0) {
        data_temp = data.sj;
    }
    else data_temp = data.yc;
    if (cld.hasClass('on')) {
        $.each(data_temp, function (n, value) {
                drawStr += "<tr>";
                drawStr += "<td>" + value.day + "</td>";
                drawStr += "<td>" + value.time + "</td>";
                drawStr += "<td>" + (typeof (data.yc[n]) == "undefined" ? drawStrNull : data.yc[n].cld) + "</td>";
                drawStr += "<td>" + (typeof (data.xz[n]) == "undefined" ? drawStrNull : data.xz[n].cld) + "</td>";
                drawStr += "<td>" + (typeof (data.sj[n]) == "undefined" ? drawStrNull : data.sj[n].cld) + "</td>";
                drawStr += "</tr>";
            });
        }
    else {
        $.each(data_temp, function (n, value) {
                drawStr += "<tr>";
                drawStr += "<td>" + value.day + "</td>";
                drawStr += "<td>" + value.time + "</td>";
                drawStr += "<td>" + (typeof (data.yc[n]) == "undefined" ? drawStrNull : data.yc[n].pld) + "</td>";
                drawStr += "<td>" + (typeof (data.xz[n]) == "undefined" ? drawStrNull : data.xz[n].pld) + "</td>";
                drawStr += "<td>" + (typeof (data.sj[n]) == "undefined" ? drawStrNull : data.sj[n].pld) + "</td>";
                drawStr += "</tr>";
            });
        }
        $("#table_eng").empty().append(drawStr);
        $("#table_eng tr:odd").addClass("odd");
}

//日期改变能源查询动作
function DayChangeEng(date) {
    var type = $('.fhxzList').find(".on")[0].id.replace("li_", "");
    var arrayD1 = date.split("-");
    var date1 = new Date(arrayD1[0], arrayD1[1], arrayD1[2]);

    var now = new Date();
    var date2 = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());

    

    if (date1 < date2) {
        $("#fhxzSpan").removeClass().addClass("fhycUnenable");
    }
    else
    {
        $("#fhxzSpan").removeClass().addClass("fhycArrow");
    }
    
    LoadEng(date, type);
}
//导出天气
$("#but_export").click(function exportExcel() {
    var data = "";
    $("#tab_wht_head tr").each(function () {
        var tr = $(this);
        tr.find("td").each(function () {
            var td = $(this);
            var rowspan = td.attr("rowspan") ? td.attr("rowspan") : 1;
            var colspan = td.attr("colspan") ? td.attr("colspan") : 1;
            data = data + td.text() + "$$$$$" + rowspan + "$$$$$" + colspan + "*****";
        });
        data = data + "|||||";
    });
    $("#tab_wht_content tr").each(function () {
        var tr = $(this);
        tr.find("td").each(function () {
            var td = $(this);
            var rowspan = td.attr("rowspan") ? td.attr("rowspan") : 1;
            var colspan = td.attr("colspan") ? td.attr("colspan") : 1;
            data = data + td.text() + "$$$$$" + rowspan + "$$$$$" + colspan + "*****";
        });
        data = data + "|||||";
    });
    //var sHtml = htmlEncode($("#MyTable")[0].outerHTML);//做html编码
    $("input[name='htmlTableStr']").val(data);
    $("input[name='reportname']").val($("#hd_wth").val());
    //表单提交
    $("form[name='myForm']").submit();
});
//导出能源
$("#but_export1").click(function exportExcel() {
    var data = "";
    $("#tab_eng_head tr").each(function () {
        var tr = $(this);
        tr.find("td").each(function () {
            var td = $(this);
            var rowspan = td.attr("rowspan") ? td.attr("rowspan") : 1;
            var colspan = td.attr("colspan") ? td.attr("colspan") : 1;
            data = data + td.text() + "$$$$$" + rowspan + "$$$$$" + colspan + "*****";
        });
        data = data + "|||||";
    });
    $("#tab_eng_content tr").each(function () {
        var tr = $(this);
        tr.find("td").each(function () {
            var td = $(this);
            var rowspan = td.attr("rowspan") ? td.attr("rowspan") : 1;
            var colspan = td.attr("colspan") ? td.attr("colspan") : 1;
            data = data + td.text() + "$$$$$" + rowspan + "$$$$$" + colspan + "*****";
        });
        data = data + "|||||";
    });
    //var sHtml = htmlEncode($("#MyTable")[0].outerHTML);//做html编码
    $("input[name='htmlTableStr']").val(data);
    $("input[name='reportname']").val($("#hd_eng").val());
    //表单提交
    $("form[name='myForm']").submit();
});
//曲线图
function linechartInit(type, div, title, series, catego) {
    div.highcharts({
        chart: {
            type: type
        },
        title: {
            text: title
        },
        //subtitle: {
        //    text: 'Source: WorldClimate.com'
        //},
        xAxis: {
            tickInterval: 2
        },
        yAxis: {
            title: {
                text: ''
            },
            labels: {
                formatter: function () {
                    return this.value + 'KW'
                }
            }
        },
        tooltip: {
            crosshairs: true,
            shared: true
        },
        
        plotOptions: {
            spline: {
                marker: {
                    radius: 4,
                    lineColor: '#666666',
                    lineWidth: 1
                }
            }
        },
        series: series
    });
}

function chartInit1(type, div, title, series,yAxis, catego) {
    div.highcharts({
        chart: {
            type: type
        },
        title: {
            text: title
        },
        //subtitle: {
        //    text: 'Source: WorldClimate.com'
        //},
        xAxis: {
            tickInterval: 2
        },
        yAxis: yAxis,
        tooltip: {
            crosshairs: true,
            shared: true
        },
        plotOptions: {
            spline: {
                marker: {
                    radius: 4,
                    lineColor: '#666666',
                    lineWidth: 1
                }
            }
        },
        series: series
    });
}

///执行负荷修正
function Load_Correct() {
    if ($("#fhxzSpan").hasClass("fhycUnenable"))
    {
        return;
    }
    UEEPConfirm('确定执行负荷修正吗？', function (r) {
        if (r == true) {
            $.ajax(
              {
                  url: "/WCF/Load_Correct",
                  async: false,
                  type: "POST",
                  dataType: "json",
                  data: "",
                  success: function (data) {
                      if (data == 'OK') {
                          UEEPAlert('执行负荷修正成功！');
                      } else {
                          UEEPAlert('执行负荷修正失败，请检查优化服务是否开启!');
                      }
                  },
                  error: function (XMLHttpRequest, textStatus, errorThrown) {
                      alert(XMLHttpRequest.responseText);
                  }
              });
        }
    });
}
