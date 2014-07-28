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
/*
myApp.onPageInit('*', function (page) {
  ga_storage._trackPageview('/mobile-app/', page.name); 
});

*/


// Pull to refresh content
myApp.onPageInit('*', function (page) {
var ptrContent = $$('.news-refresh');
    ptrContent.on('refresh', function(e) {
		myApp.pullToRefreshDone(ptrContent);
});

var ptrContent2 = $$('.blog-refresh');
    ptrContent2.on('refresh', function(e) {
		myApp.pullToRefreshDone(ptrContent2);
});
});
// end refresh content


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