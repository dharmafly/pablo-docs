---
category: pablo
heading: "Pablo(markup, [attributes])"
path: api/Pablo
---


Converts SVG markup into a collection of elements.

    var markup = '<circle cx="50" cy="50" r="50"/>',
        shapes = Pablo(markup);

    Pablo(demoElement)
        .svg()
        .append(shapes)
        .crop();

If `attributes` are specified, they are set on each element.

See also the collection method, [`markup()`](/api/markup/).

