--- 
category: attr
heading: attr(attributeName)
---

Returns the value of the named attribute on the first element in the collection.

    var paper = Pablo(demoElement).svg({height:100}),
        rect  = paper.rect({
            width: 200,
            height:100,
            fill: 'purple'
        }),
        value = rect.attr('fill');

    alert(value); // 'purple'