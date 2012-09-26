--- 
category: overview
heading: Getting started
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

Pablo can do anything that SVG can do, in a simple, expressive way. **See the [API Reference][reference] to discover Pablo's extensive API.**

The [Changelog][changelog] lists API changes. Please add bug reports and feedback on the GitHub ['Issues' page][issues] or contact [@premasagar][prem-twitter].

Pull requests are welcome, for the core library, examples, extensions and the documentation. To update the pages on [pablojs.com][pablo-site], edit the relevant file in the [/docs][docs-folder] folder and send a pull request.


<!-- Testcard demo -->
<div id="testcard"></div>
<script>
	if (document.addEventListener){
		document.addEventListener('DOMContentLoaded', function(){
			var script = document.createElement('script');
			document.body.appendChild(script);
			script.src = 'https://raw.github.com/dharmafly/pablo/master/examples/testcard/testcard.js';
		}, false);
	}
</script>


[pablo-site]: http://pablojs.com
[reference]: http://pablojs.com/reference/
[issues]: https://github.com/dharmafly/pablo/issues
[changelog]: http://pablojs.com/details/#changelog
[prem-twitter]: https://twitter.com/premasagar
[docs-folder]: https://github.com/dharmafly/pablo/tree/master/docs