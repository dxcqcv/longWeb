
$(function () {
    $("#folderBtn").click(function () {
        var btn = $(this);
        if (btn.hasClass("icoLeft")) {
            $("#container").addClass("containerHideLeft");
            btn[0].className = "icoRight";
            $.cookies.set("showLeft", "false");
        }
        else {
            $("#container").removeClass("containerHideLeft");
            btn[0].className = "icoLeft";
            $.cookies.set("showLeft", "true");
        }
      
    });
  

    if ($.cookies.get("showLeft") == "false") {
        var ico = document.getElementById("folderBtn");
        ico.className = "icoRight";
    }


});


