function trim(szString)
{
	return szString.replace(/(^\s*)|(\s*$)/g, "");
}

/*
非空效验
*/
function IsEmpty(szString)
{
	if(szString == null || trim(szString) == "")
		return true;
	else	
		return false;	
}

function ExitsSpace(szString)
{
	if(szString.indexOf(" ") > -1)
		return true;
	else
		return false;
}

/*
如果是数字就是正常的
*/
function IsDigit(num)
{
	var patrn = /^[\d]+[\.]?[\d]*$/;
	if (!patrn.exec(num))
		return false;
	else
		return true;
}

/*
大于0的数字，整数，浮点都可以
*/
function IsPositiveDigit(num) {
    var patrn = /^[\d]+[\.]?[\d]*$/;
    if (!patrn.exec(num))
        return false;
    if (parseFloat(num) > 0)
        return true;
    else
        return false;
}

/* 
判断是正整数,并且不能也0开头
*/
function IsPositiveInt(num)
{
    var patrn=/^[1-9]+[0-9]*$/;
    if(!patrn.exec(num))
        return false;
    else
        return true;    
}

//判断是否是1~24小时数
function IsPositiveHour(num)
{
    var patrn = /^(([1-9])|(1\d)|(2[0-4]))$/;
    if (!patrn.exec(num))
        return false;
    else
        return true;

}

//字符串长度校验
function StrValidateLength(str, minN, maxN) {
	if (str.length < minN || str.length > maxN) return false;
	else return true;
}
function StrValidateTitle(szString)
{
	var reg = /^[a-zA-Z0-9_\-\u4e00-\u9fa5]+$/;
	if ( !reg.exec(szString) )
		return false;
	else
		return true;
}

function StrValidate(szString)
{
	var reg = /['|\\|"]/g;
	var len = 0;
	try
	{
		len = szString.match(reg).length;
	}
	catch(e)
	{}
	if(len > 0 )
		return false;
	else
		return true;
}

function StrValidateComputer(szString)
{
	var reg = /[`|~|!|@|#|$|%|^|&|*|(|)|=|+|[|\]|{|}|;|:|,|<|>|\?|\/|'|\\|"]/g;
	var len = 0;
	try
	{
		len = szString.match(reg).length;
	}
	catch(e)
	{}
	if(len > 0 )
		return false;
	else
		return true;
}

/*
检查IP是否合法
*/
function IsIPAddress(szIPAddress)
{
    var patrn = /^([1-9]\d{0,1}|1\d\d|2[0-2]\[0-3]|22[0-3])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
    if (!patrn.exec(szIPAddress))
    {
      EDBWeb.TopShowMessage("您输入的服务器IP地址错误，请重新输入",300,"Warning");
      return false;
    }
    else
      return true;
}

/*
检查SMTP服务器地址//不要加smtp了  如：gmail.com
*/
function IsSMTP(mailAddress)
{
    var patrn=/^((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-zA-Z]{2,6}(?:\.[a-zA-Z]{2})?)$/;
    if (!patrn.exec(mailAddress))
	{
		EDBWeb.TopShowMessage("您输入的SMTP服务器地址错误，请重新输入",315,"Warning");
		return false;
	}        
    else
        return true;
} 

/*
检查登录名是否合法
*/
function IsValidUserName(szUserName)
{
	var reg = /^[a-zA-Z0-9_\-\u4e00-\u9fa5]+$/;
	if(IsEmpty(szUserName) || szUserName.length > 16 || !reg.exec(szUserName))
	{
		EDBWeb.TopShowMessage("用户名不能为空并小于16个字符，只能由中文、字母、数字、中划线、下划线组成，请重新输入",590,"Warning");
		return false;
	}
	else
		return true;
}

/*
检查登录密码是否合法
*/
function IsValidPassword(szPassword)
{
	if(!StringLengthValidate(szPassword))
		return false;
	else
        return true;
}

/*
检查Email是否合法
*/
function IsValidEmail(szEmail)
{
	var patrn = /^([a-zA-Z0-9_\-\.])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
	if( szEmail.length < 3 || szEmail.length > 32)
	{
		EDBWeb.TopShowMessage("您输入了无效的Email地址，请重新输入",300,"Warning");   
        return false;	
	}
	else if( !StrValidate(szEmail) || ExitsSpace(szEmail) )
	{
		EDBWeb.TopShowMessage("邮箱名不可包含空格与'\\\"\，请重新输入",300,"Warning");   
        return false;		
	}
	else if (!patrn.exec(szEmail))
    {
        EDBWeb.TopShowMessage("您输入了无效的Email地址，请重新输入",300,"Warning");   
        return false;
    }
    else
        return true;
}

/*
检查Email是否合法
*/
function IsValidNewEmail(szEmail)
{
	var patrn = /^([a-zA-Z0-9_\-\.])+\@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
	if( szEmail.length < 3 || szEmail.length > 32)
	{
		EDBWeb.TopShowMessage("请正确输入新邮箱地址","","Warning");   
        return false;	
	}
	else if( !StrValidate(szEmail) || ExitsSpace(szEmail) )
	{
		EDBWeb.TopShowMessage("新邮箱名不可包含空格与'\\\"\，请重新输入",310,"Warning");   
        return false;		
	}
	else if (!patrn.exec(szEmail))
    {
        EDBWeb.TopShowMessage("请正确输入新邮箱地址","","Warning");   
        return false;
    }
    else
        return true;
}

function IsValidEmail2(szEmail)
{
	 var patrn =  /^([a-zA-Z0-9_\-\.])+\@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
	 if (!patrn.exec(szEmail)) 
         return false;
     else
         return true;
}

/*
检查Email是否合法
*/
function IsValidSMTPUserID(szEmail)
{
	var patrn = /^([a-zA-Z0-9_\-\.])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
	if (!patrn.exec(szEmail))
    {
        EDBWeb.TopShowMessage("您输入了无效的用户名，请重新输入",290,"Warning");
        return false;
    }
	else if(IsChina(szEmail))
	{
	    EDBWeb.TopShowMessage("您输入了无效的用户名，请重新输入",290,"Warning");
	    return false;	
	}
    else
        return true;
}

/*
检查服务器WEB是否合法
*/
function IsWebAddress(szWebAddress)
{
    if( IsEmpty(szWebAddress) )
		return true;
	else
	{
		var patrn = /^(http:\/\/([1-9]\d{0,1}|1\d\d|2[0-2]\[0-3]|22[0-3])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5]):\d{1,5})$/;
		if (!patrn.exec(szWebAddress))
		{
		  EDBWeb.TopShowMessage("您输入的Web服务器地址错误，请重新输入",310,"Warning"); 
		  return false;
		}
		else
		  return true;
	}
}

function IsChina(szString)
{
	var patrn=/[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi; 
	if(!patrn.exec(szString))
		return false;
	else
		return true;
}

function IsPhone(szNum)
{
    var partten = /^0(([1-9]\d)|([3-9]\d{2}))\d{8}$/;
    var partten2 = /^((1[3-9][0-9]))+\d{8}$/;
	if( partten.test(szNum) )
		return true;
	if( partten2.test(szNum) )
        return true;
	else
		return false;
}
