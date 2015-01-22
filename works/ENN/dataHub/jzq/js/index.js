(function(){
// for content height
    var winHei = $(window).height()
      , conHei = winHei - 72
    $('.content').height(conHei)

    $(document).on('click','.content-left li',sidebarSel)
    $(document).on('click','.head-left li',navSel)
}());
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
       n navSel() {
        34     var $this = $(this)

       th.eq(2).text('状态') 
    } else {
       th.eq(0).text('项目') 
       th.eq(1).text('端口') 
       th.eq(2).text('状态') 
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

