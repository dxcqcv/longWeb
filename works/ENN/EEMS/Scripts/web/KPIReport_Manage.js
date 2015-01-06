$(document).ready(function () {
    var d = new Date();
    $("#quiry-year").val(d.getFullYear());
    $("#hid_rid").val($('#myTab li:first').attr("id"));
    $("[name='checkbox']").prop("checked", true);
    $("#checkAll").attr("checked", "checked");
    loadData();
    $("#sub-save").hide();//隐藏保存按钮

    $("#nyglinul li").bind("click", function () {
        $("#nyglinul li").removeClass("nyglinulsel");
        $(this).addClass("nyglinulsel");
    });

    $(".month_tbl tr td input").change(function () {
        var checkedNum = $('.month_tbl tr td input:checkbox:checked').length;
        if (checkedNum < 13) $("#checkAll").removeAttr("checked");
        else if (checkedNum == 13) $("#checkAll").attr("checked", "checked");
    });
});
////////切换tab//////////
$(function () {
    $('#myTab li:first').attr("class", "selected"); //初始化显示哪个tab
    $('#myTab li').click(function () {
        var idtext = $(this).attr("id");
        $('#myTab li').each(function () {
            $(this).removeAttr("class");
        });
        $("#" + idtext).attr("class", "selected");//显示当前选中的链接及关联的content
        $("#hid_rid").val(idtext);
        loadData();
    });
});
//加载数据
function loadData() {
    var year = $("#quiry-year").val();
    var month = $("#hid_rid").val().replace("tab-", "");
    $.ajax({
        type: "POST",//这里是http类型
        url: "/KPIReport/GetKPIList",//大家都应该很清楚了
        async: false,
        data: { year: year, month: month },//回传一个参数
        dataType: "json",//传回来的数据类型
        success: function (responseJSON) {
            $("#tb_container").empty();
            $.each(responseJSON, function (n, value) {
                var str = "<tr ";
                if ((n % 2) == 0) {
                    str += "class=\"even\" id=\"tr_" + value.id + "\">";
                } else {
                    str += "class=\"odd\" id=\"tr_" + value.id + "\">";
                }

                str += "<td style=\"display:none;\">" + value.id +
                "</td>" +
                "<td >" + value.year +
                "</td>" +
                "<td>" + changeYear(value.month) +
                "</td>" +
                "<td>" + funtype(value.function) +
                "</td>" +
                "<td>" + value.name +
                "</td>" +
                "<td>" + value.code +
                "</td>" +
                "<td>" + value.norm +
                "</td>" +
                "<td>" + value.weights +
                "</td>" +
                "<td>" +
                "<a class=\"ico-Op ico-Delete\" onclick=\"Delete(" + value.id + ")\"> </a>" +
                "</td>" +
            "</tr>";
                $("#tb_container").append(str);
            });
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            UEEPAlert(XMLHttpRequest.responseText);
        }
    });
    $("#sub-save").hide();//隐藏保存按钮
    $("#sub-edit").show();//保存编辑按钮
}

function changeYear(num) {
    if (num == 13) {
        return "全年";
    } else {
        return num;
    }
}

//添加kpi指标
function AddKPI() {
    $("#ipu_add_month").val($("#hid_rid").val().replace("tab-", ""));
    $("#ipu_add_year").val($("#quiry-year").val());
    $("#sele_type").val("0");
    $("#name").val("");
    $("#code").val("");
    $("#norm").val("");
    $("#checkAll").attr("checked", 'true');//全选     
}
//添加kpi指标
function AddPermissionGroupDialog() {
    $("#ipu_add_month").val($("#hid_rid").val().replace("tab-", ""));
    $("#ipu_add_year").val($("#quiry-year").val());
    //判断用户的信息是否通过验证
    //if (!$('#ff_add').valid()) return;
    var postData = $("#ff_add").serializeArray();
    if (postData[4].value.toString().length == 0 || postData[5].value.toString().length == 0 || postData[6].value.toString().length == 0) {
        UEEPAlert("名称、测点、指标为必填，请填写完整");
        return;
    }
    //获取参数传递到后台
    $.each($("[name='checkbox']"), function (n, value) {
        if ($(this).prop("checked") == true) {
            $("#ipu_add_month").val($(this).val());
            postData = $("#ff_add").serializeArray();
            //发送异步请求到后台添加菜单组
            $.post('/KPIReport/Add', postData, function (data) {
                if (data == "OK") {
                    $.fancybox.close();
                    loadData();
                }
                else {
                    UEEPAlert('失败');
                }
            });
        }
    });
}
//启动编辑
function EditData() {
    var rowcount = $("#tab-data tr").length;
    for (var i = 1; i < rowcount; i++) {
        var code = $("#tab-data tr:eq(" + i + ") td:eq(6)").text();
        var weights = $("#tab-data tr:eq(" + i + ") td:eq(7)").text();
        $("#tab-data tr:eq(" + i + ") td:eq(6)").html("<input class=\"txttblval\" type=\"text\" value=\"" + code + "\"/>");
        $("#tab-data tr:eq(" + i + ") td:eq(7)").html("<input class=\"txttblval\" type=\"text\" value=\"" + weights + "\"/>%");
    }
    $("#sub-save").show();//显示保存按钮
    $("#sub-edit").hide();//影藏编辑按钮
}
//启动保存
function UpdateData() {
    var rowcount = $("#tab-data tr").length;
    for (var i = 1; i < rowcount; i++) {
        var id = $("#tab-data tr:eq(" + i + ") td:eq(0)").text();
        var code = $("#tab-data tr:eq(" + i + ") td:eq(6)").find('input').val();
        var weights = $("#tab-data tr:eq(" + i + ") td:eq(7)").find('input').val();
        if (!IsPositiveInt(weights))
        {
            UEEPAlert('权重需要输入正整数！');
            return;
        }
        if (typeof (code) == "undefined") {
            return;
        }
        if (typeof (weights) == "undefined") {
            return;
        }

        $.ajax({
            type: "POST",//这里是http类型
            url: "/KPIReport/Update",//大家都应该很清楚了
            async: false,
            data: { id: id, code: code, weights: weights },//回传一个参数
            dataType: "json",//传回来的数据类型
            success: function (data) {
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest.responseText);
            }
        });
    }
    loadData();
    $("#sub-save").hide();//隐藏保存按钮
    $("#sub-edit").show();//保存编辑按钮
}
//删除
function Delete(id) {
    UEEPConfirm('确认删除吗？',function (r) {
        if (r == true) {
            $.ajax({
                type: "POST",//这里是http类型
                url: "/KPIReport/delete",//大家都应该很清楚了
                async: false,
                data: { id: id },//回传一个参数
                dataType: "json",//传回来的数据类型
                success: function (data) {
                    $("#tr_" + id + "").remove();
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    UEEPAlert(XMLHttpRequest.responseText);
                }
            });
        } else {
            return false;
        }
    });
}
//查询
function QueryData() {
    loadData();
}
//生成下一年
function NextYearData() {
    $.ajax({
        type: "POST",//这里是http类型
        url: "/KPIReport/GenerateNextYear",//大家都应该很清楚了
        async: false,
        data: { year: $("#quiry-year").val() },//回传一个参数
        dataType: "json",//传回来的数据类型
        success: function (data) {
            UEEPAlert(data);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            UEEPAlert(XMLHttpRequest.responseText);
        }
    });
}

function editedata() {
    $(".txttblval").css("display", "inline");
}
function savedata() {
    UEEPAlert("sf");
    $(".txttblval").css("display", "none");
}

//checkbox全选
$("#checkAll").change(function checkAll() {
    if ($("#checkAll").attr("checked") == "checked") {
        $(".month_tbl tr td input").each(function () {
            $(this).attr("checked", "checked");
        });
    }
    else {
        $(".month_tbl tr td input").each(function () {
            $(this).removeAttr("checked");
        });
    }
});

//数据转化
function funtype(ftype) {
    var str = '升优';
    if (ftype == '0') {
        str = '降优';
    }
    return str;
}
