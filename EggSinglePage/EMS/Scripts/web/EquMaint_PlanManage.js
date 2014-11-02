$(document).ready(function () {
    BindPlan(1, 10);
    InitSelect();
    Setsbmc();
});
//生成计划分页
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
	var rowcount = $("#tab tr").length + 1;
	var startrow = (pagecount * (page - 1)) + 1;
	var endrow = startrow + pagecount;
	if (endrow > rowcount) {
		endrow = rowcount;
            }
	for (var i = 1; i < rowcount; i++) {
		if (i >= startrow && i < endrow) {
			$("#tab tr:eq(" + i + ")").show();
		}
		else {
			$("#tab tr:eq(" + i + ")").hide();
        }
    }
}
//删除计划
function PlanDele(id) {
    if (confirm("确定删除此条检修数据吗?")) {
        $.post("/EquMaint/PlanDele", { id: id }, function () {
        	UEEPAlert("删除成功");
            BindPlan(1, 10);

        });
    }
}
//检修状态
function Convertrepairstate(repairstate) {
    var result = "1";
    switch (repairstate) {
        case 0:
            result = "<span class=\"sb-td-ico\"><a class=\"ico-sbjx ico-Ongoingmaintenance\"> </a><span>计划中</span></span>";
            break;
        case 1:
            result = "<span class=\"sb-td-ico\"><a class=\"ico-sbjx ico-Waitmaintenance\"> </a><span>待检修</span></span>";
            break;
        case 2:
            result = "<span class=\"sb-td-ico\"><a class=\"ico-sbjx ico-Maintenance\"> </a><span>检修完成</span></span>";
            break;
        default:
    }
    return result;
}
//计划触发
function Convercfgstate(repairstate) {
    var result = "1";
    switch (repairstate) {
        case 0:
            result = "未触发";
            break;
        case 1:
            result = "已触发";
            break;
        default:
    }
    return result;
}
//检修类型
function ConverPlanType(planType) {
    var result = "";
    switch (planType) {
        case 0:
            result = "定期单次";
            break;
        case 1:
            result = "定期循环";
            break;
        case 2:
            result = "非定期";
            break;
        case 3:
            result = "计划外";
            break;
        default:
    }
    return result;
}
//查询
function SelectData() {
    BindPlan(1, 10);
}
///绑定检修计划
function BindPlan(pageindex, numberOfPages) {
    $.ajax({
        type: "POST",//这里是http类型
        url: "/EquMaint/PageList",//大家都应该很清楚了
        async: false,
        data: { stime: $("#select_stime").val(), etime: $("#select_etime").val(), equname: $("#select_equname").val(), type: $("#select_type").val(), state: $("#select_state").val(), temp: Math.random() },//回传一个参数
        dataType: "json",//传回来的数据类型
        success: function (responseJSON) {
            //if (flag == 0) {
            //    if (responseJSON.total > 1) {
            //        initDataPage(responseJSON.total);
            //    }
            //}
            var str = "";
            $.each(responseJSON.rows, function (n, value) {
                str += "<tr id=\"plan_" + value.id + "\">" +
                "<td class=\"tdW50\">" + (((pageindex - 1) * numberOfPages) + (n + 1)) +
				"</td><td class=\"\">" + value.ClassInst.instancename +
                "</td>" +
                "<td>" + value.maintparts +
                "</td>" +
                 "<td>" + ConverPlanType(value.plantype) +
                "</td>" +
                "<td>" + value.plantime +
                "</td>" +
                "<td>" + value.maintcontent +
                "</td>" +
                "<td>" + value.alertdays +
                "</td>" +
                "<td>" + Convertrepairstate(value.repairstate) + "</td>" +
                "<td><a class=\"ico-sbgl ico-Update2 fancybox\" onclick=\"EditPlan(" + value.id + ")\" href=\"#sb-pop-onupdate2\"> </a>  <a onclick=\"PlanDele(" + value.id + ")\" class=\"ico-sbgl ico-Delete2\"> </a></td>" +
            "</tr>";
            });
            $("#tb_container").empty().append(str);
            $("#tb_container tr:odd").addClass("odd");
            initDataPage(($("#tab tr").length - 1));
            PageControl(1, 10);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            UEEPAlert(XMLHttpRequest.responseText);
        }
    });
}
//初始化防下拉
function InitSelect() {
    //查询类型下拉初始化
    $("#sc_type").simSelect({
        callback: function (x, v) {
            if (!x) return;
            $("#select_type").val(v);
        }
    });
    //查询状态初始化
    $("#sc_state").simSelect({
        callback: function (x, v) {
            if (!x) return;
            $("#select_state").val(v);
        }
    });
    //获取设备
    $.ajax({
        type: "POST",
        url: "/EquMaint/GetEquList",
        async: false,
        data: { level: 8, temp: Math.random() },
        dataType: "json",
        success: function (data) {
            var str = "";
            $.each(data, function (n, value) {
                if (n == 0) {
                    $("#SelectEqu").find("p").empty().html(value.instancename);
                }
                str += "<li val=\"" + value.instancecode + "\" ><a href=\"\">" + value.instancename + "</a></li>";
            });
            $("#SelectEqu").find("ul").empty().append(str);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            UEEPAlert(XMLHttpRequest.responseText);
        }
    });
    //添加、编辑下拉初始化
    $("#SelectEqu").simSelect({
        callback: function (x, v) {
            $("#instancecode").val(v);
        }
    });
}
//查看计划
function ShowPlan(id) {
    $.ajax({
        type: "POST",//这里是http类型
        url: "/EquMaint/PlanData",//大家都应该很清楚了
        async: false,
        data: { id: id, temp: Math.random() },//回传一个参数
        dataType: "json",//传回来的数据类型
        success: function (data) {
            $("#span_equname").empty().append("<span>设备名称:</span>" + data.ClassInst.instancename + "");
            $("#span_maintparts").empty().append("<span>检修部件:</span> " + data.maintparts + "</span>");
            $("#span_maintcontent").empty().append("<span>检修内容:</span> " + data.maintcontent + "</span>");
            if (data.plantype == 2) {
                $("#span_plantype").empty().append("<span>计划类型:</span>" + ConverPlanType(data.plantype) + "<div class=\"sb-sapn-div0\"><span class=\"sb-bd-li-span0\" ><span>检修提醒时间触发:</span>" + data.plantime + "小时</span></div><div class=\"sb-sapn-div1\"><span class=\"sb-bd-li-span1\"><span>定制人:</span> " + data.customizedman + "</span></div>")
            } else {
                $("#span_plantype").empty().append("<span>计划类型:</span>" + ConverPlanType(data.plantype) + "<div class=\"sb-sapn-div0\"><span class=\"sb-bd-li-span0\" ><span>计划检修时间:</span>" + data.plantime + "</span></div><div class=\"sb-sapn-div1\"><span class=\"sb-bd-li-span1\"><span>定制人:</span> " + data.customizedman + "</span></div>")
            }
            $("#span_plantime").empty().append("<span>计划检修时间:</span>" + data.plantime + "");
            $("#span_customizedman").empty().append("<span>定制人:</span> " + data.customizedman + "</span>");
            $("#span_maintresult").empty().append("<span>检修结果:</span>" + data.maintresult + "");
            $("#span_maintman").empty().append("<span>检修人:</span><span class=\"sb-bd-li-span2\">" + data.maintman + "</span><div class=\"sb-sapn-div2\"><span>实际检修时间:</span>" + data.actualtime + "</div>");
            $("#planid").val(data.id);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            UEEPAlert(XMLHttpRequest.responseText);
        }
    });

}
//执行修改计划
function ButEdit() {
    //$("#SelectType").simSelect({
    //    callback: function (x, v) {
    //        SeleChangeType(v);
    //    }
    //});
    $.ajax({
        type: "POST",//这里是http类型
        url: "/EquMaint/PlanData",//大家都应该很清楚了
        async: false,
        data: { id: id, temp: Math.random() },//回传一个参数
        dataType: "json",//传回来的数据类型
        success: function (data) {
            SeleChangeType(data.plantype.toString());
            $("#SelectEqu").find("p")[0].innerHTML = data.ClassInst.instancename;
            $("#instancecode").val(data.instancecode);
            $("#maintparts").val(data.maintparts);
            $("#maintcontent").val(data.maintcontent);
            $("#SelectType").find("p")[0].innerHTML = ConverPlanType(data.plantype);
            $("#plantype").val(data.plantype);
            $("#customizedman").val(data.customizedman);
            $("#cycle").val(data.cycle);
            $("#maintresult").val(data.maintresult);
            $("#maintman").val(data.maintman);
            $("#actualtime").val(data.actualtime);
            $("#planid").val(data.id);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            UEEPAlert(XMLHttpRequest.responseText);
        }
    });
}
//新增计划
function AddPlan() {
    $("#SelectType").simSelect({
        callback: function (x, v) {
            SeleChangeType(v);
        }
    });
    SeleChangeType("0");
    $("#SelectEqu").find("p")[0].innerHTML = "选择设备";
    $("#instancecode").val("");
    $("#maintparts").val("");
    $("#maintcontent").val("");
    $("#SelectType").find("p")[0].innerHTML = "定期单次";
    $("#plantype").val("0");
    $("#customizedman").val("");
    $("#cycle").val(0);
    $("#maintresult").val("");
    $("#maintman").val("");
    $("#actualtime").val("");
    $("#li_maintresult").hide();
    $("#li_actualtime").hide();
    $("#planid").val(0);
}
//修改计划
function EditPlan(id) {
    //$("#SelectType").simSelect({
    //    callback: function (x, v) {
    //        SeleChangeType(v);
    //    }
    //});
    $.ajax({
        type: "POST",//这里是http类型
        url: "/EquMaint/PlanData",//大家都应该很清楚了
        async: false,
        data: { id: id, temp: Math.random() },//回传一个参数
        dataType: "json",//传回来的数据类型
        success: function (data) {
            SeleChangeType(data.plantype.toString());
            $("#planid").val(data.id);
            $("#SelectEqu").find("p")[0].innerHTML = data.ClassInst.instancename;
            $("#instancecode").val(data.instancecode);
            $("#maintparts").val(data.maintparts);
            $("#maintcontent").val(data.maintcontent);
            $("#SelectType").find("p")[0].innerHTML = ConverPlanType(data.plantype);
            $("#plantype").val(data.plantype);
            $("#plantime").val(data.plantime);
            $("#alertdays").val(data.alertdays);
            $("#customizedman").val(data.customizedman);
            $("#cycle").val(data.cycle);
            $("#maintresult").val(data.maintresult);
            $("#maintman").val(data.maintman);
            $("#actualtime").val(data.actualtime);
            $("#li_maintresult").show();
            $("#li_actualtime").show();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            UEEPAlert(XMLHttpRequest.responseText);
        }
    });
}

function Setsbmc() {
            $sb = $("#SelectType");
    $sb.simSelect({
        callback: function(x, v) {
            if (!x) return;
            $("#plantype").val(v);
        }
    });
}

//提交按钮
function SubmitPlan() {
    if (!$('#pageform').valid()) return;
    var plantype = $("#plantype").val();
    var url = "/EquMaint/PlanAdd";
    if (plantype == "2") {
        url = "/EquMaint/CfgPlanEdit";
    }
    //提交，存入数据库
    $("#pageform").ajaxSubmit({
        type: 'post',
        dataType: 'text',
        url: url,
        async: false,
        success: function (data) {
            if (data != 'err') {
                BindPlan(1, 10);
                $.fancybox.close();
            } else {
            	UEEPAlert("计划添加失败");
            }
        },
        error: function (XMLResponse) {
        	UEEPAlert(XMLResponse.responseText);
        }
    });
}
//验证
$("#pageform").validate({
    //errorElement: "span",
    // 添加验证规则
    rules: {
        instancecode: {
            required: true
        },
        maintparts: {
            required: true
        },
        maintcontent: {
            required: true,
        },
        plantime: {
            required: true,
        },
        alertdays: {
            required: true,
        }

    },
    success: function (label) {
        //正确时的样式
        label.text(" ").addClass("success");
    },
    //重设提示信息
    messages: {
        instancecode: {
            required: "请选择设备编码"
        },
        maintparts: {
            required: "请输入检修部件"
        },
        maintcontent: {
            required: "请输入检修内容"
        },
        plantime: {
            required: "请选择计划检修时间",
        },
        alertdays: {
            required: "请输入提醒天数",
        }
    },
    /* 重写错误显示消息方法,以alert方式弹出错误消息 */
    showErrors: function (errorMap, errorList) {
        var msg = "";
        $.each(errorList, function (i, v) {
            if (i == 0) { msg += (v.message + "\r\n"); }
        });
        if (msg != "") UEEPAlert(msg);
    },
    /* 失去焦点时不验证 */
    onfocusout: false
});

//切换检修类型事件
function SeleChangeType(plantype) {
    if (plantype == "0") {
        $("#div_plan1").empty().append("<span class=\"sb-bd-li-span0\"><span>计划检修时间:</span> <input type=\"text\" style=\"width:90px;\" class=\"Wdate itxt w80\" onfocus=\"WdatePicker({minDate:'%y-%M-%d'})\" autocomplete=\"off\" id=\"plantime\" name=\"plantime\" /></span>");
        $("#div_plan2").empty().append("<span class=\"sb-bd-li-span1\"><span>提前提醒:</span> <input type=\"text\" style=\"width:60px;\" class=\"w80 ttxt\" id=\"alertdays\" name=\"alertdays\"/>日</span>");
        $("#li_plan3").empty().append("<span class=\"bd-li-three\"><span>定制人:</span><span class=\"sb-bd-li-span2\"><input type=\"text\" class=\"w200 ttxt\" id=\"customizedman\" name=\"customizedman\" /></span></span></span>");
    }
    if (plantype == "1") {
        $("#div_plan1").empty().append("<span class=\"sb-bd-li-span0\"><span>计划检修时间:</span> <input type=\"text\" style=\"width:90px;\" class=\"Wdate itxt w80\" onfocus=\"WdatePicker({minDate:'%y-%M-%d'})\" autocomplete=\"off\" id=\"plantime\" name=\"plantime\" /></span>");
        $("#div_plan2").empty().append("<span class=\"sb-bd-li-span1\"><span>检修周期:</span> <input type=\"text\" class=\"w200 ttxt\" id=\"cycle\" name=\"cycle\"/>天</span>");
        $("#li_plan3").empty().append(" <span class=\"bd-li-four\"><span>提前提醒:</span><span class=\"sb-bd-li-span2\"><input type=\"text\" class=\"w200 ttxt\" id=\"alertdays\" name=\"alertdays\" />天</span></span><div class=\"sb-sapn-div2\"><span>定制人:</span> <input type=\"text\" class=\"w80 ttxt\" id=\"customizedman\" name=\"customizedman\" /></div></span>");
    }
    if (plantype == "2") {
        $("#div_plan1").empty().append("<span class=\"sb-bd-li-span0\"><span>检修提醒时间触发:</span> <input type=\"text\" class=\"Wdate w80 ttxt\" onfocus=\"WdatePicker({minDate:'%y-%M-%d'})\" autocomplete=\"off\" id=\"plantime\" name=\"plantime\" /></span>");
        $("#div_plan2").hide();
        $("#li_plan3").empty().append("<span class=\"bd-li-three\"><span>定制人:</span><span class=\"sb-bd-li-span2\"><input type=\"text\" class=\"w200 ttxt\" id=\"customizedman\" name=\"customizedman\" /></span></span></span>");
    }
    if (plantype == "3") {
        $("#div_plan1").empty().append("<span class=\"sb-bd-li-span0\"><span>计划检修时间:</span> <input style=\"width:90px;\" type=\"text\" class=\"Wdate itxt w80\" onfocus=\"WdatePicker({minDate:'%y-%M-%d'})\" autocomplete=\"off\" id=\"plantime\" name=\"plantime\" /></span>");
        $("#div_plan2").empty().append("<span class=\"sb-bd-li-span1\"><span>定制人:</span> <input type=\"text\" class=\"w200 ttxt\" id=\"customizedman\" name=\"customizedman\"/></span>");
        $("#li_plan3").hide()
        $("#li_actualtime").show();
        $("#li_maintresult").show();
    }
}

//导出Excel编辑\
function exportExcel() {
    var data = "";
    $("#tab tr").each(function () {
        var tr = $(this);
        tr.find("td").each(function () {
            var td = $(this);
            var rowspan = td.attr("rowspan") ? td.attr("rowspan") : 1;
            var colspan = td.attr("colspan") ? td.attr("colspan") : 1;
            data = data + td.text() + "$$$$$" + rowspan + "$$$$$" + colspan + "*****";
        });
        data = data + "|||||";
    });
    //var sHtml = htmlEncode($("#MyTable")[0].outerHTML);//做html编码
    $("input[name='htmlTableStr']").val(data);
    $("input[name='reportname']").val("检修报告");
    //表单提交
    $("form[name='myForm']").submit();
}