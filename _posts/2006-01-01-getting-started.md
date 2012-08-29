--- 
heading: Getting Started
category: reference
---

   
`Pablo.isSupported`: Check browser support


To check if Pablo is able to run in the current browser:

	if (Pablo.isSupported){
        alert('It works');
    } else {
        alert('Not supported');
    }

When using Pablo, be sure to only execute Pablo-specific code if `Pablo.isSupported` is `true`.

Pablo permits some degree of browser discrepancy, but the code is kept lean by targeting the modern set of web browsers (for both desktop and mobile). For example, it requires that the browser supports SVG, as well as a few ECMAScript5 APIs (often, the browsers that support SVG also support ECMAScript5). It exits gracefully in non-supported browsers.


`Pablo()`: Create a Pablo collection


A Pablo collection is a wrapper around an element or a list of elements. If `Pablo()` is called without arguments, then an empty collection is returned. This is occasionally useful to provide an empty container into which elements will later be added (see `push()` and related methods).


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

See documentation on 'SVG elements'.


`root()`: Create an SVG root
------

Supply attributes to the SVG element:
	
	var paper = Pablo(htmlElement).root({width:300, height:420});
