// Initialize your app
var myApp = new Framework7({
	cache: false
});

// Export selectors engine
var $$ = Framework7.$;


// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});


//external links
myApp.onPageInit('*', function (page) {
	$$(document).on('click','.entry-content a',function(e){
		var url = $$(this).attr('href');
		window.open(url, '_blank', 'location=yes');
		e.preventDefault();
	});
});




/* disqus complete */
myApp.onPageInit('*', function (page) {

	$$(document).on('click','a.button-comments',function(e){
		var url = $$(this).attr('href');
		var iabRef = window.open(url, '_blank', 'location=no,closebuttoncaption=Close Window');
		iabRef.addEventListener('loadstop', function() {
			var p1 = "disqus.com/next/login-success";
			var p2 = "disqus.com/_ax/google/complete";
			var p3 = "disqus.com/_ax/twitter/complete";
			var p4 = "disqus.com/_ax/facebook/complete";
			if (p1.indexOf(event.url) != -1 || p2.indexOf(event.url) != -1 || p3.indexOf(event.url) != -1 || p4.indexOf(event.url) != -1) { 		
				alert(url); 
				window.location.href = url;
			}
		 });
        iabRef.addEventListener('exit', iabClose);
		e.preventDefault();
	});
	
	function iabClose(event) {
         alert(event.type);
         iabRef.removeEventListener('loadstop', iabLoadStop);
         iabRef.removeEventListener('exit', iabClose);
    }

	
	
	// disqus counts
	setTimeout(function() {
	if ($$("#disqus")[0]){
		var url = $$("#disqus").data('identifier');
		$$.get('http://lifeasasister.org/ajax/disqus-count/?url='+url+'', function( data ) {
		   $$('#disqus a').html(data);
		});	
	}	
	}, 3000);
	// end disqus counts




});
/* end disqus complete */




// track page views
myApp.onPageInit('*', function (page) {
	$$('a.track').on('click', function (e) {
		var url = $$(this).data('ga');
		ga('send', 'pageview', url);
	});
});





// infinite scroll posts.
myApp.onPageInit('*', function (page) {
var pagenum = 1;
var loading = false;
var num_messages = $$('.list-feed').data('max');
var type = $$('.list-feed').data('type');
// Attach 'infinite' event handler
$$('.infinite-scroll').on('infinite', function () {

  if (pagenum >= num_messages) {
      myApp.detachInfiniteScroll($$('.infinite-scroll'));
      $$('.infinite-scroll-preloader').remove();
      return;
    }
else {
	pagenum += 1;
	loading = true;
	$$.get('http://lifeasasister.org/ajax/load-more/?type='+type+'ajaxpage='+pagenum+'', function( data ) {
		$$( ".list-feed ul" ).append( data );
	});	
}	
 
});  
}); 
// END infinite scroll posts.





 /* homepage content */

if ($$(".homepage-content-ajax")[0]){setupHomepage();}
myApp.onPageInit('index', function (page) {setupHomepage();});	



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













