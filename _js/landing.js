$(window).on('load', function() {

	var $window = $(window);
	// var docScrollTop = $window.scrollTop();
	var content = $('.content');
	var height = content.height();
    var winHeight = $window.height();

    parallaxScroll();

	$window.bind('scroll',function(e){
	    parallaxScroll();
	});

	function parallaxScroll(){
	    var docScrollTop = $window.scrollTop();
	    var docViewBottom = docScrollTop + winHeight;
	    var parallax = content.find('.parallax');

	    content.css('background-position', '0px ' + (0 + (docScrollTop * .35)) + 'px');

	    // parallax.css('transform', 'translateY(' + (0 + (docScrollTop * .2)).toString() + 'px)');
	    // content.height(height - (docScrollTop * .2));

	    var infoSections = content.find('.info-section');

	    infoSections.each(function(i){
	    	var elem = $(this);
	    	var elemTop = elem.offset().top;
	    	var elemBottom = elemTop + elem.height();

	    	var percents = (elemTop - docScrollTop)/winHeight;

	    	if (percents > 1) {
	    		percents = 1;
	    	}
	    	if (percents < 0) {
	    		percents = 0;
	    	}

	    	var translate = -200*(1-percents);

	    	elem.css('transform', 'translateY(' + translate.toString() + 'px)');

	    });
	}

});