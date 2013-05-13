--- 
category: removeAttr
heading: removeAttr(attributes)
---

Removes an attribute and returns the collection.

    var paper = Pablo(demoElement).svg({height:100}),
        rect  = paper.rect({
            width: 200,
            height:100,
            fill: 'purple'
        });

    rect.removeAttr('fill');
    // the default fill is black