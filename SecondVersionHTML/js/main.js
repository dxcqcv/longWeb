$(function () {
    window.Global = {};
    
    //for csrf
    $.ajaxSetup({
        crossDomain: false,
        beforeSend: function (xhr, settings) {
            function csrfSafeMethod(method) {
                return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
            }
            if (!csrfSafeMethod(settings.type)) {
                xhr.setRequestHeader("X-CSRFToken", $.cookie("csrftoken"));
            }
        }
    });

    $.fn.scrollTo = function(x, duration){
        x = x || 0;
        duration = duration || 500;
        $("html,body").animate({scrollTop:$(this).offset().top + x}, duration);
    };

    // for scroll to top
    $.fn.scrollToTop = function() {
        $(this).hide().removeAttr("href");
        if($(window).scrollTop() > "500"){
            $(this).fadeIn("slow");
        }
        var scrollDiv = $(this);
        $(window).scroll(function() {
            if($(window).scrollTop() > "500"){
                $(scrollDiv).fadeIn("slow");
            } else {
                $(scrollDiv).fadeOut("slow");
            }
        });
        $(this).click(function() {
            $("html, body").animate({
                scrollTop: 0
            }, "slow");
        });
    }
    $("#scrollToTop").scrollToTop();


    // for contact us
    $(function () {
        $('.contact-choice').click(function () {
            $(this).toggleClass('contact-checked','contact-unchecked');
        });
    });
    // for index button
    $('.switchButton').toggle(function(){
        $(this).removeClass('indexBought').addClass('indexWant');
        $('.boughtWords').removeClass('boughtColor');
        $('.wantWords').addClass('wantColor');
        $('.wantOrBought').removeClass('boughtSign').addClass('wantSign');
        $('.wantOrBought').each(function(){
            $(this).html($(this).data("want"));
        });

    }, function(){
        $(this).removeClass('indexWant').addClass('indexBought');
        $('.wantWords').removeClass('wantColor');
        $('.boughtWords').addClass('boughtColor');
        $('.wantOrBought').removeClass('wantSign').addClass('boughtSign');
        $('.wantOrBought').each(function(){
            $(this).html($(this).data("bought"));
        });
    });


    //for serialize numbers
    $('.wantCompareDetail').on("click", function(){
        $('#sn02').animate({opacity: 1});
    });
    $('.wantMode').on("click", function(){
        $('#sn02').animate({opacity: 1});
        $('#sn03').animate({opacity: 1});
    });
    $('.wantShipping').on("click", function(){
        $('#sn02').animate({opacity: 1});
        $('#sn03').animate({opacity: 1});
        $('#sn04').animate({opacity: 1});
    });
    $('.wantPayment').on("click", function(){
        $('#sn02').animate({opacity: 1});
        $('#sn03').animate({opacity: 1});
        $('#sn04').animate({opacity: 1});
        $('#sn05').animate({opacity: 1});
    });

    // for index words
    var first = $($('.indexWords')[0]),
        second = $($('.indexWords')[1]);

    function loopWords() {
        if(second.hasClass('hide')){
            first.fadeOut('slow');
            second.fadeIn('slow').removeClass('hide');
        } else {
            first.fadeIn('slow');
            second.fadeOut('slow').addClass('hide');
        }
        setTimeout(function(){
            loopWords();
        }, 60000);
    };

    loopWords();

    // for index news list
    var indexNewsList = $('.indexListNews');

    // for setting
    $('.tab_btn').click(function(){
        var index = $('.tab_btn').index(this);
        $(this).addClass('current').siblings().removeClass('current');
        $('.tab_content').removeClass('current');
        $($('.tab_content')[index]).addClass('current');
        return false;
    });
    $('.seller_info_eidt').click(function(){
        $('.seller_info_list .hide').toggle();
        $('.seller_info_list .seller_info_list_value').toggle();
    });
    $('.inventory_management .edit').click(function(){
        $('span',this).hide();
        $('input',this).show();
    });
    $('.inventory_management input').blur(function(){
        $(this).siblings.show();
        $('this').hide();
    })

    // for setting add card
    var settingCreateCard = $('.settingCreateCard');
    $('.settingAdd').on(
        "mouseenter", function(){
            settingCreateCard.fadeIn('slow').removeClass('hide');
        }
    );

    // for setting edit
    $('.settingEdit').on('mouseenter', '.settingBlock', function(){
        var $this = $(this),
            val = $this.find('.settingValue').text(),
            uinInput = $this.find('.settingEditInput');
            uinInput.attr("value", val);

        $this.find('.settingEditButton').fadeIn('slow').click(function(){
            $this.find('.settingValue').fadeOut();
            $this.find('.settingEditInput').fadeIn('slow');
        });
    });
    $('.settingEdit').on('mouseleave', '.settingBlock', function(){
        $(this).find('.settingEditButton').fadeOut('slow');
    });

    // for pull down menu
    var pdmContentsInner = $('.pdmContentsInner'),
    pdmContents = $('.pdmContents');
    $('.pdmIcon').click(function(){
        var $this = $(this);
        $this.parent().siblings('.pdmContents').fadeIn('slow');
        $this.parents('.item').siblings('.item').find('.pdmContents').hide();
    } );
    pdmContentsInner.on('click', 'li', function(){
    $(this).parents('.pdmContents').siblings('.pdmBox').find('.pdmWords').html($(this).text());
    });
    pdmContents.on('mouseleave', function(){
    $(this).fadeOut('slow');
    });


    // for setting page my inventory tab
    var $sf=$('#settingForm');
    $sf.find('span.sfInput').click(function(){
        $(this).removeClass().addClass('sfInput sf_selected')
            .siblings('span').removeClass().addClass('sfInput sf_noSel');
    });
    // for want page scroll top element
    $(window).scroll(function(e){
        var wantTop = $('.serializeNum'),
            serializeNumShadow = $('.serializeNumShadow');
        if($(this).scrollTop() > 60 ){
            wantTop.addClass('scrollSerializeNum');
            serializeNumShadow.removeClass('hide');
        } else {
            wantTop.removeClass('scrollSerializeNum');
            serializeNumShadow.addClass('hide');
        }
    });

    // for global message
    $('.alert').delay(4500).slideUp();

    // for login
    var searchBar = $('.searchBar'),
        registerBox = $('.registerBox'),
        loginBox = $('.loginBox'),
        signupBox = $('.signupBox'),
        rClose = $('.rClose'),
        loginForm = $('#loginForm'),
        signupForm = $('#signupForm'),
        sendEmail = $('.sendEmail'),
        signupButton = $('.signupButton');

    $('input[name="login"], input[name="password"]').bind('input', function(){
        loginBox.find('p.loginWarning').hide();
    });

    var submitLogin = function(){
        var data = {};
        if($('.rememberIcon').hasClass('rememberIcon02')){
            data['remember'] = 'on';
        }
        data['login'] = $.trim($('input[name="login"]').val());
        data['password'] = $('input[name="password"]').val();
        data['remember'] = !$('.remember span.rememberIcon').hasClass('rememberIcon02') ? false : true;
        data['csrfmiddlewaretoken'] = $.cookie('csrftoken') || '';

        $.ajax({
            url : '/account/login/ajax/',
            method : 'POST',
            data : data,
            success : function(data){
                if(data.code == 0){
                    renderLogin(data);
                }else{
                    loginBox.find('p.loginWarning').show();
                    loginBox.find('p.loginWarning')[0].innerText = 'Incorrect password';
                }
            }
        });
    };

    var submitSignup = function(){
        var data = {};
        var map = {
            'username' : 'p.usernameWarning',
            'email' : 'p.emailWarning'
        };

        data['email'] = $.trim($('#signEmail').val());
        data['username'] = $.trim($('#signName').val());
        data['password1'] = $('#signPsw').val();
        data['password2'] = $('#signPsw2').val();
        data['csrfmiddlewaretoken'] = $.cookie('csrftoken') || '';

        if(!$('.signupStatementRight').hasClass('rImg01')){
            ToolTip('please agree the statement before sign up.','warning');
            return;
        }

        if(!data['password1'] && !data['username'] && !data['password2'] && !data['email'] && !signupForm.submitLock){
            return false;
        }

        signupForm.submitLock = true;
        $.ajax({
            url : '/account/signup/ajax/',
            method : 'POST',
            data : data,
            success : function(data){
                if(data.code == 0){
                    //build new HTML
                    signupBox.slideToggle();
                    renderLogin(data);
                }else if(data.code == -1){
                    var error = data.errors;
                    if(error){
                        for(i in error){
                            if(map[i]){
                                $(map[i]).text(error[i][0]).show();
                            }
                        }   
                    }
                }
                signupForm.submitLock = false;
            }
        });
    };

    window.needLogin = function(callback){
        if(window.Global.isLogin){
            callback();
        }else{
            if(signupBox.is(':visible')){
                signupBox.slideUp();
            }
            if(loginBox.is(':visible')){
                loginBox.scrollTo();       
            }
            loginBox.slideDown();
        }
    };

    var renderLogin = function(data){
        var json = data.data;
        var message =  json.messages ? json.messages[0] : false;
        var hMenu = $('.hMenu'),
            userAccountTopArrow = $('.userAccountTopArrow');

        window['Global']['isLogin'] = true;

        $('.searchBar').html('<li class="left login-username"> ' +
        '<div class="hMenu">' +
            '<p class="greettingWords"><img class="userAccountAvatar" src="' + json.gravatar_url + '"alt="" /><span class="usersName">'+ json.username +'</span><span class="userAccountTopArrow"></span></p>' +
            '<a  class="userAccountInstruct hide usersAccountIcon" href="'+ json.my_account_url +'">My account</a>' +
            '<a class="userAccountInstruct hide usersLogout" href="/account/logout/?next=/">Sign out</a>'+
        '</div>' +
        '</li>');

        hMenu.on({
            mouseenter: function(){
                userAccountTopArrow.addClass('userAccountTopArrowDown');
            },
            mouseleave: function(){
                userAccountTopArrow.removeClass('userAccountTopArrowDown');
            }
        });
        if(message) new ToolTip(message.message ,message.tags);
        signupBox.is(':visible') && signupBox.slideUp() && rClose.hide();
        loginBox.is(':visible') && loginBox.slideUp() && rClose.hide();
    };

    var Verifier = {
        'methods' : {
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
        },
        'bindVerify' : function(form, opt){
            var target = opt.dom;
            var type = opt.type;
            var callback = opt.callback;
            var eventType = opt.eventType;
            var warning = opt.warning;
            var Methods = Verifier.methods;

            var verifier = function(e){
                var verify = Methods[type];
                var val;

                if(target.length > 1 && target[0].tagName != 'form'){
                    statusChange(target, target[0].val() == target[1].val() && verify(val), warning);
                }else{
                    val = target.val();
                    if(!val){
                        statusChange(target, false, warning);
                    }else{
                        statusChange(target, verify(val), warning);
                    }
                }
            }
            var statusChange = function(elem, status, warning){
                elem = elem.length > 1 ? $(elem[0]) : elem;

                var target = elem.parent().find('span.rYoN');
                var className = status ? 'rYes' : 'rNo';
                var display =  status ? 'none' : 'block';
                var warningDom = elem.parent().find('.regWarning');

                target.removeClass('rNo rYes');
                target.addClass(className);
                warningDom.text(warning).css('display', display);
                callback && callback(elem, status);
            }

            if(form && eventType == 'submit'){
                form.bind(eventType, verifier)
            }else{
                for(var i = 0; i < target.length; i++){
                    $(target[0]).bind(eventType, verifier);    
                }                
            }
        },
        'init' : function(form, verifyList){
            for(var i = 0; i < verifyList.length; i++){
                Verifier.bindVerify(form, verifyList[i]);
            }
        }
    };
    
    $('.signupStatementRight').click(function(){
        $(this).toggleClass('rImg01')
    });

    $('.rememberBox').click(function() {
        $('.rememberIcon').toggleClass('rememberIcon02');
    });

    Verifier.init(signupForm, [{
        dom : $('#signName'),
        type : 'verifyName',
        eventType : 'input blur',
        warning : 'Your username should begin with a letter and between 5 to 15 letters'
    },{
        dom : $('#signEmail'),
        type : 'verifyEmail',
        eventType : 'input blur',
        warning : 'Your email addrass is invalid'
    },{
        dom : [$('#signPsw2'), $('#signPsw')],
        type : 'verifyPassword',
        eventType : 'input blur',
        warning : 'Passwords do not match'
    }]);

    

    $('button.signupButton').on('click',function(e){
        event.preventDefault();
        signupForm.submit()
    });
    $('button.loginButton').on('click', function(e){
        event.preventDefault();
        loginForm.submit()
    });

    $('.searchBar li.login').on('click', function(){
        rClose.show();
        if(!(loginBox.is(':hidden') && signupBox.is(':hidden'))) {
            rClose.hide();
        } 
        if(signupBox.is(':visible')){
            signupBox.slideUp();
            rClose.show();
        }
        loginBox.slideToggle();
    });

    rClose.on('click', function() {
            signupBox.slideUp();
            loginBox.slideUp();
            $(this).fadeOut();
    } );        

    $('.searchBar li.sign').on('click', function(){
        rClose.show();
        if(!(loginBox.is(':hidden') && signupBox.is(':hidden'))) {
            rClose.hide();
        }
        if(loginBox.is(':visible')){
            loginBox.slideUp();
            rClose.show();
        }
        signupBox.slideToggle();
    });

    loginForm.on('submit', submitLogin);
    signupForm.on('submit', submitSignup);

    window['Global']['isLogin'] = ($('.searchBar li.unlogina').length == 0);
});

 //for cookie
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as anonymous module.
        define(['jquery'], factory);
    } else {
        // Browser globals.
        factory(jQuery);
    }
}(function ($) {
    var pluses = /\+/g;
    function encode(s) {
        return config.raw ? s : encodeURIComponent(s);
    }
    function decode(s) {
        return config.raw ? s : decodeURIComponent(s);
    }
    function stringifyCookieValue(value) {
        return encode(config.json ? JSON.stringify(value) : String(value));
    }
    function parseCookieValue(s) {
        if (s.indexOf('"') === 0) {
            // This is a quoted cookie as according to RFC2068, unescape...
            s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
        }

        try {
            // Replace server-side written pluses with spaces.
            // If we can't decode the cookie, ignore it, it's unusable.
            // If we can't parse the cookie, ignore it, it's unusable.
            s = decodeURIComponent(s.replace(pluses, ' '));
            return config.json ? JSON.parse(s) : s;
        } catch(e) {}
    }
    function read(s, converter) {
        var value = config.raw ? s : parseCookieValue(s);
        return $.isFunction(converter) ? converter(value) : value;
    }
    var config = $.cookie = function (key, value, options) {
        // Write
        if (value !== undefined && !$.isFunction(value)) {
            options = $.extend({}, config.defaults, options);

            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setDate(t.getDate() + days);
            }

            return (document.cookie = [
                encode(key), '=', stringifyCookieValue(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                options.path    ? '; path=' + options.path : '',
                options.domain  ? '; domain=' + options.domain : '',
                options.secure  ? '; secure' : ''
            ].join(''));
        }

        // Read

        var result = key ? undefined : {};

        // To prevent the for loop in the first place assign an empty array
        // in case there are no cookies at all. Also prevents odd result when
        // calling $.cookie().
        var cookies = document.cookie ? document.cookie.split('; ') : [];

        for (var i = 0, l = cookies.length; i < l; i++) {
            var parts = cookies[i].split('=');
            var name = decode(parts.shift());
            var cookie = parts.join('=');

            if (key && key === name) {
                // If second argument (value) is a function it's a converter...
                result = read(cookie, value);
                break;
            }

            // Prevent storing a cookie that we couldn't decode.
            if (!key && (cookie = read(cookie)) !== undefined) {
                result[name] = cookie;
            }
        }

        return result;
    };

    config.defaults = {};

    $.removeCookie = function (key, options) {
        if ($.cookie(key) === undefined) {
                return false;
        }

        // Must not alter options, thus extending a fresh object...
        $.cookie(key, '', $.extend({}, options, { expires: -1 }));
        return !$.cookie(key);
    };
}));

//JS template
// Simple JavaScript Templating
// John Resig - http://ejohn.org/ - MIT Licensed
(function(){
  var cache = {};

  this.tmpl = function tmpl(str, data){
    // Figure out if we're getting a template, or if we need to
    // load the template - and be sure to cache the result.
    var fn = !/\W/.test(str) ?
      cache[str] = cache[str] ||
        tmpl(document.getElementById(str).innerHTML) :
     
      // Generate a reusable function that will serve as a template
      // generator (and which will be cached).
      new Function("obj",
        "var p=[],print=function(){p.push.apply(p,arguments);};" +
       
        // Introduce the data as local variables using with(){}
        "with(obj){p.push('" +
       
        // Convert the template into pure JavaScript
        str
          .replace(/\"/g,'\\"')
          .replace(/\'/g,'\\')
          .replace(/[\r\t\n]/g, " ")
          .split("<%").join("\t")
          .replace(/((^|%>)[^\t]*)'/g, "$1\r")
          .replace(/\t=(.*?)%>/g, "',$1,'")
          .split("\t").join("');")
          .split("%>").join("p.push('")
          .split("\r").join("\\'")
      + "');}return p.join('');");
   
    // Provide some basic currying to the user
    return data ? fn( data ) : fn;
  };

})();

ToolTip = function(msg, tags){
    var message = msg || '';
    var tag = tags || '';
    var HEADH = $('.header-box').height();
    var win = $(window);
    var top = win.scrollTop() < HEADH ? (HEADH - win.scrollTop()) : 0;
    var html = $('<div data-alert="alert" style="display:none;position:absolute" class="alert alert-' + tags + ' fade in text-align-centered">' + 
            '<div class="alertMessage">' + 
                '<span class="sico-' + tags + '"></span>' +
                '<strong>' + message + '</strong>' +
            '</div>' +
        '</div>');
    var scrollHandle = function(e){
        if(win.scrollTop() <= HEADH){
            ToolTip.container.css({'top': '','position':'relative'});
        }else{
            ToolTip.container.css({'top': 0, 'position':'fixed'});
        }
    };
    ToolTip.container = ToolTip.container || $('<div class="container" style="position:relative;width:100%;z-index:10;"></div>').appendTo($('.header-box'));
    scrollHandle();
    ToolTip.container.append(html);
    win.bind('scroll', scrollHandle);
    html.slideDown().delay(5000).slideUp(function(){
        win.unbind('scroll');
    });
};

