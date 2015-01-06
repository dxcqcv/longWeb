/*
 * 公共类
 */
 
// Trim() , Ltrim() , RTrim()   
String.prototype.Trim = function()    
{    
return this.replace(/(^\s*)|(\s*$)/g, "");    
}    
String.prototype.LTrim = function()    
{    
return this.replace(/(^\s*)/g, "");    
}    
String.prototype.RTrim = function()    
{    
return this.replace(/(\s*$)/g, "");    
}
 
 
var xmlHttp=null;
function getContextPath() {
    var pathName = document.location.pathname;
    var index = pathName.substr(1).indexOf("/");
    var result = pathName.substr(0,index+1);
    return result;
}
function GetXmlHttpObject(){
	try{
		xmlHttp = new XMLHttpRequest();//Firefox, Opera 8.0+ , Safari		
	}catch(e){
		try{
			xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");//IE
		}catch(e){
			try{
				xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
			}catch(e){
				alert("您的浏览器不支持Ajax!");
				return false;
			}
		}
	}
	return xmlHttp;
}
/* 重写alert */
//window.alert=function(s){
//	var alertBox=$('#tt').wBox({opacity:0,title:"提 示",html:"<div class='demo' style='height:100px'><table width='100%' valign='middle'><tr><td width='50px' height='70px' align='center'><img src='js/jquery/wbox/alert.png' width='32px' height='32px' /></td><td align='left' style='line-height: 20px;'>"+s+"</td></tr><tr><td colspan='2'><input id='_tz_alert_but_ok' type='button' value='确 定' class='wBox_close input_hh_bc' /></td></tr></table></div>"});
//	alertBox.showBox();
//	$("#_tz_alert_but_ok").focus();
//	$(document).unbind('keydown._tz_alert_but_ok').bind('keydown._tz_alert_but_ok', function(e){
//         if (e.keyCode === 13){
//            alertBox.close();
//         }
//         return true;
//     });
//}
//重写confirm
//window.confirm=function(s){
//function srewriteConfirm(s){
//	
//	alert("sdfdf");
//	
//	_confirm_reval=false;
//	_confirm_isbut=false;
//	var confirmBox=$('#tt').wBox({opacity:0,title:"提 示",html:"<div class='demo' style='height:100px'><table width='100%' valign='middle'><tr><td width='50px' height='70px' align='center'><img src='js/jquery/wbox/alert.png' width='32px' height='32px' /></td><td align='left' style='line-height: 20px;'>"+s+"</td></tr><tr><td colspan='2'><input id='_tz_confirm_but_yes' type='button' value='确 定' class='input_hh_bc' /><input id='_tz_confirm_but_no' style='margin-left:15px' type='button' value='取 消' class='input_hh_bc' /></td></tr></table></div>"});
//	confirmBox.showBox();
//	$("#_tz_confirm_but_yes").focus();
//	$(document).unbind('keydown._tz_confirm_but_yes').bind('keydown._tz_confirm_but_yes', function(e){
//         if (e.keyCode === 13){
//            confirmBox.close();
//         }
//         _confirm_reval = true;
//         _confirm_isbut = true;
//        
//     });
//     $(document).unbind('keydown._tz_confirm_but_no').bind('keydown._tz_confirm_but_no', function(e){
//         if (e.keyCode === 13){
//            confirmBox.close();
//         }
//         _confirm_reval = false;
//         _confirm_isbut = true;
//     });
//     $("#_tz_confirm_but_yes").bind("click",function(){
//         _confirm_reval = true;
//         _confirm_isbut = true;
//         
//        return true;
//     });
//     $("#_tz_confirm_but_no").bind("click",function(){
//     	 _confirm_reval = false;
//         _confirm_isbut = true;
//         
//         return false;
//     });
//     var cc=window.setInterval(function(){
//     if(_confirm_isbut)
//     {
//     	window.clearInterval(cc);
//     	confirmBox.close();
//     	return _confirm_reval;
//     }},1);
//} 
/*
 * 得到图表
 */
function getChart(url,id,datetype){
		var stext = "";
		var xtype="datetime";
		//alert("--datetype--"+datetype);
		//var datetype = "d";
		//var surl = "/global.do?method=getChartData";
   		$.get(getContextPath()+url, function(data) {

   			if(data.length!=21){//如果没数据,后面传来的长度是21
		    		var options = {
					    chart: {
					        renderTo: id,
					        defaultSeriesType: 'line',
					        height:266
					        //width:725
					    },
					    title: {
					        text: stext
					    },
					    xAxis: {
					        //categories: [],
					        showFirstLabel:false,
					    	type: xtype,
					    	labels: {formatter:function() {
								var vDate = new Date(this.value);
								if(datetype=="m"){//逐月
									return vDate.getFullYear()+"-"+(vDate.getMonth()+1);
								}else if(datetype=="d"){//逐日
									return vDate.getFullYear()+"-"+(vDate.getMonth()+1)+"-"+vDate.getDate();
								}else{//逐时
									return (vDate.getHours()+":00");
								}
								
							}},
							//时间轴要加上这个type，默认是linear
			                 maxPadding : 0.05,
			                 minPadding : 0.05,
							//tickInterval : 24 * 3600 * 1000 * 2,//两天画一个x刻度
							//或者150px画一个x刻度，如果跟上面那个一起设置了，则以最大的间隔为准
			                 tickPixelInterval : 150, 
			                 tickWidth:0

					    },
					    yAxis: {
					    	startOnTick: false,
					        title: {text: '数值'},
					        plotLines: [{value: 0, width: 1, color: '#808080'}]
					    },
						plotOptions: {
					        series: {
					            marker: {
					                radius: 2
					            }
					        }
						},
					    tooltip: {
					        formatter: function() {
					        	var tDate = new Date(this.x);
					        	if(datetype=="m"){//逐月
									return '<b>'+ this.series.name +'</b><br/>'+ '时间:'+tDate.getYear()+"-"+(tDate.getMonth()+1) +'<br/>'+'值:'+this.y ;
								}else if(datetype=="d"){//逐日
									return '<b>'+ this.series.name +'</b><br/>'+ '时间:'+tDate.getYear()+"-"+(tDate.getMonth()+1)+"-"+tDate.getDate() +'<br/>'+'值:'+ this.y ;
								}else{//逐时
									return '<b>'+ this.series.name +'</b><br/>'+ '时间:'+tDate.getYear()+"-"+(tDate.getMonth()+1)+"-"+tDate.getDate()+','+(tDate.getHours()) +':00 <br/>'+'值:'+ this.y ;
								} 
					             //Highcharts.dateFormat('%b- %e, %H', this.x) +': '+ this.y ;
					        }
					    },
					    legend: {
//					        layout: 'vertical',
//					        align: 'right',
//					        verticalAlign: 'top',
//					        x: -10,
//					        y: 100,
//					        borderWidth: 1
					    },
					    series:[]
					};
				    var lines = data.split('\n');
				    // Iterate over the lines and add categories or series
				    var stime;
				    $.each(lines, function(lineNo, line) {
				        var items = line.split(',');
				        // header line containes categories
				        if (lineNo == 0) {//放时间
				            $.each(items, function(itemNo, item) {
				                //if (itemNo > 0) options.xAxis.categories.push(item);
				            	if (itemNo == 1){
				            		stime = item.split("-");
				            	}
				            });
				        }
				        // the rest of the lines contain data with their name in the first position
				        else {
				        	//alert(stime);
				            var series = {
				                data: []
				            };
				            $.each(items, function(itemNo, item) {
				                if (itemNo == 0) {
				                    series.name = item;
				                } else {
				                    //series.data.push(parseFloat(item));
				                	if(item=="null"|| item==null){
				                		series.data.push(null);
				                	}else{
				                		series.data.push(parseFloat(item));
				                	}
				                }
				            });
				            series.lineWidth=1;//设置线粗细
				            if(datetype=="h"){
				            	//var d = stime[2].split(":");
				            	series.pointStart=Date.UTC(stime[0],stime[1]-1,stime[2]-1,16,0,0);//因为北京时间与utc时间相差8个小时,所以向前推8个小时
				            }else{
				            	series.pointStart=Date.UTC(stime[0],stime[1]-1,stime[2]);				            
				            }
				            
				            //alert("--datetype--"+datetype);
				            
				            if(datetype=="m"){//逐月
								series.pointInterval=24 * 3600 * 1000*31;
							}else if(datetype=="d"){//逐日
								series.pointInterval=24 * 3600 * 1000;
							}else{//逐时
								series.pointInterval=3600 * 1000;
							}
				            
				            options.series.push(series);
				        }
				    });
				  
				    // Create the chart
				    var chart = new Highcharts.Chart(options);
			
			}else{
				var nodata = "<table width=100% border='1' cellpadding='0' cellspacing='0' bordercolor='#B9E1FF' class='table_a5' ><tr><td align='center'>无数据</td></tr></table>";
				document.getElementById(id).innerHTML = nodata;
			}
			
	    });

//			  使用JQuery从后台获取JSON格式的数据 getContextPath()+"/global.do?method=getAjaxReturn"  
//            jQuery.getJSON(getContextPath()+'/sysoperation.do?method=getChartData', null, function(data) {   
//			  为图表设置值
//            options.series[2].setData(data);
//           });
	
}

/*
 * 原频度分析柱状图
 */
function getStatShowChart(url,id,stext){
	//var stext = "";
	//var surl = "/global.do?method=getChartData";
	$.get(getContextPath()+url, function(data) {
		//alert(data);
		if(data.length!=21){//如果没数据,后面传来的长度是21
	    		var options = {
				    chart: {
				        renderTo: id,
				        defaultSeriesType: 'column',
				        height:266
				        //width:725
				    },
				    title: {
				        text: stext
				    },
				    xAxis: {
				        categories: []
				    },
				    yAxis: {
				        title: {text: ''},
				        plotLines: [{value: 0, width: 1, color: '#808080'}]
				    },
				    tooltip: {
				        formatter: function() {
				                  return '<b>'+ this.series.name +'</b><br/>'+
				             this.x +': '+ this.y ;
				        }
				    },
				    legend: {
//				        layout: 'vertical',
//				        align: 'right',
//				        verticalAlign: 'top',
//				        x: -10,
//				        y: 100,
//				        borderWidth: 1
				    },
				    series: []
				};
				//alert("--params--"+params);
			
		    	// Split the lines
			    var lines = data.split('\n');
			    // Iterate over the lines and add categories or series
			    $.each(lines, function(lineNo, line) {
			        var items = line.split(',');
			        
			        // header line containes categories
			        if (lineNo == 0) {
			            $.each(items, function(itemNo, item) {
			                if (itemNo > 0) options.xAxis.categories.push(item);
			            });
			        }
			        // the rest of the lines contain data with their name in the first position
			        else {
			            var series = {
			                data: []
			            };
			            $.each(items, function(itemNo, item) {
			                if (itemNo == 0) {
			                    series.name = item;
			                } else {
			                    series.data.push(parseFloat(item));
			                }
			            });
			            options.series.push(series);
			        }
			    });
			    
			    // Create the chart
			    var chart = new Highcharts.Chart(options);
		
		}else{
			var nodata = "<table width=100% border='1' cellpadding='0' cellspacing='0' bordercolor='#B9E1FF' class='table_a5' ><tr><td align='center'>无数据</td></tr></table>";
			document.getElementById(id).innerHTML = nodata;
		}
		
    });
	
}

/*
 * 
 */
function getOrientalChart(ourl,id,day,titletext,ytext){
	var stext = "";
	
	
	$.get(ourl, function(data) {
			if(data.length!=21){//如果没数据,后面传来的长度是21
	    		var options = {
				    chart: {
				        renderTo: id,
				        backgroundColor: '#EEF3F6',
				        defaultSeriesType: 'line',
				        height:266
				    },
				    title: {
				    	style: { 
					         color: '#000',
					         font: '14px "Trebuchet MS", Verdana, sans-serif'
					      },
				    	
				        text: titletext,
				        x: -20 //center
				    },
				    xAxis: {
				    	title: {text: '时 间(h) '},
				        categories: []
				    },
				    yAxis: {
				    	minorTickInterval: 'auto',
					      //lineColor: '#000',
					      lineWidth: 1,
					      tickWidth: 1,
					      tickColor: '#000',
				    	
				        title: {text: ytext},
				        plotLines: [{value: 0, width: 1, color: '#808080'}]
				    },
			    	plotOptions: {
				        series: {
				            marker: {
				                radius: 2
				            }
				        }
					},
				    tooltip: {
				        formatter: function() {
				        	if(this.x>=0&&this.x<=23){
				        		if(this.series.name=='温度'){
				        			return '<b>'+ this.series.name +'</b><br/>'+ '日期: '+day+'<br/>'+ '时间: '+this.x +':00'+'<br/>'+'值:&nbsp;&nbsp;&nbsp;&nbsp;'+ this.y+'&nbsp;℃';
				        		}else
				        		if(this.series.name=='湿度'){
				        			return '<b>'+ this.series.name +'</b><br/>'+ '日期: '+day+'<br/>'+ '时间: '+this.x +':00'+'<br/>'+'值:&nbsp;&nbsp;&nbsp;&nbsp;'+ this.y+'&nbsp;%';
				        		}else
				        		if(this.series.name=='光照'){
				        			return '<b>'+ this.series.name +'</b><br/>'+ '日期: '+day+'<br/>'+ '时间: '+this.x +':00'+'<br/>'+'值:&nbsp;&nbsp;&nbsp;&nbsp;'+ this.y+'&nbsp;W/㎡';
				        		}else{
				        			return '<b>'+ this.series.name +'</b><br/>'+ '日期: '+day+'<br/>'+ '时间: '+this.x +':00'+'<br/>'+'值:&nbsp;&nbsp;&nbsp;&nbsp;'+ this.y ;
				        		}
				        		
				        	}
				        	else
				        		return '<b>'+ this.series.name +'</b><br/>'+ '时间:'+ this.x +'<br/>'+'值:'+ this.y ;
				                  
				        }
				    },
				    legend: {
				    	enabled:false
//				        layout: 'vertical',
//				        align: 'right',
//				        verticalAlign: 'top',
//				        x: -10,
//				        y: 100,
//				        borderWidth: 0
				    },
				    series: []
				};
				
			    // Split the lines
			    var lines = data.split('\n');
			    // Iterate over the lines and add categories or series
			    $.each(lines, function(lineNo, line) {
			        var items = line.split(',');
			        
			        // header line containes categories
			        if (lineNo == 0) {
			            $.each(items, function(itemNo, item) {
			                if (itemNo > 0) options.xAxis.categories.push(item);
			            });
			        }
			        // the rest of the lines contain data with their name in the first position
			        else {
			            var series = {
			                data: []
			            };
			            $.each(items, function(itemNo, item) {
			                if (itemNo == 0) {
			                    series.name = item;
			                } else {
			                	if(item=="null"|| item==null){
			                		series.data.push(null);
			                	}else{
			                		series.data.push(parseFloat(item));
			                	}
			                    
			                }
			            });
			            series.lineWidth=1;//设置线粗细
			            
			            options.series.push(series);
			        }
			    });
			    
	    // Create the chart
	    var chart = new Highcharts.Chart(options);
	}
   });
	
//	var sarray= [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, null, null];
//   
//   	var chart = new Highcharts.Chart({
//      chart: {
//         renderTo: 'kpichartcontainer02',
//         defaultSeriesType: 'line',
//         marginRight: 130,
//         marginBottom: 25
//      },
//      title: {
//         text: 'Monthly Average Temperature',
//         x: -20 //center
//      },
//      subtitle: {
//         text: 'Source: WorldClimate.com',
//         x: -20
//      },
//      xAxis: {
//         categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
//            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
//      },
//      yAxis: {
//         title: {
//            text: 'Temperature (Â°C)'
//         },
//         plotLines: [{
//            value: 0,
//            width: 1,
//            color: '#808080'
//         }]
//      },
//      tooltip: {
//         formatter: function() {
//                   return '<b>'+ this.series.name +'</b><br/>'+
//               this.x +': '+ this.y +'Â°C';
//         }
//      },
//      legend: {
//         layout: 'vertical',
//         align: 'right',
//         verticalAlign: 'top',
//         x: -10,
//         y: 100,
//         borderWidth: 0
//      },
//      series: [{
//         name: 'Tokyo',
//         data: [18.2, 21.5, 25.2,null, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
//      }, {
//         name: 'New York',
//         data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, null, null, null, null, null]
//      }, {
//         name: 'Berlin',
//         data: sarray
//      }, {
//         name: 'London',
//         data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
//      }]
//   });

}

/*
 * 退出系统
 */
function quitSystem(){
	if(confirm("是否退出系统？")){
		
		
		window.parent.location="./login.do?method=quit"; 
//		qurl = "./global.do?method=quit";
//		xmlHttp = GetXmlHttpObject();		
//
//		xmlHttp.onreadystatechange=function(){
//		  if (xmlHttp.readyState==4 && xmlHttp.status==200)
//		  {
//		    window.location="./global.do?method=quit"; 
//		  }
//		}
//		xmlHttp.open("get",qurl,true);
//		xmlHttp.send(null);
	}
}

/*
 * 用户保存
 */

//修改用户信息
function doSave(){
	var userId = $('#userId').val();
	var userName = $('#userName').val();
	var userPasswd = $('#userPasswd').val();
	var desc = $('#desc').val();
	
	var params = '&userId='+userId+'&userName='+encodeURI(userName)+'&userPasswd='+userPasswd+'&desc='+encodeURI(desc);
	//alert(params);
	$.ajax({
		url:'./usermanager.do?method=saveUserInfo'+params,
		cache:false,
		success:function(data){
			if(data === '1'){
				//window.navigate('./login.do?method=login');
				alert("保存成功!");
			}
		}
	});
}
/* 格式化函数 */
function _fmoney(s, n)   
{   
   n = n > 0 && n <= 20 ? n : 2;   
   s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";   
   var l = s.split(".")[0].split("").reverse(),   
   r = s.split(".")[1];   
   t = "";   
   for(i = 0; i < l.length; i++ )   
   {   
      t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");   
   }
   return t.split("").reverse().join("") + "." + r;   
}

function num_format(value,fixed,currency){ 
        var fixed = fixed || 0; 
        var currency = currency || ''; 
        isNaN(parseFloat(value))? value=0 : value=parseFloat(value); 
        v = value.toFixed(fixed).toString(); 
        var ps = v.split('.'); 
        var whole = ps[0]; 
        var sub = ps[1] ? '.' + ps[1] : ''; 
        var r = /(\d+)(\d{3})/; 
        while (r.test(whole)) { 
                whole = whole.replace(r, '$1' + ',' + '$2'); 
        } 
        v = whole + sub; 
        if (v.charAt(0) == '-') { 
                return currency + '-' + '$' + v.substr(1); 
        } 
        return currency + '$' +v; 
        //return currency + '$' +v; 
}



