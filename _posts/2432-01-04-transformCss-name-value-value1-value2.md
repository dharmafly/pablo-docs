---
category: transformcss
heading: "transformCss(name, value, [value1], [value2])"
path: api/transformcss
---


Set a named transform in the <a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/transform" target="_blank">transform attribute</a> of each element in the collection and return the collection. Any number of values can be used, according to needs of the transformation.

    var svg = Pablo(demoElement).svg({height:175}),
        rect = svg.rect({
            width: 100,
            height: 100,
            fill: 'red'
        });

    rect.transformCss('translate', '180px', '30px')
        .transformCss('rotate', '45deg');


If multiple transforms are already present on the element, then only the named transform will be updated.

