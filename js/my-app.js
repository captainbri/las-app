// Initialize your app
var myApp = new Framework7({
	cache: true,
	cacheIgnoreGetParameters: false,
	onAjaxStart: showLoading,
	onAjaxComplete: hideLoading,
});


// Export selectors engine
var $$ = Framework7.$;



 
/* test */

function showLoading() {
	$$('body').append('<div class="preloader-indicator-overlay"></div><div class="preloader-indicator-modal"><span class="preloader preloader-white"></span></div>');
	}
function hideLoading() {
	$$('.preloader-indicator-overlay, .preloader-indicator-modal').remove();
}

/* end test */




// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true	
});


/* browser tests */
function getMobileOperatingSystem() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;
  if( userAgent.match( /iPad/i ) || userAgent.match( /iPhone/i ) || userAgent.match( /iPod/i ) ) {return 'iOS';}
  else if( userAgent.match( /Android/i ) ) {return 'Android';}
  else {return 'unknown';}
}
/* END browser tests */



//external links
myApp.onPageInit('*', function (page) {
	$$(document).on('click','.entry-content a',function(e){
		var url = $$(this).attr('href');
		window.open(url, '_system', 'location=yes');
		e.preventDefault();
	});
});




/* facebook post */

/*
myApp.onPageInit('*', function (page) {

var url = $$('a.button-post-facebook').attr('href');

	$$(document).on('click','a.button-post-facebook',function(e){
		var url = $$(this).attr('href');
		iabRef = window.open(url, '_blank', 'location=no,closebuttoncaption=Close Window');
		iabRef.addEventListener('loadstop', iabLoadStop);
        iabRef.addEventListener('exit', iabClose);
		e.preventDefault();
	});
	
	function iabClose(event) {
         iabRef.removeEventListener('loadstop', iabLoadStop);
         iabRef.removeEventListener('exit', iabClose);
    }
	
	function iabLoadStop(event) {
			var curr = event.url;
			var p1 = "disqus.com/next/login-success";
			var p2 = "disqus.com/_ax/google/complete";
			var p3 = "disqus.com/_ax/twitter/complete";
			var p4 = "disqus.com/_ax/facebook/complete";
			
			if (event.url == "http://lifeasasister.org/wp-content/themes/imagine/mobile-app/closeInAppBrowser.html") {iabRef.close();}
			else if (curr.indexOf(p1) != -1 || curr.indexOf(p2) != -1 || curr.indexOf(p3) != -1 || curr.indexOf(p4) != -1) { 	
				iabRef = window.open(url, '_blank', 'location=no,closebuttoncaption=Close Window');
			}
    }


});

*/
/* end facebook post */




// track page views
myApp.onPageInit('*', function (page) {
	$$('a.track').on('click', function (e) {
		var url = $$(this).data('ga');
		ga('send', 'pageview', url);
	});
});





// infinite scroll posts.
myApp.onPageInit('*', function (page) {

// Attach 'infinite' event handler
var pagenum = 1;
var loading = false;
var num_messages = $$('.list-feed').data('max');
var type = $$('.list-feed').data('type');

$$('.infinite-scroll').on('infinite', function () {

  if (pagenum >= num_messages) {
      myApp.detachInfiniteScroll($$('.infinite-scroll'));
      $$('.infinite-scroll-preloader').remove();
      return;
    }
else {
	pagenum += 1;
	loading = true;
	$$.get('http://lifeasasister.org/ajax/load-more/?type='+type+'&ajaxpage='+pagenum+'', function( data ) {
		$$( ".list-feed ul" ).append( data );
	});	
}	
 
});  
}); 
// END infinite scroll posts.



 /* homepage content */

if ($$(".homepage-content-ajax")[0]){setupHomepage();}
myApp.onPageInit('index', function (page) {setupHomepage();   });	



function setupHomepage() {
	$$.get('http://lifeasasister.org/ajax/feed-homepage/?mobile=1', function( data ) {
		$$( ".homepage-content-ajax" ).html( data );
		var mySlider = myApp.slider('.slider1', {
		  pagination: '.pagination1',
		  paginationHide: false,
		  nextButton: '.slider-next-button1',
		  prevButton: '.slider-prev-button1',
		  spaceBetween: 4
		});
		
		var mySlider2 = myApp.slider('.slider2', {
		  pagination: '.pagination2',
		  paginationHide: false,
		  nextButton: '.slider-next-button2',
		  prevButton: '.slider-prev-button2',
		  spaceBetween: 4
		});
		
		var mySlider3 = myApp.slider('.slider3', {
		  pagination: '.pagination3',
		  paginationHide: false,
		  nextButton: '.slider-next-button3',
		  prevButton: '.slider-prev-button3',
		  spaceBetween: 4
		});
		
		var browserClass = getMobileOperatingSystem();
		$$('body').addClass('device-' + browserClass);
	});	

}

 /* end homepage content */

 


 myApp.onPageInit('*', function (page) {
$$('form.ajax-submit').on('submitted', function (e) {
  var xhr = e.detail.xhr; // actual XHR object
  var data = e.detail.data; // Ajax repsonse from action file
  $$('#formwrap').html(data);
  // do something with response data
});	
});



 myApp.onPageInit('*', function (page) {
var mySlider = myApp.slider('.slider1', {
		  pagination: '.pagination1',
		  paginationHide: false,
		  nextButton: '.slider-next-button1',
		  prevButton: '.slider-prev-button1',
		  spaceBetween: 4
		});
});		




myApp.onPageInit('*', function (page) {
	$$('.terms-toggle u').on('click', function (e) {
	  $$('.sys-terms').show();
	});	
});