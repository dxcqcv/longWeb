jQuery(function($){
function Slider(container, nav, tickerButton) {
    this.container = container;
    this.nav = nav;
    this.imgs = this.container.find('img');
    this.imgsWidth = this.imgs[0].width;
    this.imgsLen = this.imgs.length;

    this.tb = tickerButton;

    this.current = -1;

    this.start = true;
    this.speed = 4500;
    this.max = 4;
    this.loop;

    this.timeoutID;
}

Slider.prototype.controlTicker = function(theButton) {
    var num = theButton.index();
        
    theButton.addClass('fSelected').siblings().removeClass('fSelected');

            switch(num) {
                case 0: 
                    this.container.animate({'margin-left': 0});
                    this.current = 1;
                    break;
                case 1: 
                    this.container.animate({'margin-left': -713});
                    this.current = 2;
                    break;
                case 2: 
                    this.container.animate({'margin-left': -1426});
                    this.current = 3;
                    break;
                case 3: 
                    this.container.animate({'margin-left': -2139});
                    this.current = 4;
                    break;
                case 4: 
                    this.container.animate({'margin-left': -2852});
                    this.current = 5;
                    break;
            }

};

Slider.prototype.stop = function(area) {
    var self = this;
    area.on('mouseover', function(){
        self.start = false; 
        })
        .on('mouseout', function(){
        self.start = true;
        });
};

Slider.prototype.loop = function() {

   if(this.start) {
       if(this.current < this.max) {
            this.current++;
       } else {
            this.current = 0;
       } 
       this.transition();
}

   this.timeoutID = setTimeout(function(){
            slider.loop();
            },this.speed);
};

Slider.prototype.transition = function() {
    this.container.animate({
       'margin-left': -(this.current * this.imgsWidth) 
    });
    this.tb.eq(this.current).addClass('fSelected').siblings().removeClass('fSelected');
};

Slider.prototype.setCurrent = function(dir) {
    var pos = this.current;
   
   pos += ~~(dir === 'next') || -1;
   this.current = (pos < 0) ?  (this.imgsLen - 1) : (pos % this.imgsLen);

    return pos;
};



var slider = new Slider($('.focusImgs').children('ul'), $('#slider-nav'), $('#fTicker').find('button')),
    fw = $('.focusWrap');

slider.loop();

slider.stop(fw);


slider.tb.on('click', function() {
    var $this = $(this);
    slider.controlTicker($this);
});

slider.nav.find('button').on('click', function(){
    slider.setCurrent($(this).data('dir'));
    slider.transition();
});


// for focus 
function Focus (container,ticker,width, sliderClickName, tickerClickName,showContent, showClass, infoContent) {
    this.container = container;
    this.lis = this.container.children('li');
    this.lisLen = this.lis.length;
    this.current = -1;
    this.animateTime = 500;
    this.speed = 8500;
    this.timeoutID;
    this.dir = false;
    this.start = true;
    this.ticker = ticker;
    this.tlis = this.ticker.children('li');
    this.width = width;
    this.sliderClickName = sliderClickName;
    this.tickerClickName = tickerClickName;
    this.showContent = showContent;
    this.showClass = showClass;
    this.infoContent = infoContent;
};
Focus.prototype.init = function() {
    this.place();
    this.loop();
    this.stop(this.container);
    this.stop(this.tlis);
}

Focus.prototype.next = function(index) {
   return this.current + index >=  this.lisLen ? this.current + index - this.lisLen : this.current + index; 
};
Focus.prototype.prev = function(index) {
    return this.current - index < 0 ? this.lisLen + this.current - index : this.current - index;
}
Focus.prototype.slide = function(dir) {
      this.lis.eq((dir ? this.prev(2) : this.next(2))).css('left',dir ? '-'+this.width*2+'px' : this.width*2+'px');

      this.lis.animate({
        'left': (dir ? '+' : '-') + '='+this.width+'px' 
      }, this.animateTime);
      
      this.current = dir ? this.prev(1) : this.next(1);

      this.selected(this.lis,this.sliderClickName);
      this.selected(this.tlis,this.tickerClickName);
      if(this.showContent) {
          this.selected(this.showContent,this.showClass);
          this.selected(this.infoContent,this.showClass);
      }
}
Focus.prototype.selected = function(selection, className) {
   selection.eq(this.current).addClass(className).siblings().removeClass(className); 
}
Focus.prototype.clicked = function(num){
   var self = this;
   
   if(num == 0) {
        self.current = num;
        self.lis.eq(num).animate({'left':0}).addClass(self.sliderClickName);
        self.lis.eq(num).next().animate({'left': self.width+'px'}).removeClass(self.sliderClickName);
        self.lis.eq(self.lis.length-1).animate({'left':'-'+self.width+'px'}).removeClass(self.sliderClickName);
   } else if(num == self.tlis.length-1) {
        self.current = num;
        self.lis.eq(num).animate({'left':0}).addClass(self.sliderClickName);
        self.lis.eq(0).animate({'left':self.width+'px'}).removeClass(self.sliderClickName);
        self.lis.eq(num).prev().animate({'left':'-'+self.width+'px'}).removeClass(self.sliderClickName);
   } else {
        self.current = num;
        self.lis.eq(num).animate({'left':0}).addClass(self.sliderClickName);
        self.lis.eq(num).next().animate({'left': self.width+'px'}).removeClass(self.sliderClickName);
        self.lis.eq(num).prev().animate({'left':'-'+self.width+'px'}).removeClass(self.sliderClickName);
   }

        self.tlis.eq(num).addClass(self.tickerClickName).siblings().removeClass(self.tickerClickName);
        if(self.showContent) {
            self.showContent.eq(num).addClass(self.showClass).siblings().removeClass(self.showClass);
            self.infoContent.eq(num).addClass(self.showClass).siblings().removeClass(self.showClass);
        }
}
Focus.prototype.loop = function() {
  var self = this;

  if (self.start) {

      self.slide(self.dir);
  }
      this.timeoutID = setTimeout(function() {
        self.loop();
      }, this.speed);
}

Focus.prototype.stop = function(obj) {
    var self = this;
    obj.hover(
    function() {
        self.start = false;
    },
    function() {
        self.start = true;
    })
}

Focus.prototype.place = function() {
    this.lis.eq(this.current).css('left', '0').end().eq(this.current + 1).css('left', this.width+'px').end().eq(this.current - 1).css('left', '-'+this.width+'px');
}

var focus = new Focus($('.focusImgBox'), $('.ftList'),960, 'fibBlockSelected', 'ftlbSelected');
focus.init();
focus.tlis.on('click', function(){
    var self = this;
    focus.clicked($(self).index());
}); 
focus.lis.on('click', function(){
    var self = this;
    focus.clicked($(self).index());
}); 

});
