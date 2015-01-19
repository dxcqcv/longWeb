/**
 * @author ada
 */
$(document).ready(function(){

    var newTempMC,
        newTempDZ,
        oldTempMC,
        oldTempDZ;

// alert("ss");
//导航栏菜单切换功能
$(".menu").click(function() {

	if ($(".menu").hasClass("clmenu")) {
		$(".menu").removeClass("clmenu");
		$(this).addClass("clmenu");
	} else {
		$(this).addClass("clmenu");
	}

	if ($(".drop_down").hasClass("cldrop_down")) {
		$(".drop_down").removeClass("cldrop_down");
		$(this).siblings(".drop_down").addClass("cldrop_down");
	} else {
		$(this).siblings(".drop_down").addClass("cldrop_down");
	}

});
//串口菜单切换功能
//状态信息
$(".info_text").click(function() {

	if ($(".info_text").hasClass("clinfotext")) {
		$(".info_text").removeClass("clinfotext");
		$(this).addClass("clinfotext");
	} else {
		$(this).addClass("clinfotext");
	}

	if ($(".content_right").hasClass("bloserial")) {
		$(".content_right").removeClass("bloserial");
		$(this).siblings(".content_right").addClass("bloserial");
	} else {
		$(this).siblings(".content_right").addClass("bloserial");
	}
});

//端口配置
//tab切换
$(".twserial_info").click(function() {
  
	if ($(".twserial_info").hasClass("twclinfotext")) {
		$(".twserial_info").removeClass("twclinfotext");
		$(this).addClass("twclinfotext");
	} else {
		$(this).addClass("twclinfotext");
	}

	if ($(".content_right").hasClass("twbloserial")) {
		$(".content_right").removeClass("twbloserial");
		$(this).siblings(".content_right").addClass("twbloserial");
	} else {
		$(this).siblings(".content_right").addClass("twbloserial");
	}
});
//项目栏dhcp的打开，关闭功能。
$("#dhcpsele").change(function(){
	
	var $curdivcont = $("#dhcpsele_tbody tr td");
	//alert($(this).children('option:selected').val());
	if($(this).children('option:selected').val() == "1"){
	
		
		$curdivcont.find("div").removeClass('dhcpsele_editor').attr("contenteditable","false");
		
	}else{
		
		$curdivcont.find("div").addClass('dhcpsele_editor').attr("contenteditable","true");
	
	}
});



//下端仪表配置
//tab切换
$(".thserial_info").click(function() {

	if ($(".thserial_info").hasClass("thclinfotext")) {
		$(".thserial_info").removeClass("thclinfotext");
		$(this).addClass("thclinfotext");
	} else {
		$(this).addClass("thclinfotext");
	}

	if ($(".content_right").hasClass("thbloserial")) {
		$(".content_right").removeClass("thbloserial");
		$(this).siblings(".content_right").addClass("thbloserial");
	} else {
		$(this).siblings(".content_right").addClass("thbloserial");
	}
});
//增加功能
$(document).on('click','.addequt', sbmcdzAdd);
function xdybpzButton() {
    var $this = $(this);
    sbmcdzAdd($this.attr("val"));    
}
function sbmcdzAdd() {
    var $this = $(this);
    var wrap = $this.parents('div.equt_left');
    var xdybpzsbmcV = wrap.find('input.xdybpzsbmcV').val(); 	
    var xdybpzsbdzV = wrap.find('input.xdybpzsbdzV').val(); 
    var str = '';
    var cha = $this.attr("val"); 

    if(!(voidCheck(xdybpzsbmcV) && voidCheck(xdybpzsbdzV))) {
        alert('设备名称和设备地址不能为空'); 
    } else if(!checkRanges(xdybpzsbdzV)) {
        alert('设备地址必须为1-255'); 
    } else {

        $.ajax({
                type: "POST",
                url: "../../../cgi-bin/slave.cgi",
                //url: "test.json",
                dataType: "json",
                data: {
                    cmd: 33,
                    channel: cha, 
                    type: 1,
                    oldslaveaddr: xdybpzsbdzV, 
                    slaveaddr: xdybpzsbdzV,
                    slavename: xdybpzsbmcV
                }     
        })
        .done(function(){
             str = xdybpzGet(xdybpzsbmcV, xdybpzsbdzV);
             $this.parent('div').siblings("div.equt_lefthead").append(str);
             $this.parents('div.equt_left').find('div.equt_menufo').removeClass("cleqmenfo").find(".equt_right").removeClass("clequt");
        });
    }
}
// 删除下端仪表配置列表项目
$(document).delegate('.xdybpzListDel','click', function(){
    var $this = $(this);
    var xdybpzsbmcV = $this.siblings('span.equt_menufotext').find('span.xdybpzmc').text(); 	
    var xdybpzsbdzV = $this.siblings('span.equt_menufotext').find('span.xdybpzdz').text(); 
    var cha = $this.parents('div.content_right').siblings('div.thserial_info').attr("val"); 
        $.ajax({
                type: "POST",
                url: "../../../cgi-bin/slave.cgi",
                //url: "test.json",
                dataType: "json",
                data: {
                    cmd: 33,
                    channel: cha, 
                    type: 2,
                    oldslaveaddr: xdybpzsbdzV, 
                    slaveaddr: xdybpzsbdzV,
                    slavename: xdybpzsbmcV
                }     
        })
        .done(function(){
            $this.parents('div.equt_menufo').remove();
        });
});
//表格编辑功能
$(document).delegate(".instr_edit",'click',function() {

	$(this).parents("tr").find('div').attr("contenteditable", "true");
	$(this).parents("tr").find('div').addClass("equt_td");
});
$(document).delegate(".instr_save",'click',function() {
	$(this).parents("tr").find('div').attr("contenteditable", "false");
	$(this).parents("tr").find('div').removeClass("equt_td");
});
//下端仪表配置设备表格菜单
$(document).delegate(".equt_menufo",'click',menufo); 
function menufo(){
        var $this = $(this);
		$this.siblings("div.equt_menufo").removeClass("cleqmenfo").end().addClass('cleqmenfo');
		$this.siblings("div.equt_menufo").find(".equt_right").removeClass("clequt").end().end().find(".equt_right").addClass("clequt");
}
// 修改设备
$(document).delegate(".modify_equ",'click',function(){
    var $this = $(this);
    var wrap = $this.parent('div.curequi');
    var tempMC = wrap.find('div.xdybpzsbmc').text();  
    var tempDZ = wrap.find('div.xbybpzsbdz').text();
    var cha = $this.parents('div.content_right').siblings('div.thserial_info').attr('val'); 
	 if($this.hasClass('modify')){
         oldTempMC = tempMC;
         oldTempDZ = tempDZ;
	 	 $this.removeClass('modify').siblings('.sibtext').find('div').addClass('sty').attr("contenteditable","true");
	 	 $this.find('span').html('保存设备');
	 }
	 else {
        newTempMC = tempMC || '';
        newTempDZ = tempDZ || '';
        if(!checkRanges(newTempDZ)){
            alert('设备地址必须为1-255'); 
        } else {
                $.ajax({
                type: "POST",
                url: "../../../cgi-bin/slave.cgi",
                //url: "test.json",
                dataType: "json",
                data: {
                    cmd: 33,
                    channel: cha,
                    type: 3,
                    oldslaveaddr: oldTempDZ,
                    slaveaddr: newTempDZ,
                    slavename: tempMC
                }     
        })
        .done(function(){
             $this.parents('div.equt_right').siblings('div.xdybpzItem').find('span.xdybpzdz').text(newTempDZ);
             $this.addClass('modify').siblings('.sibtext').find('div').removeClass('sty').attr("contenteditable","false");
             $this.find('span').html('修改设备');
        });
        }
	 }
        //console.log('old mc ' +oldTempMC+ ' old dz ' +oldTempDZ+ ' new mc ' +newTempMC+ ' new dz ' +newTempDZ);
});

//数据集中配置表格移动功能
//上移

$(".uptd").each(function() {

	$(this).click(function() {
		var $tr = $(this).parent().parent();
		// console.log($tr);
		var index = $tr.index();
		var $curtdtext = $tr.find("td:first").html();
		var $pertdtext = $tr.prev().find("td:first").html();
		$tr.find("td:first").html($pertdtext);
		$tr.prev().find("td:first").html($curtdtext);
		// console.log($pertdtext);
		if (index != 0) {
			var $b_tr = $tr.parent().find('tr:eq(' + (index - 1) + ')');
			$tr.insertBefore($b_tr);

		}
	});
});

//下移
// var trLength = $(".downtd").length;
$(".downtd").each(function() {
	$(this).click(function() {
		var $tr = $(this).parent().parent();
		// console.log($tr);
		var index = $tr.index();
		var $curtdtext = $tr.find("td:first").html();
		var $pertdtext = $tr.next().find("td:first").html();
		$tr.find("td:first").html($pertdtext);
		$tr.next().find("td:first").html($curtdtext);
		// console.log($pertdtext);

		var length = $tr.parent().find('tr').length;

		if (index != length) {
			var $b_tr = $tr.parent().find('tr:eq(' + (index + 1) + ')');
			$tr.insertAfter($b_tr);
		}
	});
});


//系统配置设备表格菜单
$(".fivserial_info").click(function() {

	if ($(".fivserial_info").hasClass("fivclinfotext")) {
		$(".fivserial_info").removeClass("fivclinfotext");
		$(this).addClass("fivclinfotext");
	} else {
		$(this).addClass("fivclinfotext");
	}

	if ($(".content_right").hasClass("fivbloserial")) {
		$(".content_right").removeClass("fivbloserial");
		$(this).siblings(".content_right").addClass("fivbloserial");
	} else {
		$(this).siblings(".content_right").addClass("fivbloserial");
	}
});
//出厂设置
$("#rfaset").bind('click',function(){
	var restore = confirm("确认要恢复到出厂设置吗？");
	
	if(restore){
		alert("已恢复出厂设置");
	}else{
		alert("已取消");
	}
});

//弹出层
$(document).delegate(".dataadd",'click',function(){
    var $this = $(this);
	$this.siblings("div.maskbg").css("display", "block");
	$this.siblings("div.pop-up").css("display", "block");
});

$(document).delegate(".cancelpop-up",'click',function(){
    var $this = $(this);
	$this.parents("div.pop-up").css("display", "none");
	$this.parents().siblings("div.maskbg").css("display", "none");
});

$(document).delegate('.xdybpzpop-upSave','click', function(){
    var str = "";
    var $this = $(this); 
    var cha = $this.parents('div.content_right').siblings('div.thserial_info').attr("val"); 
    var sbdz = $this.parents('div.equt_right').siblings('div.xdybpzItem').find('span.xdybpzdz').text();
    var wrap = $this.parents('div.popupButBox').siblings('div.pop-upinfo');
    var gnm = wrap.find('select.gnmPopSel option:selected').text();
    var jcqAdd = wrap.find('input.jcqAddr').val();
    var jcqLength = wrap.find('input.jcqLength').val();
    var jzxV = wrap.find('input.jzxV').val();
    var jcqName = wrap.find('input.jcqName').val();
    var jcqDes = wrap.find('input.jcqDes').val();
    var kxsV = wrap.find('input.kxsV').val();
    var dxsV = wrap.find('input.dxsV').val();
    
    if( !(voidCheck(gnm) && voidCheck(jcqAdd) && voidCheck(jcqLength) && voidCheck(jzxV) && voidCheck(jcqName) && voidCheck(jcqDes) && voidCheck(kxsV) && voidCheck(dxsV)) ){
        alert('每栏必填'); 
    } else if(!checkRanges(jcqAdd)) {
        alert('寄存器地址必须1到255'); 
    } else if(!(numberCheck(jzxV) && numberCheck(kxsV) && numberCheck(dxsV))) {
        alert('字节序、K系数、D系数必须为数字'); 
    } else if(!(jcqLength <= 4)) {
        alert('寄存器长度必须小于等于4'); 
    } else {
        $.ajax({
                type: "POST",
                url: "../../../cgi-bin/slave.cgi",
                //url: "test.json",
                dataType: "json",
                data: {
                    cmd: 37,
                    channel: cha, 
                    slaveaddr: sbdz,
                    funcode: gnm,
                    type: 1,
                    oldregaddr: jcqAdd, 
                    regaddr: jcqAdd,
                    regnum: jcqLength,
                    dataformat: jzxV,
                    regname: jcqName,
                    regdes: jcqDes,
                    K: kxsV,
                    D: dxsV
                }     
        })
        .done(function(){
            str = '<tr>' 
            + '<td>' + gnm + '</td>'
            + '<td>' + jcqAdd + '</td>'
            + '<td>' + jcqLength + '</td>'
            + '<td>' + jzxV + '</td>'
            + '<td>' + jcqName + '</td>'
            + '<td>' + jcqDes + '</td>'
            + '<td>' + kxsV + '</td>'
            + '<td>' + dxsV + '</td>'
            + '<td><span class="open xdybpzEdit xdybpzDef">编辑</span><span class="open xdybpzDel xdybpzDef">删除</span><span class="open xdybpzSave hide">保存</span></td>'
            + '</tr>';
            $this.parents("div.pop-up").css("display", "none");
            $this.parents().siblings("div.maskbg").css("display", "none");

            $this.parents('div.newpaging').siblings('table.xdybpzTable').append(str);
        });
    }
});
$(document).on('click','.gnmPopSel', function(){
    $('.gnmPopSel option:selected').each(function(){
        var $this = $(this); 
        var input = $this.parents('div.pop-upinfo').find('input.jcqLength');
        if($this.val() == 1 || $this.val() == 2 || $this.val() == 5) {
            input.val(1).attr('readonly','readonly');
        } else {
            input.removeAttr('readonly'); 
        } 
    });
});

});

function xdybpzGet(sbmc, sbdz) {
    
    var str = '<div class="equt_menufo cleqmenfo fiequtmenu clearfix">'
            + '<div class="xdybpzItem">'
		    + '<span class="equt_menufotext">' + '<span class="xdybpzdz">' + sbdz + '</span>' + '-' + '<span class="xdybpzmc">' + sbmc + '</span>' +'</span>'                
            + '<span class="xdybpzListDel">删除</span>'
            + '</div>'
			+ '<div class="equt_right clequt">'
		    + '<div class="curequi">'
		    + '<div class="curequifi sibtext">'
			+ '<label><span> </span>设备名称 : </label>'
			+ '<div class="sibtextst xdybpzsbmc">' + sbmc + '</div>'
			+ '</div>'
			+ '<div class="sibtext">'
			+ '<label><span> </span>设备地址 : </label>'
			+ '<div class="sibtextst xbybpzsbdz">'+ sbdz +'</div>'
			+ '</div>'
			+ '<div class="modify_equ modify">'
			+ '<span>修改设备</span>'
			+ '</div>'
			+ '</div>'
			+ '<table  class="equts_table newinstr xdybpzTable">'
			+ '<thead>'
			+ '<tr>'
			+ '<th class="instrfith">'
			+ '<span>功能码</span>'
		    + '<select class="xdybpzSel">'
			+ '<option selected="selected">全部</option>'
			+ '<option>1</option>'
			+ '<option>2</option>'
			+ '<option>3</option>'
		    + '<option>4</option>'
		    + '<option>5</option>'
			+ '<option>16</option>'
			+ '</select>'
			+ '</th>'
            + '<th>寄存器地址</th>'
            + '<th>寄存器长度</th>'
            + '<th>字节序</th>'
            + '<th>寄存器名</th>'
            + '<th>寄存器描述</th>'
            + '<th>K系数</th>'
            + '<th>D系数</th>'
            + '<th>备注</th>'
            + '</tr>'
            + '</thead>'
            + '<tbody>'
            + '</tbody>'
            + '</table>'
            + '<div class="newpaging">'
            + '<div class="newaddconfig">'
            + '<div class="dataadd" ><span>数据新增项</span></div>'
            + '<div class="saveconfig" ><span>保存配置</span></div>'
            + '<div  class="maskbg"> </div>'
            + '<div  class="pop-up">'
            + '<div class="pop-upinfo">' 
            + '<p>'
            + '<label><span>功能码 : </span></label>'
            + '<select class="gnmPopSel">'
            + '<option>1</option>'
            + '<option>2</option>'
            + '<option>3</option>'
            + '<option>4</option>'
            + '<option>5</option>'
            + '<option>16</option>'
            + '</select>'
            + '</p>'
            + '<p>'
            + '<label><span>寄存器地址  : </span></label>'
            + '<input class="jcqAddr" type="text"/>'
            + '</p>'
            + '<p>'
            + '<label><span>寄存器长度  : </span></label>'
            + '<input class="jcqLength" type="text" value="1" readonly="readonly"/>'
            + '</p>'
            + '<p>'
            + '<label><span>字节序  : </span></label>'
            + '<input class="jzxV" type="text"/>'
            + '</p>'
            + '<p>'
            + '<label><span>寄存器名  : </span></label>'
            + '<input class="jcqName" type="text"/>'
            + '</p>'
            + '<p>'
            + '<label><span>寄存器描述  : </span></label>'
            + '<input class="jcqDes" type="text"/>'
            + '</p>'
            + '<p>'
            + '<label><span>K系数  : </span></label>'
            + '<input class="kxsV" type="text"/>'
            + '</p>'
            + '<p>'
            + '<label><span>D系数  : </span></label>'
            + '<input class="dxsV" type="text"/>'
            + '</p>'
            + '</div>'					
            + '<div class="popupButBox">'
            + '<a class="saveform xdybpzpop-upSave">'
            + '<span>保存</span>'
            + '</a>'
            + '<a  class="cancelform cancelpop-up">'
            + '<span>取消</span>'
            + '</a>'
            + '</div>'
            + '</div>'
            + '</div>'
            + '</div>'
            + '</div>'
            + '</div>';
    return str;
}
