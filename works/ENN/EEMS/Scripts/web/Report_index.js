var d = new Date(), ddstr = '', mmstr = '', yystr = '';
ddstr += d.getFullYear() + '-' + monthformt((d.getMonth() + 1)) + '-' + monthformt(d.getDate());
mmstr += d.getFullYear() + '-' + monthformt((d.getMonth() + 1));
yystr += d.getFullYear();
var timeflag = "DD";

function monthformt(str) {
    var strretlut = str;
    if (str.lenght < 2) {
        strretlut = '0' + str;
    }
    return strretlut;
}
$(document).ready(function () {
    LoadReportData();
    TimeModeList($("#selReport p.text").attr("val"));
    $("#time_dd").val(ddstr);
    initData($("#selReport p.text").attr("val"), ddstr, "DD");
});


//加载查看方式信息
function TimeModeList(rid) {
    $.ajax(
        {
            url: "/Report/TimeModeList", type: "POST", async: false,
            data: { rid: rid},//回传一个参数
            dataType: "json",
            success: function (responseJSON) {
                var strEqu = "";
                $.each(responseJSON, function (n, value) {
                    switch (value.timetype) {
                        case 'YY,MM,DD':
                            radioEnabled("#radio_yy");
                            radioEnabled("#radio_mm");
                            radioEnabled("#radio_dd");
                            document.getElementById("radio_dd").checked = true;
                            changeTime("DD");
                            break;
                        case 'YY,MM':
                            radioEnabled("#radio_yy");
                            radioEnabled("#radio_mm");
                            radioDisabled("#radio_dd");
                            document.getElementById("radio_mm").checked = true;
                            changeTime("MM");
                            break;
                        case 'YY,DD':
                            radioEnabled("#radio_yy");
                            radioDisabled("#radio_mm");
                            radioEnabled("#radio_dd");
                            document.getElementById("radio_dd").checked = true;
                            changeTime("DD");
                            break;
                        case 'MM,DD':
                            radioDisabled("#radio_yy");
                            radioEnabled("#radio_mm");
                            radioEnabled("#radio_dd");
                            document.getElementById("radio_dd").checked = true;
                            changeTime("DD");
                            break;
                        case 'DD':
                            radioDisabled("#radio_yy");
                            radioDisabled("#radio_mm");
                            radioEnabled("#radio_dd");
                            document.getElementById("radio_dd").checked = true;
                            changeTime("DD");
                            break;
                        case 'MM':
                            radioDisabled("#radio_yy");
                            radioEnabled("#radio_mm");
                            radioDisabled("#radio_dd");
                            document.getElementById("radio_mm").checked = true;
                            changeTime("MM");
                            break;
                        case 'YY':
                            radioEnabled("#radio_yy");
                            radioDisabled("#radio_mm");
                            radioDisabled("#radio_dd");
                            document.getElementById("radio_yy").checked = true;
                            changeTime("YY");
                        default:
                            break;
                    }
                });
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                UEEPAlert(XMLHttpRequest.responseText);
            }
        });
}

///////响应查询按钮///////
function QueryRepData() {
    var nowTime = "";
    switch (timeflag) {
        case "DD":
            nowTime = $("#time_dd").val();
            break;
        case "MM":
            nowTime = $("#time_mm").val();
            break;
        case "YY":
            nowTime = $("#time_yy").val();
            break;
        default:
            break;
    }
    if (nowTime.length == 0)
    {
        UEEPAlert('请输入日期！'); 
    }
    else
    {
        initData($("#selReport p.text").attr("val"), nowTime, timeflag);
    }
}
///////切换日期///////
function changeTime(flag) {
    switch (flag) {
        case "DD":
            $("#time_dd").show();
            $("#time_yy").hide();
            $("#time_mm").hide();
            $("#time_dd").val(ddstr);
            timeflag = "DD";
            break;
        case "MM":
            $("#time_dd").hide();
            $("#time_yy").hide();
            $("#time_mm").show();
            $("#time_mm").val(mmstr);
            timeflag = "MM";
            break;
        case "YY":
            $("#time_dd").hide();
            $("#time_yy").show();
            $("#time_mm").hide();
            $("#time_yy").val(yystr);
            timeflag = "YY";
            break;
        default:
            break;
    }
};

///////启用radio///////
function radioEnabled(id) {
    $(id).removeAttr("disabled");
   // $(id).removeAttr("checked");
    $(id + 1).attr("style", "color:black");
};

///////停用radio///////
function radioDisabled(id) {
    $(id).attr("disabled", "disabled");
   // $(id).removeAttr("checked");
    $(id+1).attr("style", "color:gray");
};

///////下拉框///////
//function dropChanged() {
//    TimeModeList($("#customReport").val());
//};


//加载下拉框列表///////
function LoadReportData() {
    $.ajax({
        type: "POST", url: "/Report/ReportList", async: false,
        data: {}, dataType: "json",
        success: function (responseJSON) {
            var str = "";
            $.each(responseJSON, function (n, value) {
                if (n == 0) {
                    $("#selReport").find("p.text").text(value.name);
                    $("#selReport").find("p.text").attr("val",value.id);
                }
                str += "<li val='" + value.id + "'><a href=''>" + value.name + "</a></li>";
            });
            $("#selReport").find("ul").empty().append(str);
            $("#selReport").simSelect({
                callback: function (x, v) {
                    TimeModeList(v);
                }
            });
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            UEEPAlert(XMLHttpRequest.responseText);
        }
    });
}
///////报表显示///////
function initData(rid, rep_date, flag) {
    $.ajax({
        type: "POST",//这里是http类型
        url: "/Report/GetReportData",//大家都应该很清楚了
        async: false,
        data: { rid: rid, rep_date: rep_date, flag: flag },//回传一个参数
        dataType: "json",//传回来的数据类型
        success: function (responseJSON) {
            if (responseJSON.type == 1) {
                $("#header").empty();
                $("#header").append(responseJSON.header);
                var obj = strToJson(responseJSON.data);
                var str = "<tbody>";
                $.each(obj, function (n, value) {
                    str += "<tr>";
                    $.each(responseJSON.columns, function (m, columnname) {
                        var tt = eval("value." + columnname);
                        str += "<td>" + (isNaN(tt) ? tt : Number(tt).toFixed(2)) + "</td>";
                    });
                    str += "</tr>";
                });
                str += "</tbody>";
                $("#tab").append(str);
                $("#tab input").each(function (a, b) { $(this).remove() });
            }
            else {
                $("#header").empty();
                $("#header").append(responseJSON.header);
                var obj = strToJson(responseJSON.data);
                $("#tab input").each(function (a, b) {
                    if (typeof ($(this).parent().attr("id")) != "undefined") {
                        var values = obj[$(this).parent().attr("id")];
                        if (!isNaN(values)) {
                            values = Number(values);
                        } else {
                            values = 0;
                        }

                        $(this).closest("td").text(values.toFixed(2));
                        $(this).remove();
                    }
                });
            }
            $("input[name='htmlTableStr']").val($("#header").html());
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            UEEPAlert(XMLHttpRequest.responseText);
        }
    });
}
function strToJson(str) {
    var json = eval('(' + str + ')');
    return json;
}

//导出
function exportExcel() {
    var data = "";
    $("#tab tr").each(function () {
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
    $("input[name='reportname']").val($("#selReport p.text").text());
    //表单提交
    $("form[name='myForm']").submit();
}
function htmlEncode(value) {
    //create a in-memory div, set it's inner text(which jQuery automatically encodes)
    //then grab the encoded contents back out.  The div never exists on the page.
    return $('<div/>').text(value).html();
}
//打印
$("#but_print").click(function () {
    $("#header").printArea();
});
