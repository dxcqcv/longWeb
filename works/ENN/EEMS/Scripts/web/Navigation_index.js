//导航加载
$(document).ready(function () {
    $.ajaxSetup({
        cache: false
    });
    LoadMenuParent();
    $("#div_nav0").css('display', 'block');
    Tab();
    downPopup();
    QueryRemind();
    topNagation();
});
//导航
function topNagation() {
    $(".head .tab-panel ul li").each(function () {
        var img = $(this).attr("img");
        var hoverimg = $(this).attr("hoverimg");
        $(this).find(".ico").css("background-image", "url(" + img + ")");
        if ($(this).hasClass("on")) {
            $(this).find(".ico").css("background-image", "url(" + hoverimg + ")");
        }
    }).hover(function () {
        var hoverimg = $(this).attr("hoverimg");
        $(this).find(".ico").css("background-image", "url(" + hoverimg + ")");
    }, function () {
        if ($(this).hasClass("on")) {
            return false;
        }
        var img = $(this).attr("img");
        if ($(this).hasClass("on")) {
            $(this).find(".ico").css("background-image", "url(" + hoverimg + ")");
        }
        else {
            $(this).find(".ico").css("background-image", "url(" + img + ")");
        }

    });
}
// tab plugin
function Tab() {
    var tabs = $('.tab');
    if (!tabs.length) return;
    tabs.find('.tab-nav a').click(function (e) {
        e.preventDefault();
    });
    tabs.each(function () {
        var navs = $(this).find('.tab-nav li:not(.no)'),
			panels = $(this).find('.tab-panel');
        if ($(this).hasClass('tab-hover')) {
            navs.mouseenter(function () {
                var index = $(this).index();
                navs.removeClass('on active').eq(index).addClass('on');
                panels.hide().eq(index).show();
            });
            return;
        };
        navs.hover(function (e) {
            if (e.type == 'mouseenter') {
                $(this).addClass('active');
            } else {
                $(this).removeClass('active');
            };
        }).click(function () {
            var index = $(this).index();
            navs.removeClass('on active').eq(index).addClass('on');
            panels.hide().eq(index).show();
            panels.eq(index).find('li').removeClass('on active').eq(0).addClass('on');
            if (panels.eq(index).find('li').length != 0) {
                panels.eq(index).find('li').eq(0)[0].click();
                $("#iframe").attr("src", panels.eq(index).find('li').eq(0)[0].children['0'].href);
            }
        });
    })
}


function PopPwdDialog() {
    $('.changwps').fancybox({

        beforeShow: function () {


        },
        helpers: {
            overlay: { closeClick: false }
        },
        padding: 0
    });
}

function LoadMenuParent() {
    $.ajax({
        type: "POST",//这里是http类型
        url: "/Navigation/GetNav",//大家都应该很清楚了
        async: false,
        data: { pid: 0, temp: Math.random() },//回传一个参数
        dataType: "json",//传回来的数据类型
        success: function (responseJSON) {
            $(".pdl").empty();
            if (responseJSON.length > 0) {
                $.each(responseJSON, function (i, data) {
                    var str = "";
                    if (i == 0) {
                        if (data.name == "设备管理") {
                            str = "<li id=\"sbglNav\" class=\"on\"><a on style=\" text-decoration:none;\">" + data.name + "</a></li>";
                        } else {
                            str = "<li class=\"on\"><a on style=\" text-decoration:none;\">" + data.name + "</a></li>";
                        }
                    }
                    else {
                        if (data.name == "设备管理") {
                            str = "<li id=\"sbglNav\"><a style=\" text-decoration:none;\">" + data.name + "</a></li>";
                        } else  {
                            str = "<li><a style=\" text-decoration:none;\">" + data.name + "</a></li>";
                        }

                       
                    }
                   
                    $(".pdl").append(str);
                    _otherLevelHtml(data.id, i);
                });
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            UEEPAlert(XMLHttpRequest.responseText);
        }
    });

    $("#currUserName").text($("#uname").val());   
};
/* 多级代码 */
function _otherLevelHtml(pid, index) {
    $.ajax({
        type: "POST",//这里是http类型
        url: "/Navigation/GetNav",//大家都应该很清楚了
        async: false,
        data: { pid: pid, temp: Math.random() },//回传一个参数
        dataType: "json",//传回来的数据类型
        success: function (responseJSON) {
            var str = "";
            if (responseJSON.length > 0) {
                str = "<div class=\"tab-panel menubg\" id=\"div_nav" + index + "\">";
                str += " <ul class=\"nygl\">";
                $.each(responseJSON, function (i, data) {
                    if (i == 0) {
                        if (data.name == "设备检修管理") {
                            str += " <li id=\"sbjxglNav\" class=\"on\" img=\"" + data.bgurl + "\" hoverimg=\"" + data.bgurla + "\"><a class=\"nxfx\"  href= \"" + data.url + "\" target= \"iframe\"><span class=\"ico\"\ style=\"background-image:url('" + data.bgurla + "');\"></span><span class=\"txt\">" + data.name + "</span></a></li>";
                        } else {
                            str += " <li class=\"on\" img=\"" + data.bgurl + "\" hoverimg=\"" + data.bgurla + "\"><a class=\"nxfx\"  href= \"" + data.url + "\" target= \"iframe\"><span class=\"ico\"\ style=\"background-image:url('" + data.bgurla + "');\"></span><span class=\"txt\">" + data.name + "</span></a></li>";
                        }
                    }
                    else {
                        if (data.name == "设备检修管理") {
                            str += " <li id=\"sbjxglNav\" img=\"" + data.bgurl + "\" hoverimg=\"" + data.bgurla + "\"><a class=\"nxfx\" href= \"" + data.url + "\" target= \"iframe\"><span  class=\"ico\"></span><span class=\"txt\">" + data.name + "</span></a></li>";
                        } else {
                            str += " <li img=\"" + data.bgurl + "\" hoverimg=\"" + data.bgurla + "\"><a class=\"nxfx\" href= \"" + data.url + "\" target= \"iframe\"><span  class=\"ico\"></span><span class=\"txt\">" + data.name + "</span></a></li>";
                        }
                    }

                });
                str += "</ul></div>";
            }
            $("#div_top").append(str);
            secondTab($("#div_nav" + index + ""));
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            UEEPAlert(XMLHttpRequest.responseText);
        }
    });
}

//执行修改
function UpdatePwd() {
    if (!$('#signupForm').valid()) return;
    $("#signupForm").ajaxSubmit({
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

//执行修改
$("#but_update").click(function InsManufacturer() {
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
});

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
    $.fancybox.close();
}

function secondTab(div) {
    var secondnavs = div.find('li');
    secondnavs.each(function () {
        var second_navs = $(this).find('li:not(.no)');//二级导航
        //if ($(this).hasClass('tab-hover')) {
        //    secondnavs.mouseenter(function () {
        //        var index = $(this).index();
        //        secondnavs.removeClass('on active').eq(index).addClass('on');
        //        panels.hide().eq(index).show();
        //    });
        //    return;
        //};
        secondnavs.click(function () {
            var index = $(this).index();
            secondnavs.each(function (ine) {
                var hoverimg = $(this).attr("hoverimg");
                var img = $(this).attr("img");
                //alert(hoverimg + "---" + img);
                if (index != ine) {
                    $(this).find('span').eq(0).css("background-image", "url(" + img + ")");
                }
                else {
                    $(this).find('span').eq(0).css("background-image", "/Content/image/navigation/" + hoverimg + ".png\")");
                }
            });
            secondnavs.removeClass('on active').eq(index).addClass('on');
        });
    })
}

//下拉弹出
function downPopup() {
    var elem = $('.down-popup');
    if (!elem.length) return;
    elem.each(function () {
        var list = $(this).find('.list'),
			hand = $(this).find('.arr-group');
        $(this).hover(function (e) {
            if (e.type == 'mouseenter') {
                list.show();

            } else {
                list.hide();

            }
        });
        list.find('li').click(function () {
            list.hide();

        });
    });
}
//退出
function SignOut() {
    UEEPConfirm('确认退出吗？', function (r)
    {
		if (r == true) {
			$.ajax({
				type: "POST",//这里是http类型
				url: "/Navigation/SignOut",//大家都应该很清楚了
				async: false,
				data: { temp: Math.random() },//回传一个参数
				dataType: "json",//传回来的数据类型
				success: function (JSON) {
					if (JSON == 'OK') {
						location.href = "/Login/Index";
					}
				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {
					location.href = "/Login/Index";
					//alert(XMLHttpRequest.responseText);
				}
			});
		}
		else {
			return false;
		}
	});    
}

function EnterTip() {
    $("#sbglNav").click();
    $("#sbjxglNav").mouseenter();
    $("#sbjxglNav").click();
}

function QueryRemind() {
    $.ajax({
        type: "POST",//这里是http类型
        url: "/EquMaint/RemaindList",//获取要提醒的检修列表
        async: false,
        dataType: "json",//传回来的数据类型
        success: function (responseJSON) {
            $("#contentUl").empty();
            $("#numSpan").html(responseJSON.idlistr.length);
            var str = "<li><p>你有" + responseJSON.idlistr.length + "个新通知" + "</p></li>";
            for (var i = 0; i < responseJSON.idlistr.length; i++) {
                str += "<li><a onclick=EnterTip()><span class=\"label label-important\"></span>" + (parseInt(i) + 1) + "、" + responseJSON.infolistr[i].toString() + "</a></li>";
            }
            //str += "<li class=\"external\"><a href=\"/EquMaint/PlanManage\" target= \"iframe\">查看更多<i class=\"m-icon-swapright\"></i></a></li>";
            $("#contentUl").append(str);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            UEEPAlert(XMLHttpRequest.responseText);
        }
    });
}