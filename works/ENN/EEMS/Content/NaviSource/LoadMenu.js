$(document).ready(function () {
    $.ajaxSetup({
        cache: false
    });
    LoadMenuParent();
    LoadMenuChildern();
});

var idString = "";
//生成主菜单
function LoadMenuParent() {
	$.postJSON("/Navigation/Navijs", "strLevel=1", function (responseJSON) {
		$("#mainmenu_top").empty();
		if (responseJSON.length > 0) {
			var strTop = "<ul>";
			$.each(responseJSON, function (n, value) {
				if (value.level == 1) {
					strTop += " <li><a id=mm" + (parseInt(n) + 1) + " ";
					if ((parseInt(n) + 1) == 1) {
						strTop += " class = menuhover ";
					} else {

					}
					strTop += "onmouseover=showM(this," + (parseInt(n) + 1) + "); ";
					strTop += "onmouseout=OnMouseLeft(); ";
					strTop += "onclick=showMenu_1(\"" + value.url + "\"); ";
					strTop += "target=_parent>" + value.name + "</a> </li>";
					idString += value.id + ",";
				}
			});
			strTop += "</ul>";
			$("#mainmenu_top").append(strTop);
		}
	});
};

//生成子菜单

function LoadMenuChildern() {
	$.postJSON("/Navigation/Navijs", "strLevel=2", function (responseJSON) {
		$("#mainmenu_bottom").empty();
		if (responseJSON.length > 0) {
			idString = idString.toString().substring(0, idString.toString().length - 1);
			var idArray = idString.toString().split(',');
			if (idArray.length > 0) {
				for (var i = 0; i < idArray.length; i++) {
					var strBottom = "<ul ";
					if ((parseInt(i) + 1) == 1) {
					} else {
						strBottom += " class=hide ";
					}
					strBottom += " id=mb" + (parseInt(i) + 1) + ">";
					strBottom += " <li style=\"MARGIN-LEFT: 7px\">";
					var strBottomM = "";
					$.each(responseJSON, function (n, value) {
						if (value.pid == idArray[i]) {
							strBottomM += "<li><a target=_parent ";
							strBottomM += "onclick=showMenu_2(\"" + value.url + "\")";
							strBottomM += ">" + value.name + "</a> </li>";
						}
					});
					strBottomM = strBottomM.toString().substring(4, strBottomM.toString().length);
					strBottom += strBottomM;
					strBottom += "</ul>";
					$("#mainmenu_bottom").append(strBottom);
				}
			}
		}
	});
};







