
var waitting = 1;
var secondLeft = waitting;
var timer;
var sourceObj;
var number;
function SetTimer()//主导航时间延迟的函数
{
    for (j = 1; j < 10; j++) {
        if (j == number) {
            if (document.getElementById("mm" + j) != null) {
                document.getElementById("mm" + j).className = "menuhover";
                if (document.getElementById("mb" + j) != null) {
                    document.getElementById("mb" + j).className = "";
                }
            }
        }
        else {
            if (document.getElementById("mm" + j) != null) {
                document.getElementById("mm" + j).className = "";
                if (document.getElementById("mb" + j) != null) {
                    document.getElementById("mb" + j).className = "hide";
                }
            }
        }
    }
}
function CheckTime()//设置时间延迟后
{
    secondLeft--;
    if (secondLeft == 0) {
        clearInterval(timer);
        SetTimer();
    }
}
function showM(thisobj, num)//主导航鼠标滑过函数,带时间延迟
{
    number = num;
    sourceObj = thisobj;
    secondLeft = 1;
    timer = setTimeout('CheckTime()', 100);
}
function OnMouseLeft()//主导航鼠标移出函数,清除时间函数
{
    clearInterval(timer);
}

function showMenu_1(menuurl)//一级菜单触发
{
    if (menuurl != "#" && menuurl != "null" && menuurl != "" && menuurl != "javascript:void(0)") {
        $("#mainSrc").attr("src", menuurl);
    }
}

function showMenu_2(menuurl)//二级菜单触发
{
    if (menuurl != "#" && menuurl != "null" && menuurl != "" && menuurl != "javascript:void(0)") {
        $("#mainSrc").attr("src", menuurl);
    }
}
