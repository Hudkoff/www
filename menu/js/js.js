$(document).ready(function() {
	
	var menu = $(".menu");
	var menuItem = $(menu).find(".section");
	var submenu = $(menu).find(".submenu");
	var bg = $(menu).find(".submenu-bg");
	var height = [0]; // переменная, которая будет хранить высоты элементов
	var max;
	var done = false;


	// ищем максимальную высоту среди подменю
	$(submenu).each(function(indx, element){
		h = $(this).outerHeight();
		height.push(h);	// в массиве 2 значения: [0, h]
		max = Math.max(height[0], height[1]); // выбираем максимальное из них
		height = [max]; // перезаписываем массив
	});

	// добавляем запас и назначем высоту подложен и блокам подменю
	height[0] += 15;
	$(menuItem).hover(function(){
		if (!done) {
			$(bg).height(height[0]);
			$(submenu).height(height[0]);
			done = true;
		}
	},function(){
		if (!done) {
			$(bg).height(height[0]);
			$(submenu).height(height[0]);
			done = true;
		}
	});

});