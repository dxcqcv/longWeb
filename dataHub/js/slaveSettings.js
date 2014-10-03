/**
    * 功能说明：slave settings
    * 创建人：商文龙
    * 创建时间：2014-09-25
    * 联系：dxcqcv@gmail.com
    * **/

(function(){
    var n = 0;
    $(document).on('click','#jcqpzAdd',{num: n},addjcqpz);
    $(document).on('change','#gnmSel',selgnm);
    $(document).on('click','.delButton',delThisLine);
    $(document).on('click','#jcqpzDel',{name:'.jcqpzInputLine'},clearAll);
    $(document).on('click','#jcqpzSubmit',sendData);
    $(document).on('blur','#czhNum',checkczhNum);
})();

function addjcqpz(event) {
    var v1 = $("#jcqdzVal").val(),
        v2 = $("#jcqsmVal").val(),
        v3 = $("#jcqmzVal").val(),
        v4 = $("#jcqmsVal").val();
    if(numberCheck(v1) && numberCheck(v2) && voidCheck(v3) && voidCheck(v4)) {
        if($('#slaveSettingsTable2').length == 0) {
            $('<table id="slaveSettingsTable2">'+
                '<thead>'+
                '<th>寄存器地址：</th>'+
                '<th>寄存器数目：</th>'+
                '<th>寄存器名字：</th>'+
                '<th>寄存器描述：</th>'+
                '<th>操作</th>'+
                '</thead>'+
                '<tbody></tbody>'+
                '</table>'
            ).appendTo('#slaveSettingsTable2Wrapper');
        }
        $('<tr>'+
                '<td><input id="regAddr'+ event.data.num +'" class="formtext" type="text" name="" value="'+v1+'"></td>'+    
                '<td><input id="regNum' + event.data.num +'" class="formtext" type="text" name="" value="'+v2+'"></td>'+
                '<td><input id="regName'+ event.data.num +'" class="formtext" type="text" name="" value="'+v3+'"></td>'+
                '<td><input id="regDes' + event.data.num +'" class="formtext" type="text" name="" value="'+v4+'"></td>'+
                '<td><a class="bnt delButton" href="#"><span>Delete</span></a></td>'+
          '</tr>' 
        ).appendTo('#slaveSettingsTable2 > tbody');
        event.data.num++;
    } else {
        alert('only int number in 寄存器地址 and 寄存器数目 并不能为空');
    }
}
function selgnm(){
$('#gnmSel option:selected').each(function(){
    if($(this).val() != 3) {        
        $('#gnm03').remove();
    } else {
        if($('#gnm03').length) return;
        $('<tr id="gnm03">'+
                '<th>功能码：</th><td>'+
                '<select class="formsel">'+
                '<option value="1">0x01</option>'+
                '<option value="2">0x02</option>'+ 
                '<option value="3">0x03</option>'+
                '<option value="4">0x04</option>'+
                '<option value="5">0x05</option>'+
                '<option value="16">0x10</option>'+
                '</select></td>'+    
          '</tr>' 
        ).appendTo('#slaveSettingsTable > tbody');
    }
});
}
function numberCheck(text) {
    var regex = /^[+|-]?\d*$/;
    if(!regex.test(text) || text.length == 0) {
        return false; 
    }
    return true;
}
function voidCheck(text) {
    return (text.length == 0) ? false : true;
}
function delThisLine() {
    var $this = $(this);
    if($this.parents('tbody').children('tr').length == 1) {
        $('#slaveSettingsTable2').remove();
    }
    $this.parents('tr').remove();
}
function clearAll(event) {
    var ele = $(event.data.name);
    ele.find('input').val('');
}
function checkRanges(text) {
    var regex = /^([1-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])$/;
    if(!regex.test(text) || text.length == 0) {
        return false;
    }
    return true;
}
function checkczhNum() {
    checkRanges($('#czhNum').val()) ? null : alert('only 1 - 255 number.');
}
function sendData() {
    var tdh = parseInt($('#tdhSel option:selected').val()),
        czh = parseInt($('#czhNum').val()),
        gnm = parseInt($('#gnmSel').val()),
        n,
        regAddrVal = {},
        regNumVal = {},
        regNameVal = {},
        regDesVal = {};
    if(gnm == 3) {console.log('hi');}
    var rowsNum = $('#slaveSettingsTable2').children('tbody').children('tr').length;
    for(n=0;n<rowsNum;n++) {
        regAddrVal[n] = $('#regAddr'+n+'').val(); 
        regNumVal[n] = $('#regNum'+n+'').val();
        regNameVal[n] = $('#regName'+n+'').val();
        regDesVal[n] = $('#regDes'+n+'').val();
    }
    console.log(regAddrVal);
    $.ajax({
        type: "POST", 
        url: "../../../cgi-bin/slave.cgi",
        data: {channel:tdh, slave:czh, funCode:gnm, regAddr:regAddrVal, regNum:regNumVal, regDes:regDesVal},
        dataType: "json"
    })
    .done(function(data){
        console.log(data);
    });
}
function realVal(obj) {
    var clone = obj.clone();
    clone.css("visibility","hidden");
    $('body').append(clone);
    var value = clone.val();
    clone.remove();
    return value;
}
