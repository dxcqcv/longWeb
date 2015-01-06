
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
});
$("#equList").change(function () {
    var codes = "";
    $("#equList option:selected").each(function () {//绘制表头\
        codes += $(this).val();
    });
    if (codes == "") return;
    $.ajax({
        type: "POST",//这里是http类型
        url: "/analyze/GetEquCodes",//大家都应该很清楚了
        async: false,
        data: { codes: codes },//回传一个参数
        dataType: "json",//传回来的数据类型
        success: function (h) {
            var obj = strToJson(h);
            var str = "";
            $("#tb_equ").empty();
            $.each(obj, function (n, value) {
                str += "<div class=\"nyfx-item select-item\">";
                str += "<div class=\"item-tit\">";
                str += "<label>";
                str += "<input type='checkbox' name='myCheckBox' " + " value=\"" + eval("value.name") + "\"" + " class=\"selectToggle\" id=\"" + eval("value.code") + "\"/>" + eval("value.name") + "";
                str += "</label>";
                str += "</div>";
                str += "</div>";
            });
            $("#tb_equ").append(str);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            UEEPAlert(XMLHttpRequest.responseText);
        }
    });
});

// 调用弹窗插件
function popFancybox() {
    var elem = $('.fancybox');
    if (!elem.length) return;
    elem.fancybox({
        padding: 0
    });
}

///////切换日期///////
$("input[name='radio_seledate']").change(function () {
    var selectval = $(this).val();
    switch (selectval) {
        case "hh":
            var Content = "<input class=\"Wdate itxt w80\" id=\"datepicker-start\" type=\"text\" onclick=\"WdatePicker({ name: 'blue', charset: 'gb2312', dateFmt: 'yyyy-MM-dd', maxDate: '#F{$dp.$D(\\'datepicker-end\\')||\\'2020-10-01\\'}' })\" />";
            Content += "<input class=\"Wdate itxt w60 ml10 WdateHour\" id=\"datepicker-start-hh\" type=\"text\" onclick=\"WdatePicker({ name: 'blue', charset: 'gb2312', dateFmt: 'HH:00', maxDate: '#F{$dp.$D(\\'datepicker-end-hh\\')||\\'2020-10-01\\'}' })\" />";
            Content += "<span class=\"ml5 mr5\">到</span>";
            Content += "<input class=\"Wdate itxt w80\" id=\"datepicker-end\" type=\"text\" onclick=\"WdatePicker({ name: 'blue', charset: 'gb2312', dateFmt: 'yyyy-MM-dd', minDate: '#F{$dp.$D(\\'datepicker-start\\')}', maxDate: '2020-10-01'})\" />";
            Content += "<input class=\"Wdate itxt w60 ml10 WdateHour\" id=\"datepicker-end-hh\" type=\"text\" onclick=\"WdatePicker({ name: 'blue', charset: 'gb2312', dateFmt: 'HH:00', minDate: '#F{$dp.$D(\\'datepicker-start-hh\\')||\\'2020-10-01\\'}' })\" />";
            $("#datepicker-con").html(Content);
            break;
        case "dd":
            var Content = "<input class=\"Wdate itxt w80\" id=\"datepicker-start\" type=\"text\" onclick=\"WdatePicker({ name: 'blue', charset: 'gb2312', dateFmt: 'yyyy-MM-dd', maxDate: '#F{$dp.$D(\\'datepicker-end\\')||\\'2020-10-01\\'}' })\" />";
            Content += "<span class=\"ml5 mr5\">到</span>";
            Content += "<input class=\"Wdate itxt w80\" id=\"datepicker-end\" type=\"text\" onclick=\"WdatePicker({ name: 'blue', charset: 'gb2312', dateFmt: 'yyyy-MM-dd', minDate: '#F{$dp.$D(\\'datepicker-start\\')}', maxDate: '2020-10-01'})\" />";
            $("#datepicker-con").html(Content);
            break;
        case "mm":
            var Content = "<input class=\"Wdate itxt w80\" id=\"datepicker-start\" type=\"text\" onclick=\"WdatePicker({ name: 'blue', charset: 'gb2312', dateFmt: 'yyyy-MM', maxDate: '#F{$dp.$D(\\'datepicker-end\\')||\\'2020-10-01\\'}' })\" />";
            Content += "<span class=\"ml5 mr5\">到</span>";
            Content += "<input class=\"Wdate itxt w80\" id=\"datepicker-end\" type=\"text\" onclick=\"WdatePicker({ name: 'blue', charset: 'gb2312', dateFmt: 'yyyy-MM', minDate: '#F{$dp.$D(\\'datepicker-start\\')}', maxDate: '2020-10-01'})\" />";
            $("#datepicker-con").html(Content);
            break;
        default:
            break;
    }
});
function SwitchShow(tag) {
    if (tag == 1) {
        $("#portlet_tab1").show();
        $("#tb_htm2").hide();
    } else {
        $("#portlet_tab1").hide();
        $("#tb_htm2").show();
    }
};

///分页
function initDataPage(totalPage) {
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
}
function strToJson(str) {
    var json = eval('(' + str + ')');
    return json;
}

function GetData() {
    var codes = "";
    var selectControls = $("input:checkbox[name='checkboxcode']:checked")
    var drawStr = "";
    var arrycode = "";
    drawStr += "<tr><td>时间</td>";
    $.each(selectControls, function (i, data) {//绘制表头\
        arrycode = $(this).val().split('|');
        codes += arrycode[0] + ",";
        drawStr += "<td><a onclick='showline(" + (i + 2) + ")'><i class=\"icon-bar-chart\">" + arrycode[1] + "</i></a></td>";
    });
    $("#tb_heard").empty();
    $("#tb_container").empty();//清空
    var timetype = "HH";
    var codes = "";
    var s = document.getElementsByName("myCheckBox");
    for (var i = 0; i < s.length; i++) {
        if (s[i].checked) {
            codes = codes == "" ? s[i].id : codes + "," + s[i].id;
        }
    }
    if (codes == "") {
        alert("请选择要查询的参数！");
        return;
    }
    var timetype = $("input:radio[name='radio_seledate']:checked").val();
    var starttime = "";
    var endtime = "";
    if (timetype == "hh") {
        starttime = $("#datepicker-start").val() + " " + $("#datepicker-start-hh").val().trim();
        endtime = $("#datepicker-end").val() + " " + $("#datepicker-end-hh").val().trim();
        if (starttime.trim().length == 0) {
            alert("请选择开始时间！");
            return;
        }
        if (endtime.trim().length == 0) {
            alert("请选择结束时间！");
            return;
        }
        if ($("#datepicker-start-hh").val().trim().length == 0 || $("#datepicker-end-hh").val().trim().length == 0) {
            alert("请选择小时时间！");
            return;
        }
    }
    else {
        starttime = $("#datepicker-start").val().trim();
        endtime = $("#datepicker-end").val().trim();
        if (starttime.trim().length == 0) {
            alert("请选择开始时间！");
            return;
        }
        if (endtime.trim().length == 0) {
            alert("请选择结束时间！");
            return;
        }
    }
    if (timetype == "mm") {
        starttime = starttime.trim() + "-01";

        endtime = endtime.trim() + "-" + m_DaysInMonth(endtime.trim().split('-')[0], endtime.trim().split('-')[1]);
    }
    compareCalendar(starttime, endtime)

    $.ajax({
        type: "POST",//这里是http类型
        url: "/analyze/GetHisData",//大家都应该很清楚了
        async: false,
        data: { starttime: starttime, endtime: endtime, timetype: timetype, codes: codes },//回传一个参数
        dataType: "json",//传回来的数据类型
        success: function (responseJSON) {
            var drawStr = "<tr><td>时间</td>";
            var s = document.getElementsByName("myCheckBox");
            for (var i = 0; i < s.length; i++) {
                if (s[i].checked) {
                    drawStr += "<td>" + s[i].value + "</td>";
                }
            }
            drawStr += "</tr>";
            $("#tb_heard").append(drawStr);
            var obj = strToJson(responseJSON.data);
            if (obj == "") {
                $("#tb_container").empty();
                return;
            }
            drawStr = "";
            var k = 0;
            $.each(obj, function (n, value) {
                if (k % 2 == 0) {
                    drawStr += "<tr class='even'>";
                } else {
                    drawStr += "<tr class='odd'>";
                }
                k++;
                $.each(responseJSON.columns, function (m, column) {
                    var tt = eval("value." + column);
                    drawStr += "<td>" + tt + "</td>";
                });
                drawStr += "</tr>";
            });
            $("#tb_container").append(drawStr);
            //分页加载
            initDataPage(($("#tab-data tr").length - 1));
            PageControl(1, 10);
            LoadChartData(responseJSON);
            $("#div_content").show();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            UEEPAlert(XMLHttpRequest.responseText);
        }
    });
};
function LoadChartData(responseJSON) {
    $("#tb_htm2").empty();//清空
    var s = document.getElementsByName("myCheckBox");
    for (var i = 0; i < s.length; i++) {
        if (s[i].checked) {
            var code = s[i].id.toLowerCase();
            var obj = strToJson(responseJSON.data);
            var data = [];
            var xdata = [];
            $.each(obj, function (n, value) {
                data.push(Number(eval("value." + code)));
                xdata.push(eval("value.colltime"));
            });
            var tickInterval = xdata.length / 9;
            if (tickInterval >= 0) {
                tickInterval = Math.floor(tickInterval) + 1; //返回小于等于原rslt的最大整数。  
            }
            else {
                tickInterval = Math.ceil(tickInterval) + 1; //返回大于等于原rslt的最小整数。  
            }
            var childDiv = $('<div style="min-width:950px"></div>');        //创建一个子DIV
            childDiv.attr('id', 'child' + i);            //给子DIV设置ID
            childDiv.appendTo($("#tb_htm2"));        //将子DIV添加到父DIV中
            childDiv.highcharts({
                title: {
                    text: s[i].value + '趋势图',
                    x: -20 //center
                },
                xAxis: {
                    tickInterval: tickInterval,
                    categories: xdata
                },
                yAxis: {
                    title: {
                        text: ""
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }]
                },
                tooltip: {
                    valueSuffix: ''
                },
                legend: {
                    width: 0,
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle',
                    borderWidth: 0
                },
                series: [{
                    name: s[i].value,
                    data: data
                }]
            });
        }
    }
}
//比较日前大小  
function compareDate(checkStartDate, checkEndDate) {
    var arys1 = new Array();
    var arys2 = new Array();
    if (checkStartDate != null && checkEndDate != null) {
        arys1 = checkStartDate.split('-');
        var sdate = new Date(arys1[0], parseInt(arys1[1] - 1), arys1[2]);
        arys2 = checkEndDate.split('-');
        var edate = new Date(arys2[0], parseInt(arys2[1] - 1), arys2[2]);
        if (sdate > edate) {
            alert("开始日期不能大于结束日期！");
            return;
        }
    }
}

//判断日期，时间大小  
function compareTime(startDate, endDate) {
    if (startDate.length > 0 && endDate.length > 0) {
        var startDateTemp = startDate.split(" ");
        var endDateTemp = endDate.split(" ");

        var arrStartDate = startDateTemp[0].split("-");
        var arrEndDate = endDateTemp[0].split("-");

        var arrStartTime = startDateTemp[1].split(":");
        var arrEndTime = endDateTemp[1].split(":");

        var allStartDate = new Date(arrStartDate[0], arrStartDate[1], arrStartDate[2], arrStartTime[0], arrStartTime[1]);
        var allEndDate = new Date(arrEndDate[0], arrEndDate[1], arrEndDate[2], arrEndTime[0], arrEndTime[1]);

        if (allStartDate.getTime() >= allEndDate.getTime()) {
            alert("开始时间不能大于结束时间！");
            return;
        }
    } else {
        alert("时间不能为空！");
        return;
    }
}
//比较日期，时间大小  
function compareCalendar(startDate, endDate) {
    if (startDate.indexOf(" ") != -1 && endDate.indexOf(" ") != -1) {
        //包含时间，日期  
        compareTime(startDate, endDate);
    } else {
        //不包含时间，只包含日期  
        compareDate(startDate, endDate);
    }
}
