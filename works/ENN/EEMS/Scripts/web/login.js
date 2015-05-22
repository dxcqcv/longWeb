$(function () {
    if ($.cookie("rmbUser") == "true") {
        $("#savePass").attr("checked", true);
        $("#form").find(".input input").parent(".input").addClass("on").find("span").fadeOut("fast");
        $("#loginname").val($.cookie("userName"));
        $("#password").val($.cookie("passWord"));
    }

    $(document).bind('keydown', function (e) {
        if (e.keyCode == 13) {//回车
            $("#btnSubmit").click();
        }
    });
    $("#form").find(".input input").focus(function () {
        $(this).parent(".input").addClass("on").find("span").fadeOut("fast");
    }).blur(function () {
        var $this = $(this);
        if ($this.val() == "") {
            $this.parent(".input").removeClass("on").find("span").fadeIn("fast")
        }
    });
})
//保存用户信息 
function isSaveUserInfo() {
    //是否保存密码
    if ($("#savePass").prop("checked") == true) {
        var userName = $("#loginname").val();
        var passWord = $("#password").val();
        $.cookie("rmbUser", "true", { expires: 7 }); // 存储一个带7天期限的 cookie 
        $.cookie("userName", userName, { expires: 7 }); // 存储一个带7天期限的 cookie 
        $.cookie("passWord", passWord, { expires: 7 }); // 存储一个带7天期限的 cookie 
    }
    else {
        $.cookie("rmbUser", "false", { expires: -1 });
        $.cookie("userName", '', { expires: -1 });
        $.cookie("passWord", '', { expires: -1 });
    }
}
function doLogin() {
    var name = $("#loginname").val().replace(/[ ]/g, "");
    if (name.length == 0) {
        jAlert('用户名或密码为空，请输入！', '提醒');

        $("#loginname").parent(".input").removeClass("on").find("span").fadeIn("fast")
        $("#sp1").focus();
        return false;
    }
    var password = $("#password").val().replace(/[ ]/g, "");
    if (password.length == 0) {

        jAlert('用户名或密码为空，请输入！', '提醒');
        $("#password").parent(".input").removeClass("on").find("span").fadeIn("fast")
        //$("#loginname").focus();
        $("#sp2").focus();
        return false;
    }
    //验证是否保存密码
    isSaveUserInfo();

    //document.forms[0].submit();
    //获取传递前台的参数，UName，Pwd，Code 
    var userInfo = {
        username: $("#loginname").val(),
        password: $("#password").val(),
    };
    //异步实现登录功能
    $.post("/Login/CheckUserLogin", userInfo, function (data) {
        if (data == "OK") {
            window.location.href = "/Navigation/index";
        }
        else {
            //alert(data);
            //UEEPAlert(data);
            jAlert(data, '提醒');
            //$("#loginname").val("");
            $("#password").val("");
            //$("#password").focus();
            // window.location.href = "/Login/Index/";
        }
    });
}