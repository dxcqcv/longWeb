
    $(document).ready(function () {
        QueryEquSpareList(1, 10, 0);
    });
function QueryEquSpareList(pageindex, numberOfPages, flag) {
    $.ajax({
        type: "POST",//这里是http类型
        url: "/EquSpare/SpareList",//大家都应该很清楚了
        async: false,
        data: "currentPage=" + pageindex + "&numberOfPages=" + numberOfPages + "&name=" + $("#name").val(),//回传一个参数
        dataType: "json",//传回来的数据类型
        success: function (responseJSON) {
            $("#tb_container").empty();
            $("#Pagination").empty();
            $.each(responseJSON.rows, function (n, value) {
                var str = "<tr>" +
                "<td>" + value.sparename +
                "</td>" +
                "<td>" + initstring(value.model) +
                "</td>" +
                     "<td>" + value.initstock +
                "</td>" +
                     "<td>" + value.price +
                "</td>" +
                     "<td>" + initstring(value.unit) +
                "</td>" +
                     "<td>" + initstring(value.facturer) +
                "</td>" +
                     "<td>" + initstring(value.supplier) +
                "</td>" +
                     "<td>" + initstring(value.position) +
                "</td>" +
                     "<td>" + initstring(value.remark) +
                "</td>" +
                "<td > <a class=\"ico-op ico-opUpdate fancybox\"  onclick=\"LoadData(" + value.id + ")\"  href=\"#pop-onupdate\"></a>" +
                "<a class=\"ico-bpgl ico-Set\"  onclick=\"Delete(" + value.id + ")\" ></a>" +
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
        },
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
//加载数据
function LoadData(id) {
    $.ajax({
        type: "POST",//这里是http类型
        url: "/EquSpare/LoadInfo",//大家都应该很清楚了
        async: false,
        data: { id: id, temp: Math.random() },//回传一个参数
        dataType: "json",//传回来的数据类型
        success: function (data) {
            if (data != null) {
                $("#id").val(data.id);
                $("#sparename").val(data.sparename);
                $("#model").val(data.model);
                $("#initstock").val(data.initstock);
                $("#price").val(data.price);
                $("#unit").val(data.unit);
                $("#facturer").val(data.facturer);
                $("#supplier").val(data.supplier);
                $("#position").val(data.position);
                $("#remark").val(data.remark);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            UEEPAlert(XMLHttpRequest.responseText);
        }
    });
}
//提交按钮执行
function SubmitAdd() {
    if (!$('#pageform').valid()) return;
    //提交，存入数据库
    $("#pageform").ajaxSubmit({
        type: 'post',
        url: "/EquSpare/Edit",
        success: function (data) {
            if (data == 'OK') {
                location.href = "/EquSpare/List";
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

//出入库
function EnterOut(id) {
    $.ajax({
        type: "POST",//这里是http类型
        url: "/EquSpare/LoadInfo",//大家都应该很清楚了
        async: false,
        data: { id: id, temp: Math.random() },//回传一个参数
        dataType: "json",//传回来的数据类型
        success: function (data) {
            if (data != null) {
                $("#id").val(data.id);
                $("#sparename").val(data.sparename);
                $("#model").val(data.model);
                $("#initstock").val(data.initstock);
                $("#price").val(data.price);
                $("#unit").val(data.unit);
                $("#facturer").val(data.facturer);
                $("#supplier").val(data.supplier);
                $("#position").val(data.position);
                $("#remark").val(data.remark);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            UEEPAlert(XMLHttpRequest.responseText);
        }
    });
}

//删除操作确认
function Delete(id) {
    if (confirm("确认删除吗？")) {
        location.href = "/EquSpare/delete/" + id;
        return true;
    } else {
        return false;
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
function SeleEquSpare() {
    QueryEquSpareList(1, 10, 0);
}
