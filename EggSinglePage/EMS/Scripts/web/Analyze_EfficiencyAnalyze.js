
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
    $("#div_content").hide();
    loadCodeXTNX();
    loadCodeXTZB();
    loadCodeSBNX();
    MyTab();
    $("#hid_rid").val('tab_1');
    $("input[name='radio_seledate']:first").change();
    selectToggle();
});
// 调用弹窗插件
function popFancybox() {
    var elem = $('.fancybox');
    if (!elem.length) return;
    elem.fancybox({
        padding: 0
    });
}
function MyTab() {
    var tabs = $('.tab');
    if (!tabs.length) return;
    tabs.find('.tab-nav a').click(function (e) {
        e.preventDefault();
    });
    tabs.each(function () {
        var navs = $(this).find('.tab-nav li:not(.no)'),
			panels = $(this).find('.tab-panel');
        navs.click(function () {
            var index = $(this).index();
            navs.removeClass('on active').eq(index).addClass('on');
            panels.hide().eq(index).show();
            $("#hid_rid").val($(this).attr("id"));
        })
    })
}
//全选全消
function selectToggle() {
    var selects = $('.select-item');
    if (!selects.length) return;
    selects.each(function () {
        var selectAll = $(this).children(".item-tit").find('.selectAll'),
            selectReverse = $(this).find('.selectReverse'),
            inputs = $(this).children(".item-txt").find('input'),
        inputToggle = $(this).children(".item-tit").find('.selectToggle')
        selectAll.click(function (e) {
            inputs.add(selectAll).prop('checked', true);
            _callback();
        });
        selectReverse.click(function () {
            inputs.each(function () {
                var input = $(this)[0];
                input.checked = !input.checked
            });
            _callback();
        });
        inputs.click(function () {
            _callback();
        });
        inputToggle.click(function () {
            var len = inputs.filter(':checked').length,
                size = inputs.length;
            if (size == len) {
                inputs.prop('checked', false);
            } else {
                inputs.prop('checked', true);
            };
            _callback();
        });


        function _callback() {
            var len = inputs.filter(':checked').length,
                size = inputs.length;
            if (size == 0) {
                return false;
            };
            if (len == size) {
                inputToggle.prop('checked', true);
            }
            else {
                inputToggle.prop('checked', false);

            }
        }
    })
}
///////切换日期///////
$("input[name='radio_seledate']").change(function () {
    var selectval = $(this).val();
    switch (selectval) {
        case "hh":
            var Content = "<input class=\"Wdate w150\" readonly=\"readonly\" id=\"datepicker-start\" type=\"text\" onclick=\"WdatePicker({ onpicked: function () { $(this).blur(); }, name: 'blue', charset: 'gb2312', dateFmt: 'yyyy-MM-dd HH:00:00', maxDate: '#F{$dp.$D(\\'datepicker-end\\')||\\'%y-%M-%d\\'}' })\" />";
            Content += "<span class=\"ml5 mr5\">到</span>";
            Content += "<input class=\"Wdate w150\" readonly=\"readonly\"  id=\"datepicker-end\" type=\"text\" onclick=\"WdatePicker({ onpicked: function () { $(this).blur(); }, name: 'blue', charset: 'gb2312', dateFmt: 'yyyy-MM-dd HH:00:00', minDate: '#F{$dp.$D(\\'datepicker-start\\')}', maxDate: '%y-%M-%d'})\" />";
            $("#datepicker-con").html(Content);
            break;
        case "dd":
            var Content = "<input class=\"Wdate w100\" readonly=\"readonly\"  id=\"datepicker-start\" type=\"text\" onclick=\"WdatePicker({ onpicked: function () { $(this).blur(); }, name: 'blue', charset: 'gb2312', dateFmt: 'yyyy-MM-dd', maxDate: '#F{$dp.$D(\\'datepicker-end\\')||\\'%y-%M-%d \\'}' })\" />";
            Content += "<span class=\"ml5 mr5\">到</span>";
            Content += "<input class=\"Wdate w100\" readonly=\"readonly\"  id=\"datepicker-end\" type=\"text\" onclick=\"WdatePicker({ onpicked: function () { $(this).blur(); }, name: 'blue', charset: 'gb2312', dateFmt: 'yyyy-MM-dd', minDate: '#F{$dp.$D(\\'datepicker-start\\')}', maxDate: '%y-%M-%d '})\" />";
            $("#datepicker-con").html(Content);
            break;
        case "mm":
            var Content = "<input class=\"Wdate w80\" readonly=\"readonly\"  id=\"datepicker-start\" type=\"text\" onclick=\"WdatePicker({ onpicked: function () { $(this).blur(); }, name: 'blue', charset: 'gb2312', dateFmt: 'yyyy-MM', maxDate: '#F{$dp.$D(\\'datepicker-end\\')||\\'%y-%M\\'}' })\" />";
            Content += "<span class=\"ml5 mr5\">到</span>";
            Content += "<input class=\"Wdate w80\" readonly=\"readonly\"  id=\"datepicker-end\" type=\"text\" onclick=\"WdatePicker({ onpicked: function () { $(this).blur(); }, name: 'blue', charset: 'gb2312', dateFmt: 'yyyy-MM', minDate: '#F{$dp.$D(\\'datepicker-start\\')}', maxDate: '%y-%M'})\" />";
            $("#datepicker-con").html(Content);
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
//系统能效加载报表（开始时间、结束时间、测点、类编）
function LoadDataXTNX(starttime, endtime, timetype, selectControls) {
    var codes = "";
    var drawStr = "";
    var arrycode = "";
    drawStr += "<tr><td>时间</td>";
    $.each(selectControls, function (i, data) {//绘制表头\
        arrycode = $(this).val().split('|');
        codes += arrycode[0] + ",";
        drawStr += "<td><a class=\" fancybox\" href=\"#div_show_spline\" onclick='showline(" + (i + 2) + ")'>" + arrycode[1] + "<i class=\"ico ico-hd\"></i><i class=\"unit\">" + ConvertUnit(arrycode[1]) + "</i></a></td>";
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
                $("#tb_heard .fancybox").removeClass();
                return;
            }
            drawStr = "";
            $.each(obj, function (n, value) {
                drawStr += "<tr class=\"even\">";
                $.each(responseJSON.columns, function (m, columnname) {
                    var tt = eval("value." + columnname);
                    if (!isNaN(tt)) {
                        tt = Number(tt).toFixed(2);
                    }
                    else if (tt == "") {
                        tt = 0;
                    }
                    if (m == 0) {
                        drawStr += "<td><a onclick='showpie(\"tab-data\"," + (n + 1) + ",\"" + responseJSON.columns + "\")'><i class=\"ico-time fancybox\" href=\"#div_show_pie\"></i></a>" + tt + "</td>";
                    }
                    else { drawStr += "<td>" + tt + "</td>"; }

                });
                drawStr += "</tr>";
            });
            $("#tb_container").empty().append(drawStr);
            var totstr = "";
            totstr += "<tr>";
            $.each(responseJSON.columns, function (m, columnname) {
                if (m == 0) {
                    totstr += "<td class=\"f-songti\"><a onclick='showpie(\"tab-data-total\",1,\"" + responseJSON.columns + "\")'>合计<i class=\"ico-time fancybox ml5\" href=\"#div_show_pie\"></i></a></td>";
                }
                else { totstr += "<td>" + responseJSON.total[columnname] + "</td>"; }

            });
            totstr += "</tr>";
            $("#tab-data-total").append(totstr);//合计
            initDataPage(($("#tab-data tr").length - 1));
            PageControl(1, 10);
            var obj = responseJSON.total;
            $.each($("#div_code_hl input:checkbox"), function (n, value) {
                arrycode = $(this).val().split('|');
                lineCN.push([arrycode[1], obj[arrycode[0].toLowerCase()]]);
            });
            propchartInit($("#Chart_pie"), "供能", lineCN);
            popFancybox();
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
        drawStr += "<td><a class=\" fancybox\" href=\"#div_show_spline\" onclick='showline(" + (i + 2) + ")'>" + arrycode[1] + "<i class=\"ico ico-hd\" ></i><i class=\"unit\">" + ConvertUnit(arrycode[1]) + "</i></td>";
    });
    drawStr += "</tr>";
    $("#tb_heard").append(drawStr);
    codes = codes.substring(0, codes.length - 1);
    $.ajax({
        type: "POST",//这里是http类型
        url: "/analyze/Getdata",//大家都应该很清楚了
        async: false,
        data: { starttime: starttime, endtime: endtime, timetype: timetype, codes: codes, temp: Math.random() },//回传一个参数
        dataType: "json",//传回来的数据类型
        success: function (responseJSON) {
            var obj = strToJson(responseJSON.data);
            if (obj == "") {
                $("#tb_heard .fancybox").removeClass();
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
                        drawStr += "<td><a onclick='showpie(\"tab-data\"," + (n + 1) + ",\"" + responseJSON.columns + "\")'><i class=\"ico-time fancybox\" href=\"#div_show_pie\"></i></a>" + tt + "</td>";
                    }
                    else { drawStr += "<td>" + tt + "</td>"; }
                });
                drawStr += "</tr>";
            });
            $("#tb_container").empty().append(drawStr);
            ///合计
            var totstr = "";
            totstr += "<tr>";
            $.each(responseJSON.columns, function (m, columnname) {
                if (m == 0) {
                    totstr += "<td class=\"f-songti\">合计</td>";
                }
                else {
                    totstr += "<td>" + responseJSON.total[columnname] + "</td>";
                }
            });
            totstr += "</tr>";
            $("#tab-data-total").append(totstr);//合计
            //分页加载
            initDataPage(($("#tab-data tr").length - 1));
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
            popFancybox();
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
        data: { starttime: starttime, endtime: endtime, timetype: timetype, equcode: selectControls[0].value.split('|')[0], module: 'fx', temp: Math.random() },//回传一个参数
        dataType: "json",//传回来的数据类型
        success: function (responseJSON) {
            //绘制表头\
            drawStr += "<tr>";
            $.each(responseJSON.propls, function (i, data) {
                if (i == 0) {
                    drawStr += "<td><a class=\" fancybox\" onclick='showline(" + (i + 2) + ")'>" + data.propname + "</a></td>";
                }
                else {
                    drawStr += "<td><a href=\"#div_show_spline\"  class=\" fancybox\" onclick='showline(" + (i + 2) + ")'>" + data.propname + "<i class=\"ico ico-hd\" ></i></a></td>";
                }
            });
            drawStr += "</tr>";
            $("#tb_heard").append(drawStr);
            var obj = strToJson(responseJSON.data);
            if (obj == "") {
                $("#tb_heard .fancybox").removeClass();
                return;
            }
            drawStr = "";
            $.each(obj, function (n, value) {
                drawStr += "<tr>";
                $.each(responseJSON.propls, function (m, columnname) {
                    var tt = eval("value." + columnname.normalcode.toLowerCase());
                    if (!isNaN(tt)) {
                        tt = Number(tt).toFixed(2);
                    }
                    else if (tt == "") {
                        tt = 0;
                    }
                    //if (m == 0) {
                    //    drawStr += "<td><a onclick='showpie(\"tab-data\"," + (n + 1) + ",\"" + responseJSON.columns + "\")'><i class=\"ico-time fancybox\" href=\"#div_show_pie\"></i></a>" + tt + "</td>";
                    //}
                    drawStr += "<td>" + tt + "</td>";
                });
                drawStr += "</tr>";
            });
            $("#tb_container").empty().append(drawStr);
            ///合计
            var totstr = "";
            totstr += "<tr>";
            $.each(responseJSON.propls, function (m, columnname) {
                if (m == 0) {
                    totstr += "<td class=\"f-songti\">合计</td>";
                }
                else {
                    totstr += "<td>" + responseJSON.total[columnname.normalcode.toLowerCase()] + "</td>";
                }
            });
            totstr += "</tr>";
            $("#tab-data-total").append(totstr);//合计
            //分页
            initDataPage(($("#tab-data tr").length - 1));
            PageControl(1, 10);
            popFancybox();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            UEEPAlert(XMLHttpRequest.responseText);
        }
    });
}
//加载系统能效测点
function loadCodeXTNX() {
    $.ajax({
        type: "POST",//这里是http类型
        url: "/analyze/GetCodeByModuleCode",//大家都应该很清楚了
        async: false,
        data: { modulecode: '系统能效' },//回传一个参数
        dataType: "json",//传回来的数据类型
        success: function (responseJSON) {
            $("#div_code_xtnc").empty();
            var str = "";
            if (responseJSON.length > 0) {
                $.each(responseJSON, function (i, data) {
                    var isTrueCode = "";
                    if (secondCode(data.id).length == 0) {
                        isTrueCode = "name='checkboxcode'";
                    }
                    str += "<div class=\"nyfx-item select-item\">";
                    str += "<div class=\"item-tit\">";
                    str += "<label>";
                    str += "<input type=\"checkbox\" " + isTrueCode + " class=\"selectToggle\" value=\"" + data.code + "|" + data.name + "|" + data.is_pct + "\"/>" + data.name + "";
                    str += "</label>";
                    str += "</div>";
                    str += secondCode(data.id, data.code);
                    str += "</div>";
                });
            }
            $("#div_code_xtnc").append(str);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            UEEPAlert(XMLHttpRequest.responseText);
        }
    });
}

//加载系统指标测点
function loadCodeXTZB() {
    $.ajax({
        type: "POST",//这里是http类型
        url: "/analyze/GetCodeByModuleCode",//大家都应该很清楚了
        async: false,
        data: { modulecode: '系统指标', temp: Math.random() },//回传一个参数
        dataType: "json",//传回来的数据类型
        success: function (responseJSON) {
            $("#div_code_xtzb").empty();
            var str = "";
            if (responseJSON.length > 0) {
                $.each(responseJSON, function (i, data) {
                    str += "<div class=\"nyfx-item select-item\">";
                    str += "<div class=\"item-tit\">";
                    str += "<label>";
                    str += "<input type=\"checkbox\" class=\"selectToggle\" value=\"" + data.code + "|" + data.name + "|" + data.is_pct + "\"/>" + data.name + "";
                    str += "</label>";
                    str += "</div>";
                    str += secondCode(data.id);
                    str += "</div>";
                });
            }
            $("#div_code_xtzb").append(str);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            UEEPAlert(XMLHttpRequest.responseText);
        }
    });
}
//加载设备测点
function loadCodeSBNX() {
    $.ajax({
        type: "POST",//这里是http类型
        url: "/analyze/GetClassMenu",//大家都应该很清楚了
        async: false,
        data: { module: 'fx', temp: Math.random() },//回传一个参数},//回传一个参数
        dataType: "json",//传回来的数据类型
        success: function (responseJSON) {
            $("#div_code_sbnx").empty();
            var str = "";
            if (responseJSON.length > 0) {
                str += "<div class=\"nyfx-item\">";
                str += "<div class=\"item-txt\">";
                $.each(responseJSON, function (i, data) {
                    str += "<p>";
                    str += "<label>";
                    str += "<input type=\"radio\" name =\"checkbox_sb\" value=\"" + data.code + "|" + data.name + "|" + data.is_pct + "\"/>" + data.name + "";
                    str += "</label>";
                    str += "</p>";
                });
                str += "</div>";
                str += "</div>";
            }
            //checkbox事件绑定
            $(':radio[name=checkbox_sb]').each(function (i, data) {
                $(this).click(function () {
                    $("#hid_equcode").val($(this).val().split('|')[0]);
                    var obj = $(":radio[name=checkbox_sb]");
                    $(':radio[name=checkbox_sb]').each(function (i, dd) {
                        if (dd != data) dd.checked = false;
                        else dd.checked = true;
                    });
                });
            });
            $("#div_code_sbnx").append(str);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            UEEPAlert(XMLHttpRequest.responseText);
        }
    });
}
///加载测点公用方法（二级）
function secondCode(pid, pcode) {
    var str = "";
    $.ajax({
        type: "POST",//这里是http类型
        url: "/analyze/GetCodeByPid",//大家都应该很清楚了
        async: false,
        data: { pid: pid },//回传一个参数
        dataType: "json",//传回来的数据类型
        success: function (responseJSON) {
            if (responseJSON.length > 0) {
                str += "<div class=\"item-txt\" id=\"div_code_" + pcode + "\">";
                $.each(responseJSON, function (i, data) {
                    str += "<p>";
                    str += "<label>";
                    str += "<input  type=\"checkbox\" name=\"checkboxcode\" value=\"" + data.code + "|" + data.name + "|" + data.is_pct + "\"/>" + data.name + "";
                    str += "</label>";
                    str += "</p>";

                });
                str += "</div>";
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            UEEPAlert(XMLHttpRequest.responseText);
        }
    });
    return str;
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
    var timetype = $("input:radio[name='radio_seledate']:checked").val();
    var starttime = "";
    var endtime = "";
    if (timetype == "hh") {
    	starttime = $("#datepicker-start").val();
        endtime = $("#datepicker-end").val();
        if ($.trim(starttime).length == 0) {           
            UEEPAlert('请选择开始时间！');
            return;
        }
        if ($.trim(endtime).length == 0) {           
            UEEPAlert('请选择结束时间！');
            return;
        }
    }
    else {
        starttime = $.trim($("#datepicker-start").val());
        endtime = $.trim($("#datepicker-end").val());
        if (starttime.length == 0) {
            UEEPAlert('请选择开始时间！');
            return;
        }
        if (endtime.length == 0) {
            UEEPAlert('请选择结束时间！');
            return;
        }
    }
    if (timetype == "mm") {
        starttime = starttime + "-01";

        endtime = endtime + "-" + m_DaysInMonth(endtime.split('-')[0], endtime.split('-')[1]);
    }

    switch ($("#hid_rid").val()) {
        case "tab_1":
            var selectControls = $("#div_code_xtnc input:checkbox[name='checkboxcode']:checked");
            if (selectControls.length == 0) { UEEPAlert('请选择指标!'); return; }
            $("#div_content").show();
            LoadDataXTNX(starttime, endtime, timetype, selectControls);//系统
            break;
        case "tab_2":
            var selectControls = $("#div_code_xtzb input:checkbox[name='checkboxcode']:checked");
            if (selectControls.length == 0) { UEEPAlert('请选择指标!'); return; }
            $("#div_content").show();
            LoadDataXTZB(starttime, endtime, timetype, selectControls);//指标
            break;
        case "tab_3":
            var selectControls = $("#div_code_sbnx input:radio[name='checkbox_sb']:checked");
            if (selectControls.length == 0) { UEEPAlert('请选择设备!'); return; }
            $("#div_content").show();
            LoadDataSBNX(starttime, endtime, timetype, selectControls);//设备
            break;
        default:
    }
    $("#tb_container tr:odd").addClass("odd");
});
//点击弹出曲线
function showline(tdnum) {

    //this.href = "#div_show_spline";

    $("#Chart_spline").empty();
    var title = "";
    var lineLa = new Array();
    var catego = new Array();
    var series = new Array();
    var rowcount = $("#tab-data tr").length;
    var ticknum = 1;
    if (rowcount <= 1) {
        return false;
    }
    if (rowcount < 7) {
        ticknum = 1;
    }
    else {
        ticknum = Math.round(rowcount / 6) > 2 ? Math.round(rowcount / 6) : 2;
    }
    for (var i = 1; i < rowcount-1; i++) {
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
    linechartInit('spline', $("#Chart_spline"), title, series, catego, ticknum);
}
//点击弹出饼图
function showpie(tabname, trnum, columns) {
    if (tabname == "tab-data-total") {//如果是合计
        trnum = 0;
    }
    var dicdata = new Array();
    var lineCN = new Array();
    var lineHN = new Array();
    var columnsArray = columns.split(',');
    for (var i = 1; i < columnsArray.length; i++) {
        var dickey = columnsArray[i];
        var dicvalue = $("#" + tabname + " tr:eq(" + trnum + ") td:eq(" + i + ")").text();
        dicdata[dickey] = Number(dicvalue);
    }
    $.each($("#div_code_hl input:checkbox"), function (n, value) {
        arrycode = $(this).val().split('|');
        lineCN.push([arrycode[1], dicdata[arrycode[0].toLowerCase()]]);
    });
    propchartInit($("#Chart_pie"), "供能", lineCN);
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
function linechartInit(type, div, title, series, catego, ticknum) {
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
            categories: catego,
            tickInterval: ticknum
        },
        yAxis: {
            title: {
                text: ''
            },
            labels: {
                formatter: function () {
                    return this.value + '°';
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
	if (totalPage <= 10) { $("#Pagination").hide(); return false; }
	$("#Pagination").show();
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
    $("#tab-data tr:last").show();
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
function ConvertUnit(Keyword) {
    var unit = '';
    if (Keyword.indexOf('电') > -1) {
        unit = "Kwh";
    }
    if (Keyword.indexOf('气') > -1) {
        unit = "m³";
    }
    if (Keyword.indexOf('冷') > -1) {
        unit = "T";
    }
    if (Keyword.indexOf('热') > -1) {
        unit = "T";
    }
    if (Keyword.indexOf('水') > -1) {
        unit = "T";
    }
    if (Keyword.indexOf('率') > -1) {
        unit = "";
    }
    if (Keyword.indexOf('蒸汽') > -1) {
        unit = "T";
    }
    return unit;
}