$(document).ready(function () {
    RefreshData();
    ClickEcb();
    ClickGcb();
    ClickHcb();
    setTimeout(RefreshData, 3000);//首次加载
    setInterval(RefreshData, 60000); //60S加载
});

var elec_Coal = 0;
var gas_Coal = "";
var elec_Price = "";
var gas_Price = "";
var water_Price = "";
var elecflag = true;
var gasflag = true;
function RefreshData() {
	$.postJSON("/MonEnergy/GetEnergyData", "", function (result) {
		if (result != null) {
			//耗电
			$("#elec_z").html(result.elecvalue_day);
			$("#elec_day").html(result.elecvalue_day);
			if (result.elecvalue_day.length > 0 && result.elec_Coal.length > 0) {
				$("#elec_day_convert_coal").html(FloatFixed(Number(result.elecvalue_day) * Number(result.elec_Coal)) + "吨");
			}
			if (result.elecvalue_month.length > 0 && result.elec_Coal.length > 0) {
				$("#elec_month_convert_coal").html(FloatFixed(Number(result.elecvalue_month) * Number(result.elec_Coal)) + "吨");
			}
			if (result.elecvalue_year.length > 0 && result.elec_Coal.length > 0) {
				$("#elec_year_convert_coal").html(FloatFixed(Number(result.elecvalue_year) * Number(result.elec_Coal)) + "吨");
			}
			elec_Coal = result.elec_Coal;
			if (result.elecvalue_day.length > 0 && result.elec_Price.length > 0) {
				$("#elec_day_convert_price").html(FloatFixed(Number(result.elecvalue_day) * Number(result.elec_Price)) + "元");
			}
			if (result.elecvalue_month.length > 0 && result.elec_Coal.length > 0) {
				$("#elec_month_convert_price").html(FloatFixed(Number(result.elecvalue_month) * Number(result.elec_Price)) + "元");
			}
			if (result.elecvalue_year.length > 0 && result.elec_Coal.length > 0) {
				$("#elec_year_convert_price").html(FloatFixed(Number(result.elecvalue_year) * Number(result.elec_Price)) + "元");
			}
			elec_Price = result.elec_Price;
			$("#elec_month").html(result.elecvalue_month);
			$("#elec_year").html(result.elecvalue_year);
			Progressbar($("#elec_day_pb"), result.lmtelec_Day, result.elecvalue_day, result.warn_data, result.call_data);
			Progressbar($("#elec_month_pb"), result.lmtelec_Month, result.elecvalue_month, result.warn_data, result.call_data);
			Progressbar($("#elec_year_pb"), result.lmtelec_Year, result.elecvalue_year, result.warn_data, result.call_data);
			//耗气
			$("#gas_z").html(result.gasvalue_day);
			$("#gas_day").html(result.gasvalue_day);
			if (result.gasvalue_day.length > 0 && result.gas_Coal.length > 0) {
				$("#gas_day_convert_coal").html(FloatFixed(Number(result.gasvalue_day) * Number(result.gas_Coal)) + "吨");
			}
			if (result.gasvalue_month.length > 0 && result.gas_Coal.length > 0) {
				$("#gas_month_convert_coal").html(FloatFixed(Number(result.gasvalue_month) * Number(result.gas_Coal)) + "吨");
			}
			if (result.gasvalue_year.length > 0 && result.gas_Coal.length > 0) {
				$("#gas_year_convert_coal").html(FloatFixed(Number(result.gasvalue_year) * Number(result.gas_Coal)) + "吨");
			}
			gas_Coal = result.gas_Coal;
			if (result.gasvalue_day.length > 0 && result.gas_Price.length > 0) {
				$("#gas_day_convert_price").html(FloatFixed(Number(result.gasvalue_day) * Number(result.gas_Price)) + "元");
			}
			if (result.gasvalue_month.length > 0 && result.gas_Coal.length > 0) {
				$("#gas_month_convert_price").html(FloatFixed(Number(result.gasvalue_month) * Number(result.gas_Price)) + "元");
			}
			if (result.gasvalue_year.length > 0 && result.gas_Coal.length > 0) {
				$("#gas_year_convert_price").html(FloatFixed(Number(result.gasvalue_year) * Number(result.gas_Price)) + "元");
			}
			gas_Price = result.gas_Price;
			$("#gas_month").html(result.gasvalue_month);
			$("#gas_year").html(result.gasvalue_year);

			Progressbar($("#gas_day_pb"), result.lmtgas_Day, result.gasvalue_day, result.warn_data, result.call_data);
			Progressbar($("#gas_month_pb"), result.lmtgas_Month, result.gasvalue_month, result.warn_data, result.call_data);
			Progressbar($("#gas_year_pb"), result.lmtgas_Year, result.gasvalue_year, result.warn_data, result.call_data);
			//耗水
			$("#water_z").html(result.watervalue_day);
			$("#water_day").html(result.watervalue_day);
			if (result.watervalue_day.length > 0 && result.water_Price.length > 0) {
				$("#water_day_convert_price").html(FloatFixed(Number(result.watervalue_day) * Number(result.water_Price)) + "元");
			}
			$("#water_month").html(result.watervalueMonth);
			if (result.watervalue_month.length > 0 && result.water_Price.length > 0) {
				$("#water_month_convert_price").html(FloatFixed(Number(result.watervalue_month) * Number(result.water_Price)) + "元");
			}
			$("#water_year").html(result.watervalueYear);
			if (result.watervalue_year.length > 0 && result.water_Price.length > 0) {
				$("#water_year_convert_price").html(FloatFixed(Number(result.watervalue_year) * Number(result.water_Price)) + "元");
			}
			water_Price = result.water_Price;
			$("#water_month").html(result.watervalue_month);
			$("#water_year").html(result.watervalue_year);
			Progressbar($("#water_day_pb"), result.lmtwater_Day, result.watervalue_day, result.warn_data, result.call_data);
			Progressbar($("#water_month_pb"), result.lmtwater_Month, result.watervalue_month, result.warn_data, result.call_data);
			Progressbar($("#water_year_pb"), result.lmtwater_Year, result.watervalue_year, result.warn_data, result.call_data);
			//为下方系统能效处更新数据（泛能站基本数据不进行更新）
			$("#fdlSpan").html(result.pelec_value);
			$("#glrSpan").html(result.pcold_value);
			$("#grsSpan").html(result.photwater_value);
			$("#gzqSpan").html(result.pgaswater_value);
			$("#xtnxSpan").html(result.xtnx_value);
			$("#cswdSpan").html(result.cstem_value);
			$("#hswdSpan").html(result.hstem_value);
			$("#llSpan").html(result.ll_value);
			$("#lrfhSpan").html(result.lrfh_value);
			$("#wdSpan").html(result.wd_value);
			$("#sdSpan").html(result.sd_value);
			$("#fsSpan").html(result.fs_value);
			$("#fzdSpan").html(result.fzd_value);
			$("#yysSpan").html(result.yys_value);
			$("#gnmjSpan").html(result.gnmj_value);
			$("#glqSpan").html(result.glq_value);
			$("#grqSpan").html(result.grq_value);
		}
	});
}

//点击电-标煤
function ClickEbm() {
    $("#elec_day_price").hide();
    $("#elec_month_price").hide();
    $("#elec_year_price").hide();
    $("#elec_day_coal").show();
    $("#elec_month_coal").show();
    $("#elec_year_coal").show();
    $("#elec_bm").attr("style", "background:url('/Content/img/left-icon.png') no-repeat");
    $("#elec_cb").attr("style", "background:url('/Content/img/right-icon.png') no-repeat");
}
//点击电-成本
function ClickEcb() {
    $("#elec_day_price").show();
    $("#elec_month_price").show();
    $("#elec_year_price").show();
    $("#elec_day_coal").hide();
    $("#elec_month_coal").hide();
    $("#elec_year_coal").hide();
    $("#elec_bm").attr("style", "background:url('/Content/img/left-icon-click.png') no-repeat");
    $("#elec_cb").attr("style", "background:url('/Content/img/right-icon-click.png') no-repeat");
}
//点击气-标煤
function ClickGbm() {
    $("#gas_day_price").hide();
    $("#gas_month_price").hide();
    $("#gas_year_price").hide();
    $("#gas_day_coal").show();
    $("#gas_month_coal").show();
    $("#gas_year_coal").show();
    $("#gas_bm").attr("style", "background:url('/Content/img/left-icon.png') no-repeat");
    $("#gas_cb").attr("style", "background:url('/Content/img/right-icon.png') no-repeat");
}
//点击气-成本
function ClickGcb() {
    $("#gas_day_price").show();
    $("#gas_month_price").show();
    $("#gas_year_price").show();
    $("#gas_day_coal").hide();
    $("#gas_month_coal").hide();
    $("#gas_year_coal").hide();
    $("#gas_bm").attr("style", "background:url('/Content/img/left-icon-click.png') no-repeat");
    $("#gas_cb").attr("style", "background:url('/Content/img/right-icon-click.png') no-repeat");
}
//点击re-标煤
function ClickHbm() {
    //$("#gas_day_price").hide();
    //$("#gas_month_price").hide();
    //$("#gas_year_price").hide();
    //$("#gas_day_coal").show();
    //$("#gas_month_coal").show();
    //$("#gas_year_coal").show();
    $("#hot_bm").attr("style", "background:url('/Content/img/left-icon.png') no-repeat");
    $("#hot_cb").attr("style", "background:url('/Content/img/right-icon.png') no-repeat");
}
//点击热-成本
function ClickHcb() {
    //$("#gas_day_price").show();
    //$("#gas_month_price").show();
    //$("#gas_year_price").show();
    //$("#gas_day_coal").hide();
    //$("#gas_month_coal").hide();
    //$("#gas_year_coal").hide();
    $("#hot_bm").attr("style", "background:url('/Content/img/left-icon-click.png') no-repeat");
    $("#hot_cb").attr("style", "background:url('/Content/img/right-icon-click.png') no-repeat");
}
//进度条加载
function Progressbar(div, lmvalue, rlvalue, yjval, bjval) {
    div.removeAttr("style");
    var relust = Number(rlvalue) / Number(lmvalue)*100;
    if (relust >= 0 && relust < Number(yjval)) {
        div.attr("style", "background:url('/Content/img/dynamic-img2.png') no-repeat; min-width: " + (relust/100) * 260 + "px;");
    }
    if (relust >= Number(yjval) && relust < Number(bjval)) {
        div.attr("style", "background:url('/Content/img/dynamic-img1.png') no-repeat; min-width: " + (relust / 100) * 260 + "px;");
    }
    if (relust >= Number(bjval)) {
        if (relust > 0.98) { relust = 98 }
        div.attr("style", "background:url('/Content/img/dynamic-img.png') no-repeat; min-width: " + (relust / 100) * 260 + "px;");
    }
}

