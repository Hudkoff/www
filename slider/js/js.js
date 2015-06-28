function sliderJS (obj, sl) {
	var ul = $(sl).find("ul"); 
	var nav = $(sl).find(".nav"); 

	var prev_slide = $(ul).find(".on"); // предыдущий слайд
	var prev_nav = $(nav).find(".on"); // предыдущий буллет
	$(prev_slide).removeClass("on"); 
	$(prev_nav).removeClass("on"); 

	var current_slide = $(ul).find("li.slide" + obj); // находим указанный из слайдов
	$(current_slide).addClass("on").fadeIn(250, function(){ 
		$(prev_slide).hide();
	}); 

	var current_nav = $(nav).find("span").eq(obj);
	$(current_nav).addClass("on"); // делаем активным буллет

}

$(document).ready(function() {
	$(".slider").each(function () { // обрабатываем каждый слайдер - если их несколько
		var obj = $(this);
		var slide = $(obj).find("li");

		// добавляем блок навигации
		$(obj).append("<div class='nav'></div>");
		$(slide).each(function () {
			$(obj).find(".nav").append("<span rel='"+$(this).index()+"'></span>"); 
			$(this).addClass("slide" + $(this).index());
		});

		// делаем активными 1й слайд и 1ю кнопку
		$(slide).first().addClass("on").show(); 
		$(obj).find("span").first().addClass("on"); 

		// цикличность
		var i = 1; // т.к. 0й уже показан 
		var num = $(slide).size();
		var slidertimer = setInterval(function() {
			  sliderJS(i, obj); 
			  i++;
			  if (i == num) {
				  i = 0;
			  }
		}, 5000);

		// клик
		$(document).on("click", ".slider .nav span", function() {
			var sl = $(this).closest(".slider"); // находим, в каком слайдере был клик - если их несколько
			
			clearInterval(slidertimer);

			var obj = $(this).attr("rel"); // узнаем его номер
			sliderJS(obj, sl);
			return false;
		});

	});

});

