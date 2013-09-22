--- 
category: api
heading: Pablo methods
---

These methods are available on the global `Pablo` object.


## [Pablo.template()](/api/Pablo.template/)

Create a factory function to generate templates of SVG elements, allowing custom settings to be passed in when the template is used.


## [Pablo.load()](/api/Pablo.load/)

Load an external SVG file via an Ajax request, wrap it in a collection and pass to a callback.


## [Pablo.get()](/api/Pablo.get/)

Load an external file via an Ajax request and pass to a callback.


## [Pablo.toArray(obj)](/api/Pablo.toArray/)

Convert the array-like object into a true array.


## [Pablo.cssPrefix(property, value)](/api/Pablo.cssPrefix/)

Return a semicolon-separated list of vendor-prefixed CSS rules.


## [Pablo.getAttributes(element)](/api/Pablo.getAttributes/)

Return an object of attributes from a DOM element.


## [Pablo.isArrayLike()](/api/Pablo.isArrayLike/)

Return `true` if the passed object is like an array - e.g. a Pablo or jQuery 
collection, a DOM node list or a custom object.


## [Pablo.isElement()](/api/Pablo.isElement/)

Return `true` if the passed object is a DOM element.


## [Pablo.isSVGElement()](/api/Pablo.isSVGElement/)

Return `true` if the passed object is an SVG element.


## [Pablo.hasSvgNamespace()](/api/Pablo.isSVGElement/)

Return `true` if the passed object has an SVG namespace.


## [Pablo.isNodeList()](/api/Pablo.isNodeList/)

Return `true` if the passed object is a DOM node list.


## [Pablo.isHTMLDocument()](/api/Pablo.isHTMLDocument/)

Return `true` if the passed object is an HTML document.


## [Pablo.isPablo()](/api/Pablo.isPablo/)

Return `true` if the passed object is a Pablo collection.


## [Pablo.canBeWrapped()](/api/Pablo.canBeWrapped/)

Return `true` if the passed object can be contained within a Pablo 
collection.


## [Pablo.extend(](/api/Pablo.extend/)

Extend an object with properties from any number of other objects, and return the result.


## [Pablo.make()](/api/Pablo.make/)

Create a native SVG element with the specified element name.


## [Pablo.hyphensToCamelCase()](/api/Pablo.hyphensToCamelCase/)

Convert a hyphen-ated string into a camelCase string.
