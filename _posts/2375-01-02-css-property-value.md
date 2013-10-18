---
category: css
heading: "css(property, value)"
path: api/css
---


Sets the named property to the specified value, for all elements in the collection and returns the collection.

    var svg = Pablo(demoElement).svg({height:100}),
        rect  = svg.rect({
            width: 200,
            height: 100
        });

    rect.css('fill', 'green');

Styles set on elements with .css() will override CSS rules set in stylesheets - unlike style properties set with the .attr() method.

