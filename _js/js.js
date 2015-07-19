$(document).ready(function() {



//////////////////////////////////////////////
// lenta
//////////////////////////////////////////////

	var lentaItem;
	var box = $(".lenta-box");
	var newItem;

	var slidertimer = setInterval(function() {

		lentaItem = $(box).find(".lenta:last-child");
		noScrollItemLast = $(box).find(".no-scroll:last"); // добавить этот класс тем блокам, которые должны оставаться вверху
		lentaItem.fadeOut(600, function(){
			$(this).detach();
			newItem = $(this); // $(this) заменить на функцию ajax, которая сформирует новость в нужном шаблоне
			if (!noScrollItemLast) {
				newItem.prependTo($(box)); 
			} else {
				newItem.insertAfter($(noScrollItemLast));
			}
			newItem.fadeIn(600)
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
		$(this).width(w-1);

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
// Чекбоксы
//////////////////////////////////////////////

function changeCheck(el) {
	// обрабатываем клик по чекбоксу
    var el = el, // контейнер дял обычного чекбокса 
        input = el.find("input").eq(0);
   	if(input.attr("checked")) {
		el.removeClass("checked");	
		input.attr("checked", false);
	} else {
		el.addClass("checked");	
		input.attr("checked", true);
	}
    return true;
}

function changeCheckStart(el) {
	// 	если установлен атрибут checked, меняем вид чекбокса 
	var el = el,
	input = el.find("input").eq(0);
    if(input.attr("checked")) {
		el.addClass("checked");	
	}
    return true;
}

$(document).ready(function(){
	// 	 при загрузке страницы нужно проверить какое значение имеет чекбокс и в соответствии с ним выставить вид     
	$(".checkboxWrap").each(function() {
	    changeCheckStart($(this));
	});
	// при клике на чекбоксе меняем его вид и значение 
	$(".checkboxWrap").on("mouseup", function() {
	    changeCheck($(this)); 
	});
});













//////////////////////////////////////////////
// ColorBox 
//////////////////////////////////////////////

// перенос скроллинга с окна на попап и назад
function cboxPageScrollingAdjust() {
	$("html, body").addClass("cboxOn");
	var H = Math.max($("#colorbox").outerHeight(), $(window).height()); // если попап больше окна, то скролла нет, т.к. переполнение = высоте окна
	$("body").height(H);

	// обрабатываем чекбоксы на попапе - т.к. в момент привязки событий к чекбоксам попапа не существует
	$(".checkboxWrap").each(function() {
	    changeCheckStart($(this));
	});
	$(".checkboxWrap").on("mouseup", function() {
	    changeCheck($(this)); 
	});
}
function cboxPageScrollingReturn() {
	$("html, body").removeClass("cboxOn");
	$("body").height("auto");
}

var galleryPhoto = $(".page_gallery .photoBlock.photo a");
if (galleryPhoto.length != 0) { // если элемент есть на странице
	galleryPhoto.colorbox({
		rel:'gal', // uncomment to turn the group photo gallery on / включает группирование фоток в галерее
		fixed: true,
		className: 'colorbox-gallery border-9c5630',
		current: "{current} из {total}"
	});
}

var globalSearch = $(".globalSearch");
if (globalSearch.length != 0) { // если элемент есть на странице
	globalSearch.colorbox({
		href: "_block-seo.shtml", // надо перебить т.к. поле ввода не имеет ссылки
		opacity: 0.5,
		scrolling: false,
		width: "80%",
		maxWidth: "1600px",
		height: "60%",
		onComplete: cboxPageScrollingAdjust,
		onCleanup: cboxPageScrollingReturn,
		className: "popup",
		current: ''
	});
}

var loginButton = $(".login a");
if (loginButton.length != 0) { // если элемент есть на странице
	loginButton.colorbox({
		rel: "login",
		scrolling: false,
		opacity: 0.5,
		onComplete: cboxPageScrollingAdjust,
		onCleanup: cboxPageScrollingReturn,
		className: "popup popup_login-reg",
		current: ''
	});
}

















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




















//////////////////////////////////////////////
// Показать-Скрыть тэги
//////////////////////////////////////////////

var tagsButton = $(".tags-button"),
	tagsTextToggle = $(".showTags, .hideTags"),
	tagsCloud = $(".tag-cloud-wrapper");

tagsButton.on('click', function(){
	tagsTextToggle.toggle();
	tagsCloud.slideToggle();
});

var allTagsTextToggle = $(".show-all-tags-text, .hide-all-tags-text"),
	allTags = $(".all-tags"),
	allTagsButton = $(".show-all-tags");

allTagsButton.on('click', function(){
	allTags.slideToggle();
	allTagsTextToggle.toggle();
});



