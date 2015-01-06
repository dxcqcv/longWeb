//全局变量，global_flag标示当前为日、月、年报，global_stime为开始时间，global_etime为结束时间
var global_flag = "0";
var global_stime = "";
var global_etime = "";

var d = new Date(), ddstr = '', mmstr = '', hhstr = '';
ddstr += d.getFullYear() + '-' + monthformt((d.getMonth() + 1)) + '-' + monthformt(d.getDate());
mmstr += d.getFullYear() + '-' + monthformt((d.getMonth() + 1));
function monthformt(str) {
    var strretlut = str;
    if (str < 10) {
        strretlut = '0' + str;
    }
    return strretlut;
}

//初始加载函数
$(document).ready(function () {
    Setsbmc();
   // ReportType(0);
    $("#infoDiv").show();
    $("#chart_container").hide();

    $("#startDate").val(ddstr);
    $("#endDate").val(ddstr);
    ClickData();
});

//设备名称下拉条
function Setsbmc() {
    $.ajax({
        type: "POST",//这里是http类型
        url: "/EquFault/EquList",//大家都应该很清楚了
        async: false,
        dataType: "json",//传回来的数据类型
        success: function (data) {
            $sb = $("#selectSb");
            var str = "";
            var flag = true;
            if (data != null && data.length > 0) {
                $.each(data, function (n, value) {
                    str += "<li val=\"" + value.Value + "\"><a href=\"\">" + value.Text + "</a></li>";
                    if (flag) {
                        $("#mydrop").text(value.Text);
                        $("#hid_sbmc").val(value.Value);
                        flag = false;
                    }
                });
            }
            $sb.find("ul").empty().append(str);
            $sb.simSelect({
                callback: function (x, v) {
                    if (!x) return;
                    $("#hid_sbmc").val(v);
                }
            });
        },
        error: function (XMLHttpRequest) {
            UEEPAlert(XMLHttpRequest.responseText);
        }
    });
}  

//获取列表数据
function QueryEquFaultList(pageindex, numberOfPages) {
    global_stime = $("#startDate").val();
    global_etime = $("#endDate").val();
    $.ajax({
        type: "POST",//这里是http类型
        url: "/Report/EquEnergyReportList",//大家都应该很清楚了
        async: false,
        data: "currentPage=" + pageindex + "&numberOfPages=" + numberOfPages + "&flag=" + global_flag + "&startDate=" + $("#startDate").val() + "&endDate=" + $("#endDate").val() + "&dropValue=" + $("#mydrop").text(),
        dataType: "json",//传回来的数据类型
        success: function (responseJSON) {
            $("#tb_container").empty();
            $.each(responseJSON.rows, function (n, value) {
                var str = "<tr ";
                if ((n % 2) == 0) {
                    str += " class=\"even\">";
                } else {
                    str += " class=\"odd\">";
                }
                str += "<td class=\"tdW50\">" + (parseInt(n) + 1) +
                    "</td><td class=\"w100\">" + initstring(value.Time) +
                    "</td><td>" + initstring(value.Equ) +
                    "</td>" +
                    "<td><span>" + value.EnergyElec +
                    "</span></td>" +
                    "<td><span>" + value.EnergyGas +
                    "</span></td>" +
                    "<td><span>" + value.EnergyWater +
                    "</span></td>" +
                    "<td><span>" + value.ProvElec +
                    "</span></td>" +
                    "<td><span>" + value.ProvCool +
                    "</span></td>" +
                    "<td><span>" + value.ProvHot +
                    "</span></td>" +
                    "</tr>";
                $("#tb_container").append(str);
            });
            //分页加载
            initDataPage(($("#tab-data tr").length - 1));
            PageControl(1, 10);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            UEEPAlert(XMLHttpRequest.responseText);
        }
    });
}

//分页
function initDataPage(totalPage) {
    if (totalPage <= 10) {
        $("#Pagination").hide();
        return false;
    } else {
        $("#Pagination").show();
    }
    //分页，PageCount是总条目数，这是必选参数，其它参数都是可选
    $("#Pagination").pagination(totalPage, {
        callback: PageCallback,
        prev_text: '<上一页',       //上一页按钮里text
        next_text: '下一页>',       //下一页按钮里text
        items_per_page: 10,  //显示条数
        num_display_entries: 3,    //连续分页主体部分分页条目数
        current_page: 0,   //当前页索引
        num_edge_entries: 1        //两侧首尾分页条目数
    });

    //翻页调用
    function PageCallback(index, jq) {
        PageControl(index + 1, 10);
    }
}

//分页控制
function PageControl(page, pagecount) {
    var rowcount = $("#tab-data tr").length + 1;
    var startrow = (pagecount * (page - 1)) + 1;
    var endrow = startrow + pagecount;
    if (endrow > rowcount) {
        endrow = rowcount;
    }
    for (var i = 1; i < rowcount; i++) {
        if (i >= startrow && i < endrow) {
            $("#tab-data tr:eq(" + i + ")").show();
        }
        else {
            $("#tab-data tr:eq(" + i + ")").hide();
        }
    }
   // $("#tab-data tr:last").show();
}

//切换报表类型
function ReportType(type) {
    if (type == 0) {
        $("#startDate").val("");
        $("#endDate").val("");
        $("#startDate").removeAttr("onfocus");
        $("#startDate").attr("onfocus", "WdatePicker({dateFmt:'yyyy-MM-dd', maxDate: '#F{$dp.$D(\\'endDate\\')||\\'%y-%M-%d\\'}' })");
        $("#endDate").removeAttr("onfocus");
        $("#endDate").attr("onfocus", "WdatePicker({dateFmt:'yyyy-MM-dd', minDate: '#F{$dp.$D(\\'startDate\\')}', maxDate: '%y-%M-%d' })");
        global_flag = "0";
    }
    else if (type == 1) {
        $("#startDate").val("");
        $("#endDate").val("");
        $("#startDate").removeAttr("onfocus");
        $("#startDate").attr("onfocus", "WdatePicker({dateFmt:'yyyy-MM', maxDate: '#F{$dp.$D(\\'endDate\\')||\\'%y-%M\\'}' })");
        $("#endDate").removeAttr("onfocus");
        $("#endDate").attr("onfocus", "WdatePicker({dateFmt:'yyyy-MM', minDate: '#F{$dp.$D(\\'startDate\\')}', maxDate: '%y-%M' })");
        global_flag = "1";
    }
    else if (type == 2) {
        $("#startDate").val("");
        $("#endDate").val("");
        $("#startDate").removeAttr("onfocus");
        $("#startDate").attr("onfocus", "WdatePicker({dateFmt:'yyyy', maxDate: '#F{$dp.$D(\\'endDate\\')||\\'%y\\'}'})");
        $("#endDate").removeAttr("onfocus");
        $("#endDate").attr("onfocus", "WdatePicker({dateFmt:'yyyy',  minDate:'#F{$dp.$D(\\'startDate\\')}', maxDate: '%y' })");
        global_flag = "2";
    }
}

//点击查询
function ClickData() {
    if ($("#mydrop").text().length > 0 && $("#startDate").val().length > 0 && $("#endDate").val().length > 0) {
        QueryEquFaultList(1, 20);
        $("input[name='mycheckbox']").each(function () {
            $(this).prop({ checked: false });
        });
        $("#chkOne").click();
        $("#chkOne").attr("checked", "checked");
        UpdateChart();
    } else {
    	UEEPAlert("开始、结束时间不能为空，设备选择不能为空！");
    }
}

//空属性转值，防止出现null
function initstring(parameters) {
    if (parameters != null && parameters.length > 0) {
        return parameters;
    } else {
        return " ";
    }
}

//实例化chart
var chart_container;
var dateFormat = "";
$("input[name='mycheckbox']").click(function () {
    UpdateChart();
});

function UpdateChart() {
    switch (global_flag) {
        case "0":
            dateFormat = '%d %H:%M';
            break;
        case "1":
            dateFormat = '%m-%d';
            break;
        case "2":
            dateFormat = '%Y-%m';
            break;
        default:
            dateFormat = '%d %H:%M';
            break;
    }
    var series = new Array();
    var catego = new Array();
    var stime = "";
    var etime = "";
    $("input[name='mycheckbox']").each(function () {
        if (true == $(this).is(':checked')) {
            $.ajax({
                type: "POST",
                url: "/Report/GetChartData",
                async: false,
                data: "lstStr=" + $(this).attr('value') + "&global_flag=" + global_flag + "&global_stime=" + global_stime + "&global_etime=" + global_etime + "&dropValue=" + $("#mydrop").text(),
                dataType: "json",
                success: function (responseJson) {
                    if (responseJson.length > 0) {
                        var line = new Array();
                        stime = responseJson[0].XValue;
                        etime = responseJson[responseJson.length - 1].XValue;
                        $.each(responseJson, function (n, data) {
                            line.push([data.XValue, data.YValue]);
                            catego.push(data.XValue);
                        });
                        if (line.length > 0) {
                            var item = {
                                name: responseJson[0].ProName,
                                data: line,
                                marker: {
                                    enabled: false
                                }
                            };
                            series.push(item);
                        }
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    UEEPAlert(XMLHttpRequest.responseText);
                }
            });
        }
    });
    propchartInit(stime + "至" + etime, series, catego);
}
//设置chart属性
function propchartInit(title, series, catego) {
    Highcharts.setOptions({
        global: {
            useUTC: false
        }
    });
    var options = {
        //colors: ["#00CCFF"],
        global: {
            useUTC: false
        },
        chart: {
            renderTo: 'chart_container',
            type: 'line',
            animation: Highcharts.svg, // don't animate in old IE
            marginLeft: 65,
            marginRight: 25,
            marginTop: 30
        },
        title: {
            text: title,
            y: 5,//主标题位置
            style: {
                fontSize: '15px'
            }
        },
        xAxis: {
            categories: catego
        },
        yAxis: {
            title: {
                text: '',
                style: {
                    fontSize: '13px'
                }
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        //tooltip: {
        //    formatter: function () {
        //        return '<b>' + this.series.name + '</b><br/>' +
        //            Highcharts.dateFormat(dateFormat, this.x) + '<br/>' +
        //            Highcharts.numberFormat(this.y, 2);
        //    },
        //    crosshairs: true
        //},
        tooltip: {
            crosshairs: true,
            shared: true
        },
        legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'button',
            borderWidth: 0
        },
        exporting: {
            enabled: false
        },
        series: series
    };
    if (chart_container != null) {
        chart_container = new Highcharts.Chart(options);
    }
    
    options.chart.type = chartType;
    chart_container = new Highcharts.Chart(options);
}

var chartType = "column";
//切换显示样式
function SwitchShow(showType) {
    //表格显示
    if (showType == "1") {
        $("#infoDiv").show();
        $("#chart_container").hide();
    }
    //直方图显示
    else if (showType == "2") {
        chartType = "column";
        $("#infoDiv").hide();
        $("#chart_container").show();
        UpdateChart();
    }
    //曲线图显示
    else if (showType == "3") {
        chartType = "spline";
        $("#infoDiv").hide();
        $("#chart_container").show();
        UpdateChart();
    }
}

//转化成据类型-距1970年1月1日到现在的秒值，以便chart转换------此方法在定位的时候会产生问题，已弃用
function dateInit(rectime) {
    var a = [];
    var b = [];
    var c = [];
    a = rectime.split(" ");
    b = a[0].split("-");
    c = a[1].split(":");
    var myDate = new Date(b[0], b[1] - 1, b[2] * 1, c[0] * 1, c[1] * 1, c[2] * 1);
    return myDate.getTime();
}

//导出
function exportExcel() {
    var data = "";
    $("#tab-data tr").each(function () {
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
    //表单提交
    $("form[name='myForm']").submit();
}
function htmlEncode(value) {
    //create a in-memory div, set it's inner text(which jQuery automatically encodes)
    //then grab the encoded contents back out.  The div never exists on the page.
    return $('<div/>').text(value).html();
}

//打印
function printclick() {
    $("#infoDiv").printArea();
}