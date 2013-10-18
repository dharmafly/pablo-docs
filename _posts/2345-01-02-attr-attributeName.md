---
category: attr
heading: attr(attributeName)
path: api/attr
---


Returns the value of the named attribute from the _first_ element in the collection.

    var svg = Pablo(demoElement).svg({height:100}),
        rect  = svg.rect({
            width: 200,
            height:100,
            fill: 'purple'
        }),
        value = rect.attr('fill');

    alert(value); // 'purple'

