(function( $, undefined ) {

	'use strick';

	/*
	 * @DENNY K@
	 * indyFadeBox object.
	*/

	$.indyFadeBox  		= function( element, options ) {

		this.$el    = $( element );
		this._init( options );

	};

	$.indyFadeBox.defaults       = {

		'effect' 		: 'fade-in',
		'clName' 		: '.indy-fade-box',		

	};

	$.indyFadeBox.prototype   = {


		_init               : function( options ) {

			var 
			_self 				= this,
			element 			= _self.$el;

			this.options  		= $.extend( true, {}, $.indyFadeBox.defaults, options );

			_self.winHeight 	= 0;
			_self.scrollTop 	= 0;
			_self.elSet 		= element.find(_self.options.clName).addClass('indy-fade-box');

			element.addClass(_self.options.effect + ' indy-fade-box-container');

			_self._setValue();
			_self._preset();
			_self._events();

		},


		_setValue : function () {

			var
			_self = this;

			_self.winHeight = $(window).height();
			_self.scrollTop = $(window).scrollTop();			

		},

		_events : function () {

			var
			_self = this;

			$(window).on('scroll resize', function() {

				_self._checkVisible();
				_self._setValue();

			});

		},

		_preset : function () {

			var
			_self = this,
			elSet = _self.elSet;

			elSet.addClass('hide new');

			_self._checkVisible();


		},

		_checkVisible : function () {

			var 
			_self = this,
			elSet = _self.elSet,
			delta = _self.scrollTop + _self.winHeight;


			elSet.each(function() {

				var
				el 		= $(this),
				elTop 	= el.offset().top;				

				if (delta > elTop) {

					el
					.removeClass('hide')
					.addClass('show animate')
					.removeClass('new');

					_self.elSet = _self.elSet.not(el);

				}

			});


		},

		_newElement : function () {

			var
			_self 		= this,
			elSet 		= _self.elSet,
			element 	= _self.$el,
			newEl 		= element.find(_self.options.clName).not(elSet).addClass('indy-fade-box');

			_self.elSet = _self.elSet.add(newEl);
			
			_self._preset();

		},


	};


	$.fn.indyFadeBox          = function( options ) {

		var args = Array.prototype.slice.call(arguments, 1);
		return this.each(function() {
			var item = $(this), instance = item.data('indyFadeBox');
			if(!instance) {

				item.data('indyFadeBox', new $.indyFadeBox(this, options));

			} else {

				if(typeof options === 'string') {
					instance[options].apply(instance, args);
				}
			}
		});		

	};

})( jQuery );

