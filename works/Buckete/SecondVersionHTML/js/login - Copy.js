function initVerifier(input, type, callback){
	var target;

	if(Object.prototype.toString.call(input) == '[object Array]'){
		target = input[0]
	}else{
		target = input
	}

	target.bind('input blur', function(e){
		var target = this;
		var val = $(target).val();
		var verify = Methods[type];

		if(input.length > 1){
			callback(input[0].val() == input[1].val());
			return;
		}

		if(callback){
			if(!val){
				callback(false);
			}else{
				callback(verify(val));
			}
		}
	});
}

var Methods = {
	verifyName : function(val){
		var regExp = /^[a-zA-Z][0-9a-zA-Z_]{5,15}$/;
		return regExp.test(val);
	},

	verifyEmail : function(val){
		var regExp = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
		return regExp.test(val);
	},

	verifyPassword : function(val){
		var regExp = /^\w{6,}$/;
		return regExp.test(val);
	}
};

function statusChange(elem, status){
	var target = elem.parent().find('span.rYoN');
	var className = status ? 'rYes' : 'rNo';

	target.removeClass('rNo rYes');
	target.addClass(className);
}

initVerifier($('#signName'), 'verifyName', function(status){
	statusChange($('#signName'), status);
});

initVerifier($('#signEmail'), 'verifyEmail',  function(status){
	statusChange($('#signEmail'), status);
});

initVerifier($('#signPsw'), 'verifyPassword',  function(status){
	statusChange($('#signPsw'), status);
});

initVerifier([$('#signPsw2'), $('#signPsw')], 'none',  function(status){
	statusChange($('#signPsw2'), status);
});
