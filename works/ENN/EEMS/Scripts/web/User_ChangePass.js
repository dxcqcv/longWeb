//执行修改
function UpdatePwd(){
    if (!$('#signupForm').valid()) return;
    $.ajax({
        type: "POST",//这里是http类型
        url: "/User/UpdatePassWord",//大家都应该很清楚了
        async: false,
        data: { id: $("#id").val(), newpassword: $("#newpass").val() },
        dataType: "json",//传回来的数据类型
        success: function (data) {
            if (data == 'OK') {
                $("#succ").val("1");
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            UEEPAlert(XMLHttpRequest.responseText);
        }
    });
    if ($("#succ").val() == '1') {
        WinClose();
    }
    //禁用按钮的提交
    return false;
}

$("#signupForm").validate({
    errorElement: "span",
    // 添加验证规则
    rules: {
        oldpass: {
            required: true,
            remote: {
                type: "post",
                url: "/User/CheckOldPassWord",
                data: {
                    id: function () {
                        return $("#id").val();
                    },
                    password: function () {
                        return $("#oldpass").val();
                    }
                },
                dataType: "html",
                dataFilter: function (data, type) {
                    if (data == "true") {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
            }
        },
        newpass: {
            required: true
        },
        repeatnewpass: {
            required: true,
            equalTo: '#newpass'
        }
    },
    success: function (label) {
        //正确时的样式
        label.text(" ").addClass("success");
    },
    //重设提示信息
    messages: {
        oldpass: {
            required: "请输入旧密码",
            remote: "密码错误"
        },
        newpass: {
            required: "请输入新密码"
        },
        repeatnewpass: {
            required: "请再次输入新密码",
            equalTo: "两次密码输入不一致"
        }
    }
});
//关闭
function WinClose() {
    parent.$.fancybox.close();
}