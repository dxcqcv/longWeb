(function(){
    var secondNav = $('.qxj-header > ul > li > ul')
    secondNav
            .addClass('qxjHide')//隐藏二级导航
            .on('mouseover',function(){
                $(this).removeClass('qxjHide').addClass('qxjBlock');
            }) 
            .on('mouseout',function(){
                $(this).removeClass('qxjBlock').addClass('qxjHide');
            }); 

    function Nav() {}
    $.extend(Nav.prototype, {
        hover: function(opt) {
            var ele = opt.ele ? opt.ele : $(this)

            ele
                .on('mouseover',function(){
                    $(this).siblings('ul').removeClass('qxjHide').addClass('qxjBlock');
                })
                .on('mouseout',function(){
                    $(this).siblings('ul').removeClass('qxjBlock').addClass('qxjHide');
                });
        }
    });
    var headerNav = new Nav()
    headerNav.hover({ele:$('.qxj-header > ul > li > a')})
    
    function autoFit() {
        var wrapper = $('#qxjYngnWrapper').width()
          , title = $('#qxjYngnTitle').width()
          , other = $('.qxjOther')
        other.width(wrapper - title)
    }
    autoFit();
    $(window).resize(function(){
        autoFit();
    });
}());
