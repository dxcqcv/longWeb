(function() {
    function Parallax(ele, speedY,speedX, outerHeight) {
        this.$window = $(window);
        this.windowHeight = this.$window.height();
        this.speedY = speedY;
        this.speedX = speedX;
        this.outerHeight = outerHeight;
        this.ele = ele;
    }
    Parallax.prototype.init = function() {
        
        var self = this;
        self.$window.bind('scroll', function(e) {
            self.update();
        });
    }
    Parallax.prototype.resize = function() {
        var self = this;
        self.$window.resize(function() {
            windowHeight = self.$window.height();
        });
    }
    Parallax.prototype.getHeight = function(ele) {
        if(outerHeight) {
            return ele.outerHeight(true); 
        } else {
            return ele.height();
        }
    }
    Parallax.prototype.update = function() {
        var self = this,
            top = self.ele.offset().top,
            firstTop = self.ele.offset().top,
            height = self.getHeight(self.ele), 
            pos = self.$window.scrollTop();
       if(top + height < pos || top > pos + self.windowHeight) {
            return;
       } 
       self.ele.css('backgroundPosition', ((firstTop - pos) * self.speedX) + "px" + " " + ((firstTop - pos) * self.speedY) + "px"); 
    }
    var hgi01 = new Parallax($('.hgIcon01'),0.6,0);
    hgi01.init();
    var hgi02 = new Parallax($('.hgIcon02'),0.6,0);
    hgi02.init();
    var hgi03 = new Parallax($('.hgIcon03'),0.6,0);
    hgi03.init();
    var hgi04 = new Parallax($('.hgIcon04'),0.6,0);
    hgi04.init();
    var hgi05 = new Parallax($('.hgIcon05'),0.6,0);
    hgi05.init();
    var hgi06 = new Parallax($('.hgIcon06'),0.6,0);
    hgi06.init();
    var hg = new Parallax($('#hGroup'),0.001,0);
    hg.init();
    var hg = new Parallax($('.hiIcon01'),0,-0.1);
    hg.init();
})();
