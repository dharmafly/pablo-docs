---
category: transformcss
heading: "transformCss(name, null)"
path: api/transformcss
---


Remove the named transform on the element.

    var svg = Pablo(demoElement).svg({height:175}),
        rect = svg.rect({
            width: 100,
            height: 100,
            fill: 'red'
        });

    rect.transformCss('translate', '180px', '30px')
        .transformCss('rotate', '45deg');

    rect.transformCss('rotate', null);
