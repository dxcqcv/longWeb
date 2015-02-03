(function(){
// for content height
    layout();

$(window).resize(function() {
    layout();
})

    $(document).on('click','.content-left li',leftNav)
    $(document).on('click','.head-nav li',topNav)
    $(document).on('click', '#saveBtn', saveBtn )


function layout() {
    var winHei = $(window).height()
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
          , timeout = opt.timeout ? opt.timeout : 3000
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

        self.navShow(that) // highlight nav that is this li
        self.cat= that.index() // current cat must set before curPos
        curPos = self.pos[self.cat] || 0 // prev side pos of nav 
        self.navShow(this.sideLi.eq(curPos))
        this.changeNav()
        this.changeSide(curPos) // save side bar pos  
  }
  , navShow: function(nav) {
        nav.addClass('active').siblings('li').removeClass('active')
  }
  , sideNav: function(that) {
        var self = this
        self.side = that.index()
        self.navShow(that) // that is this li and no save 
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
                break;
            case 4:
                this.title.text('系统配置')
                showCont('#xtpzCont', '.contWrap')
                this.funBtn.addClass('hide') // hide save and cannel btn
                showCont('#xtpzSideNav','.sidebarNav' ) // 显示系统配置侧导航 show xtpz side nav
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
                this.actFlag = false// assigment false after active side bar
                demand.start({data:{cmd:31,channel:realSide},done:cmd31Done})
                xdybpzCont.attr('data-channel',realSide) // set xdybpz channel
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
  , baudrate = $('#baudrate')
  , databit = $('#databit')
  , stopbit = $('#stopbit')
  , paritybit = $('#paritybit')
  , slaveName = $('#slaveName')
  , slaveAddr = $('#slaveAddr')

$(document).on('click', '#xdybpzList li', xdybpzInnerList)

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
    str = $this.find('.slave-addr-val').text().trim()
    slaveName.text($this.find('.slave-name-val').text().trim()) // update slave name
    nav.navShow($this) // highlight
    demand.start({data:{cmd:35,channel:xdybpzCont.attr('data-channel'),slaveaddr: str},done:cmd35Done})     
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
        + '<td><span class="xdybpzEdit mr10">编辑</span><span class="xdybpzDel">删除</span><span class="xdybpzSave hide">保存</span></td>'
        + '</tr>';
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
function cmd31Done(data) {
    var str = ''
    for(var i = 0, l = data.slave.length; i < l; i++) {
        str += '<li class="clearfix ">'
             + '<span class="left ellipsis">'+'<span class="slave-name-val">'+data.slave[i][0]+'</span>'+'-'+'<span class="slave-addr-val">'+data.slave[i][1]+'</span>'+'</span>'
             + '<span class="right">删除</span>'
             + '</li>'
    }
    $('#xdybpzList').empty().append(str)    
}
function cmd35Done(data) {
   var tbody = $('.xdybpz-cont-right').find('table').children('tbody')
     , str = ''
   slaveAddr.text(data.slaveaddr) 
// loop form
    $.each(data.funcode, function(index, value){
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
    }); 
    tbody.empty().append(str);
}
/* global ajax fn */
function failFn(jqXHR,textStatus) {
    console.log('error is ' +jqXHR.statusText)
}
function doneFn() {
    console.log('done')
}
// for save btn
function saveBtn() {
    var $this = $(this)
    $this.text('保存中')
    if($this.attr('data-save') == 'net') dhcpS.val() == 1 ? demand.start({url:'test.json',data:{cmd:17,dhcp:1},done:cmd17Done}): demand.start({url:'test.json', data:{cmd:17,dhcp:0,ip:ipV.text(),mask:maskV.text(), gateway:gatewayV.text()},done:cmd17Done}) // submit when it's net 
    else demand.start({data:{cmd:21, channel:$this.data('channel'), baudrate:baudrate.val(), databit:databit.val(), stopbit:stopbit.val(), paritybit:paritybit.val()},done:cmd21Done})
}

}());
