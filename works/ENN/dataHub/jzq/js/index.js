(function(){
// for content height
    var winHei = $(window).height()
      , conHei = winHei - 72

    $('.content').height(conHei)

    $(document).on('click','.content-left li',s)
    $(document).on('click','.head-nav li',m)
    //$(document).on('click','.head-nav li',mainNav)


// for ajax 
function Request(opt) {
    this.url = opt.url ? opt.url : '../../../cgi-bin/slave.cgi';
    this.type = opt.type ? opt.type : 'GET'; 
    this.data = opt.data ? opt.data : {};
    this.timeout = opt.timeout ? opt.timeout : 3000;
    this.currentRequest = null;
    this.done= opt.done;
    this.fail = opt.fail;
    this.arg = opt.arg;
}
Request.prototype.start = function() {
        var self = this
        self.currentRequest = $.ajax({
            url: self.url
          , type: self.type    
          , timeout: self.timeout
          , data: self.data
          , beforeSend: function() {
                //$('#loading').removeClass('hide')
                if(self.currentRequest != null) self.currentRequest.abort()
          }
        })
        .done(function(data){
          $('#loading').addClass('hide')
          self.done(data)
        })
        .fail(function(xhr, textStatus){
            if(textStatus == "timeout") alert('timeout')
            self.fail()
        })
    }
function Navigation() {
    this.pos = [[0,1,2,3,4,5,6,7,8],[0,1,2,3,4,5,6,7,8],[0,1,2,3,4,5,6,7],[0],[0,1,2,3,4]];
    this.cat = 0;
    this.side = 0;
}
Navigation.prototype = {
    mainNav: function(that) {
        var self = this
          , curPos = 0 
        self.navShow(that) 

        self.cat= that.data('cat')

curPos = self.pos[self.cat][self.side]

        self.navShow($('#sideNav').find('li').eq(curPos))
       
        console.log(self.cat)
  }
  , navShow: function(nav) {
        nav.addClass('active').siblings('li').removeClass('active')
  }
  , sideNav: function(that) {
        var self = this
        self.side = that.data('side')
        self.navShow(that) 

        console.log(self.side)
  }
}

// instance nav
    var m = new Navigation() 
function m() {
   var $this = $(this)
   m.mainNav($this);
}
function s() {
    var $this = $(this)
    m.sideNav($this); 
}
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
function cmd11Done(data) {
    var escape = JSON.parse(data);
    $('#webportV').data(escape.webport);
    $('#modbusportV').html(escape.modbusport);
}
function failFn() {
    console.log('error')
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


}());

