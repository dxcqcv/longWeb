/*
    * 功能说明：配置限额数据页面js
    * 创建人：师佳丽
    * 创建时间：2014-06-17
    * */
$(document).ready(function () {
	// auto height
	var contentTop = $('.contentTop'),
        toolbar = $('.toolbar'),
        tblcomhead = $('.tblcomhead'),
        LeftCol = $('#LeftCol'),
        MainCol = $('#MainCol');
	var ch = calculate(contentTop.outerHeight(), toolbar.outerHeight(), tblcomhead.outerHeight(), diff);
	LeftCol.height(ch);
	MainCol.height(ch);
	$(window).resize(function () {
		var contentTop = $('.contentTop'),
       toolbar = $('.toolbar'),
       tblcomhead = $('.tblcomhead'),
       LeftCol = $('#LeftCol'),
       MainCol = $('#MainCol');
		var ch = calculate(contentTop.outerHeight(), toolbar.outerHeight(), tblcomhead.outerHeight(), diff);
		LeftCol.height(ch);
		MainCol.height(ch);
	});

	$sb = $("#selectSb");
	var str = "<li val=\"E\"><a href=\"\">耗电指标</a></li><li val=\"G\"><a href=\"\">耗气指标</a></li><li val=\"W\"><a href=\"\">耗水指标</a></li>";
	$sb.find("ul").empty().append(str);
	$sb.simSelect({
		callback: function (x, v) {
			if (!x) return;
			// $("#hid_pid").val(x);
		}
	});
	$("#selectSbp").text("耗电指标");
	var date = new Date();
	var year = date.getFullYear();
	$("#quiry-year").val(year + "年");
	yearChange();
});
//加载测点选择列表
function loadTree(year, energyType) {
	if (year > 0 && energyType.length > 0) {
		$("#nyglinul").empty();
		_oneLevelHtml(year, energyType);
		$.ajax({
			type: "POST",//这里是http类型
			url: "/LimitWarn/GetYearMonth",//大家都应该很清楚了
			async: false,
			data: { year: year, energyType: energyType },//回传一个参数
			dataType: "json",//传回来的数据类型
			success: function (responseJSON) {
				if (responseJSON.length > 0) {
					bmenuflag = true;
					$.each(responseJSON, function (i, data) {
						_otherLevelHtml(year, data.period, energyType);
					});
				}
			},
			error: function (xmlHttpRequest) {
				UEEPAlert(XMLHttpRequest.responseText);
			}
		});
	}
}

var bmenuflag = true;
/* 一级代码 */
function _oneLevelHtml(year, energyType) {
	$("#YearData").html(year + "年");
	if (energyType == "E") {
		$("#TypeData").html("耗电量指标");
	} else if (energyType == "G") {
		$("#TypeData").html("耗气量指标");
	} else if (energyType == "W") {
		$("#TypeData").html("耗水量指标");
	}
	var ul = $("#nyglinul");
	var el = "<li name=\"treemenu\" id=\"treemenu_year\" onclick=\"LoadYear(" + year + ",'" + energyType + "')\"><span>年度</span></li>";
	ul.append(el);
}
/* 多级代码 */
function _otherLevelHtml(year, month, energyType) {
	var sontitle = dataToMonth(month) + "月";
	var ul = $("#nyglinul");
	var el = "<li name=\"treemenu\" id=\"menuMonth_" + month + "\" onclick=\"LoadMonth('" + month + "','" + energyType + "')\"";
	el += "><span>" + sontitle + "</span></li>";
	ul.append(el);
}
//处理“yyyy-MM”类型输出“x月）
function dataToMonth(month) {
	var str = "";
	if (month.substring(5, month.length - 1) == "0") {
		str = month.substring(6, month.length);
	} else {
		str = month.substring(5, month.length);
	}
	return str;
}
//选择年份改变
function yearChange() {
	$("#cksjbutton").attr('href', 'javascript:void(0)');
	var year = $("#quiry-year").val().trimEnd('年');
	if (year == '') {
		UEEPAlert('请选择年份！');
		return;
	}
	$("#myeardata").val(year);
	if ($("#selectSbp").text() == "耗电指标") {
		$("#energyType").val("E");
	}
	else if ($("#selectSbp").text() == "耗气指标") {
		$("#energyType").val("G");
	}
	else if ($("#selectSbp").text() == "耗水指标") {
		$("#energyType").val("W");
	}
	var energyType = $("#energyType").val();
	$.ajax({
		type: "POST",//这里是http类型
		url: "/LimitWarn/GetYear",//大家都应该很清楚了
		async: false,
		data: { year: year, energyType: energyType },//回传一个参数
		dataType: "json",//传回来的数据类型
		success: function (data) {
			if (data == "none") {
				//增加新的年度指标数据
				EditYear();
				$("#cksjbutton").attr('href', '#pop-onupdate');
				//UEEPAlert("没有数据");
			} else {
				$("#cksjbutton").attr('href', 'javascript:void(0)');
				//修改已有的年度指标数据
				loadTree(year, energyType);
				LoadYear(year, energyType);
			}
		},
		error: function (xmlHttpRequest) {
			UEEPAlert(XMLHttpRequest.responseText);
		}
	});
}
//加载某年限额数据
function LoadYear(year, energyType) {
	$("#xgyzbA").removeAttr("onclick");
	$("#xgyzbA").attr("onclick", "EditMonth()");
	$("#xgyzbSpan").html("修改月指标");
	$("#MonthConfig").show();
	$("#DayConfig").hide();
	$("#xgyzbA").show();
	$("#xgrzbA").hide();
	$("#dataname").html("年度指标：");
	$("li[name='treemenu']").each(function () {
		$(this).removeAttr("class");
	});
	$("#treemenu_year").attr("class", "nyglinulsel");
	LoadYearMonthChart(year, energyType);
	LoadYearMonthData(year, energyType);
}
//加载右上方年度指标和限额指标数据
function LoadYearMonthChart(year, energyType) {
	//加载年度指标数据
	$.ajax({
		type: "POST",//这里是http类型
		url: "/LimitWarn/GetYear",//大家都应该很清楚了
		async: false,
		data: { year: year, energyType: energyType },//回传一个参数
		dataType: "json",//传回来的数据类型
		success: function (data) {
			if (data != null) {
				var datavalue = 0;
				if (data != "none") {
					datavalue = FloatFixed(data.limitvalue);
				}
				if (energyType == "E") {
					$("#yearvalue").html(datavalue + "千瓦时");
				}
				else if (energyType == "G") {
					$("#yearvalue").html(datavalue + "立方");
				}
				else if (energyType == "W") {
					$("#yearvalue").html(datavalue + "吨");
				}
			}
		},
		error: function (xmlHttpRequest) {
			UEEPAlert(XMLHttpRequest.responseText);
		}
	});
	//加载限额指标数据
	var yjxename = $("#yjxename").val();//预警
	var bjxename = $("#bjxename").val();//报警
	$.ajax({
		type: "POST",//这里是http类型
		url: "/LimitWarn/GetWarnConfig",//大家都应该很清楚了
		async: false,
		data: { configname: yjxename },//回传一个参数
		dataType: "json",//传回来的数据类型
		success: function (data) {
			if (data != null) {
				if (data == "none") {
					//没有这条配置信息
					$("#warnValue").html("-");
				} else {
					//已有这条配置信息
					$("#warnValue").html(data.configvalue);
				}
			}
		},
		error: function (xmlHttpRequest) {
			UEEPAlert(XMLHttpRequest.responseText);
		}
	});
	$.ajax({
		type: "POST",//这里是http类型
		url: "/LimitWarn/GetWarnConfig",//大家都应该很清楚了
		async: false,
		data: { configname: bjxename },//回传一个参数
		dataType: "json",//传回来的数据类型
		success: function (data) {
			if (data != null) {
				if (data == "none") {
					//没有这条配置信息
					$("#callvaluetype").val("0");
					$("#callValue").html("-");
				} else {
					//已有这条配置信息
					$("#callvaluetype").val("1");
					$("#callvalueid").val(data.id);
					$("#callValue").html(data.configvalue);
				}
			}
		},
		error: function (xmlHttpRequest) {
			UEEPAlert(XMLHttpRequest.responseText);
		}
	});
}
//加载右侧某年及具体月份限额数据
function LoadYearMonthData(year, energyType) {
	$.ajax({
		type: "POST",//这里是http类型
		url: "/LimitWarn/GetYearMonth",//大家都应该很清楚了
		async: false,
		data: { year: year, energyType: energyType },//回传一个参数
		dataType: "json",//传回来的数据类型
		success: function (data) {
			$("#tb_container").empty();
			var count = 0;
			var yearcount = $("#yearvalue").html().trimEnd("立方").trimEnd("千瓦时").trimEnd("吨");
			for (var i = 0; i < data.length / 4; i++) {
				var str = "";
				str += "<tr";
				if (i % 2 == 0) {
					str += " class=\"even\">";
				} else {
					str += " class=\"odd\">";
				}
				for (var j = 0; j < 4 && (i * 4 + j) < data.length; j++) {
					str += "<td style=\"height:50px;\"><span class=\"tr-span0\">" + dataToMonth(data[i * 4 + j].period) + "月" + "</span><span name=\"zbSpan\" id=\"spa1_" + data[i * 4 + j].period + "\" class=\"tr-span1\"><span>指标:</span><span id=\"span_" + data[i * 4 + j].period + "\" class=\"tr-span1-2\">" + FloatFixed(data[i * 4 + j].limitvalue);
					str += "</span></span></td>";
					count += data[i * 4 + j].limitvalue;
				}
				str += "/tr>";
				$("#tb_container").append(str);
			}
			if (energyType == "E") {
				$("#yzbhjSpan").html(FloatFixed(count) + "千瓦时");
				$("#czFont").html(FloatFixed(yearcount - count) + "千瓦时");
			} else if (energyType == "G") {
				$("#yzbhjSpan").html(count + "立方");
				$("#czFont").html(FloatFixed(yearcount - count) + "立方");
			} else if (energyType == "W") {
				$("#yzbhjSpan").html(count + "吨");
				$("#czFont").html(FloatFixed(yearcount - count) + "吨");
			}
		},
		error: function (xmlHttpRequest) {
			UEEPAlert(XMLHttpRequest.responseText);
		}
	});
}
//点击“修改月指标”按钮，将各月指标框设为可写
function EditMonth() {
	$.each($("span[name='zbSpan']"), function () {
		var idtext = $(this).attr("id");
		var period = idtext.substring(5, idtext.length);
		$(this).removeAttr("class");
		$(this).attr("class", "tr-span2");
		var str = "指标:<input type=\"text\" name=\"monthdata\"  id=\"month_" + period + "\" class=\"txttblval\" value=\"" + $("#span_" + period).html() + "\"";
		var date = new Date();
		var nowyear = date.getFullYear();
		var nowmonth = date.getMonth() + 1;
		if (Number(period.substring(0, 4)) > nowyear) {
		} else if (Number(period.substring(0, 4)) == nowyear) {
			if (Number(period.substring(5, 7)) >= nowmonth) {
			} else {
				str += " disabled=\"disabled\" ";
			}
		} else {
			str += " disabled=\"disabled\" ";
		}
		str += "/>";
		$(this).empty();
		$(this).append(str);
	});
	$('input[name="monthdata"]').keyup(function () {
		TextChange($(this).attr("id"));
	});
	//$("#xgyzbA").off("click", EditMonth).on("click", UpdateMonth).find("#xgyzbSpan").text("保存月指标");
	$("#xgyzbA").removeAttr("onclick");
	$("#xgyzbA").attr("onclick", "UpdateMonth()");
	$("#xgyzbSpan").html("保存月指标");
}
//月text框数据改变，引起合计和差值变化

function TextChange(id) {
	// var id = $(this).attr("id");
	var energyType = $("#energyType").val();
	if ($("#" + id).attr("id").indexOf('edit') == -1) {
		$("#" + id).attr("id", id + "_edit");
	}
	var count = 0;
	var yearcount = $("#yearvalue").html().trimEnd("立方").trimEnd("千瓦时").trimEnd("吨");
	$("input[name='monthdata']").each(function () {
		count += Number($(this).val());
	});
	if (energyType == "E") {
		$("#yzbhjSpan").html(FloatFixed(count) + "千瓦时");
		$("#czFont").html(FloatFixed(yearcount - count) + "千瓦时");
	} else if (energyType == "G") {
		$("#yzbhjSpan").html(count + "立方");
		$("#czFont").html(FloatFixed(yearcount - count) + "立方");
	} else if (energyType == "W") {
		$("#yzbhjSpan").html(count + "吨");
		$("#czFont").html(FloatFixed(yearcount - count) + "吨");
	}
}

//保存修改的月度指标数据
function UpdateMonth() {
	var energyType = $("#energyType").val();
	//遍历所有月份数据
	var cztext = $("#czFont").html().trimEnd("立方").trimEnd("千瓦时").trimEnd("吨");
	if (cztext != "0.00") {
		UEEPAlert("月指标总额与年指标不匹配！");
	} else {
		$("input[name='monthdata']").each(function () {
			var idtext = $(this).attr("id");
			//判断text框状态，如果修改了则会在其id后加_edit，根据id长度，保存修改过的月份数据
			if (idtext.length > 15) {
				var month = idtext.substring(6, idtext.length - 5);
				var limitValue = $(this).val();
				//删除该月指标
				$.ajax({
					type: "POST",//这里是http类型
					url: "/LimitWarn/DeleteMonth",//大家都应该很清楚了
					async: false,
					data: { month: month, energyType: energyType },//回传一个参数
					dataType: "json",//传回来的数据类型
					success: function (data) { },
					error: function (xmlHttpRequest) {
						UEEPAlert(XMLHttpRequest.responseText);
					}
				});
				//添加新的该月指标--关联添加每一天数据
				$.ajax({
					type: "POST",//这里是http类型
					url: "/LimitWarn/AddMonth",//大家都应该很清楚了
					async: false,
					data: { month: month, energyType: energyType, slimitValue: limitValue },//回传一个参数
					dataType: "json",//传回来的数据类型
					success: function (data) {
					},
					error: function (xmlHttpRequest) {
						UEEPAlert(XMLHttpRequest.responseText);
					}
				});
				$(this).attr("id", "month_" + month);
			}
		});
		$.each($("span[name='zbSpan']"), function () {
			var idtext = $(this).attr("id");
			var period = idtext.substring(5, idtext.length);
			$(this).removeAttr("class");
			$(this).attr("class", "tr-span1");
			var str = "<span>指标:</span><span id=\"span_" + period + "\" class=\"tr-span1-2\">" + $("#month_" + period).val() + "</span></span>";
			$(this).empty();
			$(this).append(str);
		});
		$("#xgyzbA").removeAttr("onclick");
		$("#xgyzbA").attr("onclick", "EditMonth()");
		$("#xgyzbSpan").html("修改月指标");
	}
}

//加载某月限额数据
function LoadMonth(month, energyType) {
	$("#xgyzbA").removeAttr("onclick");
	$("#xgyzbA").attr("onclick", "EditMonth()");
	$("#xgyzbSpan").html("修改月指标");
	$("#MonthConfig").hide();
	$("#DayConfig").show();
	$("#xgyzbA").hide();
	$("#xgrzbA").show();
	$("#dataname").html("月度指标：");
	$("li[name='treemenu']").each(function () {
		$(this).removeAttr("class");
	});
	$("#menuMonth_" + month).attr("class", "nyglinulsel");
	LoadMonthDayhChart(month, energyType);
	LoadMonthDayData(month, energyType);
}
//加载右侧某月及每日限额的表格头
function LoadMonthDayhChart(month, energyType) {
	$.ajax({
		type: "POST",//这里是http类型
		url: "/LimitWarn/GetMonth",//大家都应该很清楚了
		async: false,
		data: { month: month, energyType: energyType },//回传一个参数
		dataType: "json",//传回来的数据类型
		success: function (data) {
			if (data != null) {
				var datavalue = 0;
				if (data != "none") {
					datavalue = FloatFixed(data.limitvalue);
				}
				if (energyType == "E") {
					$("#yearvalue").html(datavalue + "千瓦时");
				}
				else if (energyType == "G") {
					$("#yearvalue").html(datavalue + "立方");
				} else if (energyType == "W") {
					$("#yearvalue").html(datavalue + "吨");
				}
			}
		},
		error: function (xmlHttpRequest) {
			UEEPAlert(XMLHttpRequest.responseText);
		}
	});
}
//加载右侧某月及每日限额数据
function LoadMonthDayData(month, energyType) {
	$.ajax({
		type: "POST",//这里是http类型
		url: "/LimitWarn/GetMonthDay",//大家都应该很清楚了
		async: false,
		data: { month: month, energyType: energyType },//回传一个参数
		dataType: "json",//传回来的数据类型
		success: function (data) {
			if (data.length > 0) {
				$("#tb_container2").empty();
				var weekday = GetWeek(data[0].period);
				var weekcount = 0;
				var bflag = true;
				var str = "<tr class=\"even\">";
				bflag = false;
				var count = 0;
				for (weekcount = 0; weekcount < weekday - 1; weekcount++) {
					str += "<td style=\"height: 50px;\"> </td>";
				}
				for (var i = 0; i < data.length; i++) {
					var day = "";
					if (data[i].period.substring(8, data[i].period.length - 1) == "0") {
						day = data[i].period.substring(9, data[i].period.length);
					} else {
						day = data[i].period.substring(8, data[i].period.length);
					}
					if (weekcount <= 6) {
						str += "<td style=\"height: 50px;\"><span class=\"tr-span0\">" + day +
                            "</span>&nbsp;&nbsp;&nbsp;<span name=\"DayDataSpan\" id=\"DayData_" + data[i].period + "_" + data[i].id + "\"><span class=\"tr-span1-2-0\" >" + FloatFixed(data[i].limitvalue) + "</span></span></td>";
						weekcount += 1;
						count += data[i].limitvalue;
					} else {
						weekcount = 0;
						str += "</tr>";
						$("#tb_container2").append(str);
						str = "<tr";
						if (bflag == true) {
							str += " class=\"even\">";
							bflag = false;
						} else if (bflag == false) {
							str += " class=\"odd\">";
							bflag = true;
						}
						str += "<td style=\"height: 50px;\"><span class=\"tr-span0\">" + day +
                            "</span>&nbsp;&nbsp;&nbsp;<span name=\"DayDataSpan\" id=\"DayData_" + data[i].period + "_" + data[i].id + "\"><span class=\"tr-span1-2-0\" >" + FloatFixed(data[i].limitvalue) + "</span></span></td>";
						weekcount += 1;
						count += data[i].limitvalue;
					}
				}
				for (; weekcount <= 6; weekcount++) {
					str += "<td style=\"height: 50px;\"> </td>";
				}
				str += "</tr>";
				$("#tb_container2").append(str);
				str = "<tr";
				if (bflag == true) {
					str += " class=\"even\">";
					bflag = false;
				} else if (bflag == false) {
					str += " class=\"odd\">";
					bflag = true;
				}
				str += "<td style=\"height: 50px;\"> </td><td style=\"height: 50px;\"> </td><td style=\"height: 50px;\"> </td><td style=\"height: 50px;\"> </td><td style=\"height: 50px;\"> </td><td style=\"height: 50px;\"> </td><td style=\"height: 50px;\"> </td>";
				str += "</tr>";
				$("#tb_container2").append(str);
				var monthcount = $("#yearvalue").html().trimEnd("立方").trimEnd("千瓦时").trimEnd("吨");
				if (energyType == "E") {
					$("#rzbhjSpan").html(FloatFixed(count) + "千瓦时");
					$("#rczFont").html(FloatFixed(monthcount - count) + "千瓦时");
				} else if (energyType == "G") {
					$("#rzbhjSpan").html(count + "立方");
					$("#rczFont").html(FloatFixed(monthcount - count) + "立方");
				} else if (energyType == "W") {
					$("#rzbhjSpan").html(count + "吨");
					$("#rczFont").html(FloatFixed(monthcount - count) + "吨");
				}
				$("#xgrzbA").removeAttr("onclick");
				$("#xgrzbA").attr("onclick", "EditDay()");
				$("#xgrzbSpan").html("修改日指标");
			}
		},
		error: function (xmlHttpRequest) {
			UEEPAlert(XMLHttpRequest.responseText);
		}
	});
}
//获取某日是周几
function GetWeek(daytime) {
	var weekday = new Date(daytime).getDay();
	return weekday;
}
//点击“修改日指标”按钮，将各日指标框设为可写
function EditDay() {
	$.each($("span[name='DayDataSpan']"), function () {
		var idtext = $(this).attr("id");
		var period = idtext.substring(8, idtext.length);
		var str = "<input type=\"text\" class=\"txttblval\" value=\"" + $(this).find("span").html() + "\"";
		var date = new Date();
		var nowyear = date.getFullYear();
		var nowmonth = date.getMonth() + 1;
		if (Number(period.substring(0, 4)) > nowyear) {
		} else if (Number(period.substring(0, 4)) == nowyear) {
			if (Number(period.substring(5, 7)) >= nowmonth) {
			} else {
				str += " disabled=\"disabled\" ";
			}
		} else {
			str += " disabled=\"disabled\" ";
		}
		//onchange=TextDayChange('" + idtext + "','day_" + period + "') 
		str += " name=\"daydata\" id=\"day_" + period + "\"/>";
		$(this).empty();
		$(this).append(str);
		//$("#day_" + period).keyup(function () {
		//    TextDayChange(idtext, 'day_' + period);
		//});
		$('input[name="daydata"]').keyup(function () {
			TextDayChange($(this).attr("id"));
		});
	});
	$("#xgrzbA").removeAttr("onclick");
	$("#xgrzbA").attr("onclick", "UpdateDay()");
	$("#xgrzbSpan").html("保存日指标");

}
//日text框数据改变，引起合计和差值变化
function TextDayChange(id) {
	//$("#" + dayid).attr("id", dayid + "_" + dataid);
	var energyType = $("#energyType").val();
	if ($("#" + id).attr("id").indexOf('edit') == -1) {
		$("#" + id).attr("id", id + "_edit");
	}
	var count = 0;
	$("input[name='daydata']").each(function () {
		count += Number($(this).val());
	});
	var monthcount = $("#yearvalue").html().trimEnd("立方").trimEnd("千瓦时").trimEnd("吨");
	if (energyType == "E") {
		$("#rzbhjSpan").html(FloatFixed(count) + "千瓦时");
		$("#rczFont").html(FloatFixed(monthcount - count) + "千瓦时");
	} else if (energyType == "G") {
		$("#rzbhjSpan").html(count + "立方");
		$("#rczFont").html(FloatFixed(monthcount - count) + "立方");
	} else if (energyType == "W") {
		$("#rzbhjSpan").html(count + "吨");
		$("#rczFont").html(FloatFixed(monthcount - count) + "吨");
	}
}
//保存修改的日指标数据
function UpdateDay() {
	var energyType = $("#energyType").val();
	if ($("#rczFont").html().trimEnd("立方").trimEnd("千瓦时").trimEnd("吨") != "0.00") {
		UEEPAlert("日指标总额与月指标不匹配！");
	} else {
		//遍历所有日指标数据
		$("input[name='daydata']").each(function () {
			var idtext = $(this).attr("id");
			if (idtext.indexOf('edit') != -1) {
				var day = idtext.substring(4, 14);
				var id = idtext.substring(15, idtext.length - 5);
				var limitValue = $(this).val() + "";
				//修改日指标数据值
				$.ajax({
					type: "POST",//这里是http类型
					url: "/LimitWarn/UpdateDay",//大家都应该很清楚了
					async: false,
					data: { id: id, day: day, energyType: energyType, slimitValue: limitValue },//回传一个参数
					dataType: "json",//传回来的数据类型
					success: function (data) {
						if (data == "success") {
						}
					},
					error: function (xmlHttpRequest) {
						UEEPAlert(XMLHttpRequest.responseText);
					}
				});
				$(this).attr("id", "day_" + day + "_" + id);
			}
		});
		$.each($("span[name='DayDataSpan']"), function () {
			var idtext2 = $(this).attr("id");
			var day2 = idtext2.substring(8, 18);
			var id2 = idtext2.substring(19, idtext2.length);
			var str = "<span class=\"tr-span1-2-0\" >" + FloatFixed($("#day_" + day2 + "_" + id2).val()) + "</span>";
			$(this).empty();
			$(this).append(str);
		});
		$("#xgrzbA").removeAttr("onclick");
		$("#xgrzbA").attr("onclick", "EditDay()");
		$("#xgrzbSpan").html("修改日指标");
	}
}
//修改年度指标
function EditYear() {
	var year = $("#myeardata").val();
	var energyType = $("#energyType").val();
	//设置预警值、报警值
	var yjxename = $("#yjxename").val();
	var bjxename = $("#bjxename").val();
	if (energyType == "E") {
		$("#ConfigTitle").html(year + "年 电 指标");
	} else if (energyType == "G") {
		$("#ConfigTitle").html(year + "年 气 指标");
	} else if (energyType == "W") {
		$("#ConfigTitle").html(year + "年 水 指标");
	}
	$.ajax({
		type: "POST",//这里是http类型
		url: "/LimitWarn/GetWarnConfig",//大家都应该很清楚了
		async: false,

		data: { configname: yjxename },//回传一个参数
		dataType: "json",//传回来的数据类型
		success: function (data) {
			if (data != null) {
				if (data == "none") {
					//没有这条配置信息
					$("#warnvaluetype").val("0");
					$("#warnValue2").val("");
				} else {
					//已有这条配置信息
					$("#warnvaluetype").val("1");
					$("#warnvalueid").val(data.id);
					$("#warnValue2").val(data.configvalue);

				}
			}
		},
		error: function (xmlHttpRequest) {
			UEEPAlert(XMLHttpRequest.responseText);
		}
	});
	$.ajax({
		type: "POST",//这里是http类型
		url: "/LimitWarn/GetWarnConfig",//大家都应该很清楚了
		async: false,
		data: { configname: bjxename },//回传一个参数
		dataType: "json",//传回来的数据类型
		success: function (data) {
			if (data != null) {
				if (data == "none") {
					//没有这条配置信息
					$("#callvaluetype").val("0");
					$("#callValue2").val("");
				} else {
					//已有这条配置信息
					$("#callvaluetype").val("1");
					$("#callvalueid").val(data.id);
					$("#callValue2").val(data.configvalue);

				}
			}
		},
		error: function (xmlHttpRequest) {
			UEEPAlert(XMLHttpRequest.responseText);
		}
	});

	$.ajax({
		type: "POST",//这里是http类型
		url: "/LimitWarn/GetYear",//大家都应该很清楚了
		async: false,
		data: { year: year, energyType: energyType },//回传一个参数
		dataType: "json",//传回来的数据类型
		success: function (data) {
			if (data != null) {
				var datavalue = 0;
				if (data != "none") {
					$("#edittype").val("1");
					datavalue = FloatFixed(data.limitvalue);
				} else {
					$("#edittype").val("-1");
				}
				if (energyType == "E") {
					$("#yeardata2").val(datavalue);
					$("#yearunit").html("千瓦时");
				}
				else if (energyType == "G") {
					$("#yeardata2").val(datavalue);
					$("#yearunit").html("立方");
				} else if (energyType == "W") {
					$("#yeardata2").val(datavalue);
					$("#yearunit").html("吨");
				}
			}
		},
		error: function (xmlHttpRequest) {
			UEEPAlert(XMLHttpRequest.responseText);
		}
	});
	var yeartype = $("#edittype").val();
	if (yeartype == "-1") {
		$("input[name='month_checkbox']:checked").attr("checked", false);
	}
	else if (yeartype == "1") {
		$.ajax({
			type: "POST",//这里是http类型
			url: "/LimitWarn/GetYearMonth",//大家都应该很清楚了
			async: false,
			data: { year: year, energyType: energyType },//回传一个参数
			dataType: "json",//传回来的数据类型
			success: function (data) {
				if (data != null) {
					$.each(data, function (n, value) {
						if (value.period.substring(5, value.period.length - 1) == "0") {
							$("input[name='month_checkbox'][value='" + value.period.substring(6, value.period.length) + "']").attr("checked", true);
						} else {
							$("input[name='month_checkbox'][value='" + value.period.substring(5, value.period.length) + "']").attr("checked", true);
						}
					});
					checkOne();
				}
			},
			error: function (xmlHttpRequest) {
				UEEPAlert(XMLHttpRequest.responseText);
			}
		});
	}
	var date = new Date();
	var nowyear = date.getFullYear();
	if (Number(year) < nowyear) {
		$("#yeardata2").attr("disabled", "disabled");
		$("input[name='month_checkbox']").attr("disabled", "disabled");
		$("#upbutton").attr("disabled", "disabled");
	} else {
		$("#yeardata2").removeAttr("disabled");
		$("input[name='month_checkbox']").removeAttr("disabled");
		$("#upbutton").removeAttr("disabled");
	}
}
//保存年度指标
function UpdateYear() {
    var configvalue = $("#warnValue2").val();
    var callconfigvalue = $("#callValue2").val();
    var limitValue = $("#yeardata2").val().trimEnd("立方").trimEnd("千瓦时").trimEnd("吨");
    if (limitValue == "" && configvalue == "" && callconfigvalue == "") {
        UEEPAlert('年度指标、预警值、报警值的输入错误，请重新输入');
        return;
    }

	//保存年度数据
	var edittype = $("#edittype").val();
	var energyType = $("#energyType").val();
	//if(energyType)
	//var limitValue = $("#yeardata2").val().trimEnd("立方").trimEnd("千瓦时").trimEnd("吨");
	var year = $("#myeardata").val();
	//新增
	if (edittype == "-1") {
		AddYear(year, energyType, limitValue);
	}
		//修改
	else if (edittype == "1") {
		$.ajax({
			type: "POST",//这里是http类型
			url: "/LimitWarn/DeleteYear",//大家都应该很清楚了
			async: false,
			data: { year: year, energyType: energyType },//回传一个参数
			dataType: "json",//传回来的数据类型
			success: function (data) {
			},
			error: function (xmlHttpRequest) {
				UEEPAlert('输入错误，请重新输入');
			}
		});
		AddYear(year, energyType, limitValue);
	}
	var warnvaluetype = $("#warnvaluetype").val();
	var configname = $("#yjxename").val();
	//var configvalue = $("#warnValue2").val();
	var methodpath = "";
	var id = $("#warnvalueid").val();
	if (warnvaluetype == "0") {
		methodpath = "/LimitWarn/AddWarnConfig";
	} else if (warnvaluetype == "1") {
		methodpath = "/LimitWarn/UpdateWarnConfig";
	}
	$.ajax({
		type: "POST",//这里是http类型
		url: methodpath,//大家都应该很清楚了
		async: false,
		data: { id: id, configname: configname, configvalue: configvalue },//回传一个参数
		dataType: "json",//传回来的数据类型
		success: function (data) {
			if (data != null) {
				if (data == "success") {
				} else if (data == "error") {
				}
			}
		},
		error: function (xmlHttpRequest) {
			UEEPAlert(XMLHttpRequest.responseText);
		}
	});
	//保存限额预警数据
	var callvaluetype = $("#callvaluetype").val();
	var callconfigname = $("#bjxename").val();
	//var callconfigvalue = $("#callValue2").val();
	var callmethodpath = "";
	var callid = $("#callvalueid").val();
	if (callvaluetype == "0") {
		callmethodpath = "/LimitWarn/AddWarnConfig";
	} else if (callvaluetype == "1") {
		callmethodpath = "/LimitWarn/UpdateWarnConfig";
	}
	$.ajax({
		type: "POST",//这里是http类型
		url: callmethodpath,//大家都应该很清楚了
		async: false,
		data: { id: callid, configname: callconfigname, configvalue: callconfigvalue },//回传一个参数
		dataType: "json",//传回来的数据类型
		success: function (data) {
			if (data != null) {
				if (data == "success") {
				} else if (data == "error") {
				}
			}
		},
		error: function (xmlHttpRequest) {
			UEEPAlert(XMLHttpRequest.responseText);
		}
	});
	// $("#pop-onupdate").hide();
	$.fancybox.close();
	loadTree(year, energyType);
	LoadYear(year, energyType);
}
//增加年度指标-及其下的月、日指标
function AddYear(year, energyType, limitValue) {
	$.ajax({
		type: "POST",//这里是http类型
		url: "/LimitWarn/AddYear",//大家都应该很清楚了
		async: false,
		data: { year: year, energyType: energyType, slimitValue: limitValue },//回传一个参数
		dataType: "json",//传回来的数据类型
		success: function (data) {
		},
		error: function (xmlHttpRequest) {
			UEEPAlert(XMLHttpRequest.responseText);
		}
	});
	var monthcount = 0;
	$("input[name='month_checkbox']:checked").each(function () {
		monthcount += 1;
	});
	$("input[name='month_checkbox']:checked").each(function () {
		//alert("已选择的国家队: " + $(this).val());
		var month = "";
		if ($(this).val().length == 2) {
			month = year + "-" + $(this).val();
		} else if ($(this).val().length == 1) {
			month = year + "-0" + $(this).val();
		}
		var limitValuem = limitValue / monthcount + "";
		$.ajax({
			type: "POST",//这里是http类型
			url: "/LimitWarn/AddMonth",//大家都应该很清楚了
			async: false,
			data: { month: month, energyType: energyType, slimitValue: limitValuem },//回传一个参数
			dataType: "json",//传回来的数据类型
			success: function (data) {
			},
			error: function (xmlHttpRequest) {
				UEEPAlert(XMLHttpRequest.responseText);
			}
		});
	});
}

function checkAll1() {
	if ($("#checkAll").prop("checked") == true) {
		$(".tblnygl tr td input").each(function () {
			$(this).prop("checked", true);
		});
	}
	else {
		$(".tblnygl tr td input").each(function () {
			$(this).removeAttr("checked");
		});
	}
}
function checkOne() {
	var flagc = true;
	$(".tblnygl tr td input").each(function () {
		if ($(this).attr("checked") != "checked") {
			flagc = false;
		}
	});
	if (flagc == true) {
		$("#checkAll").attr("checked", "checked");
	}
	else {
		$("#checkAll").removeAttr("checked");
	}
}

function calculate() {
	var fn = Array.prototype.pop.apply(arguments);
	return fn.apply(null, arguments)
}
function diff() {
	var result = Array.prototype.shift.apply(arguments);
	for (var i = 0, l = arguments.length; i < l; i++) {
		result = result - arguments[i];
	}
	return result;
}

