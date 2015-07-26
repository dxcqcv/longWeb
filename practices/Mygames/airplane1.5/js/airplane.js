// JavaScript Document
$(function(){
		//屏蔽网页滚动条
		document.documentElement.style.overflow="hidden";
		//计分的全局变量
		var point=0;
		
		//发射普通子弹的函数
		var shot1=function(){
			var top=$("#plane").offset().top-10;
			var left=$("#plane").offset().left+20;
			var bullet="<div style=\"position:fixed;background-color:blue;width:10px;height:10px;top:"+top+"px;left:"+left+"px;border-radius:10px;\" class=\"bullet\" ></div>";
			$(bullet).appendTo("body").animate({top:"20px"},1000,
			function(){
				$(this).remove();
				});
		};
		//带打对角的子弹
		var shot2=function(){
			var top=$("#plane").offset().top-10;
			var left=$("#plane").offset().left+20;
			var bullet="<div style=\"position:fixed;background-color:blue;width:10px;height:10px;top:"+top+"px;left:"+left+"px;border-radius:10px;\" class=\"bullet\" ></div>";
			$(bullet).appendTo("body").animate({top:"20px"},1000,
			function(){
				$(this).remove();
				});
								
			var bullet1="<div style=\"position:fixed;background-color:blue;width:10px;height:10px;top:"+top+"px;left:"+(left-10)+"px;border-radius:10px;\" class=\"bullet\" ></div>";
			
			var t1=$("#plane").offset().top-($("#plane").offset().left-$("#battlefield").offset().left);
			
			$(bullet1).appendTo("body").animate({top:t1,left:$("#battlefield").offset().left},1000,
			function(){
				$(this).remove();
				});		
			var bullet2="<div style=\"position:fixed;background-color:blue;width:10px;height:10px;top:"+top+"px;left:"+(left+10)+"px;border-radius:10px;\" class=\"bullet\" ></div>";
			var l2=$("#battlefield").offset().left+500;
			var t2=$("#plane").offset().top-($("#battlefield").offset().left+500-$("#plane").offset().left);
			
			$(bullet2).appendTo("body").animate({top:t2,left:l2},1000,
			function(){
				$(this).remove();
				});
		};
		//三排子弹
		var shot3=function(){
			var top=$("#plane").offset().top-10;
			var left=$("#plane").offset().left+20;
			var bullet="<div style=\"position:fixed;background-color:blue;width:10px;height:10px;top:"+top+"px;left:"+left+"px;border-radius:10px;\" class=\"bullet\" ></div>";
			$(bullet).appendTo("body").animate({top:"20px"},1000,
			function(){
				$(this).remove();
				});
								
			var bullet1="<div style=\"position:fixed;background-color:blue;width:10px;height:10px;top:"+(top+20)+"px;left:"+(left-30)+"px;border-radius:10px;\" class=\"bullet\" ></div>";
			
			
			$(bullet1).appendTo("body").animate({top:"20px"},1000,
			function(){
				$(this).remove();
				});		
			var bullet2="<div style=\"position:fixed;background-color:blue;width:10px;height:10px;top:"+(top+20)+"px;left:"+(left+30)+"px;border-radius:10px;\" class=\"bullet\" ></div>";

			
			$(bullet2).appendTo("body").animate({top:"20px"},1000,
			function(){
				$(this).remove();
				});			
		}
		//变大子弹
		var shot4=function(){
			var top=$("#plane").offset().top-10;
			var left=$("#plane").offset().left+20;
			var bullet="<div style=\"position:fixed;background-color:blue;width:10px;height:10px;top:"+top+"px;left:"+left+"px;border-radius:100px;\" class=\"bullet\" ></div>";
			$(bullet).appendTo("body").animate({top:"20px",width:"100px",height:"100px"},2000,
			function(){
				$(this).remove();
				});
		};
		
		//跟踪弹
		var shot5=function(){
			var top=$("#plane").offset().top-10;
			var left=$("#plane").offset().left+20;
			var bullet="<div style=\"position:fixed;background-color:blue;width:10px;height:10px;top:"+top+"px;left:"+left+"px;border-radius:30px;\" class=\"bullet\" ></div>";
			var randomenemy=Math.round(Math.random()*$(".enemy").length);
			var e_top=$(".enemy").eq(randomenemy).offset().top+25;
			var e_left=$(".enemy").eq(randomenemy).offset().left+25;
			$(bullet).appendTo("body").animate({top:e_top,left:e_left},300,
			function(){
				$(this).remove();
				});
		};
		
		//第六种子弹
		var shot6=function(){
			var top=$("#plane").offset().top-10;
			var left=$("#plane").offset().left+20;
			var bullet="<div style=\"position:fixed;background-color:blue;width:10px;height:10px;top:"+top+"px;left:"+left+"px;border-radius:10px;\" class=\"bullet\" ></div>";
			$(bullet).appendTo("body").animate({top:"20px",left:$("#battlefield").offset().left+250 },3000,
			function(){
				$(this).remove();
				});
		};
		
		
		
			
		//吃换子弹的bonus的函数
		var changeshot=function(){
			var x=$("#battlefield").offset().left+Math.random()*450;
			var random=Math.round(Math.random()*5+1);
			var bonus="<div style=\"position:fixed;top:21px;left:"+x+"px;\" class=\"bonus\" >"+random+"</div>";	
			$(bonus).prependTo("body").animate({top:"520px"},1800,
			function(){
				$(this).remove();
			});		
		}
		
		
		//生成敌机的函数
		var newenemy=function(){
			var x=$("#battlefield").offset().left+Math.random()*450;
			var enemy="<div style=\"position:fixed;top:21px;left:"+x+"px;\" class=\"enemy\" ></div>";	
			//var r=Math.round(Math.random()*2);
			$(enemy).prependTo("body").animate({top:"520px",left:$("#battlefield").offset().left+Math.random()*450 },4000,
			function(){
				$(this).remove();
			});

		}
		//生成敌机的函数2
		var newenemy2=function(){
			var x=$("#battlefield").offset().left+Math.random()*450;
			var enemy="<div style=\"position:fixed;top:21px;left:"+x+"px;\" class=\"enemy2\" ></div>";	
			//var r=Math.round(Math.random()*2);
			$(enemy).prependTo("body").animate({top:"520px",left:$("#battlefield").offset().left+Math.random()*450 },6000,
			function(){
				$(this).remove();
			});

		}
		//enemy1敌方发射子弹的函数
		var enemyshot=function(){
			var randomenemy=Math.round(Math.random()*$(".enemy").length);		
				var top=$(".enemy").eq(randomenemy).offset().top+50;
				var left=$(".enemy").eq(randomenemy).offset().left+20;
				var bullet="<div style=\"position:fixed;background-color:red;width:10px;height:10px;top:"+top+"px;left:"+left+"px;border-radius:10px;\" class=\"e_bullet\" ></div>";

				$(bullet).appendTo("body").animate({top:"560px"},1500,
				function(){
					$(this).remove();
				});		
		}
		//enemy2敌方发射子弹的函数
		var enemyshot2=function(){	
				var top=$(".enemy2").offset().top+50;
				var left=$(".enemy2").offset().left+20;
				var bullet="<div style=\"position:fixed;background-color:red;width:10px;height:10px;top:"+top+"px;left:"+left+"px;border-radius:10px;\" class=\"e_bullet\" ></div>";
				var a_top=$("#plane").offset().top+25;
				var a_left=$("#plane").offset().left+25;
				
				
				$(bullet).appendTo("body").animate({top: a_top,left:a_left },2000,
				function(){
					$(this).remove();
				});		
		}
		
		//判断是否击中敌机的函数
		var kill=function(){
			var b_num=$(".bullet").length;
			var e_num=$(".enemy").length;		
			for(var i=0;i<b_num;i++){
				for(var j=0;j<e_num;j++){
					var bx=$(".bullet").eq(i).offset().left+$(".bullet").width()/2;
					var by=$(".bullet").eq(i).offset().top+$(".bullet").height()/2;
					var ex=$(".enemy").eq(j).offset().left+25;
					var ey=$(".enemy").eq(j).offset().top+25;
					var distance=$(".bullet").width()/2+25;		
					if(Math.abs(bx-ex)<= distance&&Math.abs(by-ey)<= distance){
						$(".bullet").eq(i).remove();
						$(".enemy").eq(j).remove();
						point+=1000;
						$("#point").html(point);
					}
				}
			}
		};
		
		//记录第二种敌人被击中次数
		var count=0;
		var kill2=function(){
			var b_num=$(".bullet").length;
			
			for(var i=0;i<b_num;i++){
	
					var bx=$(".bullet").eq(i).offset().left+$(".bullet").width()/2;
					var by=$(".bullet").eq(i).offset().top+$(".bullet").height()/2;

					var distance=$(".bullet").width()/2+25;		
					var ex2=$(".enemy2").offset().left+25;
					var ey2=$(".enemy2").offset().top+25;
					if(Math.abs(bx-ex2)<= distance&&Math.abs(by-ey2)<= distance&&$(".bullet").width()==10){
						$(".bullet").eq(i).remove();
						count++;
					}
					else if(Math.abs(bx-ex2)<= distance&&Math.abs(by-ey2)<= distance&&$(".bullet").width()>=10){
						$(".bullet").eq(i).remove();
						count+=4;
					}
			}
			if(count>=5){
					$(".enemy2").remove();
					point+=5000;
					$("#point").html(point);
					count=0;
			}
			
		}
		
		
		
	//点击开始按钮开始游戏
	$("#start").click(function(){
		$("#start").hide();
		$("#point").html(0);
		point=0;
		$("#battlefield").append("<div id=\"plane\"><img src=\"image/plane.png\" /></div>");
		//鼠标移动控制飞机
		$("#battlefield").mousemove(function(e){
				$("#plane").css("margin",0);
			if(e.pageX<=$("#battlefield").offset().left+$("#plane").width()/2){			
				$("#plane").css("left",$("#battlefield").offset().left);
			}else if(e.pageX>=$("#battlefield").offset().left+$("#battlefield").width()-$("#plane").width()/2){
				$("#plane").css("left",$("#battlefield").offset().left+$("#battlefield").width()-$("#plane").width());
			}else{
				$("#plane").css("left",e.pageX-"25");
			}		
			if(e.pageY<=$("#battlefield").offset().top+$("#plane").height()/2){
				$("#plane").css("top",$("#battlefield").offset().top);
			}else if(e.pageY>=$("#battlefield").offset().top+$("#battlefield").height()-$("#plane").height()/2){
				$("#plane").css("top",$("#battlefield").offset().top+$("#battlefield").height()-$("#plane").height());
			}else{
				$("#plane").css("top",e.pageY-"25");			
			}	
		});
		var int1=setInterval(shot1,250);
		var int2=setInterval(newenemy,450);		
		var int3=setInterval(kill,10);
		var int4=setInterval(enemyshot,800);
		var int5=setInterval(changeshot,5000);
		var int6=setInterval(newenemy2,8000);
		var int7=setInterval(enemyshot2,2000);
		var int8=setInterval(kill2,10);
		//判断是否被击中的函数
		var isdied=setInterval(function(){
			var px=$("#plane").offset().left+25;
			var py=$("#plane").offset().top+25;
			for(var k=0;k<$(".enemy").length;k++){
					var ex=$(".enemy").eq(k).offset().left+25;
					var ey=$(".enemy").eq(k).offset().top+25;	
					if(Math.abs(px-ex)<50&&Math.abs(py-ey)<50){
						$(".enemy").eq(k).remove();
						$("#plane").remove();					
						clearInterval(int1);
						clearInterval(int2);
						clearInterval(int4);
						clearInterval(int5);
						clearInterval(int6);
						clearInterval(int7);
						alert("gameover!");
						$("#start").show();
					}
			}
			
			for(var i=0;i<$(".e_bullet").length;i++){
					var bx=$(".e_bullet").eq(i).offset().left+5;
					var by=$(".e_bullet").eq(i).offset().top+5;
					if(Math.abs(bx-px)<=30&&Math.abs(by-py)<=30){
						$(".e_bullet").eq(i).remove();
						$("#plane").remove();				
						clearInterval(int1);
						clearInterval(int2);
						clearInterval(int4);
						clearInterval(int5);
						clearInterval(int6);
						clearInterval(int7);
						alert("gameover!");
						$("#start").show();
					}		
			}
			var ex2=$(".enemy2").offset().left+25;
			var ey2=$(".enemy2").offset().top+25;
			if(Math.abs(px-ex2)<50&&Math.abs(py-ey2)<50){
						$(".enemy2").remove();
						$("#plane").remove();					
						clearInterval(int1);
						clearInterval(int2);
						clearInterval(int4);
						clearInterval(int5);
						clearInterval(int6);
						clearInterval(int7);
						alert("gameover!");
						$("#start").show();
					}						
		},10);
		
		//判断换子弹的定时器
		setInterval(function(){
			var px=$("#plane").offset().left+25;
			var py=$("#plane").offset().top+25;
			var bonus_x=$(".bonus").offset().left+10;
			var bonus_y=$(".bonus").offset().top+10;
			if(Math.abs(bonus_x-px)<=35&&Math.abs(bonus_y-py)<=35){
						clearInterval(int1);
						if($(".bonus").html()==1){
							int1=setInterval(shot1,250);
						}else if($(".bonus").html()==2){
							int1=setInterval(shot2,500);
						}else if($(".bonus").html()==3){
							int1=setInterval(shot3,500);
						}else if($(".bonus").html()==4){	
							int1=setInterval(shot4,700);
						}else if($(".bonus").html()==5){	
							int1=setInterval(shot5,350);
						}
						else if($(".bonus").html()==6){
							int1=setInterval(shot6,30);
						}
						$(".bonus").remove();	
					}

			},10);
			
				
	});
	
	
	
})