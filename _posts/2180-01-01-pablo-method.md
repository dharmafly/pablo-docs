--- 
category: api
heading: Pablo()
---

The `Pablo()` method creates an array-like Pablo collection of new or pre-existing DOM elements. See the [Pablo method](/api/pablo/) section for details.


#### [Pablo()](/api/pablo/)

Create an empty Pablo collection.


#### [Pablo(elements, \[attributes\])](/api/pablo/)

Create a Pablo collection of new elements.

`elements` can be either a single DOM element, Pablo collection, array of elements, DOM node list, jQuery collection or other array-like structure. If `attributes` are specified, they are set on every element.


#### [Pablo(selectors)](/api/pablo/#pablo-04)

Create a Pablo collection of elements that exist in the `document` and match the specified CSS selectors.


#### [Pablo(elementName, attributes)](/api/pablo/#pablo-05)

Create a new SVG element with the specified name and attributes, and wrap it in a new Pablo collection.

#### [Pablo(elementNames, \[attributes\])](/api/pablo/#pablo-06)

Create multiple SVG elements and wrap them in a new Pablo collection.
