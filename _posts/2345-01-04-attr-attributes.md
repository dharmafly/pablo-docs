---
category: attr
heading: attr(attributes)
path: api/attr
---


Sets multiple attributes (specified as an object), for all elements in the collection and returns the collection.

    var svg = Pablo(demoElement).svg({height:220}),
        rect  = svg.rect();

    rect.attr({
        x: 50,
        y: -50,
        width: 200,
        height:100,
        fill: 'orange',
        transform: 'rotate(45)'
    });

The values in the attributes object can also be arrays or functions, to set different values for different elements (see above).
