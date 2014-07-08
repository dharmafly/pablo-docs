---
category: transform
heading: transform(null)
path: api/transform
---


Remove all transforms on the element.

    var svg = Pablo(demoElement).svg({height:175}),
        rect = svg.rect({
            width: 100,
            height: 100,
            fill: 'red'
        });

    rect.transform('translate', 180, 30)
        .transform('rotate', 45);

    rect.transform(null);

