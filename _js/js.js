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
	$(section).hover(function(){
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





//////////////////////////////////////////////
// имитация работы серых кнопок
//////////////////////////////////////////////

	$("a.buttonGRAY").each(function(){
		$(this).on('click', function(){
			$(this).toggleClass("true");
			if($(this).hasClass("true")) {
				$('.subscribe-popup').hide();
				$(this).closest('.subscribe-with-popup').find('.subscribe-popup').show();
			} else {
				$('.subscribe-popup').hide();
			}
			return false;
		});
	});

	$("body").on('click', function (e) {
		if(!e.target.closest(".subscribe-popup")) {
			$(".subscribe-popup").hide();
		}
	});

	$(".subscribe-popup .icon-close").on("click", function(e){
		e.preventDefault();
		$(this).closest(".subscribe-popup").hide();
	});

});




















//////////////////////////////////////////////
// Чекбоксы & Радиобатоны
//////////////////////////////////////////////

// function changeCheck(el) {
// 	// обрабатываем клик по обертке
//     var el = el,
//         input = el.find("input").eq(0);
//    	if (input.attr("checked")) {
// 		el.removeClass("checked");	
// 		input.attr("checked", false);
// 	} else {
// 		el.addClass("checked");	
// 		input.attr("checked", true);
// 	}
//     return true;
// }

// function changeRadio(el) {
// 	// обрабатываем клик по обертке
// 	var el = el,
// 		input = el.find("input").eq(0);
// 	var nm = input.attr("name");
		
// 	$(".radioWrap input").each(function() {
// 		if ($(this).attr("name") == nm) {
// 			$(this).parent().removeClass("checked");
// 		}		   
// 	});					  	
// 	if (el.attr("class").indexOf("niceRadioDisabled") == -1) {	
// 		el.addClass("checked");
// 		input.attr("checked", true);
// 	}	
//     return true;
// }


// function changeCheckStart(el) {
// 	// 	если установлен атрибут checked, меняем вид чекбокса 
// 	var el = el,
// 	input = el.find("input").eq(0);
//     if(input.attr("checked")) {
// 		el.addClass("checked");	
// 	}
//     return true;
// }
// function changeRadioStart(el) {
// 	// 	если установлен атрибут checked, меняем вид чекбокса 
// 	var el = el,
// 	input = el.find("input").eq(0);
//     if(input.attr("checked")) {
// 		el.addClass("checked");	
// 	}
//     return true;
// }

// function bindControls() {
// 	// 	 при загрузке страницы
// 	$(".checkboxWrap").each(function() {
// 	    changeCheckStart($(this));
// 	});
// 	$(".radioWrap").each(function() {
// 	     changeRadioStart($(this));
// 	});
// 	// при клике
// 	$(".checkboxWrap").on("mouseup", function() {
// 	    changeCheck($(this)); 
// 	});
// 	$(".radioWrap").on("mouseup", function() {
// 	    changeRadio($(this)); 
// 	});
// }



// $(document).ready(function(){
// 	bindControls();
// });




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
	// bindControls();
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

var graveGallery = $(".page_cemetery .grave-photo");
if (graveGallery.length != 0) { // если элемент есть на странице
	graveGallery.colorbox({
		//rel:'gal', // uncomment to turn the group photo gallery on / включает группирование фоток в галерее
		fixed: true,
		className: 'colorbox-gallery border-LIFE',
		current: "{current} из {total}"
	});
}

var p_globalSearch = $(".globalSearch");
if (p_globalSearch.length != 0) { // если элемент есть на странице
	p_globalSearch.colorbox({
		href: "_block-seo.shtml", // надо присвоить href т.к. поле ввода не имеет ссылки
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

var p_loginButton = $(".login a");
if (p_loginButton.length != 0) { // если элемент есть на странице
	p_loginButton.colorbox({
		rel: "login",
		scrolling: false,
		opacity: 0.5,
		onComplete: cboxPageScrollingAdjust,
		onCleanup: cboxPageScrollingReturn,
		className: "popup popup_login-reg",
	});
}

var p_askrav = $(".p_ask-rav");
if (p_askrav.length != 0) { // если элемент есть на странице
	p_askrav.colorbox({
		scrolling: false,
		opacity: 0.5,
		width: "526px",
		onComplete: cboxPageScrollingAdjust,
		onCleanup: cboxPageScrollingReturn,
		className: "popup popup_ask-rav",
	});
}

// заготовка
var p_error = $(".p_error");
if (p_error.length != 0) { // если элемент есть на странице
	p_error.colorbox({
		scrolling: false,
		opacity: 0.5,
		width: "526px",
		onComplete: cboxPageScrollingAdjust,
		onCleanup: cboxPageScrollingReturn,
		className: "popup popup_error",
	});
}

// заготовка
var p_family = $(".p_family");
if (p_family.length != 0) { // если элемент есть на странице
	p_family.colorbox({
		scrolling: false,
		opacity: 0.5,
		width: "526px",
		onComplete: cboxPageScrollingAdjust,
		onCleanup: cboxPageScrollingReturn,
		className: "popup popup_family",
	});
}

// заготовка
var p_follow_rss = $(".p_follow-rss");
if (p_follow_rss.length != 0) { // если элемент есть на странице
	p_follow_rss.colorbox({
		scrolling: false,
		opacity: 0.5,
		width: "526px",
		onComplete: cboxPageScrollingAdjust,
		onCleanup: cboxPageScrollingReturn,
		className: "popup popup_follow-rss",
	});
}

// заготовка
var p_follow_webinar = $(".p_follow-webinar");
if (p_follow_webinar.length != 0) { // если элемент есть на странице
	p_follow_webinar.colorbox({
		scrolling: false,
		opacity: 0.5,
		width: "526px",
		onComplete: cboxPageScrollingAdjust,
		onCleanup: cboxPageScrollingReturn,
		className: "popup popup_follow-webinar",
	});
}

// заготовка
var p_funer = $(".p_funer");
if (p_funer.length != 0) { // если элемент есть на странице
	p_funer.colorbox({
		scrolling: false,
		opacity: 0.5,
		width: "526px",
		onComplete: cboxPageScrollingAdjust,
		onCleanup: cboxPageScrollingReturn,
		className: "popup popup_funer",
	});
}

// заготовка
var p_request_edu = $(".p_request-edu");
if (p_request_edu.length != 0) { // если элемент есть на странице
	p_request_edu.colorbox({
		scrolling: false,
		opacity: 0.5,
		width: "526px",
		onComplete: cboxPageScrollingAdjust,
		onCleanup: cboxPageScrollingReturn,
		className: "popup popup_request-edu",
	});
}

// заготовка
var p_request_study = $(".p_request-study");
if (p_request_study.length != 0) { // если элемент есть на странице
	p_request_study.colorbox({
		scrolling: false,
		opacity: 0.5,
		width: "526px",
		onComplete: cboxPageScrollingAdjust,
		onCleanup: cboxPageScrollingReturn,
		className: "popup popup_request-study",
	});
}

// заготовка
var p_pay = $(".p_pay");
if (p_pay.length != 0) { // если элемент есть на странице
	p_pay.colorbox({
		scrolling: false,
		opacity: 0.5,
		width: "526px",
		onComplete: cboxPageScrollingAdjust,
		onCleanup: cboxPageScrollingReturn,
		className: "popup popup_pay",
	});
}
// 2-я страница p_pay-settings










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
// Показать-Скрыть авторов блогов
//////////////////////////////////////////////


$(document).ready(function() {

	var authorsBlock = $(".authors-block"),
		placeholder = $(".authors-block-placeholder"),
		wrapper = $(".blogs-authors-block");
	var height = 0,
		width = 0;

	$(".toggle-authors").on('click', function () {

		height = wrapper.height();
		width = wrapper.width();

		if (wrapper.hasClass("authors-block-expanded") ) {
			wrapper.css("width",'auto');
		} else {
			wrapper.css("width",width);
		}

		placeholder.toggle();
		$(this).toggleClass('flipped');
		authorsBlock.toggleClass('authors-expanded');
		wrapper.toggleClass('authors-block-expanded');
	})
});












//////////////////////////////////////////////
// Показать-Скрыть тэги
//////////////////////////////////////////////

var tagsButton = $(".tags-button"),
	tagsTextToggle = $(".showTags-text, .hideTags-text"),
	tagsCloud = $(".tags-hidden");

tagsButton.on('click', function(){
	tagsTextToggle.toggle();
	tagsCloud.slideToggle();
});


var allTagsTextToggle = $(".showAllTags-text, .hideAllTags-text"),
	allTags = $(".tag-cloud_additional"),
	allTagsButton = $(".show-all-tags-button"),
	asideTags = $(".tags-aside"),
	asideAllTagsButton = asideTags.find(".show-all-tags-button");


allTagsButton.on('click', function(){
	allTags.slideToggle();
	allTagsTextToggle.toggle();
});

asideAllTagsButton.on('click', function() {
	var tagsHight = asideTags.outerHeight(true) - 10;
	if (asideTags.hasClass("asideTagsExpanded")) {
		$(".tags-placeholder").css('height',0);
	} else {
		$(".tags-placeholder").css('height',tagsHight);
	}
	asideTags.toggleClass("asideTagsExpanded");

	$(".tag-cloud_aside_short").toggle();
	$(".tag-cloud_aside_full").toggle();
});

// Автоподстановка тегов
$(function() {
	var availableTags = [];
	$(".tag-cloud a").each(function(){
		availableTags.push( $(this).text() );
	});

	$(".tag-search input[type='text']").autocomplete({
		source: availableTags
	});
});






//////////////////////////////////////////////
// Календарь
//////////////////////////////////////////////

$(".calendar").datepicker( {
	dateFormat: "dd-mm-yy",
	firstDay: 1,
	monthNames: [ "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь" ],
	dayNamesMin : [ "Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб" ]
} );




//////////////////////////////////////////////
// Список авторов
//////////////////////////////////////////////

$(function() {
	var authorsButton = $(".all-authors-button"),
		authorsShort = $(".all-authors-short"),
		authorsFull = $(".all-authors-full"),
		allAuthors = $(".all-authors");

	authorsButton.on('click',function(e){
		e.preventDefault();
		authorsShort.toggle();
		authorsFull.toggle();
		allAuthors.toggleClass("all-authors-expanded");
	});
});



//////////////////////////////////////////////
// Табы
//////////////////////////////////////////////

$( "#tabs" ).tabs({active: 0});





//////////////////////////////////////////////
// Энциклопедия
//////////////////////////////////////////////
$(function() {

	if ($(".carousel-block").length != 0) {

		function carouselKill() {
			$(".carousel-block").css('width', 'auto');
			$(".carousel-block").find('ul').css('width', 'auto');
			$('.button-next').off('click');
			$('.button-prev').off('click');
		}

		function carouselInit() {
			var maxWidth = $(".daytopic-menu").width() - 70;
			var count = maxWidth / 75;

			$(".carousel-block").jCarouselLite({
				btnNext: ".button-next",
				btnPrev: ".button-prev",
				visible: count,
				scroll: 5,
				circular: false
			});
		}

		carouselInit();

		$(window).on('resize', function() {
			carouselKill();
			carouselInit();
		})	

	}

	$('.daytopic-wiki').find("a").tipsy({
		gravity: 's',
		offset: 4
	});


});


$(function() {

	var currency = $('.donation-currency'),
		submitCurrency = $('.submit-block .currency');

	currency.on('change', function(){
		$('.donation-currency').val(this.value);
		submitCurrency.html(this.value);
	});

	$('.donation-flag').on('click', function(){
		$(this).closest(".hesed-item").toggleClass('active').find('.donation-block').slideToggle(200);
	});

	var total = 0,
		e_val = $(".donation-sum"),
		e_total = $('.submit-block .total-sum .sum'),
		submit = $('.submit-block input[type="submit"]');

	function donationValidator() {
		var e_active_val = $('.hesed-item.active .donation-sum'),
			total = 0;

		e_active_val.each(function(){
			total += parseFloat(this.value);
		});

		if(total > 0) {
			submit.prop('disabled', false);
		} else {
			submit.prop('disabled', true);
		}
		return total;
	}

	donationValidator();

	e_val.on('keyup',function(){
		total = donationValidator();
		e_total.html(total);
	})
});



//////////////////////////////////////////////
// Тесты
//////////////////////////////////////////////
$(function() {
	var wrapper = $(".test-result-block"),
		progressbar = wrapper.find(".progressbar"),
		worm = wrapper.find(".worm"),
		score = wrapper.find(".score").text(),
		maxScore = wrapper.find(".maximum-score").text();

	var width = score * 100 / maxScore;
	worm.css('width', width + '%');

});
