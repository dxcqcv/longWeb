;(function(){
    var navBar = $('.navBar'),
        navBlock = $('.navBlock'),
        lbUl01 = $('.lbUl01'),
        lbUl02 = $('.lbUl02'),
        leadershipWrap = $('.leadershipWrap'),
        leadershipDetailBlock = $('.leadershipDetailBlock')
        bgImgs= $('.backgroundImgs');
    var num = bgImgs.index(),
        max = bgImgs.length - 1;

function bgRoll() {
    
    
    if(num < max) {num++;}
    else {num = 0;}
    for(var i=0; i<bgImgs.length; i++) {
       if( num === i) {
            $(bgImgs[i]).fadeIn(3000);
       } else {
            $(bgImgs[i]).fadeOut(3000);
       } 
    }
}
setInterval(bgRoll, 8000);

    navBar.on('click','li', function(){
        var $this = $(this),
            lbUl02Wrap = $('.lbUl02Wrap'),
            num = $this.index();
        $this.addClass('navBarClicked')
            .siblings().removeClass('navBarClicked');
        switch(num) {
            case 0:
                $('.navBlock01').fadeIn('slow')
                                .siblings('.navBlock').fadeOut();
                break;
            case 1:
                $('.navBlock02').fadeIn('slow')
                                .siblings('.navBlock').fadeOut();
        lbUl02Wrap.jScrollPane({ reinitialise: true});
                break;
            case 2:
                $('.navBlock03').fadeIn('slow')
                                .siblings('.navBlock').fadeOut();
                break;
            case 3:
                $('.navBlock04').fadeIn('slow')
                                .siblings('.navBlock').fadeOut();
                break;
        } 
    });

   lbUl01.on('click', 'li', function(){
        var $this = $(this),
            num = $this.index();
        switch(num) {
            case 0:
               leadershipWrap.hide();
               $('.ldb01').fadeIn('slow');
               break;
            case 1:
               leadershipWrap.hide();
               $('.ldb02').fadeIn('slow');
               break;
        }

    if(leadershipDetailBlock.is(':visible')) {
        close();
    }


   }); 

   lbUl02.on('click', 'li', function(){
        var $this = $(this),
            num = $this.index();
        switch(num) {
            case 0:
               leadershipWrap.hide();
               $('.ldb05').fadeIn('slow');
               break;
            case 1:
               leadershipWrap.hide();
               $('.ldb06').fadeIn('slow');
               break;
            case 2:
               leadershipWrap.hide();
               $('.ldb09').fadeIn('slow');
               break;
            case 3:
               leadershipWrap.hide();
               $('.ldb03').fadeIn('slow');
               break;
            case 4:
               leadershipWrap.hide();
               $('.ldb08').fadeIn('slow');
               break;
            case 5:
               leadershipWrap.hide();
               $('.ldb07').fadeIn('slow');
               break;
            case 6:
               leadershipWrap.hide();
               $('.ldb04').fadeIn('slow');
               break;
        }

    if(leadershipDetailBlock.is(':visible')) {
        close();
    }

   }); 

    function close() {
        if(leadershipDetailBlock.find('span.close').length) return;
        $('<span class=close>X</span>').prependTo(leadershipDetailBlock)
                                       .on('click', function(){
                                            leadershipDetailBlock.hide();
                                           leadershipWrap.fadeIn();
                                       });
    }

$(window).on('resize', function(){
    var center = $('html').outerWidth()/2,
        left,left02
        navBlock = $('.navBlock'),
        nav = $('.nav'),
        gbUl = $('.gbUl'),
        gLogo = $('.gLogo');

    left = center - 476;
    left02 = center - 161;
    gLogo.css('left', left);
    nav.css('left', left02);
    navBlock.css('left', left02);
    gbUl.css('paddingLeft', left);
});

})();
