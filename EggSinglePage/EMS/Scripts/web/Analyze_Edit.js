$(document).ready(function () {
    //BindEquList();
});
//关闭
function WinClose() {
    parent.$.fancybox.close();
}
//提价
function Submit() {
	$("#hid_pid").val($("#selectFX p.text").attr("val"));//为父id赋值
	$("#modulecode").val($("#selectMK p.text").text());//为父id赋值
	if (!$('#pageform').valid()) return;
    //提交，存入数据库
    $("#pageform").ajaxSubmit({
        type: 'post',
        url: "/Analyze/Edit",
        async: false,
        success: function (data) {
            if (data == 'OK') {
                $("#succ").val("1");
            } else {
                alert("计划添加失败");
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