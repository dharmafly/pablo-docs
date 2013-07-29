--- 
heading: Pablo methods
category: api
---

These are the methods available on the global `Pablo` object.

#### [Pablo.isArrayLike(obj)](/api/isArrayLike/)

Return `true` if the passed object is like an array - e.g. a Pablo or jQuery 
collection, a DOM node list or a custom object.

#### [Pablo.isElement(obj)](/api/isElement/)

Return `true` if the passed object is a DOM element.

#### [Pablo.isSVGElement(obj)](/api/isSVGElement/)

Return `true` if the passed object is an SVG element.

#### [Pablo.isNodeList(obj)](/api/isNodeList/)

Return `true` if the passed object is a DOM node list.

#### [Pablo.isHTMLDocument(obj)](/api/isHTMLDocument/)

Return `true` if the passed object is an HTML document.

#### [Pablo.isPablo(obj)](/api/isPablo/)

Return `true` if the passed object is a Pablo collection.

#### [Pablo.template(name, fn)](/api/template/)

Create a factory function to generate templates of SVG elements, allowing custom settings to be passed in when the template is used.

#### [Pablo.canBeWrapped(element)](/api/canBeWrapped/)

Return `true` if the passed object can be contained within a Pablo 
collection.

#### [Pablo.extend(target, source, [source2...], [deep])](/api/extend/)

Extend an object with properties from any number of other objects, and return the result.

#### [Pablo.make(name)](/api/make/)

Create a native SVG element with the specified element name.

#### [Pablo.hyphensToCamelCase(string)](/api/hyphensToCamelCase/)

Convert a hyphen-ated string into a camelCase string.



<!-- TODO: add sub-pages -->

#### Pablo.toArray(obj)

Convert the array-like object into a true array.

#### Pablo.cssPrefix(property, value)

Return a semicolon-separated list of vendor-prefixed CSS rules.

#### Pablo.getAttributes(element)

Return an object of attributes from a DOM element.
