/* 
用途：检查输入对象的值是否符合E-Mail格式 
输入：str 输入的字符串 
返回：如果通过验证返回true,否则返回false 
*/ 
function isEmail(str) { 
var myReg = /^[-_A-Za-z0-9]+@([_A-Za-z0-9]+\.)+[A-Za-z0-9]{2,3}$/; 
if (myReg.test(str)) return true; 
return false; 
} 
/* 
用途：检查输入字符串是否符合国内固话或者传真格式 
输入： 
s：字符串  格式例如：020-87110252
返回： 
如果通过验证返回true,否则返回false 
*/ 

function isTel(s){
  var reg=/^((0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/; 
  if(!reg.test(s))
   return   false   
  return   true   
} 

/* 
用途：检查输入字符串是否符合正整数格式 
输入： 
s：字符串 
返回： 
如果通过验证返回true,否则返回false 
*/ 
function isNumber(s) { 
var regu = "^[0-9]+$"; 
var re = new RegExp(regu); 
if (s.search(re) != -1) { 
return true; 
} else { 
return false; 
} 
} 

/* 
用途：检查输入字符串是否只由英文字母和数字和下划线组成 
输入： 
s：字符串 
返回： 
如果通过验证返回true,否则返回false 
*/ 
function isNumberOr_Letter(s) {//判断是否是数字或字母 
var regu = "^[0-9a-zA-Z\_]+$"; 
var re = new RegExp(regu); 
if (re.test(s)) { 
return true; 
} else { 
return false; 
} 
} 

/* 
用途：检查输入字符串是否只由英文字母和数字组成 
输入： 
s：字符串 
返回： 
如果通过验证返回true,否则返回false 
*/ 
function isNumberOrLetter(s) {//判断是否是数字或字母 
var regu = "^[_0-9a-zA-Z]+$"; 
var re = new RegExp(regu); 
if (re.test(s)) { 
return true; 
} else { 
return false; 
} 
} 

/*
用途:检验字符串是否为null
返回：为null返回为空，否则返回字符串
*/
function checkNull(param){
	if(param==null||param=="null"){
		return '';
	}else
		return param;
}

/*
用途:检验字符串是否为null
返回：为null返回为空，否则返回字符串
*/
function checkNullforEffic(param){
	if(param==null||param=="null"){
		return '/';
	}else
		return param.toFixed(2);
}

/*
用途:检验字符串是否为null
返回：为null返回为param2
*/
function checkNull_param(param1,param2){
	if(param1==null||param1=="null"){
		return param2;
	}else
		return param1.toFixed(2);
}
/*
用途:检验字符串是否为null
返回：为null返回为空，否则返回字符串
*/
function checkNullforBar(param){
	if(param==null||param=="null"){
		return '0';
	}else
		return param.toFixed(1);
}
/*
用途:点击一行时checkbox被勾选或去掉勾选
*/
function trOnclick(i){
   if($("#"+i).is(":checked"))
   {
    $("#"+i).removeAttr("checked");
   }
   else
   {
    $("#"+i).attr("checked",'true');
   }
}
/*
用途:去除左右空格
*/
String.prototype.Trim = function()
{
	return this.replace(/(^\s*)|(\s*$)/g,"");
}
/*
用途:检验字符串是否为null
返回：为null返回为空，否则非空返回3位小数
*/
function checkNullandFix3(param){
	if(param==null||param=="null"){
		return '';
	}else
		return param.toFixed(3);
}
/*
用途:检验字符串是否为null
返回：为null返回为空，否则非空返回1位小数
*/
function checkNullandFix1(param){
	if(param==null||param=="null"){
		return '';
	}else
		return param.toFixed(1);
}
/*
用途:检验字符串是否为null
返回：为null返回为空，否则非空返回1位小数
*/
function checkNullandFixN(param,n){
	if(param==null||param=="null"){
		return '';
	}else
	{
		param=param*1;
		if(n=='1'){
		param=param.toFixed(1);
		}else
		if(n=='2'){
		param=param.toFixed(2);
		}else
		{
		param=param.toFixed(3);
		}
		return param;
	}
}
/*
时间格式化处理
*/
function formatDate(date) {   
    var myyear = date.getFullYear();  
    var mymonth = date.getMonth()+1;  
    var myweekday = date.getDate();   
      
    if(mymonth < 10){  
        mymonth = "0" + mymonth;  
    }   
    if(myweekday < 10){  
        myweekday = "0" + myweekday;  
    }  
    return (myyear+"-"+mymonth + "-" + myweekday);    
}
/*
根据年月判断日数 
*/
function getDaysInMonth(year,month){
	      month = parseInt(month,10)+1;
	      var temp = new Date(year+"/"+month+"/0");
	      return temp.getDate();
}
/*
求数组中最大值
*/
function getMax(Arr) {
 if (typeof Arr !="object") {
  return null;
 }
 for (var i=0,max=Arr[i]; i<Arr.length; ++i) {
  if (Number(Arr[i])>max) {
   max=Arr[i];
  }
 }
 return max;
}
/*
求数组中最大值
*/
function getMin(Arr) {
 if (typeof Arr !="object") {
  return null;
 }
 for (var i=0,min=Arr[i]; i<Arr.length; ++i) {
  if (Number(Arr[i])<min&&Number(Arr[i])>0) {
   min=Arr[i];
  }
 }
 return min;
}

//检查表单是否符合规定的长度.最长允许n个字符(中文算2位)！
  function fucCheckLength(strTemp) { 
  var i,sum;
  sum=0;
  for(i=0;i<strTemp.length;i++) { 
    if ((strTemp.charCodeAt(i)>=0) && (strTemp.charCodeAt(i)<=255)) {
      sum=sum+1;
    }else {
      sum=sum+2;
    }
  }
  return sum; 
}

function doResize(div,obj){
		$('#'+div).bind('resize', function(event, ui) {
			if(obj!=null){
				obj.replot( { resetAxes: true } );
			}
		});
}

function doResize_(div,obj,start,end){
		$('#'+div).bind('resize', function(event, ui) {
			if(obj!=null){
				obj.axes.xaxis.min  = start;
    			obj.axes.xaxis.max = end; 
				obj.replot();
			}
		});
}


function setCenterHeight(){
	var height=$(document).height();
	//alert(parseInt(height)); 
	//top.document.getElementById("parentFrameset").rows = "80,613,30";
	}
	
/*
	数组去除重复项
	2013-6-9
*/
Array.prototype.unique5 = function() { 
   var res = [], hash = {}; 
   for(var i=0, elem; (elem = this[i]) != null; i++)  { 
       if (!hash[elem]) 
       { 
           res.push(elem); 
           hash[elem] = true; 
       } 
   } 
   return res; 
} 


//项目运营、数据分析菜单栏
function initNavTitle_1(projectid,tacheid,equipmentid,path,d_type){
	var $top=$(window.top.frames("topFrame").document);
	//<span>中国区域</span><i>—</i>生态城<i>—</i>生态城<i>—</i>生态城
	//<span>中国区域</span><span style=" font-size:16px; padding-left:30px">生态城</span>
	var str="";
	$top.find('.navCity').empty();
	if(projectid!=0){
		$.getJSON(path+"/project/getProjectByID.action?projectid="+projectid+"&flag=0&temp="+Math.random(),function(data){
		   	$.each(data, function(i,item){
			 	str+="<span>"+item.projectname+"</span>";
		    });
		    if(d_type!=null){
		    	str+="<span style=\" font-size:16px; padding-left:30px\">"+d_type+"</span>"
		    }
		    $top.find('.navCity').append(str);
		});
	}
	
	if(tacheid!=0){	
		$.getJSON(path+"/tacheanalyze/queryTacheforTitle.action?tacheid="+tacheid+"&temp="+Math.random(),function(data){
		   	$.each(data, function(i,item){
				str+="<span>"+item.projectname+"</span><i>—</i>"+item.tachename;
		 		$top.find('.navCity').append(str);
		    });
		 });
	}
	
	if(equipmentid!=0){		
		$.getJSON(path+"/proequ/queryProEquForTitle.action?classinstanceid="+equipmentid+"&temp="+Math.random(),function(data){
		   	$.each(data, function(i,item){
				str+="<span>"+item.projectname+"</span><i>—</i>"+item.classinstancename;
		 		$top.find('.navCity').append(str);
		    });
		});	
	}
}
//数据工具菜单栏
function initNavTitle_2(path){
	var $top=$(window.top.frames("topFrame").document);
	//<span>中国区域</span><i>—</i>生态城<i>—</i>生态城<i>—</i>生态城
	//<span>中国区域</span><span style=" font-size:16px; padding-left:30px">生态城<i>—</i>生态城<i>—</i>生态城<i>—</i>生态城</span>
	var str="";
	$top.find('.navCity').empty();
	var temp="<span>数据工具</span><span style=\"font-size:16px; padding-left:30px\">"+path+"</span>";
	$top.find('.navCity').append(temp);
}

/*****************周时间选项处理 start*********************/
	function change_day(id){
		var type = $("input[type=radio]:checked").val();
		var val=$("#"+id).val();
		if(type=='week'){
			if(id=='end_day'){
				var time=[];
				time=val.split("-");
				var date=new Date(time[0],time[1]-1,time[2]);
				var ms=date.getTime();
				var pdate=new Date(parseInt(ms*1-518400000));
				$("#start_day").val(formatDate(pdate));
			}else{
				var time=[];
				time=val.split("-");
				var date=new Date(time[0],time[1]-1,time[2]);
				var ms=date.getTime();
				var fdate=new Date(parseInt(ms*1+518400000));
				$("#end_day").val(formatDate(fdate));
			}
		}
	}
	/*****************周时间选项处理 end*********************/
	
	/**项目运营 时间解析处理**/
	function dateInit(rectime){
		var a=[];
		var b=[];
		var c=[];
		a=rectime.split(" ");
		b=a[0].split("-");
		c=a[1].split(":");
		var myDate=new Date(b[0], b[1]-1, b[2]*1, c[0]*1, c[1]*1, c[2]*1);
		return myDate.getTime();
	}
	
	var jmz = {};
	jmz.GetLength = function(str) {
	    ///<summary>获得字符串实际长度，中文2，英文1</summary>
	    ///<param name="str">要获得长度的字符串</param>
	    var realLength = 0, len = str.length, charCode = -1;
	    for (var i = 0; i < len; i++) {
	        charCode = str.charCodeAt(i);
	        if (charCode >= 0 && charCode <= 128) realLength += 1;
	        else realLength += 2;
	    }
	    return realLength;
};

function addUnit1(name){
	if(name.indexOf('温度')>=0){
		name+='(℃)';
	}else
	if(name.indexOf('气量')>=0||name.indexOf('气流量')>=0){
		name+='(Nm3/h)';
	}else
	if(name.indexOf('压力')>=0){
		name+='(KPa)';
	}else
	if(name.indexOf('湿度')>=0||name.indexOf('效率')>=0||name.indexOf('负荷率')>=0||name.indexOf('减排率')>=0||name.indexOf('系统能效')>=0||name.indexOf('节能率')>=0){
		name+='(%)';
	}else
	if(name.indexOf('水流量')>=0||name.indexOf('总管流量')>=0){
		name+='(m3/h)';
	}else
	if(name.indexOf('功率')>=0||name.indexOf('热值')>=0||name.indexOf('冷量')>=0||name.indexOf('热量')>=0||name.indexOf('电量')>=0||name.indexOf('消耗量')>=0){
		name+='(kW)';
	}else
	if(name.indexOf('电流')>=0){
		name+='(A)';
	}else
	if(name.indexOf('电压')>=0){
		name+='(V)';
	}else
	if(name.indexOf('频率')>=0){
		name+='(hz)';
	}else
	if(name.indexOf('耗水量')>=0){
		name+='(m3)';
	}else
	if(name.indexOf('照度')>=0){
		name+='(Lux)';
	}
	return name;
	
}

function addUnit2(name){
	    var unit="";
	    if(name.indexOf('温度')>=0){
			unit=' ℃';
		}else
		if(name.indexOf('气量')>=0||name.indexOf('气流量')>=0){
			unit=' Nm3/h';
		}else
		if(name.indexOf('压力')>=0){
			unit=' KPa';
		}else
		if(name.indexOf('湿度')>=0||name.indexOf('效率')>=0||name.indexOf('负荷率')>=0||name.indexOf('减排率')>=0||name.indexOf('系统能效')>=0||name.indexOf('节能率')>=0){
			unit=' %';
		}else
		if(name.indexOf('水流量')>=0||name.indexOf('总管流量')>=0){
			unit=' m3/h';
		}else
		if(name.indexOf('功率')>=0||name.indexOf('热值')>=0||name.indexOf('冷量')>=0||name.indexOf('热量')>=0||name.indexOf('电量')>=0||name.indexOf('消耗量')>=0){
			unit=' kW';
		}else
		if(name.indexOf('电流')>=0){
			unit=' A';
		}else
		if(name.indexOf('电压')>=0){
			unit=' V';
		}else
		if(name.indexOf('频率')>=0){
			unit=' hz';
		}else
		if(name.indexOf('耗水量')>=0){
			unit=' m3';
		}else
		if(name.indexOf('照度')>=0){
			unit=' Lux';
		}
		return unit;
}
	
//判断字符中是否包含有特殊字符：
function convertSpecial( s )    
{
	var containSpecial = RegExp(/[(\ )(\~)(\!)(\@)(\#)(\$)(\%)(\^)(\&)(\*)(\()(\))(\-)(\_)(\+)(\=)(\[)(\])(\{)(\})(\|)(\\)(\;)(\:)(\')(\")(\,)(\.)(\/)(\<)(\>)(\?)(\)]+/); 
    return s.replace(containSpecial,"");
}
//权限移动
function move(sourceId, targetId){
	//第3个参数：是否全部移动
	var moveAll = arguments[2]?arguments[2]:false; 
	var source = document.getElementById(sourceId);
	var target = document.getElementById(targetId);
	var sourceChildren = source.children;
	for(var i=0 ; i<sourceChildren.length ; i++ ){
		if(moveAll || sourceChildren[i].selected){
			var oOption = document.createElement("OPTION");
			target.options.add(oOption);
			oOption.innerText = sourceChildren[i].innerText;
			oOption.value = sourceChildren[i].value;
			source.removeChild(sourceChildren[i]);
			i--;
		}
	}
}

function subString(str, len, hasDot) {
	var newLength = 0;
	var newStr = "";
	var chineseRegex = /[^\x00-\xff]/g;
	var singleChar = "";
	var strLength = str.replace(chineseRegex, "**").length;
	for (var i = 0; i < strLength; i++) {
		singleChar = str.charAt(i).toString();
		if (singleChar.match(chineseRegex) != null) {
			newLength += 2;
		} else {
			newLength++;
		}
		if (newLength > len) {
			break;
		}
		newStr += singleChar;
	}
	if (hasDot && strLength > len) {
		newStr += "...";
	}
	return newStr;
}