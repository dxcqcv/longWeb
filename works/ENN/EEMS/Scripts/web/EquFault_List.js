$(document).ready(function () {
    Setgzzt();
    QueryEquFaultList(1, 10, 0);
    Setsbmc();
    Setgzdj();
    Setfzr();
});

//故障状态下拉条
function Setgzzt() {
    $.ajax({
        type: "POST",//这里是http类型
        url: "/EquFault/EquStateList",//大家都应该很清楚了
        async: false,
        dataType: "json",//传回来的数据类型
        success: function (data) {
            $sb = $("#selectSb");
            var str = "";
            if (data != null && data.length > 0) {
                $.each(data, function (n, value) {
                    str += "<li val=\"" + value.Value + "\"><a href=\"\">" + value.Text + "</a></li>";
                });
            }
            $sb.find("ul").empty().append(str);
            $sb.simSelect({
                callback: function (x, v) {
                    if (!x) return;
                    $("#hid_gzzt").val(v);
                }
            });
        },
        error: function (XMLHttpRequest) {
            UEEPAlert(XMLHttpRequest.responseText);
        },
    });
}

//设备名称下拉条
function Setsbmc() {
    $.ajax({
        type: "POST",//这里是http类型
        url: "/EquFault/EquList",//大家都应该很清楚了
        async: false,
        dataType: "json",//传回来的数据类型
        success: function (data) {
            $sb = $("#sbmc");
            $sbd = $("#sbmcd");
            var str = "";
            var flag = true;
            if (data != null && data.length > 0) {
                $.each(data, function (n, value) {
                    str += "<li val=\"" + value.Value + "\"><a href=\"\">" + value.Text + "</a></li>";
                    if (flag) {
                        $("#equnamespan").text(value.Text);
                        $("#hid_sbmc").val(value.Value);
                        $("#equnamespand").text(value.Text);
                        $("#hid_sbmcd").val(value.Value);
                        flag = false;
                    }
                });
            }
            $sb.find("ul").empty().append(str);
            $sb.simSelect({
                callback: function (x, v) {
                    if (!x) return;
                    $("#hid_sbmc").val(v);
                }
            });
            $sbd.find("ul").empty().append(str);
            $sbd.simSelect({
                callback: function (x, v) {
                    if (!x) return;
                    $("#hid_sbmcd").val(v);
                }
            });
        },
        error: function (XMLHttpRequest) {
            UEEPAlert(XMLHttpRequest.responseText);
        }
    });
}

//故障等级下拉条
function Setgzdj() {
    $.ajax({
        type: "POST",//这里是http类型
        url: "/EquFault/EquLevelList",//大家都应该很清楚了
        async: false,
        dataType: "json",//传回来的数据类型
        success: function (data) {
            $sb = $("#gzdj");
            $sbd = $("#gzdjd");
            var str = "";
            var flag = true;
            if (data != null && data.length > 0) {
                $.each(data, function (n, value) {
                    str += "<li val=\"" + value.Value + "\"><a href=\"\">" + value.Text + "</a></li>";
                    if (flag) {
                        $("#faultlevelspand").text(value.Text);
                        $("#hid_gzdj").val(value.Value);
                        $("#faultlevelspan").text(value.Text);
                        $("#hid_gzdjd").val(value.Value);
                        flag = false;
                    }
                });
            }
            $sb.find("ul").empty().append(str);
            $sb.simSelect({
                callback: function (x, v) {
                    if (!x) return;
                    $("#hid_gzdj").val(v);
                }
            });
            $sbd.find("ul").empty().append(str);
            $sbd.simSelect({
                callback: function (x, v) {
                    if (!x) return;
                    $("#hid_gzdjd").val(v);
                }
            });
        },
        error: function (XMLHttpRequest) {
            UEEPAlert(XMLHttpRequest.responseText);
        }
    });
}

//负责人下拉条
function Setfzr() {
    $.ajax({
        type: "POST",//这里是http类型
        url: "/EquFault/StaffList",//大家都应该很清楚了
        async: false,
        dataType: "json",//传回来的数据类型
        success: function (data) {
            $sb = $("#fzr");
            $sbd = $("#fzrd");
            var str = "";
            var flag = true;
            if (data != null && data.length > 0) {
                $.each(data, function (n, value) {
                    str += "<li val=\"" + value.Value + "\"><a href=\"\">" + value.Text + "</a></li>";
                    if (flag) {
                        $("#staffnamespan").text(value.Text);
                        $("#hid_fzr").val(value.Value);
                        $("#staffnamespand").text(value.Text);
                        $("#hid_fzrd").val(value.Value);
                        flag = false;
                    }
                });
            }
            $sb.find("ul").empty().append(str);
            $sb.simSelect({
                callback: function (x, v) {
                    if (!x) return;
                    $("#hid_fzr").val(v);
                }
            });
            $sbd.find("ul").empty().append(str);
            $sbd.simSelect({
                callback: function (x, v) {
                    if (!x) return;
                    $("#hid_fzrd").val(v);
                }
            });
        },
        error: function (XMLHttpRequest) {
            UEEPAlert(XMLHttpRequest.responseText);
        }
    });
}

//<tr class="even">
//                                <td><span class="tr-span2-0">1</span><span class="tr-span2-1">离心机1</span><span class="tr-span2-2">监控添加</span></td>
//                                <td><span>2014-07-15 06:07</span></td>
//                                <td><span>一级</span></td>
//                                <td><span>描述1</span></td>
//                                <td><span>2014-07-15 06:07</span></td>
//                                <td><span>2014-07-15 06:07</span></td>
//                                <td><span class="td-ico"><a class="ico-state ico-Nodispose"> </a><span>未处理</span></span></td>
//                                <td><a class="ico-Op ico-Update"> </a>  <a class="ico-Op ico-Delete"> </a><a class="ico-Op ico-Set"> </a></td>
//                            </tr>
//查询函数，根据传入页码、查询条件进行当前页数据的查询
function QueryEquFaultList(pageindex, numberOfPages, flag) {
    $.ajax({
        type: "POST",//这里是http类型
        url: "/EquFault/EquFaultList",//大家都应该很清楚了
        async: false,
        data: "currentPage=" + pageindex + "&numberOfPages=" + numberOfPages + "&equName=" + $("#equName").val() + "&maintainState=" + $("#hid_gzzt").val() + "&startDate=" + $("#startDate").val() + "&endDate=" + $("#endDate").val(),//回传查询条件：创建时间（段）、设备名称、故障状态
        dataType: "json",//传回来的数据类型
        success: function (responseJSON) {
            $("#tb_container").empty();
            if (flag == 0) {
                $("#example").empty();
                if (responseJSON.total > 1) {
                    initDataPage(responseJSON.total);
                }
            }
            var str = "";
            var m = 0;
            $.each(responseJSON.rows, function (n, value) {
                str = "<tr ";
                if ((n % 2) == 0) {
                    str += " class=\"even\">";
                } else {
                    str += " class=\"odd\">";
                }
                str += "<td >";
                if (value.Equ != null) {
                    //<a class=\"fancybox\" onclick=\"AlertDetial('"+ value.id + "')\" href=\"#pop-ondetial\">
                    str += "<span id=\"equname_" + value.id + "\" class=\"tr-span2-1\">" + value.Equ.instancename + "</span></td>";
                } else {
                    str += "<span id=\"equname_" + value.id + "\" class=\"tr-span2-1\">" + "" + "</span></td>";
                }
                str += "<td><span id=\"faultsource_" + value.id + "\" class=\"tr-span2-2\">" + initfaultsource(value.faultsource) + "</span></td>";
                if (value.Equ != null) {
                    str += "<td hidden=\"hidden\"><span id=\"equnamecode_" + value.id + "\">" + value.Equ.instancecode + "</span></td>";
                } else {
                    str += "<td hidden=\"hidden\"><span id=\"equnamecode_" + value.id + "\">" + "" + "</span></td>";
                }
                 
                str += "<td hidden=\"hidden\"><span id=\"faultsourcecode_" + value.id + "\">" + value.faultsource + "</span></td>" +
                    "<td><span id=\"discoverytime_" + value.id + "\">" + initstring(value.discoverytime) + "</span></td>" +
                    "<td><span id=\"faultlevel_" + value.id + "\">" + initfaultlevel(value.faultlevel) + "</span></td>" +
                     "<td hidden=\"hidden\"><span id=\"faultlevelcode_" + value.id + "\">" + value.faultlevel + "</span></td>" +
                    "<td><span id=\"faultdescription_" + value.id + "\">" + initstring(value.faultdescription) + "</span></td>" +
                    "<td hidden=\"hidden\"><span id=\"maintainunits_" + value.id + "\">" + initstring(value.maintainunits) + "</span></td>";
                if (value.Staff != null) {
                    str += "<td hidden=\"hidden\"><span id=\"staffname_" + value.id + "\">" + value.Staff.staffname + "</span></td>" + "<td hidden=\"hidden\"><span id=\"staffnamecode_" + value.id + "\">" + value.Staff.staffid + "</span></td>";
                    } else {
                    str += "<td hidden=\"hidden\"><span id=\"staffname_" + value.id + "\">" + "" + "</span></td>" + "<td hidden=\"hidden\"><span id=\"staffnamecode_" + value.id + "\">" + "" + "</span></td>";
                    }
                str += "<td><span id=\"starttime_" + value.id + "\">" + initstring(value.starttime) + "</span></td>" +
                    "<td><span id=\"endtime_" + value.id + "\">" + initstring(value.endtime) + "</span></td>";
                var stateclass = "";
                if (initmaintainstate(value.maintainstate) == "未处理") {
                    stateclass = "ico-state ico-Nodispose";
                } else if (initmaintainstate(value.maintainstate) == "处理中") {
                    stateclass = "ico-state ico-dispose";
                } else if (initmaintainstate(value.maintainstate) == "完成") {
                    stateclass = "ico-state ico-complete";
                }
                str += "<td><span class=\"td-ico\"><a class=\"" + stateclass + "\"> </a><span id=\"maintainstate_" + value.id + "\">" + initmaintainstate(value.maintainstate) + "</span></span></td>" +
                    "<td hidden=\"hidden\"><span id=\"maintaincosts_" + value.id + "\">" + value.maintaincosts + "</span></td>" +
                    "<td hidden=\"hidden\"><span id=\"content_" + value.id + "\">" + initstring(value.content) + "</span></td>";
                //已完成，不可进行编辑和删除
                if (value.maintainstate == "2") {
                    str += " <td><a class=\"ico-Op ico-NoUpdate\"> </a>  <a class=\"ico-Op ico-NoDelete\"> </a><a class=\"ico-Op ico-NoSet\"> </a></td>" +
                        "</tr>";
                } else {
                    str += "<td><a onclick=\"SetEdit('" + value.id + "')\" href=\"#pop-onupdate\" class=\"ico-Op ico-Update fancybox\"> </a>  <a onclick=\"DeleteEquFault(" + value.id + ")\" class=\"ico-Op ico-Delete\"> </a><a onclick=\"Fixed(" + value.id + ")\" class=\"ico-Op ico-Set\"> </a></td>" +
                        "</tr>";
                }
                m = n;
                $("#tb_container").append(str);
            });
            $("#tb_container tr:odd").addClass("odd");

            //if (((m + 1) % 2) == 0) {
            //    str = "<tr class=\"even\">";
            //} else {
            //    str = "<tr class=\"odd\">";
            //}
            //str += "<td> </td><td> </td><td> </td><td> </td><td> </td><td> </td><td> </td><td> </td></tr>";
            //$("#tb_container").append(str);
            //if (value.Equ != null) {
            //    str += "<td id=\"equname_" + value.id + "\">" + value.Equ.instancename +
            //        "</td>";
            //} else {
            //    str += "<td id=\"equname_" + value.id + "\">" + "" + "</td>";
            //}
            //str += "<td hidden=\"hidden\" id=\"faultsource_" + value.id + "\">" + initfaultsource(value.faultsource) +
            //    "</td>" +
            //    "<td id=\"discoverytime_" + value.id + "\">" + initstring(value.discoverytime) +
            //    "</td>" +
            //    "<td id=\"faultlevel_" + value.id + "\">" + initfaultlevel(value.faultlevel) +
            //    "</td>" +
            //    "<td id=\"faultdescription_" + value.id + "\">" + initstring(value.faultdescription) +
            //    "</td>" +
            //    "<td hidden=\"hidden\" id=\"maintainunits_" + value.id + "\">" + initstring(value.maintainunits) +
            //    "</td>";
            //if (value.Staff != null) {
            //    str += "<td hidden=\"hidden\" id=\"staffname_" + value.id + "\">" + value.Staff.staffname +
            //        "</td>";
            //} else {
            //    str += "<td hidden=\"hidden\" id=\"staffname_" + value.id + "\">" + "" + "</td>";
            //}
            //str += "<td id=\"starttime_" + value.id + "\">" + initstring(value.starttime) +
            //    "</td>" +
            //    "<td id=\"endtime_" + value.id + "\">" + initstring(value.endtime) +
            //    "</td>" +
            //    "<td id=\"maintainstate_" + value.id + "\">" + initmaintainstate(value.maintainstate) +
            //    "</td>" +
            //    "<td hidden=\"hidden\" id=\"maintaincosts_" + value.id + "\">" + value.maintaincosts +
            //    "</td>" +
            //    "<td hidden=\"hidden\" id=\"content_" + value.id + "\">" + initstring(value.content) +
            //    "</td>" +
            //    "<td>" +
            //    "<div class=\"btn-group\">";
            //if (value.maintainstate == "2") {
            //    str += "<button disabled=\"disabled\" class=\"btn mini green\" onclick=\"location.href='/EquFault/Edit/" + value.id + "'\" type=\"button\">编辑</button>" +
            //        "<button disabled=\"disabled\" class=\"btn mini red\" onclick=\"DeleteEquFault(" + value.id + ")\" type=\"button\">删除</button>";
            //} else {
            //    str += "<button class=\"btn mini green\" onclick=\"location.href='/EquFault/Edit/" + value.id + "'\" type=\"button\">编辑</button>" +
            //        "<button class=\"btn mini red\" onclick=\"DeleteEquFault(" + value.id + ")\" type=\"button\">删除</button>" +
            //        "<button class=\"btn mini blue\" onclick=\"Fixed(" + value.id + ")\" type=\"button\">维修完成</button>";
            //}
            //str += "</div>" +
            //    "</td>" +
            //    "</tr>";
            //$("#tb_container").append(str);

        },
        error: function (XMLHttpRequest) {
            UEEPAlert(XMLHttpRequest.responseText);
        }
    });
}
///分页
function initDataPage(totalPage) {
    var options = {
        currentPage: 1,
        numberOfPages: 5,
        totalPages: totalPage,
        size: 'mini',
        alignment: 'center',
        itemTexts: function (type, page, current) {
            switch (type) {
                case "first":
                    return "<<";
                case "prev":
                    return "<上一页";
                case "next":
                    return "下一页>";
                case "last":
                    return ">>";
                case "page":
                    return page;
            }
        },
        onPageClicked: function (e, originalEvent, type, page) {
            QueryEquFaultList(page, 10, 0);
        }
    }
    $('#example').bootstrapPaginator(options);
}
//故障等级转值
function initfaultlevel(faultlevel) {
    if (faultlevel == "1") {
        return "普通故障";
    } else if (faultlevel == "2") {
        return "关键故障";
    } else if (faultlevel == "3") {
        return "重大故障";
    } else if (faultlevel == "4") {
        return "特重大故障";
    }
    return "";
}

//输入方式转值
function initfaultsource(faultsource) {
    if (faultsource == "0") {
        return "监控添加";
    } else if (faultsource == "1") {
        return "手动添加";
    }
    return " ";
}

//处理状态转值
function initmaintainstate(maintainstate) {
    if (maintainstate == "0") {
        return "未处理";
    } else if (maintainstate == "1") {
        return "处理中";
    } else if (maintainstate == "2") {
        return "完成";
    }
    return " ";
}

//空属性转值，防止出现null
function initstring(parameters) {
    if (parameters != null && parameters.length > 0) {
        return parameters;
    } else {
        return " ";
    }
}

//分页函数
function initDataPage1(totalPage) {
    var options = {
        currentPage: 1,
        numberOfPages: 5,
        totalPages: totalPage,
        size: 'normal',
        alignment: 'center',
        onPageClicked: function (e, originalEvent, type, page) {
            QueryEquFaultList(page, 10, 1);
        }
    };
    $('#example').bootstrapPaginator(options);
}

//删除操作确认
function DeleteEquFault(faultId) {
    UEEPConfirm('确认删除吗？', function (r) {
        if (r == true) {
            location.href = "/EquFault/Delete/" + faultId;           
            return true;
        } else {
            return false;
        }
    });   
}

//点击“编辑”，弹出编辑窗口
function SetEdit(faultid) {
    $("#hid_gzid").val(faultid);
    document.getElementById("DetailName").innerText = document.getElementById("equname_" + faultid).innerHTML + "故障修改";
    document.getElementById("faultlevelspan").innerText = document.getElementById("faultlevel_" + faultid).innerHTML;
    $("#hid_gzdj").val(document.getElementById("faultlevelcode_" + faultid).innerHTML);
    document.getElementById("equnamespan").innerText = document.getElementById("equname_" + faultid).innerHTML;
    $("#hid_sbmc").val(document.getElementById("equnamecode_" + faultid).innerHTML);
    $("#discoverytimespan").val(document.getElementById("discoverytime_" + faultid).innerHTML);
    $("#faultdescriptionspan").val(document.getElementById("faultdescription_" + faultid).innerHTML);
    $("#maintainunitsspan").val(document.getElementById("maintainunits_" + faultid).innerHTML);
    document.getElementById("staffnamespan").innerText = document.getElementById("staffname_" + faultid).innerHTML;
    $("#hid_fzr").val(document.getElementById("staffnamecode_" + faultid).innerHTML);
    $("#starttimespan").val(document.getElementById("starttime_" + faultid).innerHTML);
    $("#endtimespan").val(document.getElementById("endtime_" + faultid).innerHTML);
    document.getElementById("maintaincostsspan").innerText = document.getElementById("maintaincosts_" + faultid).innerHTML;
    document.getElementById("contentspan").innerText = document.getElementById("content_" + faultid).innerHTML;
    DisChange();
    StartChange();
}

//点击“新增”，初始化显示
function SetAdd() {
    Setgzdj();
    Setfzr();
    $("#hid_gzid").val("-1");
    document.getElementById("DetailName").innerText = "新增故障";
   // document.getElementById("faultlevelspan").innerText = "";
    $("#hid_gzdj").val("");
    //document.getElementById("equnamespan").innerText = "";
    //$("#hid_sbmc").val("");
    $("#discoverytimespan").val("");
    $("#faultdescriptionspan").val("");
    $("#maintainunitsspan").val("");
   // document.getElementById("staffnamespan").innerText = "";
    $("#hid_fzr").val("");
    $("#starttimespan").val("");
    $("#endtimespan").val("");
    document.getElementById("maintaincostsspan").innerText = "";
    document.getElementById("contentspan").innerText = "";
    $("#starttimespan").attr("disabled", "disabled");
    $("#endtimespan").attr("disabled", "disabled");
}

//编辑/新增处保存
function UpdateAdd() {
    var cost = $("#maintaincostsspan").val();
    if (!IsDigit(cost)) {
        UEEPAlert('维修费用需要输入数字！'); return;
    }
    //int id, string instancecode, int faultsource, string faultlevel, string discoverytime, string faultdescription, string maintainunits, int staffid, int maintainstate, string starttime, string endtime, double maintaincosts, string content
    var id = $("#hid_gzid").val();
    var instancecode = $("#hid_sbmc").val();
    var faultlevel = $("#hid_gzdj").val();
    var discoverytime = $("#discoverytimespan").val();
    var faultdescription = $("#faultdescriptionspan").val();
    var maintainunits = $("#maintainunitsspan").val();
    var staffid = $("#hid_fzr").val().length == 0 ? 0 : $("#hid_fzr").val();
    var starttime = $("#starttimespan").val();
    var endtime = $("#endtimespan").val();
    var maintaincosts = document.getElementById("maintaincostsspan").value == "" ? 0 : document.getElementById("maintaincostsspan").value;
    var content = document.getElementById("contentspan").innerText;
    if (discoverytime == "")
    {
        UEEPAlert('请选择故障发现时间！');
        return;
    }

    $.ajax({
        type: "POST",//这里是http类型
        url: "/EquFault/UpdateEditAdd",//大家都应该很清楚了
        async: false,
        data: { id: id, instancecode: instancecode, faultlevel: faultlevel, discoverytime: discoverytime, faultdescription: faultdescription, maintainunits: maintainunits, staffid: staffid, starttime: starttime, endtime: endtime, maintaincosts: maintaincosts, content: content},//回传一个参数
        dataType: "json",//传回来的数据类型
        success: function (data) {
        },
        error: function (xmlHttpRequest) {
            UEEPAlert('输入有误，请重新输入！');
        }
    });
    $.fancybox.close();
    QueryEquFaultList(1, 10, 0);
}

//点击某行，弹出详细信息
function AlertDetial(faultid) {
    document.getElementById("DetailNamed").innerText = document.getElementById("equname_" + faultid).innerHTML + "故障详细信息";
    document.getElementById("faultlevelspand").innerText = document.getElementById("faultlevel_" + faultid).innerHTML;
    $("#hid_gzdjd").val(document.getElementById("faultlevelcode_" + faultid).innerHTML);
    document.getElementById("equnamespand").innerText = document.getElementById("equname_" + faultid).innerHTML;
    $("#hid_sbmcd").val(document.getElementById("equnamecode_" + faultid).innerHTML);
    $("#discoverytimespand").val(document.getElementById("discoverytime_" + faultid).innerHTML);
    $("#faultdescriptionspand").val(document.getElementById("faultdescription_" + faultid).innerHTML);
    $("#maintainunitsspand").val(document.getElementById("maintainunits_" + faultid).innerHTML);
    document.getElementById("staffnamespand").innerText = document.getElementById("staffname_" + faultid).innerHTML;
    $("#hid_fzrd").val(document.getElementById("staffnamecode_" + faultid).innerHTML);
    $("#starttimespand").val(document.getElementById("starttime_" + faultid).innerHTML);
    $("#endtimespand").val(document.getElementById("endtime_" + faultid).innerHTML);
    document.getElementById("maintaincostsspan").innerText = document.getElementById("maintaincosts_" + faultid).innerHTML;
    document.getElementById("contentspand").innerText = document.getElementById("content_" + faultid).innerHTML;
}

//点击“维修完成"，更新维修状态，后禁用“编辑”、“删除”按钮
function Fixed(faultid) {
    if (confirm('设备故障维修信息，是否全部输入完成？如果选择确认，该记录则不能进行修改和删除操作！')) {
        $.ajax({
            type: "POST",//这里是http类型
            url: "/EquFault/Fixed",//大家都应该很清楚了
            async: false,
            data: "id=" + faultid,
            dataType: "json",//传回来的数据类型
        });
        history.go(0);
    }
}

//发现时间不为空，才可启用维修维修开始时间段
function DisChange() {
    if ($("#discoverytimespan").val().length > 3) {
        $("#starttimespan").removeAttr("disabled");
    } else {
        $("#starttimespan").attr("disabled", "disabled");
    }
}

//维修开始时间不为空，才可启用维修结束时间
function StartChange() {
	//UEEPAlert($("#starttimespan").val());
    if ($("#starttimespan").val().length > 3) {
        $("#endtimespan").removeAttr("disabled");
    } else {
        $("#endtimespan").attr("disabled", "disabled");
    }
}