--- 
category: overview
heading: Getting started
---

Either [download](#download) or clone the repo:

	git clone git://github.com/dharmafly/pablo.git

Include Pablo in your HTML:

	<script src="pablo.min.js"></script>

Start drawing:

	// Check browser support
	if (Pablo.isSupported){
		// Wrap an HTML element (or CSS selector, array or nodeList)
		Pablo(demoElement)
			// Create an <svg> root element
			.root({height:60})
			// Add SVG elements
			.circle({cx:30, cy:30, r:30, fill:'green'});
	}

The rest is just details...