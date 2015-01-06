$(document).ready(function () {
    initData(1, 10, 0);
});
function initData(pageindex, numberOfPages, flag) {
    $.ajax({
        type: "POST",//这里是http类型
        url: "/Role/List",//大家都应该很清楚了
        async: false,
        data: "currentPage=" + pageindex + "&numberOfPages=" + numberOfPages + "&name=" + $("#name").val(),//回传一个参数
        dataType: "json",//传回来的数据类型
        success: function (responseJSON) {
            $("#tb_container").empty();
            $.each(responseJSON, function (n, value) {
                var str = "<tr>" +
                "<td>" + value.rolename +
                "</td>" +
                "<td>" +( value.rolebiref==null?"":value.rolebiref) +
                "</td>" +
                "<td > <a class=\"ico-op ico-opUpdate fancybox\"  onclick=\"LoadData(" + value.id + ")\"  href=\"#pop-onupdate\"></a>" +
                "<a class=\"ico-bpgl ico-Set\" onclick=\"DeleteRole(" + value.id + ")\" ></a>" +
                "</td>" +
            "</tr>";
                $("#tb_container").append(str);
                $("#tb_container tr:odd").addClass("odd");
            });
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            UEEPAlert(XMLHttpRequest.responseText);
        },
    });
}
//提交按钮执行
function SubmitAdd() {
	if (!$('#pageform').valid()) return;
	$.postJSON("/Role/CheckRoleName", { id: $("#id").val(), rolename: $("#rolename").val() }, function (d) {
		if (d) { UEEPAlert("角色名称已经存在"); }
		else {
			//提交，存入数据库
			$("#pageform").ajaxSubmit({
				type: 'post',
				url: "/Role/Edit",
				success: function (data) {
					if (data == 'OK') {
						location.href = "/Role/List";
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
	});
}
//加载导航数据
function LoadData(id) {
    $.ajax({
        type: "POST",//这里是http类型
        url: "/Role/LoadRole",//大家都应该很清楚了
        async: false,
        data: { id: id, temp: Math.random() },//回传一个参数
        dataType: "json",//传回来的数据类型
        success: function (data) {
            if (data != null) {
                $("#id").val(data.id);
                $("#rolename").val(data.rolename);
                $("#rolebiref").val(data.rolebiref);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            UEEPAlert(XMLHttpRequest.responseText);
        }
    });
}
function DeleteRole(roleid) {
    UEEPConfirm('确认删除吗？',function (r) {
        if (r == true) {
            location.href = "/Role/delete/" + roleid;
            return true;
        } else {
            return false;
        }
    });
}
