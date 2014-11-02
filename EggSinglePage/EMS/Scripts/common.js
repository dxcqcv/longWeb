// for auto height
function autoHeight(total, detached, result){
   $(result).height(parseFloat($(total).outerHeight()) - parseFloat($(detached).outerHeight())); 
   $(window).resize(function(){
       $(result).height(parseFloat($(total).outerHeight()) - parseFloat($(detached).outerHeight())); 
   });
}

// tab plugin
function Tab(){
	var tabs=$('.tab');
	if(!tabs.length) return;
	tabs.find('.tab-nav a').click(function(e){
		//e.preventDefault();
	});
	tabs.each(function(){
		var navs=$(this).find('.tab-nav li:not(.no)'),
			panels = $(this).find('.tab-panel');
		
		if($(this).hasClass('tab-hover')){
			navs.mouseenter(function(){
				var index=$(this).index();
				navs.removeClass('on active').eq(index).addClass('on');
				panels.hide().eq(index).show();
			});
			return;
		};
		navs.hover(function(e){
			if(e.type=='mouseenter'){
				$(this).addClass('active');
			}else{
				$(this).removeClass('active');
			};
		}).click(function(){
			var index=$(this).index();
			navs.removeClass('on active').eq(index).addClass('on');
			panels.hide().eq(index).show();

			var inputs = tabs.find('.tab-panel').find(".nyfx-item input");
			inputs.removeAttr("checked");
		})
	})
}

$(function () {
	// 文档就绪
	Tab();
});
//全选全消
function selectToggle() {
    var selects = $('.select-item');
    if (!selects.length) return;
    selects.each(function () {
        var selectAll = $(this).children(".item-tit").find('.selectAll'),
            selectReverse = $(this).find('.selectReverse'),
            inputs = $(this).children(".item-txt").find('input'),
        inputToggle = $(this).children(".item-tit").find('.selectToggle')
        selectAll.click(function (e) {
            inputs.add(selectAll).prop('checked', true);
            _callback();
        });
        selectReverse.click(function () {
            inputs.each(function () {
                var input = $(this)[0];
                input.checked = !input.checked
            });
            _callback();
        });
        inputs.click(function () {
            _callback();
        })
        inputToggle.click(function () {
            var len = inputs.filter(':checked').length,
                size = inputs.length;
            if (size == len) {
                inputs.prop('checked', false);
            } else {
                inputs.prop('checked', true);
            };
            _callback();
        });


        function _callback() {
            var len = inputs.filter(':checked').length,
                size = inputs.length;
            if (size == 0) { return false };
            if (len == size) {
                inputToggle.prop('checked', true);
            }
            else {
                inputToggle.prop('checked', false);

            }
        }
    })
}

//默认搜索
$.fn.defaultInput=function(opts){
	this.each(function(){
		var setting={
			wrapselect:null,
			hovername:null,
			clickname:null
		};
		var dets=$.extend(true,{},setting,$(this).data(),opts),
			detVal=$(this).val(),
			wrap=dets.wrapselect,
			hoveName=dets.hovername,
			clickName=dets.clickname;

		$(this).click(function(){
			var v=$(this).val();
			if(v==detVal){
				$(this).val('');
				$(this).removeClass('empty');
			};
		}).blur(function(){
			var v = $.trim($(this).val());
			if(!v){
				$(this).val(detVal).addClass('empty');
			};
		});
		if(wrap){
			wrap=$(this).closest(wrap);
			if(hoveName){
				wrap.hover(function(e){
					if(e.type=='mouseenter'){
						$(this).addClass(hoverName);
					}else{
						$(this).removeClass(hoverName);
					}
				})
			};
			if(clickName){
				wrap.click(function(){
					$(this).addClass(clickName);
					return false;
				});
				$(document).click(function(){
					wrap.removeClass(clickName);
				});
			}
		};
	});
	return this;
}

//模拟select
$.fn.simSelect = function (opts) {
    this.each(function () {
        var setting = {
            hoverName: null,
            clickName: null,
            callback: null,
            conSelect: null,
            isBack: true,
            changeFun: null,
            handReversalClass: false,
            init: function () {
                return true;
            }
        };
        var hand = $(this).find('.hand'),
			that = $(this),
			dets = $.extend(true, {}, setting, opts),
			list = $(this).find(dets.conSelect || '.list'),
			hoveName = dets.hoverName,
			clickName = dets.clickName,
			callback = dets.callback,
			text = $(this).find('.text'),
			lis = list.find('li'),
			isAnimate = dets.isAnimate,
			changeFun = dets.changeFun,
			isBack = dets.isBack,
			handReversalClass = dets.handReversalClass;

        $(this).unbind("click").click(function () {
            if (!dets.init.call(this)) return;
            if (isAnimate && list.is(':animated')) return;
            changeFun && changeFun.call(that);

            if (list.is(':hidden')) {
                if (isAnimate) {
                    list.slideDown();
                } else {
                    list.show();
                };
                clickName && $(this).addClass(clickName);
                $(this).addClass('on');
            } else {
                _close();
            };
            return false;
        });
        lis.click(function () {
            if (!isBack) return;
            _close($(this).text(), $(this).attr('val'));
            $(this).addClass("cur no").siblings().removeClass("cur");
        })
        if (hoveName) {
            $(this).hover(function (e) {
                if (e.type == 'mouseenter') {
                    $(this).addClass(hoveName);
                } else {
                    $(this).removeClass(hoveName);
                }
            });
        };
        list.click(function () {
            return false;
        });
        if (handReversalClass) {
            _close();
        }
        function _close(x, v) {
            if (isAnimate) {
                list.slideUp();
            } else {
                list.hide();
            };
            that.removeClass(clickName);
            callback && callback.call(that, x, v);
			text.attr("val", "");
            if (x) {
                text.html(x);
			}
			if (v) {
				text.attr("val", v);
			}
            that.removeClass('on');
            if (handReversalClass && !isSupp) {
                hand.addClass('arr-group-top');
            } else {
                hand.removeClass('arr-group-top');
            };
        }
        $(document).click(function () {
            if (list.is(':visible')) {
                if (!isBack) return
                _close();
            }
        })
    });
    return this;
}

// 显示层
function ShowDiv(){
	var elem=$('.showdiv');
	if(!elem.length) return;
	var cur=false;
	elem.each(function(){
		var con=$(this).find('.showdiv-con'),
			toggle=$(this).data('toggle')||'on',
			type=$(this).data('type')||'click',
			that=$(this),
			dir=$(this).data('dir')||'bottom',
			conOffset=($(this).data('offset')||'{}').replace(/px|%/,''),
			target= $(this).data('target'),
			con= target ? $(target) : $(this).find('.showdiv-con'),
			conWidth=con.width(),
			fixed=$(this).data('fixed')||false,
			setLeft=$(this).data('left')||false,
			btn=target ? $(target).find('.showdiv-close,.btn a:not(.check)') : $(this).find('.showdiv-close,.btn a:not(.check)');
		if(setLeft){
			con.css('margin-left',-conWidth/2)
		};
		$(this)[type](function(){
			if($(this).hasClass(toggle)){
				that.removeClass(toggle);
				target && ($(target).hide());
			}else{
				that.addClass(toggle);
				if(target){
					var elemOffset=that.offset(),
						style={},
						dis=0;
					if(dir=='bottom'){
						dis=that.height();
					}else{
						dis=-$(target).outerHeight();
					}
					conOffset = (typeof conOffset === 'string') ? eval('(' + conOffset + ')') : conOffset;
					style.left = elemOffset.left;
					//style.left=elemOffset.left + that.outerWidth()/2 - con.outerWidth()/2 + (conOffset.left||0);
					style.top=elemOffset.top + dis + (conOffset.top||0);
					if(!fixed){
						con.css(style)
					}
					con.show();
				}
			};			
		}).click(function(e){
			cur=$(this)[0]
			!target && _closeOther();
			return false;
		});
		con.click(function(){
			return false;
		});
		if(btn.size()){
			btn.click(function(){
				that.removeClass(toggle);
				target && ($(target).hide());
				
			});
		};
	});
	function _closeOther(){
		elem.each(function(){
			var toggle=$(this).data('toggle')||'on',
				target=$(this).data('target');
			if($(this)[0]!==cur){
				target && ($(target).hide());
				$(this).removeClass(toggle);
			};		
		});
	};
	$(document).click(function(){
		elem.each(function(){
			var toggle=$(this).data('toggle')||'on',
				target=$(this).data('target'),
				isAuto=$(this).data('auto');
			if(isAuto==undefined){
				$(this).removeClass(toggle);
				target && ($(target).hide());
			};			
		})

	})

}

// 提示内容框，生成div
function createWell(){
	var elem=$('.wellTip');
	if(!elem.length) return;
	elem.each(function(){
		var type=$(this).data('type')||'hover',
			con=$(this).data('con'),
			clientWidth=$(this).data('width'),
			targetOffset=($(this).data('offset') || '{}').replace(/px/,''),
			targetOffset=eval("("+targetOffset+")"),
			tip=$('<div id="createWell" class="well">'+con+'</div>'),
			tipElem=$('#createWell'),
			elemOffset=$(this).offset(),
			setTimeout_elem;
		if(type=='hover'){
			$(this).hover(function(e){
				var that=$(this),
					len=$('#createWell').length;
				setTimeout_elem &&	clearTimeout(setTimeout_elem);				
				if(e.type=='mouseenter'){
					if(!len){
						tip.appendTo('body').css(_getPos()).show().width(clientWidth).data('target',$(this)[0]);
						tipAddEvent(tip);
					}else{
						var target=tip.data('target');
						if(target!==$(this)[0]){
							tip.remove();
							tip.appendTo('body').css(_getPos()).show().width(clientWidth).data('target',$(this)[0]);
							tipAddEvent(tip);
						}
					};					
				}else{
					setTimeout_elem=setTimeout(function(){
						_close();
					},100);
				};
				function tipAddEvent(elem){
					elem.mouseenter(function(){
						setTimeout_elem && clearTimeout(setTimeout_elem);
					}).mouseleave(function(){
						setTimeout_elem=setTimeout(function(){
							_close();
						},100);
					})
				}
				function _getPos(){
					var pos={},
						elemW=that.outerWidth(),
						elemH=that.outerHeight(),
						tipW=tip.width(),
						offset=that.offset();
					pos.left=that.offset().left+elemW/2-tipW/2+(targetOffset.left||0);
					pos.top=that.offset().top+elemH+(targetOffset.top||0);
					return pos;
				};
				function _close(){
					$('#createWell').remove();
				}
			});
		}

	})
}

//关闭某元素
function closeElem(){
	var elem=$('.closeElem');
	if(!elem.length) return;
	elem.each(function(){
		var target=$(this).data('target')||$(this).parent();
		$(this).click(function(){
			target.hide();
		})
	})
}

//关闭fancyBox
function closeFancybox() {
    var elem = $('.closeFancybox');
    if (!elem.length) return;
    elem.each(function () {
        $(this).click(function () {
            $.fancybox.close();
        })
    })
}

//取消默认事件
function stopDefault(){
	$('a[href=#none]').click(function(e){
		e.preventDefault();
	})
}

////导航
function topNagation() {

    $(".head .tab-panel ul li").each(function () {
        var img = $(this).attr("img");
        var hoverimg = $(this).attr("hoverimg");
        $(this).find(".ico").css("background-image", "url(" + img + ")");
        if ($(this).hasClass("on")) {
            $(this).find(".ico").css("background-image", "url(" + hoverimg + ")");
        }
    }).hover(function () {
        var hoverimg = $(this).attr("hoverimg");
        $(this).find(".ico").css("background-image", "url(" + hoverimg + ")");
    }, function () {
        var img = $(this).attr("img");
        if ($(this).hasClass("on")) {
            $(this).find(".ico").css("background-image", "url(" + hoverimg + ")");
        }
        else {
            $(this).find(".ico").css("background-image", "url(" + img + ")");
        }

    });
}


// 调用弹窗插件
function popFancybox(){
	var elem = $('.fancybox');
	if(!elem.length) return;
	elem.fancybox({
		padding:0
	});
}
$(function(){
	stopDefault();//取消默认事件
	createWell()//弹出便 出5kg提示框
	popFancybox();// 调用弹窗插件
	Tab();//tab切换
	closeElem();//关闭莫元素
	closeFancybox();//关闭fancybox

	$('.inputdefult-change').defaultInput();
	ShowDiv();//显示隐藏层
	$('#topSearch').defaultInput();//头部搜索框
	selectToggle();//全选全消
	topNagation();//导航菜单
})
/**       
 * 对Date的扩展，将 Date 转化为指定格式的String       
 * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q) 可以用 1-2 个占位符       
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)       
 * eg:       
 * (new Date()).format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423       
 * (new Date()).format("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04       
 * (new Date()).format("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04       
 * (new Date()).format("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04       
 * (new Date()).format("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18       
 */
Date.prototype.format = function (fmt) {
	var o = {
		"M+": this.getMonth() + 1, //月份           
		"d+": this.getDate(), //日           
		"h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时           
		"H+": this.getHours(), //小时           
		"m+": this.getMinutes(), //分           
		"s+": this.getSeconds(), //秒           
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度           
		"S": this.getMilliseconds() //毫秒           
	};
	var week = {
		"0": "/u65e5",
		"1": "/u4e00",
		"2": "/u4e8c",
		"3": "/u4e09",
		"4": "/u56db",
		"5": "/u4e94",
		"6": "/u516d"
	};
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	}
	if (/(E+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[this.getDay() + ""]);
	}
	for (var k in o) {
		if (new RegExp("(" + k + ")").test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		}
	}
	return fmt;
}

Date.prototype.addMonths = function (months) {
	this.setMonth(this.getMonth() + months);
	return this;
}
Date.prototype.addDays = function (days) {
	this.setDate(this.getDate() + days);
	return this;
}
Date.prototype.addHours = function (hours) {
	this.setHours(this.getHours() + hours);
	return this;
}
jQuery.extend({
	postJSON: function (url, data, callback) {
		return $.ajax({
			url: url, data: data, type: "POST", async: false, cache: false, dataType: "json", success: callback,
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				UEEPAlert($(XMLHttpRequest.responseText).filter("title").text());
			}
		});
	}
});

//修正输出数据精度
function FloatFixed(str) {
	return parseFloat(str).toFixed(2);
}
//字符串处理函数
//去头
String.prototype.trimStart = function (trimStr) {
	if (!trimStr) { return this; }
	var temp = this;
	while (true) {
		if (temp.substr(0, trimStr.length) != trimStr) {
			break;
		}
		temp = temp.substr(trimStr.length);
	}
	return temp;
};
//去尾
String.prototype.trimEnd = function (trimStr) {
	if (!trimStr) { return this; }
	var temp = this;
	while (true) {
		if (temp.substr(temp.length - trimStr.length, trimStr.length) != trimStr) {
			break;
		}
		temp = temp.substr(0, temp.length - trimStr.length);
	}
	return temp;
};
//去头尾
String.prototype.trim = function (trimStr) {
	var temp = trimStr;
	if (!trimStr) { temp = " "; }
	return this.trimStart(temp).trimEnd(temp);
};
//转换为小数，参数为保留的小数位数
String.prototype.toFloat = function (precision) {
	var str = this;
	return parseFloat(str).toFixed(precision);;
};


function UEEPAlert(msg) {
	top.jAlert(msg, "提醒");
}

function UEEPConfirm(content, callback) {
	top.jConfirm(content, '确认', callback);
}