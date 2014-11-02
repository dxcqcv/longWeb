
    jQuery(document).ready(function () {
        BindRole();
        handleMultiSelect();
    });
function BindRole() {
    $.ajax({
        type: "POST",
        async: false,
        url: "/Navigation/NavRoleList",
        data: { navid: $("#navid").val() },
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
        }
    });
}
var handleMultiSelect = function () {
    $('#my_multi_select1').multiSelect();
}
$("#submit").click(function () {
    $.ajax({
        url: "/Navigation/SetRole",
        async: false,
        type: "POST",
        dataType: "json",
        data: "_rids=" + $("#my_multi_select1").val() + "&_navid=" + $("#navid").val(),
        success: function (data) {
            window.location.href = "/Navigation/List";
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            window.location.href = "/Navigation/List";
        }
    });
});
