$(document).ready(function() {
	

	var menuItem = $(".menu .menu-item");

	var subMenuSection = $(".submenu-box ul").not(".no-in-menu");


	function mmwidth() {

		var width = [];  // переменная, которая будет хранить ширины элементов
	 
		$(menuItem).each(function(indx, element){
			width = $(this).outerWidth()
			// width.push($(this).outerWidth());
			$(subMenuSection[indx]).width(width);

			// console.log(subMenuSection[indx],width)
		});			
	}


	$(menuItem).hover(
		function(){
			$(this).addClass("on")
			
			mmwidth();
			$(subMenuSection[$(this).index()]).addClass("on");
			$(".submenu-box").addClass("over");
		},
		function(){
			$(this).removeClass("on")
			$(".submenu-box").removeClass("over");
			$(".submenu-box .on").removeClass("on");
		});

	$(subMenuSection).hover(
		function(){
			$(this).addClass("on");
			// console.log($(this).index());
			
			$(menuItem[$(this).index()-1]).addClass("on");
		},
		function(){
			$(this).removeClass("on")
			$(".menu .on").removeClass("on");
		});
});