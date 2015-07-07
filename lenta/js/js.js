$(document).ready(function() {

	var lentaItem;
	var box = $(".lenta-box");

	var slidertimer = setInterval(function() {

		lentaItem = $(box).find(".lenta:last-child");
		lentaItem.fadeOut(600, function(){
			$(this).detach();
			$(this).prependTo($(box)).fadeIn(600); // $(this) заменить на функцию ajax, которая сформирует новость в нужном шаблоне
		});

	}, 10000);

});