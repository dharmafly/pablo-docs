---
category: crop
heading: crop(elements)
path: api/crop
---


Crops each `<svg>` element in the collection to the bounding box of the supplied elements, where `elements` can be a collection, DOM node, CSS selector or anything else that can be contained in a Pablo collection.

    var svg = Pablo(demoElement).svg(),
        referenceCollection;

    svg.circle({r:50});
    referenceCollection = Pablo.rect({width:50, height:50});

    svg.css('background', 'red')
       .crop(referenceCollection);


