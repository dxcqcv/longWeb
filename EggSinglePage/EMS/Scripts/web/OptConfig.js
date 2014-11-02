//#region 前台页面效果
$(document).ready(function () {
	if (!window.console) {
		console = {};
		console.log = function () { };
	}

	$("#nyglinul li").bind("click", function () {
		$("#nyglinul li").removeClass("nyglinulsel");
		$(this).addClass("nyglinulsel");
	});
	// for yhpz
	var yhpzPriority = $('.yhpzPriority');
	var yhpzNonpriority = $('.yhpzNonpriority');
	var xmmcList = $('.xmmc').children('ul').children('li');
	xmmcList.on('click', function () {
		var $this = $(this);
		$this.addClass('xmmcSel').siblings('li').removeClass('xmmcSel');
	});

	var rdoPriority2 = $('#rdoPriority2');
	var rdoPriority1 = $('#rdoPriority1');
	var startPriority = true;
	rdoPriority2.on('change', function () {
		if ($(this).attr("checked") === "checked") {
			startPriority = false;
		}
	});
	rdoPriority1.on('change', function () {
		if ($(this).attr("checked") === "checked") {
			startPriority = true;
		}
	});
	var abUp = $('.abUp');
	var abDown = $('.abDown');
	abUp.on('click', function () {
		if (startPriority == true) {
			var li = $('.xmmcSel');
			if (li.index() == 0) {
				//alert('already top');
			} else {
				li.after(li.prev());
			}
		} else {
			//alert('no priority'); 
		}
	});
	abDown.on('click', function () {
		if (startPriority == true) {
			var li = $('.xmmcSel');
			var total = xmmcList.length - 1;
			if (li.index() == total) {
				//alert('already bottom');
			} else {
				li.before(li.next());
			}
		} else {
			//alert('no priority'); 
		}
	});

	var ytpz = $('.ytpz'),
		rzlpz = $('.rzlpz'),
		nyjgpz = $('.nyjgpz'),
		yhfwgl = $('.yhfwgl'),
		jhsjgl = $('.jhsjgl'),
		sxbsjpz = $('.sxbsjpz'),
		ynyxjpz = $('.ynyxjpz'),
		sbsyyxj = $('.sbsyyxj'),
		mxzxxpz = $('.mxzxxpz'),
		xtyhmbpz = $('.xtyhmbpz'),
		fhycxzpz = $('.fhycxzpz');
        // for scroll spy
		var s = $(window).scrollTop();
        var pos = [150,328,544,713,1008,1303,1510,1547];
            if(s < pos[0]) {
                scrollSpy(ytpz);          
            } else if(s >= pos[0] && s < pos[1]) {
                scrollSpy(rzlpz);          
            } else if(s >= pos[1] && s < pos[2]) {
                scrollSpy(nyjgpz);
            } else if(s >= pos[2] && s < pos[3]) {
                scrollSpy(yhfwgl);
            } else if(s >= pos[3] && s < pos[4]) {
                scrollSpy(jhsjgl);
            } else if(s >= pos[4] && s < pos[5]) {
                scrollSpy(sxbsjpz);
            } else if(s >= pos[5] && s < pos[6]) {
                scrollSpy(ynyxjpz);
            } else if(s >= pos[6] && s < pos[7]) {
                scrollSpy(sbsyyxj);
            } else if(s >= pos[7]) {
                scrollSpy('no');
            }

	var li = $('.nav').children('li');
	li.on('click', function () {
		yhpzScroll($(this));
	});

    // to prevent refresh
    /*
    $(window).keydown(function(e) {
        return false; 
    });
    */
    alert('hi');

	$(window).scroll(function () {
		var yhpzLeft = $('.yhpzLeft');
		var yhpzRight = $('.yhpzRight');
		var yhpzrBlock = yhpzRight.children('div.yhpzrBlock');
		var s = $(window).scrollTop();
        

		if (s > 0) {
			yhpzLeft.addClass('fixPanel');
			yhpzRight.addClass('ml13');
        // for scroll spy
            if(s < pos[0]) {
                scrollSpy(ytpz);          
            } else if(s >= pos[0] && s < pos[1]) {
                scrollSpy(rzlpz);          
            } else if(s >= pos[1] && s < pos[2]) {
                scrollSpy(nyjgpz);
            } else if(s >= pos[2] && s < pos[3]) {
                scrollSpy(yhfwgl);
            } else if(s >= pos[3] && s < pos[4]) {
                scrollSpy(jhsjgl);
            } else if(s >= pos[4] && s < pos[5]) {
                scrollSpy(sxbsjpz);
            } else if(s >= pos[5] && s < pos[6]) {
                scrollSpy(ynyxjpz);
            } else if(s >= pos[6] && s < pos[7]) {
                scrollSpy(sbsyyxj);
            } else if(s >= pos[7]) {
                scrollSpy('no');
            }
        /*
            if(s < 150) {
                scrollSpy(ytpz);          
            } else if(s >= 150 && s < 328) {
                scrollSpy(rzlpz);          
            } else if(s >= 328 && s < 544) {
                scrollSpy(nyjgpz);
            } else if(s >= 544 && s < 713) {
                scrollSpy(yhfwgl);
            } else if(s >= 713 && s < 1008) {
                scrollSpy(jhsjgl);
            } else if(s >= 1008 && s < 1303) {
                scrollSpy(sxbsjpz);
            } else if(s >= 1303 && s < 1510) {
                scrollSpy(ynyxjpz);
            } else if(s >= 1510 && s < 1547) {
                scrollSpy(sbsyyxj);
            } else if(s >= 1547) {
                scrollSpy('no');
            }
            */
		} else if (s <= 0) {
			yhpzLeft.removeClass('fixPanel');
			yhpzRight.removeClass('ml13');
		}
	});

	$.fn.scrollTo = function (x, duration) {
		x = x || 0;
		duration = duration || 500;
		var offset = $(this).offset();
		if (offset) {
			$("html,body").animate({ scrollTop: $(this).offset().top + x }, duration);
		}
	};
});
function yhpzLeftPanel(tonum) {
	$(window).scrollTop(tonum);
}
function yhpzScroll(name) {
	name.addClass('active').siblings('li').removeClass('active');
}
function cAlert() {
	UEEPAlert('hi');
}
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
	UEEPAlert('sf');
	$(".txttblval").css("display", "none");
}
//#endregion

$(function () {
	$(".bbCont").click(function () {
		var i = $(".bbCont").index(this);
		switch (i) {
			case 0: UpdateActivities(); break;		//业态配置
			case 1: UpdateOccurate(); break;		//入住率配置
			case 2: UpdateEngPrices(); break;		//能源价格配置
			case 3: DialogEventPlan(-1); break;		//新增计划事件管理
			case 4: DialogWorktime(-1); break;		//新增上下班时间配置
			case 5: UpdateEngPrio(); break;			//用能优先级配置
			case 6: DialogDevPriority(-1); break;	//新增设备使用优先级
			case 7: UpdateOptTarget(); break;		//系统优化目标配置
			case 8: ModelStudyConfig(); break;		//模型自学习配置
			case 9: LoadPredictConfig(); break;		//负荷预测/修正配置
			default: break;
		}
	});
	LoadEventPlanList();
	LoadWorktimeList();
	LoadEquTypeList();
	LoadSelectEquList("");
	LoadDevPriorityList("");
	$("#EngPriorityList li:first").addClass("xmmcSel");
});
///分页控制
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

function isChn(str) {
	var re = /^[\u4e00-\u9fa5]+$/;
	if (!re.test(str)) {
		return false;
	}
	else {
		return true;
	}
}

function isPercent(str) {
	var reg = /^(100|[1-9]?\d(\.\d*)?)$/; ///^(0|100|[1-9]{1}\d?)$/;
	if (!reg.test(str)) {
		return false;
	}
	else {
		return true;
	}
}

//业态配置
function UpdateActivities() {
	if (!isChn($("#txtActivities").val())) {
		UEEPAlert('请输入业态的中文名称!');
		return;
	}
	UEEPConfirm('确认修改业态吗？', function (r) {
		if (r == true) {
			$.ajax({
				url: "/OptConfig/UpdateActivities", type: "POST", async: false,
				data: { act: $("#txtActivities").val() }, dataType: "json",
				success: function (data) {
					if (data == 'OK') {
						UEEPAlert('修改成功！');
					} else {
						UEEPAlert(data);
					}
				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {
					UEEPAlert(XMLHttpRequest.responseText);
				}
			});
		}
	});
}

//入住率配置
function UpdateOccurate() {
	var occ = $("#txtOptProject").val();
	if (!isPercent(occ)) {
		UEEPAlert('请输入正确的入住率数字!');
		return;
	}
	if (!IsDigit(occ) || parseInt(occ) < 0 || parseInt(occ) > 100) { UEEPAlert("请输入1到100之间的数字"); return; }
	UEEPConfirm('确认修改入住率吗？', function (r) {
		if (r == true) {
			$.ajax({
				url: "/OptConfig/UpdateOccurate", type: "POST", async: false,
				data: { occurate: occ }, dataType: "json",
				success: function (data) {
					if (data == 'OK') {
						UEEPAlert('修改成功！');
					} else {
						UEEPAlert(data);
					}
				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {
					UEEPAlert(XMLHttpRequest.responseText);
				}
			});
		}
	});
}

//能源价格配置
function UpdateEngPrices() {
	var waterPrice = $("#txtPriceWater").val(), elecPrice = $("#txtPriceElec").val(),
		gasPrice = $("#txtPriceGas").val(), elecToCoalPrice = $("#txtPriceElec2").val(), gasToCoalPrice = $("#txtPriceGas2").val();
	if (!IsPositiveDigit(waterPrice) || !IsPositiveDigit(elecPrice) || !IsPositiveDigit(gasPrice) || !IsPositiveDigit(elecToCoalPrice) || !IsPositiveDigit(gasToCoalPrice)) {
		UEEPAlert('请输入大于0的数字！'); return;
	}
	UEEPConfirm('确认修改能源价格吗？', function (r) {
		if (r == true) {
			$.ajax({
				url: "/OptConfig/UpdateEngPrices", type: "POST", async: false,
				data: { waterPrice: waterPrice, elecPrice: elecPrice, gasPrice: gasPrice, elecToCoalPrice: elecToCoalPrice, gasToCoalPrice: gasToCoalPrice }, dataType: "json",
				success: function (data) {
					if (data == 'OK') {
						UEEPAlert('修改成功！');
					} else {
						UEEPAlert(data);
					}
				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {
					UEEPAlert(XMLHttpRequest.responseText);
				}
			});
		}
	});
}

//优化服务管理
function ConfigManage(operateType) {
	$.ajax({
		url: "/OptConfig/ConfigManage", type: "POST", async: false,
		data: { operateType: operateType }, dataType: "json",
		success: function (data) {
			if (data == 'OK') {
				UEEPAlert('修改成功！');
			} else {
				UEEPAlert(data);
			}
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			UEEPAlert(XMLHttpRequest.responseText);
		}
	});
}

//计划事件管理
function LoadEventPlanList() {
	$.postJSON("/OptConfig/PlanEventDataList", {}, function (data) {
		var str = "";
		if (data == null || data.length < 1) {
			$("#tblEventPlan").html("<div class='yred tcenter'>数据为空</div>");
			return;
		}
		$.each(data, function (i, value) {
			if (i % 2 == 0)
				str += '<tr class="odd">';
			else
				str += '<tr class="even">';
			str += '<td>' + value.planname + '</td>';
			str += '<td class="tdW150">' + value.stime + '</td>';
			str += '<td class="tdW150">' + value.etime + '</td>';
			str += '<td class="tdW150" val="' + value.planregion + '">' + value.planregion + '</td>';
			str += '<td class="tdW150" val="' + value.plantype + '">' + value.plantype + '</td>';
			str += '<td>' + value.desc + '</td>';
			str += '<td style="display:none;" val="' + value.eventregion + '">' + value.eventregion + '</td>';
			str += '<td style="display:none;">' + value.pnum + '</td>';
			str += '<td style="display:none;">' + value.area + '</td>';
			str += '<td style="display:none;">' + value.uid + '</td>';
			str += '<td style="display:none;">' + value.planid + '</td>';
			str += '<td class="tdW100"><a title="编辑" class="ico-sbgl ico-Update2 fancybox" onclick="DialogEventPlan(' + i + ')" href="#sb-pop-onupdate3"> </a>  <a title="删除" class="ico-sbgl ico-Delete2" onclick="DeleteEventPlan(' + value.uid + ')"> </a></td>';
			str += '</tr>';
		});
		$("#tblEventPlan").empty().append(str);
		PageEventPlan(data.length);
	});
	//$.ajax({
	//	url: "/OptConfig/PlanEventDataList", type: "POST", async: false,
	//	data: {}, dataType: "json",
	//	success: function (data) {
	//		var str = "";
	//		if (data == null || data.length < 1) {
	//			$("#tblEventPlan").html("<div class='yred tcenter'>数据为空</div>");
	//			return;
	//		}
	//		$.each(data, function (i, value) {
	//			if (i % 2 == 0)
	//				str += '<tr class="odd">';
	//			else
	//				str += '<tr class="even">';
	//			str += '<td>' + value.planname + '</td>';
	//			str += '<td class="tdW150">' + value.stime + '</td>';
	//			str += '<td class="tdW150">' + value.etime + '</td>';
	//			str += '<td class="tdW150" val="' + value.planregion + '">' + value.planregion + '</td>';
	//			str += '<td class="tdW150" val="' + value.plantype + '">' + value.plantype + '</td>';
	//			str += '<td>' + value.desc + '</td>';
	//			str += '<td style="display:none;" val="' + value.eventregion + '">' + value.eventregion + '</td>';
	//			str += '<td style="display:none;">' + value.pnum + '</td>';
	//			str += '<td style="display:none;">' + value.area + '</td>';
	//			str += '<td style="display:none;">' + value.uid + '</td>';
	//			str += '<td style="display:none;">' + value.planid + '</td>';
	//			str += '<td class="tdW100"><a title="编辑" class="ico-sbgl ico-Update2 fancybox" onclick="DialogEventPlan(' + i + ')" href="#sb-pop-onupdate3"> </a>  <a title="删除" class="ico-sbgl ico-Delete2" onclick="DeleteEventPlan(' + value.uid + ')"> </a></td>';
	//			str += '</tr>';
	//		});
	//		$("#tblEventPlan").empty().append(str);
	//		PageEventPlan(data.length);
	//	},
	//	error: function (XMLHttpRequest, textStatus, errorThrown) {
	//		UEEPAlert(XMLHttpRequest.responseText);
	//	}
	//});
}
function DialogEventPlan(row) {
	if (row < 0) {
		var tmStart = new Date();
		$("#jxsjName").val("");
		$("#jxsjSTime").val(tmStart.addHours(1).format("yyyy-MM-dd HH:mm"));
		$("#jxsjETime").val(tmStart.addDays(1).format("yyyy-MM-dd 00:00"));
		$("#jxsjRegion p.text").attr("val", $("#jxsjRegion li:first").attr("val")).text($("#jxsjRegion li:first").text());
		$("#jxsjType p.text").attr("val", $("#jxsjType li:first").attr("val")).text($("#jxsjType li:first").text());
		$("#jxsjContent").val("");
		$("#jxsjTimeRegion p.text").attr("val", $("#jxsjTimeRegion li:first").attr("val")).text($("#jxsjTimeRegion li:first").text());
		$("#jxsjPeople").val("0");
		$("#jxsjArea").val("0");
		$("#EventPlanId").val(0);
		$("#PlanId").val(1);
	}
	else {
		var $tds = $("#tblEventPlan tr:eq(" + row + ")").find("td");
		$("#jxsjName").val($tds.eq(0).text());
		$("#jxsjSTime").val($tds.eq(1).text());
		$("#jxsjETime").val($tds.eq(2).text());
		$("#jxsjRegion p.text").attr("val", $tds.eq(3).attr("val")).text($tds.eq(3).text());
		$("#jxsjType p.text").attr("val", $tds.eq(4).attr("val")).text($tds.eq(4).text());
		$("#jxsjContent").val($tds.eq(5).text());
		$("#jxsjTimeRegion p.text").attr("val", $tds.eq(6).attr("val")).text($tds.eq(6).text());
		$("#jxsjPeople").val($tds.eq(7).text());
		$("#jxsjArea").val($tds.eq(8).text());
		$("#EventPlanId").val($tds.eq(9).text());
		$("#PlanId").val($tds.eq(10).text());
	}
}
function EditEventPlan() {
	if (!isChn($("#jxsjName").val())) {
		UEEPAlert('请输入计划事件中文名称!');
		return;
	}
	//if ($("#jxsjName").val() == "")
	//{
	//    UEEPAlert('请输入计划事件名称！');
	//    return;
	//}
	var params = {
		uid: $("#EventPlanId").val(), planid: $("#PlanId").val(), planname: $("#jxsjName").val(), desc: $("#jxsjContent").val(),
		stime: $("#jxsjSTime").val(), etime: $("#jxsjETime").val(), pnum: $("#jxsjPeople").val(), area: $("#jxsjArea").val(),
		plantype: $("#jxsjType p.text").attr("val"), planregion: $("#jxsjRegion p.text").attr("val"), eventregion: $("#jxsjTimeRegion p.text").attr("val")
	};
	$.postJSON("/OptConfig/EditEventPlan", params, function (data) {

		if (data == 'OK') {
			$.fancybox.close();
			if ($("#EventPlanId").val() > 0)
				UEEPAlert('修改成功！');
			else
				UEEPAlert('新增成功！');
			LoadEventPlanList();
		} else {
			UEEPAlert(data);
		}
	});
}
function DeleteEventPlan(planId) {
	UEEPConfirm('确认删除吗？', function (r) {
		if (r == true) {
			$.post("/OptConfig/DeleteEventPlan/" + planId, "", function (data) {
				if (data == 'OK') { LoadEventPlanList(); }
			});
		}
	});
}
function PageEventPlan(totalPage) {
	if (totalPage < 10) { $("#PageEventPlan").empty(); return false; }
	//分页，PageCount是总条目数，这是必选参数，其它参数都是可选
	$("#PageEventPlan").pagination(totalPage, {
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
		PageControl($("#tblEventPlan tr"), index + 1, 10);
	}
}

//上下班时间配置
function LoadWorktimeList() {
	$.ajax({
		url: "/OptConfig/WorkTimeDataList", type: "POST", async: false,
		data: {}, dataType: "json",
		success: function (data) {
			var str = "";
			if (data == null || data.length < 1) {
				$("#tblWorktime").html("<div class='yred tcenter'>数据为空</div>");
				return;
			}
			$.each(data, function (i, value) {
				if (i % 2 == 0)
					str += '<tr class="odd">';
				else
					str += '<tr class="even">';
				str += '<td style="display:none;">' + value.uid + '</td>';
				str += '<td class="tdW150">' + value.onwork + '</td>';
				str += '<td class="tdW150">' + value.offwork + '</td>';
				str += '<td>' + value.starttime + '</td>';
				str += '<td>' + value.endtime + '</td>';
				str += '<td class="tdW150"><a title="编辑" class="ico-sbgl ico-Update2 fancybox" onclick="DialogWorktime(' + i + ')" href="#sb-pop-onupdate4"></a><a title="删除" class="ico-sbgl ico-Delete2" onclick="DeleteWorktime(' + value.uid + ')"></a></td>';
				str += '</tr>';
			});
			$("#tblWorktime").empty().append(str);
			PageWorktime(data.length);
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			UEEPAlert(XMLHttpRequest.responseText);
		}
	});
}
function DialogWorktime(row) {
	if (row < 0) {
		var tmStart = new Date();
		$("#worktimeId").val(-1);
		$("#sxbSTime").val("09:00");
		$("#sxbETime").val("17:00");
		$("#sxbSDate").val(tmStart.format("yyyy-MM-dd"));
		$("#sxbEDate").val(tmStart.addMonths(1).format("yyyy-MM-dd"));
	}
	else {
		var $tds = $("#tblWorktime tr:eq(" + row + ")").find("td");
		$("#worktimeId").val($tds.eq(0).text());
		$("#sxbSTime").val($tds.eq(1).text());
		$("#sxbETime").val($tds.eq(2).text());
		$("#sxbSDate").val($tds.eq(3).text());
		$("#sxbEDate").val($tds.eq(4).text());
	}
}
function EditWorktime() {
	var startTime = $("#sxbSTime").val();
	var endTime = $("#sxbETime").val();
	var startDate = $("#sxbSDate").val();
	var endDate = $("#sxbEDate").val();
	if (startTime >= endTime) {
		UEEPAlert('开始时间不能等于或晚于结束时间，请重新选择时间！');
		return;
	}
	if (startDate >= endDate) {
		UEEPAlert('开始日期不能等于或晚于结束日期，请重新选择日期！');
		return;
	}
	$.ajax({
		url: "/OptConfig/EditWorktime", type: "POST", async: false,
		data: {
			uid: $("#worktimeId").val(), onwork: $("#sxbSTime").val(), offwork: $("#sxbETime").val(),
			starttime: $("#sxbSDate").val(), endtime: $("#sxbEDate").val()
		}, dataType: "json",
		success: function (data) {
			if (data == 'OK') {
				if ($("#worktimeId").val() > 0) UEEPAlert('修改成功！'); else UEEPAlert('新增成功！');
				LoadWorktimeList();
				$.fancybox.close();
			} else {
				UEEPAlert(data);
			}
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			UEEPAlert(XMLHttpRequest.responseText);
		}
	});
}
function DeleteWorktime(wordtimeId) {
	UEEPConfirm('确认删除吗？', function (r) {
		if (r == true) {
			$.post("/OptConfig/DeleteWorktime/" + wordtimeId, "", function (data) {
				if (data == 'OK') { LoadWorktimeList(); }
			});
		}
	});
}
function PageWorktime(totalPage) {
	if (totalPage < 10) { $("#PageWorktime").empty(); return false; }
	//分页，PageCount是总条目数，这是必选参数，其它参数都是可选
	$("#PageWorktime").pagination(totalPage, {
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
		PageControl($("#tblWorktime tr"), index + 1, 10);
	}
}

//用能优先级配置
function UpdateEngPrio() {
	var engNameList = "";
	var engLevelList = "";
	if ($("#rdoPriority1").prop("checked")) {
		$("#EngPriorityList li").each(function (i, value) {
			engNameList += $(this).attr("val") + ",";
			engLevelList += i + ",";
		});
	}
	UEEPConfirm('确认保存用能优先级吗？', function (r) {
		if (r == true) {
			$.ajax({
				url: "/OptConfig/UpdateEngPrio", type: "POST", async: false,
				data: { engCodeList: engNameList, levelList: engLevelList }, dataType: "json",
				success: function (data) {
					if (data == 'OK') {
						UEEPAlert('修改成功！');
					} else {
						UEEPAlert(data);
					}
				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {
					UEEPAlert(XMLHttpRequest.responseText);
				}
			});
		}
	});
}

//设备使用优先级
function LoadEquTypeList() {
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
					LoadDevPriorityList(v);
					LoadSelectEquList(v);
				}
			});
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			UEEPAlert(XMLHttpRequest.responseText);
		}
	});
}
function LoadSelectEquList(equType) {
	$.ajax({
		url: "/OptEquPlan/EquList", type: "POST", async: false,
		data: { equType: equType }, dataType: "json",
		success: function (responseJSON) {
			var strSelectEqu = "";
			$.each(responseJSON, function (n, value) {
				strSelectEqu += "<li val='" + value.equcode + "'><a href=''>" + value.equname + "</a></li>";
			});
			$("#sbyxjEquList").find("ul").empty().append(strSelectEqu);
			$("#sbyxjEquList p.text").attr("val", $("#sbyxjEquList li:first").attr("val")).text($("#sbyxjEquList li:first").text());
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			UEEPAlert(XMLHttpRequest.responseText);
		}
	});
}
function LoadDevPriorityList(equType) {
	$.ajax({
		url: "/OptConfig/DevPriorityDataList", type: "POST", async: false, dataType: "json",
		data: { equType: equType },
		success: function (data) {
			var str = "";
			if (data == null || data.length < 1) {
				$("#tblDevPriority").html("<div class='yred tcenter'>数据为空</div>");
				return;
			}
			$.each(data, function (i, value) {
				if (i % 2 == 0)
					str += '<tr class="odd">';
				else
					str += '<tr class="even">';
				str += '<td style="display:none;">' + value.devModel.uid + '</td>';
				str += '<td class="tdW100">' + value.devModel.devlevel + '</td>';
				str += '<td val="' + value.devModel.devcode + '">' + value.devName + '</td>';
				str += '<td class="tdW150">' + value.devModel.devdate + '</td>';
				str += '<td class="tdW150">' + value.devModel.devdate + '</td>';
				str += '<td class="tdW150"><a title="编辑" class="ico-sbgl ico-Update2 fancybox" onclick="DialogDevPriority(' + i + ')" href="#sb-pop-onupdate5"></a><a title="删除" class="ico-sbgl ico-Delete2" onclick="DeleteDevPriority(' + value.devModel.uid + ')"></a></td>';
				str += '</tr>';
			});
			$("#tblDevPriority").empty().append(str);
			PageDevPriority(data.length);
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			UEEPAlert(XMLHttpRequest.responseText);
		}
	});
}
function DialogDevPriority(row) {
	if (row < 0) {
		var tmStart = new Date();
		$("#sbyxjId").val(0);
		$("#sbyxjSTime").val(tmStart.format("yyyy-MM-dd"));
		$("#sbyxjETime").val(tmStart.addMonths(1).format("yyyy-MM-dd"));
		$("#sbyxjYxj").val("1");
		$("#sbyxjEquList").simSelect({
			callback: function (x, v) {
				if (!x) return;
			}
		});
	}
	else {
		var $tds = $("#tblDevPriority tr:eq(" + row + ")").find("td");
		$("#sbyxjId").val($tds.eq(0).text());
		$("#sbyxjYxj").val($tds.eq(1).text());
		$("#sbyxjEquList p.text").attr("val", $tds.eq(2).attr("val"));
		$("#sbyxjEquList p.text").text($tds.eq(2).text());
		$("#sbyxjEquList").off("click");
		$("#sbyxjSTime").val($tds.eq(3).text());
		$("#sbyxjETime").val($tds.eq(4).text());
	}
}
function EditDevPriorityDev() {
	$.ajax({
		url: "/OptConfig/UpdateDevPriority", type: "POST", async: false,
		data: { uid: $("#sbyxjId").val(), devcode: $("#sbyxjEquList p.text").attr("val"), devdate: $("#sbyxjSTime").val(), devlevel: $("#sbyxjYxj").val() }, dataType: "json",
		success: function (data) {
			$.fancybox.close();
			if (data == 'OK') {
				if ($("#sbyxjId").val() > 0) UEEPAlert('修改成功！'); else UEEPAlert('新增成功！');
			} else {
				UEEPAlert(data);
			}
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			UEEPAlert(XMLHttpRequest.responseText);
		}
	});
}
function DeleteDevPriority(priorityId) {
	UEEPConfirm('确认删除吗？', function (r) {
		if (r == true) {
			$.post("/OptConfig/DeleteDevPriority/" + priorityId, "", function (data) {
				if (data == 'OK') { LoadDevPriorityList(""); }
			});
			return true;
		}
		else { return false; }
	});
}
function PageDevPriority(totalPage) {
	if (totalPage < 10) { $("#PageDevPriority").empty(); return false; }
	//分页，PageCount是总条目数，这是必选参数，其它参数都是可选
	$("#PageDevPriority").pagination(totalPage, {
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
		PageControl($("#tblDevPriority tr"), index + 1, 10);
	}
}

//系统优化目标配置
function UpdateOptTarget() {
	UEEPConfirm('确认保存系统优化目标吗？', function (r) {
		if (r == true) {
			$.ajax({
				url: "/OptConfig/UpdateOptTarget", type: "POST", async: false,
				data: { target: $("#xtyhmbpz input:checked").next("label").text() }, dataType: "json",
				success: function (data) {
					if (data == 'OK') {

						UEEPAlert('修改成功！');
					} else {
						UEEPAlert(data);
					}
				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {
					UEEPAlert(XMLHttpRequest.responseText);
				}
			});
		}
	});
}

//模型自学习配置
function ModelStudyConfig() {    
    if (!IsPositiveHour($("#mxjgsj").val())) {       
        UEEPAlert('请输入正确的时间间隔！');
        return;
    }
    if ($("#mxqdsj").val()=='') {
        UEEPAlert('请输入启动时间！');
        return;
    }
    UEEPConfirm('确认保存模型自学习配置吗？', function (r) {
        if(r==true)
        {
            $.ajax({
                url: "/OptConfig/ModelStudyConfig", type: "POST", async: false,
                data: { interval: $("#mxjgsj").val(), startTime: $("#mxqdsj").val(), enabled: $("#mxzdzx").prop("checked") }, dataType: "json",
                success: function (data) {
                    if (data == 'OK') {
                        UEEPAlert('修改成功！');
                    } else {
                        UEEPAlert(data);
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert(XMLHttpRequest.responseText);
                }
            });
        }
    });	
}

//负荷预测/修正配置
function LoadPredictConfig() {
    if ($("#ycqdsj").val() == '') {
        UEEPAlert('请输入预测启动时间！');
        return;
    }

    if (!IsPositiveHour($("#ycjgsj").val())) {       
        UEEPAlert('请输入正确的负荷预测时间间隔！');
        return;
    }

    if ($("#xzqdsj").val() == '') {
        UEEPAlert('请输入修正启动时间！');
        return;
    }

    if (!IsPositiveHour($("#xzjgsj").val())) {        
        UEEPAlert('请输入正确的负荷修正时间间隔！');
        return;
    }

    UEEPConfirm('确认保存负荷预测、修正的配置吗？', function (r) {
        if(r==true)
        {
            $.ajax({
                url: "/OptConfig/LoadPredictConfig", type: "POST", async: false,
                data: { interval1: $("#ycjgsj").val(), startTime1: $("#ycqdsj").val(), enabled1: $("#fhzdzx").prop("checked"), interval2: $("#xzjgsj").val(), startTime2: $("#xzqdsj").val() }, dataType: "json",
                success: function (data) {
                    if (data == 'OK') {
                        UEEPAlert('修改成功！');
                    } else {
                        UEEPAlert(data);
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert(XMLHttpRequest.responseText);
                }
            });
        }
    });	
}

///执行参数拟合模型自学习
function ParamFit() {
	UEEPConfirm('确认执行模型自学习吗？', function (r) {
		if (r == true) {
			$.ajax(
              {
              	url: "/WCF/SelfLearn",
              	async: false,
              	type: "POST",
              	dataType: "json",
              	data: "",
              	success: function (data) {
              		if (data == 'OK') {
              			UEEPAlert('执行模型自学习成功！');
              		} else {
              			UEEPAlert('执行模型自学习失败，请检查优化服务是否开启!');

              		}
              	},
              	error: function (XMLHttpRequest, textStatus, errorThrown) {
              		alert(XMLHttpRequest.responseText);
              	}
              });
		}
	});
}

///执行负荷预测
function Load_Predict() {
	UEEPConfirm('确认执行负荷预测吗？', function (r) {
		if (r == true) {
			$.ajax(
             {
             	url: "/WCF/Load_Predict",
             	async: false,
             	type: "POST",
             	dataType: "json",
             	data: "",
             	success: function (data) {
             		if (data == 'OK') {
             			UEEPAlert('执行负荷预测成功！');
             		} else {
             			UEEPAlert('执行负荷预测失败，请检查优化服务是否开启!');
             		}
             	},
             	error: function (XMLHttpRequest, textStatus, errorThrown) {
             		alert(XMLHttpRequest.responseText);
             	}
             });
		}
	});
}

//用能优先级变化事件
function priorityChange() {
    var yyxj = $("#rdoPriority1").prop("checked");
    var wyxj = $("#rdoPriority2").prop("checked");
    var startPriority = true;
    var xmmcList = $('.xmmc').children('ul').children('li');

    if (yyxj == false && wyxj == true) {
        $(".abUp").unbind("click");
        $(".abDown").unbind("click");

        startPriority = false;
    } else {
        startPriority = true;

        $(".abUp").bind("click", function () {
            if (startPriority == true) {
                var li = $('.xmmcSel');
                if (li.index() == 0) {
                    //alert('already top');
                } else {
                    li.after(li.prev());
                }
            } else {
                //alert('no priority'); 
            }
        });

        $(".abDown").bind("click", function () {
            if (startPriority == true) {
                var li = $('.xmmcSel');
                var total = xmmcList.length - 1;
                if (li.index() == total) {
                    //alert('already bottom');
                } else {
                    li.before(li.next());
                }
            } else {
                //alert('no priority'); 
            }
        });
    }

}
function dxRoom() {
   var fn = Array.prototype.pop.apply(arguments);
   return fn.apply(null, arguments) 
}
function scrollSpy() {
    if(arguments[0] == 'no') return;
    $(arguments[0]).siblings('li').removeClass('active').end().addClass('active');        

}
