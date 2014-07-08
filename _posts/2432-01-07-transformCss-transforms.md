---
category: transformcss
heading: transformCss(transforms)
path: api/transformcss
---


Set one or more transforms as either an array of transforms or a key-value map of transforms.

To ensure the expected results, use arrays to set multiple transforms. The order of transforms on an element is important, e.g. a `scale` after a `translate` will give different results than a `translate` after a `scale`.

As an array of transforms:

    var svg = Pablo(demoElement).svg({height:175}),
        rect = svg.rect({
            width: 100,
            height: 100,
            fill: 'red'
        });

    rect.transformCss([
        {translate: ['180px', '30px']},
        {rotate: '45deg'}
    ]);

As a key-value map:

    var svg = Pablo(demoElement).svg({height:175}),
        rect = svg.rect({
            width: 100,
            height: 100,
            fill: 'red'
        });

    rect.transformCss({
        translate: ['180px', '30px'],
        rotate: '45deg'
    });

