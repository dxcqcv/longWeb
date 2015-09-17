var royfunction = function() {
    var 
        navButton = $('.my-nav').children('li').children('a'),
        myCont = $('.my-content')
        myShow = $('.my-show')
        mySection = $('.my-section')
        ;
        //首页导航高度
    navButton.on('click', function(){
        var indexNav = $(this).data('hight');        
        if(indexNav === 1) {
            myCont.removeClass('one-nav').addClass('two-nav');        
        } else {
            myCont.removeClass('two-nav').addClass('one-nav');        
        } 
    });
    //导航选择
    myShow.on('click', function(){
        var show = $(this).data('show');                
        $.each(mySection, function(i,k){
            var $this = $(this)
                id = $this.attr('id') 
            ;
            if(id == 'index') {
                window.location.href = 'index.html#index';
            }
            if(id == show) {
                $this.siblings('div').addClass('hide').end().removeClass('hide');
            }
        });
    });


};
