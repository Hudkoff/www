$(window).on('load', function() {

	//$('.tree-container').indyFadeBox();

	var levels = $('.level');
	var height = 0;

	for (var i = 0; i < levels.length; i++) {
		var level = $(levels[i]);
		var picture = level.find('.picture-section');
		var pictureHeight = picture.outerHeight();
		var tree = level.find('.info-section');
		var treeHeight = tree.outerHeight();

		level.height((pictureHeight + treeHeight) + 'px');
		level.css('top', height + 'px');
	}

	$(window).bind('scroll',function(e){
	    parallaxScroll();
	});

	function parallaxScroll(){
	    var scrolled = $(window).scrollTop();
	    $('.parallax-1').css('top',(0-(scrolled*.25))+'px');

	    var levels = $('.level');

		for (var i = 0; i < levels.length; i++) {
			var level = $(levels[i]);
			//if(level.visible(true)){
				var picture = level.find('.picture-section');
				var pictureHeight = picture.outerHeight();
				var tree = level.find('.info-section');
				var treeHeight = tree.outerHeight();

				picture.css('top',(0-((scrolled - level.position().top) *.5))+'px');
				tree.css('top',(344-((scrolled - level.position().top) *.75))+'px');
				//level.height(tree.hegiht );
			//}
		}
	    
	}

});