---
heading: Pablo()
category: api
path: api
---

The `Pablo()` method creates an array-like [collection][collections] of new or pre-existing HTML or SVG elements.


## [Pablo()](/api/pablo/)

Returns a new, empty Pablo collection.


## [Pablo(elements, \[attributes\])](/api/pablo/#Pablo-elements-attributes)

Returns a new collection containing the elements.

`elements` could be a DOM element, another collection, an array of elements, a DOM node list, jQuery collection or other array-like object.

If `attributes` are specified, they are set on each element.


## [Pablo(selectors, \[context\])](/api/pablo/#Pablo-selectors-context)

Returns a collection of elements that match the specified CSS selectors. By default, this searches the global `document`, but an optional `context` element or elements can be passed.


## [Pablo(elementName, attributes)](/api/pablo/#Pablo-elementName-attributes)

Creates a named element with the specified attributes, and returns it in a collection.


## [Pablo(elementNames, \[attributes\])](/api/pablo/#Pablo-elementNames-attributes)

Creates multiple named elements and returns them in a collection.


## [Pablo(markup, \[attributes\])](/api/pablo/#Pablo-markup-attributes)

Converts SVG markup into a collection of elements. (experimental)


## [Pablo(dataUrl, \[attributes\])](/api/pablo/#Pablo-dataUrl-attributes)

Converts a data URL for an SVG file into a collection of elements.


[collections]: #collections
