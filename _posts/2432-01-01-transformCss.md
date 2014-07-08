---
category: transformcss
heading: transformCss()
path: api/transformcss
---

Creates transformations of the elements in a collection, e.g. rotation, translation and scaling. This method manipulates the elements' CSS `transform` property. Refer to MDN's page on the [CSS transforms](https://developer.mozilla.org/docs/Web/CSS/transform) for the values this method accepts.

See also [`transform()`](/api/transform/), which works in a similar way, using the SVG elements' [`transform` attribute](https://developer.mozilla.org/docs/SVG/Attribute/transform).

Note that CSS transforms require the use of units, such as in `rotate(45deg)` and `translate(20px)`. This is different from `transform()`, because SVG attribute transforms don't require units.


Get a key-value object of the element's transforms.

    /* Given an element with a CSS transform... */
    var elem = Pablo.rect().transform('rotate(45deg) scale(2)');

    // get its transforms
    alert(elem.transformCss());

