(function(){
function Parallax(content,article,slidecount,contentClass,slidecountClass) {
   this.content = content;
   this.contentH = this.content.height();
   this.contentLen = this.content.length;
   this.slidecountLis = slidecount.find('li');
   this.vIndex = [];
   this.oWinTop;
   this.article = article;
   this.contentClass = contentClass;
   this.slidecountClass = slidecountClass;
}
Parallax.prototype.init = function() {
   var self = this;
   self.article.css('height', self.contentH*self.contentLen); 
   self.index();
   $(window).scroll(function(){
       self.scroll();
   });
}
Parallax.prototype.index = function() {
    var self = this;
    self.content.each(function(){
       var $this = $(this);
       self.vIndex.push($this.index());
    });
}
Parallax.prototype.scroll = function() {
    var self = this;

    self.oWinTop = $(window).scrollTop();
    self.slidecountLis.removeClass(self.slidecountClass);
    self.content.removeClass(self.contentClass);

    if(self.oWinTop >= 0 && self.oWinTop < self.contentH) {
        self.slidecountLis.eq(self.vIndex[0]).addClass(self.slidecountClass);
        self.content.eq(self.vIndex[0]).addClass(self.contentClass);    
    } else if(self.oWinTop >= self.contentH && self.oWinTop < (self.contentH * 2)) {
        self.slidecountLis.eq(self.vIndex[1]).addClass(self.slidecountClass);
        self.content.eq(self.vIndex[1]).addClass(self.contentClass);    
    } else {
        self.slidecountLis.eq(self.vIndex[2]).addClass(self.slidecountClass);
        self.content.eq(self.vIndex[2]).addClass(self.contentClass);    
    }
}
var whyParallax = new Parallax($('.content'),$('.article'),$('.slidecount'),'content-focus','focus');
whyParallax.init();
/*
    var oWinTop;
    var oContentH = $('.content').height();
    var oContentLen = $('.content').length;
    var vIndex = 0;
    $('.article').css('height', oContentH*oContentLen);
    $('.content:eq('+vIndex+')').addClass('content-focus');

    $(window).scroll(function(){
    parallax();
        oWinTop = $(window).scrollTop();
        $('.slidecount li').removeClass('focus');
        $('.content').removeClass('content-focus');
        if(oWinTop >= 0 && oWinTop < oContentH) {
            vIndex = 0;
            $('.slidecount li:eq('+vIndex+')').addClass('focus');
            $('.content:eq('+vIndex+')').addClass('content-focus');
        } else if(oWinTop >= oContentH && oWinTop < (oContentH * 2)) {
            vIndex = 1;
            $('.slidecount li:eq('+vIndex+')').addClass('focus');
            $('.content:eq('+vIndex+')').addClass('content-focus');
        } else {
            vIndex = 2;
            $('.slidecount li:eq('+vIndex+')').addClass('focus');
            $('.content:eq('+vIndex+')').addClass('content-focus');
        }
    });

    $('.slidecount li').click(function() {
        if($(this).index() == 0) {
            $('body').animate({
                scrollTop:$('#first').offset().top
            },500);
            return false;
        } else if($(this).index() == 1) {
            $('body').animate({
                scrollTop:$('#second').offset().top
            },500);
            return false;
        } else if($(this).index() == 2) {
            $('body').animate({
                scrollTop:$('#third').offset().top
            },500);
            return false;
        }
    });
    function parallax() {
        var toped = $(window).scrollTop();
        $('.section-1').css({top:(0-(toped*1.75))+'px'});
        $('.section-2').css({top:(0-(toped*0.35))+'px'});
        $('.section-3').css({top:(0-(toped*1.35))+'px'});
    }
    parallax();
    */
})();
