$(document).ready(function() {
	
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