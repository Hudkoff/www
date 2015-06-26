function sliderJS (obj, sl) {
	var ul = $(sl).find("ul"); // находим блок
	var bl = $(sl).find("li.slider"+obj); // находим любой из элементов блока
	$(bl).fadeIn(250, function(){ 
			$(ul).find(".on").removeClass("on").hide();
			$(this).addClass("on");
		}); 
}

$(document).ready(function() {
	$(".slider").each(function () { // обрабатываем каждый слайдер
		var obj = $(this);
		
		// добавляем блок навигации
		$(obj).append("<div class='nav'></div>");
		$(obj).find("li").each(function () {
			$(obj).find(".nav").append("<span rel='"+$(this).index()+"'></span>"); 
			$(this).addClass("slider"+$(this).index());
		});
		$(obj).find("span").first().addClass("on"); // делаем активным первый элемент меню
		$(obj).find("li").first().addClass("on"); // делаем активным первый элемент меню
	});
});



$(document).on("click", ".slider .nav span", function() {
	var sl = $(this).closest(".slider"); // находим, в каком блоке был клик
	// $(sl).find("span").removeClass("on"); // убираем активный элемент
	// $(this).addClass("on"); // делаем активным текущий
	var obj = $(this).attr("rel"); // узнаем его номер
	sliderJS(obj, sl); // слайдим
	return false;
});