--- 
heading: Getting started
category: overview
---

For production, download <a href="https://github.com/downloads/dharmafly/pablo/pablo.min.js" target="_blank">the minified script</a> and call it from your HTML:

	<script src="pablo.min.js"></script>

Start drawing:

	if (Pablo.isSupported){
		// Inside an HTML element, append an <svg> root
		var paper = Pablo(demoElement).root({height:160});

		// Append SVG elements, specifying their attributes
		paper.circle({
			r:80, cx:80, cy:80,
			fill:'orange'
		});
	}

Pablo can do anything that SVG can do, in a simple, expressive way.  
**See the [API Reference][reference]** to discover Pablo's extensive API.

The [Changelog][changelog] lists API changes. Please add bug reports and feedback on the GitHub ['Issues' page][issues] or contact [@premasagar][prem-twitter].

[Pull requests][pull-requests] are welcome for any part of the code. To update the pages on [pablojs.com][pablo-site], the files to be changed are in the [/docs folder][docs-folder].


<!-- Testcard demo -->
<div id="testcard" style="margin-top:40px">
	<script>
		// Load testcard script on DOM ready
		if (document.addEventListener){
			document.addEventListener('DOMContentLoaded', function(){
				var script = document.createElement('script');
				document.body.appendChild(script);
				script.src = 'https://raw.github.com/dharmafly/pablo/master/examples/testcard/testcard.js';
			}, false);
		}
	</script>
</div>


[pablo-site]: http://pablojs.com
[reference]: http://pablojs.com/reference/
[issues]: https://github.com/dharmafly/pablo/issues
[changelog]: http://pablojs.com/details/#changelog
[prem-twitter]: https://twitter.com/premasagar
[docs-folder]: https://github.com/dharmafly/pablo/tree/master/docs
[pull-requests]: https://help.github.com/articles/using-pull-requests