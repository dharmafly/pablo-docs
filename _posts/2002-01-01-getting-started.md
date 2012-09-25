--- 
heading: Getting started
category: overview
---

For production, <a href="https://github.com/downloads/dharmafly/pablo/pablo.min.js" target="_blank">download the minified script</a>.

Include it in your HTML:

	<script src="pablo.min.js"></script>

Start drawing:

	if (Pablo.isSupported){
		// Wrap an HTML element (or CSS selector, array or nodeList)
		Pablo(demoElement)
			// Create an <svg> root element
			.root({height:200})
			// Add SVG elements
			.circle({cx:100, cy:100, r:100, fill:'blue'});
	}

The rest is just details...

See the [Reference section][reference] for descriptions and examples of Pablo's extensive API.

[reference]: reference/