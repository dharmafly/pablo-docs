--- 
heading: Collections
category: reference
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

Creates a Pablo collection, wrapping multiple DOM elements in a NodeList or arrays of elements.

	var nodeList = document.body.childNodes,
		collection1 = Pablo(nodeList),

		array = [element1, element2],
		collection2 = Pablo(array);


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


`Pablo` methods


Most collection methods return the collection, allowing methods to be chained:

	var paper = Pablo(demoElement).root({height:320});

    // Create a definition element and append a path to it
    paper.defs()
         .path({
             id:'squiggle',
             d:'M 20 80 C 20 120 120 20 220 120 C 320 220 420 320 420 120'
         });

    // Create a text element and append a textPath to it
    paper.text()
         .textPath({fill:'#997099'})
         	// Apply a link and contents to the textPath
         	.link('#squiggle')
            .content('★ In Xanadu, did Kublah Khan a stately pleasuredome decree…');