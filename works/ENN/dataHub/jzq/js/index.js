(function(doc,win){
// for content height
    layout();

$(win).resize(function() {
    layout();
})

    $(doc).on('click','.content-left li',leftNav) // sider nav
    $(doc).on('click','.head-nav li',topNav) // top nav
    $(doc).on('click', '#saveBtn', saveBtn ) // 状态信息和端口配置的保存按钮 
    $(doc).on('click', '.xdybpzEdit', xdybpzEdit) // 下端仪表配置的编辑
    $(doc).on('click', '.xdybpzSave', xdybpzSave) // 下端仪表配置的保存
    $(doc).on('click', '.xdybpzDel', xdybpzDel) // 下端仪表配置的删除
    $(doc).on('click', '.xdybpzContDel', xdybpzContDel) // 下端仪表配置内部列表删除
    $(doc).on('click', '#xdybpzShow', xdybpzShow) // 下端仪表配置新增显示
    $(doc).on('click', '#xdybpzCancel', xdybpzCancel) // 下端仪表配置新增隐藏
    $(doc).on('click', '#xdybpzAdd', xdybpzAdd) // 下端仪表配置新增隐藏
    $(doc).on('click','#xdybpzListAdd',xdybpzListAdd) // 新增下端仪表配置列表项目
    $(doc).on('click','#xdybpzModEqu',xdybpzEquMod) // 修改下端仪表配置列表项目设备
    $(doc).on('click','#gnmSel', popupSel) // 下端仪表配置列表特选项
    $(doc).on('click','#sjjzpzSel',sjjzpzSelect) // 数据集中配置筛选
    $(doc).on('click','#rebootBtn', rebootBtn) // reboot 
    $(doc).on('click','#changePWBtn', changePWBtn) // change password 

function layout() {
    var winHei = $(win).height()
      , conHei = winHei - 72

    $('.content').height(conHei)
}
// for ajax 
function Request() {
    this.loading = $('#loading');
}
Request.prototype = {
    start: function(opt) {
        //var url = opt.url ? opt.url : '../../../cgi-bin/slave.cgi'
        var url = opt.url ? opt.url : 'test.json'
          , type = opt.type ? opt.type : 'POST' 
          , data = opt.data ? opt.data : {}
          , timeout = opt.timeout ? opt.timeout : 1000
          , currentRequest = null
          , done= opt.done ? opt.done : doneFn 
          , fail = opt.fail ? opt.fail : failFn
          , arg = opt.arg
          , test = opt.test
          , self = this

            currentRequest = $.ajax({
                url: url
              , type: type    
              , timeout: timeout
              , data: data
              , dataType: 'json' // set json file type
              , mimeType: 'application/json' // for not well form
              , beforeSend: function() {
                    self.loading.removeClass('hide')
                    if(currentRequest != null) currentRequest.abort()
              }
            })
            .done(function(data){
              var d = data
              self.loading.addClass('hide')
              console.log('cmd is '+opt.data.cmd)
              done(d)
            })
            .fail(function(jqXHR, textStatus){
                if(textStatus == "timeout") alert('timeout')
                fail(jqXHR,textStatus)
            })
        }
}
var demand = new Request() // instance for request
  , saveBtn = $('#saveBtn')
  , xdybpzCont = $('#xdybpzCont') 
  , xdybpzDefault = $('#xdybpzDefault')
  , alreadyFlag = true // make sure already save
  , xdybpzList = $('#xdybpzList')
  , xdybpzEquName = $('#xdybpzEquName')
  , xdybpzEquAddr = $('#xdybpzEquAddr')
  , sjjzpzDefTable = $('#sjjzpzDefTable')
  , xdybpzDefTable= $('#xdybpzDefTable')
  , xdybpzDefTbody = $('#xdybpzDefTable').children('tbody')
  , username  = $('#username') 
  , oldPW     = $('#oldPW')
  , password  = $('#newPW')
  , againPW   = $('#againPW')
  , loginUsername = $('#loginUsername')
  , loginPassword = $('#loginPW')
  , loginBox = $('#loginBox')
  , potocolType = $('#xdybpzPotocolType')
  , xdybpzPotocol645 = $('#xdybpzPotocol645')
  , xdybpzPotocolModbus = $('#xdybpzPotocolModbus')
  , xdybpzPotocol102 = $('#xdybpzPotocol102')

// nav class
function Navigation() {
    this.pos = []; // which sidebar under which category
    this.cat = 0; // category index
    this.side = 0; // sidebar index
    this.contLeft = $('#contLeft'); 
    this.contRight = $('#contRight');
    this.sideWrap = $('#sideNav');
    this.sideLi = this.sideWrap.find('li');
    this.title = $('#contNavStat');
    this.subTitle = $('#contSubNavStat');
    this.funBtn = $('#btnBox');
    this.actFlag = true;
}
Navigation.prototype = {
    mainNav: function(that) {
        var self = this // just for closure
          , curPos = 0 
        
        if(this.cat == 2 && !alreadyFlag) alert('请先保存') // make sure already save in category 2
        else { 
            self.navShow(that) // highlight nav that is this li
            self.cat= that.index() // current cat must set before curPos
            curPos = self.pos[self.cat] || 0 // prev side pos of nav 
            self.navShow(this.sideLi.eq(curPos))
            this.changeNav()
            this.changeSide(curPos) // save side bar pos  
        }
  }
  , navShow: function(nav) {
        nav.addClass('active').siblings('li').removeClass('active')
  }
  , sideNav: function(that) {
        var self = this
        self.side = that.index()
        if(this.cat == 2 && !alreadyFlag) alert('请先保存') // make sure already save in category 2
        else self.navShow(that) // that is this li and no save 
        self.pos[self.cat] = self.side 
        this.changeSide() // no arguments  
  }
  , showNetSave: function() {
      this.sideLi.first().removeClass('hide')
      $('#btnBox').removeClass('hide')
  }
  , changeNav: function() {
        if(this.cat !== 3) {
            this.contLeft.removeClass('hide')
            this.contRight.removeClass('w100')
        }
        if(this.cat !== 4) showCont('#sideNav','.sidebarNav') // restore nomal side bar

        switch(this.cat) {
            case 0: this.title.text('状态信息'); this.showNetSave();showCont('#ztxxTable', '.contWrap'); break // show default cont   
            case 1: this.title.text('端口配置'); this.showNetSave(); break   
            case 2: 
                this.title.text('下端仪表配置')
                this.subTitle.text('串口1')
                this.sideLi.first().addClass('hide') // hide net 
                this.funBtn.addClass('hide') // hide save and cannel btn
                this.actFlag && // if active is false then add active 
                this.sideLi.eq(1).addClass('active') // active second
                showCont('#xdybpzCont', '.contWrap')
                break  
            case 3:
                this.title.text('数据集中配置')
                this.subTitle.text('集中器')
                this.contLeft.addClass('hide')         
                this.contRight.addClass('w100')
                showCont('#sjjzpzCont', '.contWrap')
                this.funBtn.addClass('hide') // hide save and cannel btn
                demand.start({data:{cmd:41},done:cmd41Done}) // 刷新数据集中配置表格       
                this.showNetSave() // show save and cancel btn
                break;
            case 4:
                this.title.text('系统配置')
                showCont('#xtpzCont', '.contWrap')
                this.funBtn.addClass('hide') // hide save and cannel btn
                showCont('#xtpzSideNav','.sidebarNav' ) // 显示系统配置侧导航 
        }
  }
  , changeSide: function(side) {
      var table = $('#ztxxTable') 
        , tbody = table.find('tbody#ztxxNetTbody')
        , th = table.find('th')
        , realSide = typeof(side) == 'undefined' ? this.side : side // set side num 
       
      if(this.cat === 0 && this.side !== 0) { // 状态信息 
         th.eq(0).text('设备号') 
         th.eq(1).text('设备') 
      } else {
         th.eq(0).text('项目') 
         th.eq(1).text('端口') 
      }
      //console.log(this.cat)
      if(realSide !== 0) { // when channel 1~8
          this.subTitle.text('串口'+realSide) // set sub title
          switch(this.cat) {
            case 0:
                demand.start({url:'test.json',data:{cmd:13,channel:realSide},done:cmd13Done})      
                break
            case 1:
                showCont('#dkpzOptions', '.contWrap')
                saveBtn.attr('data-save','port').attr('data-channel',realSide) // change save attr
                demand.start({ data:{cmd:19,channel:realSide},done:cmd19Done })
                break
            case 2:
                if(alreadyFlag) 
                {
                    this.actFlag = false// assigment false after active side bar
                    demand.start({data:{cmd:31,channel:realSide},done:cmd31Done})
                    xdybpzCont.attr('data-channel',realSide) // set xdybpz channel
                    xdybpzDefault.removeClass('hide').siblings('.xdybpzContWrap').addClass('hide')
                    xdybpzEquName.val('') && xdybpzEquAddr.val('') // clear up equipment name and address adding input  
                }
                break
            case 4:
                switch(realSide) {
                    case 1:
                        showCont('#reboot','.xtpzBox')                    
                        this.subTitle.text('重启集中器')
                        break
                    case 2:
                        showCont('#changePW','.xtpzBox')
                        this.subTitle.text('修改密码')
                        break
                    case 3:
                        this.subTitle.text('系统日志')
                        showCont('#tempBox', '.xtpzBox') // temp box
                        break
                    case 4:
                        this.subTitle.text('版本信息')
                        showCont('#tempBox', '.xtpzBox') // temp box
                        break
                }
                break

          }
      } else { // first sider 
          showCont('#backupRestore','.xtpzBox')
          // 系统配置子导航
          if(this.cat == 4) this.subTitle.text('备份和恢复')
          // set sub title is net when category 1 and 2
          if(this.cat == 0 || this.cat == 1) this.subTitle.text('网络')
          switch(this.cat) {
            case 0:
                demand.start({url:'test.json',data:{cmd:11},done:cmd11Done})      
                break
            case 1:
                demand.start({url:'test.json',data:{cmd:15},done:cmd15Done})
                saveBtn.attr('data-save','net').removeAttr('data-channel') // change save attr
                showCont('#dkpzTable', '.contWrap')
                break
            case 2:
                demand.start({data:{cmd:31,channel:realSide},done:cmd31Done})
                xdybpzCont.attr('data-channel',1) // set xdybpz channel num
                xdybpzDefault.removeClass('hide').siblings('.xdybpzContWrap').addClass('hide')
                xdybpzEquName.val('') && xdybpzEquAddr.val('') // clear up equipment name and address adding input  
                break
          }
      } 
  }
}
function showCont(ele, others) {
       $(ele).removeClass('hide').siblings(others).addClass('hide') 
}
// instance nav
var nav = new Navigation() 
  , ipV = $('#ipV')
  , maskV = $('#maskV')
  , gatewayV = $('#gatewayV')
  , dhcpS = $('#dhcpsele')
  , protocol = $('#protocol')
  , baudrate = $('#baudrate')
  , databit = $('#databit')
  , stopbit = $('#stopbit')
  , paritybit = $('#paritybit')
  , slaveName = $('#slaveName')
  , slaveAddr = $('#slaveAddr')
  , xdybpzChannel = xdybpzCont.attr('data-channel') || 1 // 下端仪表配置的串口号
  , oldTableRegaddr = ""
  , popupBox = $('#popupBox')
  , newTempMC, newTempDZ, oldTempMC, oldTempDZ
  , xdybpzSel = $('#xdybpzSel')

$(doc).on('click', '#xdybpzList li', xdybpzInnerList) // 下端仪表配置内部列表

function topNav() {
   var $this = $(this)
   nav.mainNav($this);
}
function leftNav() {
    var $this = $(this)
    nav.sideNav($this); 
}
function xdybpzInnerList() {
    var $this = $(this)
      , str = ''
      , xdybpzChannel = xdybpzCont.attr('data-channel')
    if(!alreadyFlag) { alert('请先保存') }
    else {
        if(!$this.hasClass('active'))  xdybpzDefault.addClass('hide').siblings('.xdybpzContWrap').removeClass('hide') // show right cont  
        xdybpzSel.val(0)
        str = $this.find('.slave-addr-val').text().trim()
        slaveName.text($this.find('.slave-name-val').text().trim()) // update slave name
        nav.navShow($this) // highlight
        //console.log(potocolType.attr('data-potocol'))
        switch(potocolType.attr('data-potocol')) { // check potocol type
            case '0':
                demand.start({data:{cmd:35,channel:xdybpzChannel,slaveaddr: str},done:cmd35DefDone})     
                break
            case '1':
            case '2':
                demand.start({data:{cmd:35,channel:xdybpzChannel,slaveaddr: str},done:cmd645Done})     
                break
            case '3':
                demand.start({data:{cmd:35,channel:xdybpzChannel,slaveaddr: str},done:cmd102Done})     
                break
        }
    }
}

function gnmtTr() {
    var str = ''
    str += '<tr>'
    for(var i = 0, l = arguments.length; i < l; i++) {
        if(typeof arguments[i] === 'string') {
                str += '<td data-gnm='+arguments[i]+'>' + arguments[i] + '</td>' // gnm
        }
        if(typeof arguments[i] === 'object') { // contents
            for(var j = 0, k = arguments[i].length; j < k; j++)
                str += '<td>' + arguments[i][j] + '</td>'
        }
    }
    str += '<td><span class="xdybpzEdit mr10">编辑</span><span class="xdybpzDel">删除</span><span class="xdybpzSave hide ml10">保存</span></td>'
    str += '</tr>';
    return str;
} 
function sjjzpzStructure() {
    var str = ''
    str = '<tr >'
    for(var i = 0, l = arguments.length; i < l; i++) {
        if(typeof arguments[i] === 'string') str += '<td>' + arguments[i] + '</td>' // gnm
        if(typeof arguments[i] === 'object') { // contents
            for(var j = 0, k = arguments[i].length; j < k; j++)
                str += '<td>' + arguments[i][j] + '</td>'
        }
    }
        str += '<td><input type="checkbox"></td>'
        str += '<td><span class="" >上移</span><span class="">下移</span></td>'
        str += '</tr>';
    return str;                                            
}
/* ajax fn */
function cmd11Done(data) {
    showCont('#ztxxNetTbody', '.ztxxTbody')
    $('#webportV').text(data.webport)
    $('#modbusportV').text(data.modbusport)
}
function cmd13Done(data) {
    var str = ''
    showCont('#ztxxPortTbody','.ztxxTbody')
    for(var i = 0, l = data.slave.length; i < l; i++) {
        str += '<tr>'               
             + '<td>' + data.slave[i][0] + '</td>'
             + '<td>' + data.slave[i][1] + '</td>'
             + '<td>' + (data.slave[i][2] ? '故障' : '正常') + '</td>'
    }
    $('#ztxxPortTbody').empty().append(str)
}
function cmd15Done(data) {
    var str = '' 
    dhcpS.val(data.dhcp)
    if(data.dhcp == 0) beEdited(1,ipV,maskV,gatewayV)
    else beEdited(0,ipV,maskV,gatewayV) // be able to edit if DHCP is close
    ipV.text(data.ip)
    maskV.text(data.mask)
    gatewayV.text(data.gateway)
}
function cmd17Done(data) {
   if(data.status == 0) saveBtn.text('保存') 
   else {
    alert('保存失败')
    saveBtn.text('保存')
    }

}
function cmd19Done(data) {
   protocol.val(data.protocol) 
   baudrate.val(data.baudrate) 
   databit.val(data.databit)
   stopbit.val(data.stopbit)
   paritybit.val(data.paritybit)
}
function cmd21Done(data) {
   if(data.status == 0) saveBtn.text('保存') 
   else {
    alert('保存失败')
    saveBtn.text('保存')
    }
}
/*
  , xdybpzPotocol645 = $('#xdybpzPotocol645')
  , xdybpzPotocolModbus = $('#xdybpzPotocolModbus')
  , xdybpzPotocol102 = $('#xdybpzPotocol102')
  */
function cmd31Done(data) {
    var str = ''
    switch(data.protocol) { // 修改下端仪表配置协议类型
        case 0: 
            potocolType.text('modbus').attr('data-potocol',0)
            showCont(xdybpzPotocolModbus,'.potocolBox')
            showCont('#xdybpzDefTable','.xdybpzTable')
            break
        case 1: 
            potocolType.text('645-1997').attr('data-potocol',1)
            show645Potocol()
            showCont('#xdybpz645Table','.xdybpzTable')
            break
        case 2: 
            potocolType.text('645-2007').attr('data-potocol',2)
            show645Potocol()
            showCont('#xdybpz645Table','.xdybpzTable')
            break
        case 3: 
            potocolType.text('102').attr('data-potocol',3)
            showCont(xdybpzPotocol102,'.potocolBox')
            showCont('#xdybpz102Table','.xdybpzTable')
            break
    }
    for(var i = 0, l = data.slave.length; i < l; i++) { // 生成设备列表
        str += xdybpzGet(data.slave[i][0],data.slave[i][1]) 
    }
    xdybpzList.empty().append(str)    
}
function show645Potocol() {
    xdybpzPotocol645.removeClass('hide')
    xdybpzPotocolModbus.removeClass('hide')
    xdybpzPotocol102.addClass('hide')
}
function xdybpzGet(name, addr) {
    var str = ''
    str += '<li class="clearfix ">'
         + '<span class="left ellipsis">'+'<span class="slave-name-val">'+name+'</span>'+'-'+'<span class="slave-addr-val">'+addr+'</span>'+'</span>'
         + '<span class="right xdybpzContDel">删除</span>'
         + '</li>'
     return str
}
function cmd33AddDone(name, addr) {
    var str = xdybpzGet(name, addr)
    xdybpzList.append(str)    
}
function cmd33DelDone(li) {
    li.remove(); xdybpzDefault.removeClass('hide').siblings('.xdybpzContWrap').addClass('hide')  
}
function cmd33ModDone(that,addr,name) {
       that.text('修改设备').attr('data-mod',0)
       slaveName.attr('contenteditable','false').css('background-color','#fff')
       slaveAddr.attr('contenteditable','false').css('background-color','#fff')
       alreadyFlag = true 
       xdybpzList.find('li').each(function(){ // loop all li and find ative li
           var $this = $(this)
           $(this).hasClass('active') && $this.find('.slave-name-val').text(name).end().find('.slave-addr-val').text(addr) 
       })
       
}
function cmd35DefDone(data) {
   var str = ''
   slaveAddr.text(data.slaveaddr) 
   str += loopTable(data.funcode,gnmtTr,2) // calling loop table and category 2 is this.cat 2 
   xdybpzDefTbody.empty().append(str);
}
function loopTable(obj,fn,category) {
    var str = ''
      , sortArr = []

      for (var key in obj) {
        var o = obj[key]
        for(var prop in o) {
            if(o.hasOwnProperty(prop)) {
                //console.log(prop + "=" + o[prop])
                sortArr.push([prop,o[prop]]) // push obj to array
            }
        }
      }
      sortArr.sort() // sort array

    // loop form
    for(var i = 0, l = sortArr.length; i < l; i++) {
        //console.log(sortArr[i][0]) // get gnm number
        for(var j = 0, k = sortArr[i][1].length; j < k; j++) {
            //console.log(sortArr[i][1][j]) // get contents array 
            if(category == 2) str += fn(sortArr[i][0],sortArr[i][1][j])
            else str += fn(sortArr[i][0],sortArr[i][1][j]);        
        }
            
    }
    //console.log(str)
    return str
}
function cmd37SaveDone(that) { // restore bg color if done
        that.parents('tr').find('td').attr('contenteditable','false').css('background-color','#fff');
        that.siblings('.xdybpzEdit').removeClass('hide').end().addClass('hide')
        alreadyFlag = true
}
function cmd37DelDone(that) {
    that.parents('tr').remove();
}
function cmd37AddDone(gnm,jcqdz,jcqcd,zjx,jcqm,jcqms,kxs,dxs) {
    var str = ''
    str = gnmtTr(gnm,jcqdz,jcqcd,zjx,jcqm,jcqms,kxs,dxs) // rendering table tr
    xdybpzDefTbody.append(str)
    xdybpzCancel()
}
function cmd41Done(data) {
    var str = ''
   str += loopTable(data.reglist,sjjzpzStructure,3) // calling loop table and category 3 is this.cat 3 
   sjjzpzDefTable.find('tbody').empty().append(str);
}
function cmd50Done(data) {
    alert('已经重启')
}
/* global ajax fn */
function failFn(jqXHR,textStatus) {
    console.log('error is ' +jqXHR.statusText)
    console.log('error is ' +textStatus)
}
function doneFn() {
    console.log('done')
}
// for save btn
function saveBtn() {
    var $this = $(this)
    $this.text('保存中')
    if($this.attr('data-save') == 'net') dhcpS.val() == 1 ? demand.start({url:'test.json',data:{cmd:17,dhcp:1},done:cmd17Done}): demand.start({url:'test.json', data:{cmd:17,dhcp:0,ip:ipV.text(),mask:maskV.text(), gateway:gatewayV.text()},done:cmd17Done}) // submit when it's net 
    else demand.start({data:{cmd:21, channel:$this.data('channel'), protocol:protocol.val(), baudrate:baudrate.val(), databit:databit.val(), stopbit:stopbit.val(), paritybit:paritybit.val()},done:cmd21Done}) // it's not net 
}
// 修改设备
function xdybpzEquMod() {
    var $this = $(this)
    , xdybpzChannel = xdybpzCont.attr('data-channel')
    if(!alreadyFlag && $this.attr('data-mod') == 0 ) alert('请先保存') // alert msg if not already and mod is 0
    else {
        if($this.attr('data-mod') == 0) {
           oldTempMC = slaveName.text()
           oldTempDZ = slaveAddr.text()
           slaveName.attr('contenteditable','true').css('background-color','pink')
           slaveAddr.attr('contenteditable','true').css('background-color','pink')
           $this.text('保存修改').attr('data-mod',1)
           alreadyFlag = false
       } else {
           newTempMC = slaveName.text() || '';
           newTempDZ = slaveAddr.text() || '';
           if(!checkRanges(newTempDZ)){
               alert('设备地址必须为1-255'); 
           } else {
               demand.start({data:{cmd: 33,channel: xdybpzChannel,type: 3,oldslaveaddr: oldTempDZ,slaveaddr: newTempDZ,slavename: newTempMC},done:function(){cmd33ModDone($this,newTempDZ,newTempMC)}})
           }
       }
    }
}
function popupSel(){
    $('#gnmSel option:selected').each(function(){
        var $this = $(this); 
        var input = $this.parents('.pop-up').find('#jcqcd');
        if($this.val() == 1 || $this.val() == 2 || $this.val() == 5) {
            input.val(1).attr('readonly','readonly');
        } else {
            input.val('').removeAttr('readonly'); 
        } 
    });
}
// 下端仪表设备功能码选择
$(doc).on('click','#xdybpzSel',xdybpzSelect)
$(doc).on('click','#sjjzpzSel',sjjzpzSelect)
function sjjzpzSelect() {
    $('#sjjzpzSel option:selected').each(function(){ var num = $(this).text(); sortTable(num,sjjzpzDefTable) }) // pass this num to sort table function 
}
function xdybpzSelect() {
    $('#xdybpzSel option:selected').each(function(){ var num = $(this).text(); sortTable(num,xdybpzDefTable) }) // pass this num to sort table function 
}
function sortTable(num,table) {
    var num = num 
      , tr = table.find('tbody tr')
      switch(num) {
        case '1':
            tr.each(function(){ var $this = $(this); filterTr(1,$this)}) // pass this tr to filter function
            break
        case '2':
            tr.each(function(){ var $this = $(this); filterTr(2,$this)})
            break
        case '3':
            tr.each(function(){ var $this = $(this); filterTr(3,$this)})
            break
        case '4':
            tr.each(function(){ var $this = $(this); filterTr(4,$this)})
            break
        case '5':
            tr.each(function(){ var $this = $(this); filterTr(5,$this)})
            break
        case '16':
            tr.each(function(){ var $this = $(this); filterTr(16,$this)})
            break
        default:
            tr.removeClass('hide')
            break
      }
}
function filterTr(num,that) {
    var $this = that
    if($this.find('td').eq(0).text() == num) { 
        $this.removeClass('hide') 
    } else {
        $this.addClass('hide')
    }
}
// 新增下端仪表配置列表项目
function xdybpzShow() {
    if(!alreadyFlag) alert('请先保存')
    else {
        $('#gnmSel').val(1) // clear select 
        popupBox.find('input').val('') // clear all input in pop-up box
        $('#jcqcd').val(1).attr('readonly','readonly')
        popupBox.removeClass('hide')    
    }
}
function xdybpzCancel() {
    popupBox.addClass('hide')
}
function xdybpzAdd() {
    var $this = $(this) 
      , wrap = $this.parents('.pop-up')
      , gnm = wrap.find('#gnmSel option:selected').text()
      , jcqAdd = wrap.find('#jcqdz').val()
      , jcqLength = wrap.find('#jcqcd').val()
      , zjxV = wrap.find('#zjx').val()
      , jcqName = wrap.find('#jcqm').val()
      , jcqDes = wrap.find('#jcqms').val()
      , kxsV = wrap.find('#kxs').val()
      , dxsV = wrap.find('#dxs').val()
      , xdybpzChannel = xdybpzCont.attr('data-channel')
    
    if( !(voidCheck(gnm) && voidCheck(jcqAdd) && voidCheck(jcqLength) && voidCheck(zjxV) && voidCheck(jcqName) && voidCheck(jcqDes) && voidCheck(kxsV) && voidCheck(dxsV)) ){
        alert('每栏必填'); 
    } else if(!checkRanges(jcqAdd)) {
        alert('寄存器地址必须1到255'); 
    } else if(!(numberCheck(zjxV) && numberCheck(kxsV) && numberCheck(dxsV))) {
        alert('字节序、K系数、D系数必须为数字'); 
    } else if(!(jcqLength <= 4)) {
        alert('寄存器长度必须小于等于4'); 
    } else {
        demand.start({data:{cmd: 37,channel: xdybpzChannel, slaveaddr: slaveAddr.text().trim(),funcode: gnm,type: 1,oldregaddr: jcqAdd, regaddr: jcqAdd,regnum: jcqLength,dataformat: zjxV,regname: jcqName,regdes: jcqDes,K: kxsV,D: dxsV},done: function(){cmd37AddDone(gnm,jcqAdd,jcqLength,zjxV,jcqName,jcqDes,kxsV,dxsV)}})
    }
}

function xdybpzListAdd() {
   if(!alreadyFlag) alert('请先保存')
   else {
       var $this = $(this)
         , wrap = $this.parents('#xdybpzCont') 
         , xdybpzsbmcV = wrap.find('#xdybpzEquName').val() 	
         , xdybpzsbdzV = wrap.find('#xdybpzEquAddr').val() 
         , xdybpzChannel = xdybpzCont.attr('data-channel')

        if(!(voidCheck(xdybpzsbmcV) && voidCheck(xdybpzsbdzV))) {
            alert('设备名称和设备地址不能为空'); 
        } else if(!checkRanges(xdybpzsbdzV)) {
            alert('设备地址必须为1-255'); 
        } else {
            demand.start({data:{cmd: 33,channel: xdybpzChannel, type: 1,oldslaveaddr: xdybpzsbdzV, slaveaddr: xdybpzsbdzV,slavename: xdybpzsbmcV},done:function(){cmd33AddDone(xdybpzsbmcV,xdybpzsbdzV)}})
        }
    }
}
// 删除下端仪表配置列表项目
function xdybpzContDel() {
    var $this = $(this)
      , xdybpzChannel = xdybpzCont.attr('data-channel')
      , xdybpzsbmcV = $this.find('.slave-name-val').text().trim() 	
      , xdybpzsbdzV = $this.find('.slave-addr-val').text().trim()
      , li = $this.parent('li') 
      , xdybpzChannel = xdybpzCont.attr('data-channel')
    if(!alreadyFlag) { /*alert('请先保存')*/ } // 无须提示，但需判断
    else {
       if(!li.hasClass('active')) return
       else { 
            demand.start({data:{cmd: 33,channel: xdybpzChannel, type: 2,oldslaveaddr: xdybpzsbdzV, slaveaddr: xdybpzsbdzV,slavename: xdybpzsbmcV},done:function(){cmd33DelDone(li)}})
       }
    }
}
// 下端仪表配置的编辑
function xdybpzEdit() {
        var $this = $(this)
        oldTableRegaddr = $this.parent('td').siblings('td:eq(1)').text();
        if(!alreadyFlag) alert('请先保存')
        else {
            $this.siblings('.xdybpzSave').removeClass('hide').end().addClass('hide')
            $this.parents('tr').find('td').slice(1,8).attr('contenteditable','true').css('background-color','pink');
            alreadyFlag = false
        }
} 
// 下端仪表配置的保存
function xdybpzSave() {
    var $this = $(this)
      , td = $this.parents('tr').find('td')
      , v0 = td.eq(0).text()
      , v1 = td.eq(1).text()
      , v2 = td.eq(2).text()
      , v3 = td.eq(3).text()
      , v4 = td.eq(4).text()
      , v5 = td.eq(5).text()
      , v6 = td.eq(6).text()
      , v7 = td.eq(7).text()
      , xdybpzChannel = xdybpzCont.attr('data-channel')
    if( !( voidCheck(v1) && voidCheck(v2) && voidCheck(v3) && voidCheck(v4) && voidCheck(v5) && voidCheck(v6) && voidCheck(v7)) ){
        alert('每栏必填'); 
    } else if(!checkRegADDRRanges(v1)) {
        alert('寄存器地址必须0到255'); 
	} else if(!(validateRealNum(v6) && numberCheck(v7))) {
        alert('字节序、D系数必须为整型数字，K系数为实数'); 
    } else if(!(v2 <= 4)) {
        alert('寄存器长度必须小于等于4'); 
    } else {
    demand.start({data:{cmd:37,channel:xdybpzChannel,slaveaddr:slaveAddr.text().trim(),funcode:v0,type:3,oldregaddr: oldTableRegaddr, regaddr: v1,regnum: v2,dataformat: v3,regname: v4,regdes: v5,K: v6,D: v7 },done:function(){cmd37SaveDone($this)}})
    }
}
// 下端仪表配置的保存
function xdybpzDel() {
    
    var $this = $(this)
      , wrap = $this.parent('td')
      , gnm =  wrap.siblings('td:eq(0)').text()
      , jcqAdd = wrap.siblings('td:eq(1)').text()
      , jcqLength = wrap.siblings('td:eq(2)').text()
      , jzxV = wrap.siblings('td:eq(3)').text()
      , jcqName = wrap.siblings('td:eq(4)').text()
      , jcqDes = wrap.siblings('td:eq(5)').text()
      , kxsV = wrap.siblings('td:eq(6)').text()
      , dxsV = wrap.siblings('td:eq(7)').text()
      , xdybpzChannel = xdybpzCont.attr('data-channel')
      demand.start({data:{cmd:37,channel:xdybpzChannel,slaveaddr:slaveAddr.text().trim(),funcode: gnm,type: 2,oldregaddr: jcqAdd, regaddr: jcqAdd,regnum: jcqLength,dataformat: jzxV,regname: jcqName,regdes: jcqDes,K: kxsV,D: dxsV},done:function(){cmd37DelDone($this)}})

}

// 重启
function rebootBtn() {
    demand.start({data:{cmd:50},done:cmd50Done})
}
// change password
function changePWBtn() {
    oldPWV    = oldPW.val().trim()
    usernameV = username.val().trim()
    passwordV = password.val().trim()
    againPWV  = againPW.val().trim()

    if(!voidCheck(usernameV)) alert('用户名不能为空')    
    else if(!checkPW(passwordV)) alert('新密码必须有数字有字母，最小6位，最大15位')
    else if(!checkSame(passwordV,againPWV)) alert('密码必须一致')
    else demand.start({data:{cmd:3,user:usernameV,oldpassword:oldPWV,newpassword:passwordV},done:cmd3Done})
}
function cmd3Done(data) {
    switch(data.status) {
        case 0: alert('修改成功'); username.val(''); password.val(''); oldPW.val(''); againPW.val(''); break // clear up input
        case 1: alert('用户名错误'); break
        case 2: alert('原密码错误'); break
    }
}
// login
$(doc).on('click','#loginBtn',login)
function login() {
    var $this = $(this)
      , loginUsernameV = loginUsername.val().trim() 
      , loginPasswordV = loginPassword.val().trim()

    if(!voidCheck(loginUsernameV)) alert('用户名不能为空')
    else if(!voidCheck(loginPasswordV)) alert('密码不能为空')
    else {
        createCookie(loginUsernameV,'login',0.1) // set 1 hour expires
        demand.start({data: {cmd: 1, user:loginUsernameV, password:loginPasswordV},done:cmd1Done})
    }
}
// hide login box if has cookie
if(!(readCookie(loginUsername.val().trim()) === null)) loginSetting() 

function loginSetting() {
    showCont('#siteWrapper',loginBox); $('#siteUsername').text(loginUsername.val().trim()); 
}
function cmd1Done(data) {
    switch(data.status) {
        case 0: loginSetting(); break
        case 1: alert('用户名错误'); break
        case 2: alert('密码错误'); break
    }
}
// logout
$(doc).on('click','#siteLogout',logout)
function logout() {
    eraseCookie(loginUsername.val().trim()) 
    loginBox.removeClass('hide').siblings('#siteWrapper').addClass('hide')
    loginUsername.val('') && loginPassword.val('')
}

// 端口配置 DHCP
$(doc).on('click', dhcpS, dhcpSelect)
function dhcpSelect() {
     $('#dhcpsele option:selected').each(function(){
        var $this = $(this)
        if($this.val() == 0) {
           beEdited(1,ipV,maskV,gatewayV)
        } else {
           beEdited(0,ipV,maskV,gatewayV)
        }
     })  
}
function beEdited() {
    // 1 is edited, 0 is unedited
    var v = Array.prototype.shift.call(arguments)
    if(v == 1) for(var i = 0, l = arguments.length; i < l; i++) arguments[i].attr('contenteditable','true').css('background-color','pink')
    else for(var i = 0, l = arguments.length; i < l; i++) arguments[i].attr('contenteditable','false').css('background-color','#fff')
}
// cookie
function createCookie(name, value, days) {
    var expires

    if(days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = '; expires=' + date.toGMTString();
    } else {
        expires = '';
    }
    doc.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value) + expires + '; path=/';
}
function readCookie(name) {
    var nameEQ = encodeURIComponent(name) + '='
      , ca = doc.cookie.split(';')
    for(var i = 0, l = ca.length; i < l; i++) {
        var c = ca[i]
        while(c.charAt(0) === ' ') c = c.substring(1, c.length);
        if(c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length)); // just return value
    }
    return null;
}
function eraseCookie(name) {
    createCookie(name, '', -1)
}
//createCookie('test','lala1',1)
//console.log('test'.length)
//console.log(doc.cookie.split(';')[0].substring(4))
//console.log(readCookie('test111'))
//localStorage.setItem('bar','foo')
//console.log(localStorage.getItem('bar'))


// REG 
function checkSame(text1,text2) {
   return (text1 == text2) ? true : false 
}
function checkPW(text) {
    var regex = /(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,15})$/;
    if(!regex.test(text) || text.length == 0) {
        return false;
    }
    return true;
}
function checkRanges(text) {
    var regex = /^([1-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])$/;
    if(!regex.test(text) || text.length == 0) {
        return false;
    }
    return true;
}

function checkRegADDRRanges(text) {
    var regex = /^([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])$/;
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
function validateRealNum(val) {
    var patten = /^-?\d+\.?\d*$/;
    return patten.test(val);
}
}(document,window));
