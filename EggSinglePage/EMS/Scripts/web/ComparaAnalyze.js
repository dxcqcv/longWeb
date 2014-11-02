
    function strToJson(str) {
        var json = eval('(' + str + ')');
        return json;
    }
$(document).ready(function () {
    var Content = "<input class=\"Wdate itxt w80\" id=\"datepicker-start\" type=\"text\" onclick=\"WdatePicker({ name: 'blue', charset: 'gb2312', dateFmt: 'yyyy-MM-dd' })\" />";

    $("#datepicker-con").html(Content);
    var date = new Date;
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var d = date.getDate();
    month = (month < 10 ? "0" + month : month);
    d = (d < 10 ? "0" + d : d);
    var mydate = year.toString() + "-" + month.toString() + "-" + d.toString();
    $("#starttime").val(mydate);
});

$("#classList").change(function () {
    $("#tb_container").empty();
    var checkValue = $("#classList").val();
    var str = new Array();
    str = checkValue.split(",");

    var ul = "";
    for (i = 0; i < str.length ; i++) {

        ul += "<div class=\"nyfx-item select-item\">";
        ul += "<div class=\"item-tit\">";
        ul += "<label>";
        ul += "<input type=\"checkbox\" " + " name='myCheckBox' " + " class=\"selectToggle\" id=\"" + str[i].split('|')[0] + "|" + str[i].split('|')[1] + "\"/>" + str[i].split('|')[0] + "";
        ul += "</label>";
        ul += "</div>";
        ul += "</div>";
    }

    $("#tb_container").append(ul);
});

$("#but_select").click(function () {
    var starttime = $("#datepicker-start").val();
    var s = document.getElementsByName("myCheckBox");
    var s2 = "";
    for (var i = 0; i < s.length; i++) {
        if (s[i].checked) {
            s2 += s[i].id + ",";
        }
    }
    s2 = s2.substr(0, s2.length - 1);
    if (s2.split(',').length != 2) {      
        UEEPAlert('请选择两个设备！');
        return;
    }
    $.ajax({
        type: "POST",//这里是http类型
        url: "/Analyze/GetCodeData",//大家都应该很清楚了
        async: false,
        data: { equCode: s2, times: starttime },//回传一个参数
        dataType: "json",//传回来的数据类型
        success: function (data) {
            //alert(data);
            $("#tb_html").empty();
            $("#tb_html").append(data);

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            UEEPAlert(XMLHttpRequest.responseText);
        }
    });
});

function myclick(obj) {
    var date = new Date;
    var h = date.getHours();
    h = (h < 10 ? "0" + h : h);
    var starttime = $("#datepicker-start").val() + " 00:00:01";
    var endtime = $("#datepicker-start").val() + " 23:59:59";
    var codes = obj.id;
    $.ajax({
        type: "POST",//这里是http类型
        url: "/analyze/GetComparaData",//大家都应该很清楚了
        async: false,
        data: { starttime: starttime, endtime: endtime, timetype: "HH", codes: codes },//回传一个参数
        dataType: "json",//传回来的数据类型
        success: function (responseJSON) {
            LoadChartData(obj, responseJSON, codes);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            UEEPAlert(XMLHttpRequest.responseText);
        }
    });
}
//加载报表（开始时间、结束时间、测点、类编）
function LoadChartData(obj, responseJSON, codes) {
    $("#tb_htm2").empty();//清空
    if (obj === undefined) { return; }
    var code = codes.split(',')[0].toString().toLowerCase();
    var code1 = codes.split(',')[1].toString().toLowerCase();
    var chartData = strToJson(responseJSON.data);
    var data = [];
    var xdata = [];
    var data1 = [];
    $.each(chartData, function (n, value) {
        data.push(Number(eval("value." + code)));
        data1.push(Number(eval("value." + code1)));
        xdata.push(eval("value.colltime").split(' ')[1]);
    });
    var tickInterval = 1;
    var childDiv = $('<div></div>');        //创建一个子DIV
    childDiv.attr('id', 'child' + i);            //给子DIV设置ID
    childDiv.appendTo($("#tb_htm2"));        //将子DIV添加到父DIV中
    childDiv.highcharts({
        title: {
            text: obj.cells[0].textContent + '对比',
            x: -20 //center
        },
        xAxis: {
            tickInterval: tickInterval,
            categories: xdata
        },
        yAxis: {
            title: {
                text: obj.cells[0].childNodes[0].nodeValue
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
            name: $("#tab tr").eq(0)[0].cells[1].childNodes[0].nodeValue,
            data: data
        }, {
            name: $("#tab tr").eq(0)[0].cells[2].childNodes[0].nodeValue,
            data: data1
        }]
    });
}
