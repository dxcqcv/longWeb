$(document).ready(function () {
    var selectval = $("#repairway").children("option:selected").val();
    if (selectval == "1") {
        $("#div_planrepairtime").show();
        $("#div_repaircycle").hide();
    }
    else {
        $("#div_repaircycle").show();
        $("#div_planrepairtime").hide();
    }
    var seleequcode = $("#sle_equcode").children("option:selected").val();
    //$("#lastrepair").val(getlastrepair(seleequcode));
    if (parseInt($("#planid")) > 0) {
        $("#div_timingmainttype").hide();
        $("#div_repaircycle").hide();
        $("#div_planrepairtime").show();
    }
});
$("#signupForm").validate({
    errorElement: "span",
    // 添加验证规则
    rules: {
        manufacturer: {
            required: true,
            remote: {
                type: "post",
                url: "/EquFault/CheckStaffname",
                data: {
                    staffname: function () {
                        return $("#manufacturer").val();
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
        }
    },
    success: function (label) {
        //正确时的样式
        label.text(" ").addClass("success");
    },
    //重设提示信息
    messages: {
        manufacturer: {
            required: "请填写用户名",
            remote: "姓名重复"
        }
    }
});
$(function () {
    $('.input-append').datetimepicker({
        pickTime: false,
        language: 'zh-CN',
        autoclose: true

    });
});
$("#sle_equcode").change(function () {
    var seleequcode = $("#sle_equcode").children("option:selected").val();
    //$("#lastrepair").val(getlastrepair(seleequcode));
});
$("#repairway").change(function () {
    var selectval = $(this).children("option:selected").val();
    if (selectval == "1") {
        $("#div_planrepairtime").show();
        $("#div_repaircycle").hide();
    }
    else {
        $("#div_repaircycle").show();
        $("#div_planrepairtime").hide();
    }
});

function getlastrepair(equcode) {
    var lastrepair = "";
    $.ajax({
        type: "POST",//这里是http类型
        url: "/EquOverhaul/Getlastrepair",//大家都应该很清楚了
        async: false,
        data: { equcode: equcode },//回传一个参数
        dataType: "json",//传回来的数据类型
        success: function (data) {
            lastrepair = data;
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            UEEPAlert(XMLHttpRequest.responseText);
        }
    });
    return lastrepair;
}
//负责人处出弹出弹
function InsManufacturer() {
    if (!$('#signupForm').valid()) return;
    $.ajax({
        type: "POST",//这里是http类型
        url: "/EquFault/InsStaffData",//大家都应该很清楚了
        async: false,
        data: "staffname=" + $("#manufacturer").val(),//回传一个参数
        dataType: "json",//传回来的数据类型
        success: function (data) {
            if (data.staffname != "") {
                $("#staffid").get(0).options.add(new Option(data.staffname, data.staffid));
                $("#manufacturer").val("");
                $("#modal-container-725153").modal('hide');
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            UEEPAlert(XMLHttpRequest.responseText);
        }
    });
}
//提价按钮执行
function SubmitPlanAdd() {
    //提交，存入数据库
    $("#pageform").ajaxSubmit({
        type: 'post',
        url: "/EquMaint/PlanAdd",
        success: function (data) {
            if (data > 0) {
                location.href = "/EquMaint/PlanManage/";
            } else {
                alert("计划添加失败");
            }
        },
        error: function (XMLResponse) {
            alert(XMLResponse.responseText);
        }
    });
}
