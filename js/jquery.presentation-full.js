(function($) {
  $.fn.presentation = function(options) {
    var config = {
			slide: '.slide',
			pagerClass: 'nav-pager',
			prevNextClass: 'nav-prev-next',
		};
    $(this).each(function() {
      
      var $presentation = $(this);
      $presentation.count = 1;

      //Control the changing of the slide
      $presentation.changeSlide = function(newSlide) {
      
      	$presentation.visibleSlide = $presentation.slides.filter(':visible');
        $presentation.slideToShow = $presentation.slides.filter(':nth-child('+newSlide+')')
      
      	switch ($presentation.options.transition) {
					default:
						$presentation.visibleSlide.fadeOut(0);
						$presentation.slideToShow.fadeIn(300);
				}
      };
    
      //Handle the previous and next functionality
      $presentation.prevNextClick = function(action) {
        if(action === 'prev') {
          $presentation.count === 1 ? $presentation.count = $presentation.slides.length : $presentation.count--;            
        } else {
          $presentation.count === $presentation.slides.length ? $presentation.count = 1 : $presentation.count++;
        }
        
        $presentation.changeSlide($presentation.count);
        window.location.hash = '#'+$presentation.count;
      };
      
      $presentation.addControls = function() {
        $presentation.numSlides = $presentation.slides.length;
        
        //When you hit the left or up arrow or pageup, go to previous slide
        //When you hit the right or down arrow or pagedown, go to next slide
        $(document).keyup(function(e) {
          var action = '';
          if(e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 33) {
            action = 'prev';
          } else if(e.keyCode === 39 || e.keyCode === 40 || e.keyCode === 34) {
            action = 'next';
          }
          
          if(action !== '') {
            $presentation.prevNextClick(action);
          }
        });
      };
      
      //Start this thing
      $presentation.init = function() {
        $presentation.options = $.extend(config, options);
        $presentation.slides = $presentation.find($presentation.options.slide);
        $presentation.currentHash = window.location.hash.substr(1);
        
        //Hide everything except the hash or the first
        if($presentation.currentHash) {
          $presentation.slides.filter(':not(:nth-child('+$presentation.currentHash+'))').hide();
        } else {
          $presentation.slides.filter(':not(:first)').hide();
        }

        $presentation.addControls();
      };
      $presentation.init();
    
      
    });
  };
})(jQuery);