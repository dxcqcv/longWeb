var royfunction = function() {
    var 
        navButton = $('.my-nav').children('li').children('a'),
        myCont = $('.my-content')
        ;
    navButton.on('click', function(){
        var indexNav = $(this).data('show');        
        if(indexNav === 1) {
            myCont.removeClass('one-nav').addClass('two-nav');        
        } else {
            myCont.removeClass('two-nav').addClass('one-nav');        
        } 
    });

};
