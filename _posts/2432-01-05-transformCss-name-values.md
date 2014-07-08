---
category: transformcss
heading: "transformCss(name, values)"
path: api/transformcss
---


As above, but with values given as an array.

    var svg = Pablo(demoElement).svg({height:175}),
        rect = svg.rect({
            width: 100,
            height: 100,
            fill: 'red'
        });

    rect.transformCss('translate', ['180px', '30px'])
        .transformCss('rotate', ['45deg']);

