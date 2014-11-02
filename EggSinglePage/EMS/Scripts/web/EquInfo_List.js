
$(document).ready(function () {
    QueryEquInfoList();
});

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

function QueryEquInfoList() {
    $.ajax({
        type: "POST",//这里是http类型
        url: "/EquInfo/EquInfoList",//大家都应该很清楚了
        async: false,
        data: "name=" + $("#name").val() + "&className=" + $("#modelList").val(),//回传一个参数
        dataType: "json",//传回来的数据类型
        success: function (responseJSON) {
            $("#tb_container").empty();
            $("#Pagination").empty();
            $.each(responseJSON, function (n, value) {
                var str = "<tr>";
                    str += "<td>" + value.equname +
                        "</td>" +
                    "<td>" + initstring(value.modelname) +
                    "</td>" +
                    "<td>" + initstring(value.model) +
                    "</td>" +
                "<td>" + initstring(value.facturer) +
                "</td>" +
                     "<td>" + initstring(value.supplier) +
                "</td>" +
                     "<td>" + initstring(value.buytime) +
                "</td>" +
                     "<td>" + initstring(value.utilitytime) +
                "</td>" +
                     "<td>" + value.price +
                "</td>" +
                     "<td>" + initstring(value.position) +
                "</td>" +
                     "<td>" + initstring(value.equhead) +
                "</td>" +
                     "<td>" + initstring(value.equstate) +
                "<td > <a class=\"ico-op ico-opUpdate fancybox\" href=\"#pop-onupdate\" onclick=\"LoadData('" + value.equcode + "')\" ></a>" +
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

//空属性转值，防止出现null
function initstring(parameters) {
    if (parameters != null && parameters.length > 0) {
        return parameters;
    } else {
        return " ";
    }
}

//加载数据
function LoadData(equcode) {
    $.ajax({
        type: "POST",//这里是http类型
        url: "/EquInfo/LoadInfo",//大家都应该很清楚了
        async: false,
        data: { equcode: equcode, temp: Math.random() },//回传一个参数
        dataType: "json",//传回来的数据类型
        success: function (data) {
            if (data != null) {
                $("#id").val(data.id);
                $("#equcode").val(data.equcode);
                $("#equname").val(data.equname);
                $("#model").val(data.model);
                $("#facturer").val(data.facturer);
                $("#supplier").val(data.supplier);
                $("#buytime").val(data.buytime);
                $("#utilitytime").val(data.utilitytime);
                $("#price").val(data.price);
                $("#position").val(data.position);
                $("#equhead").val(data.equhead);
                $("#equstate").val(data.equstate);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            UEEPAlert(XMLHttpRequest.responseText);
        }
    });
}

//提交按钮执行
function SubmitAdd() {
    var buyTime=$("#buytime").val();
    var utilTime = $("#utilitytime").val();
    if (buyTime > utilTime)
    {
        UEEPAlert("购买时间应早于使用时间，请重新选择！");
        return;
    }
    if (!$('#pageform').valid()) return;
    //提交，存入数据库
    $("#pageform").ajaxSubmit({
        type: 'post',
        url: "/EquInfo/Edit",
        success: function (data) {
            if (data == 'OK') {
                location.href = "/EquInfo/List/" + $("#modelList")[0].selectedIndex;
                //initData();
                //$.fancybox.close();
            } else {
            	UEEPAlert("编辑失败");
            }
        },
        error: function (XMLResponse) {
            UEEPAlert('输入错误，请重新输入！');
        }
    });
}

//删除操作确认
function DeleteEquSpare(Id) {
    if (confirm("确认删除吗？")) {
        location.href = "/EquSpare/Delete/" + Id;
        return true;
    } else {
        return false;
    }
}