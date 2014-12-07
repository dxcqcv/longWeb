$(document).ready(function () {
    $(".all_manage").css("display", "none");
    monitorTab("page");
    $(".equ_manage_btn").attr("disabled", "disabled");
    $(".label_manage_btn").attr("disabled", "disabled");
    $(".page_init").attr("disabled", "disabled");
    $(".equ_init").attr("disabled", "disabled");
    $(".label_init").attr("disabled", "disabled");

    //项目id，后面考虑是否删掉
    $("#select_project").val("0");
    /*
		收缩展开左侧菜单方法
	
	$("#menu_btn").toggle( 
		function () { 
			$("#toolBox").css("display","none");
		}, 
		function () { 
			$("#toolBox").css("display","block");
		 } 
	);
	$("#menu_btn_bg").toggle( 
		function () { 
			$("#toolBox").css("display","block");
		 }, 
		function () { 
			$("#toolBox").css("display","none");
		} 
	);*/
    showToolBox();
    initSelectPage(null);
    BindClassInstSele();//绑定类实例下拉
});
function exchangeToolBox() {
    if ($("#toolBox").css("display") == 'block')
        $("#toolBox").css("display", "none");
    else
        $("#toolBox").css("display", "block");
}
function showToolBox() {
    var ab = new AlertBox("toolBox"), box = ab.box, x, y, flag = "page";
    ab.show();
}

jQuery(function () {
    $("#toolBox").easydrag();//给指定的标签绑定拖动效果，也可以是Class
    $("#toolBox").setHandler('toolTitle');//指定触发拖动的元素，handler是该元素的id，后面我们需要修改它
})
/*
	工具函数
	获取系windows系统颜色选择器
*/
var isIE = (document.all && window.ActiveXObject) ? true : false;
function pickColor(id) {
    if (!window.isIE) return;
    var sColor = document.getElementById('dlgHelper').ChooseColorDlg();
    var color = sColor.toString(16);
    while (color.length < 6) color = "0" + color;
    window.color = color;
    color = "#" + color;
    //document.getElementById(id).style.backgroundColor = color;
    document.getElementById(id).value = color;
}
/*
	工具函数
	以"px"分割字符串,返回像素值
*/
function split_Px(str) {
    var num = str.split("px")[0];
    return parseInt(num);
}
/*
	工具函数
	获取图片长宽
*/
var imgReady = (function () {
    var list = [], intervalId = null,
	// 用来执行队列
	tick = function () {
	    var i = 0;
	    for (; i < list.length; i++) {
	        list[i].end ? list.splice(i--, 1) : list[i]();
	    };
	    !list.length && stop();
	},

	// 停止所有定时器队列
	stop = function () {
	    clearInterval(intervalId);
	    intervalId = null;
	};

    return function (url, ready, load, error) {
        var onready, width, height, newWidth, newHeight,
			img = new Image();

        img.src = url;

        // 如果图片被缓存，则直接返回缓存数据
        if (img.complete) {
            ready.call(img);
            load && load.call(img);
            return;
        };

        width = img.width;
        height = img.height;

        // 加载错误后的事件
        img.onerror = function () {
            error && error.call(img);
            onready.end = true;
            img = img.onload = img.onerror = null;
        };

        // 图片尺寸就绪
        onready = function () {
            newWidth = img.width;
            newHeight = img.height;
            if (newWidth !== width || newHeight !== height ||
                // 如果图片已经在其他地方加载可使用面积检测
				newWidth * newHeight > 1024
			) {
                ready.call(img);
                onready.end = true;
            };
        };
        onready();

        /*由于图片是本地加载，onload与onready时间顺序冲突，导致两次返回，故注释掉，by man 2013-10-10
		// 完全加载完毕的事件
		img.onload = function () {
			// onload在定时器时间差范围内可能比onready快
			// 这里进行检查并保证onready优先执行
			!onready.end && onready();
		
			load && load.call(img);
			
			// IE gif动画会循环执行onload，置空onload即可
			img = img.onload = img.onerror = null;
		};*/

        // 加入队列中定期执行
        if (!onready.end) {
            list.push(onready);
            // 无论何时只允许出现一个定时器，减少浏览器性能损耗
            if (intervalId === null) intervalId = setInterval(tick, 40);
        };
    };
})();

/*
	工具函数
	校验是否全由整数组成
*/
function isInteger(s) {
    var reg = /^-?\d+$/;
    if (reg.test(s)) return true
    return false
}
/*
	工具函数
	校验是否全由正整数组成
*/
function isPositiveInteger(s) {
    var reg = /^\d+$/;
    if (reg.test(s)) return true
    return false
}
/*
	左侧切换
*/
function monitorTab(id) {
    $(".tab-hd-con").removeClass('tab_current_con');
    $("#tab_" + id).addClass('tab_current_con');
    $(".all_manage").css("display", "none");
    $("#" + id).css("display", "block");
}

/*
	页面标签id命名规则：
		页面级标签：
			(1)页面:外部容器,id固定
			(2)标题:page_title_(数据库MonitorPageParameter)pageid
		设备图形标签:
		    (数据库MonitorEquWidgetParameter)widgetid
		表单控件标签：
			monitor_widget_(数据库MonitorWidgetParameter)widgetid
*/
/*-----------------------------------------------------------监测页面操作函数----------------------------------------------------------*/
/*
	初始化页面表单
	切换页面时表单置为disabled
*/
function initPageDisabled() {
    $(".page_init").attr("disabled", "disabled");
    $(".page_control_btn").attr("disabled", "disabled");
    $(".class_title_adjust").attr("disabled", "disabled");
    $(".class_pgima_adjust").attr("disabled", "disabled");
}
/*
	初始化设备表单
	切换设备时表单置为disabled
*/
function initEquDisabled() {
    $(".equ_init").attr("disabled", "disabled");
    $(".equ_control_btn").attr("disabled", "disabled");
    $(".class_equ_adjust").attr("disabled", "disabled");
    $(":image").css("border", "none");
    $(":image").css("filter", "none");
}
/*
	初始化控件表单
	切换控件时表单置为disabled
*/
function initLabelDisabled() {
    $(".label_init").attr("disabled", "disabled");
    $(".label_control_btn").attr("disabled", "disabled");
    $(".class_label_adjust").attr("disabled", "disabled");
    $(".label_tag").css("border", "none");  //取消被选中
    $(".label_tag").css("filter", "none");  //取消被选中
    $("#show_properties").empty();
}
/*
	页面加载时进行初始化
*/
function initSelectPage(val) {
    var projectid = $("#select_project").val();
    $("input[name='projectid']").val(projectid);
    $("#select_page").empty();
    $("#select_page").append("<option value='0'>--请选择页面--</option>");
    var mode = "s";
    //$.ajax({
    //    type: "POST",//这里是http类型
    //    url: "/EquFault/InsStaffData",//大家都应该很清楚了
    //    async: false,
    //    data: "staffname=" + $("#manufacturer").val(),//回传一个参数
    //    dataType: "json",//传回来的数据类型
    //    success: function (data) {
    $.getJSON("/MonEnergy/queryMonitorPageList", { mode: mode, temp: Math.random() }, function (data) {
        if (data != null) {
            $.each(data, function (i, item) {
                $("#select_page").append("<option value='" + item.pageid + "'>" + item.title + "</option>");
            });
            if (val != null) {
                $("#select_page").val(val);
                var id = $("#select_page").val();
                var titleid = "page_title_" + id;
                viewPage();
                $(":input[name='pageid']").val(id);
                //$("#select_page").find(option[text=value]).attr(selected,true);
            }
        }
    });
}
/*
	根据页面id加载页面数据
*/
function loadPageData() {
    $(".class_title_adjust").attr("disabled", "disabled");
    $(".class_pgima_adjust").attr("disabled", "disabled");
    $(".page_alert").css("display", "none");
    $(".equ_alert").css("display", "none");
    $(".label_alert").css("display", "none");
    var pageid = $("#select_page").val();
    $.getJSON("/MonEnergy/queryMonitorPageOne", { pageid: pageid, temp: Math.random() }, function (data) {
        if (data != null && data.pageid != 0) {
            $("input[name='pageid']").val(data.pageid);         //加载全局页面pageid
            $("#page_show_id").val("page_" + data.pageid);
            $("#title").val(data.title);
            $("#titlex").val(data.titlex);
            $("#titley").val(data.titley);
            $("#fontsize").val(data.fontsize);
            $("#fontcolor").val(data.fontcolor);
            $("#titlewidth").val(data.titlewidth);
            $("#titleheight").val(data.titleheight);
            $("#titlebgcolor").val(data.titlebgcolor);
            $("#titleisshow").val(data.titleisshow);
            $("#titlebordercolor").val(data.titlebordercolor);//
            $("#pagewidth").val(data.pagewidth);
            $("#pageheight").val(data.pageheight);
            $("#pageimage").val(data.pageimage);
            $("#pgimagex").val(data.pgimagex);//
            $("#pgimagey").val(data.pgimagey);//
            $("#monitor_page").empty();
            $("#monitor_page").css({ "width": "1280px", "height": "620px", "z-index": "0", "background-color": "#FFFFFF", "background-repeat": "no-repeat" });
            viewPage();//加载页面底图显示
            ergodicEquWidget();//加载底图上的设备控件及属性控件
            $(".page_init").removeAttr("disabled");
            $(".equ_manage_btn").removeAttr("disabled");
            $(".label_manage_btn").removeAttr("disabled");
            $(".page_control_btn").removeAttr("disabled");
            initEmptyEquText();
            initEmptyLabelText();
            $(".page_alert").css("display", "none");
            $(".equ_alert").css("display", "none");
            $(".label_alert").css("display", "none");
        } else {
            initEmptyPageText();
        }
    });
}
/*
	初始化页面表单
	置为初始值
*/
function initEmptyPageText() {
    $("#pageid").val(0);
    $("#page_show_id").val("0");
    $("#title").val("请输入标题");
    $("#titlex").val(500);
    $("#titley").val(5);
    $("#fontsize").val('36');
    $("#fontcolor").val("#000000");
    $("#titlewidth").val(300);
    $("#titleheight").val(80);
    $("#titlebgcolor").val("#FFFFFF");
    $("#titleisshow").val("1");
    $("#titlebordercolor").val("#FFFFFF");
    $("#title_show").prop("checked", true)
    $("#pageimage").val("请上传底图");
    $("#pgimagex").val(0);
    $("pgimagey").val(0);
    isTitleShow();
    $(".class_title_adjust").attr("disabled", "disabled");
    $(".class_pgima_adjust").attr("disabled", "disabled");
}
/*
	创建页面
	清空页面数据表单及右侧图形区域页面标签,将select_page的值置为0
*/
var edittype = "-1";
function createPage() {
    edittype = "-1";
    $("#monitor_page").empty();
    $("#monitor_page").removeAttr("style");
    $("#monitor_page").css({ "width": "1280px", "height": "620px", "z-index": "0", "background-color": "#FFFFFF", "background-repeat": "no-repeat" });
    $("#select_page").val('0');
    initEmptyPageText();
    initEmptyEquText();
    initEmptyLabelText();
    $(".page_init").removeAttr("disabled");
    $(".page_control_btn").removeAttr("disabled");
    $(".equ_manage_btn").removeAttr("disabled");
    $(".label_manage_btn").removeAttr("disabled");
    $(".page_alert").css("display", "none");
    $(".equ_alert").css("display", "none");
    $(".label_alert").css("display", "none");
    $("#select_equ_widget").empty();
    $("#select_equ_widget").append("<option value='0'>--请选择设备控件--</option>");
    $("#select_monitor_widget").empty();
    $("#select_monitor_widget").append("<option value='0'>--请选择设备控件--</option>");
    $("#title").focus();
}
/*
	载入页面
	根据select_page确定页面id,查询数据库,在页面右侧图形区域生成页面全套图形
*/
function loadPage() {
    var pageid = $("#select_page").val();
    if (pageid == '0') {
        UEEPAlert("请选择页面");
        return;
    }
    loadPageData();
}
/*
	删除页面
	根据select_page确定页面id,查询数据库,级联删除全套图形数据
*/
function deletePage() {
    var pageid = $("#select_page").val();
    if (pageid == '0') {
        UEEPAlert("请选择页面");
        return;
    } else {
        UEEPConfirm('确定删除页面及对应设备控件、表单控件数据？',  function (r) {
            if (r == true) {
                $.post("/MonEnergy/deletePageAndAll", { pageid: pageid }, function () {
                    UEEPAlert("删除成功");
                    $("#select_page option[value='" + pageid + "']").remove();
                    createPage();
                    $(".equ_manage_btn").attr("disabled", "disabled");
                    $(".label_manage_btn").attr("disabled", "disabled");
                    $(".page_control_btn").attr("disabled", "disabled");
                    $(".equ_control_btn").attr("disabled", "disabled");
                    $(".label_control_btn").attr("disabled", "disabled");
                    $(".page_init").attr("disabled", "disabled");
                    $(".label_init").attr("disabled", "disabled");
                    $(".equ_init").attr("disabled", "disabled");
                });
            } else {
            }
        });
    }
}
//页面标题显示勾选控制
function isTitleShow() {
    var titleid = "page_title_" + $("#select_page").val();
    var flag = 0;//记录title是否被展示
    $("div").each(function () {
        var id = $(this).attr("id");
        if (id == titleid) {
            flag = 1;
        }
    });
    if ($("#title_show").prop("checked") == false) {
        //$(".class_title_show").attr("disabled","disabled");
        $(".class_title_adjust").attr("disabled", "disabled");
        $("#" + titleid).css("display", "none");
        $("#titleisshow").val('0')
    } else {
        //$(".class_title_show").removeAttr("disabled");
        $("#" + titleid).css("display", "block");
        $("#titleisshow").val('1')
        if (flag == 1) {
            $(".class_title_adjust").removeAttr("disabled");
        }
    }
}
/*
	预览页面,在右侧图形区域生成页面
*/
function viewPage() {
    var path = $("#path").val();
    var imgpath = path + "/" + $("#pageimage").val();
    var pgimagex = split_Px($("#pgimagex").val());
    var pgimagey = split_Px($("#pgimagey").val());
    var pagewidth = split_Px($("#pagewidth").val());
    var pageheight = split_Px($("#pageheight").val());

    if (imgpath == "") {
        UEEPAlert("请上传底图");
        return;
    }

    var flag_alert = 0;//记录page_alert是否显示
    $('.page_alert').each(
		function () {
		    if ($(this).css('display') == 'block') {
		        flag_alert = 1;
		    }
		});
    if (flag_alert != 0) {
        UEEPAlert("请录入正确信息");
        return;
    }

    var pg = "transparent  url(" + imgpath + ") scroll " + pgimagex + "px" + " " + pgimagey + "px";
    $("#monitor_page").css({ "background": pg, "width": pagewidth + "px", "height": pageheight + "px", "z-index": 0, "background-repeat": "no-repeat","background-size":"100% 100%" });
    $(".class_pgima_adjust").removeAttr("disabled");

    $("#page_title_0").remove();
    $(".class_title_adjust").removeAttr("disabled");
    var titleid = "page_title_" + $("#select_page").val();
    var titlex = $("#titlex").val();
    var titley = $("#titley").val();
    var titlewidth = $("#titlewidth").val();
    var titleheight = $("#titleheight").val();
    var fontsize = $("#fontsize").val();
    var fontcolor = $("#fontcolor").val();
    var titlebgcolor = $("#titlebgcolor").val();
    var titlebordercolor = $("#titlebordercolor").val();
    var title = $("#title").val();
    var flag = 0;//记录title是否被展示
    $("div").each(function () {
        var id = $(this).attr("id");
        if (id == titleid) {
            flag = 1;
        }
    });
    if (titlex >= 0 && (parseInt(titlex) + parseInt(titlewidth)) < pagewidth * 1) {
    } else {
        UEEPAlert("标题X轴边界溢出");
        return;
    }

    if (titley >= 0 && (parseInt(titley) + parseInt(titleheight)) < pageheight * 1) {
    } else {
        UEEPAlert("标题Y轴边界溢出");
        return;
    }

    var style = {
        "z-index": 4, "position": "absolute",
        "left": titlex + "px", "top": titley + "px", "width": titlewidth + "px", "height": titleheight + "px", "line-height": titleheight + "px",
        "text-align": "center", "font-size": fontsize + "px", "color": fontcolor, "background-color": titlebgcolor,
        "border": "1px solid " + titlebordercolor, "font-weight": "bold", "filter": "alpha(opacity = 70)", "-moz-opacity": 0.7, "pacity": 0.7
    };
    if (flag == 0) {
        var str = "<div id='" + titleid + "' class='title_tag'>" + title + "</div>";
        $("#monitor_page").append(str);
        $("#" + titleid).css(style);
    } else {
        $("#" + titleid).css(style);
    }

    if ($("#title_show").prop("checked") == true) {
        $("#" + titleid).css("display", "block");
    } else {
        $("#" + titleid).css("display", "none");
    }
}
/*
	提交页面数据
*/
function submitPageData() {
    var path = $("#path").val();
    var imgpath = path + "/" + $("#pageimage").val();
    //edittype 当前编辑框类型，-1时为新增，其他为修改
    var pageid = $("#select_page").val();
    $("#pageid").val(pageid);
    $("#page_show_id").val(pageid);
    var projectid = $("#select_project").val();
    $("#projectid").val(projectid);
    //if (imgpath == "" || $("#pageimage").val().substring(0, 1) != "i") {
    var title = $("#title").val();
    var id = "title";
    if (title.trim() == "") {
        $("#alert_" + id).empty().append("请输入标题").css("display", "block");
        return;
    }
    var flagAlert = 0;//记录page_alert是否显示
    $('.page_alert').each(
		function () {
		    if ($(this).css('display') == 'block') {
		        flagAlert = 1;
		    }
		});
    if (flagAlert != 0) {
        UEEPAlert("请录入正确信息");
        return;
    }
    var pagewidth = split_Px($("#pagewidth").val());
    var pageheight = split_Px($("#pageheight").val());
    var titleid = "page_title_" + $("#select_page").val();
    var titlex = $("#titlex").val();
    var titley = $("#titley").val();
    var titlewidth = $("#titlewidth").val();
    var titleheight = $("#titleheight").val();
    if (titlex >= 0 && (parseInt(titlex) + parseInt(titlewidth)) < pagewidth * 1) {
    } else {
        UEEPAlert("标题X轴边界溢出");
        return;
    }
    if (titley >= 0 && (parseInt(titley) + parseInt(titleheight)) < pageheight * 1) {
    } else {
        UEEPAlert("标题Y轴边界溢出");
        return;
    }
    var titleisshow = "1";
    if ($("#title_show").prop("checked") == true) {
        titleisshow = "1";
    } else {
        titleisshow = "0";
    }
    var titlebgcolor = $("#titlebgcolor").val();
    var pageimage = $("#pageimage").val();
    var fontsize = $("#fontsize").val();
    var mode = $("#mode").val();
    var fontcolor = $("#fontcolor").val();
    var pgimagex = $("#pgimagex").val();
    var pgimagey = $("#pgimagey").val();
    var titlebordercolor = $("#titlebordercolor").val();
    //提交，存入数据库
    $("#pageform").ajaxSubmit({
        type: 'post',
        url: "/MonEnergy/submitPageData",
        success: function (data) {
            if (data > 0) {
                UEEPAlert("设备标签数据提交成功");
                initSelectPage(data);
            } else {
                UEEPAlert("设备标签数据提交失败");
            }
        },
        error: function (XMLResponse) {
            UEEPAlert(XMLResponse.responseText);
        }
    });
}
/*
	标题微调函数
*/
function titleAdjust(advance) {
    var page_x = split_Px($("#monitor_page").css("width"));
    var page_y = split_Px($("#monitor_page").css("height"));
    var titleid = "page_title_" + $("#select_page").val();
    var x = split_Px($("#" + titleid).css("left"));
    var y = split_Px($("#" + titleid).css("top"));

    if (advance == 'up') {
        y = y - 2;
    } else
        if (advance == 'down') {
            y = y + 2;
        } else
            if (advance == 'left') {
                x = x - 2;
            } else {
                x = x + 2;
            }
    var width = split_Px($("#" + titleid).css('width')) + x;
    var height = split_Px($("#" + titleid).css('height')) + y;

    if (x >= 0 && width < page_x) {
        $("#" + titleid).css("left", x);
        $("#titlex").val(x);
    } else {
        UEEPAlert("标题X轴边界溢出");
    }
    if (y >= 0 && height < page_y) {
        $("#" + titleid).css("top", y);
        $("#titley").val(y);
    } else {
        UEEPAlert("标题Y轴边界溢出");
    }
}

/*
	底图微调函数
*/
function pgimgAdjust(advance) {
    var path = $("#path").val();
    var imgpath = path + "/" + $("#pageimage").val();
    var x = split_Px($("#pgimagex").val());
    var y = split_Px($("#pgimagey").val());
    if (advance == 'up') {
        y = y - 2;
    } else
        if (advance == 'down') {
            y = y + 2;
        } else
            if (advance == 'left') {
                x = x - 2;
            } else {
                x = x + 2;
            }
    $("#pgimagex").val(x);
    $("#pgimagey").val(y)
    var pg = "transparent  url(" + imgpath + ") scroll " + x + "px" + " " + y + "px";
    $("#monitor_page").css({ "background": pg, "background-repeat": "no-repeat" });
}
/*
	页面部分上传底图
*/
function uploadPageImg() {
    $("#pageform").attr("action", "/MonEnergy/uploadPageImage");
    var pageimage = $("#pageimage").val();
    if (pageimage != "") {
        var temp = new Array();
        temp = pageimage.toString().split(".");
        type = temp[temp.length - 1].toLocaleLowerCase();
        if (type != "png" && type != "bmp" && type != "gif" && type != "jpg" && type != "jpeg") {
            UEEPAlert("请选用图片格式");
            return;
        } else {
            $("#imgtype").val(type);
            $("#pageform").ajaxSubmit({
                type: 'post',
                url: "/MonEnergy/uploadPageImage",
                success: function (data) {
                    var imgpath = data.msg;
                    $("#pageimage").val(imgpath);
                    imgReady(imgpath, function () {
                        var imgwidth = this.width;
                        var imgheight = this.height;
                        var x = parseInt((1280 - imgwidth) / 2);
                        var y = parseInt((620 - imgheight) / 2);
                        $("#pgimagex").val(x);
                        $("#pgimagey").val(y);
                        /*
						if(x==0&&y==0){
							alert("底图上传成功，尺寸与页面匹配，无需调整。");
						}else{
							alert("底图上传成功，上传底图尺寸为"+imgwidth+"*"+imgheight+"，监测底页尺寸为1280*620，如需底图位置居中，底图坐标需调整为(x:"+x+",y:"+y+")。");  
						}*/
                    });
                },
                error: function (XmlHttpRequest, textStatus, errorThrown) {
                    UEEPAlert("error");
                }
            });
        }
    } else {
        UEEPAlert("请选择图片文件");
        return;
    }
}
/*
	整数警告框显示
*/
function checkInteger(value, id) {
    if (!isInteger(value)) {
        $("#alert_" + id).css("display", "block");
    } else {
        $("#alert_" + id).css("display", "none");
    }
}
/*
	正整数警告框显示
*/
function checkPositiveInteger(value, id) {
    if (!isPositiveInteger(value)) {
        $("#alert_" + id).css("display", "block");
    } else {
        $("#alert_" + id).css("display", "none");
    }
}
/*
	检验页面合法标题
*/
function checkTitle(value, id) {
    if (value.trim() == "") {
        $("#alert_" + id).empty().append("请输入标题").css("display", "block");
        return;
    } else {
        $("#alert_" + id).css("display", "none");
        var projectid = $("#select_project").val();
        var pageid = $("#select_page").val();
        $.getJSON("/MonEnergy/queryMonitorPageTitle", { title: encodeURI(value) }, function (data) {
            if (data.length != 0) {
                $.each(data, function (i, item) {
                    if (item.projectid == projectid) {
                        if (item.pageid != pageid) {
                            $("#alert_" + id).empty().append("标题重复").css("display", "block");
                            return;
                        } else {
                            $("#alert_" + id).css("display", "none");
                        }
                    } else {
                        $("#alert_" + id).css("display", "none");
                    }
                });
            } else {
                $("#alert_" + id).css("display", "none");
            }
        });
    }
}
/*-----------------------------------------------------------监测页面操作函数----------------------------------------------------------*/

/*-----------------------------------------------------------监测设备操作函数----------------------------------------------------------*/
/*
	遍历在页面展示所有设备控件
*/
function ergodicEquWidget() {
    var path = $("#path").val();
    var pageid = $("#select_page").val();
    $.getJSON("/MonEnergy/queryEquPage", { pageid: pageid, temp: Math.random() }, function (data) {
        if (data != null && data.length > 0) {
            $.each(data, function (i, item) {
                var str = "";
                var picpath = path + "/" + item.picturepath;
                str += "<div title=\"" + item.title + "\" style=\"z-index: 1;position: absolute;" + "left:" + item.x + "px;top:" + item.y + "px;\" id=\"equ_widget_" + item.widgetid + "\">";
                str += "<input  type=\"image\" id=\"equ_img_" + item.widgetid + "\" src =\"" + picpath + "\" style=\"width:" + item.width + "px;height:" + item.height + "px;\" ";
                str += "/></div>";
                $("#monitor_page").append(str);

                var equwidgetid = "equ_widget_" + item.widgetid;
                $("#" + equwidgetid).unbind();
                $("#" + equwidgetid).bind("click", function () {
                    loadEquWidget(item.widgetid);
                });
                //$("#"+equwidgetid).bind("click",);
                /*if(item.isclick=='1') {
					$("#"+equwidgetid).bind("click",function(){
					  alert("弹出设备详细动态属性页");
					});
				}else{
					$("#"+equwidgetid).unbind();
				}*/

                if (item.isshow == '1' || item.isshow == 'on') {
                    $("#" + equwidgetid).css("display", "block");
                } else {
                    $("#" + equwidgetid).css("display", "none");
                }
            });
        }
        ergodicLabelWidget();
    });
}
/*
	载入设备控件标签列表
*/
function initSelectEquWidget(widgetid) {
    //var projectid = $("#select_project").val();
    var pageid = $("#select_page").val();
    $("#select_equ_widget").empty();
    $("#select_equ_widget").append("<option value='0'>--请选择设备控件--</option>");
    $.ajax({
        type: "POST",//这里是http类型
        url: "/MonEnergy/queryEquInstList",//大家都应该很清楚了
        async: false,
        data: { pageid: parseInt(pageid), temp: Math.random() },//回传一个参数
        dataType: "json",//传回来的数据类型
        success: function (data) {
            if (data != null) {
                $.each(data, function (i, item) {
                    $("#select_equ_widget").append("<option value='" + item.widgetid + "'>" + item.title + "</option>");
                });
                if (widgetid != null) {
                    $("#select_equ_widget").val(widgetid);
                    //$("#select_equ_widget option[text='" + title + "']").attr("selected", true);
                    var id = $("#select_equ_widget").val();
                    $("#equ_show_id").val("equ_widget_" + id);
                    $("#equ_widget_0").remove();
                    viewEquWidget();
                }
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            UEEPAlert(XMLHttpRequest.responseText);
        }
    });
}
/*
	初始化树状关系设备列表
*/
var buf = "";
function initSelectEqu() {
    $(".classinstanceid").empty();
    $(".classinstanceid").append("<option value='0'>--请选择设备--</option>");
    buf = "";
    var projectid = $("#select_project").val();
    var url = "/MonEnergy/queryEquInstList";

    $.getJSON(url, { projectid: projectid }, function (data) {
        if (data.length != 0) {
            equRecursion(data[0], data, -1);
            $(".classinstanceid").append(buf);
        }
    });
}
/*
	初始化树状关系设备列表
	关系解析迭代
*/
function equRecursion(item, totallist, padding_left) {
    var totalsonlist = new Array();
    for (var i = 0; i < totallist.length; i++) {
        if (totallist[i].finstid == item.instid) {
            totalsonlist.push(totallist[i]);
        }
    }
    if (totalsonlist.length == 0) {
        buf += "<option value='" + item.instid + "'>" + item.instname + "</option>";
    } else {
        buf += "<option value='" + item.instid + "'>" + item.instname + "</option>";
        for (var i = 0; i < totalsonlist.length; i++) {
            equRecursion(totalsonlist[i], totallist, padding_left);
        }
    }
}
/*
	设备控件标题载入设备名称
*/
function initEquTitle(ischecked) {
    $("#equtitle").val("");
    var text = $("#select_classinst_equ").find("option:selected").text();
    var id = $("#select_classinst_equ").val();
    if (ischecked == true) {
        $("#equtitle").val(text.replace('一一一', "").replace('一一', ""));
    }
}
/*
	载入设备图形尺寸
*/
var w_h = 0; //记录图形宽高比
var h_w = 0; //记录图形高宽比
var imgpath = "";//记录设备图形路径
function initEquImgSize(width, height) {
    var path = $("#path").val();
    var equid = $("#select_classinst_equ").val();
    var url = "/equipment/queryEquclassinst";
    $.getJSON(url, { equid: equid }, function (data) {
        if (data != null) {
            imgpath = path + "/" + data.picturepath;
            $("#imgpath").val(imgpath);
            imgReady(path + "/" + data.picturepath, function () {
                if (width == null) {
                    $("#equwidth").val(this.width);
                } else {
                    $("#equwidth").val(width);
                }
                if (height == null) {
                    $("#equheight").val(this.height);
                } else {
                    $("#equheight").val(height);
                }
                w_h = this.width / this.height;
                h_w = this.height / this.width;
            });
        }
    });
}
/*
	计算图形尺寸，根据图形原尺寸等比缩放设备图形
*/
function computeImgSize(val) {
    var equwidth = $("#equwidth").val();
    var equheight = $("#equheight").val();
    if (val == 'w') {
        $("#equheight").val(parseInt(equwidth / w_h));
    } else {
        $("#equwidth").val(parseInt(equheight / h_w));
    }
}
/*
	页面对应设备部分上传设备图片
*/
function uploadPageImgEqu() {
    $("#equform").attr("action", "/MonEnergy/uploadPageImageEqu");
    var pageimage = $("#picturepath").val();
    if (pageimage != "") {
        var temp = new Array();
        temp = pageimage.toString().split(".");
        type = temp[temp.length - 1].toLocaleLowerCase();
        if (type != "png" && type != "bmp" && type != "gif" && type != "jpg" && type != "jpeg") {
            UEEPAlert("请选用图片格式");
            return;
        } else {
            $("#imgtype").val(type);
            $("#equform").ajaxSubmit({
                type: 'post',
                url: "/MonEnergy/uploadPageImageEqu",
                success: function (data) {
                    var imgpath = data.msg;
                    $("#picturepath").val(imgpath);
                    imgReady(imgpath, function () {
                        var imgwidth = this.width;
                        var imgheight = this.height;
                        var x = parseInt((1280 - imgwidth) / 2);
                        var y = parseInt((620 - imgheight) / 2);
                        $("#equx").val(x);
                        $("#equy").val(y);
                        /*
						if(x==0&&y==0){
							alert("底图上传成功，尺寸与页面匹配，无需调整。");
						}else{
							alert("底图上传成功，上传底图尺寸为"+imgwidth+"*"+imgheight+"，监测底页尺寸为1280*620，如需底图位置居中，底图坐标需调整为(x:"+x+",y:"+y+")。");  
						}*/
                    });
                },
                error: function (XmlHttpRequest, textStatus, errorThrown) {
                    UEEPAlert("error");
                }
            });
        }
    } else {
        UEEPAlert("请选择图片文件");
        return;
    }
}
/*
	初始化页面表单
	置为初始值
*/
function initEmptyEquText() {
    $("#select_equ_widget").val('0');
    $("#equ_show_id").val("equ_widget_0");
    $("#select_classinst_equ").val('0');
    $("#equtitle").val("请输入标题");
    $("#equx").val(100);
    $("#equy").val(100);
    $("#equwidth").val(100);
    $("#equheight").val(100);
    $("#equisshow").val("1");
    $("#equisclick").val("1");
    $("#equ_show").prop("checked", true)
    $("#equ_click").prop("checked", true)
    $("#equal_equ_title").prop("checked", false)
    isEquShow(null);
    isEquClick(null);
}
/*
	载入设备标签数据
*/
function loadEquWidgetData(equwidgetid) {
    $.getJSON("/MonEnergy/queryEquWidgetOne", { equwidgetid: equwidgetid, temp: Math.random() }, function (data) {
        if (data.widgetid > 0) {
            $("#equ_show_id").val("equ_widget_" + data.widgetid);
            $("#select_classinst_equ").val(data.classinstanceid);
            $("#equtitle").val(data.title);
            $("#equx").val(data.x);
            $("#equy").val(data.y);
            $("#equisshow").val(data.isshow);
            $("#equisclick").val(data.isclick);
            if (data.isshow == '1') {
                $("#equ_show").prop("checked", true);
            } else {
                $("#equ_show").prop("checked", false);
            }
            if (data.isclick == '1') {
                $("#equ_click").prop("checked", true);
            } else {
                $("#equ_click").prop("checked", false);
            }
            initEquImgSize(data.width, data.height);
            $(".equ_control_btn").removeAttr("disabled");
            $(".equ_init").removeAttr("disabled");
            $(".equ_alert").css("display", "none");
            isEquShow(null);
            isEquClick(null);
            $("#picturepath").val(data.picturepath);
            var equimgid = "equ_img_" + data.widgetid;
            $(":image").css("border", "none");
            $(":image").css("filter", "none");
            $("#" + equimgid).css("border", "1px dotted #0033FF");
            $("#" + equimgid).css("filter", "Glow(color=#4A7AC9,strength=12)");
        } else {
            initEmptyEquText();
        }
    });
}
/*
	新建设备控件
*/
function createEquWidget() {
    $(":image").css("border", "none");
    $(":image").css("filter", "none");
    initEmptyEquText();
    $(".equ_control_btn").removeAttr("disabled");
    $(".equ_init").removeAttr("disabled");
    $(".equ_alert").css("display", "none");
}
/*
	载入设备控件
	在表单中载入当前设备控件数据，在页面上以红边框标识该控件位置
*/
function loadEquWidget(equwidgetid) {
    //var equwidgetid=$("#select_equ_widget").val();
    monitorTab("equipwidget");
    $("#select_equ_widget").val(equwidgetid);
    if (equwidgetid == '0') {
        initEquDisabled();
    } else {
        loadEquWidgetData(equwidgetid);
    }

}
/*
	删除设备控件
*/
function deleteEquWidget() {
    var equwidgetid = $("#select_equ_widget").val();
    if (equwidgetid == '0') {
        UEEPAlert("请选择设备控件");
        return;
    } else {
        UEEPConfirm('确定要删除设备控件？', function (r) {
            if (r == true) {
                $.get("/MonEnergy/deleteEquWidgetOne", { equwidgetid: equwidgetid }, function() {
                    UEEPAlert("删除成功");
                    $("#select_equ_widget option[value='" + equwidgetid + "']").remove();
                    initEmptyEquText();
                    var divid = "equ_widget_" + equwidgetid;
                    $("#" + divid).remove();
                });
            } else {
            }
        });
    }
}
/*
	预览设备控件
*/
function viewEquWidget() {
    var equx = split_Px($("#equx").val());
    var equy = split_Px($("#equy").val());
    var equwidth = split_Px($("#equwidth").val());
    var equheight = split_Px($("#equheight").val());
    var equtitle = $("#equtitle").val();
    var widgetid = $("#select_equ_widget").val();
    var equwidgetid = "equ_widget_" + $("#select_equ_widget").val();
    var equimgid = "equ_img_" + $("#select_equ_widget").val();
    var equid = $("#select_classinst_equ").val();
    var path = $("#path").val();
    var imgpath = path + "/" + $("#picturepath").val();
    if (equid == '0') {
        $("#alert_equ_id").empty().append("请选择设备").css("display", "block");
        return;
    }

    if (equtitle.trim() == "") {
        $("#alert_equ_title").empty().append("请输入标题").css("display", "block");
        return;
    }
    var flag_alert = 0;//记录equ_alert是否显示
    $('.equ_alert').each(
		function () {
		    if ($(this).css('display') == 'block') {
		        flag_alert = 1;
		    }
		});
    if (flag_alert != 0) {
        UEEPAlert("请录入正确信息");
        return;
    }
    var flag = 0;//记录equ是否被展示
    $("div").each(function () {
        var id = $(this).attr("id");
        if (id == equwidgetid) {
            flag = 1;
        }
    });

    var page_x = split_Px($("#monitor_page").css("width"));
    var page_y = split_Px($("#monitor_page").css("height"));

    if (equx >= 0 && (equx + equwidth) < page_x) {
    } else {
        UEEPAlert("设备标签X轴边界溢出");
        return;
    }
    if (equy >= 0 && (equy + equheight) < page_y) {
    } else {
        UEEPAlert("设备标签Y轴边界溢出");
        return;
    }

    //"filter":"FILTER: progid:DXImageTransform.Microsoft.BasicImage(grayscale=1)"  灰色滤镜
    $(":image").css("border", "none");
    $(":image").css("filter", "none");
    var style = { "z-index": 1, "position": "absolute", "left": equx + "px", "top": equy + "px" };
    var img_style = { "width": equwidth + "px", "height": equheight + "px", "border": "1px dotted #0033FF", "filter": "Glow(color=#4A7AC9,strength=12)" };
    var img = "<input type=\"image\" id=\"" + equimgid + "\"  src=\"" + imgpath + "\" style=\"width:" + equwidth + "px; height:" + equheight + "px\"/>"
    if (flag == 0) {
        var str = "<div id=\"" + equwidgetid + "\" class=\"equ_tag\" title=\"" + equtitle + "\"></div>";
        $("#monitor_page").append(str);
        $("#" + equwidgetid).empty();
        $("#" + equwidgetid).append(img);
        $("#" + equwidgetid).css(style);
        $("#" + equimgid).css(img_style);
    } else {
        $("#" + equimgid).attr("src", imgpath);
        $("#" + equwidgetid).css(style);
        $("#" + equimgid).css(img_style);
    }
    if (widgetid != 0) {
        $("#" + equwidgetid).unbind();
        $("#" + equwidgetid).bind("click", function () {
            loadEquWidget(widgetid);
        });
    }

    isEquClick(null);
    isEquShow(null);
}
/*
	提交设备控件数据
*/
function submitEquWidget() {
    var pageid = $("#select_page").val();
    if (pageid == '0') {
        alert("请先提交页面数据");
        return;
    } else {
        $("#pageid_equ").val(pageid);
    }
    var equwidgetid = $("#select_equ_widget").val();
    $("#equwidgetid").val(equwidgetid);
    var equtitle = $("#equtitle").val();
    var equid = $("#select_classinst_equ").val();
    if (equid == '0') {
        $("#alert_equ_id").empty().append("请选择设备").css("display", "block");
        return;
    }
    if (equtitle.trim() == "") {
        $("#alert_equ_title").empty().append("请输入标题").css("display", "block");
        return;
    }
    var flag_alert = 0;//记录equ_alert是否显示
    $('.equ_alert').each(
		function () {
		    if ($(this).css('display') == 'block') {
		        flag_alert = 1;
		    }
		});
    if (flag_alert != 0) {
        alert("请录入正确信息");
        return;
    }

    var equx = split_Px($("#equx").val());
    var equy = split_Px($("#equy").val());
    var equwidth = split_Px($("#equwidth").val());
    var equheight = split_Px($("#equheight").val());
    var page_x = split_Px($("#monitor_page").css("width"));
    var page_y = split_Px($("#monitor_page").css("height"));

    if (equx >= 0 && (equx + equwidth) < page_x) {
    } else {
        alert("设备标签X轴边界溢出");
        return;
    }
    if (equy >= 0 && (equy + equheight) < page_y) {
    } else {
        alert("设备标签Y轴边界溢出");
        return;
    }

    $("#equform").ajaxSubmit({
        type: 'post',
        url: "/MonEnergy/submitEquWidgetData",
        success: function (data) {
            if (data > 0) {
                alert("设备标签数据提交成功");
                initSelectEquWidget(data);
                //initLabelClassintanceid();
            } else {
                alert("设备标签数据提交失败");
            }
        },
        error: function (XMLResponse) {
            alert(XMLResponse.responseText);
        }
    });
}
/*
	设备勾选控制是否显示
*/
function isEquShow(id) {
    var equwidgetid;
    if (id == null) {
        equwidgetid = "equ_widget_" + $("#select_equ_widget").val();
    } else {
        equwidgetid = "equ_widget_" + id;
    }
    if ($("#equ_show").prop("checked") == false) {
        $(".class_equ_adjust").attr("disabled", "disabled");
        $("#" + equwidgetid).css("display", "none");
        $("#equisshow").val('0')
    } else {
        $("#" + equwidgetid).css("display", "block");
        $("#equisshow").val('1')
        var flag = 0;//记录equ是否被展示
        $("div").each(function () {
            var id = $(this).attr("id");
            if (id == equwidgetid) {
                flag = 1;
            }
        });
        if (flag == 1) {
            $(".class_equ_adjust").removeAttr("disabled");
        }
    }
}
/*
	设备勾选控制是否响应点击
*/
function isEquClick(id) {
    var equwidgetid;
    if (id == null) {
        equwidgetid = "equ_widget_" + $("#select_equ_widget").val();
    } else {
        equwidgetid = "equ_widget_" + id;
    }
    //$("#"+equwidgetid).unbind();
    if ($("#equ_click").prop("checked") == true) {
        $("#equisclick").val('1')
        //$("#"+equwidgetid).bind("click",function(){
        //  alert("弹出设备详细动态属性页");
        //});
    } else {
        $("#equisclick").val('0')
        //$("#"+equwidgetid).unbind();
    }
}

/*
	设备控件调整
*/
function equAdjust(advance) {
    var page_x = split_Px($("#monitor_page").css("width"));
    var page_y = split_Px($("#monitor_page").css("height"));
    var widgetid = "equ_widget_" + $("#select_equ_widget").val();
    var x = split_Px($("#" + widgetid).css("left"));
    var y = split_Px($("#" + widgetid).css("top"));
    if (advance == 'up') {
        y = y - 2;
    } else
        if (advance == 'down') {
            y = y + 2;
        } else
            if (advance == 'left') {
                x = x - 2;
            } else {
                x = x + 2;
            }

    var width = split_Px($("#" + widgetid).css("width")) + x;
    var height = split_Px($("#" + widgetid).css("height")) + y;

    if (x >= 0 && width < page_x) {
        $("#" + widgetid).css("left", x);
        $("#equx").val(x);
    } else {
        alert("设备标签X轴边界溢出");
    }
    if (y >= 0 && height < page_y) {
        $("#" + widgetid).css("top", y);
        $("#equy").val(y);
    } else {
        alert("设备标签Y轴边界溢出");
    }
}
/*
	检验页面设备绑定是否重复
*/
function checkEquID(value) {
    if (value == "0") {
        $("#alert_equ_id").empty().append("请选择设备").css("display", "block");
        return;
    } else {
        $("#alert_equ_id").css("display", "none");
        var projectid = $("#select_project").val();
        var pageid = $("#select_page").val();
        var widgetid = $("#select_equ_widget").val();
        $.getJSON("/MonEnergy/queryMonitorEquid", { classinstanceid: value }, function (data) {
            if (data.length != 0) {
                $.each(data, function (i, item) {
                    if (item.projectid == projectid) {
                        if (item.pageid == pageid) {
                            if (item.widgetid != widgetid) {
                                $("#alert_equ_id").empty().append("设备重复").css("display", "block");
                                return;
                            } else {
                                $("#alert_equ_id").css("display", "none");
                            }
                        } else {
                            $("#alert_equ_id").css("display", "none");
                        }
                    } else {
                        $("#alert_equ_id").css("display", "none");
                    }
                });
            } else {
                $("#alert_equ_id").css("display", "none");
            }
        });
    }
}
/*
	检验页面设备标签名称是否重复
*/
function checkEquTitle(value) {
    if (value.trim() == "") {
        $("#alert_equ_title").empty().append("请输入标题").css("display", "block");
        return;
    } else {
        $("#alert_equ_title").css("display", "none");
        var projectid = $("#select_project").val();
        var pageid = $("#select_page").val();
        var widgetid = $("#select_equ_widget").val();
        $.getJSON("/MonEnergy/queryMonitorEquTitle", { title: encodeURI(value) }, function (data) {
            if (data.length != 0) {
                $.each(data, function (i, item) {
                    if (item.projectid == projectid) {
                        if (item.pageid == pageid) {
                            if (item.widgetid != widgetid) {
                                $("#alert_equ_title").empty().append("标题重复").css("display", "block");
                                return;
                            } else {
                                $("#alert_equ_title").css("display", "none");
                            }
                        } else {
                            $("#alert_equ_title").css("display", "none");
                        }
                    } else {
                        $("#alert_equ_title").css("display", "none");
                    }
                });
            } else {
                $("#alert_equ_title").css("display", "none");
            }
        });
    }
}
/*-----------------------------------------------------------监测设备操作函数----------------------------------------------------------*/

/*-----------------------------------------------------------监测控件操作函数----------------------------------------------------------*/
var showList = new Array(); //存储所选设备动态属性数组
var unitsList = new Array();//存储单位数组
/*
	遍历在页面展示所有监测控件
*/
function ergodicLabelWidget() {
    var path = $("#path").val();
    var pageid = $("#select_page").val();
    var url = "/MonEnergy/queryMonitorLabelList";
    $.getJSON(url, { pageid: pageid }, function (data) {
        if (data != null && data.length > 0) {
            $.each(data, function (i, item) {
                var labelx = item.x;
                var labely = item.y;
                var labelwidth = item.width;
                var labelheight = item.height;
                var labeltitle = item.title;
                var arrowstyle = item.arrowstyle;
                var labelfontsize = item.fontsize;
                var labelfontcolor = item.fontcolor;
                var labelid = "monitor_widget_" + item.widgetid;
                var labelborderid = "label_border_" + item.widgetid;
                var classinstanceid = item.classinstanceid;
                var labelborder = "<div id=\"" + labelborderid + "\" class=\"label_tag\" title=\"" + labeltitle + "\" style=\"cursor:hand\"></div>"
                var labelborder_style = { "z-index": 3, "position": "absolute", "left": labelx + "px", "top": labely + "px" };
                var labeltable = "<table cellpadding=\"0\" cellspacing=\"0\" border=\"0\">" +
									//"<tr><td ></td>" +
									//"<td class=\"" + labelborderid + " td1 up\" ></td>" +
									//"<td class=\"" + labelborderid + " td2 up\" ></td>" +
									//"<td class=\"" + labelborderid + " td3 up\" ></td>" +
									//"<td ></td></tr>" +
									"<tr>" +
										//"<td class=\"" + labelborderid + " td12 left\" ></td>" +
										//"<td id=\"" + labelid + "\" rowspan=\"3\" colspan=\"3\"></td>" +
                    	"<td id=\"" + labelid + "\"></td>" +
										//"<td class=\"" + labelborderid + " td4 right\" ></td>" +
									"</tr>" +
									//"<tr><td class=\"" + labelborderid + " td11 left\" ></td><td class=\"" + labelborderid + " td5 right\"></td></tr>" +
									//"<tr><td class=\"" + labelborderid + " td10 left\" ></td><td class=\"" + labelborderid + " td6 right\"></td></tr>" +
									//"<tr><td></td>" +
									//"<td class=\"" + labelborderid + " td9 down\" ></td>" +
									//"<td class=\"" + labelborderid + " td8 down\" ></td>" +
									//"<td class=\"" + labelborderid + " td7 down\" ></td>" +
									//"<td></td></tr>" +
								"</table>";
                //var table_style = { "width": labelwidth + "px", "height": labelheight + "px", "font-size": labelfontsize + "px", "color": labelfontcolor, "background-color": "#328CB8", "filter": "alpha(opacity = 70); -moz-opacity: 0.7; pacity: 0.7" }
                var table_style = { "width": labelwidth + "px", "height": labelheight + "px", "font-size": labelfontsize + "px", "color": labelfontcolor, "background-color": "#328CB8" };

                $(".label_tag").css("border", "none");
                $(".label_tag").css("filter", "none");
                $("#monitor_page").append(labelborder);
                $("#" + labelborderid).empty();
                $("#" + labelborderid).append(labeltable);
                $("#" + labelborderid).unbind();
                $("#" + labelborderid).bind("click", function () {
                    loadLabel(item.widgetid);
                });
                $("#" + labelborderid).css(labelborder_style);
                $("." + labelborderid).empty();
                var arrow = '';
                if (arrowstyle == '1' || arrowstyle == '2' || arrowstyle == '3') {
                    arrow = "<img src=\"" + path + "/images/project/arrow_top.gif\" style=\"vertical-align: left; margin-bottom: -1px;filter: alpha(opacity = 70); -moz-opacity: 0.7; pacity: 0.7;\">";
                    $("." + labelborderid + ".up").attr("width", "33%");
                } else
                    if (arrowstyle == '4' || arrowstyle == '5' || arrowstyle == '6') {
                        arrow = "<img src=\"" + path + "/images/project/arrow_right.gif\" style=\"vertical-align: left; margin-left: -3px;filter: alpha(opacity =   70); -moz-opacity: 0.7; pacity: 0.7;\">";
                        $("." + labelborderid + ".right").append("&nbsp;");
                    } else
                        if (arrowstyle == '7' || arrowstyle == '8' || arrowstyle == '9') {
                            arrow = "<img src=\"" + path + "/images/project/arrow_bottom.gif\" style=\"vertical-align: left; margin-bottom: -1px;filter: alpha(opacity = 70); -moz-opacity: 0.7; pacity: 0.7;\">";
                            $("." + labelborderid + ".down").attr("width", "33%");
                        } else
                            if (arrowstyle == '10' || arrowstyle == '11' || arrowstyle == '12') {
                                arrow = "<img src=\"" + path + "/images/project/arrow_left.gif\" style=\"vertical-align: left; margin-bottom: -1px;filter: alpha(opacity = 70); -moz-opacity: 0.7; pacity: 0.7;\">";
                                $("." + labelborderid + ".left").append("&nbsp;");
                            }
                $("." + labelborderid + ".td" + arrowstyle).empty();
                $("." + labelborderid + ".td" + arrowstyle).append(arrow);
                $("#" + labelid).css(table_style);

                if (item.isshow == '1') {
                    $("#" + labelborderid).css("display", "block");
                } else {
                    $("#" + labelborderid).css("display", "none");
                }
                initWatchTable(item.properties, labelid, table_style, labelfontsize);
                //var labelproperties = new Array(); //控件设备属性
                //var labelunits = new Array();      //控件单位
                //if (item.units != null) {
                //    labelunits = item.units.split(",");
                //}

                //var url = "/MonEnergy/queryLabelProperties";
                //$.getJSON(url, { properties: item.properties }, function (json) {
                //    if (json != null) {
                //        $.each(json, function (i, item) {
                //            var element = {
                //                id: item.classpropertyid,
                //                name: item.classpropertyname,
                //                unit: ' '
                //            }
                //            labelproperties.push(element);
                //        });
                //        initWatchTable(labelid, table_style, labelfontsize);
                //    }
                //});
            }); //each结束
        }//if结束
    });
}
/*
	载入设备控件标签列表
*/
function initSelectMonitorWidget(widgetid) {
    var pageid = $("#select_page").val();
    $("#select_monitor_widget").empty();
    $("#select_monitor_widget").append("<option value='0'>--请选择监测控件--</option>");
    var url = "/MonEnergy/queryMonitorLabelList";
    $.getJSON(url, { pageid: pageid, temp: Math.random() }, function (data) {
        if (data != null) {
            $.each(data, function (i, item) {
                $("#select_monitor_widget").append("<option value='" + item.widgetid + "'>" + item.title + "</option>");
            });
            if (widgetid != null) {
                $("#select_monitor_widget").val(widgetid);
                var id = $("#select_monitor_widget").val();
                $("#label_show_id").val("monitor_widget_" + id);
                $("#label_border_0").remove();
                viewLabel();
            }
        }
    });
}
/*
	新建监测表单控件
*/
function createLabel() {
    initEmptyLabelText();
    $(".label_control_btn").removeAttr("disabled");
    $(".label_init").removeAttr("disabled");
    $(".label_alert").css("display", "none");
    $(".label_tag").css("border", "none");
    $(".label_tag").css("filter", "none");
}
/*
	载入监测表单控件
*/
function loadLabel(labelwidgetid) {
    //var labelwidgetid=$("#select_monitor_widget").val();
    monitorTab('labelwidget');
    $("#select_monitor_widget").val(labelwidgetid);
    if (labelwidgetid == '0') {
        initLabelDisabled();
    } else {
        loadLabelWidgetData(labelwidgetid);
    }
}
/*
	删除监测表单控件
*/
function deleteLabel() {
    var labelwidgetid = $("#select_monitor_widget").val();
    if (labelwidgetid == '0') {
        alert("请选择监测控件");
        return;
    } else {
        UEEPConfirm('确定要删除监测控件？', function (r) {
            if (r == true) {
                $.get("/MonEnergy/deleteLabelWidgetOne", { labelwidgetid: labelwidgetid }, function() {
                    alert("删除成功");
                    $("#select_monitor_widget option[value='" + labelwidgetid + "']").remove();
                    initEmptyLabelText();
                    var divid = "label_border_" + labelwidgetid;
                    $("#" + divid).remove();
                });
            } else {
            }
        });
    }
}
/*
	预览监测表单
*/
function viewLabel() {
    var path = $("#path").val();
    unitsList.length = 0;
    $(".property_unit").each(
		function () {
		    var val = $(this).attr("value");
		    unitsList.push(val);
		}
	);
    var labelx = split_Px($("#labelx").val());
    var labely = split_Px($("#labely").val());
    var labelwidth = split_Px($("#labelwidth").val());
    var labelheight = split_Px($("#labelheight").val());
    var labeltitle = $("#labeltitle").val();
    var arrowstyle = $("#arrowstyle").val();
    var labelfontsize = $("#labelfontsize").val();
    var labelfontcolor = $("#labelfontcolor").val();
    var labelid = "monitor_widget_" + $("#select_monitor_widget").val();
    var labelborderid = "label_border_" + $("#select_monitor_widget").val();
    var classinstanceid = $("#select_classinst_prop").val();
    var widgetid = $("#select_monitor_widget").val();
    if (classinstanceid == '0') {
        $("#alert_label_instid").empty().append("请选择设备").css("display", "block");
        return;
    }
    if (labeltitle.trim() == "") {
        $("#alert_label_title").empty().append("请输入标题").css("display", "block");
        return;
    }
    var flag_alert = 0;//记录equ_alert是否显示
    $('.label_alert').each(
		function () {
		    if ($(this).css('display') == 'block') {
		        flag_alert = 1;
		    }
		});
    if (flag_alert != 0) {
        alert("请录入正确信息");
        return;
    }
    var flag = 0;//记录label是否被展示
    $("div").each(function () {
        var id = $(this).attr("id");
        if (id == labelid) {
            flag = 1;
        }
    });

    var page_x = split_Px($("#monitor_page").css("width"));
    var page_y = split_Px($("#monitor_page").css("height"));

    if (labelx >= 0 && (labelx + labelwidth) < page_x) {
    } else {
        alert("表单标签X轴边界溢出");
        return;
    }
    if (labely >= 0 && (labely + labelheight) < page_y) {
    } else {
        alert("表单标签Y轴边界溢出");
        return;
    }

    var labelborder = "<div id=\"" + labelborderid + "\" class=\"label_tag\" title=\"" + labeltitle + "\" style=\"cursor:hand\"></div>"
    var labelborder_style = { "z-index": 3, "position": "absolute", "left": labelx + "px", "top": labely + "px" };
    var labeltable = "<table cellpadding=\"0\" cellspacing=\"0\">" +
						"<tr><td ></td>" +
						"<td class=\"" + labelborderid + " td1 up\" ></td>" +
						"<td class=\"" + labelborderid + " td2 up\" ></td>" +
						"<td class=\"" + labelborderid + " td3 up\" ></td>" +
						"<td ></td></tr>" +
						"<tr>" +
							"<td class=\"" + labelborderid + " td12 left\" ></td>" +
							"<td id=\"" + labelid + "\" rowspan=\"3\" colspan=\"3\"></td>" +
							"<td class=\"" + labelborderid + " td4 right\" ></td>" +
						"</tr>" +
						"<tr><td class=\"" + labelborderid + " td11 left\" ></td><td class=\"" + labelborderid + " td5 right\"></td></tr>" +
						"<tr><td class=\"" + labelborderid + " td10 left\" ></td><td class=\"" + labelborderid + " td6 right\"></td></tr>" +
						"<tr><td></td>" +
						"<td class=\"" + labelborderid + " td9 down\" ></td>" +
						"<td class=\"" + labelborderid + " td8 down\" ></td>" +
						"<td class=\"" + labelborderid + " td7 down\" ></td>" +
						"<td></td></tr>" +
					"</table>";
    var table_style = { "width": labelwidth + "px", "height": labelheight + "px", "font-size": labelfontsize + "px", "color": labelfontcolor, "background-color": "#328CB8", "filter": "alpha(opacity = 70); -moz-opacity: 0.7; pacity: 0.7" }
    $(".label_tag").css("border", "none");
    $(".label_tag").css("filter", "none");
    if (flag == 0) {
        $("#monitor_page").append(labelborder);
        $("#" + labelborderid).empty();
        $("#" + labelborderid).append(labeltable);
    }
    $("#" + labelborderid).css(labelborder_style);
    $("#" + labelborderid).css("border", "1px dotted #00FF00"); //标识被选中
    $("#" + labelborderid).css("filter", "Glow(color=#00FF00,strength=12)");
    $("." + labelborderid).empty();
    if (widgetid != 0) {
        $("#" + labelborderid).unbind();
        $("#" + labelborderid).bind("click", function () {
            loadLabel(widgetid);
        });
    }
    var arrow = '';
    if (arrowstyle == '1' || arrowstyle == '2' || arrowstyle == '3') {
        arrow = "<img src=\"" + path + "/images/project/arrow_top.gif\" style=\"vertical-align: left; margin-bottom: -1px;filter: alpha(opacity = 70); -moz-opacity: 0.7; pacity: 0.7;\">";
        $("." + labelborderid + ".up").attr("width", "33%");
    } else
        if (arrowstyle == '4' || arrowstyle == '5' || arrowstyle == '6') {
            arrow = "<img src=\"" + path + "/images/project/arrow_right.gif\" style=\"vertical-align: left; margin-left: -3px;filter: alpha(opacity =   70); -moz-opacity: 0.7; pacity: 0.7;\">";
            $("." + labelborderid + ".right").append("&nbsp;");
        } else
            if (arrowstyle == '7' || arrowstyle == '8' || arrowstyle == '9') {
                arrow = "<img src=\"" + path + "/images/project/arrow_bottom.gif\" style=\"vertical-align: left; margin-bottom: -1px;filter: alpha(opacity = 70); -moz-opacity: 0.7; pacity: 0.7;\">";
                $("." + labelborderid + ".down").attr("width", "33%");
            } else
                if (arrowstyle == '10' || arrowstyle == '11' || arrowstyle == '12') {
                    arrow = "<img src=\"" + path + "/images/project/arrow_left.gif\" style=\"vertical-align: left; margin-bottom: -1px;filter: alpha(opacity = 70); -moz-opacity: 0.7; pacity: 0.7;\">";
                    $("." + labelborderid + ".left").append("&nbsp;");
                }
    $("." + labelborderid + ".td" + arrowstyle).empty();
    $("." + labelborderid + ".td" + arrowstyle).append(arrow);
    var table_style = { "width": labelwidth + "px", "height": labelheight + "px", "font-size": labelfontsize + "px", "color": labelfontcolor, "background-color": "#328CB8", "filter": "alpha(opacity = 70); -moz-opacity: 0.7; pacity: 0.7" }
    $("#" + labelid).css(table_style);
    var properties = '';
    $.each($("#equ_property").val(), function (i, val) {
        properties += val + ","; //这里得到的就是
    });
    initWatchTable(properties, labelid, table_style, labelfontsize);
    isLabelShow(null);
}
/*
	生成监测控件数据内容
*/
function initWatchTable(properties, labelid, style, labelfontsize) {
    //var properties = '';
    //$.each($("#equ_property").val(), function (i, val) {
    //    properties += val + ","; //这里得到的就是
    //});
    $("#" + labelid).html("");
    $.getJSON("/MonEnergy/GetCodeInfo", { properties: properties, temp: Math.random() }, function (data) {
        var str = "<table id=\"data_" + labelid + "\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">";
        $.each(data, function (i, item) {
            str += "<tr><td align=\"right\">" + item.propname + "：</td>";
            str += "<td align=\"center\" width=\"50px\"><input type=\"text\" readonly=\"readonly\" value=\"0.00\" class=\"input_border\" style=\"font-size:" + labelfontsize + "px\"/></td>";
            str += "<td align=\"left\" width=\"30px\">" + item.unit + "</td></tr>";
        });
        str += "</table>";
        $("#" + labelid).append(str);
        $("#data_" + labelid).css(style);
    });
}
/*
	提交表单数据
*/
function submitLabel() {
    var pageid = $("#select_page").val();
    if (pageid == '0') {
        alert("请先提交页面数据");
        return;
    } else {
        $("#pageid_label").val(pageid);
    }
    unitsList.length = 0;
    $(".property_unit").each(
		function () {
		    var val = $(this).attr("value");
		    unitsList.push(val);
		}
	);
    var properties = new Array();
    for (var i = 0; i < showList.length; i++) {
        properties.push(showList[i].id);
    }
    $("#properties").val(properties.toString());
    $("#units").val(unitsList.toString());
    var labelwidgetid = $("#select_monitor_widget").val();
    $("#labelwidgetid").val(labelwidgetid);
    var labeltitle = $("#labeltitle").val();
    var classinstanceid = $("#select_classinst_prop").val();
    if (classinstanceid == '0') {
        $("#alert_label_instid").empty().append("请选择设备").css("display", "block");
        return;
    }
    if (labeltitle.trim() == "") {
        $("#alert_label_title").empty().append("请输入标题").css("display", "block");
        return;
    }
    var flag_alert = 0;//记录label_alert是否显示
    $('.label_alert').each(
		function () {
		    if ($(this).css('display') == 'block') {
		        flag_alert = 1;
		    }
		});
    if (flag_alert != 0) {
        alert("请录入正确信息");
        return;
    }

    var labelx = split_Px($("#labelx").val());
    var labely = split_Px($("#labely").val());
    var labelwidth = split_Px($("#labelwidth").val());
    var labelheight = split_Px($("#labelheight").val());
    var page_x = split_Px($("#monitor_page").css("width"));
    var page_y = split_Px($("#monitor_page").css("height"));

    if (labelx >= 0 && (labelx + labelwidth) < page_x) {
    } else {
        alert("表单标签X轴边界溢出");
        return;
    }
    if (labely >= 0 && (labely + labelheight) < page_y) {
    } else {
        alert("表单标签Y轴边界溢出");
        return;
    }

    $("#labelform").ajaxSubmit({
        type: 'post',
        url: "/MonEnergy/submitLabelWidgetData",
        success: function (data) {
            var jsonData = jQuery.parseJSON(data);
            if (data > 0) {
                initSelectMonitorWidget(data);
            } else {
                alert("表单标签数据提交失败");
            }
        },
        error: function (XmlResponse) {
            alert(XmlResponse.responseText);
        }
    });
}
/*
	初始化设备动态属性列表
*/
function initEquProperty(classinstanceid, labelwidgetid) {
    if (classinstanceid == '0') {
        $("#alert_label_instid").empty().append("请选择设备").css("display", "block");
        return;
    } else {
        $("#alert_label_instid").css("display", "none");
    }
    $("#dic_equ_property").empty();
    $("#dic_equ_property").append("<select multiple=\"multiple\" id=\"equ_property\" name=\"propArray\"></select>")
    $("#equ_property").empty();
    $.getJSON("/MonEnergy/queryEquInstancePropertyList", { classinstanceid: classinstanceid, labelwidgetid: parseInt(labelwidgetid), temp: Math.random() }, function (data) {
        if (data.propList.length > 0) {
            var str = "";
            $.each(data.propList, function (i, item) {
                var isOwner = false;
                $.each(data.labelpropList, function (m, v) {
                    if (v == item.normalcode) {
                        isOwner = true;
                    }
                });
                if (isOwner) {
                    $("#equ_property").append("<option selected=\"selected\"  value='" + item.normalcode + "'>" + item.propname + "</option>");
                }
                else {
                    $("#equ_property").append("<option value='" + item.normalcode + "'>" + item.propname + "</option>");
                }
                //str += "<option value='" + item.normalcode + "'>" + item.propname + "</option>";
            });
            $("#equ_property").append(str);
            $('#equ_property').multiSelect({
                selectableHeader: "<div class='custom-header'>待选</div>",
                selectionHeader: "<div class='custom-header'>已选</div>"
            });
            //$('#equ_property').multiSelect('refresh');
            //showList.length = 0;
            //unitsList.length = 0;
            //$("#show_properties").empty();
            //if (propertyid != null && units != null) {
            //    var id = new Array();
            //    id = propertyid.split(",");
            //    unitsList = units.split(",");
            //    for (i = 0; i < id.length; i++) {
            //        var text = $("#equ_property option[value='" + id[i] + "']").text();
            //        var item = {
            //            id: id[i],
            //            name: text,
            //            unit: unitsList[i]
            //        }
            //        showList.push(item);
            //    }
            //    initPropertiesList();
            //}
        }
    });
}

/*
	添加监测属性
*/
function addProperties() {
    var id = $("#equ_property").val();
    var name = $('#equ_property option:selected').text();
    if (id == '0') {
        alert("请选择设备属性");
        return;
    }
    if (showList.length >= 5) {
        alert("一个表单控件最多监测5个属性");
        return;
    }
    for (var i = 0; i < showList.length; i++) {
        if (showList[i].id == id) {
            alert("不能重复加入");
            return;
        }
    }
    var item = {
        id: id,
        name: name,
        unit: ' '
    };
    showList.push(item);
    initPropertiesList();
}
/*
	删除监测属性
*/
function deleteList(id) {
    for (var i = 0; i < showList.length; i++) {
        if (showList[i].id == id) {
            showList.splice(i, 1);
            initPropertiesList();
        }
    }
}
/*
	生产监测列表
*/
function initPropertiesList() {
    $("#show_properties").empty();
    var len = showList.length;
    showList.sort(function (a, b) { return parseInt(a.id) - parseInt(b.id) > 0 ? 1 : -1 });
    var select = " style='width:50px; height:18px; font-size:10px' class='property_unit'>" +
				"<option value=' '> </option>" +
				"<option value='A'>A</option>" +
				"<option value='hz'>hz</option>" +
				"<option value='kW'>kW</option>" +
				"<option value='KPa'>KPa</option>" +
				"<option value='kg/h'>kg/h</option>" +
				"<option value='m'>m</option>" +
				"<option value='m2'>m2</option>" +
				"<option value='m3/h'>m3/h</option>" +
				"<option value='Nm3/h'>Nm3/h</option>" +
				"<option value='r/min'>r/min</option>" +
				"<option value='t'>t</option>" +
				"<option value='V'>V</option>" +
				"<option value='℃'>℃</option>" +
				"<option value='%'>%</option>" +
				"<option value='Lux'>Lux</option>" +
				"</select>";
    for (var i = 0; i < len; i++) {
        var id = showList[i].id;
        var unit = showList[i].unit;
        var str = "";
        str += "<tr>";
        str += "<td height=\"19px\" width=\"140px\"><span style=\"margin-left:3px;\">" + showList[i].name + "</span></td>";
        str += "<td width=\"55px\" align=\"right\"><select id='unit_" + id + "' " + select + "</td>";
        str += "<td width=\"25px\" align=\"center\"><input type=\"button\" style=\"margin-left: 10px;float: left;background-repeat: no-repeat;background-image: url(" + path + "/images/delete.gif);width: 13px;height: 13px;border: 0px;cursor: hand\" onclick=\"deleteList('" + id + "')\" title=\"删除该项\"/></td>";
        str += "</tr>";
        $("#show_properties").append(str);
        $("#unit_" + id).val(unit);
    }

}
/*
	初始化监测表单标题
*/
function initLabelTitle(ischecked) {
    var text = $("#select_classinst_prop option:selected").text();
    var id = $("#select_classinst_prop").val();
    if (ischecked == true) {
        $("#labeltitle").val(text.replace('一一一', "").replace('一一', ""));
    }
}
/*
	调整表单标签位置
*/
function labelAdjust(advance) {
    var page_x = split_Px($("#monitor_page").css("width"));
    var page_y = split_Px($("#monitor_page").css("height"));
    var labelborderid = "label_border_" + $("#select_monitor_widget").val();
    var x = split_Px($("#" + labelborderid).css("left"));
    var y = split_Px($("#" + labelborderid).css("top"));
    var labelwidth = split_Px($("#" + labelborderid).css("width")) + x;
    var labelheight = split_Px($("#" + labelborderid).css("height")) + y;
    if (advance == 'up') {
        y = y - 2;
    } else
        if (advance == 'down') {
            y = y + 2;
        } else
            if (advance == 'left') {
                x = x - 2;
            } else {
                x = x + 2;
            }
    if (x >= 0 && labelwidth < page_x) {
        $("#" + labelborderid).css("left", x);
        $("#labelx").val(x);
    } else {
        alert("表单标签X轴边界溢出");
    }
    if (y >= 0 && labelheight < page_y) {
        $("#" + labelborderid).css("top", y);
        $("#labely").val(y);
    } else {
        alert("表单标签Y轴边界溢出");
    }
}
/*
	标签勾选控制是否显示
*/
function isLabelShow(id) {
    var labelborderid;
    if (id == null) {
        labelborderid = "label_border_" + $("#select_monitor_widget").val();
    } else {
        labelborderid = "label_border_" + id;
    }
    if ($("#label_show").prop("checked") == false) {
        $(".class_label_adjust").attr("disabled", "disabled");
        $("#" + labelborderid).css("display", "none");
        $("#labelisshow").val('0')
    } else {
        $("#" + labelborderid).css("display", "block");
        $("#labelisshow").val('1')
        var flag = 0;//记录equ是否被展示
        $("div").each(function () {
            var id = $(this).attr("id");
            if (id == labelborderid) {
                flag = 1;
            }
        });
        if (flag == 1) {
            $(".class_label_adjust").removeAttr("disabled");
        }
    }
}
/*
	初始化页面表单
	置为初始值
*/
function initEmptyLabelText() {
    $("#select_monitor_widget").val('0');
    $("#label_show_id").val("monitor_widget_0");
    $("#select_classinst_prop").val('0');
    $("#labeltitle").val("请输入标题");
    $("#labelx").val(100);
    $("#labely").val(100);
    $("#arrowstyle").val('0');
    $("#labelwidth").val(150);
    $("#labelheight").val(80);
    $("#labelisshow").val("1");
    $("#label_show").prop("checked", true);
    $("#equal_label_title").prop("checked", false);
    isEquShow(null);
    isEquClick(null);
    showList.length = 0;
    unitsList.length = 0;
    $("#show_properties").empty();
    $("#equ_property").empty();
    $("#equ_property").append("<option value='0'>--请选择设备属性--</option>");
}
/*
	载入设备标签数据
*/
function loadLabelWidgetData(labelwidgetid) {
    $.getJSON("/MonEnergy/queryLabelWidgetOne", { labelwidgetid: labelwidgetid, temp: Math.random() }, function (data) {
        if (typeof (data) != "undefined") {
            $("#label_show_id").val("monitor_widget_" + labelwidgetid);
            $("#select_classinst_prop").val(data.classinstanceid);
            $("#labeltitle").val(data.title);
            $("#labelx").val(data.x);
            $("#labely").val(data.y);
            $("#labelisshow").val(data.isshow);
            $("#labelwidth").val(data.width);
            $("#labelheight").val(data.height);
            $("#arrowstyle").val(data.arrowstyle);
            $("#properties").val(data.properties);
            $("#units").val(data.units);
            if (data.isshow == '1') {
                $("#label_show").prop("checked", true);
            } else {
                $("#label_show").prop("checked", false);
            }
            $("#labelfontsize").val(data.fontsize);
            $("#labelfontcolor").val(data.fontcolor);

            $(".label_control_btn").removeAttr("disabled");
            $(".class_label_adjust").removeAttr("disabled");
            $(".label_init").removeAttr("disabled");
            $(".label_alert").css("display", "none");
            initEquProperty(data.classinstanceid, labelwidgetid);//初始化属性列表并初始化选择区域
            var borderid = "label_border_" + labelwidgetid;
            $(".label_tag").css("border", "none");
            $(".label_tag").css("filter", "none");
            $("#" + borderid).css("border", "1px dotted #00FF00"); //标识被选中
            $("#" + borderid).css("filter", "Glow(color=#00FF00,strength=12)");
        } else {
            initEmptyLabelText();
        }
    });
}
/*
	检验页面表单标签名称是否重复
*/
function checkLabelTitle(value) {
    if (value.trim() == "") {
        $("#alert_label_title").empty().append("请输入标题").css("display", "block");
        return;
    } else {
        $("#alert_label_title").css("display", "none");
        var projectid = $("#select_project").val();
        var pageid = $("#select_page").val();
        var widgetid = $("#select_monitor_widget").val();
        $.getJSON("/MonEnergy/queryMonitorLabelTitle", { labeltitle: value, temp: Math.random() }, function (data) {
            if (data.length != 0) {
                $.each(data, function (i, item) {
                    if (item.projectid == projectid) {
                        if (item.pageid == pageid) {
                            if (item.widgetid != widgetid) {
                                $("#alert_label_title").empty().append("标题重复").css("display", "block");
                                return;
                            } else {
                                $("#alert_label_title").css("display", "none");
                            }
                        } else {
                            $("#alert_label_title").css("display", "none");
                        }
                    } else {
                        $("#alert_label_title").css("display", "none");
                    }
                });
            } else {
                $("#alert_label_title").css("display", "none");
            }
        });
    }
}
/*
	根据设备控件所绑定设备实例生成监测控件绑定设备实例
*/
function initLabelClassintanceid() {
    var instid = new Array();
    var instname = new Array();
    var projectid = $("#select_project").val();
    var pageid = $("#select_page").val();
    var url = "/MonEnergy/queryMonitorEquList";
    $.getJSON(url, { pageid: pageid }, function (data) {
        if (data.length > 0) {
            $.each(data, function (i, item) {
                instid.push(item.classinstanceid);
                var text = $("#select_classinst_equ option[value='" + item.classinstanceid + "']").text();
                instname.push(text);
            });
            $("#select_classinst_prop").empty();
            $("#select_classinst_prop").append("<option value='0'>--请选择设备--</option>");
            for (var j = 0; j < instid.length; j++) {
                $("#select_classinst_prop").append("<option value='" + instid[j] + "'>" + instname[j] + "</option>");
            }
        }
    });
}
/*
绑定类实例下拉框（设备、属性添加页面）
*/
function BindClassInstSele() {
    $("#select_classinst_equ").empty();
    $("#select_classinst_prop").empty();
    $("#select_classinst_equ").append("<option value='0'>--请选择设备--</option>");
    $("#select_classinst_prop").append("<option value='0'>--请选择设备--</option>");
    var url = "/MonEnergy/QueryClassInstList";
    $.getJSON(url, function (data) {
        if (data != null) {
            $.each(data, function (i, item) {
                $("#select_classinst_equ").append("<option value='" + item.instancecode + "'>" + item.instancename + "</option>");
                $("#select_classinst_prop").append("<option value='" + item.instancecode + "'>" + item.instancename + "</option>");
            });
        }
    });
}
/*-----------------------------------------------------------监测控件操作函数----------------------------------------------------------*/