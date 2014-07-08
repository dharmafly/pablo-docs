---
category: viewbox
heading: viewbox(values)
path: api/viewbox
---


Set an `<svg>` element's `viewbox` attribute with an array of the values `min-x`, `min-y`, `width` and `height`. This can be used to zoom in and crop an image.

    Pablo(demoElement).load('/rocket.svg', function(rocket){
        rocket.viewbox([100, 40, 30, 50]);
    });