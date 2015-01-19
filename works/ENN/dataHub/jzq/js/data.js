/**
 * @author ada
 */

$(document).ready(function() {
var oldTableRegaddr = "";
    /*
    $.ajax({
        type: "POST",
        url: "test.json",
        dataType: "json"
    })
    .done(function(data){
        alert(data.status);
    });
    */

    $(document).on('click','#xdybpz',{channel: 1},sblbGet);
    $(document).on('click', '.xdybpzItem',{channel: 1}, gnmTable);
    function sblbGet(event) {
        var $this = $(this);
        $.ajax({
            type: "POST",
            url: "../../../cgi-bin/slave.cgi",
            //url: "test.json",
            dataType: "json",
            data: {
                cmd: 31,
                channel: event.data.channel
            }     
        })
        .done(function(data){
           var data = data; 
           var i = 0;
           var l;
           var str = '';
               //alert($this.find("div.equt_lefthead").html());
           if(data.status == 0 ) {

               $.each(data.slave, function(index, value) {
                    str += xdybpzGet(value[1], value[0]);
               });
                $this.parent('li').find("div.zeserial div.equt_lefthead").empty().append(str);
                $('.equt_menufo').removeClass("cleqmenfo").find(".equt_right").removeClass("clequt");
           }
        })
        .fail(function(){
            alert('列表失败');
        }); 
    }
    //gnmTable(1);
    function gnmTable(event) {
        var $this = $(this);
        var dz = parseInt($this.find('span.xdybpzdz').text());
        $.ajax({
            type: "POST",
            url: "../../../cgi-bin/slave.cgi",
            //url: "test.json",
            dataType: "json",
            data: {
                cmd: 35,
                channel: event.data.channel,
				slaveaddr: dz 
            }     
        })
        .done(function(data){
            var data = data;
            var str = '';
            //alert(JSON.stringify(data.funcode[0]['3'][0]));
            var gnmNum = [1,2,'3',4,5,16];
            $.each(data.funcode, function(index, value){
                  //alert(JSON.stringify(value[gnmNum[2]][0][0]));
                  // 4 alert(value['3'].length);
                  //alert(value[gnmNum[2]][0][0]);
                  //alert(value['\''+gnmNum[2]+'\'');
                  //alert(value[gnmNum[2]].length);
                  $.each(value, function(k,v){
                      switch(k) {
                            case '1':
                                $.each(v, function(key, val){
                                    str += gnmtTr(1,val[0],val[1],val[2],val[3],val[4],val[5],val[6]);        
                                });
                                break;
                            case '2':
                                $.each(v, function(key, val){
                                    str += gnmtTr(2,val[0],val[1],val[2],val[3],val[4],val[5],val[6]);        
                                });
                                break;
                            case '3':
                                $.each(v, function(key, val){
                                    str += gnmtTr(3,val[0],val[1],val[2],escape(val[3]),val[4],val[5],val[6]);        
                                });
                                break;
                            case '4':
                                $.each(v, function(key, val){
                                    str += gnmtTr(4,val[0],val[1],val[2],encodeURIComponent(val[3]),val[4],val[5],val[6]);        
                                });
                                break;
                            case '5':
                                $.each(v, function(key, val){
                                    str += gnmtTr(5,val[0],val[1],val[2],val[3],val[4],val[5],val[6]);        
                                });
                                break;
                            case '16':
                                $.each(v, function(key, val){
                                    str += gnmtTr(16,val[0],val[1],val[2],val[3],val[4],val[5],val[6]);        
                                });
                                break;
                      }

                  });
                  /*
                for(var i =0, l=value[gnmNum[2]].length; i<l; i++) {
                    //alert(value[gnmNum[2]].length);
                    str += gnmtTr(value[gnmNum[2]][i][0],value[gnmNum[2]][i][1],value[gnmNum[2]][i][2],value[gnmNum[2]][i][3],value[gnmNum[2]][i][4],value[gnmNum[2]][i][5],value[gnmNum[2]][i][6]);        
                }
               //alert(value.funcode.length); 
               */
            }); 
            $this.siblings('div.equt_right').find('.xdybpzTable > tbody').empty().append(str);
        })
        .fail(function(e){
            alert('表格失败'); 
        });
    }
    function gnmtTr(gnm,jcqdz,jcqcd,zjx,jcqm,jcqms,kxs,dxs) {
        var str = '<tr>'
            + '<td>' + gnm + '</td>'
            + '<td>' + jcqdz + '</td>'
            + '<td>' + jcqcd + '</td>'
            + '<td>' + zjx + '</td>'
            + '<td>' + jcqm + '</td>'
            + '<td>' + jcqms + '</td>'
            + '<td>' + kxs + '</td>'
            + '<td>' + dxs + '</td>'
            + '<td><span class="open xdybpzEdit xdybpzDef">编辑</span><span class="open xdybpzDel xdybpzDef">删除</span><span class="open xdybpzSave hide">保存</span></td>'
            + '</tr>';
        return str;
    } 
	//alert("xx");
	//状态信息 网路对接数据
	var $trq = $("#stin_network").siblings(".content_right").find("table tbody tr");
	var $curvaeluq = $(".webport");
	var $mbp = $(".modbusport");
	//$curvaeluq.html('iii');
	$("#stin_network").click(function() {
		
		if ($(this).siblings(".content_right").hasClass("bloserial")) {
			// var $tr = $(this).siblings(".content_right").find("table tbody tr");
			// var $curTdva = $tr.find("td span:eq(1)").html();

			stateinfoNetwork();
		}

	});

// 下端仪表设备功能码选择
$(document).delegate('.xdybpzSel','click',function(){
    $('.xdybpzSel option:selected').each(function(){
        var $this = $(this);
        var num = $this.text();
        var tr = $this.parents('table.xdybpzTable').find('tbody tr');
        switch(num) {
            case '1':
                tr.each(function(){
                    var $this = $(this);
                    if($this.find('td').eq(0).text() == 1) { 
                        $this.show(); 
                    } else {
                        $this.hide();
                    }
                });
                break;
            case '2':
                tr.each(function(){
                    var $this = $(this);
                    if($this.find('td').eq(0).text() == 2) { 
                        $this.show(); 
                    } else {
                        $this.hide();
                    }
                });
                break;
            case '3':
                tr.each(function(){
                    var $this = $(this);
                    if($this.find('td').eq(0).text() == 3) { 
                        $this.show(); 
                    } else {
                        $this.hide();
                    }
                });
                break;
            case '4':
                tr.each(function(){
                    var $this = $(this);
                    if($this.find('td').eq(0).text() == 4) { 
                        $this.show(); 
                    } else {
                        $this.hide();
                    }
                });
                break;
            case '5':
                tr.each(function(){
                    var $this = $(this);
                    if($this.find('td').eq(0).text() == 5) { 
                        $this.show(); 
                    } else {
                        $this.hide();
                    }
                });
                break;
            case '16':
                tr.each(function(){
                    var $this = $(this);
                    if($this.find('td').eq(0).text() == 16) { 
                        $this.show(); 
                    } else {
                        $this.hide();
                    }
                });
                break;
            default:
                tr.show();
        }
    });
});
// 下端仪表设备表格编辑，删除，保存
$(document).delegate('.xdybpzEdit','click',function(){
    oldTableRegaddr = $(this).parent('td').siblings('td:eq(1)').text();
    $(this).each(function(){
        var $this = $(this);
        $this.siblings('span.xdybpzDef').hide().end().siblings('span.xdybpzSave').show().end().hide();

        $this.parents('tr').find('td').slice(1,8).attr('contenteditable','true').css('background-color','pink');
    });
});
$(document).delegate('.xdybpzSave','click',function(){
    var $this = $(this);
    var cha = $this.parents('div.content_right').siblings('div.thserial_info').attr("val"); 
    var sbdz = parseInt($this.parents('div.equt_right').siblings('div.xdybpzItem').find('span.xdybpzdz').text()); 
    var td = $this.parents('tr').find('td');
    var v0 = td.eq(0).text();
    var v1 = td.eq(1).text();
    var v2 = td.eq(2).text();
    var v3 = td.eq(3).text();
    var v4 = td.eq(4).text();
    var v5 = td.eq(5).text();
    var v6 = td.eq(6).text();
    var v7 = td.eq(7).text();

    if( !( voidCheck(v1) && voidCheck(v2) && voidCheck(v3) && voidCheck(v4) && voidCheck(v5) && voidCheck(v6) && voidCheck(v7)) ){
        alert('每栏必填'); 
    } else if(!checkRanges(v1)) {
        alert('寄存器地址必须1到255'); 
    } else if(!(numberCheck(v3) && numberCheck(v6) && numberCheck(v7))) {
        alert('字节序、K系数、D系数必须为整型数字'); 
    } else if(!(v2 <= 4)) {
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
                    funcode: v0,
                    type: 3,
                    oldregaddr: oldTableRegaddr, 
                    regaddr: v1,
                    regnum: v2,
                    dataformat: v3,
                    regname: v4,
                    regdes: v5,
                    K: v6,
                    D: v7 
                }     
        })
        .done(function(){
            $this.parents('tr').find('td').attr('contenteditable','false').css('background-color','#fff');
            $this.siblings('span.xdybpzDef').show().end().siblings('span.xdybpzSave').hide().end().hide();
        });
    }   
});
$(document).delegate('.xdybpzDel','click',function(){
    var $this = $(this);
    var cha = $this.parents('div.content_right').siblings('div.thserial_info').attr("val"); 
    var wrap = $this.parent('td');
    var sbdz = parseInt($this.parents('div.equt_right').siblings('div.xdybpzItem').find('span.xdybpzdz').text()); 
    var gnm =  wrap.siblings('td:eq(0)').text();
    var jcqAdd = wrap.siblings('td:eq(1)').text();
    var jcqLength = wrap.siblings('td:eq(2)').text();
    var jzxV = wrap.siblings('td:eq(3)').text();
    var jcqName = wrap.siblings('td:eq(4)').text();
    var jcqDes = wrap.siblings('td:eq(5)').text();
    var kxsV = wrap.siblings('td:eq(6)').text();
    var dxsV = wrap.siblings('td:eq(7)').text();
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
                    type: 2,
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
            $this.parents('tr').remove();
        });

});
// 下端仪表设备总保存
$(document).delegate('.saveconfig','click',function(){
    var $this = $(this);
    $this.text('正在保存');
    $.ajax({
        type: "POST",
        url: "../../../cgi-bin/slave.cgi",
        data: {
            cmd: 39 
        }
    })
    .done(function(data){
        //alert(JSON.stringify(data));
        if(data.status == '0') $this.text('保存配置'); 
    })
    .fail(function(jqXHR, textStatus) {
       alert("请求失败：" + textStatus);
    });
});
// 数据集中配置
$(document).on('click','#sjjzpzPage', sjjzpzAdd);
$(document).on('click','#sjjzpzSel', function(){
    $('#sjjzpzSel option:selected').each(function(){
        var $this = $(this);
        var num = $this.text();
    });
});
	//状态信息 网路对接数据函数
	function stateinfoNetwork() {
		//alert("ss");

		$.ajax({
			type : "POST",
			url : "../../../cgi-bin/slave.cgi",
			data : {
				cmd : 11
			},
			success : function(data) {
                //alert(data);
			    var escape = JSON.parse(data);
				$curvaeluq.html(escape.webport);
				$mbp.html(escape.modbusport);
				 //console.log(data);
				
			}
		});
	}

	//状态信息 串口对接数据函数
	$(".netser_port").bind('click', function() {
		//alert("ss");
		if ($(this).siblings(".content_right").hasClass("bloserial")) {

			netserPort($(this).attr("val"));
		}
	});

	function netserPort(cha) {
		//alert("ss");
		$.ajax({
		   contentType:"application/x-www-form-urlencoded; charset=utf-8",
			type : "POST",
			url : "../../../cgi-bin/slave.cgi",
			data : {
				cmd : 13,
				channel : cha
			},
			success : function(data) {
			    var d = data;	
				var curser = JSON.parse(data), sla = curser.slave, tr = "";
				if(sla){
					$.each(sla, function(index, curvalue) {
						tr += '<tr><td><span>'+curvalue[0]+'</span></td><td><span>'+parseInt(curvalue[1]) +'</span></td><td><span class="sucdhcp" title="正常"> </span></td></tr>';
					});
				}
				$(".state_table tbody").empty().html(tr);
			}
		});
    }

    //端口配置 网络对接数据函数

   $("#sernetwork").bind('click', function() {
		//alert("ss");
		if ($(this).siblings(".content_right").hasClass("twbloserial")) {
             
			// netserPort($(this).attr("val"));
			sernetwork();
		}
	});
	
	function sernetwork(){
		//alert("ss");
		
		$.ajax({
			type:"POST",
			url:"../../../cgi-bin/slave.cgi",
			data:{
				cmd:15
			},
			
			success:function(data){
				    console.log(data);
					var curserne = JSON.parse(data);
					var $cursertr =  $("#sernettable").find("tbody tr");
					var $curdadhcp = $cursertr.find(".serdhcp");
					var $curdaip = $cursertr.find(".serip");
			        var $curdamask = $cursertr.find(".sersubnet");
				    var $curdagateway = $cursertr.find(".sergateway");
						//console.log($curdaip);
						//$curdaip.html('ii');
						$curdaip.html(curserne.ip);
						$curdamask.html(curserne.mask);
						$curdagateway.html(curserne.gateway);		
				
				
			}
		});
	}
 //端口配置 串口对接数据函数	twserial_info
	$(".portserial").bind('click', function() {
		
		if ($(this).siblings(".content_right").hasClass("twbloserial")) {
              //alert("ss");
			portSerial($(this).attr("val"));
		
			
		}
	});

	function portSerial(curcha) {
		//alert("ss");
		$.ajax({
		   contentType:"application/x-www-form-urlencoded; charset=utf-8",
			type : "POST",
			url : "../../../cgi-bin/slave.cgi",
			data : {
				cmd : 19,
				channel : curcha
			},
			success : function(data) {
				console.log(data);
						var curpor = JSON.parse(data), bau = curpor.baudrate,
						dat = curpor.databit,sto =curpor.stopbit, 
						par= curpor.partiybit;
						//取出值放在select的option中使其默认显示
					    $(".portbotel select").val(bau);
					    $(".portdata select").val(dat);
					    $(".portstop select").val(sto);
					    $(".portcheck select").val(par);
				 
			}
		});
    }
       $(".saportser").bind('click',function(){
				       //alert("ss");
				       var 	baudrateVal = $('.portbotel select option:selected').val(),
				       databitVal = $('.portdata select option:selected').val(),
				       stopbitVal = $('.portstop select option:selected').val(),
				       partiybitVal = $('.portcheck select option:selected').val();
				       // console.log(databitVal);
				       $.ajax({
				       	   type:"POST",
				       	   url:"../../../cgi-bin/slave.cgi",
				       	   data:{
				       	     	cmd:21,
				       	     	channel:$(".serial_port .twclinfotext").attr("val"),
				       	     	baudrate:baudrateVal,databit:databitVal,stopbit: stopbitVal,partiybit:partiybitVal
				       	   	},
				       	   dataType:'json'
				       });
				       
				});    
				
				
				$(".netportsa").bind('click',function(){
					var $cursertr =  $("#sernettable").find("tbody tr");
					var $curdadhcp = $cursertr.find(".serdhcp"),
					ipVal = $cursertr.find(".serip").html(),
					damaskVal = $cursertr.find(".sersubnet").html(),
					dagatewayVal = $cursertr.find(".sergateway").html();
					 $.ajax({
				       	   type:"POST",
				       	   url:"../../../cgi-bin/slave.cgi",
				       	   data:{
				       	     	cmd:17,	
				       	     	ip:ipVal,damask:damaskVal,dagateway: dagatewayVal
				       	   	},
				       	   dataType:'json'
				       });
				});
				
				    
});



function checkRanges(text) {
    var regex = /^([1-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])$/;
    if(!regex.test(text) || text.length == 0) {
        return false;
    }
    return true;
}
function voidCheck(text) {
    return (text.length == 0) ? false : true;
}
function numberCheck(text) {
    var regex = /^[+|-]?\d*$/;
    if(!regex.test(text) || text.length == 0) {
        return false; 
    }
    return true;
}
function sjjzpzAdd() {
    var $this = $(this);
    var str = "";
    $.ajax({
        type: "POST",
        url: "../../../cgi-bin/slave.cgi",
        dataType: "json",
        data: {cmd: 41}
    })
    .done(function(data){
        var data = data;
        //alert(JSON.stringify(data));
            $.each(data.reglist, function(index, value){
                  $.each(value, function(k,v){
                      switch(k) {
                            case '1':
                                $.each(v, function(key, val){
                                    str += sjjzpzStructure(val[0],val[1],val[2],val[3],val[4],val[5],val[6],val[7],val[8],val[9]);        
                                });
                                break;
                            case '2':
                                $.each(v, function(key, val){
                                    str += sjjzpzStructure(val[0],val[1],val[2],val[3],val[4],val[5],val[6],val[7],val[8],val[9]);        
                                });
                                break;
                            case '3':
                                $.each(v, function(key, val){
                                    str += sjjzpzStructure(val[0],val[1],val[2],val[3],val[4],val[5],val[6],val[7],val[8],val[9]);        
                                });
                                break;
                            case '4':
                                $.each(v, function(key, val){
                                    str += sjjzpzStructure(val[0],val[1],val[2],val[3],val[4],val[5],val[6],val[7],val[8],val[9]);        
                                });
                                break;
                            case '5':
                                $.each(v, function(key, val){
                                    str += sjjzpzStructure(val[0],val[1],val[2],val[3],val[4],val[5],val[6],val[7],val[8],val[9]);        
                                });
                                break;
                            case '16':
                                $.each(v, function(key, val){
                                    str += sjjzpzStructure(val[0],val[1],val[2],val[3],val[4],val[5],val[6],val[7],val[8],val[9]);        
                                });
                                break;
                      }

                  });
            }); 
        $this.siblings('div.drop_down').find('table.newdatatable > tbody').empty().append(str);
    })
    .fail(function(jqXHR, textStatus){
        alert("请求失败：" + textStatus); 
    });
}
function sjjzpzStructure(sjxdz,jcqgs, td, sbh, jcqdz,zjx,jcqmc,jcqms,k,d) {
    var str = '<tr >'
    	    + '<td><span>'+sjxdz+'</span></td>'
		    + '<td><span>'+jcqgs+'</span></td>'
		    + '<td><span>'+td+'</span></td>'
			+ '<td><span>'+sbh+'</span></td>'						
		    + '<td><span>'+jcqdz+'</span></td>'					
            + '<td><span>'+zjx+'</span></td>'
			+ '<td><span>'+jcqmc+'</span></td>'	
            + '<td><span>'+jcqms+'</span></td>'
			+ '<td><span>'+k+'</span></td>'					
			+ '<td><span>'+d+'</span></td>'					
            + '<td><span class="open uptd" >上移</span><span class="open spac downtd">下移</span></td>'
            + '</tr>';
    return str;                                            
														
}
