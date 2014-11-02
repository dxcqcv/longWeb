
$(document).ready(function () {
        LoadTimeMode();
        LoadEnergyMode();
        TimeModeChange($("#sele_timetype").find("p.text").attr("val"));
        QueryEquSpareList(1, 10, 0);
    });


    //加载时间粒度下拉框列表///////
    function LoadTimeMode() {
        var str = "";
        $("#sele_timetype").find("p.text").text("天").attr("val","D");
        str += "<li val='D'><a href=''>天</a></li>";
        str += "<li val='M'><a href=''>月</a></li>";
        $("#sele_timetype").find("ul").empty().append(str);
        $("#sele_timetype").simSelect({
            callback: function (x, v) {
                TimeModeChange(v);
            }
        });
    }
    ////日期框随时间粒度改变////
    function TimeModeChange(tid) {
        var d = new Date(), ddstr = '', ddend = '', mmstr = '', mmend = '', hhstr = '';
        ddstr += d.getFullYear() + '-' + monthformt((d.getMonth() + 1)) + '-01';
        ddend += d.getFullYear() + '-' + monthformt((d.getMonth() + 1)) + '-' + monthformt(d.getDate());
        mmstr += d.getFullYear() + '-01';
        mmend += d.getFullYear() + '-' + monthformt((d.getMonth() + 1));
        hhstr += d.getFullYear() + '-' + monthformt((d.getMonth() + 1)) + '-' + monthformt(d.getDate()) + " " + monthformt(d.getHours()) + ":" + monthformt(d.getMinutes());

        var selectval = "";
        selectval = tid;
        switch (selectval) {
            case "hh":
                var Content = "<input class='Wdate w100' id=\"datepicker-start\" type=\"text\" onclick=\"WdatePicker({ name: 'blue', onpicked: function () { $(this).blur(); }, charset: 'gb2312', dateFmt: 'yyyy-MM-dd HH:00:00', maxDate: '#F{$dp.$D(\\'datepicker-end\\')||\\'2020-10-01\\'}'})\" />";
                $("#datepicker-con-start").html(Content);
                Content = "<input class='w100 Wdate' id=\"datepicker-end\" type=\"text\" onclick=\"WdatePicker({ name: 'blue', onpicked: function () { $(this).blur(); }, charset: 'gb2312', dateFmt: 'yyyy-MM-dd HH:00:00', minDate: '#F{$dp.$D(\\'datepicker-start\\')}', maxDate: '2020-10-01'})\" />";
                $("#datepicker-con-end").html(Content);
                break;
            case "D":
                var Content = "<input class='w100 Wdate' style=\"width:100px;\" id=\"datepicker-start\" type=\"text\" onclick=\"WdatePicker({ name: 'blue',onpicked: function () { $(this).blur(); }, charset: 'gb2312', dateFmt: 'yyyy-MM-dd', maxDate: '#F{$dp.$D(\\'datepicker-end\\')||\\'2020-10-01\\'}'})\" />";
                $("#datepicker-con-start").html(Content);
                Content = "<input class='w100 Wdate' id=\"datepicker-end\" type=\"text\" onclick=\"WdatePicker({ name: 'blue',onpicked: function () { $(this).blur(); }, charset: 'gb2312', dateFmt: 'yyyy-MM-dd', minDate: '#F{$dp.$D(\\'datepicker-start\\')}', maxDate: '2020-10-01'})\" />";
                $("#datepicker-con-end").html(Content);

                $("#datepicker-start").val(ddstr);
                $("#datepicker-end").val(ddend);
                break;
            case "M":
                var Content = "<input class='w100 Wdate' id=\"datepicker-start\" type=\"text\" onclick=\"WdatePicker({ name: 'blue', onpicked: function () { $(this).blur(); },charset: 'gb2312', dateFmt: 'yyyy-MM', maxDate: '#F{$dp.$D(\\'datepicker-end\\')||\\'2020-10-01\\'}'})\" />";
                $("#datepicker-con-start").html(Content);
                Content = "<input class='w100 Wdate' id=\"datepicker-end\" type=\"text\" onclick=\"WdatePicker({ name: 'blue',onpicked: function () { $(this).blur(); }, charset: 'gb2312', dateFmt: 'yyyy-MM', minDate: '#F{$dp.$D(\\'datepicker-start\\')}', maxDate: '2020-10-01'})\" />";
                $("#datepicker-con-end").html(Content);

                $("#datepicker-start").val(mmstr);
                $("#datepicker-end").val(mmend);
                break;
            default:
                break;
        }

    }

    //加载能源类型下拉框列表///////
    function LoadEnergyMode() {
        var str = "";
        $("#sele_energytype").find("p.text").text("电").attr("val", "E");
        str += "<li val='E'><a href=''>电</a></li>";
        str += "<li val='G'><a href=''>气</a></li>";
        str += "<li val='W'><a href=''>水</a></li>";
        $("#sele_energytype").find("ul").empty().append(str);
        $("#sele_energytype").simSelect({
            callback: function (x, v) {
                if (!x) return;
            }
        });
    }


function QueryList() {
    var starttime = $("#datepicker-start").val();
    var endtime = $("#datepicker-end").val();
    if (starttime == "" || endtime == "") { UEEPAlert("请正确选择日期"); return; }
    //var timetype = $("#sele_timetype").children("option:selected").val();
    QueryEquSpareList(1, 10, 0);
}
function QueryEquSpareList(pageindex, numberOfPages, flag) {
    $.ajax({
        type: "POST",//这里是http类型
        url: "/LimitWarn/PredictionList",//大家都应该很清楚了
        async: false,
        data: "currentPage=" + pageindex + "&numberOfPages=" + numberOfPages + "&timetype=" + $("#sele_timetype").find("p.text").attr("val")
           + "&energytype=" + $("#sele_energytype").find("p.text").attr("val")
            + "&datestr=" + $("#datepicker-start").val()
            + "&dataend=" + $("#datepicker-end").val(),//回传一个参数
        dataType: "json",//传回来的数据类型
        success: function (responseJSON) {
            $("#tb_container").empty();
            $("#th_container").empty();

            var type = "";
            var etype = "";
            type = $("#sele_timetype").find("p.text").attr("val");
            etype = $("#sele_energytype").find("p.text").attr("val");
            var unit = "kWh";
            if (etype == "E") {
                unit = "（kWh）";
            } else if (etype == "G")
            {
                unit = "（m3）";
            } else {
                unit = "（T）";
            }
            if (type == "D") {
                var th = "<tr>" +
                     "<td>" + "日期" +
                "</td>" +
                     "<td>" + "耗能名称" +
                "</td>" +
                     "<td>" + "日分配量" + unit +
                "</td>" +
                     "<td>" + "实际用量" + unit +
                "</td>" +
                     "<td>" + "可使用量" + unit +
                "</td>" +
                     "<td>" + "是否超标" +
                "</td>" +
             "</tr>";
                $("#th_container").append(th);
            } else {
                var th = "<tr>" +
                     "<td>" + "月份" +
                "</td>" +
                     "<td>" + "耗能名称" +
                "</td>" +
                     "<td>" + "月分配量" + unit +
                "</td>" +
                     "<td>" + "实际用量" + unit +
                "</td>" +
                     "<td>" + "可使用量" + unit +
                "</td>" +
                     "<td>" + "是否超标" +
                "</td>" +
             "</tr>";
                $("#th_container").append(th);
            }

            $("#tb_container").empty();
            $("#Pagination").empty();

            $.each(responseJSON.rows, function (n, value) {
                var str = "<tr>" +
                     "<td>" + value.period +
                "</td>" +
                     "<td>" + value.energytype +
                "</td>" +
                     "<td>" + value.value +
                "</td>" +
                     "<td>" + value.value1 +
                "</td>" +
                     "<td>" + value.value2 +
                "</td>" +
                     "<td>" +Convertrepairstate(value.is1) +
                "</td>" +
        "</tr>";
                $("#tb_container").append(str);
                $("#tb_container tr:odd").addClass("odd");
                //分页加载
                initDataPage(($("#tab-data tr").length - 1));
                PageControl(1, 10);
            });
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            UEEPAlert(XMLHttpRequest.responseText);
        }
    });
}

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
//空属性转值，防止出现null
function initstring(parameters) {
    if (parameters != null && parameters.length > 0) {
        return parameters;
    } else {
        return " ";
    }
}


function monthformt(str) {
    var strretlut = str;
    if (str < 10) {
        strretlut = '0' + str;
    }
    return strretlut;
}
//检修状态
function Convertrepairstate(repairstate) {
    var result = "1";
    switch (repairstate) {
        case '是':
            //result = "<span class=\"sb-td-ico\"><a class=\"ico-sbjx ico-Nomaintenance\"> </a><span>是</span></span>";
            result = "<span><a class=\"ico-sbjx ico-Nomaintenance\"> </a><span>是</span></span>";
            break;
        case '否':
            //result = "<span class=\"sb-td-ico\"><a class=\"ico-sbjx ico-Ongoingmaintenance\"> </a><span>否</span></span>";
            result = "<span><a class=\"ico-sbjx ico-Ongoingmaintenance\"> </a><span>否</span></span>";
            break;
        default:
    }
    return result;
}