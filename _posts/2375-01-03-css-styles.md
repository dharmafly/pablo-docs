---
category: css
heading: css(styles)
path: api/css
---


Sets multiple styles (specified as an object), for all elements in the collection and returns the collection.

    var svg = Pablo(demoElement).svg({height:100}),
        rect  = svg.rect({
            width: 200,
            height: 100
        });

    rect.css({fill:'black', opacity:0.4});
