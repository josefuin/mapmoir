jQuery(document).ready(function($){
	var i = 0;

init();

/*==========  call all custom functions  ==========*/
function init() {
    
    $(window).on("scroll", scrolling);
}
/*==========  ==========  ==========*/


/*==========  get scrollTop  ==========*/
function getScrollTop(){
    if(typeof pageYOffset!= 'undefined'){
        //most browsers except IE before #9
        return pageYOffset;
    }
    else{
        var B= document.body; //IE 'quirks'
        var D= document.documentElement; //IE with doctype
        D= (D.clientHeight)? D: B;
        return D.scrollTop;
    }
}
/*==========  ==========  ==========*/


/*==========  check for when user stops scrollilng  ==========*/
function stoppedScrolling() {
    var timer;
    $(window).bind('scroll',function () {
        clearTimeout(timer);
        timer = setTimeout( refresh , 150 );
    });
    var refresh = function () {
        // do stuff
        var scrollPosition = getScrollTop();
        return scrollPosition;
    };
}
/*==========  ==========  ==========*/


/*==========  trigger animation on scroll  ==========*/
function scrolling() {
    var scrollTop = getScrollTop();
        $("#debug").text("you are " + scrollTop + " px into this story");
    if (scrollTop > 50) {
        addHeightPath1(scrollTop - 150);
    } else {
        addHeightPath1(0);
    }
}
/*==========  ==========  ==========*/


/*==========  add height to line  ==========*/
function addHeightPath1(newHeight) {
    
    $(".path1Ani").css("height", newHeight + "px");
}
/*==========  ==========  ==========*/



	var contentSections = $('.cd-section'),
		navigationItems = $('#cd-vertical-nav a');

	updateNavigation();
	$(window).on('scroll', function(){
		updateNavigation();
	});

	//smooth scroll to the section
	navigationItems.on('click', function(event){
        event.preventDefault();
        smoothScroll($(this.hash));
    });
    //smooth scroll to second section
    $('.cd-scroll-down').on('click', function(event){
        event.preventDefault();
        smoothScroll($(this.hash));
    });

    //open-close navigation on touch devices
    $('.touch .cd-nav-trigger').on('click', function(){
    	$('.touch #cd-vertical-nav').toggleClass('open');
  
    });
    //close navigation on touch devices when selectin an elemnt from the list
    $('.touch #cd-vertical-nav a').on('click', function(){
    	$('.touch #cd-vertical-nav').removeClass('open');
    });

	function updateNavigation() {
		contentSections.each(function(){
			$this = $(this);
			var activeSection = $('#cd-vertical-nav a[href="#'+$this.attr('id')+'"]').data('number') - 1;
			if ( ( $this.offset().top - $(window).height()/2 < $(window).scrollTop() ) && ( $this.offset().top + $this.height() - $(window).height()/2 > $(window).scrollTop() ) ) {
				navigationItems.eq(activeSection).addClass('is-selected');
			}else {
				navigationItems.eq(activeSection).removeClass('is-selected');
			}
		});
	}

	function smoothScroll(target) {
        $('body,html').animate(
        	{'scrollTop':target.offset().top},
        	600
        );
	}


});

