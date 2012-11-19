/**
 * Listens for the app launching then creates the window
 *
 * @see http://developer.chrome.com/trunk/apps/app.runtime.html
 * @see http://developer.chrome.com/trunk/apps/app.window.html
 */
chrome.app.runtime.onLaunched.addListener(function() {
	var screen = window.screen,
		w = screen.availWidth / 2,
		h = screen.availHeight;

	chrome.app.window.create(
		'index.html',
    	{
    		width:  w,
    		height: h
    	}
    );
});