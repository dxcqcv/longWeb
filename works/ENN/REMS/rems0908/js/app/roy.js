var royfunction = function() {
    var 
        navButton = $('.my-nav').children('li').children('a'),
        myCont = $('.my-content')
        myShow = $('.my-show')
        mySection = $('.my-section')
        ;
        //首页导航高度
    navButton.on('click', function(){
        var indexNav = $(this).data('hight');        
        if(indexNav === 1) {
            myCont.removeClass('one-nav').addClass('two-nav');        
        } else {
            myCont.removeClass('two-nav').addClass('one-nav');        
        } 
    });
    //导航选择
    myShow.on('click', function(){
        var show = $(this).data('show');                
        $.each(mySection, function(i,k){
            var $this = $(this)
                id = $this.attr('id') 
            ;
            if(id == 'index') {
                window.location.href = 'index.html#index';
            }
            if(id == show) {
                $this.siblings('div').addClass('hide').end().removeClass('hide');
            }
        });
    });
    //封装ajax
function LocalJsonp() {
    this.loading = $('#loading');
}
$.extend(LocalJsonp.prototype, {
    start: function(opt) {
        var url = opt.url ? opt.url : 'rems-test.json'
          , type = opt.type ? opt.type : 'GET'
          , data = opt.data ? opt.data : {}
          , timeout = opt.timeout ? opt.timeout : 10000
          , currentRequest = null
          , done = opt.done ? opt.done : doneFn
          , fail = opt.fail ? opt.fail : failFn
          , jsonp = opt.jsonp ? opt.jsonp : 'callbackparam'
          , jsonpCallback = opt.jsonpCallback ? opt.jsonpCallback : ''
          , self = this;

        currentRequest = $.ajax({
            url: url
          , type: type
          , timeout: timeout
          , data: data
          , dataType: 'jsonp'
          , cache: false
          , jsonp: jsonp
          , jsonpCallback: jsonpCallback
          , crossDomain: true
          , mimeType: 'application/json'
          , contentType: 'text/plain'
          , beforeSend: function() {
                if(currentRequest != null) currentRequest.abort();
          }
        })
        .done(function(data) {
            var d = data;
            self.loading.addClass('hide');
            done(d);
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            if(textStatus == 'timeout') {}
            fail(jqXHR, textStatus, errorThrown);
        });
        //return currentRequest ;
    }
});
function Request() {
    this.loading = $('#loading')
}
$.extend(Request.prototype, {
    start: function(opt) {
        var url = opt.url ? opt.url : 'rems-test.json'
          , type = opt.type ? opt.type : 'GET'
          , data = opt.data ? opt.data : {}
          , timeout = opt.timeout ? opt.timeout : 10000
          , currentRequest = null
          , done = opt.done ? opt.done : doneFn
          , fail = opt.fail ? opt.fail : failFn
          , jsonp = opt.jsonp ? opt.jsonp : 'callbackparam'
          //, jsonpCallback = opt.jsonpCallback ? opt.jsonpCallback : '' 
          , self = this;

        currentRequest = $.ajax({
            url: url
          , type: type
          , timeout: timeout
          , data: data
          //, async : false
          , dataType: 'json'
          //, jsonp: jsonp //服务端用于接收callback调用的function名的参数  
          //, jsonpCallback: jsonpCallback//callback的function名称,服务端会把名称和data一起传递回来 
          , crossDomain: true
          //, mimeType: 'application/json'
          //, contentType: 'text/plain'
          //, xhrFields: { withCredentials: false }
          , beforeSend: function() {
                if(currentRequest != null) currentRequest.abort();
          }
        })
        .done(function(data){
            var d = data;
            self.loading.addClass('hide');
            done(d);
        })
        .fail(function(jqXHR, textStatus,errorThrown) {
            if(textStatus == 'timeout') { //alert('timeout'); 
            }
            fail(jqXHR, textStatus,errorThrown);
        });
        //return currentRequest ;
    }
});
function failFn(jqXHR, textStatus,errorThrown) { console.log('error is ' + jqXHR.statusText + ' textStatus is ' + textStatus + ' errorThrown is ' + errorThrown); }
function doneFn() { console.log('done'); }
var demand = new Request(); // 统一调用ajax
            //demand.start({url:'http://10.36.128.73:8080/reds/ds/equipState', jsonp: 'equipState',done:shenlongchengEquipStatFn});
            demand.start({url:'http://10.20.1.155:8080/rems/login',data:{username:'sundear-wq',password:'qwe123'}});
            //demand.start({url:'http://10.20.1.155:8080/rems/rest/index3.json', done:testfn});
            //demand.start({url:'http://10.20.1.155:8080/rems/rest/gislist.json ', done:testfn2});
            function testfn(data){
               console.log(data); 
            }
            function testfn2(data){
               console.log(data); 
            }
//http://10.20.1.155:8080/rems/login?username=sundear-wq&password=qwe123

};
