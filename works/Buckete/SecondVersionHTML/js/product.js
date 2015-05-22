//数字控制器
//键盘按键上下控制数字加减，也可以通过传入button控制
var NumControler = function(opt){
	this.input = opt.input;
	this.add = opt.add || null;
	this.minus = opt.minus || null;
	this.init();
};
NumControler.prototype = {};
NumControler.prototype.constructor = NumControler;
NumControler.prototype.__bind__ = function(evt, el, fn, bubble){
	if("addEventListener" in el) {
		try {
        	el.addEventListener(evt, fn, bubble);
        } catch(e) {
			el.addEventListener(evt, function(e){
				fn.handleEvent.call(fn, e);
			}, bubble);
        }
    }else if("attachEvent" in el) {
		el.attachEvent("on" + evt, function(e){
			fn.handleEvent.call(fn, e);
		});
    }
};
NumControler.prototype.__keyDown__ = function(e){
	if(e.keyCode == 38 && e.type == 'keydown'){
		this.__value__('+');
	}else if(e.keyCode == 40 && e.type == 'keydown'){
		this.__value__('-');
	}
};
NumControler.prototype.__keyUp__ = function(){
	this.__value__(this.input.value);
};
NumControler.prototype.__value__ = function(n){
	this.__val__ = (this.input.value ? this.input.value : this.input.getAttribute('placeholder')).match(/\d*/g).join('');
	if(!this.__val__){
		this.__val__ = 0
	}

	if(n == '+'){
		this.__val__++;
	}else if( n == '-'){
		if(this.__val__ != 0){
			this.__val__--;
		}
	}else if(n === undefined){
		return this.__val__;
	}

	this.input.value = '$' + this.__val__;
};
NumControler.prototype.handleEvent = function(e){
	switch(e.type){
		case 'keydown':
			this.__keyDown__(e);
		case 'keyup':
			this.__keyUp__(e);
		default:
			break;
	}
};
NumControler.prototype.init = function(){
	var self = this;

	this.__val__ = this.input.getAttribute('placeholder') || 0;

	this.__bind__('keyup', this.input, this);
	this.__bind__('keydown',this.input, this);

	if(this.add){
		this.__bind__('click', this.add.dom, function(e){
			self.__value__.call(self, '+');
		});
	}
	
	if(this.minus){
		this.__bind__('click', this.minus.dom, function(e){
			self.__value__.call(self, '-');
		});
	}
};

var FrameController = function(opt){
	this.triger = opt.dom;
	this.frameHTML = opt.html;
	this.frameSRC = opt.src;
	this.wrapper = opt.dom.parents(opt.wrapper);
	this.__init__();
};

FrameController.prototype.__insertdom__ = function(){
	var html = $(this.frameHTML);
	var timestamp = new Date() * 1;

	html.attr('src', this.frameSRC + '#' + timestamp);
	html.attr('id', 'id_' + timestamp);

	html.insertAfter(this.wrapper);
	this.open = true;
	this.frame = html;
};

FrameController.prototype.__init__ = function(){
	var self = this;
	this.triger.bind('click', function(){
		if(self.open == true){
			self.frame.hide();
			self.open = false;
		}else{
			if(!self.frame){
				self.__insertdom__();
			}
			self.frame.show();
			self.open = true;
		}
	});
};

FrameController.prototype.clean = function(){
	this.frame.remove();
	this.frame = null;
};

//functional init 功能初始化
(function(){
	//调用
	new NumControler({
		input : $('#pprice')[0],
		add : {
			'dom' : $('.arrowWrap .arrowUp')[0],
			'className' : 'up_active'
		},
		minus : {
			'dom' : $('.arrowWrap .arrowDown')[0],
			'className' : 'down_active'
		}
	});

	(function(){
		$('.joinButton').each(function(i, e){
			new FrameController({
				'dom' : $(e),
				'wrapper' : '.groupBox',
				'html' : '<iframe frameborder="0" scrolling="no" height="2037" width="960"></iframe>',
				'src' : 'jawi.html'
			});
		});

		new FrameController({
			'dom' : $('.productBuy'),
			'wrapper' : '.productBlock',
			'html' : '<iframe frameborder="0" scrolling="no" height="2524" width="960"></iframe>',
			'src' : 'pwi.html'
		});

	})();

})();
