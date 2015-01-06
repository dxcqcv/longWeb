$(document).ready(function () {
    $("#div_content").hide();
    BindEquList();
    $("input[name='radio_seledate']:first").change();
});
//绑定设备
function BindEquList() {
    var selectsb = "",
    $sb = $("#selectsBtype")
    $.ajax({
        type: "POST",//这里是http类型
        url: "/analyze/GetEquESList",//大家都应该很清楚了
        async: false,
        data: { level: 4, temp: Math.random() },//回传一个参数
        dataType: "json",//传回来的数据类型
        success: function (data) {
            var str = "";
            $.each(data, function (n, value) {
                str += "<li val=\"" + value.instancecode + "\" ><a href=\"\">" + value.instancename + "</a></li>";
            });
            $sb.find("ul").empty().append(str);//经济区
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            UEEPAlert(XMLHttpRequest.responseText);
        },
    });
    $sb.simSelect({
        callback: function (x, v) {
            if (!x) return;
            BindParameter(v);
        }
    });//
}
//绑定设备参数
function BindParameter(instancecode) {
    $.ajax({
        type: "POST",//这里是http类型
        url: "/analyze/GetEquCodes",//大家都应该很清楚了
        async: false,
        data: { codes: instancecode },//回传一个参数
        dataType: "json",//传回来的数据类型
        success: function (data) {
            var str = "";
            $("#ul_Parameter").empty();
            $.each(data, function (n, value) {
                str += " <li><input name='myCheckBox' " + " value=\"" + value.name +"（" + value.unit +"）"+ "\" type=\"checkbox\" id=\"" + value.code + "\"/><span> " + value.name + "</span></li>";
                //str += "<input type='checkbox' name='myCheckBox' " + " value=\"" + value.name + "\"" + " class=\"selectToggle\" id=\"" + value.code + "\"/>" + value.name + "";
            });
            $("#ul_Parameter").append(str);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            UEEPAlert(XMLHttpRequest.responseText);
        }
    });
}

///////切换日期///////
$("input[name='radio_seledate']").change(function () {
    var selectval = $(this).val();
    switch (selectval) {
    	case "hh":
    		var Content = "<input class=\"Wdate w150\" readonly=\"readonly\" id=\"datepicker-start\" type=\"text\" onclick=\"WdatePicker({ name: 'blue', charset: 'gb2312', dateFmt: 'yyyy-MM-dd HH:00:00', maxDate: '#F{$dp.$D(\\'datepicker-end\\')||\\'%y-%M-%d\\'}' })\" />";
    		Content += "<span class=\"ml5 mr5\">到</span>";
    		Content += "<input class=\"Wdate w150\" readonly=\"readonly\"  id=\"datepicker-end\" type=\"text\" onclick=\"WdatePicker({ name: 'blue', charset: 'gb2312', dateFmt: 'yyyy-MM-dd HH:00:00', minDate: '#F{$dp.$D(\\'datepicker-start\\')}', maxDate: '%y-%M-%d'})\" />";
    		$("#datepicker-con").html(Content);
    		break;
    	case "dd":
    		var Content = "<input class=\"Wdate w100\" readonly=\"readonly\"  id=\"datepicker-start\" type=\"text\" onclick=\"WdatePicker({ name: 'blue', charset: 'gb2312', dateFmt: 'yyyy-MM-dd', maxDate: '#F{$dp.$D(\\'datepicker-end\\')||\\'%y-%M-%d \\'}' })\" />";
    		Content += "<span class=\"ml5 mr5\">到</span>";
    		Content += "<input class=\"Wdate w100\" readonly=\"readonly\"  id=\"datepicker-end\" type=\"text\" onclick=\"WdatePicker({ name: 'blue', charset: 'gb2312', dateFmt: 'yyyy-MM-dd', minDate: '#F{$dp.$D(\\'datepicker-start\\')}', maxDate: '%y-%M-%d '})\" />";
    		$("#datepicker-con").html(Content);
    		break;
    	case "mm":
    		var Content = "<input class=\"Wdate w80\" readonly=\"readonly\"  id=\"datepicker-start\" type=\"text\" onclick=\"WdatePicker({ name: 'blue', charset: 'gb2312', dateFmt: 'yyyy-MM', maxDate: '#F{$dp.$D(\\'datepicker-end\\')||\\'%y-%M\\'}' })\" />";
    		Content += "<span class=\"ml5 mr5\">到</span>";
    		Content += "<input class=\"Wdate w80\" readonly=\"readonly\"  id=\"datepicker-end\" type=\"text\" onclick=\"WdatePicker({ name: 'blue', charset: 'gb2312', dateFmt: 'yyyy-MM', minDate: '#F{$dp.$D(\\'datepicker-start\\')}', maxDate: '%y-%M'})\" />";
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
    if (totalPage < 10) { return false; }
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
    $("#Pagination").empty();
    var timetype = "HH";
    var codes = "";
    var s = document.getElementsByName("myCheckBox");
    for (var i = 0; i < s.length; i++) {
        if (s[i].checked) {
            codes = codes == "" ? s[i].id : codes + "," + s[i].id;
        }
    }
    if (codes == "") {      
        UEEPAlert('请选择要查询的参数！');
        return;
    } else {
        if (codes.split(',').length > 3) {          
            UEEPAlert('最多三个运行参数进行查询！');
            return;
        }
    }
    var timetype = $("input:radio[name='radio_seledate']:checked").val();
    var starttime = "";
    var endtime = "";
    if (timetype == "hh") {
        starttime = $("#datepicker-start").val();
        endtime = $("#datepicker-end").val();
        if (starttime.trim().length == 0) {           
            UEEPAlert('请选择开始时间！');
            return;
        }
        if (endtime.trim().length == 0) {           
            UEEPAlert('请选择结束时间！');
            return;
        }
    }
    else {
        starttime = $("#datepicker-start").val().trim();
        endtime = $("#datepicker-end").val().trim();
        if (starttime.trim().length == 0) {          
            UEEPAlert('请选择开始时间！');
            return;
        }
        if (endtime.trim().length == 0) {        
            UEEPAlert('请选择结束时间！');
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
            var drawStr = "<tr><td style=\"height:35px;\">时间</td>";
            var s = document.getElementsByName("myCheckBox");
            for (var i = 0; i < s.length; i++) {
                if (s[i].checked) {
                    drawStr += "<td  style=\"height:35px;\">" + s[i].value + "</td>";
                }
            }
            drawStr += "</tr>";
            $("#tb_heard").append(drawStr);
            var obj = strToJson(responseJSON.data);
            if (obj == "") {       
                $("#Pagination").empty();
                $("#tb_container").empty();
                $("#tb_htm2").empty();//清空
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
                    text: s[i].value,
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
            UEEPAlert('开始日期不能大于结束日期！');
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

        if (allStartDate.getTime() > allEndDate.getTime()) {           
            UEEPAlert('开始时间不能大于结束时间！');
            return;
        }
    } else {       
        UEEPAlert('时间不能为空！');
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
