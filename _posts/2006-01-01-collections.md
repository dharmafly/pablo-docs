--- 
category: reference
heading: Basics
---



`Pablo()`: Create a Pablo collection


A Pablo collection is a wrapper around a DOM element or multiple DOM elements.

If `Pablo()` is called without arguments, then an empty collection is returned. This can be used as an empty container into which elements will later be added (see `.push()` and related methods).


`Pablo(element)`: Wrap a DOM element


Pass in a DOM element:

	var element = document.getElementById('foo'),
		wrapped = Pablo(element);

This wraps the element with the Pablo API. SVG elements are the main target for the library, but Pablo can also wrap other element types, such as HTML. A Pablo-wrapped element or collection works in a similar way to jQuery, e.g. `jQuery(element)`.


`Pablo(list)`: Wrap multiple elements
-

Pass in a NodeList or arrays of elements:

	var nodeList = document.getElementsByTagName('line'),
		collection1 = Pablo(nodeList),

		array = [element1, element2],
		collection2 = Pablo(array);

A Pablo collection behaves likes an array, with additional methoda. A collection can contain zero, one or multiple elements.

Methods on the collection usually act on all the elements in the collection. E.g. `collection.attr(newAttributes)` will change the attributes on all elements within the collection.


`Pablo(selector)`: Use CSS selector to find elements
----

	// Pass in a CSS selector
	Pablo('#foo');

	// Multiple elements
	Pablo('circle');

	// Complex selectors
	Pablo('#paper g.foo > circle[data-foo=bar]:first-child')

Pablo uses the current browser's native selection engine - so it accepts anything that the browser supports. It uses [`Element.querySelectorAll`][#qsa] under the hood.

[#qsa]: https://developer.mozilla.org/en-US/docs/DOM/Element.querySelectorAll


`Pablo(elementName, attributes)`: Create a new, named element
-

The attributes object may be empty, but it must be present:

	Pablo('circle', {});

See documentation on 'Elements'.


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