(function() {
    var movementStrength = 15;

    var height = movementStrength / $(window).height();
    var width = movementStrength / $(window).width();

    $(window).scroll(function(e){
        parallax();
    });
    
    function parallax() {
        var scrolled = $(window).scrollTop(),
            move = scrolled * height * -1,
            hGroup = $('.hGroup'),
            hgIcon = $('.hgIcon');
      console.log(scrolled);
       if(scrolled > 3000) {
            var oneMan = scrolled * 0.0001;

            hGroup.addClass('hFixed');
            hgIcon.css('opacity',oneMan);
       } else {
            hgIcon.css('opacity', 0); 
       }
    }

})();

