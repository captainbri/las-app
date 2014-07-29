// Initialize your app
var myApp = new Framework7();

// Export selectors engine
var $$ = Framework7.$;


// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});


//We can also add callback for all pages:
myApp.onPageInit('*', function (page) {

	// force entry-content links to new window.
	$$(".entry-content a").attr('target','_blank');
	$$(".entry-content a").addClass('external');

	ga_storage._trackPageview('/mobile-app/', page.name); 
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
		  spaceBetween: 16
		});
		
		var mySlider2 = myApp.slider('.slider2', {
		  pagination: '.pagination2',
		  paginationHide: false,
		  nextButton: '.slider-next-button2',
		  prevButton: '.slider-prev-button2',
		  spaceBetween: 16
		});
		
	});	

}

 /* end homepage content */

 
 
 myApp.onPageInit('*', function (page) {
 if ($$("#disqus_thread")[0]){

	
	var thread_type = $$('#disqus_thread').data('type');
	var thread_identifier = $$('#disqus_thread').data('identifier');
	
	
	var disqus_shortname = $$('#disqus_thread').data('shortname');
	var disqus_title = $$('#disqus_thread').data('title');
	var disqus_url = $$('#disqus_thread').data('url');
	var disqus_identifier = thread_identifier + ' http://lifeasasister.org/?post_type=' + thread_type + '&#038;p=' + thread_identifier;
	 
	(function() {
            var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
            dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
            (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
        })();
	
	}
});	