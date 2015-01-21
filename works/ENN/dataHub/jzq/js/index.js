
(function(){
// for content height
    var winHei = $(window).height()
      , conHei = winHei - 72
      , opt = {}
    $('.content').height(conHei)

    $(document).on('click','.content-left li',sidebarSel)
    $(document).on('click','.head-left li',navSel)
    //alert(tt({tt:22}))

// for ajax 
function Request(opt) {
    this.url = opt.url ? opt.url : '../../../cgi-bin/slave.cgi';
    this.type = opt.type ? opt.type : 'GET'; 
    this.data = opt.data ? opt.data : {};
    this.timeout = opt.timeout ? opt.timeout : 3000;
    this.currentRequest = null;

    this.start = function() {
        var self = this
        self.currentRequest = $.ajax({
            url: this.url
          , type: this.type    
          , timeout: this.timeout
          , data: this.data
          , beforeSend: function() {
                //$('#loading').removeClass('hide')
                if(this.currentRequest != null) this.currentRequest.abort()
          }
        })
        .done(function(){
          $('#loading').addClass('hide')
          opt.done()
        })
        .fail(function(xhr, textStatus){
            if(textStatus == "timeout") alert('timeout')
            alert(opt.fail(opt.arg))
        })
    }
}
Request.prototype.init = function() {
    this.start();
}

    var r = new Request({url:111,fail:tt,arg:{tt:22}});

    r.init();
}());
// for test
function tt(op) { return op.tt ? op.tt : 11}

function navSel() {
    var $this = $(this)
}
function sidebarSel() {
    var $this = $(this)
      , type = $this.data('type') || 0
      , num = $this.data('num') 
      , subTitle = $('#contSubNavStat')
      , th = $('#contentTable').find('th')
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
            break
        case 0:
            subTitle.text('串口1')
            break
        case 1:
            subTitle.text('串口2')
            break
        case 2:
            subTitle.text('串口3')
            break
        case 3:
            subTitle.text('串口4')
            break
        case 4:
            subTitle.text('串口5')
            break
        case 5:
            subTitle.text('串口6')
            break
        case 6:
            subTitle.text('串口7')
            break
        case 7:
            subTitle.text('串口8')
            break
    }
}

