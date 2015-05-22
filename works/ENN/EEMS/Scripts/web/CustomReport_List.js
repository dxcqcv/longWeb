$(document).ready(function () {
    initData(1, 10, 0);
});
function AddData() {
    uploadClose();
    $("#name").removeAttr("readonly");
    $("#id").val(-1);
    $("#name").val("");
    $("#type").val("");
    $("#type").attr("disabled", false);
    $("#status").val("");
    $("#funcname").val("");
    $("#header").val("");
    $("#codes").val("");
    $("#timetype").val("");
    $("#header").val("");
    $("#tb_report").empty();
    $("#tb_report").append("<h2 style='text-align:center'>报表预览</h2>");
}
function initData(pageindex, numberOfPages, flag) {
    $.ajax({
        type: "POST",//这里是http类型
        url: "/CustomReport/List",//大家都应该很清楚了
        async: false,
        data: "currentPage=" + pageindex + "&numberOfPages=" + numberOfPages + "&name=" + $("#rename").val(),//回传一个参数
        dataType: "json",//传回来的数据类型
        success: function (responseJSON) {
            $("#tb_container").empty();
            $.each(responseJSON, function (n, value) {
                var str = "<tr>" +
                "<td>" + value.name +
                "</td>";
                if (value.type==1){
                    str = str + "<td>" + "一类" + "</td>";
                } else if (value.type == 2) {
                    str = str + "<td>" + "二类" + "</td>";
                }
                if (value.status == 1) {
                    str = str + "<td>" + "显示" + "</td>";
                } else if (value.status == 2) {
                    str = str + "<td>" + "隐藏" + "</td>";
                }
                str = str +
               "<td>" + value.timetype +
                "</td>" +
                "<td > <a class=\"ico-op ico-opUpdate fancybox\"  onclick=\"LoadData(" + value.id + ")\"  href=\"#pop-onupdate\"></a>" +
                "<a class=\"ico-bpgl ico-Set\" onclick=\"DeleteRole(" + value.id + ")\" ></a>" +
                "</td>" +
            "</tr>";
                $("#tb_container").append(str);
                $("#tb_container tr:odd").addClass("odd");
            });
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            UEEPAlert(XMLHttpRequest.responseText);
        }
    });
}
//提交按钮执行
function SubmitAdd() {  
    if (!validateForm()) return;
    if (!$('#pageform').valid()) return;
    //提交，存入数据库
    $("#pageform").ajaxSubmit({
        type: 'post',
        url: "/CustomReport/Edit",
        success: function (data) {
            if (data == 'OK') {
                location.href = "/CustomReport/List";
                //initData();
                //$.fancybox.close();
            } else {
                UEEPAlert("添加失败");
            }
        },
        error: function (XMLResponse) {
            UEEPAlert(XMLResponse.responseText);
        }
    });
}
//加载导航数据
function LoadData(id) {
    uploadClose();
    $("#name").attr("readonly", "readonly");
    $.ajax({
        type: "POST",//这里是http类型
        url: "/CustomReport/LoadInfo",//大家都应该很清楚了
        async: false,
        data: { id: id, temp: Math.random() },//回传一个参数
        dataType: "json",//传回来的数据类型
        success: function (data) {
            if (data != null) {
                $("#id").val(data.id);
                $("#name").val(data.name);
                $("#type").val(data.type);
                $("#type").attr("disabled", true);
                $("#status").val(data.status);
                $("#funcname").val(data.funcname);
                $("#header").val(data.header);
                $("#codes").val(data.codes);
                $("#timetype").val(data.timetype);

                if ($("#header").val() != "") {
                    $("#tb_report").empty();
                    $("#tb_report").append($("#header").val());
                    $("#tb_report").find("table").find("tr").each(function () {
                        var tr = $(this);
                        tr.find("td").each(function () {
                            var td = $(this);
                            td.find("input").each(function () {
                                var input = $(this);
                                input.val(td.attr("id"));
                            });
                        });
                    });
                }
                if (data.timetype != "") {
                    for (var i = 0; i < data.timetype.split(',').length; i++) {
                        var type = data.timetype.split(',')[i];
                        $("input[name='checkbox']").each(function () {
                            var input = $(this);
                            if (type == input.val()) {
                                input.attr("checked", 'true');
                            }
                        });
                    }

                }
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            UEEPAlert(XMLHttpRequest.responseText);
        }
    });
}
function DeleteRole(roleid) {
    UEEPConfirm('确认删除吗？', function (r) {
        if (r == true) {
            location.href = "/CustomReport/delete/" + roleid;
            return true;
        } else {
            return false;
        }
    });
}


function validateForm() {
        var str = "";
        $("#timetype").val("");
        $("input[name='checkbox']").each(function () {
            var input = $(this);
            if (input.prop("checked") == true) {
                str += $(this).val() + ",";
            }
        });
        $("#timetype").val(str.substring(0, str.length - 1));

        var bl = true;
        var codes = "";
        var i = 0;
        var cedian = /^[a-zA-Z0-9_]{1,}$/; //测点只能由字母数字下划线组成
        var yanzheng = /^[A-Za-z]+$/; //测点必须以英文字母开头
        $("#tb_report").find("table").find("tr").each(function () {
            var tr = $(this);
            tr.find("td").each(function () {
                if (!bl) { return false; }//结束function
                var td = $(this);
                td.find("input").each(function () {
                    var input = $(this);
                    if (input.val() == "") {
                        input.focus();
                        bl = false;
                        UEEPAlert("表头列名不能为空!");
                        return false;
                    }
                    if (!input.val().match(cedian)) {
                        input.focus();
                        bl = false;
                        UEEPAlert("表头列名只能由字母数字下划线组成!");
                        return false;
                    }
                    if (!input.val().substr(0, 1).match(yanzheng)) {
                        input.focus();
                        bl = false;
                        UEEPAlert("表头列名必须以英文字母开头!");
                        return false;
                    }
                    td.attr('id',input.val());
                    if (i == 0) {
                        codes = input.val();
                    } else {
                        codes = codes + "," + input.val();
                    }
                    i++;
                });
            });
        });
        if ($("#timetype").val() == "") {
            bl = false;
            UEEPAlert("可查询时间必须选择一个!");
            return false;
        }
        if (codes == "") {
            bl = false;
            UEEPAlert("表头不能为空!");
            return false;
        }
        //alert($("#tab")[0].outerHTML);
        if (!bl) { return false; }//结束function
        $("#codes").val(codes); //测点
        $("#header").val($("#tb_report")[0].innerHTML); //报表表头
        return true;
    }

//打开导入面板
function uploadExcel() {
    $("#modal-container-725153").show();
}
function uploadClose() {
    $("#modal-container-725153").hide();
}
//导出Excel编辑
function exportExcel() {
    var data = "";
    $("#tb_report").find("table").find("tr").each(function () {
        var tr = $(this);
        tr.find("td").each(function () {
            var td = $(this);
            var rowspan = td.attr("rowspan") ? td.attr("rowspan") : 1;
            var colspan = td.attr("colspan") ? td.attr("colspan") : 1;
            data = data + td.text().trim() + "$$$$$" + rowspan + "$$$$$" + colspan + "*****";
        });
        data = data + "|||||";
    });
    //var sHtml = htmlEncode($("#MyTable")[0].outerHTML);//做html编码
    $("input[name='htmlTableStr']").val(data);
    //表单提交
    //$("form[name='myForm']").attr("target", "_blank");
    $("form[name='myForm']").submit();
}
function htmlEncode(value) {
    //create a in-memory div, set it's inner text(which jQuery automatically encodes)
    //then grab the encoded contents back out.  The div never exists on the page.
    return $('<div/>').text(value).html();
}
////////导入开始///////
function save() {
    var options = {

        beforeSubmit: showRequest,
        error: showError,
        success: showResponse
    };

    $('#filePost').ajaxSubmit(options);
}

$(document).ready(function () {
    var options = {
        target: '#outputdiv',
        beforeSubmit: showRequest,
        error: showError,
        success: showResponse
    };
    $('#filePost').submit(function () {
        $(this).ajaxSubmit(options);
        return false;
    });
});
function showRequest(formData, jqForm, options) {
    //alert('发送前');
    if ($("#file").val() == "") {
        UEEPAlert("请选择要导入的文件！");
        return false;
    }
    return true;
}
function showError(data) {
    UEEPAlert('导入出错！');
}

function showResponse(htmltable) {
    $("#modal-container-725153").hide();
    if (htmltable != null) {
        $("#tb_report").empty();
        $("#tb_report").append(htmltable);//加载显示报表表头
        addInput();//给最后一行加输入框

    }
    // alert(htmltable + "," + '发送后');
}
////////导入结束///////

function addInput() {
    var type = $('#type option:selected').val();//选中的值（报表类型：一类、二类）
    if (type == 1) {
        //0->第一行 1->第二行 -2->倒数第二行 -1->最后一行
        //获取table最后一行 $("#tab tr:last")
        //获取table第一行 $("#tab tr").eq(0)
        //获取table倒数第二行 $("#tab tr").eq(-2)
        //var codes = $("#codes").val().split(","); //测点
        var tr = "";
        $("#tb_report").find("table").find("tr").each(function () {
            tr = $(this);
        });
        tr.find("td").each(function () {
            var td = $(this);
            var text = td.text().trim();
            if (text != "时间" && text != "日期") {
                var value = "";
                ////创建文本框
                var textBox = '<br/><input style ="width:80px;height:40px" type="text" value="' + value + '" />';
                td.append(textBox);
            }
        });
        //tr.appendTo("#tab");
    }
    if (type == 2) {
        //var codes = $("#codes").val().split(","); //测点
        $("#tb_report").find("table").find("tr").each(function () {
            var tr = $(this);
            tr.find("td").each(function () {
                var td = $(this);
                var text = td.text().trim();
                if (text == "") {
                    var value = "";
                    ////创建文本框
                    var textBox = '<br/><input style ="width:80px;height:40px" type="text" value="' + value + '" />';
                    td.append(textBox);
                }
                if (text != "" && text.charAt(0) == "#") {
                    var value = text.substr(1, text.length - 1);
                    ////创建文本框
                    var textBox = '<br/><input style ="width:80px;height:40px" type="text" value="' + value + '" />';
                    td.text('');
                    td.append(textBox);
                }
            });
        });
    }
}
