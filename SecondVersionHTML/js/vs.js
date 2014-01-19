(function(){
    var vss = $('#vss'),
        vsl = $('#vsl'),
        vsSignupForm = $('.vsSignupForm'),
        vsLoginForm = $('.vsLoginForm');
    vss.on('click', function(){
      if(vsSignupForm.is(':hidden')){
        vsSignupForm.show();
        vss.addClass('vsSignup').removeClass('vsSignup02');
        vsLoginForm.hide();
        vsl.removeClass('vsLogin').addClass('vsLogin02');
      }  
    });
    vsl.on('click', function(){
      if(vsLoginForm.is(':hidden')){
        vsSignupForm.hide();
        vss.addClass('vsSignup02').removeClass('vsSignup');
        vsLoginForm.show();
        vsl.removeClass('vsLogin02').addClass('vsLogin');
      }  
    });
})();
