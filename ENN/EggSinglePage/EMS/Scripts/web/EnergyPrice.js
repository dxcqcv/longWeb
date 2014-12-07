$(document).ready(function () {
    initData();
    var doc = $(document).height(),
        t = $('.tTop').height(),
        c = $('.tCont');
    var ch = doc - t;
    c.height(ch);
    $(window).resize(function () {
        var doc = $(document).height(),
            t = $('.tTop').height(),
            c = $('.tCont');
        var ch = doc - t;
        console.log('hi');
        c.height(ch);
    });
});
function initData() {
    $.ajax({
        type: "POST",//这里是http类型
        url: "/PriceManage/List",//大家都应该很清楚了
        async: false,
        data: "name=" + $("#name").val(),//回传一个参数
        dataType: "json",//传回来的数据类型
        success: function (responseJSON) {
            $("#tb_container").empty();
            $.each(responseJSON, function (n, value) {
                var str = "<tr>" +
                "<td>" + value.energyname +
                "</td>" +
                "<td>" + value.energycode +
                "</td>" +
                "<td>" + value.price +
                "</td>" +
                "<td>" + value.unit +
                "</td>" +
                "<td>" + value.memo +
                "</td>" +
                "<td ><a class=\"ico-op ico-opUpdate fancybox\"  onclick=\"LoadData(" + value.id + ")\"  href=\"#pop-onupdate\"></a>" +
                "</td>" +
            "</tr>";
                $("#tb_container").append(str);
                $("#tb_container tr:odd").addClass("odd");
            });
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
}

//提交按钮执行
function SubmitAdd() {
    if (!$('#pageform').valid()) return;
    var postData = $("#pageform").serializeArray();
    if (postData[2].value.toString().length == 0 || postData[3].value.toString().length == 0 || postData[4].value.toString().length == 0) {
        UEEPAlert("名称、编码、值为必填，请填写完整");
        return;
    }
    //提交，存入数据库
    $("#pageform").ajaxSubmit({
        type: 'post',
        url: "/PriceManage/Edit",
        success: function (data) {
            if (data == 'OK') {
                location.href = "/PriceManage/EnergyPrice";
                //initData();
                //$.fancybox.close();
            } else {
                UEEPAlert("添加失败");
            }
        },
        error: function (XMLResponse) {
            UEEPAlert(XMLResponse.responseText);
        }
    });
}
//加载数据
function LoadData(id) {
    $.ajax({
        type: "POST",//这里是http类型
        url: "/PriceManage/LoadInfo",//大家都应该很清楚了
        async: false,
        data: { id: id, temp: Math.random() },//回传一个参数
        dataType: "json",//传回来的数据类型
        success: function (data) {
            if (data != null) {
                $("#id").val(data.id);
                $("#energyname").val(data.energyname);
                $("#energycode").val(data.energycode);
                $("#price").val(data.price);
                $("#unit").val(data.unit);
                $("#memo").val(data.memo);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            UEEPAlert(XMLHttpRequest.responseText);
        }
    });
}
