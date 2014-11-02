$(function () {


$("#form").find(".input input").focus(function () {
    $(this).parent(".input").addClass("on").find("span").fadeOut("fast");
}).blur(function () {
    var $this = $(this);
    if ($this.val() == "") {
        $this.parent(".input").removeClass("on").find("span").fadeIn("fast")
    }
});



})