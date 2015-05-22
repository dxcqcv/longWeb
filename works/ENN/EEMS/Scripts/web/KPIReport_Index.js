$(document).ready(function () {
    var d = new Date();
    $("#quiry-year").val(d.getFullYear() + '-' + monthformt(d.getMonth()));
    loadData();
});
function monthformt(str) {
    var strretlut = str;
    if (str < 10) {
        strretlut = '0' + str;
    }
    return strretlut;
}
//加载数据
function loadData() {
    var dataArry = $("#quiry-year").val().split('-');
    var year = dataArry[0];
    var month = dataArry[1];
    $.ajax({
        type: "POST",//这里是http类型
        url: "/KPIReport/GetKPIListForQT",//大家都应该很清楚了
        async: false,
        data: { year: year, month: month },//回传一个参数
        dataType: "json",//传回来的数据类型
        success: function (responseJSON) {
            $("#tb_container").empty();
            if (responseJSON == "") return;
            var dic = responseJSON.dic;
            $.each(responseJSON.data, function (n, value) {
                var str = "<tr ";
                if ((n % 2) == 0) {
                    str += " class=\"even\">";
                } else {
                    str += " class=\"odd\" id=\"tr_" + value.id + "\">";
                }
                str += "<td><span class=\"tr-span0\">" + value.year +
                "</span><span class=\"tr-span1\">" + value.month +
                "</span></td>" +
                "<td><span>" + value.name +
                "</span></td>" +
                "<td><span>" + value.norm +
                "</span></td>" +
                "<td><span>" + value.weights +
                "</span></td>" +
                "<td><span>" + dic[value.code] +
                "</span></td>" +
                "<td><span>" + fraction(value.function, Number(value.norm), Number(dic[value.code]), Number(value.weights)) +
                "</span></td>" +
            "</tr>";
                $("#tb_container").append(str);
                $("#yeardata").html(value.year + "年" + value.month + "月");
            });
            $("#td_fraction").html(total());
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            UEEPAlert(XMLHttpRequest.responseText);
        }
    });
}
//查询
function QueryData() {
    if ($("#quiry-year").val().length > 0) {
        loadData();
    } else {
    	UEEPAlert("请选择月份！");
    }
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
function PrintData() {
    $("#tab-data").printArea();
}
//计算0类型，权重、值
function fraction(ftype, kpizb, value, qz) {
    var result = 0;
    if (kpizb != '0' && qz != '0') {
        if (ftype == '0') {
            if (value <= kpizb) {
                result = qz;
            } else {
                result = value / (kpizb * qz) * 100;

            }
        } else {
            if (value >= kpizb) {
                result = qz;

            } else {
            	if (value == '0')
            		result = 100;
            	else
            		result = kpizb / (value * qz) * 100;
            }
        }
    } else {
        result = 0;
    }
   
    return result.toFixed(2);
}
//获取总分
function total() {
    var tot = 0;
    var rowcount = $("#tab-data tr").length;
    for (var i = 2; i < rowcount; i++) {
        var fraction = $("#tab-data tr:eq(" + i + ") td:eq(6)").text();
        tot = tot + Number(fraction);
    }
    return tot.toFixed(2);
}
function strToJson(str) {
    var json = eval('(' + str + ')');
    return json;
}
