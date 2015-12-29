$(window).on('load', function() {

	var $window = $(window);
	var content = $('.content');
	var height = content.height();

	$window.bind('scroll',function(e){
	    parallaxScroll();
	});

	function parallaxScroll(){
	    var docScrollTop = $window.scrollTop();
	    var docViewBottom = docScrollTop + $window.height();
	    var parallax = content.find('.parallax');

	    content.css('background-position-y', (0 + (docScrollTop * .5)) + 'px');

	    // parallax.css('transform', 'translateY(' + (0 + (docScrollTop * .2)).toString() + 'px)');
	    // content.height(height - (docScrollTop * .2));

	    var infoSections = content.find('.info-section');

	    infoSections.each(function(i){
	    	var elem = $(this);
	    	var elemTop = elem.offset().top;
	    	var elemBottom = elemTop + elem.height();

	    	var translate = (-190 -((docScrollTop - elemTop) *.3));

	    	if(elemTop > docScrollTop && elemTop < docViewBottom && translate > -190 && translate < 0) {
	    		elem.css('transform', 'translateY(' + translate.toString() + 'px)');
	    	}
	    });
	}

});