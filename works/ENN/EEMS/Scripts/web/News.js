function LoadNewsList() {
    var title = $("#newsTitle").val();
    var crtTime = $("#createTime").val();
    
    $.ajax({
        url: "/News/LoadNewsList", type: "POST",
        async: false,
        data: { title: title, createTime: crtTime },
        dataType: "json",
        success: function (data) {
            var str = "";
            if (data == null || data.length < 1) {
                $("#tblData").html("<div class='yred tcenter'>数据为空</div>");
                return;
            }
            $.each(data, function (i, value) {
                if (i % 2 == 0)
                    str += '<tr class="odd">';
                else
                    str += '<tr class="even">';
                str += '<td class="tdW50">' + (i + 1) + '</td>';
                str += '<td class="tdW150">' + value.title + '</td>';
                str += '<td class="tdW200">' + value. + '</td>';
                str += '<td>' + value.instancename + '</td>';
                str += '<td class="tdW130">' + value.parameters + '</td>';
                str += '<td class="tdW130">' + value.value + '</td>';
                str += '<td class="tdW90">';
                if (value.state == "1") str += '启'; else str += '停';
                str += '</td>';
                str += '</tr>';
            });
            $("#tblData").empty().append(str);
            InitPager(data.length);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            UEEPAlert(XMLHttpRequest.responseText);
        }
    });
}