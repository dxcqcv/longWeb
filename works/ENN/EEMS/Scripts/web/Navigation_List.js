
$(document).ready(function () {
    initData();
});
function initData() {
    $.ajax({
        type: "POST",//这里是http类型
        url: "/Navigation/List",//大家都应该很清楚了
        async: false,
        data: { temp: Math.random() },//回传一个参数
        dataType: "json",//传回来的数据类型
        success: function (responseJSON) {
            $("#tb_container").empty();
            $.each(responseJSON, function (n, value) {
                var str = "<tr>" +
                "<td  style=\"text-align: left;padding-left: 15px;\">" + can_level(value.level - 1, "一 ") + value.name +
                "</td>" +
                "<td>" + value.pname +
                "</td>" +
                "<td>" + value.url +
                "</td>" +
                "<td >" + value.ordernum +
                "</td>" +
                "<td ><img src=" + value.bgurl + " alt=\"\" />" + "<img src=" + value.bgurla + " alt=\"\" />" +
                "</td>" +
                "<td >" + can_states(value.isshow) +
                "</td>" +
                "<td > <a class=\"ico-bpgl ico-Update1 fancybox\" name=\"showhref\" onclick=\"LoadData(" + value.id + ")\"  href=\"#pop-onupdate\"></a>" +
                "<a class=\"ico-bpgl ico-Add fancybox\" name=\"showhref\" href=\"#pop-role\" onclick=\"LoadRole(" + value.id + ",'" + value.name + "')\" ></a>" +
                "<a class=\"ico-bpgl ico-Set\" onclick=\"DeleteUser(" + value.id + ")\" ></a>" +
                "</td>" +
                //"<td class=\"hidden-480\">" +
                //    "<button class=\"btn mini green\" onclick=\"location.href='/User/Edit/" + value.id + "'\" type=\"button\">编辑</button>" +
                //    "<button class=\"btn mini yellow\" onclick=\"UpdatePsss(" + value.id + ")\" type=\"button\">修改密码</button>" +
                //    "<button class=\"btn mini red\" onclick=\"DeleteUser(" + value.id + ")\" type=\"button\">删除</button>" +
                //    "<button class=\"btn mini blue\" onclick=\"location.href='/User/SetRole/" + value.id + "'\" type=\"button\">设置权限</button>" +
                //"</td>" +
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
//提价按钮执行
function SubmitPlanAdd() {
	$("#pid").val($("#navigationParent p.text").attr("val"));
    if (!$('#pageform').valid()) return;
    //提交，存入数据库
    $("#pageform").ajaxSubmit({
        type: 'post',
        url: "/Navigation/Edit",
        success: function (data) {
            if (data == 'OK') {
                location.href = "/Navigation/List";
                //initData();
                //$.fancybox.close();
            } else {
                UEEPAlert("计划添加失败");
            }
        },
        error: function (XMLResponse) {
            UEEPAlert(XMLResponse.responseText);
        }
    });
}
//执行
function SetRole() {
	var $roles = $("input[name='rolelist']:checked");
	if ($roles.length < 1) { UEEPAlert("请选择该用户拥有的角色！"); return; }
	var rids = "";
	$("input[name='rolelist']:checked").each(function (i, v) {
		rids += v.value + ",";
	});
	rids = rids.substring(0, rids.length - 1);
	$.ajax({
        url: "/Navigation/SetRole",
        async: false,
        type: "POST",
        dataType: "json",
        data: { roleids: rids, navid: $("#navID1").val() },
        success: function (data) {
            if (data == 'OK') { $.fancybox.close(); } else { UEEPAlert("操作失败"); }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {

        	UEEPAlert(XMLHttpRequest.responseText);

        }
    });
}
//加载导航数据
function LoadData(id) {
    $.ajax({
        type: "POST",//这里是http类型
        url: "/Navigation/LoadNav",//大家都应该很清楚了
        async: false,
        data: { id: id, temp: Math.random() },//回传一个参数
        dataType: "json",//传回来的数据类型
        success: function (data) {
            if (data != null) {
                $("#id").val(data.id);
                $("#pid").val(data.pid);
                $("#name").val(data.name);
                $("#url").val(data.url);
                $("#ordernum").val(data.ordernum);
                $("#bgurl").attr("src", data.bgurl);
                $("#bgurla").attr("src", data.bgurla);
                $("#ipt_bgurl").val(data.bgurl);
                $("#ipt_bgurla").val(data.bgurla);
                $("#img_source1").val();
                $("#img_source2").val();
                if (data.isshow = 1) {
                    $("#isshow_1").attr("checked", 'checked');
                }
                else {
                    $("#isshow_0").attr("checked", 'checked');
                }
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            UEEPAlert(XMLHttpRequest.responseText);
        }
    });
}
//初始化添加
function AddNav() {
    $("#id").val(0);
    $("#pid").val(0);
    $("#name").val('');
    $("#url").val('');
    $("#ordernum").val('');
    //$(".fileupload img").prop("src", "");
    $("#bgurl").prop("src", '');
    $("#bgurla").prop("src", '');
    $("#ipt_bgurl").val('');
    $("#ipt_bgurla").val('');
    $("#img_source1").val();
    $("#img_source2").val();
    $("#isshow_1").prop("checked", 'checked');
}
//加载权限数据
function LoadRole(navID, navName) {
	$("#navName1").text(navName);
	$("#navID1").val(navID);
	$.ajax({
		type: "POST",//这里是http类型
		url: "/Navigation/NavRoleList",//大家都应该很清楚了
		async: false,
		data: { navid: navID, temp: Math.random() },//回传一个参数
		dataType: "json",//传回来的数据类型
		success: function (data) {
			var $roleList = $("input[name='rolelist']");
			$roleList.prop("checked", false);
			$.each(data, function (n, value) {
				$roleList.filter("[value='" + value + "']").prop("checked", true);
			})
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			UEEPAlert(XMLHttpRequest.responseText);
		}
	});
}
function DeleteUser(userid) {
    UEEPConfirm('确认删除吗？',  function (r) {
        if (r == true) {
            location.href = "/Navigation/delete/" + userid;
            return true;
        } else {
            return false;
        }
    });
}
function SeleUser() {
    location.href = "/Navigation/List";
}
//状态转换
function can_states(ishow) {
    var str = "<a class=\"ico-status\"></a>";
    if (ishow == 0) {
        str = "<a class=\"ico-status ico-statusError\"></a>";
    }
    return str;
}
//级别转换
function can_level(level, replacestr) {
    var str2 = "";
    for (var i = 0; i < level; i++) {
        str2 = str2 + replacestr;
    }
    return str2;
}
//选择正常图标
function afterSelImage(){
	//$("#bgurl").prop("src", $("#f_bgurl").value);
}
//选择高亮图标
function afterSelImage() {

}