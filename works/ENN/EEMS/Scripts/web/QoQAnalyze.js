/**
    * 功能说明：同比分析页面js
    * 创建人：师佳丽
    * 创建时间：2014-05-20
    * **/
var tabtype = "系统能效";
$(document).ready(function () {
    $("#chartDiv").hide();
    loadCodeXTNX();
    loadCodeXTZB();
    loadCodeSBNX();
    MyTab();
    $("#hid_rid").val('tab_1');
    selectToggle();
    $("#datepicker-dd").val(ddstr);
    $("#datepicker-mm").val(mmstr);
    $("#time_mm").hide();
    // QueryEquFaultList();
});

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

//////////查询///////////////////
function GetData() {
    switch ($("#hid_rid").val()) {
        case "tab_1":
            var selectControls = $("#div_code_xtnc input:checkbox[name='checkboxcode']:checked");
            if (selectControls.length == 0) { UEEPAlert('请选择指标!'); return; }
            QueryEquFaultList(1);//系统
            break;
        case "tab_2":
            selectControls = $("#div_code_xtzb input:checkbox[name='checkboxcode']:checked");
            if (selectControls.length == 0) { UEEPAlert('请选择指标!'); return; }
            QueryEquFaultList(2);//指标
            break;
        case "tab_3":
            selectControls = $("#div_code_sbnx input:radio[name='checkbox_sb']:checked");
            if (selectControls.length == 0) { UEEPAlert('请选择设备!'); return; }
            QueryEquFaultList(3);//设备
            break;
        default:
    }
    $("#tb_container tr:odd").addClass("odd");
}

//获取列表数据
function QueryEquFaultList(type) {
    var series = new Array();
    var catego = new Array();
    var strtime = "";
    var codes = "";
    var names = "";
    var arrycode = "";
    if (type == 1) {
        var selectControls = $("#div_code_xtnc input:checkbox[name='checkboxcode']:checked");
    }
    else if (type == 2) {
        var selectControls = $("#div_code_xtzb input:checkbox[name='checkboxcode']:checked");
    } else {
        var selectControls = $("#div_code_sbnx input:radio[name='checkbox_sb']:checked");
    }
    $.each(selectControls, function (i, data) {//获取checkbox框选中数据
        arrycode = $(this).val().split('|');
        codes += arrycode[0] + ",";
        names += arrycode[1] + ",";
    });
    codes = codes.substring(0, codes.length - 1);
    names = names.substring(0, names.length - 1);
    if (timetype == "DD") {
        strtime = $("#datepicker-dd").val();
    }
    else if (timetype == "MM") {
        strtime = $("#datepicker-mm").val();
    }
    $.ajax({
        type: "POST",//这里是http类型
        url: "/Analyze/QoQAnalyzeList",//大家都应该很清楚了
        async: false,
        //strtime查询时间，timetype查询时间类型（1为天2为月），tabtype页签（"系统能效""系统指标""设备能效"），codes要查询的单元编码（多条以,隔开，names要查询的单元名称（多条以,隔开）
        data: { strtime: strtime, timetype: timetype, tabtype: tabtype, codes: codes, names: names },//回传一个参数
        dataType: "json",//传回来的数据类型
        success: function (responseJSON) {
            $("#tb_container").empty();
            $("#columnDiv").empty();
            if (responseJSON != "error" && responseJSON.length > 0) {
                var lineCu = new Array();
                var lineLa = new Array();
                $.each(responseJSON, function (n, value) {
                    var str = "<tr class=";
                    if (Number(n) % 2 == 0) {
                        str += "\"even\">";
                    } else {
                        str += "\"odd\">";
                    }
                    str += "<td>" + (parseInt(n) + 1) +
                        "</td>" +
                        "<td>" + value.ParaName +
                        "</td>" +
                        "<td>" + value.ParaUnit +
                        "</td>" +
                        "<td>" + value.ParaCurrentValue +
                        "</td>" +
                        "<td>" + value.ParaLastValue +
                        "</td>";
                    if (value.ConRadio.indexOf('-') >= 0) {
                        str += "<td><span class=\"ico-green\">" + value.ConRadio + "<i class=\"ico-lift ml5\"></i></span></td>";
                    } else {
                        str += "<td><span class=\"ico-red\">" + value.ConRadio + "<i class=\"ico-lift lift-up ml5\"></i></span></td>";
                    }
                    str += "</tr>";
                    $("#tb_container").append(str);

                    lineCu.push([value.ParaName, value.ParaCurrentValue]);
                    lineLa.push([value.ParaName, value.ParaLastValue]);
                    catego.push(value.ParaName);
                });
                //分页加载
                initDataPage(($("#tab-data tr").length - 1));
                PageControl(1, 10);
                var ladate2 = "";
                if (strtime.length > 0) {
                    ladate2 = strtime.substring(0, 5) + SwStr(Number(strtime.substring(5, 7)) - 1) + strtime.substring(7, strtime.length);
                }
                if (lineCu.length > 0) {
                    var item = {
                        name: strtime,
                        data: lineCu,
                        marker: {
                            enabled: false
                        }
                    };
                    series.push(item);
                }
                if (lineLa.length > 0) {
                    var item2 = {
                        name: ladate2,
                        data: lineLa,
                        marker: {
                            enabled: false
                        }
                    };
                    series.push(item2);
                }
            }
        },
        error: function (xmlHttpRequest) {
            UEEPAlert(XMLHttpRequest.responseText);
        }
    });
    propchartInit("环比直方图", series, catego);
}

function SwStr(strmonth) {
    if (Number(strmonth).toString().length > 1) {
        return strmonth;
    } else {
        return "0" + strmonth;
    }
}

//显示方式标志，1代表列表显示，2代表直方图显示
//切换显示方式
function SwitchShow(showFlag) {
    // $("#chartDiv").show();
    GetData();
    if (showFlag == "1") {
        //$("#columnDiv").attr("hidden", "hidden");
        //$("#chartDiv").removeAttr("hidden");
        $("#chartDiv").show();
        $("#columnDiv").hide();
    } else if (showFlag == "2") {
        //$("#chartDiv").attr("hidden", "hidden");
        //$("#columnDiv").removeAttr("hidden");
        $("#chartDiv").hide();
        $("#columnDiv").show();
    }
}

//实例化column
var columnDiv;
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
            renderTo: 'columnDiv',
            type: 'column',
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
                text: '数值',
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
        tooltip: {
            //headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            //pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            //    '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
            //footerFormat: '</table>',
            //shared: true,
            //useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom',
            borderWidth: 0
        },
        exporting: {
            enabled: false
        },
        series: series

    };
    columnDiv = new Highcharts.Chart(options);
}

var timetype = "DD";
//判断选择日期类型，DD为按天，MM为按月
$("input[name='datepick']").click(function () {
    $("input[name='datepick']").each(function () {
        if (true == $(this).is(':checked')) {
            if ($(this).attr('value') == "1") {
                $("#time_dd").show();
                $("#time_mm").hide();
                timetype = "DD";
            } else if ($(this).attr('value') == "2") {
                $("#time_dd").hide();
                $("#time_mm").show();
                timetype = "MM";
            }
        }
    });
});

///分页
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
    // $("#tab-data tr:last").show();
}
/////////////////////////////////////////////////////////////左侧关系树加载与选择////////////////////////////////////////////////////////

////////切换tab//////////
function MyTab() {
    var tabs = $('.tab');
    if (!tabs.length) return;
    tabs.find('.tab-nav a').click(function (e) {
        e.preventDefault();
    });
    tabs.each(function () {
        var navs = $(this).find('#mytab li:not(.no)'),
            panels = $(this).find('.tab-panel');
        navs.click(function () {
            var index = $(this).index();
            navs.removeClass('on active').eq(index).addClass('on');
            panels.hide().eq(index).show();
            $("#hid_rid").val($(this).attr("id"));
            tabtype = $(this).find("a").html();
        });
    });
}

//var flag1 = true;
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
                    //if (flag1 == true) {
                    //    str += "<input type=\"checkbox\" checked=\"checked\" " + isTrueCode + " class=\"selectToggle\" value=\"" + data.code + "|" + data.name + "|" + data.is_pct + "\"/>" + data.name + "";
                    //} else {
                    str += "<input type=\"checkbox\" " + isTrueCode + " class=\"selectToggle\" value=\"" + data.code + "|" + data.name + "|" + data.is_pct + "\"/>" + data.name + "";
                    //}
                    str += "</label>";
                    str += "</div>";
                    str += secondCode(data.id, data.code);
                    str += "</div>";
                });
                // flag1 = false;
            }
            $("#div_code_xtnc").append(str);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            UEEPAlert(XMLHttpRequest.responseText);
        }
    });
}
//var flag2 = true;
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
                    //if (flag2 == true) {
                    //    str += "<input type=\"checkbox\" checked=\"checked\" class=\"selectToggle\" value=\"" + data.code + "|" + data.name + "|" + data.is_pct + "\"/>" + data.name + "";
                    //} else {
                    str += "<input type=\"checkbox\" class=\"selectToggle\" value=\"" + data.code + "|" + data.name + "|" + data.is_pct + "\"/>" + data.name + "";
                    //}
                    str += "</label>";
                    str += "</div>";
                    str += secondCode(data.id);
                    str += "</div>";
                });
                //flag2 = false;
            }
            $("#div_code_xtzb").append(str);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            UEEPAlert(XMLHttpRequest.responseText);
        }
    });
}

//var flag3 = true;
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
                    //if (flag3 == true) {
                    //    str += "<input type=\"radio\" checked=\"checked\" name =\"checkbox_sb\" value=\"" + data.code + "|" + data.name + "|" + data.is_pct + "\"/>" + data.name + "";
                    //    flag3 = false;
                    //} else {
                    str += "<input type=\"radio\" name =\"checkbox_sb\" value=\"" + data.code + "|" + data.name + "|" + data.is_pct + "\"/>" + data.name + "";

                    // }
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
                    //if (flag1 == true || flag2 == true) {
                    //    str += "<input  type=\"checkbox\" checked=\"checked\" name=\"checkboxcode\" value=\"" + data.code + "|" + data.name + "|" + data.is_pct + "\"/>" + data.name + "";
                    //} else {
                    str += "<input  type=\"checkbox\" name=\"checkboxcode\" value=\"" + data.code + "|" + data.name + "|" + data.is_pct + "\"/>" + data.name + "";
                    //}
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
        })
        inputToggle.click(function () {
            var len = inputs.filter(':checked').length,
                size = inputs.length;
            if (size == len) {
                inputs.prop('checked', false);
            } else {
                inputs.prop('checked', true);
            }
            ;
            _callback();
        });


        function _callback() {
            var len = inputs.filter(':checked').length,
                size = inputs.length;
            if (size == 0) {
                return false
            }
            ;
            if (len == size) {
                inputToggle.prop('checked', true);
            } else {
                inputToggle.prop('checked', false);

            }
        }
    });
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
