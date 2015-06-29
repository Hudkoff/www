$(document).ready(function() {
	$(".menu-item").hover(
		function(){
		  $(".submenu-box").addClass("over");
		},
		function(){
		  $(".submenu-box").removeClass("over");
		});
});