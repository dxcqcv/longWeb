$(document).ready(function () {
    initData(1, 10, 0);
});
function initData(pageindex, numberOfPages, flag) {
    $.ajax({
        type: "POST",//这里是http类型
        url: "/EquMaint/PagePlanRecordList",//大家都应该很清楚了
        async: false,
        data: { currentPage: parseInt(pageindex), numberOfPages: parseInt(numberOfPages), equname: $("#name").val(), stime: $("#stime").val(), etime: $("#etime").val() },//回传一个参数
        dataType: "json",//传回来的数据类型
        success: function (responseJSON) {
            $("#tb_container_0").empty();
            if (flag == 0) {
                $("#example").empty();
                if (responseJSON.total > 1) {
                    initDataPage(responseJSON.total);
                }
            }

            $.each(responseJSON.rows, function (n, value) {
                var but = "";
                if (value.repairstate == 0) {
                    but = "<button class=\"btn mini green\" onclick=\"location.href='/EquMaint/PlanRecordEdit/" + value.id + "'\" type=\"button\">记录检修结果</button>";
                }
                var str = "<tr>" +
                "<td>" + value.ClassInst.instancename +
                "</td>" +
                "<td>" + value.maintparts +
                "</td>" +
                "<td>" + value.plantime +
                "</td>" +
                "<td>" + value.maintcontent +
                "</td>" +
                "<td>" + value.alertdays +
                "</td>" +
                "<td>" + Convertrepairstate(value.repairstate) +
                "<td>" + but +
                "</td>" +
            "</tr>";
                $("#tb_container_0").append(str);
            });
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            UEEPAlert(XMLHttpRequest.responseText);
        }
    });
}
//生成计划分页
function initDataPage(totalPage) {
    var options = {
        currentPage: 1,
        numberOfPages: 5,
        totalPages: totalPage,
        size: 'normal',
        alignment: 'center',
        onPageClicked: function (e, originalEvent, type, page) {
            initData(page, 10, 1);
        }
    }
    $('#example_0').bootstrapPaginator(options);
}

//查询
function SeleUser() {
    initData(1, 10, 0);
}
//检修状态
function Convertrepairstate(repairstate) {
    var result = "1";
    switch (repairstate) {
        case 0:
            result = "未执行";
            break;
        case 1:
            result = "已执行";
            break;
        default:
    }
    return result;
}