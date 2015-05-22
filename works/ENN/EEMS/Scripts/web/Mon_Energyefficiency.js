
$(document).ready(
    function () {
        autoHeight('.arrangement ul li', '.div-head', '.xtnxjcChart');

    }
);


    //曲线图数据
var ES1_CHWh_Qe = new Array(), ES1_Pout_Pe = new Array(), ES1_CHWc_Qe = new Array(), ES1_ENV_Tp = new Array(), ES1_ENV_Hd = new Array(), ES1_ENV_Irr = new Array(), ES1_Pin_Pe = new Array(), ES1_NG_Fv = new Array(), ES1_FW_Fv = new Array();
//饼状图数据
var ES1_CHWh_Qe_c = [], ES1_Pout_Pe_c = [], ES1_CHWc_Qe_c = [], ES1_Pin_Pe_c = [], ES1_NG_Fv_c = [], ES1_FW_Fv_c = [];
$(function () {
    initDataHH();
    initDataMM();
    Chart1('container1');
    Chart2('container2');
    Chart3('container3');   
});
function ShowModDiv(flag) {
    $("#modtitle").empty();
    switch(flag)
    {
        case "container1":
            $("#modtitle").append("<h2>当日耗能</h2>");
            Chart1('moddiv');
            break;
        case "container2":
            $("#modtitle").append("<h2>当日供能</h2>");
            Chart2('moddiv');
            break;       
        case "container3":
            $("#modtitle").append("<h2>实时气象</h2>");
            Chart4('moddiv');
            break;       
    }
}
function initDataHH() {
    // ES1_CHWh_Qe 产热量 ES1_Pout_Pe 产电量 ES1_CHWc_Qe 产冷量   STout_Fv 蒸汽产量 LHWout_Fv 热水产量
    // ES1_ENV_Tp温度 ES1_ENV_Hd  湿度 ES1_ENV_Irr 福照度  
    // ES1_Pin_Pe耗电量  ES1_NG_Fv 耗气量 ES1_FW_Fv 耗水量
    var myDate = new Date();
    var starttime = CurentTime() + " 00:00:01";
    var endtime = CurentTime() + " 23:59:59";
    var codes = "ES1_CHWh_Qe,ES1_Pout_Pe,ES1_CHWc_Qe,ES1_ENV_Tp,ES1_ENV_Hd,ES1_ENV_Irr,ES1_Pin_Pe,ES1_NG_Fv,ES1_FW_Fv";
    //var ES1_CHWh_Qe = [], ES1_Pout_Pe = [], ES1_CHWc_Qe = [], ES1_ENV_Tp = [], ES1_ENV_Hd = [], ES1_ENV_Irr = [], ES1_Pin_Pe = [], ES1_NG_Fv = [], ES1_FW_Fv = [];
    $.ajax({
        type: "POST",//这里是http类型
        url: "/MonEnergy/GetEnergyeDataHH",//大家都应该很清楚了
        async: false,
        data: { starttime: starttime, endtime: endtime, timetype: "HH", codes: codes },//回传一个参数
        dataType: "json",//传回来的数据类型
        success: function (responseJSON) {
            var chartData = strToJson(responseJSON);
            $.each(chartData, function (n, value) {
                var timeh =Number(eval("value.colltime").split(' ')[1]);
                ES1_CHWh_Qe.push([timeh, Number(eval("value." + "es1_chwh_qe"))]);
                ES1_Pout_Pe.push([timeh, Number(eval("value." + "es1_pout_pe"))]);
                ES1_CHWc_Qe.push([timeh, Number(eval("value." + "es1_chwc_qe"))]);
                ES1_ENV_Tp.push([timeh, Number(eval("value." + "es1_env_tp"))]);
                ES1_ENV_Hd.push([timeh, Number(eval("value." + "es1_env_hd"))]);
                ES1_ENV_Irr.push([timeh, Number(eval("value." + "es1_env_irr"))]);
                ES1_Pin_Pe.push([timeh, Number(eval("value." + "es1_pin_pe"))]);
                ES1_NG_Fv.push([timeh, Number(eval("value." + "es1_ng_fv"))]);
                ES1_FW_Fv.push([timeh, Number(eval("value." + "es1_fw_fv"))]);
            });
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            UEEPAlert(XMLHttpRequest.responseText);
        }
    });
}
function initDataMM() {
    // ES1_CHWh_Qe 产热量 ES1_Pout_Pe 产电量 ES1_CHWc_Qe 产冷量  
    // ES1_ENV_Tp温度 ES1_ENV_Hd  湿度 ES1_ENV_Irr 福照度  
    // ES1_Pin_Pe耗电量  ES1_NG_Fv 耗气量 ES1_FW_Fv 耗水量
    var now = new Date();
    var year = now.getFullYear();       //年
    var month = now.getMonth() + 1;     //月
    var nowtime = year + "-" + month;
    var codes = "ES1_CHWh_Qe,ES1_Pout_Pe,ES1_CHWc_Qe,ES1_Pin_Pe,ES1_NG_Fv,ES1_FW_Fv";
    //var ES1_CHWh_Qe = [], ES1_Pout_Pe = [], ES1_CHWc_Qe = [], ES1_ENV_Tp = [], ES1_ENV_Hd = [], ES1_ENV_Irr = [], ES1_Pin_Pe = [], ES1_NG_Fv = [], ES1_FW_Fv = [];
    $.ajax({
        type: "POST",//这里是http类型
        url: "/MonEnergy/GetEnergyeDataMM",//大家都应该很清楚了
        async: false,
        data: { nowtime: nowtime, timetype: "MM", codes: codes },//回传一个参数
        dataType: "json",//传回来的数据类型
        success: function (responseJSON) {
            var old = strToJson(responseJSON.olddata);
            var now = strToJson(responseJSON.nowdata);
            if (old.length == 0) {
                ES1_CHWh_Qe_c.push(0);
                ES1_Pout_Pe_c.push(0);
                ES1_CHWc_Qe_c.push(0);
                ES1_Pin_Pe_c.push(0);
                ES1_NG_Fv_c.push(0);
                ES1_FW_Fv_c.push(0);
            } else {
                $.each(old, function (n, value) {
                    ES1_CHWh_Qe_c.push(Number(eval("value." + "es1_chwh_qe")));
                    ES1_Pout_Pe_c.push(Number(eval("value." + "es1_pout_pe")));
                    ES1_CHWc_Qe_c.push(Number(eval("value." + "es1_chwc_qe")));
                    ES1_Pin_Pe_c.push(Number(eval("value." + "es1_pin_pe")));
                    ES1_NG_Fv_c.push(Number(eval("value." + "es1_ng_fv")));
                    ES1_FW_Fv_c.push(Number(eval("value." + "es1_fw_fv")));
                });
            }
            if (now.length == 0) {
                ES1_CHWh_Qe_c.push(0);
                ES1_Pout_Pe_c.push(0);
                ES1_CHWc_Qe_c.push(0);
                ES1_Pin_Pe_c.push(0);
                ES1_NG_Fv_c.push(0);
                ES1_FW_Fv_c.push(0);
            } else {
                $.each(now, function (n, value) {
                    ES1_CHWh_Qe_c.push(Number(eval("value." + "es1_chwh_qe")));
                    ES1_Pout_Pe_c.push(Number(eval("value." + "es1_pout_pe")));
                    ES1_CHWc_Qe_c.push(Number(eval("value." + "es1_chwc_qe")));
                    ES1_Pin_Pe_c.push(Number(eval("value." + "es1_pin_pe")));
                    ES1_NG_Fv_c.push(Number(eval("value." + "es1_ng_fv")));
                    ES1_FW_Fv_c.push(Number(eval("value." + "es1_fw_fv")));
                });
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            UEEPAlert(XMLHttpRequest.responseText);
        }
    });
}
function strToJson(str) {
    var json = eval('(' + str + ')');
    return json;
}
function Chart1(div) {
   // ES1_Pin_Pe耗电量  ES1_NG_Fv 耗气量 ES1_FW_Fv 耗水量
    var series = new Array();
    var yAxis = new Array();
    var catego = new Array();
    var tpSeriesItem =
        {
            name: '水（T）',
            type: 'spline',
            color: '#89A54E',
            yAxis: 0,
            data: ES1_FW_Fv,
            marker: {
                radius: 3,
                enabled: true,
                symbol: 'circle'
            },
            dashStyle: 'solid',
            tooltip: {
                valueSuffix: ''
            }
        };

    var tpYAxis = {
        labels:
        {
            formatter: function () {
                return this.value + '';
            },
            style: {
                color: '#89A54E'
            }
        },
        title:
        {
            text: '水',
            style: {
                color: '#89A54E'
            }
        },
        opposite: false
    };
    yAxis.push(tpYAxis);
    series.push(tpSeriesItem);

    var hdSeriesItem =
        {
            name: '电（kWh）',
            type: 'spline',
            color: '#AA4643',
            yAxis: 1,
            data: ES1_Pin_Pe,
            marker: {
                radius: 3,
                enabled: true,
                symbol: 'circle'
            },
            dashStyle: 'solid',
            tooltip: {
                valueSuffix: ''
            }
        };

    var hdYAis =
        {
            //gridLineWidth: 1,
            title:
                {
                    text: '电',
                    style: {
                        color: '#AA4643'
                    }
                },
            labels:
           {
               formatter: function () {
                   return this.value + '';
               },
               style:
                   {
                       color: '#AA4643'
                   }
           },
            opposite: true
        };
    yAxis.push(hdYAis);
    series.push(hdSeriesItem);

    var fzdSeriesItem =
        {
            name: '气（m3）',
            type: 'spline',
            color: 'blue',
            yAxis: 2,
            data: ES1_NG_Fv,
            marker: {
                radius: 3,
                enabled: true,
                symbol: 'circle'
            },
            dashStyle: 'solid',
            tooltip: {
                valueSuffix: ''
            }
        };

    var fzdYAxis =
        {
            //gridLineWidth: 1,
            title: {
                text: '气',
                style: {
                    color: 'blue'
                }
            },
            labels: {
                formatter: function () {
                    return this.value + '';
                },
                style: {
                    color: 'blue'
                }
            },
            opposite: true
        };
    yAxis.push(fzdYAxis);
    series.push(fzdSeriesItem);

    linechartInit('spline', $('#' + div + ''), "当日耗能", series, yAxis, catego);
};

function Chart2(div) {
   // ES1_CHWh_Qe 产热量 ES1_Pout_Pe 产电量 ES1_CHWc_Qe 产冷量  
    var series = new Array();
    var yAxis = new Array();
    var catego = new Array();
    var tpSeriesItem =
        {
            name: '电（kWh）',
            type: 'spline',
            color: '#89A54E',
            yAxis: 0,
            data: ES1_Pout_Pe,
            marker: {
                radius: 3,
                enabled: true,
                symbol: 'circle'
            },
            dashStyle: 'solid',
            tooltip: {
                valueSuffix: ''
            }
        };

    var tpYAxis = {
        labels:
        {
            formatter: function () {
                return this.value + '';
            },
            style: {
                color: '#89A54E'
            }
        },
        title:
        {
            text: '电',
            style: {
                color: '#89A54E'
            }
        },
        opposite: false
    };
    yAxis.push(tpYAxis);
    series.push(tpSeriesItem);

    var hdSeriesItem =
        {
            name: '冷（kWh）',
            type: 'spline',
            color: '#AA4643',
            yAxis: 1,
            data: ES1_CHWc_Qe,
            marker: {
                radius: 3,
                enabled: true,
                symbol: 'circle'
            },
            dashStyle: 'solid',
            tooltip: {
                valueSuffix: ''
            }
        };

    var hdYAis =
        {
            //gridLineWidth: 1,
            title:
                {
                    text: '冷',
                    style: {
                        color: '#AA4643'
                    }
                },
            labels:
           {
               formatter: function () {
                   return this.value + '';
               },
               style:
                   {
                       color: '#AA4643'
                   }
           },
            opposite: true
        };
    yAxis.push(hdYAis);
    series.push(hdSeriesItem);

    var fzdSeriesItem =
        {
            name: '热（kWh）',
            type: 'spline',
            color: 'blue',
            yAxis: 2,
            data: ES1_CHWh_Qe,
            marker: {
                radius: 3,
                enabled: true,
                symbol: 'circle'
            },
            dashStyle: 'solid',
            tooltip: {
                valueSuffix: ''
            }
        };

    var fzdYAxis =
        {
            //gridLineWidth: 1,
            title: {
                text: '热',
                style: {
                    color: 'blue'
                }
            },
            labels: {
                formatter: function () {
                    return this.value + '';
                },
                style: {
                    color: 'blue'
                }
            },
            opposite: true
        };
    yAxis.push(fzdYAxis);
    series.push(fzdSeriesItem);

    linechartInit('spline', $('#' + div + ''), "当日供能", series, yAxis, catego);
};

function Chart3(div) {
    // ES1_Pin_Pe耗电量  ES1_NG_Fv 耗气量 ES1_FW_Fv 耗水量
    var series = new Array();
    var yAxis = new Array();
    var catego = new Array();
    var tpSeriesItem =
        {
            name: '室外温度',
            type: 'spline',
            color: '#89A54E',
            yAxis: 0,
            data: ES1_ENV_Tp,
            marker: {
                radius: 3,
                enabled: true,
                symbol: 'circle'
            },
            dashStyle: 'solid',
            tooltip: {
                valueSuffix: ''
            }
        };

    var tpYAxis = {
        labels:
        {
            formatter: function () {
                return this.value + '';
            },
            style: {
                color: '#89A54E'
            }
        },
        title:
        {
            text: '室外温度',
            style: {
                color: '#89A54E'
            }
        },
        opposite: false
    };
    yAxis.push(tpYAxis);
    series.push(tpSeriesItem);

    var hdSeriesItem =
        {
            name: '室外湿度',
            type: 'spline',
            color: '#AA4643',
            yAxis: 1,
            data: ES1_ENV_Hd,
            marker: {
                radius: 3,
                enabled: true,
                symbol: 'circle'
            },
            dashStyle: 'solid',
            tooltip: {
                valueSuffix: ''
            }
        };

    var hdYAis =
        {
            //gridLineWidth: 1,
            title:
                {
                    text: '室外湿度',
                    style: {
                        color: '#AA4643'
                    }
                },
            labels:
           {
               formatter: function () {
                   return this.value + '';
               },
               style:
                   {
                       color: '#AA4643'
                   }
           },
            opposite: true
        };
    yAxis.push(hdYAis);
    series.push(hdSeriesItem);    

    linechartInit('spline', $('#' + div + ''), "实时气象", series, yAxis, catego);
};

//若要显示:当前日期加时间(如:2009-06-12 12:00)

function CurentTime()
{ 
    var now = new Date();
       
    var year = now.getFullYear();       //年
    var month = now.getMonth() + 1;     //月
    var day = now.getDate();            //日
       
    var hh = now.getHours();            //时
    var mm = now.getMinutes();          //分
       
    var clock = year + "-";
       
    if(month < 10)
        clock += "0";
       
    clock += month + "-";
       
    if(day < 10)
        clock += "0";
           
    clock += day + " ";
       
    //if(hh < 10)
    // clock += "0";
           
    // clock += hh + ":";
    // if (mm < 10) clock += '0'; 
    // clock += mm; 
    return(clock); 
} 
function linechartInit(type, div, title, series, yAxis, catego) {
    div.highcharts({
        chart: {
            type: type
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            tickInterval: 2
        },
        yAxis: yAxis,
        tooltip: {
            crosshairs: true,
            shared: true
        },
        series: series
    });
}