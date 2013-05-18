--- 
category: api
heading: Pablo()
---

The `Pablo()` method creates array-like Pablo collections of either new, or pre-existing DOM elements. See the [Pablo method](/api/pablo/) section for details.


#### [Pablo()](/api/pablo/)

Creates an empty Pablo collection.


#### [Pablo(elements, [attributes])][pablo-ref]
[pablo-ref]:/api/pablo/

Creates a Pablo collection of new elements.

`elements` can be either a single DOM element, Pablo collection, jQuery collection, array of elements or a DOM node list. If `attributes` are specified, they are set on each element.


#### [Pablo(selectors)](/api/pablo/#pablo-04)

Creates a Pablo collection of elements from the global `document` that match the specified CSS selectors.


#### [Pablo(elementName, attributes)](/api/pablo/#pablo-05)

Creates a new SVG element with the specified name and attributes, and wraps it in a new Pablo collection.

#### [Pablo(elementNames, [attributes])](/api/pablo/#pablo-06)

Creates multiple new SVG elements and wraps them in a new Pablo collection.
