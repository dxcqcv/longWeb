//提价按钮执行
function SubmitPlanAdd() {
    //提交，存入数据库
    $("#pageform").ajaxSubmit({
        type: 'post',
        url: "/Navigation/Edit",
        success: function (data) {
            if (data > 0) {
                location.href = "/Navigation/List/";
            } else {
                alert("计划添加失败");
            }
        },
        error: function (XMLResponse) {
            alert(XMLResponse.responseText);
        }
    });
}