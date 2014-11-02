
$(document).ready(
    function () {        
    	QueryControlDataList();
    	QueryEquPlanList();
    	ExeModeList();
    }
);

///设备计划执行方式改变时引发
$("input[name='planGroup']").change(function () {
	var selectval = $(this).val();
	$.ajax({
		url: "/OptMonitor/SetExeMode",
		async: false,
		type: "POST",
		dataType: "json",
		data: "module=devplan&mode=" + selectval,
		success: function (data) {
			if (data == 'OK') {
				UEEPAlert("更新设备计划执行方式成功");			   
			} else {
				UEEPAlert("更新设备计划执行方式失败");			  
			}
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			window.location.href = "/Navigation/List";
		}
	});
});

//优化指令执行方式改变时引发
$("input[name='optGroup']").change(function () {
	var selectval = $(this).val();
	$.ajax({
		url: "/OptMonitor/SetExeMode",
		async: false,
		type: "POST",
		dataType: "json",
		data: "module=optcmd&mode=" + selectval,
		success: function (data) {
			if (data == 'OK') {
				UEEPAlert("更新优化指令执行方式成功");   

			} else {
				UEEPAlert("更新优化指令执行方式失败");

			}
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			UEEPAlert(XMLHttpRequest.responseText);
		}
	});
});

//加载优化和设备计划的执行方式信息
function ExeModeList() {
	$.ajax(
        {
        	url: "/OptMonitor/ExeModeList", type: "POST", async: false,
        	data: "", dataType: "json",
        	success: function (responseJSON) {
        		var strEqu = "";
        		$.each(responseJSON, function (n, value) {
        			switch (value.module) {
        				case 'optcmd':
        					$("#optRadio" + value.enabled).attr("checked", 'checked');
        					break;
        				case 'devplan':
        				    $("#planRadio" + value.enabled).attr("checked", 'checked');
        					break;
        				default:
        					break;
        			}
        		});
        	},
        	error: function (XMLHttpRequest, textStatus, errorThrown) {
        		UEEPAlert(XMLHttpRequest.responseText);
        	}
        });
}

//查询优化指令信息
function QueryControlDataList()
{
	$.ajax({
		type: "POST",
		url: "/OptMonitor/ControlDataList",
		async: false,
		data: "",
		dataType: "json",
		success: function (responseJSON) {
			$("#tb_OptCmd").empty();
			$.each(responseJSON, function (n, value) {
				var str = "";
				if (n % 2 == 0)
					str += '<tr class="odd">';
				else
					str += '<tr class="even">';
				str += "<td class=\"tdW100\">" + value.groupid + "</td>" +
                       "<td class=\"tdW150\">" + initstring(value.ptime) + "</td>" +
                       "<td style='display:none'>" + initstring(value.code) + "</td>" +
                       "<td>" + initstring(value.instancename) + "</td>" +
                        "<td class=\"tdW150\">" + "调节" + initstring(value.propname) + "</td>" +
                       "<td class=\"tdW90\">" + initstring(value.value) + "</td>";
                       
			    // 0:未处理 1：自动执行 2：手动执行 3：手动不执行 4：不执行
				if (value.state == 1 || value.state == 2)
				{
				    str+="<td class=\"tdW90\"><span class=\"yxjkIcon yxjkOk\"></span></td>" + "</tr>";
				}
				else
				{
				    str += "<td class=\"tdW90\"><span class=\"yxjkIcon yxjkPause\"></span></td>" + "</tr>";
				}

				$("#tb_OptCmd").append(str);
			});
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			UEEPAlert(XMLHttpRequest.responseText);
		}
	});
}

//查询设备计划信息
function QueryEquPlanList()
{
	$.ajax({
		type: "POST",//这里是http类型
		url: "/OptMonitor/PlanDataList",//大家都应该很清楚了
		async: false,
		data: "",//回传一个参数
		dataType: "json",//传回来的数据类型
		success: function (responseJSON) {
			$("#tb_equPlan").empty();
			$.each(responseJSON, function (n, value) {
				var str = "";
				if (n % 2 == 0)
					str += '<tr class="odd">';
				else
					str += '<tr class="even">';
				str += "<td>" + initstring(value.equname) + "</td>";
				str += "<td class=\"tdW150\">" + initstring(value.plantime) + "</td>";
				str += "<td class=\"tdW50\">" + initstring(value.oper) + "</td>";
				str += "<td class=\"tdW90\"><input type='checkbox' onchange='clickEquState(this)' value='" + value.equcode + "'";
				if (value.equstate == 1) {
					str += " checked='checked'";
				}
				str += "/></td></tr>"
				$("#tb_equPlan").append(str);
			});
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			UEEPAlert(XMLHttpRequest.responseText);
		}
	});
}

function clickEquState(obj) 
{
    UEEPConfirm('是否要改变设备状态？',function (r) {
        if (r == true) {
            $.ajax({
                type: "POST", url: "/OptMonitor/ChangeEquState",
                async: false,
                data: { equCode: $(obj).val(), equState: $(obj).prop("checked") },
                dataType: "json",
                success: function (data) {
                    if (data == 'OK') {
                        Dev_Plan();
                        UEEPAlert('修改设备状态成功！');
                        QueryEquPlanList();
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

///下发优化指令
function SendOptCmd() {
    UEEPConfirm('确定下发本组优化指令吗？', function (r)
    {
        if (r == true)
        {
            $.ajax(
              {
                  url: "/WCF/SendOptCmd",
                  async: false,
                  type: "POST",
                  dataType: "json",
                  data: { groupID: 1 },
                  success: function (data) {
                      if (data == 'OK') {
                          UEEPAlert('下发成功！');
                          $.fancybox.close();
                          $("#tb_OptCmd").empty();
                      } else {
                          UEEPAlert('执行负荷修正失败，请检查优化服务是否开启!');
                      }
                  },
                  error: function (XMLHttpRequest, textStatus, errorThrown) {
                      alert(XMLHttpRequest.responseText);
                  }
              });
        }
    });   
}

///下发优化指令
function CancelAsk() {
    UEEPConfirm('确定不下发本组指令吗？', function (r) {
        if (r == true) {
            $.fancybox.close();            
        }
    });
}

//空属性转值，防止出现null
function initstring(parameters) {
	if (parameters != null && parameters.length > 0) {
		return parameters;
	} else {
		return " ";
	}
}

//弹出框处理
$(function () {
	$('.fb01').fancybox({
		afterShow: function () {
			$('.fancybox-close').addClass('closeInstructionButton');
			buttonHide('tbInstruction');
		},
		helpers: {
			overlay: { closeClick: false }
		},
		padding: 0
	});
	$('.fb02').fancybox({
		afterShow: function () {
			$('.fancybox-close').addClass('closeInstructionButton');
			buttonHide('tbStart');
		},
		helpers: {
			overlay: { closeClick: false }
		},
		padding: 0
	});

	$('.fb03').fancybox({
		afterShow: function () {
			$('.fancybox-close').addClass('closeInstructionButton');
			buttonHide('tbError');
		},
		helpers: {
			overlay: { closeClick: false }
		},
		padding: 0
	});
	$('.tskMinIcon').on('click', hideWrapper);
	$("a.tskButton").hide();
	setInterval(QueryControlDataList, 20000);//指令
	//setInterval(QueryEquPlanList, 20000);//启停计划

    //setInterval(TimerGetData, 20000); //指令提醒
    //setInterval(TipStartStopInfo,10000);//启停提醒	

	//setInterval(PopErrorDialog, 10000);
});

function TimerGetData()
{
    var selectval = $("input[name='optGroup']:checked").val();
    if (selectval == '2')
    {
        $.ajax({
            type: "POST",
            url: "/OptMonitor/TipDataList",
            async: false,
            data: "",
            dataType: "json",
            success: function (responseJSON) {
                $("#tb_CmdTsk").empty();
                $.each(responseJSON, function (n, value) {
                    var str = "";

                    if (n % 2 == 0)
                        str += '<tr class="odd">';
                    else
                        str += '<tr class="even">';
                    str += "<td class=\"tdW150\">" + initstring(value.ptime) + "</td>" +
                           "<td style='width: 140px;display:none'>" + initstring(value.code) + "</td>" +
                           "<td>" + initstring(value.instancename) + "</td>" +
                           "<td class=\"tdW150\">" + "调节" + initstring(value.propname) + "</td>" +
                           "<td class=\"tdW100\">" + initstring(value.value) + "</td></tr>";
                    $("#tb_CmdTsk").append(str);
                });
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                UEEPAlert(XMLHttpRequest.responseText);
            }
        });
   
        PopCmdDialog();
    }
}

function TipStartStopInfo() {
    var selectval = $("input[name='planGroup']:checked").val();
    if (selectval == '2')
    {        
        $("#tipInfo").text('请注意：冷却塔2将于2014-10-11 11:00:00开机');
        PopStartStopDialog();
    }
}

function buttonHide(name) {
	$('.closeInstructionButton').on('click', function () {
		$('.' + name + '').hide();
	});
}
function hideWrapper() {
	var boxWrap = $('.fancybox-overlay');
	boxWrap.hide();

	$(".fancybox-wrap").hide();
}

function PopCmdDialog() {
	if (!$.fancybox.isOpen)
		$(".fb01").show().click();
}

function PopStartStopDialog() {
	if (!$.fancybox.isOpen)
		$(".fb02").show().click();
}

function PopErrorDialog() {
	if (!$.fancybox.isOpen)
		$(".fb03").show().click();
}
