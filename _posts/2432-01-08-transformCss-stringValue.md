---
category: transformcss
heading: transformCss(stringValue)
path: api/transformcss
---


Set one or more transforms as a string, representing the `transform` attribute's value.

    var svg = Pablo(demoElement).svg({height:175}),
        rect = svg.rect({
            width: 100,
            height: 100,
            fill: 'red'
        });

    rect.transformCss('translate(180px, 30px) rotate(45deg)');

