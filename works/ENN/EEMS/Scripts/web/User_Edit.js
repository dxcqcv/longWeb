function Submit() {
    if (!$('#pageform').valid()) return;
    //提交，存入数据库
    $("#pageform").ajaxSubmit({
        type: 'post',
        url: "/User/Edit",
        async: false,
        success: function (data) {
            if (data == 'OK') {
                $("#succ").val("1");
            } else {
                alert("操作失败");
            }
        },
        error: function (XMLResponse) {
            alert(XMLResponse.responseText);
        }
    });
    if ($("#succ").val() == '1') {
        WinClose();
    }
}
//关闭
function WinClose() {
    parent.$.fancybox.close();
}