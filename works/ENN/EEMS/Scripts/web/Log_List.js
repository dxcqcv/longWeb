$(document).ready(function () {
    var date = new Date;
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var d = date.getDate();
    month = (month < 10 ? "0" + month : month);
    d = (d < 10 ? "0" + d : d);
    var mydate = year.toString() + "-" + month.toString() + "-" + d.toString();
    $("#ntime").val(mydate);
    initData(1, 10, 0);
});
function initData(pageindex, numberOfPages, flag) {
    $.ajax({
        type: "POST",//这里是http类型
        url: "/Log/List",//大家都应该很清楚了
        async: false,
        data: "currentPage=" + pageindex + "&numberOfPages=" + numberOfPages + "&ntime=" + $("#ntime").val(),//回传一个参数
        dataType: "json",//传回来的数据类型
        success: function (responseJSON) {
            $("#tb_container").empty();
            $("#Pagination").empty();
            $.each(responseJSON, function (n, value) {
                var str = "<tr>" +
                "<td>" + value.username +
                "</td>" +
                "<td>" + value.recordtime +
                "</td>" +
                "<td style='width:600px'>" + value.loginfo +
                "</td>" +
            "</tr>";
                $("#tb_container").append(str);
                $("#tb_container tr:odd").addClass("odd");
            });
            //分页加载
            initDataPage(($("#tab-data tr").length - 1));
            PageControl(1, 10);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            UEEPAlert(XMLHttpRequest.responseText);
        }
    });
}

//分页
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
  //  $("#tab-data tr:last").show();
}
