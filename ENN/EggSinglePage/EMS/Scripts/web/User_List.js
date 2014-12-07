
$(document).ready(function () {
	LoadUserList();
	//BindRole();
	//handleMultiSelect();
});

//加载用户列表
function LoadUserList() {
    var aa = "";
	$.ajax({
		type: "POST",//这里是http类型
		url: "/User/LoadUserList",//大家都应该很清楚了
		data: { name: $("#name").val() },
		async: false,
		dataType: "json",//传回来的数据类型
		success: function (responseJSON) {
			var str = "";
			$.each(responseJSON, function (n, value) {
				if (n % 2 == 0)
					str += '<tr class="odd">';
				else
					str += '<tr class="even">';
				str += "<td>" + value.username + "</td>" +
                "<td>" + value.email + "</td>" +
                "<td>" + canState(value.state) + "</td>" +
                 "<td><a class=\"ico-bpgl ico-Update1 fancybox\" href=\"#pop-onupdate\" onclick=\"LoadUser(" + value.id + ")\"></a>" +
                "<a class=\"ico-bpgl ico-Add fancybox\" name=\"role\"  href=\"#pop-role\" onclick=\"LoadUserRole(" + value.id + ",'" + value.username + "')\"></a>" +
                "<a class=\"ico-bpgl ico-Set\" onclick=\"DeleteUser(" + value.id + ")\" ></a>" + "</td>" +
	            "</tr>";
			});
			$("#tb_container").empty().append(str);
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {

			UEEPAlert(XMLHttpRequest.responseText);

		}
	});
}

//分页
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
  //  $("#tab-data tr:last").show();
}

//修改密码带入用户数据
function SetPass(userid, password) {
    $("#pselect_id").val(userid);
    $("#pselect_password").val(password);
}

//修改用户，编辑，将当前条目数据引入
function EditData(id, username, password, email, state, regtime, lasttime) {
    $("#euserid").val("");
    $("#eusername").val("");
    $("#epassword").val("");
    $("#eemail").val("");
    $("#yesRadio").attr("checked", "checked");
    $("#noRadio").removeAttr("checked");
    $("#eregtime").val("");
    $("#elasttime").val("");

    $("#euserid").val(id);
    $("#eusername").val(username);
    $("#epassword").val(password);
    $("#epassword").attr("readonly", "readonly");
    $("#eemail").val(email);
    if (state == 1) {
        $("#yesRadio").attr("checked", "checked");
    }
    else if (state == 0) {
        $("#noRadio").attr("checked", "checked");
    }
    $("#eregtime").val(regtime);
    $("#elasttime").val(lasttime);
}

//新增用户
function AddData() {
    $("#euserid").val("-1");
    $("#eusername").val("");
    $("#epassword").removeAttr("readonly");
    $("#epassword").val("");
    $("#eemail").val("");
    $("#yesRadio").attr("checked", "checked");
    $("#noRadio").removeAttr("checked");
    $("#eregtime").val();
    $("#elasttime").val();
}

//设置权限初始化数据
function SetRole(userid, username) {
    $("#userid").val(userid);
    $("#ruserid").val(userid);
    $("#rusername").val(username);
    $("#my_multi_select1").empty();
    $.ajax({
        type: "POST",
        async: false,
        url: "/User/UserRoleList",
        data: { userid: userid },
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
    // handleMultiSelect();
}

//保存编辑数据
function UpdateEdit() {
    var id = $("#euserid").val();
    var username = $("#eusername").val();
    var password = $("#epassword").val();
    var email = $("#eemail").val();
    var state = "1";
    if (document.getElementById('yesRadio').checked) {
        state = "1";
    }
    else if (document.getElementById('noRadio').checked) {
        state = "0";
    }
    var regtime = $("#eregtime").val();
    var lasttime = $("#elasttime").val();
    $.ajax({
        type: "POST",
        async: false,
        url: "/User/UpEdit",
        data: { id: id, username: username, password: password, email: email, state: state, regtime: regtime, lasttime: lasttime },
        dataType: "json",//传回来的数据类型
        success: function (data) {
            if (data == "error") {
                UEEPAlert("操作报错！");
            } else {
                $.fancybox.close();
                initData(1, 10, 0);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            UEEPAlert(XMLHttpRequest.responseText);
        }
    });
}

//保存设置权限数据
function UpdateRole() {
    if ($("#userid").val().length > 0) {
        $.ajax({
            url: "/User/SetRole2",
            async: false,
            type: "POST",
            dataType: "json",
            data: "_rids=" + $("#my_multi_select1").val() + "&_userid=" + $("#userid").val(),
            success: function (data) {
                window.location.href = "/User/List";
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                UEEPAlert(XMLHttpRequest.responseText);
            }
        });
    }
    $.fancybox.close();
}

///删除用户
function DeleteUser(userid) {
    UEEPConfirm('确认删除吗？',function (r) {
        if (r == true) {
            location.href = "/User/delete/" + userid;
            LoadUserList();
            return true;
        } else {
            return false;
        }
    });
}

//执行修改密码
function InsManufacturer() {
    //if (!$('#signupForm').valid()) return;
    $.ajax({
        url: "/User/CheckOldPassWord",
        async: false,
        type: "POST",
        dataType: "json",
        data: { id: parseInt($("#pselect_id").val()), password: $("#oldpass").val() },
        success: function (data) {
            if (data == true) {
                if ($("#newpass").val() == $("#repeatnewpass").val() && $("#newpass").val().length > 0) {
                    $.ajax({
                        type: "POST",//这里是http类型
                        url: "/User/UpdatePassWord",//大家都应该很清楚了
                        async: false,
                        data: { id: parseInt($("#pselect_id").val()), newpassword: $("#newpass").val() },
                        dataType: "json",//传回来的数据类型
                        success: function (data) {
                            if (data == 'OK') {
                                UEEPAlert('密码修改成功！');
                                $.fancybox.close();
                            }
                        },
                        error: function (XMLHttpRequest, textStatus, errorThrown) {
                            UEEPAlert(XMLHttpRequest.responseText);
                        },
                    });
                    //禁用按钮的提交
                    return false;
                } else {
                    UEEPAlert("请核对输入数据！");
                    return false;
                }
            } else {
                UEEPAlert("旧密码错误！");
                return false;
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            UEEPAlert(XMLHttpRequest.responseText);
        }
    });

}

function QueryData() {
    //initData(1, 10, 0);
    LoadUserList();
}

function canState(state) {
    var str = "启用";
    if (state == 0) { str = "禁用"; }
    return str;
}

//读取用户信息，填写到用户新增修改弹出窗中
function LoadUser(userID)
{
	$.ajax({
		type: "POST",//这里是http类型
		url: "/User/LoadUser",//大家都应该很清楚了
		async: false,
		data: { id: userID, temp: Math.random() },//回传一个参数
		dataType: "json",//传回来的数据类型
		success: function (data) {
			if (data != null) {
				if (data.id > 0) {
					$("#pageform ul:eq(1)").hide();
					$("#username").prop("disabled", true);
				}
				else {
					$("#pageform ul:eq(1)").show();
					$("#username").prop("disabled", false);
				}

				$("#id").val(data.id);
				$("#username").val(data.username);
				$("#password").val(data.password);
				$("#email").val(data.email);
				$("#regtime").val(data.regtime);
				$("#lasttime").val(data.lasttime);
				$("input:radio[value='" + data.state + "']").prop("checked", true);
				//if (data.state == 1)
				//	$("#isshow_1").prop("checked", true);
				//else
				//	$("#isshow_0").prop("checked", true);
				//$("input[name=state]").val(data.state);
			}
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {

			UEEPAlert(XMLHttpRequest.responseText);

		}
	});
}

//读取用户角色信息，填写到用户角色修改弹出窗中
function LoadUserRole(userID, userName) {
	$("#userName1").text(userName);
	$("#userID1").val(userID);
	$.ajax({
		type: "POST",//这里是http类型
		url: "/User/LoadUserRole",//大家都应该很清楚了
		async: false,
		data: { userID: userID, temp: Math.random() },//回传一个参数
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

//提交用户信息
function Submit() {
	if (!$('#pageform').valid()) return;
	//提交，存入数据库
	$("#pageform").ajaxSubmit({
		type: 'post',
		url: "/User/Edit",
		async: false,
		success: function (data) {
			if (data == 'OK') {
				LoadUserList();
				$.fancybox.close();
			} else {
			    UEEPAlert("操作失败");
			}
		},
		error: function (XMLResponse) {
		    UEEPAlert(XMLResponse.responseText);
		}
	});
}

//提交用户角色信息
function SetRole() {
	var $roles = $("input[name='rolelist']:checked");
	if ($roles.length < 1) { UEEPAlert("请选择该用户拥有的角色！"); return; }
	var rids = "";
	$("input[name='rolelist']:checked").each(function (i, v) {
		rids += v.value + ",";
	});
	rids = rids.substring(0, rids.length - 1);
	$.ajax({
		url: "/User/SetRole",
		async: false,
		type: "POST",
		dataType: "json",
		data: { roleids: rids, userid: $("#userID1").val() },
		success: function (data) {
		    if (data == 'OK') { $.fancybox.close(); } else { UEEPAlert("操作失败"); }
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {

			UEEPAlert(XMLHttpRequest.responseText);

		}
	});
}