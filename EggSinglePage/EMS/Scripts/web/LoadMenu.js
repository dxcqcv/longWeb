//导航加载
$(document).ready(function () {
    $.ajaxSetup({
        cache: false
    });
    LoadMenuParent();
});
function LoadMenuParent() {
    $.ajax({
        type: "POST",//这里是http类型
        url: "/Navigation/Navijs",//大家都应该很清楚了
        async: false,
        data: "strLevel=0",//回传一个参数
        dataType: "json",//传回来的数据类型
        success: function (responseJSON) {
            $("#menuroot").empty();
            if (responseJSON.data.length > 0) {
                $.each(responseJSON.data, function (i, data) {
                    switch (data.level) {
                        case 1:
                            _oneLevelHtml(data);
                            break;
                        default:
                            _otherLevelHtml(data);
                            break;
                    }
                });
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            UEEPAlert(XMLHttpRequest.responseText);
        }
    });
};
//_test();
//* 一级代码 */
function _oneLevelHtml(dr) {
    var sonico = "";
    if (dr.sons > 0) {
        sonico = "arrow";
    }
    var ul = $("#menuroot");
    var el = "<li class=\"active \">" +
             "<a href=\"javascript:;\">" +
               "<i class=\"icon-folder-open\"></i>" +
                "<span class=\"title\">" + dr.name + "</span>" +

                "<span class=\"" + sonico + "\"></span>" +
             "</a>" +
              "<ul class=\"sub-menu\" id=\"ul_" + dr.id + "\">" +
              "</ul>"
    ul.append(el);
}
/* 多级代码 */
function _otherLevelHtml(dr) {
    var ul = $("#ul_" + dr.pid);
    if (ul.length == 0) {
        //alert("未找到ul_" + dr.pid);
        return false;
    }
    var sonico = "";
    var sontitle = "<i class=\"icon-folder-open\"></i>" + dr.name.replace('一 ', '');
    var sonfood = "";
    if (dr.sons > 0) {
        sonico = "arrow";
        sontitle = "<i class=\"icon-folder-open\"></i><span class=\"title\">" + dr.name.replace('一 ', '') + "</span><span class=\"" + sonico + "\"></span>";
        sonfood = "<ul class=\"sub-menu\" id=\"ul_" + dr.id + "\"></ul>";
    }
    var el = "<li class=\"active \">" +
             "<a href=\"" + dr.url + "\">" +
                sontitle +
             "</a>" + sonfood
    ul.append(el);
}
//function _setDefaultOpenState() {
//    var ul = $("#menuroot");
//    var divs = $("#menuroot div");
//    for (var i = 0; i < divs.length; i++) {
//        if (divs[i].id.substring(0, 2) == "o_" && divs[i].attr("pid") == "0") {
//            _c1(divs[i].id.replace(/o_/g, ''));
//            break;
//        }
//    }
//}