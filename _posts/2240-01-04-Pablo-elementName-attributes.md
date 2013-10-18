---
category: pablo
heading: "Pablo(elementName, attributes)"
path: api/api/Pablo
---


Creates a named element with the specified attributes, and returns it in a collection.

Attributes are given as properties and values of a JavaScript object.

    Pablo('rect', {width:50, height:50});

To create an element this way, the attributes object is required, even if it is empty. If the attributes argument is missing - in this example, giving `Pablo('rect')` - then Pablo will treat it as a _selection_ and would return all existing `<rect>` elements in the document.

All the different types of SVG element can be created in this way, although they are more typically created by using an [element method](/api/elements/) - e.g. `Pablo.rect({width:50, height:50})`.


## Creating HTML

It is not possible to create HTML elements with this method. To achieve that, use `Pablo(document.createElement('div'))` or similar. (HTML creation may be supported in future).

