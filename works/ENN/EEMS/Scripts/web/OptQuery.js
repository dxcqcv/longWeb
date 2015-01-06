//#region 前台页面处理
$(document).ready(function () {
	$("#nyglinul li").bind("click", function () {
		$("#nyglinul li").removeClass("nyglinulsel");
		$(this).addClass("nyglinulsel");
	});
});
function checkAll() {

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
}

function editedata() {
	$(".txttblval").css("display", "inline");
}
function savedata() {	
	$(".txttblval").css("display", "none");
}
//#endregion

$(function () {
	LoadEquTypeSelectList();
	LoadEquSelectList($("#selEquType p.text").attr("val"));
	LoadEquDataList();
});

function InitPager(totalPage) {
	if (totalPage < 10) { $("#Pagination").empty(); return false; }
	//分页，PageCount是总条目数，这是必选参数，其它参数都是可选
	$("#Pagination").pagination(totalPage, {
		callback: PageCallback,
		prev_text: '上一页',       //上一页按钮里text
		next_text: '下一页',       //下一页按钮里text
		items_per_page: 10,  //显示条数
		num_display_entries: 3,    //连续分页主体部分分页条目数
		current_page: 0,   //当前页索引
		num_edge_entries: 1        //两侧首尾分页条目数
	});

	//翻页调用
	function PageCallback(index, jq) {
		PageControl($("#tblData tr"), index + 1, 10);
	}
}
function PageControl(rows, page, pagecount) {
	var rowcount = rows.length + 1;
	var startrow = (pagecount * (page - 1)) + 1;
	var endrow = startrow + pagecount;
	if (endrow > rowcount) {
		endrow = rowcount;
	}
	for (var i = 1; i < rowcount; i++) {
		if (i >= startrow && i < endrow) {
			rows.eq(i - 1).show();
		}
		else {
			rows.eq(i - 1).hide();
		}
	}
}

//加载设备类型选择框列表
function LoadEquTypeSelectList() {
	$.ajax({
		type: "POST", url: "/OptEquPlan/EquTypeList", async: false,
		data: {}, dataType: "json",
		success: function (responseJSON) {
			var str = "<li val=''><a href=''>全部设备类型</a></li>";
			$.each(responseJSON, function (n, value) {
				str += "<li val='" + value.modelcode + "'><a href=''>" + value.name + "</a></li>";
			});
			$("#selEquType").find("ul").empty().append(str);
			$("#selEquType").simSelect({
				callback: function (x, v) {
					if (!x) return;
					LoadEquSelectList(v);
				}
			});
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			UEEPAlert(XMLHttpRequest.responseText);
		}
	});
}

//加载设备选择框列表
function LoadEquSelectList(equType) {
	$.ajax({
		url: "/OptEquPlan/EquList", type: "POST", async: false,
		data: { equType: equType }, dataType: "json",
		success: function (responseJSON) {
			var strSelectEqu = "<li val=''><a href=''>请选择设备</a></li>";
			$.each(responseJSON, function (n, value) {
				strSelectEqu += "<li val='" + value.equcode + "'><a href=''>" + value.equname + "</a></li>";
			});
			$("#selEquList").find("ul").empty().append(strSelectEqu);
			$("#selEquList").simSelect({
				callback: function (x, v) {
					if (!x) return;
				}
			});
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			UEEPAlert(XMLHttpRequest.responseText);
		}
	});
}

//加载设备启停计划表历史纪录
function LoadEquDataList() {
	var tmStart = $("#startTime").val();
	var tmEnd = $("#endTime").val();
	if (tmEnd < tmStart) {	
	    UEEPAlert('结束时间应大于开始时间！');
		return;
	}
	$.ajax({
		url: "/OptQuery/LoadEquDataList", type: "POST", async: false,
		data: { startTime: tmStart, endTime: tmEnd, equType: $("#selEquType p.text").attr("val"), equName: $("#selEquList p.text").attr("val") }, dataType: "json",
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
				str += '<td class="tdW150">' + value.ptime + '</td>';
				str += '<td class="tdW200">' + value.name + '</td>';
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

