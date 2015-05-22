
var d = new Date(), ddstr = '', mmstr = '', hhstr = '';
ddstr += d.getFullYear() + '-' + monthformt((d.getMonth() + 1)) + '-' + monthformt(d.getDate());
mmstr += d.getFullYear() + '-' + monthformt((d.getMonth() + 1));
hhstr += d.getFullYear() + '-' + monthformt((d.getMonth() + 1)) + '-' + monthformt(d.getDate()) + " " + monthformt(d.getHours()) + ":" + monthformt(d.getMinutes());
function monthformt(str) {
    var strretlut = str;
    if (str < 10) {
        strretlut = '0' + str;
    }
    return strretlut;
}
$(document).ready(function () {
    App.init();
    $("#sele_timetype").change();
    loadCode("设备能效");
    $("#sele_viewtype").change();
    $("#hid_rid").val('tab_3');
    $("input[name='radio_seledate']:first").change();
});
///////切换日期///////
$("input[name='radio_seledate']").change(function () {
    var selectval = $(this).val();
    switch (selectval) {
        case "hh":
            var Content = "<input style=\"width:100px;\" id=\"datepicker-start\" type=\"text\" onclick=\"WdatePicker({ name: 'blue', charset: 'gb2312', dateFmt: 'yyyy-MM-dd', maxDate: '#F{$dp.$D(\\'datepicker-end\\')||\\'2020-10-01\\'}' })\" />";
            Content += "<input style=\"width:100px;\" id=\"datepicker-start-hh\" type=\"text\" onclick=\"WdatePicker({ name: 'blue', charset: 'gb2312', dateFmt: 'HH:00', maxDate: '#F{$dp.$D(\\'datepicker-end-hh\\')||\\'2020-10-01\\'}' })\" />";
            $("#datepicker-con-start").html(Content);
            Content = "<input style=\"width:100px;\" id=\"datepicker-end\" type=\"text\" onclick=\"WdatePicker({ name: 'blue', charset: 'gb2312', dateFmt: 'yyyy-MM-dd', minDate: '#F{$dp.$D(\\'datepicker-start\\')}', maxDate: '2020-10-01'})\" />";
            Content += "<input style=\"width:100px;\" id=\"datepicker-end-hh\" type=\"text\" onclick=\"WdatePicker({ name: 'blue', charset: 'gb2312', dateFmt: 'HH:00', minDate: '#F{$dp.$D(\\'datepicker-start-hh\\')||\\'2020-10-01\\'}' })\" />";
            $("#datepicker-con-end").html(Content);
            break;
        case "dd":
            var Content = "<input style=\"width:100px;\" id=\"datepicker-start\" type=\"text\" onclick=\"WdatePicker({ name: 'blue', charset: 'gb2312', dateFmt: 'yyyy-MM-dd', maxDate: '#F{$dp.$D(\\'datepicker-end\\')||\\'2020-10-01\\'}' })\" />";
            $("#datepicker-con-start").html(Content);
            Content = "<input style=\"width:100px;\" id=\"datepicker-end\" type=\"text\" onclick=\"WdatePicker({ name: 'blue', charset: 'gb2312', dateFmt: 'yyyy-MM-dd', minDate: '#F{$dp.$D(\\'datepicker-start\\')}', maxDate: '2020-10-01'})\" />";
            $("#datepicker-con-end").html(Content);
            break;
        case "mm":
            var Content = "<input style=\"width:100px;\" id=\"datepicker-start\" type=\"text\" onclick=\"WdatePicker({ name: 'blue', charset: 'gb2312', dateFmt: 'yyyy-MM', maxDate: '#F{$dp.$D(\\'datepicker-end\\')||\\'2020-10-01\\'}' })\" />";
            $("#datepicker-con-start").html(Content);
            Content = "<input style=\"width:100px;\" id=\"datepicker-end\" type=\"text\" onclick=\"WdatePicker({ name: 'blue', charset: 'gb2312', dateFmt: 'yyyy-MM', minDate: '#F{$dp.$D(\\'datepicker-start\\')}', maxDate: '2020-10-01'})\" />";
            $("#datepicker-con-end").html(Content);
            break;
        default:
            break;
    }
});
$("#sele_viewtype").change(function () {
    var selectval = $(this).children("option:selected").val();
    switch (selectval) {
        case "1":
            $("#tab-data").show();
            $("#Chart_pie").hide();
            break;
        case "2":
            $("#tab-data").hide();
            $("#Chart_pie").show();
            break;
        default:
            break;
    }
});
////////切换tab//////////
$(function () {
    $('#myTab a:last').tab('show');//初始化显示哪个tab
    $('#myTab a').click(function (e) {
        e.preventDefault();//阻止a链接的跳转行为
        $(this).tab('show');//显示当前选中的链接及关联的content
        $("#sele_timetype").val("hh");
        $("#hid_rid").val($(this).attr("id"));
        loadCode($(this).html());
        tabChangeIniti($(this).html());
    })
})
//系统能效加载报表（开始时间、结束时间、测点、类编）
function LoadDataXTNX(starttime, endtime, timetype, selectControls) {
    var codes = "";
    var drawStr = "";
    var arrycode = "";
    drawStr += "<tr><td>时间</td>";
    $.each(selectControls, function (i, data) {//绘制表头\
        arrycode = $(this).val().split('|');
        codes += arrycode[0] + ",";
        drawStr += "<td><a onclick='showline(" + (i + 2) + ")'><i class=\"icon-bar-chart\">" + arrycode[1] + "</i></a></td>";
    });
    drawStr += "</tr>";
    $("#tb_heard").append(drawStr);
    codes = codes.substring(0, codes.length - 1);
    $.ajax({
        type: "POST",//这里是http类型
        url: "/analyze/Getdata",//大家都应该很清楚了
        async: false,
        data: { starttime: starttime, endtime: endtime, timetype: timetype, codes: codes },//回传一个参数
        dataType: "json",//传回来的数据类型
        success: function (responseJSON) {
            var lineCN = new Array();
            var obj = strToJson(responseJSON.data);
            if (obj == "") {
                return;
            }
            drawStr = "";
            $.each(obj, function (n, value) {
                drawStr += "<tr>";
                $.each(responseJSON.columns, function (m, columnname) {
                    var tt = eval("value." + columnname);
                    if (!isNaN(tt)) {
                        tt = Number(tt).toFixed(2);
                    }
                    else if (tt == "") {
                        tt = 0;
                    }
                    if (m == 0) {
                        drawStr += "<td><a onclick='showpie(\"tab-data\"," + (n + 1) + ",\"" + responseJSON.columns + "\")'><i class=\"icon-adjust\">" + tt + "</i></a></td>";
                    }
                    else { drawStr += "<td>" + tt + "</td>"; }

                });
                drawStr += "</tr>";
            });
            $("#tb_container").append(drawStr);
            var totstr = "";
            totstr += "<tr>";
            $.each(responseJSON.columns, function (m, columnname) {
                if (m == 0) {
                    totstr += "<td><a onclick='showpie(\"tab-data-total\",1,\"" + responseJSON.columns + "\")'><i class=\"icon-adjust\">合计</i></a></td>";
                }
                else { totstr += "<td>" + responseJSON.total[columnname] + "</td>"; }

            });
            totstr += "</tr>";
            $("#tab-data-total").append(totstr);//合计
            var totpage = (($("#tab-data tr").length - 1) / 10).toString();
            initDataPage(totpage.indexOf(".") == -1 ? Number(totpage) : Number(totpage) + 1);
            PageControl(1, 10);
            var obj = responseJSON.total;
            $.each($("#ul_6 input:checkbox"), function (n, value) {
                arrycode = $(this).val().split('|');
                lineCN.push([arrycode[1], obj[arrycode[0]]]);
            });
            propchartInit($("#Chart_pie_cn"), "供能", lineCN);

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            UEEPAlert(XMLHttpRequest.responseText);
        }
    });
}
//系统指标加载报表（开始时间、结束时间、测点、类编）
function LoadDataXTZB(starttime, endtime, timetype, selectControls) {
    var codes = "";
    var drawStr = "";
    var arrycode = "";
    drawStr += "<tr><td>时间</td>";
    $.each(selectControls, function (i, data) {//绘制表头\
        arrycode = $(this).val().split('|');
        codes += arrycode[0] + ",";
        drawStr += "<td><a onclick='showline(" + (i + 2) + ")'><i class=\"icon-bar-chart\">" + arrycode[1] + "</i></a></td>";
        //drawStr += "<td>" + arrycode[1] + "</td>";
    });
    drawStr += "</tr>";
    $("#tb_heard").append(drawStr);
    codes = codes.substring(0, codes.length - 1);
    $.ajax({
        type: "POST",//这里是http类型
        url: "/analyze/Getdata",//大家都应该很清楚了
        async: false,
        data: { starttime: starttime, endtime: endtime, timetype: timetype, codes: codes },//回传一个参数
        dataType: "json",//传回来的数据类型
        success: function (responseJSON) {
            var obj = strToJson(responseJSON.data);
            if (obj == "") {
                return;
            }
            drawStr = "";
            $.each(obj, function (n, value) {
                drawStr += "<tr>";
                $.each(responseJSON.columns, function (m, columnname) {
                    var tt = eval("value." + columnname);
                    if (!isNaN(tt)) {
                        tt = Number(tt).toFixed(2);
                    }
                    else if (tt == "") {
                        tt = 0;
                    }
                    drawStr += "<td>" + tt + "</td>";
                });
                drawStr += "</tr>";
            });
            $("#tb_container").append(drawStr);
            ///合计
            var totstr = "";
            totstr += "<tr>";
            $.each(responseJSON.columns, function (m, columnname) {
                if (m == 0) {
                    totstr += "<td>合计</td>";
                }
                else {
                    totstr += "<td>" + responseJSON.total[columnname] + "</td>";
                }
            });
            totstr += "</tr>";
            $("#tab-data-total").append(totstr);//合计
            //分页加载
            var totpage = (($("#tab-data tr").length - 1) / 10).toString();
            initDataPage(totpage.indexOf(".") == -1 ? Number(totpage) : Number(totpage) + 1);
            PageControl(1, 10);
            //曲线
            var title = "";
            var series = new Array();
            var catego = new Array();
            for (var j = 2; j < responseJSON.columns.length + 1; j++) {
                var lineLa = new Array();
                var rowcount = $("#tab-data tr").length;
                for (var i = 1; i < rowcount; i++) {
                    var pointx = $("#tab-data tr:eq(" + i + ") td:eq(0)").text();
                    var pointy = $("#tab-data tr:eq(" + i + ") td:eq(" + (j - 1) + ")").text();
                    //alert(pointx + "," + pointy)
                    lineLa.push([pointx, Number(pointy)]);
                    catego.push(pointx);
                }
                if (lineLa.length > 0) {
                    var item2 = {
                        name: $("#tab-data tr:eq(" + 0 + ") td:eq(" + (j - 1) + ")").text(),
                        data: lineLa,
                        marker: {
                            enabled: false
                        }
                    };
                    series.push(item2);
                }
            }
            linechartInit('spline', $("#Chart_pie"), title, series, catego);

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            UEEPAlert(XMLHttpRequest.responseText);
        }
    });
}
//设备能效
function LoadDataSBNX(starttime, endtime, timetype, selectControls) {
    var drawStr = "";
    $.ajax({
        type: "POST",//这里是http类型
        url: "/analyze/GetSBNXdata",//大家都应该很清楚了
        async: false,
        data: { starttime: starttime, endtime: endtime, timetype: timetype, codes: $("#hid_equcode").val() },//回传一个参数
        dataType: "json",//传回来的数据类型
        success: function (responseJSON) {
            //绘制表头\
            drawStr += "<tr>";
            $.each(responseJSON.propls, function (i, data) {
                drawStr += "<td><a onclick='showline(" + (i + 2) + ")'><i class=\"icon-bar-chart\">" + data.propname + "</i></a></td>";
            });
            drawStr += "</tr>";
            $("#tb_heard").append(drawStr);
            var obj = strToJson(responseJSON.data);
            if (obj == "") {
                return;
            }
            drawStr = "";
            $.each(obj, function (n, value) {
                drawStr += "<tr>";
                $.each(responseJSON.propls, function (m, columnname) {
                    var tt = eval("value." + columnname.normalcode);
                    if (!isNaN(tt)) {
                        tt = Number(tt).toFixed(2);
                    }
                    else if (tt == "") {
                        tt = 0;
                    }
                    drawStr += "<td>" + tt + "</td>";
                });
                drawStr += "</tr>";
            });
            $("#tb_container").append(drawStr);
            ///合计
            var totstr = "";
            totstr += "<tr>";
            $.each(responseJSON.propls, function (m, columnname) {
                if (m == 0) {
                    totstr += "<td>合计</td>";
                }
                else {
                    totstr += "<td>" + responseJSON.total[columnname.normalcode] + "</td>";
                }
            });
            totstr += "</tr>";
            $("#tab-data-total").append(totstr);//合计
            var totpage = (($("#tab-data tr").length - 1) / 10).toString();
            initDataPage(totpage.indexOf(".") == -1 ? Number(totpage) : Number(totpage) + 1);
            PageControl(1, 10);
            //曲线
            var title = "";
            var series = new Array();
            var catego = new Array();
            for (var j = 2; j < responseJSON.propls.length + 1; j++) {
                var lineLa = new Array();
                var rowcount = $("#tab-data tr").length;
                for (var i = 1; i < rowcount; i++) {
                    var pointx = $("#tab-data tr:eq(" + i + ") td:eq(0)").text();
                    var pointy = $("#tab-data tr:eq(" + i + ") td:eq(" + (j - 1) + ")").text();
                    //alert(pointx + "," + pointy)
                    lineLa.push([pointx, Number(pointy)]);
                    catego.push(pointx);
                }
                if (lineLa.length > 0) {
                    var item2 = {
                        name: $("#tab-data tr:eq(" + 0 + ") td:eq(" + (j - 1) + ")").text(),
                        data: lineLa,
                        marker: {
                            enabled: false
                        }
                    };
                    series.push(item2);
                }
            }
            linechartInit('spline', $("#Chart_pie"), title, series, catego);

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            UEEPAlert(XMLHttpRequest.responseText);
        }
    });
}
//加载测点选择列表
function loadCode(loadtype) {
    if (loadtype == "设备能效") {
        $.ajax({
            type: "POST",//这里是http类型
            url: "/analyze/GetClassMenu",//大家都应该很清楚了
            async: false,
            data: { modulecode: loadtype },//回传一个参数
            dataType: "json",//传回来的数据类型
            success: function (responseJSON) {
                $("#menuroot").empty();
                if (responseJSON.length > 0) {
                    $.each(responseJSON, function (i, data) {
                        switch (data.level) {
                            case 1:
                                _oneLevelHtml(data);
                                break;
                            default:
                                _otherEquLevelHtml(data);
                                break;
                        }
                    });
                }
                //checkbox事件绑定
                $(':checkbox[name=checkboxcode]').each(function (i, data) {
                    $(this).click(function () {
                        $("#hid_equcode").val($(this).val().split('|')[0]);
                        var obj = $(":checkbox[name=checkboxcode]");
                        $(':checkbox[name=checkboxcode]').each(function (i, dd) {
                            if (dd != data) dd.checked = false;
                            else dd.checked = true;
                        });
                    });
                });
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                UEEPAlert(XMLHttpRequest.responseText);
            }
        });
    }
    else {
        $.ajax({
            type: "POST",//这里是http类型
            url: "/analyze/GetCodeMenu",//大家都应该很清楚了
            async: false,
            data: { modulecode: loadtype },//回传一个参数
            dataType: "json",//传回来的数据类型
            success: function (responseJSON) {
                $("#menuroot").empty();
                if (responseJSON.length > 0) {
                    $.each(responseJSON, function (i, data) {
                        switch (data.level) {
                            case 1:
                                _oneLevelHtml(data);
                                break;
                            default:
                                _otherLevelHtml(data);
                                break;
                        }
                    });
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                UEEPAlert(XMLHttpRequest.responseText);
            }
        });
    }

}
//_test();
//* 一级代码 */
function _oneLevelHtml(dr) {
    var sonico = "", check = "";
    if (dr.canchoose == 1) { check = "<input name=\"checkboxcode\" checked=\"checked\" type=\"checkbox\" value=\"" + dr.code + "|" + dr.name + "|" + dr.is_pct + "\"> " }
    else if (dr.canchoose == 0) { check = "<input name=\"checkboxcode\" checked=\"checked\" type=\"checkbox\" style=\"display:none\" value=\"" + dr.code + "|" + dr.name + "|" + dr.is_pct + "\"> " }
    var ul = $("#menuroot");
    var sonico = "";
    if (dr.sons > 0) {
        sonico = "class=\"tree-toggle\" data-toggle=\"branch\" data-value=\"Bootstrap_Tree\"";
        check = ""
    }
    var el = "<li>" +
             "<a " + sonico + " id=\"nut_" + dr.id + "\" href=\"#\">" + check + dr.name +
              "</a>" +
              "<ul class=\"branch in\" id=\"ul_" + dr.id + "\">" +
              "</ul></li>"
    ul.append(el);
}
/* 多级代码 */
function _otherLevelHtml(dr) {
    var ul = $("#ul_" + dr.pid);
    if (ul.length == 0) {
        alert("未找到ul_" + dr.pid);
    }
    var sonico = "";
    var sontitle = dr.name.replace('一 ', '');
    var sonfood = "", check = "";
    if (dr.canchoose == 1) { check = "<input name=\"checkboxcode\" checked=\"checked\" type=\"checkbox\" value=\"" + dr.code + "|" + dr.name + "|" + dr.is_pct + "\"> " }
    else if (dr.canchoose == 0) { check = "<input name=\"checkboxcode\" type=\"checkbox\" style=\"display:none\" checked=\"checked\" value=\"" + dr.code + "|" + dr.name + "|" + dr.is_pct + "\"> " }
    if (dr.sons > 0) {
        sonfood = "<ul class=\"branch in\" id=\"ul_" + dr.id + "\"></ul>";
        sonico = "class=\"tree-toggle\" data-toggle=\"branch\" data-value=\"Bootstrap_Tree\"";
    }
    var el = "<li>" +
             "<a " + sonico + " href=\"#\" data-role=\"leaf\">" +
                check + sontitle +
             "</a>" + sonfood +
             "</li>"
    ul.append(el);
}
/* 多级代码设备 */
function _otherEquLevelHtml(dr) {
    var ul = $("#ul_" + dr.pid);
    if (ul.length == 0) {
        alert("未找到ul_" + dr.pid);
    }
    var sonico = "";
    var sontitle = dr.name.replace('一 ', '');
    var sonfood = "", check = "";
    if (dr.canchoose == 1) { check = "<input name=\"checkboxcode\" type=\"checkbox\" value=\"" + dr.code + "|" + dr.name + "|" + dr.is_pct + "\"> " }
    else if (dr.canchoose == 0) { check = "<input name=\"checkboxcode\" type=\"checkbox\" style=\"display:none\" value=\"" + dr.code + "|" + dr.name + "|" + dr.is_pct + "\"> " }
    if (dr.sons > 0) {
        sonfood = "<ul class=\"branch in\" id=\"ul_" + dr.id + "\"></ul>";
        sonico = "class=\"tree-toggle\" data-toggle=\"branch\" data-value=\"Bootstrap_Tree\"";
    }
    var el = "<li>" +
             "<a " + sonico + " href=\"#\" data-role=\"leaf\">" +
                check + sontitle +
             "</a>" + sonfood +
             "</li>"
    ul.append(el);
}
function strToJson(str) {
    var json = eval('(' + str + ')');
    return json;
}
//////////查询///////////////////
$("#but_select").click(function () {
    $("#tb_heard").empty();
    $("#tb_container").empty();//清空
    $("#tab-data-total").empty();
    var starttime = "";
    $.each($("#datepicker-con-start input"), function (n, value) {
        starttime += $(this).val() + " ";
        if ($(this).val() == "") {
            starttime = ""
            return;
        }
    });
    var endtime = "";
    $.each($("#datepicker-con-end input"), function (n, value) {
        endtime += $(this).val() + " ";
        if ($(this).val() == "") {
            endtime = ""
            return;
        }
    });

    if (starttime.trim().length == 0) {
        alert("请选择开始时间！");
        return ;
    }
    if (endtime.trim().length == 0) {
        alert("请选择结束时间！");
        return ;
    }

    var timetype = $("input:radio[name='radio_seledate']:checked").val();
    if (timetype == "mm") {
        starttime = starttime.trim() + "-01";

        endtime = endtime.trim() + "-" + m_DaysInMonth(endtime.trim().split('-')[0], endtime.trim().split('-')[1]);
    }
    var selectControls = $("input:checkbox[name='checkboxcode']:checked")
    switch ($("#hid_rid").val()) {
        case "tab_1":
            LoadDataXTNX(starttime.trim(), endtime.trim(), timetype, selectControls);//系统
            break;
        case "tab_2":
            if (selectControls.length == 0) { alert('请选择指标!'); return ; }
            LoadDataXTZB(starttime.trim(), endtime.trim(), timetype, selectControls);//指标
            break;
        case "tab_3":
            if (selectControls.length == 0) { alert('请选择设备!'); return ; }
            LoadDataSBNX(starttime.trim(), endtime.trim(), timetype, selectControls);//设备
            break;
        default:
    }
});
//点击弹出曲线
function showline(tdnum) {
    $("#Chart_pie").empty();
    var title = "";
    var lineLa = new Array();
    var catego = new Array();
    var series = new Array();
    var rowcount = $("#tab-data tr").length;
    for (var i = 1; i < rowcount; i++) {
        var pointx = $("#tab-data tr:eq(" + i + ") td:eq(0)").text();
        var pointy = $("#tab-data tr:eq(" + i + ") td:eq(" + (tdnum - 1) + ")").text();
        //alert(pointx + "," + pointy)
        lineLa.push([pointx, Number(pointy)]);
        catego.push(pointx);
    }
    if (lineLa.length > 0) {
        var item2 = {
            name: $("#tab-data tr:eq(" + 0 + ") td:eq(" + (tdnum - 1) + ")").text(),
            data: lineLa,
            marker: {
                enabled: false
            }
        };
        series.push(item2);
    }
    linechartInit('spline', $("#Chart_spline"), title, series, catego)
    $("#div_show_spline").modal('show');
}
//点击弹出饼图
function showpie(tabname, trnum, columns) {
    var dicdata = new Array();
    var lineCN = new Array();
    var lineHN = new Array();
    var columnsArray = columns.split(',');
    for (var i = 1; i < columnsArray.length; i++) {
        var dickey = columnsArray[i];
        var dicvalue = $("#" + tabname + " tr:eq(" + trnum + ") td:eq(" + i + ")").text();
        dicdata[dickey] = Number(dicvalue);
    }
    $.each($("#ul_6 input:checkbox"), function (n, value) {
        arrycode = $(this).val().split('|');
        lineCN.push([arrycode[1], dicdata[arrycode[0]]]);
    });
    propchartInit($("#Chart_spline"), "供能", lineCN);
    $("#div_show_pie").modal('show');
}
//实例化column
var Chart_pie_hn;
//设置chart属性饼图
function propchartInit(div, title, series) {
    div.highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        title: {
            text: title
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    color: '#000000',
                    connectorColor: '#000000',
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                }
            }
        },
        series: [{
            type: 'pie',
            name: title,
            data: series
        }]
    });
}
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
            categories: catego
        },
        yAxis: {
            title: {
                text: ''
            },
            labels: {
                formatter: function () {
                    return this.value + '°'
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
//切换初始化
function tabChangeIniti(type) {
    $("#sele_timetype").find("option[text='小时']").prop("selected", true);
    $("#sele_viewtype").find("option[text='图表']").prop("selected", true);
    $("#sele_timetype").change();
    $("#sele_viewtype").change();
    $("#tb_heard").empty();
    $("#tb_container").empty();
    $("#tab-data-total").empty();
    $('#example').empty();
    $("#Chart_pie").empty();
    if (type == '系统能效') {
        var str = '<div id="Chart_pie_hn" style="float:left"></div><div id="Chart_pie_cn" style="float: left; "></div>';
        $("#Chart_pie").append(str);
    }
}
///分页
function initDataPage(totalPage) {
    var options = {
        currentPage: 1,
        numberOfPages: 5,
        totalPages: totalPage,
        size: 'normal',
        alignment: 'center',
        onPageClicked: function (e, originalEvent, type, page) {
            PageControl(page, 10);
        }
    };
    $('#example').bootstrapPaginator(options);
}
///分页控制
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
}
//判断月天数
function m_DaysInMonth(pYear, pMonth) {
    var nDays = 30;
    if (pMonth == 02) { //2月单独处理
        if (mIsLeap(pYear)) nDays = 29;
        else nDays = 28;
    }
    else if (mInList(pMonth, "01,03,05,07,08,10,12")) {
        nDays = 31;
    }
    return nDays;
}
//判断某年是否是闰年
function mIsLeap(pYear) {
    if (pYear % 400 == 0) {
        return true;
    }
    else if ((pYear % 100 != 0) && (pYear % 4 == 0)) {
        return true;
    }
    return false;
}
//判断是否在字符串列表里：
function mInList(s1, slist) {
    var ss1 = "," + s1 + ",";
    var ss2 = "," + slist + ",";
    ss1 = ss1.toLowerCase();
    ss2 = ss2.toLowerCase();
    return ss2.indexOf(ss1) != -1;
}