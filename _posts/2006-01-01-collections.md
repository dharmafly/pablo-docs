--- 
category: reference
heading: Collections
---


Creating Pablo collections
--

A Pablo collection is a wrapper around a DOM element or multiple DOM elements. They work in a similar way to jQuery collections, which also wrap around DOM elements e.g. `jQuery('img')`.

SVG elements are the main target for the library, but Pablo can also wrap other element types, such as HTML.

A Pablo collection behaves likes an array - it can contain zero, one or multiple elements - and it has a number of useful methods for manipulating the elements within.


`Pablo()`
-

Creates a Pablo collection, wrapping a single DOM element.

	var element = document.getElementById('foo'),
		wrapped = Pablo(element);


`Pablo(list)`
-

Creates a Pablo collection, wrapping multiple DOM elements. The elements could be in a NodeList, an array of elements, a jQuery collection or another Pablo collection.

	// Any of these could be passed to Pablo()
	var nodeList = document.body.childNodes,
		array = [element1, element2],
		jQueryCollection = jQuery('p'),
		pabloCollection = Pablo('circle');

	var collection = Pablo(list);


`Pablo(selectors)`
-----

Creates a Pablo collection, wrapping elements specified by a CSS selector or comma-separated list of selectors.

	// A single element
	Pablo('#foo');

	// Multiple elements
	Pablo('.bar');

	// Multiple selectors
	Pablo('circle, line, #foo, .bar');

	// Complex selectors
	Pablo('#paper g.foo > circle[data-foo=bar]:first-child')

Both SVG and HTML elements can be targeted. Pablo uses the browser's native selector engine, and so accepts any selector that the browser supports. It uses [`Element.querySelectorAll`][qsa] under the hood.

[qsa]: https://developer.mozilla.org/en-US/docs/DOM/Element.querySelectorAll


`Pablo(elementName, attributes)`
--

Creates a new, named SVG element, with attributes specified as an object:

	Pablo('rect', {x:10, y:10, width:50, height:50});

Here, the attributes object is required, even if it is an empty object. (If the attributes argument is omitted, then `Pablo('rect')` will select all `<rect>` elements already in the document).

Typically, elements are instead created with an 'element method' - see the 'Elements' documentation.


`Pablo(elementNames, [attributes])`
-------

Note that Pablo does not (currently) support the form `Pablo(svgMarkup)` - e.g. `Pablo('<circle cx="50"/>')` - in the same way that jQuery supports `jQuery('<div id="foo">'`). There is no native `innerSVG` property on SVG elements in the same way as there is an `innerHTML` property on HTML elements. See the '[innerSVG][innersvg]' project for a potential polyfill.

[innersvg]: http://code.google.com/p/innersvg/


`Pablo` methods


Most methods return `this`, the collection. This allows methods to be chained, one after another.

	Pablo('circle')
		.addClass('foo')
		.append('rect', {width:50})
		.append('line', {})
		.on('click', function(){
			// clicked
		});