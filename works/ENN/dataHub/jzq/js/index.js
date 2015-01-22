
(function(){
// for content height
    var winHei = $(window).height()
      , conHei = winHei - 72
    $('.content').height(conHei)

}());
// for test
function tt(op) { return op.tt ? op.tt : 11}

Navigation.prototype.mod = function(){
this.cat = 111
    alert(this.cat) 
};
function Navigation() {
    this.pos = null;
    this.cat = 222;
}
function MainNav() {
    Navigation.call(this)
}
MainNav.prototype = new Navigation();

function SideNav() {
    Navigation.call(this)
}
SideNav.prototye = Navigation.prototype;

    to();
function to() {

var n = new Navigation();  console.log(n); n.mod(); }

function navSel() {
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
}
function cmd11Done(data) {
    var escape = JSON.parse(data);
    $('#webportV').data(escape.webport);
    $('#modbusportV').html(escape.modbusport);
}
function failFn() {
    console.log('error')
}
function sidebarSel() {
    var $this = $(this)
      , type = $this.data('type') || 0
      , num = $this.data('num') 
      , subTitle = $('#contSubNavStat')
      , table = $('#ztxxTable') 
      , tbody = table.find('tbody#ztxxNetTbody')
      , th = table.find('th')
      , cmd11 = new Request({data:{cmd:11},done:cmd11Done,fail:failFn});

    $this.addClass('active').siblings('li').removeClass('active')

    if(type === 0) {
       th.eq(0).text('设备号') 
       th.eq(1).text('设备') 
    } else {
       th.eq(0).text('项目') 
       th.eq(1).text('端口') 
    }
    switch(num) {
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
}

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
    $(document).on('click','.content-left li',sidebarSel)
    $(document).on('click','.head-nav li',navSel)
