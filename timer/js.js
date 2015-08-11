

function format (sec) {
	var mm = Math.floor(sec / 60);
	if (mm < 10) {
		mm = "0" + mm
	}
	var ss = sec % 60;
	if (ss < 10) {
		ss = "0" + ss
	}	
	return mm + ":" + ss;
}




$(document).ready(function(){

	var display = $("section")
	var slidertimer;
	var i;

	$("a").on('click', function(){

		var _this = $(this);

		var start = _this.attr("data-start");
		var alert = _this.attr("data-alert");


		if (!_this.hasClass("active")) {

			clearInterval(slidertimer);
			display.text( format(start) );
			$(".active").removeClass("active paused");
			$("body").removeClass("alert ahtung");

			_this.addClass("active");


			i = start;
			
			slidertimer = setInterval(function() {
				i--; 
				if (i <= alert) {
					$("body").addClass("alert");
				}
				if (i == 0) {
					clearInterval(slidertimer);
					$("body").addClass("ahtung");
				}
				display.text( format(i) );
			}, 1000);

		} else {


			if (_this.hasClass("paused")) {

				slidertimer = setInterval(function() {
					i--; 
					if (i <= alert) {
						$("body").addClass("alert");
					}
					if (i == 0) {
						clearInterval(slidertimer);
						$("body").addClass("ahtung");
					}
					display.text( format(i) );
				}, 1000);

			} else {
				clearInterval(slidertimer);

				console.log(i)

			}

			_this.toggleClass("paused");
			


		}


		
	});


});