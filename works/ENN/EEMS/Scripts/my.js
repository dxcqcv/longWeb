//首页水平滚动
$.fn.extend({
    roll: function (options) {
        var defaults = {
        };
        var options = $.extend(defaults, options);
        var speed = (document.all) ? options.speed : Math.max(1, options.speed - 1);
        if ($(this) == null) return;
        var $container = $(this);
        var $content = $("#slidetxt");
        var init_left = $container.width();
        $content.css({ left: parseInt(init_left) + "px" });
        var This = this;
        var time = setInterval(function () { This.move($container, $content, speed); }, 20);

        $container.bind("mouseover", function () {
            clearInterval(time)
        });
        $container.bind("mouseout", function () {
            time = setInterval(function () { This.move($container, $content, speed); }, 20);
        });
       
        return this;
    },
    move: function ($container, $content, speed) {
        var container_width = $container.width();
        var content_width = $content.width();
        if (parseInt($content.css("left")) + content_width > 0) {
            $content.css({ left: parseInt($content.css("left")) - speed + "px" });
        }
        else {
            $content.css({ left: parseInt(container_width) + "px" });
        }
    }
});
/*****首页地图里******/

//下拉弹出
function downPopup() {
    var elem = $('.down-popup');
    if (!elem.length) return;
    elem.each(function () {
        var list = $(this).find('.list'),
			hand = $(this).find('.arr-group');
        $(this).hover(function (e) {
            if (e.type == 'mouseenter') {
                list.show();
              
            } else {
                list.hide();
               
            }
        });
        list.find('li').click(function () {
            list.hide();
           
        });
    });
}


//查询时间条件
function filterTime() {

}



function mentWidth() {
    var $w = $("#container").width();
    var $sw = $("#mright").width();
    $("#mleft").width($w - $sw - 9);
    var $lw = $("#mleft").width();
    $(".xmdetail .xm-tit .ment-table-type .list").width($lw - 40);
   
}

//历史数据查询 div 复制效果
function costAddPro() {
    var confirmBtn = $('.energyManagement-lssjcx .left-nav #confirm');
    var confirmdB = $('.energyManagement-lssjcx .left-nav #confirmdB');
    
    confirmBtn.on('click', function () {

		var addpro = $('.energyManagement-lssjcx .select-list .select-listItem');
		if (addpro.length > 2) return;
		


		var elem1 = $('.energyManagement-lssjcx .left-nav .mod-select:not("#selectsBtype") .list li'),
          //  elem2 = $('.energyManagement-lssjcx .left-nav #selectCs .list li'),
            target = $('.energyManagement-lssjcx .left-nav .select-list');
        //console.log(elem1.hasClass("cur"));

        if (!elem1.hasClass("cur")) return;

          var $sb = $("#selectSb").find(".cur").text();
          var $sc = $("#selectCs").find(".cur").text();
          var moveE = $('<div class="select-listItem">' + $sb + '-' + $sc + '<a class="remove"></a></div>');           

		   moveE.appendTo(target);

          $('.remove').bind('click', function () {
              var div = $(this).parent('.select-listItem');
              div.remove();
          });       
      });
   
    confirmdB.on('click', function () {

        var addpro = $('.energyManagement-lssjcx .select-list .select-listItem');
        if (addpro.length > 1) return;



        var elem1 = $('.energyManagement-lssjcx .left-nav .mod-select:not("#selectsBtype") .list li'),
          //  elem2 = $('.energyManagement-lssjcx .left-nav #selectCs .list li'),
            target = $('.energyManagement-lssjcx .left-nav .select-list');
        //console.log(elem1.hasClass("cur"));

        if (!elem1.hasClass("cur")) return;

       

        //运行参数对比
        var $hQ = $("#selecthQ").find(".cur").text();
        var $jC = $("#selectjC").find(".cur").text();
        var $sS = $("#selectsS").find(".cur").text();
        var $sB = $("#selectsB").find(".cur").text();
        var moveF = $('<div class="select-listItem">' + $hQ + '-' + $jC + $sS + '-' + $sB + '<a class="remove delete"></a></div>');

        moveF.appendTo(target);
        $('.remove').bind('click', function () {
            var div = $(this).parent('.select-listItem');
            div.remove();
        });
    });
   
}


function addRole() {
    var addRoleBtn = $('#pop-onupdate #addRole');
     addRoleBtn.on('click', function () {

        var addpro = $('#pop-onupdate .role-container .role-item');
      
        var elem1 = $('#xmRole .list li'),
            target = $('#pop-onupdate .role-container');

        if (!elem1.hasClass("cur")) return;
        var $role = $("#xmRole").find(".cur").text();
        var moveF = $('<a class="role-item">' + $role + '<span class="delete-role"></span></a>');

        moveF.appendTo(target);
        $('.role-item').on('click', '.delete-role', function () {

            $(this).parent('.role-item').remove();
        });
     });

   
}
 
function editSave() {
    $("#sfManagement tbody tr td .ico-op").toggle(function () {
        if ($(this).hasClass("ico-opSave")) {
            $(this).removeClass("ico-opSave").addClass("ico-opUpdate");
            $(this).parent("td").siblings("td").find(".cengZindex").removeClass("hide").end().find(".itxt").addClass("itxtNo").attr("disabled","disabled");
        }
        else {
            $(this).removeClass("ico-opUpdate").addClass("ico-opSave");
            $(this).parent("td").siblings("td").find(".cengZindex").addClass("hide").end().find(".itxt").removeClass("itxtNo").removeAttr("disabled");
        }       
    }, function () {
        if ($(this).hasClass("ico-opUpdate")) {
            $(this).removeClass("ico-opUpdate").addClass("ico-opSave");
            $(this).parent("td").siblings("td").find(".cengZindex").addClass("hide").end().find(".itxt").removeClass("itxtNo").removeAttr("disabled");
        }
        else {
            $(this).removeClass("ico-opSave").addClass("ico-opUpdate");
            $(this).parent("td").siblings("td").find(".cengZindex").removeClass("hide").end().find(".itxt").addClass("itxtNo").attr("disabled", "disabled");
        }
    }); 
 }       
 
function addSave() {
        
}

  




$(function () {

    downPopup();//index中下拉弹出
    $('#energyRank').simSelect({
        callback: function (x) {
            //这里的x代表选中的内容
        }
    });//首页能源实时排名
    $("#slide-txt").roll({ speed: 2 });//首页水平滚动
    //mentType();//远程监测中表格弹出框 
    //mentWidth()//远程监测-项目概览中的左右宽

    $('#selectSb').simSelect({
        callback: function (x) {
            //这里的x代表选中的内容
        }
    });//选择设备

    $('#selectSuosu').simSelect({
        callback: function (x) {
            //这里的x代表选中的内容
        }
    });//项目角色

    $('#selectCs').simSelect({
        callback: function (x) {
            //这里的x代表选中的内容
        }
    });//选择参数

    $('#selecthQ').simSelect({
        callback: function (x) {
            //这里的x代表选中的内容
        }
    });//选择区
    $('#selectjC').simSelect({
        callback: function (x) {
            //这里的x代表选中的内容
        }
    });//选择机场
    $('#selectsS').simSelect({
        callback: function (x) {
            //这里的x代表选中的内容
        }
    });//选择能站

    $('#selectsB').simSelect({
        callback: function (x) {
            //这里的x代表选中的内容
        }
    });//选择设备

    $('#selectsBtype').simSelect({
        callback: function (x) {
            //这里的x代表选中的内容
        }
    });//

    $('#sfRole').simSelect({
        callback: function (x) {
            //这里的x代表选中的内容
        }
    });//身份角色

    $('#xmRole').simSelect({
        callback: function (x) {
            //这里的x代表选中的内容
        }
    });//项目角色

    $('.projectSs').simSelect({
        callback: function (x) {
            //这里的x代表选中的内容
        }
    });//

    
    $(".mod-select").simSelect({
        callback: function (x) {
            //这里的x代表选中的内容
        }
    });//
    costAddPro();
    addRole();//项目角色添加

    editSave();
    addSave();//添加保存一行
})



