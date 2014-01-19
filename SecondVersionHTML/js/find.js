(function(){
    var fwbStartButton = $('.fwbStartButton');

    fwbStartButton.bind('click', function(e){
        var self = $(this);
        e.preventDefault();
        self.parents('.fwbWrap').fadeOut();
    });
})();
