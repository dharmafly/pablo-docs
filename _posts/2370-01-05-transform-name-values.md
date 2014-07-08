---
category: transform
heading: "transform(name, values)"
path: api/transform
---


As above, but with values given as an array.

    var svg = Pablo(demoElement).svg({height:175}),
        rect = svg.rect({
            width: 100,
            height: 100,
            fill: 'red'
        });

    rect.transform('translate', [180, 30])
        .transform('rotate', [45]);

