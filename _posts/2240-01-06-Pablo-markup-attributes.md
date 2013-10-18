---
category: pablo
heading: "Pablo(markup, [attributes])"
path: api/api/Pablo
---


Converts SVG markup into a collection of elements.

    var shapes = Pablo(
        '<rect width="120" height="80"/>' + 
        '<circle cx="150" cy="40" r="30"/>'
    );
    
    Pablo(demoElement)
        .svg({width:180, height:80})
        .append(shapes);

If `attributes` are specified, they are set on each element.

See also the collection method, [`markup()`](/api/markup/).

