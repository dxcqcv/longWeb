(function () {
    var movementStrength = 15;

    var height = movementStrength / $(window).height();
    var width = movementStrength / $(window).width();

    $("html").mousemove(function(e) {
        
        var pageX = e.pageX - ($(window).width() / 2);
        var pageY = e.pageY - ($(window).height() / 2);

        var newvalueX = width * pageX * -1;
        var newvalueY = height * pageY * -1;

        $('h1').css({"left": newvalueX + "px", "top": newvalueY + "px"});
    });
    $(window).bind('scroll',function(e){
        console.log($(window).scrollTop());
    });
})();
