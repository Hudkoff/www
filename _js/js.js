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
// Чекбоксы & Радиобатоны
//////////////////////////////////////////////

function changeCheck(el) {
	// обрабатываем клик по обертке
    var el = el,
        input = el.find("input").eq(0);
   	if (input.attr("checked")) {
		el.removeClass("checked");	
		input.attr("checked", false);
	} else {
		el.addClass("checked");	
		input.attr("checked", true);
	}
    return true;
}

function changeRadio(el) {
	// обрабатываем клик по обертке
	var el = el,
		input = el.find("input").eq(0);
	var nm = input.attr("name");
		
	$(".radioWrap input").each(function() {
		if ($(this).attr("name") == nm) {
			$(this).parent().removeClass("checked");
		}		   
	});					  	
	if (el.attr("class").indexOf("niceRadioDisabled") == -1) {	
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
function changeRadioStart(el) {
	// 	если установлен атрибут checked, меняем вид чекбокса 
	var el = el,
	input = el.find("input").eq(0);
    if(input.attr("checked")) {
		el.addClass("checked");	
	}
    return true;
}

function bindControls() {
	// 	 при загрузке страницы
	$(".checkboxWrap").each(function() {
	    changeCheckStart($(this));
	});
	$(".radioWrap").each(function() {
	     changeRadioStart($(this));
	});
	// при клике
	$(".checkboxWrap").on("mouseup", function() {
	    changeCheck($(this)); 
	});
	$(".radioWrap").on("mouseup", function() {
	    changeRadio($(this)); 
	});
}



$(document).ready(function(){
	bindControls();
});


// function changeVisualRadio(input) {
// 	//	меняем вид radio при смене значения
// 	var wrapInput = input.parent();
// 	var nm = input.attr("name");
		
// 	$(".radioWrap input").each(function() {
// 		if ($(this).attr("name") == nm) {
// 			$(this).parent().removeClass("checked");
// 		}     
// 	});

// 	if(input.attr("checked")) {
// 		wrapInput.addClass("checked");
// 	}
// }



// function changeRadioStart(el) {
// 	/* 
// 		новый контрол выглядит так <span class="niceRadio"><input type="radio" name="[name radio]" id="[id radio]" [checked="checked"] /></span>
// 		новый контрол получает теже name, id и другие атрибуты что и были у обычного
// 	*/
// 	try {
// 		var el = el,
// 			radioName = el.attr("name"),
// 			radioId = el.attr("id"),
// 			radioChecked = el.attr("checked"),
// 			radioDisabled = el.attr("disabled"),
// 			radioTab = el.attr("tabindex"),
// 			radioValue = el.attr("value");
// 		if(radioChecked)
// 			el.after("<span class='niceRadio radioChecked'>"+
// 				"<input type='radio'"+
// 				"name='"+radioName+"'"+
// 				"id='"+radioId+"'"+
// 				"checked='"+radioChecked+"'"+
// 				"tabindex='"+radioTab+"'"+
// 				"value='"+radioValue+"' /></span>");
// 		else
// 			el.after("<span class='niceRadio'>"+
// 				"<input type='radio'"+
// 				"name='"+radioName+"'"+
// 				"id='"+radioId+"'"+
// 				"tabindex='"+radioTab+"'"+
// 				"value='"+radioValue+"' /></span>");
		
// 		/* если контрол disabled - добавляем соответсвующий класс для нужного вида и добавляем атрибут disabled для вложенного radio */		
// 		if(radioDisabled) {
// 			el.next().addClass("niceRadioDisabled");
// 			el.next().find("input").eq(0).attr("disabled","disabled");
// 		}
		
// 		/* цепляем обработчики стилизированным radio */		
// 		el.next().bind("mousedown", function(e) { changeRadio($(this)) });

// 		if($.browser.msie) {
// 			el.next().find("input").eq(0).bind("click", function(e) { changeVisualRadio($(this)) });
// 		} else {
// 			el.next().find("input").eq(0).bind("change", function(e) { changeVisualRadio($(this)) });
// 		}

// 		el.remove();
// 	}
// 	catch(e) {
// 		// если ошибка, ничего не делаем
// 	}

// 	return true;
// }










//////////////////////////////////////////////
// ColorBox 
//////////////////////////////////////////////

// перенос скроллинга с окна на попап и назад
function cboxPageScrollingAdjust() {
	// var offset = window.pageYOffset;
	$("html, body").addClass("cboxOn");
	var H = Math.max($("#colorbox").outerHeight(), $(window).height()); // если попап больше окна, то скролла нет, т.к. переполнение = высоте окна
	$("body").height(H);

	// обрабатываем чекбоксы на попапе - т.к. в момент привязки событий к чекбоксам попапа не существует
	bindControls();
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
		className: 'colorbox-gallery border-PHOTO',
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
	});
}

var loginButton = $(".p_ask-rav");
if (loginButton.length != 0) { // если элемент есть на странице
	loginButton.colorbox({
		scrolling: false,
		opacity: 0.5,
		width: "526px",
		onComplete: cboxPageScrollingAdjust,
		onCleanup: cboxPageScrollingReturn,
		className: "popup popup_ask-rav",
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


$(function() {
	var availableTags = [];
	$(".tag-cloud li a").each(function(){
		availableTags.push( $(this).text());
	});

	$( "#tagsSearch" ).autocomplete({
		source: availableTags
	});
});


