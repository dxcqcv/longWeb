$(document).ready(function () {
    BindEquList();
    initData();
    
});
//绑定类别
function BindEquList() {
    var selectsb = "",
    $sb = $("#selectsBtype")
    $.ajax({
        type: "POST",//这里是http类型
        url: "/analyze/PageType",//大家都应该很清楚了
        async: false,
        data: { temp: Math.random() },//回传一个参数
        dataType: "json",//传回来的数据类型
        success: function (data) {
            var str = "";
            $.each(data, function (n, value) {
                if (n == 0) {
                    $("#selectsBtype").find("p")[0].innerHTML = value;
                }
                str += "<li val=\"" + value + "\" ><a href=\"\">" + value + "</a></li>";
            });
            $sb.find("ul").empty().append(str);//
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            UEEPAlert(XMLHttpRequest.responseText);
        },
    });
    $sb.simSelect({
        callback: function (x, v) {
            if (!x) return;
            initData(x);
        }
    });//
}
//删除
function Delete(id) {

    UEEPConfirm('确认删除吗？', function (r)
    {
        if (r == true) {
            $.ajax({
                type: "POST",//这里是http类型
                url: "/Analyze/Delete",//大家都应该很清楚了
                async: false,
                data: { id: id, temp: Math.random() },//回传一个参数
                dataType: "json",//传回来的数据类型
                success: function (responseJSON) {
                    initData($("#selectsBtype").find("p")[0].innerText);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    UEEPAlert(XMLHttpRequest.responseText);
                }
            });
        } else {
            return false;
        }
    });
}
function initData(modulecode) {
    if (modulecode == null) {
        modulecode = $("#selectsBtype").find("p")[0].innerHTML;
    }
    $.ajax({
        type: "POST",//这里是http类型
        url: "/Analyze/PageList",//大家都应该很清楚了
        async: false,
        data: { modulecode: modulecode, temp: Math.random() },//回传一个参数
        dataType: "json",//传回来的数据类型
        success: function (responseJSON) {
            $("#tb_container").empty();
            $.each(responseJSON, function (n, value) {
                var str = "<tr>" +
                "<td>" + value.modulecode +
                "</td>" +
                "<td>" + getReStr(value.level - 1, '一') + value.name +
                "</td>" +
                "<td>" + value.code +
                "</td>" +
                "<td>" + value.pname +
                "</td>" +
                "<td>" + car_canchoose(value.canchoose) +
                "</td>" +
                "<td>" + car_canchoose(value.is_pct) +
                "</td>" +
                "<td>" +
                "<a name=\"showhref\" id=\"showbox\" href=\"/Analyze/Edit/" + value.id + "\"  class=\"ico-bpgl ico-Update1 fancybox\"> </a>" +
                "<a class=\"ico-bpgl ico-Set\" onclick=\"Delete(" + value.id + ")\"> </a>" +
                    //"<button class=\"btn mini green\" onclick=\"location.href='/Analyze/Edit/" + value.id + "'\" type=\"button\">编辑</button>" +
                    //"<button class=\"btn mini red\" onclick=\"DeleteUser(" + value.id + ")\" type=\"button\">删除</button>" +
                "</td>" +
            "</tr>";
                $("#tb_container").append(str);
                $("#tb_container tr:odd").addClass("odd");
            });
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            UEEPAlert(XMLHttpRequest.responseText);
        }
    });
    $('#newBtn').fancybox({
        'width': '432',
        'maxWidth':'550',
        'height': '200',
        'maxHeight':'317',
        'scrolling': 'no',
        'autoScale': false,
        'transitionIn': 'none',
        'transitionOut': 'none',
        'padding': '0',
        'type': 'iframe',
        afterShow: function () {
        	var modelcode = $("#selectsBtype p.text").text();
        	$(window.frames[0].document).find("#selectMK p.text").text(modelcode);
        },
        afterClose: function () {
            initData($("#selectsBtype").find("p")[0].innerText);
        }
    });
    $('#showbox').fancybox({
        'width': '432',
        'maxWidth': '550',
        'height': '200',
        'maxHeight': '317',
        'scrolling': 'no',
        'autoScale': false,
        'transitionIn': 'none',
        'transitionOut': 'none',
        'padding': '0',
        'type': 'iframe',
        afterClose: function () {
            initData($("#selectsBtype").find("p")[0].innerText);
        },
    });
}
function getReStr(num, replacestr) {
    var str2 = "";
    for (i = 0; i < num; i++) {
        str2 = str2 + replacestr;
    }
    return str2;
}
function car_canchoose(canchoose) {
    var str2 = "是";
    if (canchoose == 0) {
        str2 = "否";
    }
    return str2;
}