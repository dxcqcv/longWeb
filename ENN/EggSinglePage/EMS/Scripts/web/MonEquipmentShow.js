/*
    * 功能说明：设备能效监控展示页面js
    * 创建人：师佳丽
    * 创建时间：2014-06-11
    * */
$(document).ready(function () {
    $("#menuhide").css({ display: "block" });
    $("#menushow").css({ display: "none" });
    showmenulist();
});

//菜单列表
function showmenulist() {
    var winHeight = document.documentElement.clientHeight;
    var winWidth = document.documentElement.clientWidth;
    var width = 0;
    var height = 0;
    if ((winWidth * 1 - 1280) > 0) {
        width = (winWidth * 1 - 1280) / 2;
    }
    if ((winHeight * 1 - 126 - 620) > 0) {
        height = (winHeight * 1 - 620 - 126) / 2 + 126;
    } else {
        height = 126;
    }
    var type = '';
    $.ajax({
        type: "GET", url: '/MonEnergy/queryMonitorPageList', data: { mode: type },
        async: false,
        success: function (data) {
            if (data.length > 0) {
                $("#maincontent").css("display", "block");
                querymonitorequparameter(data[0].pageid);
                var str = "";
                for (i = 0; i < data.length; i++) {
                    str += "<li><a onClick='querymonitorequparameter(" + data[i].pageid +  ")'>" + data[i].title + "</a></li>";
                }
                $("#menulist").empty().append(str);

            } else {
                $(".graphlist").remove();
                $(".labellist").remove();
                $("#maincontent").css("display", "none");
                $("#menulist").empty().append("<li><a>项目未配置运行监测</a></li>");
            }
        }
    });
}
//显示设备控件 graphlist
function querymonitorequparameter(pageid) {
    var path = $("#path").val();
    $("#pageid").val(pageid);
    $("#maincontent").empty();
    $("#maincontent").removeAttr("style");
    showmenubg(pageid);
    $.getJSON("/MonEnergy/queryEquPage", { pageid: pageid, temp: Math.random() }, function (data) {
        if (data != null) {
            var str = "";
            $.each(data, function (i, item) {
                var picpath = path + item.picturepath;
                var t = i + 1;
                var y = parseInt(item.y);
                str += "<div style='z-index: 2;' title='" + item.title + "' id='equ_widget_" + item.widgetid + "' class='graphlist'>" +
				   	   "<a id='equ_a_" + item.widgetid + "' class='fancybox' href='#pop-xmgl'>" +
				   	   "<img src='" + picpath + "'  alt='" + item.title + "' width='" + item.width + "' height='" + item.height + "'/>" +
				   	   "</a>" +
				   	   "</div>";
            });
            $("#maincontent").append(str);
             ergodicLabelWidget(pageid);

            $.each(data, function (i, item) {
                var graph_style = { "position": "absolute", "left": item.x + "px", "top": item.y + "px" };
                var a_style = { "width": item.width + "px", "height": item.height + "px", "display": "block" };
                $("#equ_widget_" + item.widgetid).css(graph_style);
                $("#equ_a_" + item.widgetid).css(a_style);
                if (item.isshow == '0') {
                    $("#equ_widget_" + item.widgetid).css("display", "none");
                }
                if (item.isclick == '0') {
                    $("#equ_widget_" + item.widgetid).unbind();
                } else {
                    $("#equ_widget_" + item.widgetid).click(function () {
                        $(".hd h2", "#pop-xmgl").text(item.title + "--详细动态属性");
                        queryboxProperty(item.title, item.widgetid, item.classinstanceid);
                        $("#property_container").empty();
                    });
                }
            });
        }
    });
    setTimeout(initWatchData, 3000);//首次加载
    setInterval(initWatchData, 60000); //60S加载
}
/*
	遍历生成监测框
*/
var labelArray = new Array();
function ergodicLabelWidget(pageid) {
    labelArray = [];
    var path = $("#path").val();
    $.getJSON("/MonEnergy/queryPageProp", { spageid: pageid, temp: Math.random() }, function (data) {
        if (data != null) {
            labelArray = data;
            $.each(data, function (i, item) {
                var labelx = item.x;
                var labely = parseInt(item.y);
                var labelwidth = item.width;
                var labelheight = item.height;
                var labeltitle = item.title;
                var arrowstyle = item.arrowstyle;
                var labelfontsize = item.fontsize;
                var labelfontcolor = item.fontcolor;
                var labelid = "monitor_widget_" + item.widgetid;
                var labelborderid = "label_border_" + item.widgetid;
                var classinstanceid = item.classinstanceid;
                var labelborder = "<div id=\"" + labelborderid + "\" class=\"label_tag labellist\" title=\"" + labeltitle + "\"></div>";
                var labelborder_style = { "z-index": 3, "position": "absolute", "left": labelx + "px", "top": labely + "px", "filter": "alpha(opacity = 70)", "-moz-opacity": 0.7, "-khtml-opacity": 0.7, "opacity": 0.7 };
                var labeltable = "<table cellpadding=\"0\" cellspacing=\"0\" border=\"0\">" +
									"<tr>" +
										"<td id=\"" + labelid + "\"></td>" +
									"</tr>" +
								"</table>";
                var table_style = { "width": labelwidth + "px", "height": labelheight + "px", "font-size": labelfontsize + "px", "color": labelfontcolor, "background-color": "#328CB8" };

                $("#maincontent").append(labelborder);
                $("#" + labelborderid).append(labeltable);
                $("#" + labelborderid).css(labelborder_style);
         
                $("#" + labelid).css(table_style);

                if (item.isshow == '1') {
                    $("#" + labelborderid).css("display", "block");
                } else {
                    $("#" + labelborderid).css("display", "none");
                }

                var labelproperties = new Array(); //控件设备属性
                var labelunits = new Array();      //控件单位
                if (item.units != null) {
                    labelunits = item.units.split(",");
                }
                $.getJSON("/MonEnergy/GetCodeInfo", { properties: item.properties, temp: Math.random() }, function (json) {
                    if (json != null) {
                        $.each(json, function (j, item2) {
                            if (item2 != null) {
                                var element = {
                                    code: item2.normalcode,
                                    name: item2.propname,
                                    unit: item2.unit
                                };
                                labelproperties.push(element);
                            }
                        });
                        initWatchTable(classinstanceid, labelproperties, labelid, table_style, labelfontsize);
                    }
                });
            }); //each结束
        }//if结束
    });
}

/*
	生成监测控件属性内容
*/
var initWatchTable = function (classinstanceid, showList, labelid, style, labelfontsize) {
    var str = "<table id=\"data_" + labelid + "\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">";
    for (var i = 0; i < showList.length; i++) {
        str += "<tr><td align=\"right\">" + showList[i].name + ":</td>";
        str += "<td align=\"center\" width=\"50px\"><input id=\"data_" + showList[i].code + "\" type=\"text\" readonly=\"readonly\" value=\"0.00\" class=\"input_border\" style=\"font-size:" + labelfontsize + "px\"/></td>";
        str += "<td align=\"left\" width=\"30px\">" + showList[i].unit + "</td></tr>";
    }
    str += "</table>";
    $("#" + labelid).html("").append(str);
    $("#data_" + labelid).css(style);
};
/*
	生成监测数据
*/
function initWatchData() {
    var path = $("#path").val();
    if (labelArray.length > 0) {
        $.each(labelArray, function (i, item) {
            $.getJSON("/MonEnergy/GetCodeData", { classinstanceid: item.classinstanceid, properties: item.properties, temp: Math.random() }, function (json) {
                if (json.length > 0) {
                    $.each(json, function (j, item) {
                        var val = item.curvalue;
                        if (isNaN(val)) {
                            val = "0.00";
                        } else {
                            val = parseFloat(val).toFixed(2);
                        }
                        $("#data_" + item.code).val(val);
                    });
                }
            });
        });
    }
}

function showmenu() {
    $("#menushow").css({ display: "block" });
    $("#menuhide").css({ display: "none" });
}
function hidemenu() {
    $("#menuhide").css({ display: "block" });
    $("#menushow").css({ display: "none" });
}

//菜单列表
function showmenubg(pageid) {
    var path = $("#path").val();
    var str = "";
    var bgstr = "";
    $.getJSON("/MonEnergy/queryMonitorPageOne", { pageid: pageid, temp: Math.random() }, function (data) {
        if (data != null) {
            bgstr = path + data.pageimage;
            var pg = "transparent  url(" + bgstr + ") scroll " + data.pgimagex + "px" + " " + data.pgimagey + "px";
            $("#maincontent").css({ "background": pg, "width": data.pagewidth + "px", "height": data.pageheight + "px", "z-index": 0, "background-repeat": "no-repeat", "background-size": "100% 100%" });
        }
        $("#page_title").remove();
        var titley = parseInt(data.titley);
        var style = {
            "z-index": "4", "position": "absolute", "line-height": data.titleheight + "px",
            "left": data.titlex + "px", "top": titley + "px", "width": data.titlewidth + "px", "height": data.titleheight + "px",
            "text-align": "center", "font-size": data.fontsize + "px", "color": data.fontcolor, "background-color": data.titlebgcolor,
            "border": "1px solid " + data.titlebordercolor, "filter": "alpha(opacity = 70)", "-moz-opacity": 0.7, "pacity": 0.7, "font-family": "微软雅黑"
        };
        var titleid = "page_title";
        var titlecontent = "<div id='" + titleid + "' style='width:" + data.titlewidth + "px;height:" + data.titleheight + "px;z-index:4;position:absolute;left:" + data.titlex + "px;top:" + data.titley + "px;'>" + data.title + "</div>";
        $("#maincontent").append(titlecontent);
        $("#" + titleid).css(style);
        if (data.titleisshow == '0') {
            $("#" + titleid).css("display", "none");
        }
    });
}
//点击设备控件事件
function queryboxProperty(name, equid, classinstanceid) {
    $("#cid").val(classinstanceid);
    $.getJSON("/MonEnergy/boxProperty", { classinstanceid: classinstanceid }, function (data) {
        if (data != "") {
            str1 = "<a href='#' style='margin-left:50px;'  onclick='SelectAll()'>全选/反选</a><input type='button' value='查询' class='long_btn' style='margin-left:50px;margin-top:15px;' onClick='initLine(\"" + classinstanceid + "\",\"" + name + "\");'/>";
            str1 += "<div style='overflow-y:auto;overflow-x:hidden; width:248px;height:350px;margin-top:10px' ><div style='height:340px'>"
            str1 += "<table style='font-size:13px;margin-top:5px' width='215px' border='0'>";
            $.each(data, function (i, item) {
                str1 += "<tr><td align='right' width='140px'>" + item.propname + ":</td><td width='55px'><input id='data_" + item.normalcode + "' value=' ' style='width:55px; text-align:right'/></td><td align='left'  width='20px'>&nbsp<input type='checkbox' name='equproperty' value='" + item.normalcode + "," + item.propname + "'></td></tr>";
                $("#classinstancename").val(data[i].classinstancename);
                $("#classinstanceid").val(data[i].instancecode);
            });
            str1 += "</table>";
            str1 += "</div></div>";
            $("#equinstancepropertylist").empty().append(str1);
            setTimeout(showpropertyvalue, 5000);//首次加载
            setInterval(showpropertyvalue, 60000); //60S加载

        }
    });
    popFancybox();
}
/*
初始化表单框属性
*/
function showpropertyvalue() {
    var classinstanceid = $("#cid").val();
    $.getJSON("/MonEnergy/boxValue", { classinstanceid: classinstanceid }, function (data) {
        if (data != null) {
            $.each(data, function (i, item) {
                var val = item.curvalue;
                if (isNaN(val)) {
                    val = "0.00";
                } else {
                    val = parseFloat(val).toFixed(2);
                }
                $("#data_" + item.code).val(val);
            });
        }
    });
}

var line_data = new Array();
var energy_chart;
var timestamp = null;
var interval_temp;

/*
	初始化曲线数据
*/
function initLine(classinstanceid, classinstancename) {
    classpropertyname = [];
    classpropertyid = [];
    objName1 = $("input[name='equproperty']:checked");
    objName = $("input[name='equproperty']");

    for (i = 0; i < objName.length; i++) {
        if (objName[i].checked) {
            var objval = objName[i].value.split(",");
            classpropertyid.push(objval[0]);
            classpropertyname.push(objval[1]);
        }
    }
    if (classpropertyid.length > 0) {
        propLineInit(classinstanceid, classinstancename, classpropertyid);
    } else {       
        UEEPAlert('请勾选属性!');
        return;
    }
}

/*
	初始化曲线
*/
function propLineInit(classinstanceid, classinstancename, classpropertyid) {
    var series = new Array();
    var catego = new Array();
    for (var i = 0; i < classpropertyid.length; i++) {
        line_data[i] = new Array();
    }
    $.getJSON("/MonEnergy/boxLine", { classinstanceid: classinstanceid, classpropertyid: classpropertyid.toString(), temp: Math.random() }, function (data) {
        if (data != null) {
            for (var j = 0; j < classpropertyid.length; j++) {
                var key = classpropertyid[j].toLowerCase();
                $.each(data[key], function (i, item) {
                    var val = checkNullandFixN(item.Y_axis, 2);
                    line_data[j].push([dateInit(item.X_axis), parseFloat(val)]);
                });
                catego.push(classpropertyname[j]);
            }
            for (var j = 0; j < classpropertyid.length; j++) {
                if (line_data[j].length > 0) {
                    var name = addUnit1(classpropertyname[j]);

                    var item = {
                        name: name,
                        data: line_data[j],
                        marker: {
                            enabled: false
                        }
                    };
                    series.push(item);
                }
            }
            propchartInit(classinstancename + " 动态属性1h实时数据对比", series);
        }
    });
}

function linechartInit(type, div, title, series, catego) {
    div.highcharts({
        chart: {
            type: type
        },
        title: {
            text: title
        },
        xAxis: {
            categories: catego
        },
        yAxis: {
            title: {
                text: ''
            },
            labels: {
                formatter: function () {
                    return this.value + '°'
                }
            }
        },
        tooltip: {
            crosshairs: true,
            shared: true
        },
        plotOptions: {
            spline: {
                marker: {
                    radius: 4,
                    lineColor: '#666666',
                    lineWidth: 1
                }
            }
        },
        series: series
    });
}

function propchartInit(title, series) {
    Highcharts.setOptions({
        global: {
            useUTC: false
        }
    });
    if (energy_chart != null) {
        energy_chart.destroy();
        $("#property_container").empty();
    }
    var classinstanceid = $("#classinstanceid").val();
    energy_chart = new Highcharts.Chart({
        colors: ["#CE0000", "#FF0080", "#E800E8", "#921AFF", "#0000E3", "#0066CC", "#00AEAE", "#02C874", "#00BB00", "#E1E100", "#EAC100", "#FF9224", "#FF5809", "#949449", "#4F9D9D", "#7373B9", "#9F4D95"],
        chart: {
            renderTo: 'property_container',
            type: 'line',
            animation: Highcharts.svg, // don't animate in old IE
            marginLeft: 60,
            marginTop: 40,
            marginRight: 10,
            events: {
                load: function () {  //load函数是chart初始化之后执行的
                    clearInterval(interval_temp);
                    interval_temp = setInterval(function () {
                        $.getJSON("/proequ/queryEquCurrent.action?classinstanceid=" + classinstanceid + "&classpropertyid=" + classpropertyid.toString() + "&temp=" + Math.random(), function (data) {
                            if (data.length > 0) {
                                $.each(data, function (i, item) {
                                    if (dateInit(item.rectime) != timestamp && data.length == energy_chart.series.length) {
                                        energy_chart.series[i].addPoint([dateInit(item.rectime), parseFloat(item.datavalue)], true, true);
                                    }
                                });
                            }
                        });
                    }, 60000);
                }
            }
        },
        title: {
            text: title,
            style: {
                fontSize: '13px'
            }
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 100,
            dateTimeLabelFormats: {
                minute: '%H:%M'
            }
        },
        yAxis: {
            title: {
                text: '',
                style: {
                    fontSize: '13px'
                }
            },
            //type: 'logarithmic',
            //minorTickInterval :  'auto' ,              
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            shared: true,
            dateTimeLabelFormats: {
                minute: "%H:%M"
            },
            valueSuffix: '',
            crosshairs: true
        },
        legend: {
            enabled: true,
            borderWidth: 1
        },
        exporting: {
            enabled: false
        },
        series: series
    });

}
function SelectAll() {
    var checkboxs = $("input[name='equproperty']");
    for (var i = 0; i < checkboxs.length; i++) {
        var e = checkboxs[i];
        e.checked = !e.checked;
    }
}
/*
用途:检验字符串是否为null
返回：为null返回为空，否则非空返回1位小数
*/
function checkNullandFixN(param, n) {
    if (param == null || param == "null") {
        return '';
    } else {
        param = param * 1;
        if (n == '1') {
            param = param.toFixed(1);
        } else
            if (n == '2') {
                param = param.toFixed(2);
            } else {
                param = param.toFixed(3);
            }
        return param;
    }
}
/**项目运营 时间解析处理**/
function dateInit(rectime) {
    var a = [];
    var b = [];
    var c = [];
    a = rectime.split(" ");
    b = a[0].split("-");
    c = a[1].split(":");
    var myDate = new Date(b[0], b[1] - 1, b[2] * 1, c[0] * 1, c[1] * 1, c[2] * 1);
    return myDate.getTime();
}

function addUnit1(name) {
    if (name.indexOf('温度') >= 0) {
        name += '(℃)';
    } else
        if (name.indexOf('气量') >= 0 || name.indexOf('气流量') >= 0) {
            name += '(Nm3/h)';
        } else
            if (name.indexOf('压力') >= 0) {
                name += '(KPa)';
            } else
                if (name.indexOf('湿度') >= 0 || name.indexOf('效率') >= 0 || name.indexOf('负荷率') >= 0 || name.indexOf('减排率') >= 0 || name.indexOf('系统能效') >= 0 || name.indexOf('节能率') >= 0) {
                    name += '(%)';
                } else
                    if (name.indexOf('水流量') >= 0 || name.indexOf('总管流量') >= 0) {
                        name += '(m3/h)';
                    } else
                        if (name.indexOf('功率') >= 0 || name.indexOf('热值') >= 0 || name.indexOf('冷量') >= 0 || name.indexOf('热量') >= 0 || name.indexOf('电量') >= 0 || name.indexOf('消耗量') >= 0) {
                            name += '(kW)';
                        } else
                            if (name.indexOf('电流') >= 0) {
                                name += '(A)';
                            } else
                                if (name.indexOf('电压') >= 0) {
                                    name += '(V)';
                                } else
                                    if (name.indexOf('频率') >= 0) {
                                        name += '(hz)';
                                    } else
                                        if (name.indexOf('耗水量') >= 0) {
                                            name += '(m3)';
                                        } else
                                            if (name.indexOf('照度') >= 0) {
                                                name += '(Lux)';
                                            }
    return name;

}
function strToJson(str) {
    var json = eval('(' + str + ')');
    return json;
}