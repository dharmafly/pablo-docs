---
category: removeattr
heading: removeAttr(attributes)
path: api/removeattr
---

Removes an attribute from all elements in the collection, and returns the collection.

    var svg = Pablo(demoElement).svg({height:100}),
        rect  = svg.rect({
            width: 200,
            height:100,
            fill: 'purple'
        });

    rect.removeAttr('fill');
    // the default fill is black