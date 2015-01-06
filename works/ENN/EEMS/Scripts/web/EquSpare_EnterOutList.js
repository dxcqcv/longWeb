
$(document).ready(function () {
    $("#supplier_tr").show();
    $("#enternumber_tr").show();
    $("#receiptor_tr").hide();
    $("#outnumber_tr").hide();
    $("#flag").val(0);
    $("#supplier").val("");
    $("#enternumber").val("0");
    $("#receiptor").val("");
    $("#outnumber").val("0");
        QueryEnterOutList(1, 10, 0);
    });
function QueryEnterOutList(pageindex, numberOfPages, flag) {
    $.ajax({
        type: "POST",//这里是http类型
        url: "/EquSpare/EnterOutJsonList",//大家都应该很清楚了
        async: false,
        data: "currentPage=" + pageindex + "&numberOfPages=" + numberOfPages + "&name=" + $("#name").val(),//回传一个参数
        dataType: "json",//传回来的数据类型
        success: function (responseJSON) {
            $("#tb_container").empty();
            $("#Pagination").empty();
            $.each(responseJSON.rows, function (n, value) {
                var str = "<tr>" +
                "<td>" + initFlag(value.flag) +
                "</td>" +
                "<td>" + initstring(value.sparename) +
                "</td>" +
                     "<td>" + initstring(value.supplier) +
                "</td>" +
                     "<td>" + initstring(value.receiptor) +
                "</td>" +
                     "<td>" + initstring(value.recordtime) +
                "</td>" +
                     "<td>" + value.enternumber +
                "</td>" +
                     "<td>" + value.outnumber +
                "</td>" +
            "</tr>";
                $("#tb_container").append(str);
            });
            $("#tb_container tr:odd").addClass("odd");
            //分页加载
            initDataPage(($("#tab-data tr").length - 1));
            PageControl(1, 10);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            UEEPAlert(XMLHttpRequest.responseText);
        }
    });
}
///分页
function initDataPage(totalPage) {
    if (totalPage <= 10) { return false; }
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
//输入方式转值
function initFlag(flag) {
    if (flag == "0") {
        return "入库";
    }
    else if (flag == "1") {
        return "出库";
    }
    return " ";
}
//空属性转值，防止出现null
function initstring(parameters) {
    if (parameters != null && parameters.length > 0) {
        return parameters;
    } else {
        return " ";
    }
}
//出入库选定
function change(flag) {
    if (flag == "0") {
        $("#flag").val(0);
        $("#supplier_tr").show();
        $("#enternumber_tr").show();
        $("#receiptor_tr").hide();
        $("#outnumber_tr").hide();
    }
    else if (flag == "1") {
        $("#flag").val(1);
        $("#supplier_tr").hide();
        $("#enternumber_tr").hide();
        $("#receiptor_tr").show();
        $("#outnumber_tr").show();
    }
    $("#supplier").val("");
    $("#enternumber").val("0");
    $("#receiptor").val("");
    $("#outnumber").val("0");
}
//提交按钮执行
function SubmitAdd() {
    if ($("#flag").val() == "0") {
        if ($("#enternumber").val() < 1) {
            alert("入库数量必须大于0！");
            return;
        }
    }
    else if ($("#flag").val() == "1") {
        if ($("#outnumber").val() < 1) {
            alert("出库数量必须大于0！");
            return;
        }
    }
    if ($('#recordtime').val() =="") {
        alert("记录时间不能为空！");
        return;
    }
    $("#id").val($('#spareid').val());
    $("#sparename").val($("#spareid").find("option:selected").text());
    if (!$('#pageform').valid()) return;
    //提交，存入数据库
    $("#pageform").ajaxSubmit({
        type: 'post',
        url: "/EquSpare/EnterOut",
        success: function (data) {
            if (data == 'OK') {
                location.href = "/EquSpare/EnterOutList";
                //initData();
                //$.fancybox.close();
            } else {
                alert("编辑失败");
            }
        },
        error: function (XMLResponse) {
            alert(XMLResponse.responseText);
        }
    });
}
//加载数据
function LoadData() {
    $.ajax({
        type: "POST",//这里是http类型
        url: "/EquSpare/LoadEnterOutInfo",//大家都应该很清楚了
        async: false,
        data: { temp: Math.random() },//回传一个参数
        dataType: "json",//传回来的数据类型
        success: function (data) {
            if (data != null) {
                $("#id").val(data.id);
                $("#flag").val(data.flag);
                $("#supplier").val(data.supplier);
                $("#enternumber").val(data.enternumber);
                $("#receiptor").val(data.receiptor);
                $("#outnumber").val(data.outnumber);
                $("#recordtime").val(data.recordtime);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            UEEPAlert(XMLHttpRequest.responseText);
        }
    });
}
