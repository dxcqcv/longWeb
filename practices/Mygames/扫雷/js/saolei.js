// JavaScript Document
$(function(){
	//屏蔽网页右键菜单
	$(document).bind("contextmenu", function(){
		 return false;
     }); 

	
	//开始游戏
	$("#start").click(startgame=function(){
		$("td").removeClass();
		$("td").html("");	
		setbombs();
		sethints();
		addcover();
	})
	
	//布置地雷
	function setbombs(){
		var i=1;
		while(i<=10){
			var $space=$("table").find("tr:eq("+Math.round((Math.random(0,10)*9))+")").find("td:eq("+Math.round((Math.random(0,10)*9))+")");
			if(!$space.hasClass("bomb")){
				$space.addClass("bomb");
				$space.html("`");
				$space.css("color","black");
				i++;
			}else{
				continue;
			}
		}
	}
	
	//添加数字提示	
	function sethints(){
		for(var i=0;i<10;i++){
			for(var j=0;j<10;j++){
				var $space=$("table").find("tr:eq("+i+")").find("td:eq("+j+")");
				if(!$space.hasClass("bomb")){
					countround($space);
				}
			}
		}
	}
	

	
	//计算周围地雷数并显示
	function countround(space){
		var count=0;
		if(space.next().hasClass("bomb")&&space.index()<9){
			count++;
		}
		if(space.prev().hasClass("bomb")&&space.index()>0){
			count++;
		}
		if(space.parent().next().find("td:eq("+space.index()+")").hasClass("bomb")&&space.parent().index()<9){
			count++;
		}
		var previndex=space.index()-1;
		var nextindex=space.index()+1;
		if(space.parent().next().find("td:eq("+previndex+")").hasClass("bomb")&&space.parent().index()<9&&space.index()>0){
			count++;
		}
		if(space.parent().next().find("td:eq("+nextindex+")").hasClass("bomb")&&space.parent().index()<9&&space.index()<9){
			count++;
		}
		if(space.parent().prev().find("td:eq("+space.index()+")").hasClass("bomb")&&space.parent().index()>0){
			count++;
		}
		if(space.parent().prev().find("td:eq("+previndex+")").hasClass("bomb")&&space.parent().index()>0&&space.index()>0){
			count++;
		}
		if(space.parent().prev().find("td:eq("+nextindex+")").hasClass("bomb")&&space.parent().index()>0&&space.index()<9){
			count++;
		}
		space.html(count);
		if(count==0){
			space.css("color","white");
		}
		else if(count==1){
			space.css("color","green");
		}
		else if(count==2){
			space.css("color","orange");
		}
		else if(count==3){
			space.css("color","red");
		}
		else if(count>=4){
			space.css("color","black");
		}
	}
		
	//添加遮罩层
	function addcover(){
		$("td").append("<div class=\"cover\"></div>");
	}
	
	//鼠标点击事件
	$("td").bind("mouseup",clickspace=function(e){	
		if(e.which==1){
			if(!$(this).find("div").hasClass("flag")){		
				if($(this).hasClass("bomb")){
					$(this).html("");
					gameover();
				}else{
					var $this=$(this);
					clearcover($this);
				}
			}	
		}else if(e.which==3){
			if($(this).find("div").hasClass("flag")){
				$(this).find("div").removeClass("flag").addClass("cover");
			}else{
				$(this).find("div").removeClass("cover").addClass("flag");
			}
		}
		gamewin();
	});
	
	//清楚遮罩的函数
	function clearcover(space){

		if((!space.find("div").hasClass("cover")&&space.text()==0)||space.find("div").hasClass("flag")){
		
		}else{
				space.find("div").remove();
				if(space.text()==0){
							clearcover(space.prev());
							clearcover(space.next());					
							clearcover(space.parent().next().find("td:eq("+space.index()+")"));								
							clearcover(space.parent().prev().find("td:eq("+space.index()+")"));
					
				}else{
					return;
				}
		}
	}
	

	//失败后执行的函数
	function gameover(){
		for(var i=0;i<10;i++){
			for(var j=0;j<10;j++){
				var $space=$("table").find("tr:eq("+i+")").find("td:eq("+j+")");
				if($space.hasClass("bomb")){
					$space.find("div").remove();
				}
			}
		}
		alert("game over!");
		startgame();
	}

	
	
	//判定是否获胜的函数
	function gamewin(){
		var win=true;
		for(var i=0;i<10;i++){
			for(var j=0;j<10;j++){
				var $space=$("table").find("tr:eq("+i+")").find("td:eq("+j+")");
				if(!$space.hasClass("bomb")){
					if($space.find("div").hasClass("cover")){
						win=false;
					}
				}else{
					continue;
				}
			}
		}
		if(win==true){
			alert("you win!");
			startgame();
		}
	
	}
	
	
	
	
	
})