// Initialize your app
var myApp = new Framework7();

// Export selectors engine
var $$ = Framework7.$;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});

// Callbacks to run specific code for specific pages, for example for About page:
myApp.onPageInit('about', function (page) {
    // run createContentPage func after link was clicked
    $$('.create-page').on('click', function () {
        createContentPage();
    });
});

//We can also add callback for all pages:
myApp.onPageInit('*', function (page) {
  ga_storage._trackPageview('/mobile-app/', page.name); 
});




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