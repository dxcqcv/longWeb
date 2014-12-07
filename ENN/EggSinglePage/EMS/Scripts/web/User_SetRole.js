
jQuery(document).ready(function () {
    BindRole();
    handleMultiSelect();
});
function BindRole() {
    $.ajax({
        type: "POST",
        async: false,
        url: "/User/UserRoleList",
        data: { userid: $("#userid").val() },
        dataType: "json",//传回来的数据类型
        success: function (responseJSON) {
            $.each(responseJSON.roleList, function (n, value) {
                var isOwner = false;
                $.each(responseJSON.userOwnerRole, function (m, v) {
                    if (v == value.id) {
                        isOwner = true;
                    }
                });
                if (isOwner) {
                    $("#my_multi_select1").append("<option selected=\"selected\"  value='" + value.id + "'>" + value.rolename + "</option>");
                }
                else {
                    $("#my_multi_select1").append("<option value='" + value.id + "'>" + value.rolename + "</option>");
                }
            });
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            UEEPAlert(XMLHttpRequest.responseText);
        },
    });
}
var handleMultiSelect = function () {
    $('#my_multi_select1').multiSelect();
}
function SetRole() {
    $.ajax({
        url: "/User/SetRole",
        async: false,
        type: "POST",
        dataType: "json",
        data: "_rids=" + $("#my_multi_select1").val() + "&_userid=" + $("#userid").val(),
        success: function (data) {
            $("#succ").val("1");
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $("#succ").val("1");
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