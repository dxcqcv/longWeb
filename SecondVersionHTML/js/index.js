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
function Focus (container) {
    this.container = container;
    this.lis = this.container.children('li');
    this.lisLen = this.lis.length;
    this.current = -1;
    this.animateTime = 500;
    this.speed = 1500;
    this.timeoutID;
    this.dir = false;
    this.start = true;
};
Focus.prototype.init = function() {
    this.place();
    this.loop();
    this.stop();
}

Focus.prototype.next = function(index) {
   return this.current + index >=  this.lisLen ? this.current + index - this.lisLen : this.current + index; 
};
Focus.prototype.prev = function(index) {
    return this.current - index < 0 ? this.lisLen + this.current - index : this.current - index;
}

Focus.prototype.slide = function(dir) {
      this.lis.eq((dir ? this.prev(2) : this.next(2))).css('left',dir ? '-1920px' : '1920px');

      this.lis.animate({
        'left': (dir ? '+' : '-') + '=960px' 
      }, this.animateTime);
      this.current = dir ? this.prev(1) : this.next(1);


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

Focus.prototype.stop = function() {
    var self = this;
    this.container.hover(
    function() {
        self.start = false;
    },
    function() {
        self.start = true;
    })
}

Focus.prototype.place = function() {
    this.lis.eq(this.current).css('left', '0px').end().eq(this.current + 1).css('left', '960px').end().eq(this.current - 1).css('left', '-960px');
}

var focus = new Focus($('.focusImgBox'));
focus.init();
/*
        var focusWrap = $('.focusWrap'),
        sliderUL = $('.focusImgs').children('ul'),
        imgs = sliderUL.find('img'),
        imgWidth = imgs[0].width, // 713
        imgsLen = imgs.length, // 5
        current = 1,
        totalImgWidth = imgsLen * imgWidth,
        fLeft = $('.fLeft'),
        fRight = $('.fRight'),   
        fTicker = $('#fTicker').find('button'),
        autoPlay = true,
        delay; 

        focusWrap.on('mousemove', function(e){
            if(e.pageX <= 700) {
            fLeft.show();
            fRight.hide();
            } else if(e.pageX > 700) {
            fRight.show();
            fLeft.hide();
            }
            clearInterval(delay);
        });
        focusWrap.on('mouseout', function() {
            autoPlay = true;
            auto();
            fLeft.hide();
            fRight.hide();
        })
        fTicker.on('click', function(){
           var $this = $(this),
               num = $this.index();
                    $this.addClass('fSelected').siblings().removeClass('fSelected');
            switch(num) {
                case 0: 
                    sliderUL.animate({'margin-left': 0});
                    current = 1;
                    break;
                case 1: 
                    sliderUL.animate({'margin-left': -713});
                    current = 2;
                    break;
                case 2: 
                    sliderUL.animate({'margin-left': -1426});
                    current = 3;
                    break;
                case 3: 
                    sliderUL.animate({'margin-left': -2139});
                    current = 4;
                    break;
                case 4: 
                    sliderUL.animate({'margin-left': -2852});
                    current = 5;
                    break;
            }

        });        
        $('#slider-nav').find('button').on('click', function(){
                var direction = $(this).data('dir'),
                loc = imgWidth;

                (direction === 'next') ? ++current : --current;

                if(current === 0) {
                current = imgsLen;
                direction = 'next';
                loc = totalImgWidth - imgWidth;
                } else if (current-1 === imgsLen) {
                current = 1;
                loc = 0;
                }

                fTicker.eq(current-1).addClass('fSelected').siblings().removeClass('fSelected');

                transition(sliderUL, loc, direction);
                });

        function transition(container, loc, direction) {
            var unit;
            if(direction && loc !== 0) {
                unit = (direction === 'next') ? '-=' : '+=';
            }

            container.animate({
                    'margin-left': unit ? (unit + loc) : loc
                    });
        }
       function loop() {
                current++;
                var direction = 'next',
                loc = imgWidth;

                if(current === 0) {
                current = imgsLen;
                direction = 'next';
                loc = totalImgWidth - imgWidth;
                } else if (current > imgsLen) {
                current = 1;
                loc = 0;
                } 
                fTicker.eq(current-1).addClass('fSelected').siblings().removeClass('fSelected');
            transition(sliderUL, loc, direction);
       }
       function auto() {
            if(autoPlay) {
                delay = setInterval(loop, 1500);
            }
            aotoPlay = false; // to avoid play over and over
       }
       auto();

*/
});
