---
category: transform
heading: transform(stringValue)
path: api/transform
---


Set one or more transforms as a string, representing the `transform` attribute's value.

    var svg = Pablo(demoElement).svg({height:175}),
        rect = svg.rect({
            width: 100,
            height: 100,
            fill: 'red'
        });

    rect.transform('translate(180, 30) rotate(45)');

