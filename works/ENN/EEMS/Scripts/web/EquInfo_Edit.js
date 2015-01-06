
    $(function () {
        $('.input-append').datetimepicker({
            pickTime: false,
            format: 'yyyy-MM-dd',
            language: 'zh-CN'
        });
    });
function SetFlag(flag) {
    if (flag == "1") {
        $("#myModalLabel").html("添加生产厂商");
    }
    else if (flag == "2") {
        $("#myModalLabel").html("添加供应商");
    }
}
function InsManufacturer() {
    if (!$('#signupForm').valid()) return;
    if ($("#myModalLabel").html() == "添加生产厂商") {
        $.ajax({
            type: "POST",//这里是http类型
            url: "/EquInfo/InsManufacturer",//大家都应该很清楚了
            async: false,
            data: "type=" + 1 + "&name=" + $("#manufacturer").val(),//回传一个参数
            dataType: "json",//传回来的数据类型
            success: function (data) {
                if (data != "") {
                    $("#facturer").get(0).options.add(new Option(data, data));
                    $("#manufacturer").val("");
                    $("#modal-container-725153").modal('hide');
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                UEEPAlert(XMLHttpRequest.responseText);
            }
        });
    }
    else if ($("#myModalLabel").html() == "添加供应商") {
        $.ajax({
            type: "POST",//这里是http类型
            url: "/EquInfo/InsManufacturer",//大家都应该很清楚了
            async: false,
            data: "type=" + 2 + "&name=" + $("#manufacturer").val(),//回传一个参数
            dataType: "json",//传回来的数据类型
            success: function (data) {
                if (data != "") {
                    $("#supplier").get(0).options.add(new Option(data, data));
                    $("#manufacturer").val("");
                    $("#modal-container-725153").modal('hide');
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                UEEPAlert(XMLHttpRequest.responseText);
            }
        });
    }
}
$("#signupForm").validate({
    errorElement: "span",
    // 添加验证规则
    rules: {
        manufacturer: {
            required: true,
            remote: {
                type: "post",
                url: "/EquInfo/CheckManufacturer",
                data: {
                    name: function () {
                        return $("#manufacturer").val();
                    },
                    type: function () {
                        if ($("#myModalLabel").html() == "添加生产厂商") {
                            return 1;
                        } else {
                            return 2;
                        }
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
            required: "请填写厂商名",
            remote: "厂商重复"
        }
    }
});
function InsEquhead() {
    if (!$('#signupForm1').valid()) return;
    $.ajax({
        type: "POST",//这里是http类型
        url: "/EquFault/InsStaffData",//大家都应该很清楚了
        async: false,
        data: "staffname=" + $("#StaffData").val(),//回传一个参数
        dataType: "json",//传回来的数据类型
        success: function (data) {
            if (data.staffname != "") {
                $("#equhead").get(0).options.add(new Option(data.staffname, data.staffname));
                $("#StaffData").val("");
                $("#modal-container-725154").modal('hide');
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            UEEPAlert(XMLHttpRequest.responseText);
        }
    });
}
$("#signupForm1").validate({
    errorElement: "span",
    // 添加验证规则
    rules: {
        StaffData: {
            required: true,
            remote: {
                type: "post",
                url: "/EquFault/CheckStaffname",
                data: {
                    staffname: function () {
                        return $("#StaffData").val();
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
        StaffData: {
            required: "请填写用户名",
            remote: "姓名重复"
        }
    }
});
