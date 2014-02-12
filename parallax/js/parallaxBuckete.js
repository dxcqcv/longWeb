(function() {
    var oWinTop;
    var oBoxH = $('.box').height();
    var vLen = 0;
    var vIndex = [];
    $('.slidecount li').each(function(){
        vIndex.push($(this).index());
        console.log(vIndex);
    });
    $(window).scroll(function(){
        oWinTop = $(window).scrollTop();
        /* for district */
        if(oWinTop >= 0 && oWinTop < oBoxH) {
            $('.slidecount li:eq('+vIndex[0]+')').addClass('focus').siblings('li').removeClass('focus');
        } else if (oWinTop > oBoxH && oWinTop < (oBoxH * vIndex[2])) {
            $('.slidecount li:eq('+vIndex[1]+')').addClass('focus').siblings('li').removeClass('focus');
        } else {
            $('.slidecount li:eq('+vIndex[2]+')').addClass('focus').siblings('li').removeClass('focus');
        }
    });
})();
