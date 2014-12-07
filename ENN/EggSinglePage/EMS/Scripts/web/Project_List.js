$(document).ready(function () {
    initData(1, 10, 0);
    var doc = $(document).height(),
        t   = $('.tTop').height(),
        c   = $('.tCont');
    var ch  = doc - t;
    c.height(ch);
    $(window).resize(function(){
    var doc = $(document).height(),
        t   = $('.tTop').height(),
        c   = $('.tCont');
    var ch  = doc - t;
    console.log('hi');
    c.height(ch);
    });
});
function initData(pageindex, numberOfPages, flag) {
    $.ajax({
        type: "POST",//这里是http类型
        url: "/Project/List",//大家都应该很清楚了
        async: false,
        data: "currentPage=" + pageindex + "&numberOfPages=" + numberOfPages + "&name=" + $("#name").val(),//回传一个参数
        dataType: "json",//传回来的数据类型
        success: function (responseJSON) {
            $("#tb_container").empty();
            $.each(responseJSON, function (n, value) {
                var str = "<tr>" +
                "<td>" + value.remark +
                "</td>" +
                "<td>" + value.key +
                "</td>" +
                "<td>" + value.value +
                "</td>" +
                "<td > <a class=\"ico-op ico-opUpdate fancybox\"  onclick=\"LoadData(" + value.id + ")\"  href=\"#pop-onupdate\"></a>" +
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
        url: "/Project/Edit",
        success: function (data) {
            if (data == 'OK') {
                location.href = "/Project/List";
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
        url: "/Project/LoadInfo",//大家都应该很清楚了
        async: false,
        data: { id: id, temp: Math.random() },//回传一个参数
        dataType: "json",//传回来的数据类型
        success: function (data) {
            if (data != null) {
                $("#id").val(data.id);
                $("#remark").val(data.remark);
                $("#key").val(data.key);
                $("#value").val(data.value);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            UEEPAlert(XMLHttpRequest.responseText);
        }
    });
}
