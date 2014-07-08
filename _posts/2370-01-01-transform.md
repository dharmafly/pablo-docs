---
category: transform
heading: transform()
path: api/transform
---

Creates transformations of the elements in a collection, such as rotating, scaling or translating them. `transform()` manipulates the elements' `transform` attribute. Refer to MDN's page on the [`transform` attribute](https://developer.mozilla.org/docs/SVG/Attribute/transform) for the values this method accepts.

See also [`transformCss()`](/api/transformCss/), which works in a similar way, using the elements' [CSS `transform` property](https://developer.mozilla.org/docs/Web/CSS/transform).


Get a key-value object of the element's transforms.

    var elem = Pablo('<rect transform="rotate(45) scale(2)"/>');
    alert(elem.transform());

