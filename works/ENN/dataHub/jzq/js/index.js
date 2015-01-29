(function(){
// for content height
    layout();
$(window).resize(function() {
    layout();
})

    $(document).on('click','.content-left li',leftNav)
    $(document).on('click','.head-nav li',topNav)

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
        var url = opt.url ? opt.url : '../../../cgi-bin/slave.cgi'
          , type = opt.type ? opt.type : 'POST' 
          , data = opt.data ? opt.data : {}
          , timeout = opt.timeout ? opt.timeout : 3000
          , currentRequest = null
          , done= opt.done ? opt.done : testSuc
          , fail = opt.fail ? opt.fail : failFn
          , arg = opt.arg
          , test = opt.test
          , self = this

//console.log(url)
            currentRequest = $.ajax({
                url: url
              , type: type    
              , timeout: timeout
              , data: data
              , dataType: 'json' // set json file type
              , mimeType: 'application/json'
              , beforeSend: function() {
                    self.loading.removeClass('hide')
                    if(currentRequest != null) currentRequest.abort()
              }
            })
            .done(function(data){
              var d = data
              self.loading.addClass('hide')
              console.log(opt.data.cmd)
              done(d)
            })
            .fail(function(xhr, textStatus){
                if(textStatus == "timeout") alert('timeout')
                fail()
            })
        }
}
var demand = new Request(); // instance for request
demand.start({url:'test.json',type:'GET',data:{cmd:11}})
demand.start({url:'test.json',data:{cmd:13}})

function testSuc(data) {console.log(data.channel)}
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
        if(this.cat !== 4) this.showCont('#sideNav','.sidebarNav') // restore nomal side bar

        switch(this.cat) {
            case 0: this.title.text('状态信息'); this.showNetSave();this.showCont('#ztxxTable', '.contWrap'); break // show default cont   
            case 1: this.title.text('端口配置'); this.showNetSave(); break   
            case 2: 
                this.title.text('下端仪表配置')
                this.subTitle.text('串口1')
                this.sideLi.first().addClass('hide') // hide net 
                this.funBtn.addClass('hide') // hide save and cannel btn

                this.actFlag && // if active is false then add active 
                this.sideLi.eq(1).addClass('active') // active second

                this.showCont('#xdybpzCont', '.contWrap')
                break  
            case 3:
                this.title.text('数据集中配置')
                this.subTitle.text('集中器')
                this.contLeft.addClass('hide')         
                this.contRight.addClass('w100')
                this.showCont('#sjjzpzCont', '.contWrap')
                break;
            case 4:
                this.title.text('系统配置')
                this.showCont('#xtpzCont', '.contWrap')
                this.funBtn.addClass('hide') // hide save and cannel btn
                this.showCont('#xtpzSideNav','.sidebarNav' ) // 显示系统配置侧导航 show xtpz side nav
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
      if(realSide !== 0) { // other pages
          if(this.cat == 2) {this.actFlag = false }// assigment false after active side bar
          this.subTitle.text('串口'+realSide)
          if(this.cat == 1) { this.showCont('#dkpzOptions', '.contWrap') }
          if(this.cat == 4) {
            switch(realSide) {
                case 1:
                    this.showCont('#reboot','.xtpzBox')                    
                    this.subTitle.text('重启集中器')
                    break
                case 2:
                    this.showCont('#changePW','.xtpzBox')
                    this.subTitle.text('修改密码')
                    break
                case 3:
                    this.subTitle.text('系统日志')
                    this.showCont('#tempBox', '.xtpzBox') // temp box
                    break
                case 4:
                    this.subTitle.text('版本信息')
                    this.showCont('#tempBox', '.xtpzBox') // temp box
                    break
            }
          }
      } else {
          this.showCont('#backupRestore','.xtpzBox')
          if(this.cat == 4) // 系统配置子导航
          this.subTitle.text('备份和恢复')
          //console.log(this.cat)
          if(this.cat == 0 || this.cat == 1) // set sub title is net when category 1 and 2
          this.subTitle.text('网络')
          if(this.cat == 1) { this.showCont('#dkpzTable', '.contWrap') }
      } 
  }
  , showCont: function(ele, others) {
       $(ele).removeClass('hide').siblings(others).addClass('hide') 
  } 
}

// instance nav
var nav = new Navigation() 

function topNav() {
   var $this = $(this)
   nav.mainNav($this);
}
function leftNav() {
    var $this = $(this)
    nav.sideNav($this); 
}

function cmd11Done(data) {
    var escape = JSON.parse(data);
    $('#webportV').data(escape.webport);
    $('#modbusportV').html(escape.modbusport);
}
function failFn() {
    console.log('error')
}
}());
/*
function mainNav() {
    var $this = $(this)
      , cat = $this.data('cat') // nav category 
      , ztxxTab = $('#ztxxTable')
      , dkpzTab = $('#dkpzTable')
    $this.addClass('active').siblings('li').removeClass('active')
    switch(cat) {
        case 0:
            ztxxTab.removeClass('hide')            
            dkpzTab.addClass('hide')            
            break
        case 1:
            ztxxTab.addClass('hide')            
            dkpzTab.removeClass('hide')            
            break
    }
    category = cat
    console.log('category is ' +category)
}
function sideNav() {
    var $this = $(this)
      , type = $this.data('type') || 0
      , pos = position ? position : $this.data('pos') // save prev pos 
      , subTitle = $('#contSubNavStat')
      , table = $('#ztxxTable') 
      , tbody = table.find('tbody#ztxxNetTbody')
      , th = table.find('th')
      , cmd11 = new Request({data:{cmd:11},done:cmd11Done,fail:failFn});// instance Request for cmd11

    $this.addClass('active').siblings('li').removeClass('active')

    if(category == null || category == 0)
    {
        if(type === 0) {
           th.eq(0).text('设备号') 
           th.eq(1).text('设备') 
        } else {
           th.eq(0).text('项目') 
           th.eq(1).text('端口') 
        }
        switch(pos) {
            case -1:
                subTitle.text('网络')
                tbody.removeClass('hide').siblings('tbody').addClass('hide')
                cmd11.start();
                break
            case 0:
                subTitle.text('串口1')
                tbody.addClass('hide').siblings('tbody').removeClass('hide')
                break
            case 1:
                subTitle.text('串口2')
                tbody.addClass('hide').siblings('tbody').removeClass('hide')
                break
            case 2:
                subTitle.text('串口3')
                tbody.addClass('hide').siblings('tbody').removeClass('hide')
                break
            case 3:
                subTitle.text('串口4')
                tbody.addClass('hide').siblings('tbody').removeClass('hide')
                break
            case 4:
                subTitle.text('串口5')
                tbody.addClass('hide').siblings('tbody').removeClass('hide')
                break
            case 5:
                subTitle.text('串口6')
                tbody.addClass('hide').siblings('tbody').removeClass('hide')
                break
            case 6:
                subTitle.text('串口7')
                tbody.addClass('hide').siblings('tbody').removeClass('hide')
                break
            case 7:
                subTitle.text('串口8')
                tbody.addClass('hide').siblings('tbody').removeClass('hide')
                break
        }
    } else if( category == 1) {

    }
    position = pos
    console.log('position is ' +position)
}



*/
