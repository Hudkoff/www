$(document).ready(function() {



//////////////////////////////////////////////
// lenta
//////////////////////////////////////////////

	var lentaItem;
	var box = $(".lenta-box");

	var slidertimer = setInterval(function() {

		lentaItem = $(box).find(".lenta:last-child");
		lentaItem.fadeOut(600, function(){
			$(this).detach();
			$(this).prependTo($(box)).fadeIn(600); // $(this) заменить на функцию ajax, которая сформирует новость в нужном шаблоне
		});

	}, 10000);



//////////////////////////////////////////////
// menu
//////////////////////////////////////////////

	
	var menu = $(".main-menu");
	var section = $(menu).find(".section").not(".no-in-menu"); // все, кроме скрытых
	var submenu = $(section).find(".submenu"); 
	var bg = $(menu).find(".submenu-bg");
	var height = [0]; // переменная, которая будет хранить высоты элементов
	var max;
	var el;
	var done = false;

	// ищем максимальную высоту среди подменю
	$(submenu).each(function(indx, element){
		// находим и устанавливаем ширину пунктов
		w = $(this).parent().find(".menu-item").outerWidth(true);
		$(this).width(w+5);

		// находим максимальную высоту подменю
		h = $(this).outerHeight();
		height.push(h);	// в массиве 2 значения: [0, h]
		max = Math.max(height[0], height[1]); // выбираем максимальное из них
		height = [max]; // перезаписываем массив
	});

	// назначем высоту подложки и блокам подменю
	$(menu).hover(function(){
		if (!done) {
			$(bg).height(height[0]);
			$(submenu).height(height[0]);
			done = true;
		}
		// если нет класса, анимируем - проверка, чтоб не запускать повторную анимацию
		if (!$(bg).hasClass("on")) {
			$(bg).addClass("on").stop(true,true).fadeIn(150);
			$(submenu).stop(true,true).fadeIn(150);			
		} 
	},function(){
		if (!done) {
			$(bg).height(height[0]);
			$(submenu).height(height[0]);
			done = true;
		}
		if ($(bg).hasClass("on")) {
			$(bg).removeClass("on").stop(true,true).fadeOut(150);
			$(submenu).stop(true,true).fadeOut(150);			
		} 
	});

});










//////////////////////////////////////////////
// slider
//////////////////////////////////////////////






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

			if ($(this).hasClass("on")) {
				// ничего не делаем, если включен этот слайд
			} else {
				var obj = $(this).attr("rel"); // узнаем его номер
				sliderJS(obj, sl);

			}
				return false;				

		});

	});

});
