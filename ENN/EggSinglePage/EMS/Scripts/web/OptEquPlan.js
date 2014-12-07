(function(){
    // for auto height
    autoHeight('#sbqtjhWrapper','.sbqtjhlTop','.sbqtjhList');
    sbqtjhAutoHeight('#sbqtjhWrapper','.sbqtjhrTop','.sbqtjhrScrollTop','.sqtjhInfo','.sbqtjhrScroll')
})();
function sbqtjhAutoHeight(total, detached1, detached2, detached3, result) {
   var num = parseFloat($(total).outerHeight()) - parseFloat($(detached1).outerHeight()) - parseFloat($(detached2).outerHeight()) - parseFloat($(detached3).outerHeight()); 
   $(result).height(num);
   $(window).resize(function(){
       var num = parseFloat($(total).outerHeight()) - parseFloat($(detached1).outerHeight()) - parseFloat($(detached2).outerHeight()) - parseFloat($(detached3).outerHeight()); 
       $(result).height(num);
   });
}
//#region 前台页面效果
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

///执行设备计划
function Dev_Plan() {
    $.ajax(
   {
       url: "/WCF/Dev_Plan",
       async: false,
       type: "POST",
       dataType: "json",
       data: "",
       success: function (data) {
           if (data == 'OK') {

           } else {             
               UEEPAlert('执行设备计划失败，请检查优化服务是否开启!');
           }
       },
       error: function (XMLHttpRequest, textStatus, errorThrown) {
           UEEPAlert(XMLHttpRequest.responseText);
       }
   });
}

$(function () {
	EquStateList();
	LoadEquTypeData();
	LoadEquPlanData();
	var $timeHeade = $("#timeHead");
	var str = "";
	for (var i = 0; i < 24; i++) {
		str += '<span class="sbqtjhNum" style="left:' + (i * 15) + 'px;">' + i + '</span>';
	}
	$timeHeade.empty().append(str);
});

//加载左侧设备列表
function EquStateList() {
	var $equList = $("#equUl");
	$.ajax({
		url: "/OptEquPlan/EquStateList", type: "POST", async: false,
		data: "", dataType: "json",
		success: function (responseJSON) {
			var strEqu = "";
			$.each(responseJSON, function (n, value) {
				strEqu += "<li><input type='checkbox' onchange='clickEquState(this)' value='" + value.equcode + "'";
				if (value.equstate == 1) {
					strEqu += " checked='checked'";
				}
				strEqu += "><span>" + value.equname + "</span></li>"
			});
			$equList.empty().append(strEqu);
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			UEEPAlert(XMLHttpRequest.responseText);
		},
	});
}

function clickEquState(obj) {
    UEEPConfirm('是否要改变设备状态？', function (r) {
        if (r == true) {
            $.ajax
           ({
               url: "/OptEquPlan/ChangeEquState", type: "POST", async: false,
               data: { equCode: $(obj).val(), equState: $(obj).prop("checked") }, dataType: "json",
               success: function (data) {
                   if (data == 'OK') {
                       Dev_Plan();
                       UEEPAlert('修改设备状态成功！');
                   } else {
                       UEEPAlert(data);
                   }
               },
               error: function (XMLHttpRequest, textStatus, errorThrown) {
                   UEEPAlert(XMLHttpRequest.responseText);
               }
           });
        }
        else {
            obj.checked = !obj.checked;
        }
    });	
}

//加载设备类型列表，有两处，一处是查询条件，一处是新增修改计划弹出框内
function LoadEquTypeData() {
	$.ajax({
		type: "POST", url: "/OptEquPlan/EquTypeList", async: false,
		data: {}, dataType: "json",
		success: function (responseJSON) {
			var str = "<li val=''><a href=''>全部设备类型</a></li>";
			$.each(responseJSON, function (n, value) {
				//if (n == 0) {
				//	$selEquType1.find("p.text").text(value.name);
				//	$selEquType2.find("p.text").text(value.name);
				//}
				str += "<li val='" + value.modelcode + "'><a href=''>" + value.name + "</a></li>";
			});
			$("#selEquType1").find("ul").empty().append(str);
			$("#selEquType2").find("ul").empty().append(str);
			$("#selEquType1").simSelect({
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

//查询设备启停计划列表
function LoadEquPlanData() {
	$.ajax({
	    type: "POST",
	    url: "/OptEquPlan/WebDevPlanList",
	    async: false,
	    data: { date: $("#txtDate").val(), equType: $("#selEquType1 p.text").attr("val") },
	    dataType: "json",
		success: function (responseJSON) {
			$("#tblData").empty();
			if (responseJSON == null || responseJSON.length < 1) {
				$("#tblData").append("<div class='yred tcenter'>数据为空</div>");
			}
			else {
				$.each(responseJSON, function (n, value) {
					var str = "";
					if (n % 2 == 0)
						str += '<tr class="odd">';
					else
						str += '<tr class="even">';
					var posPlan = ConvertTime2PosX(value.startstop);
					var posReal = ConvertTime2PosX(value.startstop);
					var dateEnd = new Date((value.date + " " + posPlan.etime).replace(/-/g, "/"));
					var dateNow = new Date();
					str += '<td style="display:none;">' + value.orderid + '</td>';
					str += '<td style="width: 39px;">' + (n + 1) + '</td>';
					str += '<td style="width: 71px;">' + value.date + '</td>';
					str += '<td style="width: 281px;">' + value.equname + '</td>';
					str += '<td style="width: 92px;">' + value.startstop + '</td>';
					str += '<td style="width: 92px;">' + value.startstop + '</td>';
					str += '<td style="width: 67px;">';
					if(dateEnd > dateNow)
					    str += '<a title="编辑" class="ico-sbgl ico-Update2 fancybox" onclick="PopEquPlan(' + n + ')" href="#sb-pop-onupdate3"></a>';
					if (dateEnd < dateNow) {
					    str += '<a> </a></td>';
					}
					else {
					    str += '<a title="删除" class="ico-sbgl ico-Delete2" onclick="DeletePlan(' + value.orderid + ')"> </a></td>';
					}
					str += '<td style="position:relative;">';
					str += '<span class="sbqtjhPlan" style="left:' + posPlan.left + ';width:' + posPlan.width + ';"></span>';
					str += '<span class="sbqtjhReal" style="left:' + posReal.left + ';width:' + posReal.width + ';"></span>';
					str += '</td>';
					str += '</tr>';
					$("#tblData").append(str);
				});
			}
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			UEEPAlert(XMLHttpRequest.responseText);
		}
	});
}

//弹出新增修改计划框时的初始化处理
function PopEquPlan(rowIndex) {
	var $tblRow = $("#tblData>tr");
	LoadSelectEquList("");
	if (rowIndex == -1) {
		$("#sb-pop-onupdate h2").text("新增计划");
		$("#uid").val(-1);
		$("#selEquType2 p.text").attr("val", "").text($("#selEquType2 a:first").text());
		$("#selEquList p.text").attr("val", "").text($("#selEquList a:first").text());
		$("#stime").val("");
		$("#etime").val("");
		$("#selEquType2").simSelect({
			callback: function (x, v) {
				if (!x) return;
				LoadSelectEquList(v);
			}
		});
	}
	else {
		$("#sb-pop-onupdate h2").text("修改计划");
		$("#uid").val($tblRow.eq(rowIndex).find("td:eq(0)").text());
		$("#selEquType2").unbind("click").addClass("disable");
		$("#selEquList").unbind("click").addClass("disable");
		var equName = $tblRow.eq(rowIndex).find("td:eq(3)").text();
		$.ajax({
			url: "/OptEquPlan/GetEquTypeByName", type: "POST", async: false,
			data: { equName: equName, temp: Math.random() }, dataType: "json",
			success: function (data) {
				$("#selEquType2 p.text").attr("val", data.typename).text(data.typename);
				$("#selEquList p.text").attr("val", data.equcode).text(equName);
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				UEEPAlert(XMLHttpRequest.responseText);
			}
		});
		var tmSE = $tblRow.eq(rowIndex).find("td:eq(4)").text();
		var tmArray = tmSE.split('-');
		if (tmArray.length != 2)
			return;
		$("#stime").val($tblRow.eq(rowIndex).find("td:eq(2)").text() + " " + tmArray[0]);
		$("#etime").val($tblRow.eq(rowIndex).find("td:eq(2)").text() + " " + tmArray[1])
	}
}

//加载新增修改计划弹出框的选择设备区
function LoadSelectEquList(equType) {
	var $selEquList = $("#selEquList");
	$.ajax({
		url: "/OptEquPlan/EquList", type: "POST", async: false,
		data: { equType: equType }, dataType: "json",
		success: function (responseJSON) {
			var strSelectEqu = "<li val=''><a href=''>请选择设备</a></li>";
			$.each(responseJSON, function (n, value) {
				strSelectEqu += "<li val='" + value.equcode + "'><a href=''>" + value.equname + "</a></li>";
			});
			$selEquList.find("ul").empty().append(strSelectEqu);
			$selEquList.simSelect({
				callback: function (x, v) {
					if (!x) return;
					$("#equid").val(v);
				}
			});
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			UEEPAlert(XMLHttpRequest.responseText);
		}
	});
}

//保存新增或修改的计划值
function EditEquPlan() {
	var equCode = $("#selEquList p.text").attr("val");
	var stime = $("#stime").val();
	var etime = $("#etime").val();
	$("#equid").val(equCode);
	if (!StrValidateTitle(equCode)) {
		UEEPAlert("请选择设备名称！");
		return;
	}
	if (stime == "" || etime == "" || stime >= etime) {
		UEEPAlert("请选择正确的计划启停时间！");
		return;
	}


	if (!$('#pageform').valid()) return;
	//提交，存入数据库
	$("#pageform").ajaxSubmit({
		type: 'POST',
		url: "/OptEquPlan/UpdatePlan",
		dataType: "json",
		data: { equPlanId: $("#uid").val(), equCode: equCode, equName: $("#selEquList p.text").text(), stime: stime, etime: etime },
		success: function (data) {
			$.fancybox.close();
			if (data == 'OK') {
				LoadEquPlanData();

			} else {			   
			    UEEPAlert(data);
			}
		},
		error: function (XMLResponse) {		   
		    UEEPAlert(XMLResponse.responseText);
		}
	});
}

function DeletePlan(planId)
{
    UEEPConfirm('确认删除吗？',function (r) {
        if (r == true) {
            location.href = "/OptEquPlan/Delete/" + planId;
            return true;
        }
        else {
            return false;
        }
    });   
}

function ConvertTime2PosX(strTime) {
	var strMinute = strTime.split('-');
	var time1 = strMinute[0].split(':');
	var time2 = strMinute[1].split(':');
	var space = 60 / 15;
	var left = 1 + (parseInt(time1[0]) * 60 + parseInt(time1[1])) / space;
	var right = 1 + (parseInt(time2[0]) * 60 + parseInt(time2[1])) / space;
	var tmInfo = { stime: strMinute[0] + ":00", etime: strMinute[1] + ":00", left: left + "px", width: (right - left) + "px" };
	return tmInfo;
}

